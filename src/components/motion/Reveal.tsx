"use client";

import React from "react";
import { m } from "motion/react";
import { useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

interface RevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  /** y offset in px. Default 24. */
  y?: number;
}

/**
 * Fade-up reveal on scroll. Uses whileInView so it's SSR-safe.
 * When prefers-reduced-motion is active, renders content immediately.
 */
export function Reveal({ children, className, delay = 0, y = 24 }: RevealProps) {
  const reduced = useReducedMotion();

  if (reduced) {
    return <div className={className}>{children}</div>;
  }

  return (
    <m.div
      variants={{
        hidden: { opacity: 0, y },
        visible: {
          opacity: 1,
          y: 0,
          transition: {
            duration: 0.6,
            ease: [0.22, 1, 0.36, 1],
            delay,
          },
        },
      }}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "0px" }}
      className={cn(className)}
    >
      {children}
    </m.div>
  );
}
