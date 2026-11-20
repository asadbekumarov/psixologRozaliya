"use client";

import React from "react";
import { Reveal } from "@/components/motion/Reveal";
import { cn } from "@/lib/utils";

interface RevealOnScrollProps {
  children: React.ReactNode;
  delay?: number;
  yOffset?: number;
  className?: string;
  margin?: string;
}

/**
 * Legacy wrapper — now delegates to the motion-based Reveal primitive.
 */
export function RevealOnScroll({
  children,
  delay = 0,
  className,
}: RevealOnScrollProps) {
  return (
    <Reveal delay={delay} className={cn("w-full", className)}>
      {children}
    </Reveal>
  );
}
