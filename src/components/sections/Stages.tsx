"use client";

import React from "react";
import { useTranslations } from "next-intl";
import { useApplyModal } from "@/features/apply/context/ApplyModalContext";
import { Button } from "@/components/ui/button";
import { Check, Clock, CalendarCheck, ArrowRight } from "lucide-react";
import { m } from "motion/react";
import { Reveal } from "@/components/motion/Reveal";

interface StepItem {
  num: string;
  tag: string;
  title: string;
  time: string;
  desc: string;
  highlights: string[];
}

interface StagesProps {
  onOpenApply?: (options?: string | { service?: string }) => void;
}

export function Stages({ onOpenApply }: StagesProps) {
  const { openApply } = useApplyModal();
  const handleApply = onOpenApply || openApply;
  const t = useTranslations("stages");

  const steps: StepItem[] = (t.raw("steps") as StepItem[]) || [];

  return (
    <section
      id="bosqichlar"
      aria-label={t("title")}
      className="scroll-mt-20 py-20 md:py-28 lg:py-36 bg-sand text-ink border-b border-sand-border relative overflow-x-clip"
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Sticky Editorial Intro & CTA (lg:col-span-5) */}
          <div className="lg:col-span-5 lg:sticky lg:top-28">
            <Reveal>
              {/* Eyebrow with hairline rule */}
              <div className="flex items-center gap-3 mb-4">
                <span className="font-mono text-xs uppercase tracking-[0.2em] text-terracotta font-semibold">
                  02 — {t("kicker") || "Bosqichlar"}
                </span>
                <div className="h-[1px] w-10 bg-terracotta/40" />
              </div>

              {/* Serif Heading with Italic Accent */}
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-forest leading-[1.12] tracking-tight">
                {t("titlePrefix")}
                <span className="italic text-terracotta font-normal block sm:inline lg:block mt-1">
                  {t("titleHighlight")}
                </span>
              </h2>

              <p className="text-base sm:text-lg text-ink/80 font-normal leading-relaxed mt-5 max-w-md">
                {t("description")}
              </p>

              {/* Direct CTA Action */}
              <div className="mt-8 pt-8 border-t border-sand-border flex flex-col gap-4">
                <p className="text-xs font-mono text-ink/70 uppercase tracking-wider">
                  {t("ctaBandTitle")}
                </p>

                <m.div whileTap={{ scale: 0.98 }}>
                  <Button
                    type="button"
                    onClick={() =>
                      handleApply({ service: "Individual psixologik konsultatsiya" })
                    }
                    className="w-full sm:w-auto h-12 min-h-[48px] px-8 rounded-full bg-terracotta-hover hover:bg-terracotta text-white font-semibold text-sm shadow-[0_4px_16px_rgba(176,90,63,0.35)] transition-all cursor-pointer flex items-center justify-center gap-2.5 whitespace-nowrap"
                  >
                    <CalendarCheck className="w-4 h-4 text-white" />
                    <span>{t("ctaBandButton")}</span>
                    <ArrowRight className="w-4 h-4 text-white" />
                  </Button>
                </m.div>
              </div>
            </Reveal>
          </div>

          {/* Right Column: Clean Editorial Vertical Timeline with Huge Numerals (lg:col-span-7) */}
          <div className="lg:col-span-7 relative">
            {/* 1px Vertical Connecting Line */}
            <div
              className="absolute left-[28px] sm:left-[32px] top-6 bottom-12 w-[1px] bg-sand-border"
              aria-hidden="true"
            />

            <div className="space-y-12 sm:space-y-16">
              {steps.map((step, idx) => (
                <Reveal key={step.num || idx} delay={idx * 0.12}>
                  <div className="relative flex items-start gap-6 sm:gap-10 group">
                    {/* Step Numeral / Bullet Column */}
                    <div className="shrink-0 relative z-10 flex flex-col items-center">
                      <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-cream border border-sand-border text-forest group-hover:bg-forest group-hover:text-ivory group-hover:border-forest flex items-center justify-center font-serif text-2xl sm:text-3xl font-normal shadow-sm transition-all duration-300">
                        {step.num}
                      </div>
                    </div>

                    {/* Step Content */}
                    <div className="flex-1 pt-1 pb-6 border-b border-sand-border/80">
                      <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                        <span className="font-mono text-xs font-semibold text-terracotta uppercase tracking-wider">
                          {step.tag}
                        </span>
                        <span className="inline-flex items-center gap-1.5 font-mono text-xs text-ink/70">
                          <Clock className="w-3.5 h-3.5 text-terracotta" />
                          <span>{step.time}</span>
                        </span>
                      </div>

                      <h3 className="font-serif text-2xl sm:text-3xl text-forest font-normal leading-snug mb-3 group-hover:text-terracotta-hover transition-colors">
                        {step.title}
                      </h3>

                      <p className="text-sm sm:text-base text-ink/80 leading-relaxed mb-6 font-normal">
                        {step.desc}
                      </p>

                      {/* Highlights with subtle hairline check marks */}
                      <ul className="space-y-2.5 pt-4 border-t border-sand-border/60 text-xs sm:text-sm text-ink/90">
                        {step.highlights?.map((h, hIdx) => (
                          <li key={hIdx} className="flex items-start gap-2.5">
                            <Check className="w-4 h-4 text-forest shrink-0 mt-0.5" />
                            <span className="leading-relaxed">{h}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Stages;
