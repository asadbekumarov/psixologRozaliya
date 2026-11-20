"use client";

import React from "react";
import { useTranslations } from "next-intl";
import { Marquee } from "@/components/ui/Marquee";

export function MarqueeTicker() {
  const t = useTranslations("hero");
  const tickerItems: string[] = (t.raw("tickerItems") as string[]) || [];

  return (
    <div
      aria-label="Topics Ticker"
      className="w-full bg-sand-deep border-y border-sand-border py-4 select-none overflow-hidden relative z-0"
    >
      <Marquee speed={30} pauseOnHover={true} repeat={4}>
        <div className="flex items-center gap-8 font-serif italic text-sm sm:text-base tracking-[0.08em] text-forest font-medium whitespace-nowrap">
          {tickerItems.map((item, idx) => (
            <React.Fragment key={idx}>
              <span className="hover:text-terracotta-hover transition-colors">
                {item}
              </span>
              <span
                className="w-1.5 h-1.5 rounded-full bg-terracotta/70 shrink-0"
                aria-hidden="true"
              />
            </React.Fragment>
          ))}
        </div>
      </Marquee>
    </div>
  );
}

export default MarqueeTicker;
