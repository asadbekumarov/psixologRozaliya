"use client";

import React from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { contactConfig } from "@/config/contact";
import { RgMonogram } from "@/components/brand/RgMonogram";
import { Reveal } from "@/components/motion/Reveal";

export function Footer() {
  const t = useTranslations("footer");

  const socialLinks = [
    {
      label: t("instagram"),
      href: contactConfig.instagram.url,
      ariaLabel: contactConfig.instagram.ariaLabel,
      external: true,
    },
    {
      label: t("telegram"),
      href: contactConfig.telegramDirect.url,
      ariaLabel: contactConfig.telegramDirect.ariaLabel,
      external: true,
    },
    {
      label: t("channel"),
      href: contactConfig.telegramChannel.url,
      ariaLabel: contactConfig.telegramChannel.ariaLabel,
      external: true,
    },
    {
      label: t("privacy"),
      href: "/privacy",
      ariaLabel: t("privacy"),
      external: false,
    },
    {
      label: t("terms"),
      href: "/terms",
      ariaLabel: t("terms"),
      external: false,
    },
  ];

  return (
    <footer className="bg-forest border-t border-white/10 py-12 pb-24 md:pb-14 text-mist">
      <Reveal className="max-w-[1400px] mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center justify-between gap-8">
        {/* Left: Brand & Copyright */}
        <div className="flex flex-col sm:flex-row items-center sm:items-center gap-3 sm:gap-5 text-center sm:text-left">
          <div className="flex items-center gap-3">
            <RgMonogram light size={36} />
            <span className="font-serif font-semibold tracking-[0.18em] text-sm text-ivory uppercase">
              {t("brand")}
            </span>
          </div>
          <span className="hidden sm:inline text-white/20" aria-hidden="true">
            |
          </span>
          <span className="text-xs text-mist/70 tracking-wide font-sans">
            {t("rights")}
          </span>
        </div>

        {/* Right: Links with min 44px touch targets */}
        <nav
          aria-label="Footer links"
          className="flex flex-wrap items-center justify-center gap-1 sm:gap-2 font-mono text-xs text-mist"
        >
          {socialLinks.map((item, idx) => (
            <React.Fragment key={item.label}>
              {item.external ? (
                <a
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={item.ariaLabel}
                  className="min-h-[44px] min-w-[44px] px-3 inline-flex items-center justify-center text-mist hover:text-ivory transition-colors rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-terracotta"
                >
                  {item.label}
                </a>
              ) : (
                <Link
                  href={item.href}
                  aria-label={item.ariaLabel}
                  className="min-h-[44px] min-w-[44px] px-3 inline-flex items-center justify-center text-mist hover:text-ivory transition-colors rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-terracotta"
                >
                  {item.label}
                </Link>
              )}
              {idx < socialLinks.length - 1 && (
                <span
                  className="text-white/15 select-none hidden sm:inline"
                  aria-hidden="true"
                >
                  /
                </span>
              )}
            </React.Fragment>
          ))}
        </nav>
      </Reveal>
    </footer>
  );
}
