"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useTranslations, useLocale } from "next-intl";
import { usePathname } from "@/i18n/routing";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { MobileMenu } from "./MobileMenu";
import { RgMonogram } from "@/components/brand/RgMonogram";
import { useApplyModal } from "@/features/apply/context/ApplyModalContext";
import { Button } from "@/components/ui/button";
import { m } from "motion/react";
import { EASE_EDITORIAL } from "@/lib/motion";

export interface NavbarProps {
  onOpenApply?: () => void;
}

export function Navbar({ onOpenApply }: NavbarProps) {
  const { openApply } = useApplyModal();
  const handleApply = onOpenApply || openApply;
  const t = useTranslations("nav");
  const common = useTranslations("common");
  const ctaT = useTranslations("cta");

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("");
  const [isScrolled, setIsScrolled] = useState(false);

  const pathname = usePathname();
  const locale = useLocale();

  // Route check: Only home page ("/" or "/uz", etc.) has the dark Hero section
  const isHome =
    pathname === "/" ||
    pathname === `/${locale}` ||
    pathname === "" ||
    pathname === `/${locale}/`;

  // Transparent dark header ONLY on home page when at the top
  const isDarkHeader = isHome && !isScrolled;

  const navItems = [
    { href: "#xizmatlar", label: t("services") },
    { href: "#bosqichlar", label: t("methodology") },
    { href: "#ekspert", label: t("expert") },
    { href: "#natijalar", label: t("media") },
    { href: "#faq", label: t("faq") },
    { href: "#aloqa", label: t("contact") },
  ];

  // Smooth scroll handler with dynamic header height offset from CSS --header-h
  const handleNavClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
      e.preventDefault();
      const targetId = href.replace("#", "");
      const element = document.getElementById(targetId);

      if (element) {
        const headerEl = document.querySelector("header");
        const headerOffset = headerEl
          ? headerEl.offsetHeight
          : (parseFloat(
              getComputedStyle(document.documentElement).getPropertyValue(
                "--header-h"
              )
            ) || 80);
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.scrollY - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        });

        setActiveSection(targetId);

        if (window.history.pushState) {
          window.history.pushState(null, "", href);
        }
      } else {
        const homePrefix = locale === "uz" ? "" : `/${locale}`;
        window.location.href = `${homePrefix}/${targetId === "hero" ? "" : href}`;
      }
    },
    [locale]
  );

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 24);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    const sectionIds = [
      "xizmatlar",
      "bosqichlar",
      "ekspert",
      "natijalar",
      "faq",
      "aloqa",
    ];
    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el));

    if (!("IntersectionObserver" in window) || elements.length === 0) {
      return () => window.removeEventListener("scroll", handleScroll);
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (
          window.innerHeight + window.scrollY >=
          document.documentElement.scrollHeight - 80
        ) {
          setActiveSection("aloqa");
          return;
        }

        const intersecting = entries.filter((e) => e.isIntersecting);
        if (intersecting.length > 0) {
          intersecting.sort(
            (a, b) => b.intersectionRatio - a.intersectionRatio
          );
          setActiveSection(intersecting[0].target.id);
        } else if (window.scrollY < 150) {
          setActiveSection("");
        }
      },
      {
        root: null,
        rootMargin: "-15% 0px -55% 0px",
        threshold: [0, 0.25, 0.5, 0.75],
      }
    );

    elements.forEach((el) => observer.observe(el));

    return () => {
      window.removeEventListener("scroll", handleScroll);
      observer.disconnect();
    };
  }, []);

  return (
    <>
      <m.header
        style={
          {
            "--header-h": isScrolled ? "4.5rem" : "5rem",
          } as React.CSSProperties
        }
        className={`fixed top-0 left-0 right-0 z-50 pt-[env(safe-area-inset-top,0px)] transition-all duration-300 ease-out ${
          isDarkHeader
            ? "h-[calc(5rem+env(safe-area-inset-top,0px))] bg-transparent border-b border-white/10 text-ivory"
            : isScrolled
            ? "h-[calc(4.5rem+env(safe-area-inset-top,0px))] bg-sand/90 backdrop-blur-xl border-b border-sand-border text-forest shadow-soft"
            : "h-[calc(5rem+env(safe-area-inset-top,0px))] bg-sand/90 backdrop-blur-md border-b border-sand-border text-forest"
        }`}
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: EASE_EDITORIAL }}
      >
        <div className="max-w-[1600px] mx-auto w-full h-full px-3 sm:px-6 lg:px-8 2xl:px-12 flex items-center justify-between gap-1.5 sm:gap-3 lg:gap-4 xl:gap-6">
          {/* Brand Identity (Left) */}
          <div className="shrink-0 flex items-center">
            <a
              href="#hero"
              onClick={(e) => handleNavClick(e, "#hero")}
              aria-label={common("brandAria")}
              className="group flex items-center gap-2 sm:gap-3 min-h-[44px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-terracotta rounded-full py-1 pr-1 sm:pr-2 select-none"
            >
              {/* RG Monogram */}
              <RgMonogram
                size={34}
                light={isDarkHeader}
                className="group-hover:scale-105 transition-transform duration-300"
              />

              {/* Brand Typography */}
              <div className="flex flex-col whitespace-nowrap">
                <span
                  className={`text-[11px] sm:text-xs font-serif font-semibold tracking-[0.08em] sm:tracking-[0.18em] uppercase transition-colors leading-tight whitespace-nowrap ${
                    isDarkHeader
                      ? "text-ivory group-hover:text-terracotta"
                      : "text-forest group-hover:text-terracotta-hover"
                  }`}
                >
                  <span className="hidden min-[380px]:inline">ROZALIYA GABDULHAKOVA</span>
                  <span className="min-[380px]:hidden">ROZALIYA G.</span>
                </span>
                <span
                  className={`text-[10px] font-sans tracking-[0.14em] uppercase transition-colors hidden sm:inline-block leading-tight mt-0.5 whitespace-nowrap ${
                    isDarkHeader
                      ? "text-mist group-hover:text-ivory"
                      : "text-ink/75 group-hover:text-forest"
                  }`}
                >
                  @psixolog_rozaliya · KBT Psixolog
                </span>
              </div>
            </a>
          </div>

          {/* Navigation Links (Center — Desktop 1024px+ lg:flex) */}
          <nav
            aria-label={t("mainNavAria")}
            className={`hidden lg:flex items-center justify-center gap-1 shrink-0 rounded-full px-2.5 py-1 backdrop-blur-md transition-all duration-300 ${
              isDarkHeader
                ? "bg-forest-light/60 border border-white/15 text-ivory shadow-[0_2px_12px_rgba(0,0,0,0.2)]"
                : "bg-cream border border-sand-border text-ink shadow-[0_2px_12px_rgba(22,56,50,0.03)]"
            }`}
          >
            {navItems.map((item) => {
              const isActive = activeSection === item.href.slice(1);
              return (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  aria-current={isActive ? "page" : undefined}
                  className={`group relative flex items-center min-h-[44px] px-3.5 py-2 rounded-full text-xs tracking-[0.03em] font-medium transition-all duration-200 select-none whitespace-nowrap ${
                    isActive
                      ? isDarkHeader
                        ? "text-forest bg-ivory font-semibold shadow-sm"
                        : "text-ivory bg-forest font-semibold shadow-sm"
                      : isDarkHeader
                      ? "text-mist hover:text-ivory hover:bg-white/10"
                      : "text-ink hover:text-forest hover:bg-sand-deep/60"
                  }`}
                >
                  <span>{item.label}</span>
                </a>
              );
            })}
          </nav>

          {/* Actions: Primary CTA Button & Language Selector (Desktop 1024px+ lg:flex) */}
          <div className="hidden lg:flex shrink-0 items-center justify-end gap-2.5 xl:gap-3">
            <Button
              type="button"
              onClick={() => handleApply({ service: ctaT("mentorship") })}
              className="h-11 min-h-[44px] shrink-0 group rounded-full bg-terracotta-hover hover:bg-terracotta active:scale-[0.98] px-5 font-sans text-xs tracking-wide text-ivory font-semibold transition-all duration-200 cursor-pointer flex items-center gap-2 whitespace-nowrap shadow-[0_4px_16px_rgba(176,90,63,0.3)] hover:shadow-[0_6px_22px_rgba(176,90,63,0.45)]"
            >
              <span className="whitespace-nowrap">{ctaT("mentorship")}</span>
              <svg
                className="w-3.5 h-3.5 shrink-0 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 text-ivory"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2.5"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25"
                />
              </svg>
            </Button>

            <LanguageSwitcher isDark={isDarkHeader} />
          </div>

          {/* Mobile & Tablet Actions (Shown below 1024px: lg:hidden) */}
          <div className="flex shrink-0 items-center gap-1.5 sm:gap-3 lg:hidden">
            <div className="hidden sm:block" aria-hidden="true">
              <Button
                type="button"
                tabIndex={-1}
                onClick={() => handleApply({ service: ctaT("mentorship") })}
                className="h-11 min-h-[44px] shrink-0 group rounded-full bg-terracotta-hover hover:bg-terracotta px-4 font-sans text-xs tracking-wide text-ivory font-semibold transition-all cursor-pointer flex items-center gap-1.5 whitespace-nowrap shadow-sm active:scale-[0.98]"
              >
                <span className="whitespace-nowrap">{ctaT("mentorship")}</span>
                <span className="text-xs font-bold" aria-hidden="true">
                  ↗
                </span>
              </Button>
            </div>

            <LanguageSwitcher isDark={isDarkHeader} />

            {/* Mobile Menu Toggle Button (min 44x44px) */}
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(true)}
              aria-label={common("openMenu")}
              className={`w-11 h-11 min-w-[44px] min-h-[44px] rounded-full flex items-center justify-center transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-terracotta cursor-pointer shrink-0 ${
                isDarkHeader
                  ? "bg-forest-light/70 hover:bg-forest-light text-ivory border border-white/20"
                  : "bg-cream hover:bg-sand-deep text-forest border border-sand-border"
              }`}
            >
              <svg
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="1.75"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                />
              </svg>
            </button>
          </div>
        </div>
      </m.header>

      {/* Accessible Mobile Menu Drawer */}
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        onOpenApply={(opts) => {
          setIsMobileMenuOpen(false);
          handleApply(opts);
        }}
      />
    </>
  );
}
