"use client";

import React from "react";

interface MaskedHeadingProps {
  children: React.ReactNode;
  className?: string;
  as?: "h1" | "h2" | "h3";
  delay?: number;
}

export function MaskedHeading({
  children,
  className,
  as: Tag = "h2",
}: MaskedHeadingProps) {
  return <Tag className={className}>{children}</Tag>;
}
