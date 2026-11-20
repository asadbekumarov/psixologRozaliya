"use client";

import React, { useEffect, useRef } from "react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { RgMonogram } from "@/components/brand/RgMonogram";
import { useLockScroll } from "@/hooks/useLockScroll";
import { AnimatePresence, m, useReducedMotion } from "motion/react";
import { EASE_EDITORIAL } from "@/lib/motion";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenApply: (options?: { service?: string }) => void;
}

export function MobileMenu({ isOpen, onClose, onOpenApply }: MobileMenuProps) {
  const t = useTranslations("nav");
  const common = useTranslations("common");
  const ctaT = useTranslations("cta");
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const reduced = useReducedMotion();

  useLockScroll(isOpen);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
        return;
      }

      // Focus trap
      if (e.key === "Tab" && dialogRef.current) {
        const focusable = dialogRef.current.querySelectorAll<HTMLElement>(
          'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
        );

        if (focusable.length > 0) {
          const first = focusable[0];
          const last = focusable[focusable.length - 1];

          if (e.shiftKey) {
            if (document.activeElement === first) {
              e.preventDefault();
              last.focus();
            }
          } else {
            if (document.activeElement === last) {
              e.preventDefault();
              first.focus();
            }
          }
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    const timer = setTimeout(() => {
      closeButtonRef.current?.focus();
    }, 50);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      clearTimeout(timer);
    };
  }, [isOpen, onClose]);

  const navLinks = [
    { href: "#xizmatlar", label: t("services") },
    { href: "#bosqichlar", label: t("methodology") },
    { href: "#ekspert", label: t("expert") },
    { href: "#natijalar", label: t("media") },
    { href: "#faq", label: t("faq") },
    { href: "#aloqa", label: t("contact") },
  ];

  const handleLinkClick = () => {
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <m.div
          ref={dialogRef}
          role="dialog"
          aria-modal="true"
          aria-label={common("openMenu")}
          initial={reduced ? { opacity: 0 } : { opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={reduced ? { opacity: 0 } : { opacity: 0, y: -16 }}
          transition={{ duration: 0.35, ease: EASE_EDITORIAL }}
          className="fixed inset-0 z-50 flex flex-col bg-forest text-ivory lg:hidden overscroll-contain pt-[env(safe-area-inset-top,0px)] pb-[env(safe-area-inset-bottom,0px)]"
        >
          {/* Top Bar */}
          <div className="flex items-center justify-between px-5 sm:px-6 h-20 border-b border-white/10 shrink-0">
            <a
              href="#hero"
              onClick={handleLinkClick}
              className="flex items-center gap-2.5 font-serif text-lg tracking-wider font-semibold text-ivory focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-terracotta min-h-[48px]"
            >
              <RgMonogram light size={36} />
              <span className="text-sm font-serif tracking-[0.16em] uppercase">
                ROZALIYA GABDULHAKOVA
              </span>
            </a>
            <Button
              ref={closeButtonRef}
              variant="ghost"
              size="icon"
              onClick={onClose}
              aria-label={common("closeMenu")}
              className="w-12 h-12 min-w-[48px] min-h-[48px] rounded-full text-mist hover:text-ivory hover:bg-forest-light bg-forest-light/60 transition-colors"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </Button>
          </div>

          {/* Nav List */}
          <div className="flex-1 flex flex-col justify-between px-6 py-8 overflow-y-auto">
            <nav className="flex flex-col space-y-1 sm:space-y-2">
              {navLinks.map((link, idx) => (
                <m.a
                  key={link.href}
                  href={link.href}
                  onClick={handleLinkClick}
                  initial={reduced ? undefined : { opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 * idx, duration: 0.3 }}
                  className="group flex items-center justify-between min-h-[48px] text-xl sm:text-2xl font-serif text-ivory hover:text-terracotta transition-colors py-3.5 border-b border-white/10 touch-manipulation"
                >
                  <span>{link.label}</span>
                  <span className="text-xs font-mono text-mist tracking-widest group-hover:translate-x-1 group-hover:text-terracotta transition-all">
                    →
                  </span>
                </m.a>
              ))}
            </nav>

            <div className="pt-8 border-t border-white/10 flex flex-col space-y-6">
              <div className="flex items-center justify-between min-h-[48px]">
                <span className="text-xs font-mono uppercase tracking-widest text-mist">
                  {common("changeLanguage")}
                </span>
                <LanguageSwitcher direction="up" isDark={true} />
              </div>

              <div className="flex flex-col gap-3">
                <m.div whileTap={{ scale: 0.98 }}>
                  <Button
                    className="w-full h-12 min-h-[48px] rounded-full bg-terracotta-hover hover:bg-terracotta text-ivory font-semibold text-sm transition-all duration-200 shadow-[0_4px_16px_rgba(176,90,63,0.35)] flex items-center justify-center gap-2 cursor-pointer"
                    onClick={() => {
                      onClose();
                      onOpenApply({ service: ctaT("mentorship") });
                    }}
                  >
                    <span>{ctaT("mentorship")}</span>
                    <span className="text-base" aria-hidden="true">
                      →
                    </span>
                  </Button>
                </m.div>
              </div>
            </div>
          </div>
        </m.div>
      )}
    </AnimatePresence>
  );
}
