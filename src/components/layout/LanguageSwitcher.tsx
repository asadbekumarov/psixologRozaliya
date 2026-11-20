"use client";

import React, { useState, useRef, useEffect, useTransition } from "react";
import { useLocale } from "next-intl";
import { useRouter, usePathname } from "@/i18n/routing";
import { Check } from "lucide-react";

interface LanguageOption {
  code: string;
  label: string;
  nativeName: string;
}

const LANGUAGES: LanguageOption[] = [
  { code: "uz", label: "UZ", nativeName: "O'zbek" },
  { code: "ru", label: "RU", nativeName: "Русский" },
  { code: "en", label: "EN", nativeName: "English" },
];

export interface LanguageSwitcherProps {
  className?: string;
  direction?: "down" | "up";
  isDark?: boolean;
}

export function LanguageSwitcher({
  className = "",
  direction = "down",
  isDark = false,
}: LanguageSwitcherProps) {
  const currentLocale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const activeLang =
    LANGUAGES.find((lang) => lang.code === currentLocale) || LANGUAGES[0];

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  const handleSelect = (nextLocale: string) => {
    if (nextLocale === currentLocale) {
      setIsOpen(false);
      return;
    }

    startTransition(() => {
      router.replace(pathname, { locale: nextLocale });
      setIsOpen(false);
    });
  };

  return (
    <div
      ref={containerRef}
      className={`relative inline-block font-mono text-xs ${className}`}
    >
      {/* Trigger Button: min 44x44px touch target */}
      <button
        type="button"
        disabled={isPending}
        onClick={() => setIsOpen((prev) => !prev)}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-label="Select language"
        className={`h-11 min-h-[44px] min-w-[44px] px-2.5 sm:px-3.5 flex items-center justify-center gap-1.5 sm:gap-2 rounded-full cursor-pointer transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 shrink-0 ${
          isDark
            ? "bg-forest-light/70 hover:bg-forest-light text-ivory border border-white/20 hover:border-white/40 focus-visible:ring-ivory"
            : "bg-cream hover:bg-sand-deep text-forest border border-sand-border hover:border-forest/40 focus-visible:ring-forest"
        }`}
      >
        <span
          className={`font-mono text-xs font-semibold tracking-[0.14em] uppercase ${
            isDark ? "text-ivory" : "text-forest"
          }`}
        >
          {activeLang.code.toUpperCase()}
        </span>
        <svg
          className={`w-3.5 h-3.5 transition-transform duration-300 ${
            isDark ? "text-ivory/80" : "text-forest/70"
          } ${
            isOpen
              ? direction === "up"
                ? "rotate-0"
                : "rotate-180"
              : direction === "up"
              ? "rotate-180"
              : "rotate-0"
          }`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
          aria-hidden="true"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div
          role="listbox"
          aria-label="Languages"
          className={`absolute right-0 z-50 min-w-[160px] py-1.5 rounded-2xl overflow-hidden shadow-2xl border transition-all ${
            direction === "up" ? "bottom-full mb-2" : "top-full mt-2"
          } ${
            isDark
              ? "bg-forest border-forest-light text-ivory"
              : "bg-cream border-sand-border text-forest"
          }`}
        >
          {LANGUAGES.map((lang) => {
            const isSelected = lang.code === currentLocale;
            return (
              <button
                key={lang.code}
                role="option"
                aria-selected={isSelected}
                disabled={isPending}
                onClick={() => handleSelect(lang.code)}
                className={`w-full min-h-[44px] flex items-center justify-between px-4 py-2.5 text-left text-xs transition-colors cursor-pointer group ${
                  isSelected
                    ? isDark
                      ? "bg-forest-light text-ivory font-semibold"
                      : "bg-sand text-forest font-semibold"
                    : isDark
                    ? "text-mist hover:text-ivory hover:bg-forest-light/60"
                    : "text-ink hover:text-forest hover:bg-sand/60"
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <span
                    className={`text-xs uppercase font-mono tracking-wider ${
                      isSelected
                        ? isDark
                          ? "text-ivory font-bold"
                          : "text-forest font-bold"
                        : isDark
                        ? "text-mist group-hover:text-ivory"
                        : "text-ink/70 group-hover:text-forest"
                    }`}
                  >
                    {lang.code.toUpperCase()}
                  </span>
                  <span className="font-sans text-xs">{lang.nativeName}</span>
                </div>
                {isSelected && (
                  <Check
                    className={`w-3.5 h-3.5 ${
                      isDark ? "text-ivory" : "text-forest"
                    }`}
                  />
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
