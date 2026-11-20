"use client";

import React from "react";
import { useTranslations } from "next-intl";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Star } from "lucide-react";
import { m, useReducedMotion } from "motion/react";
import { Reveal } from "@/components/motion/Reveal";

interface TestimonialItem {
  id: string;
  author: string;
  format: string;
  avatarText: string;
  highlight: string;
  message: string;
  topicTag?: string;
}

export function MediaArchive() {
  const t = useTranslations("mediaArchive");
  const reduced = useReducedMotion();

  const rawTestimonials: TestimonialItem[] = (t.raw("testimonials") as TestimonialItem[]) || [];

  const topicTags = [
    "#SokinOnalik",
    "#OnaDamOlishi",
    "#BolaTarbiyasi",
    "#ShaxsiySeans",
    "#BaxtiyorOila",
    "#KBTterapiya",
  ];

  const testimonialsList = rawTestimonials.map((item, idx) => ({
    ...item,
    topicTag: topicTags[idx % topicTags.length],
  }));

  const featured = testimonialsList[0];
  const remaining = testimonialsList.slice(1);
  const col1 = remaining.filter((_, i) => i % 2 === 0);
  const col2 = remaining.filter((_, i) => i % 2 !== 0);

  return (
    <section
      id="natijalar"
      aria-label={t("sectionAria")}
      className="scroll-mt-28 sm:scroll-mt-32 py-20 md:py-28 lg:py-36 bg-sand text-ink relative overflow-x-clip border-b border-sand-border"
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl mb-12 lg:mb-16">
          <Reveal>
            {/* Eyebrow with hairline rule */}
            <div className="flex items-center gap-3 mb-4">
              <span className="font-mono text-xs uppercase tracking-[0.2em] text-terracotta font-semibold">
                04 — {t("kicker")}
              </span>
              <div className="h-[1px] w-12 bg-terracotta/40" />
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-forest leading-[1.14] tracking-tight">
              {t("headingPrefix")}
              <span className="italic text-terracotta font-normal block sm:inline">
                {t("headingHighlight")}
              </span>
            </h2>
          </Reveal>
        </div>

        {/* Testimonials Editorial Layout */}
        <div className="space-y-8">
          {/* 1. Large Featured Testimonial on Top */}
          {featured && (
            <Reveal>
              <div className="bg-cream border border-sand-border rounded-3xl p-8 sm:p-10 lg:p-12 shadow-card relative overflow-hidden">
                <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                  <span className="inline-flex items-center px-3.5 py-1.5 rounded-full text-xs font-mono font-medium tracking-wide bg-forest text-ivory">
                    {featured.topicTag}
                  </span>
                  <div className="flex items-center gap-1 text-terracotta">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                </div>

                {/* Big Serif Quote Highlight */}
                <blockquote className="font-serif italic text-2xl sm:text-3xl lg:text-4xl text-forest font-normal leading-snug mb-6 max-w-4xl">
                  &ldquo;{featured.highlight}&rdquo;
                </blockquote>

                {/* Message Detail */}
                <div className="text-sm sm:text-base text-ink/80 leading-relaxed font-normal mb-8 max-w-3xl">
                  {featured.message}
                </div>

                {/* Author Line */}
                <div className="flex items-center gap-3 pt-6 border-t border-sand-border">
                  <Avatar className="w-10 h-10 border border-sand-border bg-sand-deep text-forest">
                    <AvatarFallback className="font-mono text-xs font-semibold">
                      {featured.avatarText || "M"}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="text-sm font-serif font-semibold text-forest">
                      {featured.author}
                    </div>
                    <div className="text-xs font-mono text-ink/70">
                      {featured.format} · Natijaga erishilgan keys
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          )}

          {/* 2. Staggered/Masonry 2-Column Layout (col2 offset down by 48px on desktop) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 items-start">
            {/* Column 1 */}
            <div className="space-y-6">
              {col1.map((item, idx) => (
                <Reveal key={item.id || idx} delay={idx * 0.1}>
                  <m.article
                    whileHover={reduced ? undefined : { y: -4 }}
                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    className="bg-cream border border-sand-border rounded-2xl p-6 sm:p-7 flex flex-col justify-between shadow-card hover:border-forest/40 transition-colors"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-[11px] font-mono font-medium tracking-wide bg-forest text-ivory">
                          {item.topicTag}
                        </span>
                        <div className="flex items-center gap-0.5 text-terracotta">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className="w-3.5 h-3.5 fill-current" />
                          ))}
                        </div>
                      </div>

                      <p className="font-serif italic text-lg text-forest font-medium leading-snug mb-3">
                        &ldquo;{item.highlight}&rdquo;
                      </p>

                      <div className="bg-sand/60 rounded-xl p-4 border border-sand-border/70 text-xs sm:text-sm text-ink/85 leading-relaxed font-normal mb-5">
                        {item.message}
                      </div>
                    </div>

                    <div className="flex items-center gap-3 pt-3 border-t border-sand-border">
                      <Avatar className="w-8 h-8 border border-sand-border bg-sand-deep text-forest">
                        <AvatarFallback className="font-mono text-xs font-semibold">
                          {item.avatarText || "M"}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="text-xs font-serif font-semibold text-forest">
                          {item.author}
                        </div>
                        <div className="text-[11px] font-mono text-ink/70">
                          {item.format}
                        </div>
                      </div>
                    </div>
                  </m.article>
                </Reveal>
              ))}
            </div>

            {/* Column 2 (Offset down by 48px on lg) */}
            <div className="space-y-6 lg:pt-12">
              {col2.map((item, idx) => (
                <Reveal key={item.id || idx} delay={idx * 0.1 + 0.1}>
                  <m.article
                    whileHover={reduced ? undefined : { y: -4 }}
                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    className="bg-cream border border-sand-border rounded-2xl p-6 sm:p-7 flex flex-col justify-between shadow-card hover:border-forest/40 transition-colors"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-[11px] font-mono font-medium tracking-wide bg-forest text-ivory">
                          {item.topicTag}
                        </span>
                        <div className="flex items-center gap-0.5 text-terracotta">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className="w-3.5 h-3.5 fill-current" />
                          ))}
                        </div>
                      </div>

                      <p className="font-serif italic text-lg text-forest font-medium leading-snug mb-3">
                        &ldquo;{item.highlight}&rdquo;
                      </p>

                      <div className="bg-sand/60 rounded-xl p-4 border border-sand-border/70 text-xs sm:text-sm text-ink/85 leading-relaxed font-normal mb-5">
                        {item.message}
                      </div>
                    </div>

                    <div className="flex items-center gap-3 pt-3 border-t border-sand-border">
                      <Avatar className="w-8 h-8 border border-sand-border bg-sand-deep text-forest">
                        <AvatarFallback className="font-mono text-xs font-semibold">
                          {item.avatarText || "M"}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="text-xs font-serif font-semibold text-forest">
                          {item.author}
                        </div>
                        <div className="text-[11px] font-mono text-ink/70">
                          {item.format}
                        </div>
                      </div>
                    </div>
                  </m.article>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default MediaArchive;
