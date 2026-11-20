import React from "react";

interface RgMonogramProps {
  className?: string;
  size?: number;
  light?: boolean;
}

export function RgMonogram({
  className = "",
  size,
  light = false,
}: RgMonogramProps) {
  const borderColor = light ? "rgba(247, 243, 235, 0.35)" : "rgba(22, 56, 50, 0.25)";
  const textColor = light ? "#F7F3EB" : "#163832";

  return (
    <div
      className={`relative flex items-center justify-center rounded-full shrink-0 transition-all duration-300 ${size ? "" : "w-11 h-11"} ${className}`}
      style={{
        ...(size ? { width: size, height: size } : {}),
        border: `1.5px solid ${borderColor}`,
      }}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 44 44"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full p-1"
      >
        <circle
          cx="22"
          cy="22"
          r="19.5"
          stroke={borderColor}
          strokeWidth="1.5"
          className="transition-colors duration-300"
        />
        <text
          x="22"
          y="27"
          textAnchor="middle"
          fill={textColor}
          style={{
            fontFamily: "var(--font-serif), 'Playfair Display', Georgia, serif",
            fontWeight: 600,
            fontSize: "17px",
            letterSpacing: "0.08em",
          }}
          className="select-none transition-colors duration-300"
        >
          RG
        </text>
      </svg>
    </div>
  );
}
