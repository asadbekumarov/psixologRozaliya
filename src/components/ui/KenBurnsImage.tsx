"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface KenBurnsImageProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

export function KenBurnsImage({
  children,
  className,
}: KenBurnsImageProps) {
  return (
    <div className={cn("relative w-full h-full overflow-hidden group", className)}>
      <div className="relative w-full h-full transition-transform duration-1000 ease-out group-hover:scale-105 motion-reduce:transform-none">
        {children}
      </div>
    </div>
  );
}
