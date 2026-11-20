"use client";

import React from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { useApplyModal } from "@/features/apply/context/ApplyModalContext";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { m, useReducedMotion } from "motion/react";
import { AnimatedCounter } from "@/components/motion/AnimatedCounter";
import { siteMedia } from "@/config/siteMedia";
import { EASE_EDITORIAL } from "@/lib/motion";

interface HeroProps {
  onOpenModal?: () => void;
  onOpenApply?: () => void;
}

export function Hero({ onOpenModal, onOpenApply }: HeroProps = {}) {
  const { openApply } = useApplyModal();
  const reduced = useReducedMotion();

  const handleOpenModal = () => {
    if (onOpenModal) onOpenModal();
    else if (onOpenApply) onOpenApply();
    else openApply();
  };

  const t = useTranslations("hero");
  const { portrait } = siteMedia.hero;

  return (
    <section
      id="hero"
      style={{
        background:
          "radial-gradient(ellipse 70% 60% at 85% 30%, rgba(200, 109, 81, 0.16) 0%, rgba(22, 56, 50, 0) 70%), #163832",
      }}
      className="scroll-mt-20 relative bg-forest text-ivory pt-28 sm:pt-32 lg:pt-36 pb-16 lg:pb-24 overflow-x-clip"
    >
      {/* Desktop Vertical Meta Rail on Left Edge */}
      <div
        className="hidden xl:flex absolute left-6 2xl:left-10 top-1/2 -translate-y-1/2 flex-col items-center gap-6 z-20 pointer-events-none select-none"
        aria-hidden="true"
      >
        <span className="[writing-mode:vertical-rl] rotate-180 font-mono text-[10px] uppercase tracking-[0.28em] text-mist/50">
          Toshkent · KBT Psixologiya
        </span>
        <div className="w-[1px] h-20 bg-white/15" />
      </div>

      <div className="max-w-7xl mx-auto w-full px-5 sm:px-8 lg:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 xl:gap-16 items-center">
          {/* Left Column (7 cols on lg) */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            {/* Eyebrow with Hairline Rule */}
            <div className="flex items-center gap-3 mb-5 sm:mb-6">
              <span className="font-mono text-xs uppercase tracking-[0.2em] text-terracotta font-semibold">
                00 — {t("specialtyTag")}
              </span>
              <div className="h-[1px] w-12 bg-terracotta/40" />
            </div>

            {/* Headline: very large serif, tight leading, italic word */}
            <m.h1
              className="font-serif text-ivory text-4xl sm:text-5xl lg:text-6xl xl:text-7xl leading-[1.08] tracking-tight"
              initial={reduced ? false : { opacity: 0.85, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: EASE_EDITORIAL }}
            >
              {t("titlePrefix")}
              <span className="italic text-terracotta ml-2 font-normal">
                {t("titleHighlight")}
              </span>
              {t("titleSuffix")}
            </m.h1>

            {/* Subtitle */}
            <p className="text-mist max-w-xl text-base md:text-lg leading-relaxed mt-6 font-normal">
              {t("description")}
            </p>

            {/* CTA Group: Primary Button + Text Link with Arrow */}
            <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row sm:items-center gap-5 sm:gap-7">
              <m.div whileTap={{ scale: 0.98 }} className="w-full sm:w-auto">
                <Button
                  size="lg"
                  onClick={handleOpenModal}
                  className="w-full sm:w-auto h-12 min-h-[48px] bg-terracotta-hover hover:bg-terracotta text-white px-8 rounded-full text-sm font-semibold tracking-wide shadow-[0_8px_24px_rgba(176,90,63,0.35)] hover:shadow-[0_12px_30px_rgba(176,90,63,0.45)] cursor-pointer active:scale-[0.98] flex items-center justify-center gap-2.5 transition-all"
                >
                  <span>{t("ctaPrimary")}</span>
                  <ArrowRight className="w-4 h-4 text-white" />
                </Button>
              </m.div>

              <Link
                href="/test"
                className="group inline-flex items-center justify-center gap-2 text-ivory/90 hover:text-white font-serif text-base tracking-wide transition-colors py-2 px-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-terracotta rounded-lg"
              >
                <span>{t("ctaSecondary")}</span>
                <span
                  className="transition-transform duration-300 group-hover:translate-x-1.5 text-terracotta text-lg"
                  aria-hidden="true"
                >
                  &rarr;
                </span>
              </Link>
            </div>

            {/* Ruled Strip for Stats: 3 stats separated by 1px vertical borders, no boxes */}
            <div className="border-t border-b border-white/10 py-6 mt-10 sm:mt-12 grid grid-cols-3 divide-x divide-white/10">
              {/* Stat 1: Audience */}
              <div className="pr-3 sm:pr-6">
                <div className="font-serif text-2xl sm:text-3xl lg:text-4xl text-ivory font-normal tracking-tight">
                  <AnimatedCounter value={t("statAudienceValue")} />
                </div>
                <div className="font-mono text-[10px] sm:text-xs text-mist/75 uppercase tracking-wider mt-1.5 leading-snug">
                  {t("metric1Desc")}
                </div>
              </div>

              {/* Stat 2: Experience */}
              <div className="px-3 sm:px-6">
                <div className="font-serif text-2xl sm:text-3xl lg:text-4xl text-ivory font-normal tracking-tight">
                  <AnimatedCounter value={t("statExperienceValue")} />
                </div>
                <div className="font-mono text-[10px] sm:text-xs text-mist/75 uppercase tracking-wider mt-1.5 leading-snug">
                  {t("metric2Desc")}
                </div>
              </div>

              {/* Stat 3: Confidentiality */}
              <div className="pl-3 sm:pl-6">
                <div className="font-serif text-2xl sm:text-3xl lg:text-4xl text-ivory font-normal tracking-tight">
                  <AnimatedCounter value={t("statPrivacyValue")} />
                </div>
                <div className="font-mono text-[10px] sm:text-xs text-mist/75 uppercase tracking-wider mt-1.5 leading-snug">
                  {t("metric3Desc")}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column (5 cols on lg) — Overlapping Arched Portrait */}
          <div className="lg:col-span-5 relative lg:-mb-28 z-20 flex flex-col items-center">
            <div className="relative w-full max-w-[380px] sm:max-w-[420px] lg:max-w-none">
              {/* Offset Depth Outline Arch */}
              <div
                className="absolute inset-0 rounded-t-full rounded-b-3xl border border-ivory/20 translate-x-3.5 translate-y-3.5 -z-10 pointer-events-none hidden sm:block"
                aria-hidden="true"
              />

              {/* Main Arched Frame */}
              <div className="relative aspect-[4/5] w-full rounded-t-full rounded-b-3xl overflow-hidden border border-ivory/25 shadow-2xl bg-forest-light">
                <Image
                  src={portrait.src}
                  alt={portrait.alt}
                  fill
                  priority
                  sizes="(max-width: 768px) 380px, (max-width: 1200px) 460px, 520px"
                  className="object-cover object-top select-none"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-forest/95 via-forest/25 to-transparent pointer-events-none" />

                <div className="absolute bottom-4 sm:bottom-5 left-4 sm:left-5 right-4 sm:right-5 z-20 flex flex-col xs:flex-row xs:items-baseline xs:justify-between gap-1 font-mono text-xs uppercase tracking-wider text-mist border-t border-white/10 pt-2.5 sm:pt-3">
                  <span className="text-ivory font-serif text-sm sm:text-base tracking-wide truncate">
                    Rozaliya Gabdulhakova
                  </span>
                  <span className="text-terracotta font-semibold text-[11px] sm:text-xs shrink-0">
                    KBT Psixolog
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
