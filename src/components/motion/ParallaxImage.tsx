"use client";

import React, { useRef } from "react";
import { m, useScroll, useTransform, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

interface ParallaxImageProps {
  children: React.ReactNode;
  className?: string;
  /** Max px offset up/down. Default 40. On mobile automatically halved. */
  range?: number;
}

/**
 * Wraps portrait/image content with a subtle parallax scroll effect.
 * Respects prefers-reduced-motion — disables parallax when active.
 */
export function ParallaxImage({ children, className, range = 40 }: ParallaxImageProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [range, -range]);

  if (reduced) {
    return <div ref={ref} className={cn("overflow-hidden", className)}>{children}</div>;
  }

  return (
    <div ref={ref} className={cn("overflow-hidden", className)}>
      <m.div style={{ y }} className="will-change-transform">
        {children}
      </m.div>
    </div>
  );
}
