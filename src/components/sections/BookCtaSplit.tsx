"use client";

import React from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { useApplyModal } from "@/features/apply/context/ApplyModalContext";
import { Button } from "@/components/ui/button";
import { Check, ShieldCheck, HeartPulse } from "lucide-react";
import { m, useReducedMotion } from "motion/react";
import { Reveal } from "@/components/motion/Reveal";

interface BookCtaSplitProps {
  onOpenApply?: (options?: string | { service?: string }) => void;
}

export function BookCtaSplit({ onOpenApply }: BookCtaSplitProps) {
  const { openApply } = useApplyModal();
  const handleApply = onOpenApply || openApply;
  const t = useTranslations("book");
  const reduced = useReducedMotion();

  const handleConsultation = () => {
    handleApply(t("card1Title"));
  };

  return (
    <section
      id="qabul"
      aria-label={t("sectionAria")}
      className="scroll-mt-20 py-20 md:py-28 lg:py-36 border-b border-sand-border bg-sand text-ink relative overflow-x-clip"
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 relative z-10">
        {/* Section Header */}
        <Reveal className="max-w-3xl mb-12 sm:mb-16">
          <div className="flex items-center gap-3 mb-4">
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-terracotta font-semibold">
              04 — QABUL
            </span>
            <div className="h-[1px] w-10 bg-terracotta/40" />
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-normal tracking-tight text-forest leading-[1.14]">
            {t("titlePrefix")}
            <span className="italic text-terracotta ml-2">
              {t("titleHighlight")}
            </span>
          </h2>
        </Reveal>

        {/* 2 Equal Cards: Consultation & Assessment */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          {/* Card 1: Individual Consultation */}
          <Reveal delay={0.1}>
            <m.article
              whileHover={reduced ? undefined : { y: -4 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="h-full group relative overflow-hidden rounded-3xl border border-white/15 p-7 sm:p-10 flex flex-col justify-between shadow-xl min-h-[520px] transition-all duration-500 bg-forest"
            >
              {/* Background Image Container */}
              <div className="absolute inset-0 z-0">
                <Image
                  src="/images/cta/consultation-bg.webp"
                  alt={t("card1Title")}
                  fill
                  sizes="(max-width: 1024px) 100vw, 600px"
                  className="object-cover object-[center_30%] group-hover:scale-105 transition-transform duration-700 ease-out opacity-30"
                />
                {/* Dark Rich Editorial Gradient Scrim */}
                <div className="absolute inset-0 bg-gradient-to-t from-forest via-forest/95 to-forest/80" />
              </div>

              {/* Card Content (Crisp High-Contrast White & Cream) */}
              <div className="relative z-10">
                <div className="w-12 h-12 rounded-2xl bg-white/10 border border-white/15 text-ivory flex items-center justify-center mb-6">
                  <HeartPulse className="w-6 h-6 text-terracotta" aria-hidden="true" />
                </div>

                <h3 className="font-serif text-2xl sm:text-3xl font-normal text-ivory mb-3 leading-snug">
                  {t("card1Title")}
                </h3>

                <p className="text-sm sm:text-base text-mist leading-relaxed mb-6 font-normal">
                  {t("card1Desc")}
                </p>

                <div className="p-4 sm:p-5 bg-white/5 rounded-2xl border border-white/10 text-xs sm:text-sm text-ivory/95 space-y-3 mb-6 backdrop-blur-sm">
                  <div className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-terracotta shrink-0 mt-0.5" />
                    <span>{t("card1Point1")}</span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-terracotta shrink-0 mt-0.5" />
                    <span>{t("card1Point2")}</span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-terracotta shrink-0 mt-0.5" />
                    <span>{t("card1Point3")}</span>
                  </div>
                </div>
              </div>

              {/* CTA 1: Apply for consultation */}
              <div className="relative z-10 pt-5 border-t border-white/10">
                <m.div whileTap={{ scale: 0.98 }}>
                  <Button
                    type="button"
                    onClick={handleConsultation}
                    className="w-full sm:w-auto min-h-[48px] px-8 rounded-full bg-terracotta-hover hover:bg-terracotta text-white text-sm font-semibold tracking-wide shadow-md transition-all cursor-pointer"
                  >
                    {t("card1Cta")} &rarr;
                  </Button>
                </m.div>
              </div>
            </m.article>
          </Reveal>

          {/* Card 2: 3-Minute Assessment Test */}
          <Reveal delay={0.2}>
            <m.article
              whileHover={reduced ? undefined : { y: -4 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="h-full group relative overflow-hidden rounded-3xl border border-white/15 p-7 sm:p-10 flex flex-col justify-between shadow-xl min-h-[520px] transition-all duration-500 bg-forest"
            >
              {/* Background Image Container */}
              <div className="absolute inset-0 z-0">
                <Image
                  src="/images/cta/diagnostic-bg.webp"
                  alt={t("card2Title")}
                  fill
                  sizes="(max-width: 1024px) 100vw, 600px"
                  className="object-cover object-[center_20%] group-hover:scale-105 transition-transform duration-700 ease-out opacity-30"
                />
                {/* Dark Rich Editorial Gradient Scrim */}
                <div className="absolute inset-0 bg-gradient-to-t from-forest via-forest/95 to-forest/80" />
              </div>

              {/* Card Content (Crisp High-Contrast White & Cream) */}
              <div className="relative z-10">
                <div className="w-12 h-12 rounded-2xl bg-white/10 border border-white/15 text-ivory flex items-center justify-center mb-6">
                  <ShieldCheck className="w-6 h-6 text-terracotta" aria-hidden="true" />
                </div>

                <h3 className="font-serif text-2xl sm:text-3xl font-normal text-ivory mb-3 leading-snug">
                  {t("card2Title")}
                </h3>

                <p className="text-sm sm:text-base text-mist leading-relaxed mb-6 font-normal">
                  {t("card2Desc")}
                </p>

                <div className="p-4 sm:p-5 bg-white/5 rounded-2xl border border-white/10 text-xs sm:text-sm text-ivory/95 space-y-3 mb-6 backdrop-blur-sm">
                  <div className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-terracotta shrink-0 mt-0.5" />
                    <span>{t("card2Point1")}</span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-terracotta shrink-0 mt-0.5" />
                    <span>{t("card2Point2")}</span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-terracotta shrink-0 mt-0.5" />
                    <span>{t("card2Point3")}</span>
                  </div>
                </div>
              </div>

              {/* CTA 2: Start 3-minute test */}
              <div className="relative z-10 pt-5 border-t border-white/10">
                <m.div whileTap={{ scale: 0.98 }}>
                  <Button
                    asChild
                    className="w-full sm:w-auto min-h-[48px] px-8 rounded-full bg-cream text-forest hover:bg-ivory text-sm font-semibold tracking-wide shadow-md transition-all cursor-pointer"
                  >
                    <Link href="/test">
                      <span>{t("card2Cta")} &rarr;</span>
                    </Link>
                  </Button>
                </m.div>
              </div>
            </m.article>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
