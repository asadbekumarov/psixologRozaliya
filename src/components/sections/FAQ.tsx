"use client";

import React, { useState, useMemo } from "react";
import { useTranslations, useLocale } from "next-intl";
import { Link } from "@/i18n/routing";
import { FAQSkeleton } from "@/components/ui/skeletons";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, X, ArrowUpRight, ArrowRight } from "lucide-react";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { m } from "motion/react";
import { Reveal } from "@/components/motion/Reveal";
import { contactConfig } from "@/config/contact";

export { FAQSkeleton };

export interface FAQProps {
  isLoading?: boolean;
}

type CategoryKey = "all" | "systematization" | "consulting" | "mentorship" | "guarantees";

interface FAQItem {
  id: string;
  category: "systematization" | "consulting" | "mentorship" | "guarantees";
  question: string;
  answer: string;
}

export function FAQ({ isLoading = false }: FAQProps = {}) {
  const t = useTranslations("faq");
  const ctaBandT = useTranslations("ctaBand");
  const locale = useLocale();
  const isUz = locale === "uz";

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<CategoryKey>("all");

  const rawItems = useMemo<FAQItem[]>(() => {
    return [
      {
        id: "q1",
        category: "systematization",
        question: t("items.0.question"),
        answer: t("items.0.answer"),
      },
      {
        id: "q2",
        category: "consulting",
        question: t("items.1.question"),
        answer: t("items.1.answer"),
      },
      {
        id: "q3",
        category: "consulting",
        question: t("items.2.question"),
        answer: t("items.2.answer"),
      },
      {
        id: "q4",
        category: "mentorship",
        question: t("items.3.question"),
        answer: t("items.3.answer"),
      },
      {
        id: "q5",
        category: "systematization",
        question: t("items.4.question"),
        answer: t("items.4.answer"),
      },
      {
        id: "q6",
        category: "guarantees",
        question: t("items.5.question"),
        answer: t("items.5.answer"),
      },
      {
        id: "q7",
        category: "guarantees",
        question: t("items.6.question"),
        answer: t("items.6.answer"),
      },
      {
        id: "q8",
        category: "consulting",
        question: t("items.7.question"),
        answer: t("items.7.answer"),
      },
    ];
  }, [t]);

  const filteredItems = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    return rawItems.filter((item) => {
      const matchesCategory =
        selectedCategory === "all" || item.category === selectedCategory;
      if (!matchesCategory) return false;

      if (!query) return true;
      const qMatch = item.question.toLowerCase().includes(query);
      const aMatch = item.answer.toLowerCase().includes(query);
      return qMatch || aMatch;
    });
  }, [rawItems, searchQuery, selectedCategory]);

  const categories = [
    { key: "all" as CategoryKey, label: isUz ? "Barchasi" : locale === "ru" ? "Все" : "All" },
    { key: "systematization" as CategoryKey, label: t("categories.systematization.title") },
    { key: "consulting" as CategoryKey, label: t("categories.consulting.title") },
    { key: "mentorship" as CategoryKey, label: t("categories.mentorship.title") },
    { key: "guarantees" as CategoryKey, label: t("categories.guarantees.title") },
  ];

  if (isLoading) {
    return <FAQSkeleton />;
  }

  const telegramUrl =
    contactConfig.telegramDirect?.url || contactConfig.telegram?.url || "https://t.me/psixolog_rozaliya_admin";

  return (
    <section
      id="faq"
      aria-label={t("headline")}
      className="scroll-mt-20 py-20 md:py-28 lg:py-36 bg-sand text-ink relative overflow-x-clip border-b border-sand-border"
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 relative z-10">
        {/* FAQ 2-Column Split Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column (4 cols on lg, sticky): Eyebrow, Heading, Search, Ask Telegram */}
          <div className="lg:col-span-4 lg:sticky lg:top-28">
            <Reveal>
              {/* Eyebrow with hairline rule */}
              <div className="flex items-center gap-3 mb-4">
                <span className="font-mono text-xs uppercase tracking-[0.2em] text-terracotta font-semibold">
                  05 — {t("tag")}
                </span>
                <div className="h-[1px] w-12 bg-terracotta/40" />
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-forest leading-[1.14] tracking-tight">
                {t("headline")}
              </h2>

              <p className="text-sm sm:text-base text-ink/80 font-normal leading-relaxed mt-4">
                {t("lede")}
              </p>

              {/* Search Input */}
              <div className="mt-6 relative">
                <Search className="w-4 h-4 text-ink/50 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                <Input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={t("searchPlaceholder")}
                  aria-label={t("searchLabel")}
                  suppressHydrationWarning
                  className="pl-11 pr-10 h-11 rounded-full bg-cream border-sand-border text-forest placeholder:text-ink/50 text-xs sm:text-sm focus-visible:ring-forest shadow-xs"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery("")}
                    aria-label={t("clearSearch")}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-ink/50 hover:text-forest p-1"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              {/* Category Filter Pills */}
              <div className="mt-4 flex flex-wrap gap-1.5">
                {categories.map((c) => {
                  const isSelected = selectedCategory === c.key;
                  return (
                    <button
                      key={c.key}
                      type="button"
                      onClick={() => setSelectedCategory(c.key)}
                      className={`min-h-[32px] px-3 rounded-full text-[11px] font-mono tracking-wider transition-all cursor-pointer ${
                        isSelected
                          ? "bg-forest text-ivory font-semibold shadow-xs"
                          : "bg-cream hover:bg-sand-deep text-ink/75 border border-sand-border"
                      }`}
                    >
                      {c.label}
                    </button>
                  );
                })}
              </div>

              {/* Ask on Telegram Direct Link */}
              <div className="mt-8 pt-6 border-t border-sand-border">
                <a
                  href={telegramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-2 font-serif text-sm text-forest hover:text-terracotta transition-colors font-medium"
                >
                  <span>Savolingizga javob topmadingizmi? Telegramda so&apos;rang</span>
                  <ArrowUpRight className="w-4 h-4 text-terracotta group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </a>
              </div>
            </Reveal>
          </div>

          {/* Right Column (8 cols on lg): Minimalist Editorial Accordion */}
          <div className="lg:col-span-8">
            <Reveal delay={0.1}>
              <div className="bg-cream border border-sand-border rounded-3xl p-6 sm:p-10 shadow-card">
                {filteredItems.length === 0 ? (
                  <div className="text-center py-12 text-ink/70 text-sm font-normal">
                    {t("noResults")}
                  </div>
                ) : (
                  <Accordion type="single" collapsible className="w-full divide-y divide-sand-border">
                    {filteredItems.map((item) => (
                      <AccordionItem key={item.id} value={item.id} className="border-b-0 py-2">
                        <AccordionTrigger className="text-left py-4 hover:no-underline group">
                          <span className="font-serif text-lg sm:text-xl text-forest font-normal group-hover:text-terracotta-hover transition-colors pr-6">
                            {item.question}
                          </span>
                        </AccordionTrigger>
                        <AccordionContent className="text-sm sm:text-base text-ink/80 leading-relaxed pb-5 pt-1 font-normal">
                          {item.answer}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                )}
              </div>
            </Reveal>
          </div>
        </div>

        {/* 3-Minute Express Test Banner: Full-width rounded-3xl panel with split layout */}
        <div className="mt-16 lg:mt-24">
          <Reveal delay={0.15}>
            <div
              style={{
                background:
                  "radial-gradient(circle at 88% 25%, rgba(200, 109, 81, 0.28) 0%, rgba(22, 56, 50, 0) 65%), #163832",
              }}
              className="rounded-3xl p-8 sm:p-12 lg:p-16 text-ivory border border-white/10 shadow-2xl relative overflow-hidden"
            >
              <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center relative z-10">
                {/* Left: Huge Serif "3" with "daqiqa" badge */}
                <div className="md:col-span-4 flex items-center gap-5 border-b md:border-b-0 md:border-r border-white/10 pb-6 md:pb-0 md:pr-8">
                  <span className="font-serif text-7xl sm:text-8xl lg:text-9xl text-terracotta font-normal leading-none select-none">
                    3
                  </span>
                  <div className="flex flex-col">
                    <span className="font-serif italic text-2xl sm:text-3xl text-ivory leading-tight">
                      {isUz ? "Daqiqalik" : locale === "ru" ? "Минутный" : "Minute"}
                    </span>
                    <span className="font-mono text-xs uppercase tracking-widest text-mist/75 mt-1">
                      {isUz ? "Ekspress tashxis" : locale === "ru" ? "Экспресс-тест" : "Assessment"}
                    </span>
                  </div>
                </div>

                {/* Right: Heading, Text & CTA Button */}
                <div className="md:col-span-8 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                  <div className="max-w-xl">
                    <h3 className="text-2xl sm:text-3xl lg:text-4xl font-serif text-ivory font-normal leading-snug mb-3">
                      {ctaBandT("titlePrefix")}
                      <span className="italic text-terracotta ml-1.5 font-normal">
                        {ctaBandT("titleHighlight")}
                      </span>
                    </h3>

                    <p className="text-sm sm:text-base text-mist leading-relaxed font-normal">
                      {ctaBandT("description")}
                    </p>
                  </div>

                  <div className="shrink-0">
                    <m.div whileTap={{ scale: 0.98 }}>
                      <Button
                        asChild
                        size="lg"
                        className="w-full sm:w-auto h-12 min-h-[48px] px-8 rounded-full bg-terracotta-hover hover:bg-terracotta text-white font-semibold text-sm shadow-[0_8px_24px_rgba(176,90,63,0.35)] transition-all flex items-center justify-center gap-2 whitespace-nowrap"
                      >
                        <Link href="/test">
                          <span>{ctaBandT("startTest")}</span>
                          <ArrowRight className="w-4 h-4 text-white" />
                        </Link>
                      </Button>
                    </m.div>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

export default FAQ;
