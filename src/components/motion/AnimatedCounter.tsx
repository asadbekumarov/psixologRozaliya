"use client";

import React, { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

interface AnimatedCounterProps {
  /** The final display value as a string, e.g. "98.9K+" or "8+" */
  value: string;
  className?: string;
  /** Duration in ms. Default 1500. */
  duration?: number;
}

/**
 * Counts up to the numeric value embedded in a string once it enters the viewport.
 * Preserves any prefix/suffix (e.g. "98.9K+", "8+", "100%").
 * On prefers-reduced-motion shows the final value immediately.
 */
export function AnimatedCounter({ value, className, duration = 1500 }: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });
  const reduced = useReducedMotion();
  const [displayed, setDisplayed] = useState(value);

  useEffect(() => {
    if (reduced || !isInView) {
      setDisplayed(value);
      return;
    }

    // Parse: extract leading number (possibly float), keep suffix
    const match = value.match(/^([\d.]+)(.*)/);
    if (!match) {
      setDisplayed(value);
      return;
    }

    const target = parseFloat(match[1]);
    const suffix = match[2]; // e.g. "K+", "+", "%"
    const isDecimal = match[1].includes(".");
    const decimalPlaces = isDecimal ? (match[1].split(".")[1]?.length ?? 1) : 0;

    const startTime = performance.now();

    const tick = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = target * eased;

      setDisplayed(
        (isDecimal ? current.toFixed(decimalPlaces) : Math.round(current).toString()) + suffix
      );

      if (progress < 1) {
        requestAnimationFrame(tick);
      } else {
        setDisplayed(value);
      }
    };

    requestAnimationFrame(tick);
  }, [isInView, value, duration, reduced]);

  return (
    <span ref={ref} className={cn(className)}>
      {displayed}
    </span>
  );
}
