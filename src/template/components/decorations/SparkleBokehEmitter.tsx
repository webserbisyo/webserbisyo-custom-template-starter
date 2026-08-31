"use client";

import React, { useEffect, useRef } from "react";

export interface SparkleBokehEmitterProps {
  className?: string;
  particleCount?: number;
}

interface Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  opacity: number;
  maxOpacity: number;
  color: string;
  pulseSpeed: number;
  pulseAngle: number;
}

const BOKEH_COLORS = [
  "rgba(212, 175, 55, ", // Champagne Gold
  "rgba(183, 110, 121, ", // Rose Gold
  "rgba(230, 92, 79, ", // Living Coral tint
  "rgba(255, 231, 226, ", // Soft Blush Rose
  "rgba(249, 241, 220, ", // Soft Champagne
];

/**
 * Ambient GPU-accelerated Bokeh & Sparkle Spore Emitter.
 * Drifts subtle luxury golden spores across the debut viewport.
 * Automatically halts when prefers-reduced-motion is active.
 */
export function SparkleBokehEmitter({
  className = "",
  particleCount = 28,
}: SparkleBokehEmitterProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Check reduced motion
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mediaQuery.matches) {
      return;
    }

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize, { passive: true });

    // Initialize particles
    const count = Math.min(particleCount, Math.floor(width / 35));
    const particles: Particle[] = [];

    for (let i = 0; i < count; i++) {
      const maxOp = Math.random() * 0.35 + 0.15;
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 4.5 + 1.5,
        speedX: (Math.random() - 0.5) * 0.35,
        speedY: -Math.random() * 0.45 - 0.15,
        opacity: Math.random() * maxOp,
        maxOpacity: maxOp,
        color: BOKEH_COLORS[Math.floor(Math.random() * BOKEH_COLORS.length)],
        pulseSpeed: Math.random() * 0.02 + 0.01,
        pulseAngle: Math.random() * Math.PI * 2,
      });
    }

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Move
        p.x += p.speedX;
        p.y += p.speedY;
        p.pulseAngle += p.pulseSpeed;

        // Pulsate opacity
        const currentOpacity = (Math.sin(p.pulseAngle) * 0.5 + 0.5) * p.maxOpacity;

        // Wrap boundaries
        if (p.y < -10) {
          p.y = height + 10;
          p.x = Math.random() * width;
        }
        if (p.x < -10) p.x = width + 10;
        if (p.x > width + 10) p.x = -10;

        // Draw soft glowing circular spore
        const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 2);
        gradient.addColorStop(0, `${p.color}${currentOpacity})`);
        gradient.addColorStop(0.5, `${p.color}${currentOpacity * 0.4})`);
        gradient.addColorStop(1, `${p.color}0)`);

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * 2, 0, Math.PI * 2);
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [particleCount]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={`fixed inset-0 pointer-events-none z-[1] w-full h-full select-none ${className}`}
    />
  );
}
