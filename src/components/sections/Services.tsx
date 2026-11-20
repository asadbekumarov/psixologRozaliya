"use client";

import React from "react";
import { useTranslations } from "next-intl";
import { useApplyModal, type OpenApplyOptions } from "@/features/apply/context/ApplyModalContext";
import { Button } from "@/components/ui/button";
import { Check, Clock, MapPin, ArrowUpRight } from "lucide-react";
import { m, useReducedMotion } from "motion/react";
import { Reveal } from "@/components/motion/Reveal";

interface ServiceEnhanced {
  index: string;
  tag: string;
  title: string;
  description: string;
  time: string;
  format: string;
  features: string[];
  cta: string;
}

interface ServicesProps {
  onOpenApply?: (options?: OpenApplyOptions) => void;
}

export function Services({ onOpenApply }: ServicesProps) {
  const { openApply } = useApplyModal();
  const handleApply = onOpenApply || openApply;
  const t = useTranslations("services");
  const reduced = useReducedMotion();

  const servicesList: ServiceEnhanced[] = (t.raw("itemsEnhanced") as ServiceEnhanced[]) || [];

  const onlineService = servicesList[0] || {};
  const offlineService = servicesList[1] || {};
  const flagshipCourse = servicesList[2] || {};

  return (
    <section
      id="xizmatlar"
      aria-label={t("title")}
      className="scroll-mt-20 py-20 md:py-28 lg:py-36 bg-sand text-ink relative overflow-x-clip border-b border-sand-border"
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Sticky Editorial Intro (lg:col-span-4) */}
          <div className="lg:col-span-4 lg:sticky lg:top-28">
            <Reveal>
              {/* Eyebrow with hairline rule */}
              <div className="flex items-center gap-3 mb-4">
                <span className="font-mono text-xs uppercase tracking-[0.2em] text-terracotta font-semibold">
                  01 — {t("kicker") || "Xizmatlar"}
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

              {/* Editorial Note / Quote divider */}
              <div className="hidden lg:block pt-8 mt-8 border-t border-sand-border text-xs font-mono text-ink/60 uppercase tracking-widest leading-loose">
                Individual yondashuv · Maxfiylik kafolati · Ilmiy KBT
              </div>
            </Reveal>
          </div>

          {/* Right Column: Asymmetric Staggered Cards (lg:col-span-8) */}
          <div className="lg:col-span-8 space-y-8">
            {/* 1. Flagship "Author Courses" (Full-width bg-forest panel with internal 2-column) */}
            <Reveal delay={0.1}>
              <div
                style={{
                  background:
                    "radial-gradient(ellipse 70% 60% at 85% 25%, rgba(200, 109, 81, 0.22) 0%, rgba(22, 56, 50, 0) 65%), #163832",
                }}
                className="bg-forest text-ivory border border-white/10 rounded-3xl p-7 sm:p-10 lg:p-12 shadow-2xl relative overflow-hidden"
              >
                <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start relative z-10">
                  {/* Left sub-column: Title, Description, Duration */}
                  <div className="md:col-span-7 flex flex-col justify-between">
                    <div>
                      <h3 className="font-serif text-3xl sm:text-4xl text-ivory font-normal leading-[1.18] mb-4">
                        {flagshipCourse.title}
                      </h3>

                      <p className="text-sm sm:text-base text-mist leading-relaxed font-normal mb-6">
                        {flagshipCourse.description}
                      </p>
                    </div>

                    <div className="inline-flex items-center gap-2 text-xs font-mono text-terracotta uppercase tracking-wider pt-2">
                      <Clock className="w-4 h-4" />
                      <span>{flagshipCourse.time || "8 hafta · 16 dars"}</span>
                    </div>
                  </div>

                  {/* Right sub-column: Course list / features & CTA */}
                  <div className="md:col-span-5 bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-md flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between mb-4 pb-3 border-b border-white/10">
                        <span className="font-mono text-xs uppercase tracking-widest text-mist">
                          Dastur modullari
                        </span>
                        <span className="font-serif text-2xl text-terracotta/80 font-normal">
                          03
                        </span>
                      </div>

                      <ul className="space-y-3 text-xs sm:text-sm text-ivory/90 mb-6">
                        {flagshipCourse.features?.map((feat, fIdx) => (
                          <li key={fIdx} className="flex items-start gap-2.5">
                            <Check className="w-4 h-4 text-terracotta shrink-0 mt-0.5" />
                            <span className="leading-snug">{feat}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <m.div whileTap={{ scale: 0.98 }}>
                      <Button
                        type="button"
                        onClick={() => handleApply({ service: flagshipCourse.title })}
                        className="w-full h-12 min-h-[48px] rounded-full bg-terracotta-hover hover:bg-terracotta text-white text-sm font-semibold tracking-wide shadow-[0_8px_24px_rgba(176,90,63,0.35)] transition-all cursor-pointer flex items-center justify-center gap-2"
                      >
                        <span>{flagshipCourse.cta || "Kursga ariza berish"}</span>
                        <ArrowUpRight className="w-4 h-4" />
                      </Button>
                    </m.div>
                  </div>
                </div>
              </div>
            </Reveal>

            {/* 2. Below Flagship: Online & Offline as Asymmetric (7/5) Cards */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 lg:gap-8 items-stretch">
              {/* Online Consultation Card (7 cols) */}
              <Reveal delay={0.15} className="md:col-span-7 flex">
                <m.div
                  whileHover={reduced ? undefined : { y: -4 }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  className="w-full bg-cream border border-sand-border rounded-3xl p-7 sm:p-8 flex flex-col justify-between shadow-card hover:border-forest/40 transition-colors duration-300 group"
                >
                  <div>
                    {/* Header with Large Serif Numeral & Tag */}
                    <div className="flex items-start justify-between gap-4 mb-4">
                      <div>
                        <span className="font-mono text-xs font-semibold text-terracotta uppercase tracking-wider block mb-1">
                          {onlineService.tag || "ONLAYN"}
                        </span>
                        <div className="flex items-center gap-1.5 text-xs font-mono text-ink/70">
                          <Clock className="w-3.5 h-3.5 text-terracotta" />
                          <span>{onlineService.time}</span>
                        </div>
                      </div>
                      <span className="font-serif text-4xl sm:text-5xl text-sand-border group-hover:text-terracotta/40 transition-colors select-none">
                        01
                      </span>
                    </div>

                    <h3 className="font-serif text-2xl sm:text-3xl text-forest font-normal leading-snug mb-3 group-hover:text-terracotta-hover transition-colors">
                      {onlineService.title}
                    </h3>

                    <p className="text-sm text-ink/80 leading-relaxed mb-6 font-normal">
                      {onlineService.description}
                    </p>

                    <ul className="space-y-2.5 py-4 border-t border-sand-border text-xs sm:text-sm text-ink mb-6">
                      {onlineService.features?.map((feat, fIdx) => (
                        <li key={fIdx} className="flex items-start gap-2.5">
                          <Check className="w-4 h-4 text-forest shrink-0 mt-0.5" />
                          <span className="leading-relaxed">{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-4 border-t border-sand-border/60">
                    <button
                      type="button"
                      onClick={() => handleApply({ service: onlineService.title })}
                      className="group/btn inline-flex items-center justify-between w-full sm:w-auto gap-3 px-5 py-2.5 rounded-full bg-forest text-ivory hover:bg-terracotta-hover transition-all duration-300 font-mono text-xs uppercase tracking-wider cursor-pointer shadow-sm hover:shadow-md"
                    >
                      <span className="font-semibold">{onlineService.cta || t("applyButton")}</span>
                      <span className="transition-transform duration-300 group-hover/btn:translate-x-1 font-sans text-sm">
                        &rarr;
                      </span>
                    </button>
                  </div>
                </m.div>
              </Reveal>

              {/* Offline Consultation Card (5 cols) */}
              <Reveal delay={0.2} className="md:col-span-5 flex">
                <m.div
                  whileHover={reduced ? undefined : { y: -4 }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  className="w-full bg-cream border border-sand-border rounded-3xl p-7 sm:p-8 flex flex-col justify-between shadow-card hover:border-forest/40 transition-colors duration-300 group"
                >
                  <div>
                    {/* Header with Large Serif Numeral & Tag */}
                    <div className="flex items-start justify-between gap-4 mb-4">
                      <div>
                        <span className="font-mono text-xs font-semibold text-terracotta uppercase tracking-wider block mb-1">
                          {offlineService.tag || "OFLAYN"}
                        </span>
                        <div className="flex items-center gap-1.5 text-xs font-mono text-ink/70">
                          <MapPin className="w-3.5 h-3.5 text-terracotta" />
                          <span>{offlineService.time}</span>
                        </div>
                      </div>
                      <span className="font-serif text-4xl sm:text-5xl text-sand-border group-hover:text-terracotta/40 transition-colors select-none">
                        02
                      </span>
                    </div>

                    <h3 className="font-serif text-2xl text-forest font-normal leading-snug mb-3 group-hover:text-terracotta-hover transition-colors">
                      {offlineService.title}
                    </h3>

                    <p className="text-sm text-ink/80 leading-relaxed mb-6 font-normal">
                      {offlineService.description}
                    </p>

                    <ul className="space-y-2.5 py-4 border-t border-sand-border text-xs sm:text-sm text-ink mb-6">
                      {offlineService.features?.map((feat, fIdx) => (
                        <li key={fIdx} className="flex items-start gap-2.5">
                          <Check className="w-4 h-4 text-forest shrink-0 mt-0.5" />
                          <span className="leading-relaxed">{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-4 border-t border-sand-border/60">
                    <button
                      type="button"
                      onClick={() => handleApply({ service: offlineService.title })}
                      className="group/btn inline-flex items-center justify-between w-full sm:w-auto gap-3 px-5 py-2.5 rounded-full bg-forest text-ivory hover:bg-terracotta-hover transition-all duration-300 font-mono text-xs uppercase tracking-wider cursor-pointer shadow-sm hover:shadow-md"
                    >
                      <span className="font-semibold">{offlineService.cta || t("applyButton")}</span>
                      <span className="transition-transform duration-300 group-hover/btn:translate-x-1 font-sans text-sm">
                        &rarr;
                      </span>
                    </button>
                  </div>
                </m.div>
              </Reveal>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Services;
