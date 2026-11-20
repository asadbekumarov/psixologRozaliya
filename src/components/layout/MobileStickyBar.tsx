"use client";

import React, { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/routing";
import { useApplyModal } from "@/features/apply/context/ApplyModalContext";
import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";

export function MobileStickyBar() {
  const t = useTranslations("stickyBar");
  const pathname = usePathname();
  const { openApply, isOpen: isModalOpen } = useApplyModal();

  const [isHeroVisible, setIsHeroVisible] = useState(true);
  const [isInputFocused, setIsInputFocused] = useState(false);

  const isExcludedPage = pathname?.includes("/test") || pathname?.includes("/bron");

  // Track Hero visibility via IntersectionObserver
  useEffect(() => {
    const heroEl = document.getElementById("hero");
    if (!heroEl) {
      // Fallback: use scroll position
      const handleScroll = () => {
        setIsHeroVisible(window.scrollY < 300);
      };
      window.addEventListener("scroll", handleScroll, { passive: true });
      handleScroll();
      return () => window.removeEventListener("scroll", handleScroll);
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsHeroVisible(entry.isIntersecting);
      },
      { threshold: 0.15 }
    );

    observer.observe(heroEl);
    return () => observer.disconnect();
  }, []);

  // Track input focus (virtual keyboard active)
  useEffect(() => {
    const handleFocusIn = (e: FocusEvent) => {
      const target = e.target as HTMLElement | null;
      if (
        target &&
        (target.tagName === "INPUT" ||
          target.tagName === "TEXTAREA" ||
          target.tagName === "SELECT")
      ) {
        setIsInputFocused(true);
      }
    };

    const handleFocusOut = () => {
      setIsInputFocused(false);
    };

    window.addEventListener("focusin", handleFocusIn);
    window.addEventListener("focusout", handleFocusOut);
    return () => {
      window.removeEventListener("focusin", handleFocusIn);
      window.removeEventListener("focusout", handleFocusOut);
    };
  }, []);

  // Condition to show sticky bar
  const shouldShow =
    !isExcludedPage && !isModalOpen && !isInputFocused && !isHeroVisible;

  return (
    <aside
      aria-label={t("ariaLabel")}
      className={`fixed bottom-0 inset-x-0 z-40 lg:hidden backdrop-blur-md bg-sand/95 border-t border-sand-border px-4 py-2.5 pb-[max(0.75rem,env(safe-area-inset-bottom,0px))] transition-transform duration-300 ease-out shadow-[0_-8px_30px_rgba(22,56,50,0.08)] ${
        shouldShow ? "translate-y-0" : "translate-y-full pointer-events-none"
      }`}
    >
      <div className="flex items-center gap-2.5 max-w-md mx-auto w-full">
        {/* Secondary Action: Quick Quiz/Test Link */}
        <Link
          href="/test"
          className="min-h-[48px] min-w-[44px] px-3.5 py-2 inline-flex items-center justify-center gap-1.5 text-xs font-medium text-ink hover:text-forest bg-cream hover:bg-sand-deep border border-sand-border rounded-full transition-colors shrink-0 active:scale-[0.97]"
        >
          <Sparkles className="w-3.5 h-3.5 text-terracotta" />
          <span>{t("takeTest")}</span>
        </Link>

        {/* Primary CTA: 48px height Konsultatsiyaga Yozilish */}
        <Button
          type="button"
          onClick={() => openApply()}
          className="h-12 min-h-[48px] flex-1 rounded-full bg-terracotta-hover hover:bg-terracotta text-ivory text-xs sm:text-sm font-semibold tracking-wide shadow-[0_4px_16px_rgba(176,90,63,0.35)] active:scale-[0.98] flex items-center justify-center gap-2 cursor-pointer"
        >
          <span>{t("bookConsultation")}</span>
          <span className="text-sm transition-transform duration-200" aria-hidden="true">→</span>
        </Button>
      </div>
    </aside>
  );
}
