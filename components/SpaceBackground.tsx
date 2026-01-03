"use client";

import { useEffect, useRef } from "react";

interface Star {
  x: number;
  y: number;
  size: number;
  opacity: number;
  twinkleSpeed: number;
  twinkleOffset: number;
  color: { r: number; g: number; b: number }; // Star color
}

interface Nebula {
  x: number;
  y: number;
  radius: number;
  color: string;
  speed: number;
  offset: number;
}

export default function SpaceBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const starsRef = useRef<Star[]>([]);
  const nebulaeRef = useRef<Nebula[]>([]);
  const animationRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initializeStars();
      initializeNebulae();
    };

    const initializeStars = () => {
      // More animated twinkling stars for dynamic feel
      const starCount = 400; // More movement
      starsRef.current = [];

      // Star color palette - realistic star colors
      const starColors = [
        { r: 255, g: 255, b: 255 },   // Pure white (most common)
        { r: 255, g: 255, b: 255 },   // Pure white
        { r: 255, g: 255, b: 255 },   // Pure white
        { r: 255, g: 250, b: 240 },   // Warm white
        { r: 255, g: 245, b: 230 },   // Cream white
        { r: 200, g: 220, b: 255 },   // Cool blue-white
        { r: 180, g: 200, b: 255 },   // Light blue
        { r: 255, g: 220, b: 180 },   // Warm yellow
        { r: 255, g: 200, b: 150 },   // Orange tint
        { r: 255, g: 180, b: 180 },   // Soft red/pink
        { r: 220, g: 180, b: 255 },   // Soft purple
      ];

      for (let i = 0; i < starCount; i++) {
        const rand = Math.random();
        const isBright = rand > 0.85; // 15% bright accent stars
        const isMedium = rand > 0.5 && rand <= 0.85; // 35% medium

        // Pick random color from palette
        const color = starColors[Math.floor(Math.random() * starColors.length)];

        starsRef.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: isBright
            ? Math.random() * 2 + 2 // 2-4px bright (smaller, more refined)
            : isMedium
            ? Math.random() * 1.5 + 1 // 1-2.5px medium
            : Math.random() * 0.8 + 0.5, // 0.5-1.3px small
          opacity: 1,
          twinkleSpeed: Math.random() * 0.025 + 0.008, // Faster twinkle
          twinkleOffset: Math.random() * Math.PI * 2,
          color,
        });
      }
    };

    const initializeNebulae = () => {
      // Very subtle nebulae - almost invisible
      const nebulaColors = [
        "rgba(150, 180, 220, 0.008)", // very subtle blue-white
        "rgba(100, 140, 200, 0.006)", // very subtle blue
        "rgba(180, 200, 240, 0.005)", // very subtle light blue
        "rgba(80, 120, 180, 0.006)", // very subtle deep blue
      ];

      nebulaeRef.current = [];
      for (let i = 0; i < 5; i++) {
        nebulaeRef.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          radius: Math.random() * 400 + 200,
          color: nebulaColors[Math.floor(Math.random() * nebulaColors.length)],
          speed: (Math.random() - 0.5) * 0.1,
          offset: Math.random() * Math.PI * 2,
        });
      }
    };

    const drawNebulae = (time: number) => {
      nebulaeRef.current.forEach((nebula) => {
        const gradient = ctx.createRadialGradient(
          nebula.x + Math.sin(time * 0.0001 + nebula.offset) * 20,
          nebula.y + Math.cos(time * 0.0001 + nebula.offset) * 20,
          0,
          nebula.x,
          nebula.y,
          nebula.radius
        );
        gradient.addColorStop(0, nebula.color);
        gradient.addColorStop(1, "transparent");

        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      });
    };

    const drawStars = (time: number) => {
      starsRef.current.forEach((star) => {
        // Dynamic twinkle - more variation
        const twinkle = Math.sin(time * star.twinkleSpeed + star.twinkleOffset);
        const twinkle2 = Math.sin(time * star.twinkleSpeed * 0.7 + star.twinkleOffset * 1.3);
        const currentOpacity = star.opacity * (0.6 + twinkle * 0.3 + twinkle2 * 0.1);

        const { r, g, b } = star.color;

        // Draw star core with color
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${currentOpacity})`;
        ctx.fill();

        // Subtle soft glow - only for medium+ stars
        if (star.size > 1) {
          ctx.beginPath();
          ctx.arc(star.x, star.y, star.size * 1.8, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${currentOpacity * 0.25})`;
          ctx.fill();
        }

        // Very subtle outer glow for bright stars only
        if (star.size > 2.5) {
          ctx.beginPath();
          ctx.arc(star.x, star.y, star.size * 2.5, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${currentOpacity * 0.12})`;
          ctx.fill();
        }
      });
    };

    const animate = (time: number) => {
      // Clear canvas - let CSS starfield show through
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Skip nebulae for cleaner starry sky
      // drawNebulae(time);
      drawStars(time);

      animationRef.current = requestAnimationFrame(animate);
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);
    animationRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      cancelAnimationFrame(animationRef.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 -z-10"
      style={{ background: "transparent" }}
    />
  );
}
