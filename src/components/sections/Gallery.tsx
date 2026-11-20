"use client";

import React, { useState, useMemo, useCallback } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Marquee } from "@/components/ui/Marquee";
import { Lightbox, type LightboxMedia } from "@/components/ui/Lightbox";
import { galleryRow1, galleryRow2, galleryItems, type GalleryItem } from "@/config/gallery";

const aspectClassMap: Record<string, string> = {
  "4/5": "aspect-[4/5]",
  "1/1": "aspect-square",
  "3/4": "aspect-[3/4]",
};

export function Gallery() {
  const t = useTranslations("gallery");
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);

  const defaultAlt = useMemo(() => {
    return t("altDefault") || "Rozaliya Gabdulhakova konsultatsiya jarayonida";
  }, [t]);

  const activeMedia = useMemo<LightboxMedia | null>(() => {
    if (selectedIdx === null || !galleryItems[selectedIdx]) return null;
    const item = galleryItems[selectedIdx];
    return {
      src: item.src,
      title: defaultAlt,
      alt: defaultAlt,
    };
  }, [selectedIdx, defaultAlt]);

  const handleNext = useCallback(() => {
    setSelectedIdx((prev) => (prev !== null ? (prev + 1) % galleryItems.length : 0));
  }, []);

  const handlePrev = useCallback(() => {
    setSelectedIdx((prev) =>
      prev !== null ? (prev - 1 + galleryItems.length) % galleryItems.length : galleryItems.length - 1
    );
  }, []);

  const renderCard = (item: GalleryItem, isInteractive = true) => {
    const aspectClass = aspectClassMap[item.aspect] || "aspect-square";
    const idx = galleryItems.findIndex((g) => g.id === item.id);

    return (
      <button
        key={item.id}
        type="button"
        tabIndex={isInteractive ? 0 : -1}
        onClick={() => {
          if (isInteractive && idx !== -1) {
            setSelectedIdx(idx);
          }
        }}
        aria-label={`${defaultAlt} - ${item.id}`}
        className={`relative h-[180px] sm:h-[220px] lg:h-[260px] ${aspectClass} rounded-2xl overflow-hidden shrink-0 border border-border/80 bg-cream-200 text-left transition-transform duration-300 lg:hover:scale-[1.03] select-none cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sage`}
      >
        <Image
          src={item.src}
          alt={defaultAlt}
          fill
          sizes="(max-width: 640px) 220px, (max-width: 1024px) 280px, 320px"
          loading="eager"
          className="object-cover"
        />
      </button>
    );
  };

  return (
    <section
      id="galereya"
      aria-label={t("headline")}
      className="scroll-mt-20 py-[var(--section-y)] border-b border-border bg-cream text-charcoal relative overflow-x-clip"
    >
      {/* Section Header: Minimalist — One serif headline */}
      <div className="max-w-[1200px] mx-auto px-5 sm:px-8 mb-7 sm:mb-10">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-normal text-charcoal tracking-tight leading-[1.2] max-w-2xl">
          {t("headline")}
        </h2>
      </div>

      {/* Two-Row Marquee Container with Gradient Mask Fade */}
      <div className="relative w-full space-y-4 sm:space-y-6 [mask-image:linear-gradient(to_right,transparent,black_4%,black_96%,transparent)] [-webkit-mask-image:linear-gradient(to_right,transparent,black_4%,black_96%,transparent)]">
        {/* Left and Right Subtle Gradient Fade Overlays */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-0 top-0 bottom-0 w-8 sm:w-16 bg-gradient-to-r from-cream to-transparent z-10"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute right-0 top-0 bottom-0 w-8 sm:w-16 bg-gradient-to-l from-cream to-transparent z-10"
        />

        {/* Row 1: Leftward Marquee (38s speed) */}
        <Marquee speed={38} pauseOnHover={true} reverse={false} innerClassName="gap-4 sm:gap-6 pr-4 sm:pr-6">
          {galleryRow1.map((item) => renderCard(item))}
        </Marquee>

        {/* Row 2: Rightward Marquee (42s speed) */}
        <Marquee speed={42} pauseOnHover={true} reverse={true} innerClassName="gap-4 sm:gap-6 pr-4 sm:pr-6">
          {galleryRow2.map((item) => renderCard(item))}
        </Marquee>
      </div>

      {/* Lightbox for Full-Size Interactive View with Next/Prev/Esc Navigation */}
      <Lightbox
        isOpen={selectedIdx !== null}
        onClose={() => setSelectedIdx(null)}
        media={activeMedia}
        onPrev={handlePrev}
        onNext={handleNext}
        currentIndex={selectedIdx ?? undefined}
        totalCount={galleryItems.length}
      />
    </section>
  );
}

export default Gallery;
