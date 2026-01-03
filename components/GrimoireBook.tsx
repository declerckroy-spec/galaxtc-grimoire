"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import { PageFlip } from "page-flip";
import Image from "next/image";
import { artworks, type Artwork } from "@/data/artworks";

// Organische hoekversieringen - hand-drawn medieval style
const CornerOrnament = ({ position }: { position: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' }) => {
  // Rotatie per positie
  const rotation = {
    'top-left': 0,
    'top-right': 90,
    'bottom-right': 180,
    'bottom-left': 270,
  }[position];

  return (
    <svg
      className={`corner-ornament-svg ${position}`}
      viewBox="0 0 60 60"
      style={{ transform: `rotate(${rotation}deg)` }}
    >
      {/* Organische krullen en bladmotieven */}
      <g fill="none" stroke="currentColor" strokeLinecap="round">
        {/* Hoofdkrul vanuit de hoek */}
        <path
          d="M3,3 C3,12 5,18 12,22 C18,25 24,24 28,20 C31,17 30,13 26,12 C22,11 20,14 21,17"
          strokeWidth="1.2"
          opacity="0.55"
        />
        {/* Tweede krul, iets kleiner */}
        <path
          d="M3,8 C6,14 10,18 16,19 C20,20 22,18 21,15"
          strokeWidth="1"
          opacity="0.45"
        />
        {/* Kleine decoratieve krul */}
        <path
          d="M8,3 C12,6 15,10 15,14 C15,17 13,18 11,16"
          strokeWidth="0.9"
          opacity="0.4"
        />
        {/* Bladmotief */}
        <path
          d="M20,8 C22,10 25,11 27,9 C25,8 23,9 22,11"
          strokeWidth="0.8"
          opacity="0.35"
        />
        {/* Kleine accenten */}
        <circle cx="30" cy="18" r="1" fill="currentColor" opacity="0.3" />
        <circle cx="18" cy="26" r="0.8" fill="currentColor" opacity="0.25" />
        {/* Hoeklijn decoratie */}
        <path
          d="M2,2 L2,12 M2,2 L12,2"
          strokeWidth="0.6"
          opacity="0.3"
        />
      </g>
    </svg>
  );
};

export default function GrimoireBook() {
  const bookRef = useRef<HTMLDivElement>(null);
  const pageFlipRef = useRef<PageFlip | null>(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [showBlacklight, setShowBlacklight] = useState<Record<string, boolean>>({});
  const [isMobile, setIsMobile] = useState(false);

  // Calculate total pages
  const totalPages = artworks.length * 2 + 2; // artwork spreads + covers

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    if (!bookRef.current) return;

    // Destroy existing instance if any
    if (pageFlipRef.current) {
      pageFlipRef.current.destroy();
      pageFlipRef.current = null;
    }

    // Calculate book size to fill 75% of viewport when open (2 pages wide)
    const viewportHeight = window.innerHeight;
    const viewportWidth = window.innerWidth;

    // When open, book shows 2 pages side by side. Target 75% of viewport width for open book.
    const openBookTargetWidth = viewportWidth * 0.75;
    const pageWidth = Math.floor(openBookTargetWidth / 2); // width per page
    const pageHeightFromWidth = Math.floor(pageWidth / 0.74); // height based on aspect ratio

    // Cap height at 90% of viewport, but prioritize width
    const maxHeight = Math.floor(viewportHeight * 0.9);
    const finalHeight = Math.min(pageHeightFromWidth, maxHeight);

    // Keep the target width - don't recalculate from height
    const finalWidth = pageWidth;

    const width = isMobile ? Math.min(380, viewportWidth * 0.9) : finalWidth;
    const height = isMobile ? Math.min(540, viewportHeight * 0.7) : finalHeight;

    // Small delay to ensure DOM is ready
    const timer = setTimeout(() => {
      if (!bookRef.current) return;

      const pages = bookRef.current.querySelectorAll(".page");
      if (pages.length === 0) return;

      pageFlipRef.current = new PageFlip(bookRef.current, {
        width,
        height,
        size: "fixed",
        minWidth: 350,
        maxWidth: 1500,
        minHeight: 500,
        maxHeight: 1800,
        showCover: true,
        maxShadowOpacity: 0.35, // Minder glans, matter schaduw
        mobileScrollSupport: false,
        clickEventForward: true,
        useMouseEvents: true,
        swipeDistance: 40, // Iets meer weerstand
        showPageCorners: true,
        disableFlipByClick: false,
        usePortrait: isMobile,
        drawShadow: true,
        flippingTime: 1200, // Langzamer, zwaarder papier
      });

      pageFlipRef.current.loadFromHTML(pages as NodeListOf<HTMLElement>);

      pageFlipRef.current.on("flip", (e) => {
        setCurrentPage(e.data);
        if (e.data > 0) {
          setIsOpen(true);
        }
      });
    }, 100);

    return () => {
      clearTimeout(timer);
      if (pageFlipRef.current) {
        pageFlipRef.current.destroy();
        pageFlipRef.current = null;
      }
    };
  }, [isMobile]);

  const flipNext = useCallback(() => {
    pageFlipRef.current?.flipNext();
  }, []);

  const flipPrev = useCallback(() => {
    pageFlipRef.current?.flipPrev();
  }, []);

  const toggleBlacklight = (id: string) => {
    setShowBlacklight((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") flipNext();
      if (e.key === "ArrowLeft") flipPrev();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [flipNext, flipPrev]);

  return (
    <div className="grimoire-container">
      {/* Magic particles */}
      <div className="magic-particles">
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="particle"
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 10}s`,
              animationDuration: `${10 + Math.random() * 10}s`,
            }}
          />
        ))}
      </div>

      {/* Book wrapper with 3D perspective */}
      <div className="book-wrapper">
        <div ref={bookRef} className={`grimoire-book ${isOpen ? 'is-open' : ''}`}>
          {/* Front Cover */}
          <div className="page page-cover" data-density="hard">
            <div className="cover-content front-cover">
              <div className="cover-texture" />
              <div className="cover-grid" />

              {/* Cobweb corners - elaborate SVG for witchy effect */}
              <svg className="cobweb cobweb-top-left" viewBox="0 0 100 100" preserveAspectRatio="none">
                {/* Main radial strands */}
                <path d="M0,0 L100,100 M0,0 L70,100 M0,0 L100,70 M0,0 L40,100 M0,0 L100,40 M0,0 L20,100 M0,0 L100,20"
                      stroke="rgba(200,190,170,0.25)" strokeWidth="0.4" fill="none"/>
                {/* Concentric arcs */}
                <path d="M15,0 Q15,15 0,15 M30,0 Q30,30 0,30 M50,0 Q50,50 0,50 M70,0 Q70,70 0,70"
                      stroke="rgba(180,170,150,0.2)" strokeWidth="0.3" fill="none"/>
                {/* Extra detail threads */}
                <path d="M8,0 Q10,8 0,8 M22,0 Q24,22 0,22 M40,0 Q42,40 0,40 M60,0 Q62,60 0,60"
                      stroke="rgba(190,180,160,0.15)" strokeWidth="0.2" fill="none"/>
              </svg>
              <svg className="cobweb cobweb-top-right" viewBox="0 0 100 100" preserveAspectRatio="none">
                <path d="M100,0 L0,100 M100,0 L30,100 M100,0 L0,70 M100,0 L60,100 M100,0 L0,40 M100,0 L80,100 M100,0 L0,20"
                      stroke="rgba(200,190,170,0.22)" strokeWidth="0.4" fill="none"/>
                <path d="M85,0 Q85,15 100,15 M70,0 Q70,30 100,30 M50,0 Q50,50 100,50 M30,0 Q30,70 100,70"
                      stroke="rgba(180,170,150,0.18)" strokeWidth="0.3" fill="none"/>
              </svg>
              <svg className="cobweb cobweb-bottom-left" viewBox="0 0 100 100" preserveAspectRatio="none">
                <path d="M0,100 L100,0 M0,100 L70,0 M0,100 L100,30 M0,100 L40,0 M0,100 L100,60"
                      stroke="rgba(190,180,160,0.2)" strokeWidth="0.35" fill="none"/>
                <path d="M0,85 Q15,85 15,100 M0,70 Q30,70 30,100 M0,50 Q50,50 50,100"
                      stroke="rgba(180,170,150,0.15)" strokeWidth="0.25" fill="none"/>
              </svg>

              {/* Burn marks and weathering spots */}
              <div className="burn-marks-container">
                {[...Array(8)].map((_, i) => (
                  <div
                    key={`burn-${i}`}
                    className="burn-mark"
                    style={{
                      left: `${5 + Math.random() * 90}%`,
                      top: `${5 + Math.random() * 90}%`,
                      width: `${20 + Math.random() * 60}px`,
                      height: `${15 + Math.random() * 45}px`,
                      transform: `rotate(${Math.random() * 360}deg)`,
                      opacity: 0.15 + Math.random() * 0.25,
                    }}
                  />
                ))}
              </div>

              {/* Floating dust motes - keeping subtle dust */}
              <div className="dust-motes">
                {[...Array(20)].map((_, i) => (
                  <div
                    key={`dust-${i}`}
                    className="dust-mote"
                    style={{
                      left: `${Math.random() * 100}%`,
                      top: `${Math.random() * 100}%`,
                      animationDelay: `${Math.random() * 8}s`,
                      animationDuration: `${6 + Math.random() * 8}s`,
                      opacity: 0.08 + Math.random() * 0.15,
                      width: `${1 + Math.random() * 1.5}px`,
                      height: `${1 + Math.random() * 1.5}px`,
                    }}
                  />
                ))}
              </div>

              {/* Spine studs - large brass studs along the spine edge */}
              <div className="spine-studs">
                {[...Array(5)].map((_, i) => (
                  <div key={`spine-stud-${i}`} className="spine-stud" />
                ))}
              </div>

              {/* Corner studs - large decorative studs */}
              <div className="cover-studs">
                <div className="stud stud-top-left" />
                <div className="stud stud-top-right" />
                <div className="stud stud-bottom-left" />
                <div className="stud stud-bottom-right" />
              </div>

              {/* Decorative stud border frame */}
              <div className="stud-border">
                {/* Top row of small studs */}
                {[...Array(10)].map((_, i) => (
                  <div key={`stud-top-${i}`} className="border-stud border-stud-top" style={{ left: `${12 + i * 8}%` }} />
                ))}
                {/* Bottom row */}
                {[...Array(10)].map((_, i) => (
                  <div key={`stud-bottom-${i}`} className="border-stud border-stud-bottom" style={{ left: `${12 + i * 8}%` }} />
                ))}
                {/* Left column */}
                {[...Array(6)].map((_, i) => (
                  <div key={`stud-left-${i}`} className="border-stud border-stud-left" style={{ top: `${18 + i * 12}%` }} />
                ))}
                {/* Right column */}
                {[...Array(6)].map((_, i) => (
                  <div key={`stud-right-${i}`} className="border-stud border-stud-right" style={{ top: `${18 + i * 12}%` }} />
                ))}
              </div>

              <div className="cover-border" />


              {/* Crystal ball / glass orb - GOLDEN */}
              <div className="crystal-ball">
                <div className="crystal-ball-inner">
                  <div className="crystal-ball-highlight" />
                  <div className="crystal-ball-highlight-2" />
                  <Image
                    src="/artwork/Galaxtc logo.png"
                    alt="Galaxtc"
                    width={160}
                    height={160}
                    className="crystal-ball-logo"
                  />
                  <div className="crystal-ball-reflection" />
                </div>
              </div>
              <div className="cover-spine" />

              {/* Extra texture overlay */}
              <div className="texture-grain" />
            </div>
          </div>

          {/* Artwork Spreads - Left: Image, Right: Description */}
          {artworks.map((artwork, index) => (
            <React.Fragment key={artwork.id}>
              {/* Left page - Artwork */}
              <div className="page page-content">
                <div className="parchment-page artwork-page">
                  <div className="parchment-texture" />
                  <div className="page-aging-overlay" />
                  <div className="page-edge left-edge" />
                  <CornerOrnament position="top-left" />
                  <CornerOrnament position="top-right" />
                  <CornerOrnament position="bottom-left" />
                  <CornerOrnament position="bottom-right" />
                  <div className="artwork-frame">
                    <div className="frame-border" />
                    <div className="artwork-image-container">
                      <Image
                        src={
                          artwork.hasBlacklight && showBlacklight[artwork.id]
                            ? artwork.blacklightImage!
                            : artwork.image
                        }
                        alt={artwork.title}
                        fill
                        className="artwork-image"
                        sizes="(max-width: 1024px) 320px, 500px"
                        priority={index < 2}
                      />
                    </div>
                    {artwork.hasBlacklight && (
                      <button
                        className="blacklight-toggle"
                        onClick={() => toggleBlacklight(artwork.id)}
                        title="Toggle blacklight view"
                      >
                        {showBlacklight[artwork.id] ? "☀️" : "🔮"}
                      </button>
                    )}
                  </div>
                  <div className="page-number left">{index * 2 + 1}</div>
                </div>
              </div>

              {/* Right page - Description */}
              <div className="page page-content">
                <div className="parchment-page description-page">
                  <div className="parchment-texture" />
                  <div className="page-aging-overlay" />
                  <div className="page-edge right-edge" />
                  <CornerOrnament position="top-left" />
                  <CornerOrnament position="top-right" />
                  <CornerOrnament position="bottom-left" />
                  <CornerOrnament position="bottom-right" />
                  <div className="description-content">
                    <h2 className="artwork-title">{artwork.title}</h2>
                    <div className="title-underline" />
                    <div className="artwork-details">
                      <p className="technique">
                        <span className="detail-label">Technique:</span>{" "}
                        {artwork.technique}
                      </p>
                      {artwork.size && (
                        <p className="size">
                          <span className="detail-label">Size:</span> {artwork.size}
                        </p>
                      )}
                    </div>
                    <div className="description-divider">
                      <span>&#x2726;</span>
                    </div>
                    <p className="artwork-description">{artwork.description}</p>
                    {artwork.hasBlacklight && (
                      <p className="blacklight-note">
                        This artwork transforms under UV blacklight
                      </p>
                    )}
                  </div>
                  <div className="page-number right">{index * 2 + 2}</div>
                </div>
              </div>
            </React.Fragment>
          ))}

          {/* Final Pages - Contact */}
          <div className="page page-content">
            <div className="parchment-page final-page">
              <div className="parchment-texture" />
              <div className="page-aging-overlay" />
              <CornerOrnament position="top-left" />
              <CornerOrnament position="top-right" />
              <CornerOrnament position="bottom-left" />
              <CornerOrnament position="bottom-right" />
              <div className="final-content">
                <h2 className="final-title">Contact</h2>
                <div className="title-underline" />
                <p className="contact-text">
                  Interested in commissioning a cosmic portrait of your beloved pet
                  or a custom piece of cosmic art?
                </p>
                <div className="contact-info">
                  <p>galaxtc.nl</p>
                </div>
                <div className="final-ornament">
                  <Image
                    src="/artwork/Galaxtc logo.png"
                    alt="Galaxtc"
                    width={50}
                    height={50}
                    className="invert opacity-30"
                  />
                </div>
                <p className="copyright">All artwork © Galaxtc</p>
              </div>
            </div>
          </div>

          {/* Back Cover */}
          <div className="page page-cover" data-density="hard">
            <div className="cover-content back-cover">
              <div className="cover-texture" />
              <div className="cover-corners">
                <div className="corner top-left" />
                <div className="corner top-right" />
                <div className="corner bottom-left" />
                <div className="corner bottom-right" />
              </div>
              <div className="cover-border" />
              <div className="back-medallion">
                <Image
                  src="/artwork/Galaxtc logo.png"
                  alt="Galaxtc"
                  width={50}
                  height={50}
                  className="cover-logo small"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation hint */}
      <div className="nav-hint">
        <span className="hint-arrow left" onClick={flipPrev}>
          &#x2190;
        </span>
        <span className="hint-text">
          {currentPage === 0 ? "Open the grimoire" : `${Math.ceil(currentPage / 2)} / ${artworks.length}`}
        </span>
        <span className="hint-arrow right" onClick={flipNext}>
          &#x2192;
        </span>
      </div>

      {/* Keyboard hint */}
      <div className="keyboard-hint">
        Arrow keys or drag to turn pages
      </div>
    </div>
  );
}
