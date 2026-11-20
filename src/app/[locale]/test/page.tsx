import React from "react";
import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { MobileStickyBar } from "@/components/layout/MobileStickyBar";
import { QuizView } from "@/features/quiz/components/QuizView";
import { SITE_URL } from "@/config/siteConfig";
import { routing } from "@/i18n/routing";

interface TestPageProps {
  params: Promise<{ locale: string }>;
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: TestPageProps): Promise<Metadata> {
  const { locale } = await params;
  const isUz = locale === "uz";
  const isRu = locale === "ru";

  const title = isUz
    ? "Ichki holat diagnostikasi | Rozaliya Gabdulhakova"
    : isRu
    ? "Диагностика внутреннего состояния | Розалия Габдулхакова"
    : "Inner State Diagnostics | Rozaliya Gabdulhakova";

  const description = isUz
    ? "3 daqiqalik psixologik diagnostika orqali ruhiy holatingiz, charchoq va stress darajangizni aniqlang hamda tavsiyalar oling."
    : isRu
    ? "Определите уровень стресса, эмоционального выгорания и получите персональные психологические рекомендации за 3 минуты."
    : "Evaluate your mental state, stress and burnout levels in 3 minutes and receive personalized guidance from Rozaliya Gabdulhakova.";

  const pagePath = locale === "uz" ? "/test" : `/${locale}/test`;
  const canonicalUrl = `${SITE_URL}${pagePath}`;

  return {
    title,
    description,
    alternates: {
      canonical: canonicalUrl,
      languages: {
        uz: `${SITE_URL}/uz/test`,
        ru: `${SITE_URL}/ru/test`,
        en: `${SITE_URL}/en/test`,
        "x-default": `${SITE_URL}/uz/test`,
      },
    },
    openGraph: {
      title,
      description,
      type: "website",
      locale: locale === "uz" ? "uz_UZ" : locale === "ru" ? "ru_RU" : "en_US",
      url: canonicalUrl,
      siteName: "Rozaliya Gabdulhakova",
      images: [
        {
          url: `${SITE_URL}/og-image.png`,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [`${SITE_URL}/og-image.png`],
    },
  };
}

export default async function TestPage({ params }: TestPageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <div className="min-h-screen flex flex-col bg-sand text-ink selection:bg-forest selection:text-ivory overflow-x-clip">
      <Navbar />

      <main className="flex-1 pt-20 flex flex-col items-center justify-center">
        <QuizView />
      </main>

      <Footer />
      <MobileStickyBar />
    </div>
  );
}
