"use client";

import React, { useRef, useState } from "react";
import { m, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  strength?: number; // px pull. Default 7.
}

/**
 * Wraps a button/element with a subtle magnetic cursor-pull effect on desktop only.
 * No effect on touch devices or when prefers-reduced-motion is active.
 */
export function MagneticButton({ children, className, strength = 7 }: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const [delta, setDelta] = useState({ x: 0, y: 0 });

  if (reduced) {
    return <div className={cn(className)}>{children}</div>;
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = (e.clientX - cx) / (rect.width / 2);
    const dy = (e.clientY - cy) / (rect.height / 2);
    setDelta({ x: dx * strength, y: dy * strength });
  };

  const handleMouseLeave = () => setDelta({ x: 0, y: 0 });

  return (
    <m.div
      ref={ref}
      className={cn("hidden md:contents", className)}
      animate={{ x: delta.x, y: delta.y }}
      transition={{ type: "spring", stiffness: 350, damping: 30 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </m.div>
  );
}
