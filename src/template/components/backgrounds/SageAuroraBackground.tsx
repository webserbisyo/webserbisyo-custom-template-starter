"use client";

import React, { useId } from "react";

export interface SageAuroraBackgroundProps {
  className?: string;
  intensity?: "soft" | "medium" | "dramatic";
  animated?: boolean;
  children?: React.ReactNode;
}

/**
 * Ambient Rose & Champagne Bloom Background.
 * Retained for backward compatibility.
 */
export function SageAuroraBackground({
  className = "",
  intensity = "soft",
  children,
}: SageAuroraBackgroundProps) {
  const filterId = useId();

  const opacityMap = {
    soft: "opacity-40",
    medium: "opacity-60",
    dramatic: "opacity-80",
  };

  return (
    <div className={`relative isolate overflow-hidden ${className}`}>
      <div
        aria-hidden="true"
        className={`pointer-events-none absolute inset-0 -z-10 ${opacityMap[intensity]}`}
      >
        <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <filter id={`filter-${filterId}`} x="-20%" y="-20%" width="140%" height="140%">
              <feTurbulence
                type="fractalNoise"
                baseFrequency="0.015"
                numOctaves="3"
                result="noise"
              />
              <feDisplacementMap
                in="SourceGraphic"
                in2="noise"
                scale="30"
                xChannelSelector="R"
                yChannelSelector="G"
              />
            </filter>
            <linearGradient id={`grad1-${filterId}`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FAF5F5" />
              <stop offset="50%" stopColor="#F4EBEB" />
              <stop offset="100%" stopColor="#FFF0EE" />
            </linearGradient>
            <radialGradient id={`grad2-${filterId}`} cx="60%" cy="40%" r="50%">
              <stop offset="0%" stopColor="#E65C4F" stopOpacity="0.12" />
              <stop offset="100%" stopColor="#B76E79" stopOpacity="0" />
            </radialGradient>
          </defs>
          <rect width="100%" height="100%" fill={`url(#grad1-${filterId})`} />
          <rect
            width="100%"
            height="100%"
            fill={`url(#grad2-${filterId})`}
            filter={`url(#filter-${filterId})`}
          />
        </svg>
      </div>
      {children}
    </div>
  );
}

export const DebutRoseBackground = SageAuroraBackground;
