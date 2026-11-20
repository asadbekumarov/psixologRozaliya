"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface MarqueeProps {
  children: React.ReactNode;
  speed?: number; // seconds per full loop
  pauseOnHover?: boolean;
  reverse?: boolean;
  className?: string;
  innerClassName?: string;
  repeat?: number;
}

/**
 * Takroriy nusxalarda skrinriderlar takror o'qimasligi uchun
 * barcha <Image> yoki <img> lar alt="" qilinadi.
 */
function stripAltFromChildren(nodes: React.ReactNode, cloneIdx = 1): React.ReactNode {
  return React.Children.map(nodes, (child, index) => {
    if (!React.isValidElement(child)) return child;
    const props = child.props as Record<string, unknown>;
    const newProps: Record<string, unknown> = {};

    if ("alt" in props) {
      newProps.alt = "";
    }
    if (props.children) {
      newProps.children = stripAltFromChildren(props.children as React.ReactNode, cloneIdx);
    }

    return React.cloneElement(child, {
      ...newProps,
      key: `clone-${cloneIdx}-${child.key ?? index}`,
    });
  });
}

export function Marquee({
  children,
  speed = 35,
  pauseOnHover = true,
  reverse = false,
  className = "",
  innerClassName = "",
  repeat = 2,
}: MarqueeProps) {
  const animClass = reverse ? "animate-marquee-reverse" : "animate-marquee";

  return (
    <div
      className={cn(
        "overflow-hidden select-none flex w-full relative motion-reduce:overflow-x-auto motion-reduce:scroll-smooth",
        pauseOnHover ? "group" : "",
        className
      )}
    >
      {Array.from({ length: repeat }).map((_, i) => (
        <div
          key={i}
          aria-hidden={i > 0}
          className={cn(
            "flex shrink-0 items-center group-hover:[animation-play-state:paused] motion-reduce:animate-none",
            innerClassName || "gap-6 sm:gap-8 pr-6 sm:pr-8",
            animClass
          )}
          style={{
            animationDuration: `${speed}s`,
          }}
        >
          {i === 0 ? children : stripAltFromChildren(children, i)}
        </div>
      ))}
    </div>
  );
}
