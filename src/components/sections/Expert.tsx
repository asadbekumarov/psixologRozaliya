"use client";

import React from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { siteMedia } from "@/config/siteMedia";
import { Reveal } from "@/components/motion/Reveal";

export function Expert() {
  const t = useTranslations("expert");
  const { portrait } = siteMedia.expert;

  const credentials = [
    {
      institution: "Povoljskiy instituti",
      degree: "Psixolog-konsultant malakasi",
      field: "Kognitiv-xulq-atvor terapiyasi (KBT)",
    },
    {
      institution: "IKI Academy",
      degree: "Magistratura bosqichi",
      field: "Qadriyatli va islomiy psixologiya yondashuvi",
    },
    {
      institution: "Andijon davlat tillar pedagogika instituti",
      degree: "Pedagogika darajasi",
      field: "Oila va bolalar psixologiyasi asoslari",
    },
  ];

  const pillars = [
    {
      num: "01",
      tag: t("pillar1Tag"),
      title: t("pillar1Title"),
      desc: t("pillar1Desc"),
    },
    {
      num: "02",
      tag: t("pillar2Tag"),
      title: t("pillar2Title"),
      desc: t("pillar2Desc"),
    },
    {
      num: "03",
      tag: t("pillar3Tag"),
      title: t("pillar3Title"),
      desc: t("pillar3Desc"),
    },
  ];

  return (
    <section
      id="ekspert"
      aria-label={t("name")}
      className="scroll-mt-20 py-20 md:py-28 lg:py-36 bg-forest text-ivory relative overflow-x-clip border-b border-white/10"
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column (5 cols on lg): Sticky Tall Portrait */}
          <div className="lg:col-span-5 lg:sticky lg:top-28">
            <Reveal>
              <div className="relative max-w-[420px] mx-auto lg:max-w-none">
                {/* Tall Editorial Portrait Frame */}
                <div className="relative aspect-[3/4] w-full rounded-3xl overflow-hidden border border-white/15 shadow-2xl bg-forest-light">
                  <Image
                    src={portrait.src}
                    alt={portrait.alt}
                    fill
                    sizes="(max-width: 768px) 380px, 460px"
                    className="object-cover object-top"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-forest/95 via-forest/20 to-transparent pointer-events-none" />

                  <div className="absolute bottom-4 left-4 sm:left-5 right-4 sm:right-5 z-20 flex flex-col xs:flex-row xs:items-baseline xs:justify-between gap-1 font-mono text-xs uppercase tracking-wider text-mist border-t border-white/10 pt-2.5 sm:pt-3">
                    <span className="text-ivory font-serif text-sm sm:text-base tracking-wide truncate">
                      {t("name")}
                    </span>
                    <span className="text-terracotta font-semibold text-[11px] sm:text-xs shrink-0">
                      {t("experience")}
                    </span>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>

          {/* Right Column (7 cols on lg): Credentials Ruled Table + 3 Principles */}
          <div className="lg:col-span-7 flex flex-col space-y-12 lg:space-y-16">
            {/* Header & Bio Prose */}
            <Reveal>
              {/* Eyebrow with hairline rule */}
              <div className="flex items-center gap-3 mb-4">
                <span className="font-mono text-xs uppercase tracking-[0.2em] text-terracotta font-semibold">
                  03 — {t("kicker")}
                </span>
                <div className="h-[1px] w-12 bg-terracotta/40" />
              </div>

              {/* Serif Headline with Italic Accent */}
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-ivory leading-[1.14] tracking-tight">
                {t("headlinePrefix")}
                <span className="italic text-terracotta font-normal block sm:inline">
                  {t("headlineHighlight")}
                </span>
                {t("headlineSuffix")}
              </h2>

              <div className="space-y-4 text-sm sm:text-base text-mist font-normal leading-relaxed mt-6">
                <p className="border-l-2 border-terracotta pl-4 py-1 text-ivory font-serif text-lg leading-snug">
                  {t("bio1")}
                </p>
                <p className="text-mist leading-relaxed pt-1">
                  {t("bio2")}
                </p>
              </div>
            </Reveal>

            {/* Education Credentials Ruled Table (No Cards!) */}
            <Reveal delay={0.15}>
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-white/15 mb-2">
                  <h3 className="font-mono text-xs uppercase tracking-widest text-terracotta font-semibold">
                    {t("eduTitle")}
                  </h3>
                  <span className="font-mono text-xs text-mist/60 uppercase">
                    Diplomlar & Malaka
                  </span>
                </div>

                <div className="divide-y divide-white/10">
                  {credentials.map((cred, idx) => (
                    <div
                      key={idx}
                      className="py-4.5 sm:py-5 flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 group hover:bg-white/[0.02] transition-colors"
                    >
                      <div className="font-serif text-lg sm:text-xl text-ivory font-normal group-hover:text-terracotta transition-colors">
                        {cred.institution}
                      </div>
                      <div className="text-xs sm:text-sm text-mist/85 font-mono text-left sm:text-right">
                        <span>{cred.degree}</span>
                        <span className="hidden sm:inline text-white/30 mx-2">·</span>
                        <span className="block sm:inline text-mist/60 text-xs">{cred.field}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>

            {/* 3 Core Principles as Hairline-Divided 3-Column Row */}
            <Reveal delay={0.2}>
              <div>
                <h3 className="font-mono text-xs uppercase tracking-widest text-terracotta font-semibold mb-6 pb-3 border-b border-white/15">
                  {t("principlesHeading")}
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-white/10">
                  {pillars.map((p, idx) => (
                    <div
                      key={idx}
                      className="py-6 md:py-0 md:px-6 first:pl-0 last:pr-0 flex flex-col justify-between space-y-4"
                    >
                      <div>
                        <span className="font-serif text-3xl sm:text-4xl text-terracotta/75 font-normal block mb-2">
                          {p.num}
                        </span>
                        <span className="font-mono text-[10px] text-mist/60 uppercase tracking-widest block mb-1">
                          {p.tag}
                        </span>
                        <h4 className="text-base sm:text-lg font-serif text-ivory font-normal leading-snug">
                          {p.title}
                        </h4>
                      </div>
                      <p className="text-xs sm:text-sm text-mist/80 leading-relaxed font-normal">
                        {p.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Expert;
