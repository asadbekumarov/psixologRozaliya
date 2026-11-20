"use client";

import React from "react";
import { LazyMotion, domAnimation } from "motion/react";

/**
 * Wraps the app in a single LazyMotion boundary to load only
 * the domAnimation feature bundle (~18 kB) instead of the full library.
 * Place this once at the app level (layout.tsx or providers.tsx).
 */
export function MotionProvider({ children }: { children: React.ReactNode }) {
  return <LazyMotion features={domAnimation}>{children}</LazyMotion>;
}
