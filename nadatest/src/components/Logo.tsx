"use client";

import React from "react";

interface LogoProps {
  variant?: "light" | "dark";
  size?: "sm" | "md" | "lg";
  iconOnly?: boolean;
  className?: string;
}

const sizeConfig = {
  sm: {
    icon: 32,
    iconRadius: 8,
    svgSize: 17,
    dashWidth: 14,
    dashHeight: 2,
    dashBottom: 5,
    dashSpread: 6,
    fontSize: 20,
    letterSpacing: "-0.6px",
    gap: 8,
  },
  md: {
    icon: 48,
    iconRadius: 12,
    svgSize: 26,
    dashWidth: 20,
    dashHeight: 3,
    dashBottom: 7,
    dashSpread: 8,
    fontSize: 28,
    letterSpacing: "-1px",
    gap: 14,
  },
  lg: {
    icon: 64,
    iconRadius: 16,
    svgSize: 34,
    dashWidth: 26,
    dashHeight: 4,
    dashBottom: 9,
    dashSpread: 10,
    fontSize: 36,
    letterSpacing: "-1.5px",
    gap: 16,
  },
};

export default function Logo({
  variant = "light",
  size = "md",
  iconOnly = false,
  className = "",
}: LogoProps) {
  const s = sizeConfig[size];
  const wordmarkColor = variant === "dark" ? "#F8FAFC" : "#0F172A";

  return (
    <div
      className={className}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: s.gap,
        textDecoration: "none",
      }}
    >
      {/* Icon */}
      <div
        style={{
          width: s.icon,
          height: s.icon,
          background: "#3B82F6",
          borderRadius: s.iconRadius,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
          position: "relative",
          boxShadow: "0 4px 14px rgba(59,130,246,0.35)",
        }}
      >
        {/* Checkmark */}
        <svg
          width={s.svgSize}
          height={s.svgSize}
          viewBox="0 0 26 26"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <polyline
            points="4,13 10,20 22,6"
            stroke="white"
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>

        {/* Road dashes — 3 pills at the bottom */}
        <div
          style={{
            position: "absolute",
            bottom: s.dashBottom,
            left: "50%",
            transform: "translateX(-50%)",
            width: s.dashWidth,
            height: s.dashHeight,
            background: "rgba(255,255,255,0.35)",
            borderRadius: s.dashHeight,
            boxShadow: `${-s.dashSpread}px 0 0 rgba(255,255,255,0.35), ${s.dashSpread}px 0 0 rgba(255,255,255,0.35)`,
          }}
        />
      </div>

      {/* Wordmark */}
      {!iconOnly && (
        <div
          style={{
            display: "flex",
            alignItems: "baseline",
            fontSize: s.fontSize,
            fontWeight: 800,
            letterSpacing: s.letterSpacing,
            lineHeight: 1,
          }}
        >
          <span style={{ color: wordmarkColor }}>Nada</span>
          <span style={{ color: "#3B82F6" }}>Test</span>
        </div>
      )}
    </div>
  );
}
