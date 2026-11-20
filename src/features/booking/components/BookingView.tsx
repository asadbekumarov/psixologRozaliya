"use client";

import React, { useState, useEffect } from "react";
import { useTranslations, useLocale } from "next-intl";
import dynamic from "next/dynamic";
import { contactConfig } from "@/config/contact";
import { Clock, ShieldCheck, CalendarCheck, ArrowRight, MessageSquare } from "lucide-react";

// Dynamically import Cal embed with ssr: false
const Cal = dynamic(() => import("@calcom/embed-react"), {
  ssr: false,
  loading: () => null,
});

export function BookingView() {
  const t = useTranslations("booking");
  const locale = useLocale();

  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [isBooked, setIsBooked] = useState(false);

  const rawCalLink =
    process.env.NEXT_PUBLIC_CAL_LINK || "asadbek-umarov-klqsdt/15min";
  const calLink = rawCalLink
    ? rawCalLink
        .trim()
        .replace(/^https?:\/\/(app\.)?cal\.com\//i, "")
        .replace(/^\/+/, "")
        .replace(/\/+$/, "")
    : "";

  const embedLocale = locale === "en" ? "en" : "ru";

  useEffect(() => {
    if (!calLink) {
      setHasError(true);
      return;
    }

    let isMounted = true;

    (async function initCal() {
      try {
        const { getCalApi } = await import("@calcom/embed-react");
        const cal = await getCalApi();
        if (!isMounted) return;

        cal("ui", {
          theme: "light",
          styles: {
            branding: {
              brandColor: "#163832",
            },
          },
          hideEventTypeDetails: false,
          layout: "month_view",
        });

        cal("on", {
          action: "bookingSuccessful",
          callback: () => {
            if (isMounted) setIsBooked(true);
          },
        });

        cal("on", {
          action: "bookingSuccessfulV2",
          callback: () => {
            if (isMounted) setIsBooked(true);
          },
        });

        cal("on", {
          action: "linkReady",
          callback: () => {
            if (isMounted) setIsLoaded(true);
          },
        });
      } catch (err) {
        console.error("[Cal Embed Init Error]", err);
        if (isMounted) setHasError(true);
      }
    })();

    const timer = setTimeout(() => {
      if (isMounted && !hasError) {
        setIsLoaded(true);
      }
    }, 3500);

    return () => {
      isMounted = false;
      clearTimeout(timer);
    };
  }, [calLink, hasError]);

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-8 sm:py-12">
      <div className="grid grid-cols-1 lg:grid-cols-12 rounded-3xl overflow-hidden border border-sand-border shadow-2xl bg-cream">
        {/* Left Column (5 cols on lg: bg-forest text-ivory info panel) */}
        <div className="lg:col-span-5 bg-forest text-ivory p-6 sm:p-10 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-white/10">
          <div>
            {/* Eyebrow */}
            <div className="flex items-center gap-3 mb-4">
              <span className="font-mono text-xs uppercase tracking-[0.2em] text-terracotta font-semibold">
                00 — {t("kicker") || "Qabulga yozilish"}
              </span>
              <div className="h-[1px] w-10 bg-terracotta/40" />
            </div>

            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-ivory font-normal leading-[1.14] tracking-tight mb-5">
              {t("title")}
            </h1>

            <p className="text-sm sm:text-base text-mist font-normal leading-relaxed mb-8">
              {t("description")}
            </p>

            {/* What to expect / Value Pillars */}
            <div className="space-y-4 pt-6 border-t border-white/10">
              <div className="flex items-start gap-3">
                <Clock className="w-4 h-4 text-terracotta shrink-0 mt-0.5" />
                <div className="text-xs sm:text-sm text-mist">
                  <span className="font-semibold text-ivory block">{t("badgeDuration")}</span>
                  Har bir konsultatsiya chuqur va to&apos;liq tahlilga bag&apos;ishlanadi.
                </div>
              </div>

              <div className="flex items-start gap-3">
                <CalendarCheck className="w-4 h-4 text-terracotta shrink-0 mt-0.5" />
                <div className="text-xs sm:text-sm text-mist">
                  <span className="font-semibold text-ivory block">{t("badgePrice")}</span>
                  Oflayn Toshkentda yoki dunyo bo&apos;ylab Zoom/Telegram orqali.
                </div>
              </div>

              <div className="flex items-start gap-3">
                <ShieldCheck className="w-4 h-4 text-terracotta shrink-0 mt-0.5" />
                <div className="text-xs sm:text-sm text-mist">
                  <span className="font-semibold text-ivory block">{t("badgePrivacy")}</span>
                  Barcha ma&apos;lumotlar to&apos;liq shifrlangan va maxfiy saqlanadi.
                </div>
              </div>
            </div>
          </div>

          {/* Contact note at bottom */}
          <div className="pt-8 mt-8 border-t border-white/10 flex flex-col gap-2">
            <span className="text-xs font-mono text-mist/75 uppercase tracking-wider">
              Savollaringiz bormi?
            </span>
            <a
              href={contactConfig.telegramDirect?.url || contactConfig.telegram?.url || "https://t.me/psixolog_rozaliya_admin"}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-serif text-terracotta hover:text-white transition-colors"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Telegram orqali to&apos;g&apos;ridan-to&apos;g&apos;ri yozish &rarr;</span>
            </a>
          </div>
        </div>

        {/* Right Column (7 cols on lg: bg-cream calendar embed) */}
        <div className="lg:col-span-7 p-4 sm:p-8 flex flex-col justify-center">
          {isBooked && (
            <div
              role="status"
              aria-live="polite"
              className="mb-6 p-6 bg-forest text-ivory rounded-2xl border border-white/15 shadow-lg flex items-center gap-4"
            >
              <div className="w-10 h-10 rounded-full bg-terracotta text-white flex items-center justify-center shrink-0">
                <CalendarCheck className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-base sm:text-lg font-serif font-medium text-ivory mb-1">
                  {t("successTitle")}
                </h2>
                <p className="text-xs sm:text-sm text-mist leading-relaxed">
                  {t("successMessage")}
                </p>
              </div>
            </div>
          )}

          {hasError || !calLink ? (
            <div className="py-16 px-6 text-center max-w-md mx-auto">
              <div className="w-12 h-12 mx-auto mb-4 flex items-center justify-center rounded-full bg-sand-deep border border-sand-border text-terracotta">
                <CalendarCheck className="w-6 h-6" />
              </div>
              <h2 className="font-serif text-2xl text-forest mb-2">
                {t("errorTitle")}
              </h2>
              <p className="text-ink/80 text-sm leading-relaxed mb-6 font-normal">
                {t("errorDesc")}
              </p>
              <a
                href={contactConfig.telegramDirect?.url || contactConfig.telegram?.url || "https://t.me/psixolog_rozaliya_admin"}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-terracotta-hover hover:bg-terracotta text-white px-8 py-3.5 text-xs uppercase tracking-wider font-semibold rounded-full shadow-md transition-all"
              >
                <span>{t("errorTelegramCta")}</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          ) : (
            <div className="relative min-h-[660px] w-full rounded-2xl overflow-hidden border border-sand-border bg-white shadow-xs">
              {!isLoaded && (
                <div
                  aria-hidden="true"
                  className="absolute inset-0 z-10 bg-cream p-6 flex flex-col gap-4 animate-pulse"
                >
                  <div className="h-6 w-48 bg-sand-border/60 rounded-full" />
                  <div className="grid grid-cols-7 gap-2 py-2">
                    {[...Array(7)].map((_, i) => (
                      <div key={i} className="h-4 bg-sand-border/40 rounded-full" />
                    ))}
                  </div>
                  <div className="grid grid-cols-7 gap-2 flex-1">
                    {[...Array(28)].map((_, i) => (
                      <div
                        key={i}
                        className="h-16 bg-sand/60 border border-sand-border/40 rounded-xl"
                      />
                    ))}
                  </div>
                </div>
              )}

              <div className="w-full min-h-[660px]">
                <Cal
                  calLink={calLink}
                  style={{
                    width: "100%",
                    height: "100%",
                    minHeight: "660px",
                    overflow: "auto",
                  }}
                  config={{
                    layout: "month_view",
                    theme: "light",
                    locale: embedLocale,
                  }}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default BookingView;
