"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import SpaceBackground from "@/components/SpaceBackground";

// Dynamic import for GrimoireBook to avoid SSR issues with page-flip
const GrimoireBook = dynamic(() => import("@/components/GrimoireBook"), {
  ssr: false,
  loading: () => <LoadingScreen />,
});

function LoadingScreen() {
  return (
    <div className="loading-screen">
      <div className="loading-book">
        <Image
          src="/artwork/Galaxtc logo.png"
          alt="Loading..."
          width={80}
          height={80}
          className="invert"
        />
      </div>
      <p className="loading-text">Opening the Grimoire...</p>
    </div>
  );
}

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    // Preload images
    const preloadImages = async () => {
      const imagePaths = [
        "/artwork/Galaxtc logo.png",
        "/artwork/The Red Conqueror.jpg",
        "/artwork/Charlie Spacing Out.jpg",
        "/artwork/A trip to Hogwarts.jpg",
      ];

      await Promise.all(
        imagePaths.map(
          (src) =>
            new Promise((resolve) => {
              const img = new window.Image();
              img.onload = resolve;
              img.onerror = resolve;
              img.src = src;
            })
        )
      );

      // Minimum loading time for effect
      setTimeout(() => {
        setIsLoading(false);
        setTimeout(() => setShowContent(true), 500);
      }, 1500);
    };

    preloadImages();
  }, []);

  return (
    <main className="relative min-h-screen overflow-hidden">
      <SpaceBackground />

      {isLoading && <LoadingScreen />}

      <div
        className={`transition-opacity duration-1000 ${
          showContent ? "opacity-100" : "opacity-0"
        }`}
      >
        <GrimoireBook />
      </div>
    </main>
  );
}
