import type { Metadata, Viewport } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { ApplyModalProvider } from "@/features/apply/context/ApplyModalContext";
import { SmoothScrollProvider } from "@/components/providers/SmoothScrollProvider";
import { MotionProvider } from "@/components/motion/MotionProvider";
import "../globals.css";

const playfair = Playfair_Display({
  subsets: ["latin", "latin-ext", "cyrillic"],
  variable: "--font-serif",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin", "latin-ext", "cyrillic"],
  variable: "--font-sans",
  display: "swap",
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

import { contactConfig } from "@/config/contact";
import { SITE_URL } from "@/config/siteConfig";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isUz = locale === "uz";
  const isRu = locale === "ru";

  const title = isUz
    ? "Rozaliya Gabdulhakova | KBT Psixolog & Oilaviy Mutaxassis (Toshkent & Onlayn)"
    : isRu
    ? "Розалия Габдулхакова | КПТ-Психолог & Семейный Специалист (Ташкент & Онлайн)"
    : "Rozaliya Gabdulhakova | CBT Psychologist & Family Specialist (Tashkent & Online)";

  const description = isUz
    ? "Rozaliya Gabdulhakova (@psixolog_rozaliya) — KBT (kognitiv-xulq-atvor terapiyasi) asosida ishlovchi amaliyotchi psixolog. Ayollar va onalar uchun oilaviy munosabatlar hamda farzand tarbiyasi bo'yicha konsultatsiyalar va mualliflik kurslari."
    : isRu
    ? "Розалия Габдулхакова (@psixolog_rozaliya) — Практикующий КПТ-психолог. Индивидуальные консультации и авторские курсы по семейным отношениям и воспитанию детей для женщин и матерей."
    : "Rozaliya Gabdulhakova (@psixolog_rozaliya) — CBT-based practicing psychologist. Consultations and author courses on family relationships and child-rearing for women and mothers.";

  const keywords = isUz
    ? [
        "psixolog toshkent",
        "rozaliya gabdulhakova",
        "kbt psixolog",
        "psixologik konsultatsiya",
        "amaliyotchi psixolog",
        "onlayn psixolog",
        "bola tarbiyasi psixolog",
        "sokin onalik",
        "baxtiyor oila",
        "ruhiy xotirjamlik",
        "ichki xavotir va depressiya",
        "psixolog qabuli",
        "individual terapiya",
        "oilaviy psixolog",
      ]
    : isRu
    ? [
        "психолог ташкент",
        "розалия габдулхакова",
        "кпт психолог",
        "психологическая консультация ташкент",
        "онлайн психолог узбекистан",
        "воспитание детей психолог",
        "спокойное материнство",
        "счастливая семья",
        "душевное спокойствие",
        "избавление от тревоги",
        "семейный психолог",
      ]
    : [
        "psychologist tashkent",
        "rozaliya gabdulhakova",
        "cbt psychologist",
        "psychological consultation tashkent",
        "online psychologist uzbekistan",
        "family psychologist",
        "child parenting psychologist",
        "anxiety and stress relief",
        "confidential psychological therapy",
      ];

  const isProduction =
    process.env.NODE_ENV === "production" ||
    process.env.VERCEL_ENV === "production";

  return {
    title,
    description,
    keywords,
    authors: [{ name: "Rozaliya Gabdulhakova", url: `${SITE_URL}/${locale}` }],
    creator: "Rozaliya Gabdulhakova",
    publisher: "Rozaliya Gabdulhakova",
    metadataBase: new URL(SITE_URL),
    alternates: {
      canonical: `/${locale}`,
      languages: {
        uz: "/uz",
        ru: "/ru",
        en: "/en",
        "x-default": "/uz",
      },
    },
    openGraph: {
      title,
      description,
      type: "website",
      locale: locale === "uz" ? "uz_UZ" : locale === "ru" ? "ru_RU" : "en_US",
      url: `${SITE_URL}/${locale}`,
      siteName: "Rozaliya Gabdulhakova — KBT Psixolog",
      images: [
        {
          url: "/og-image.png",
          width: 1200,
          height: 630,
          type: "image/png",
          alt: "Rozaliya Gabdulhakova — KBT Psixolog & Oilaviy Mutaxassis",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/og-image.png"],
      creator: "@psixolog_rozaliya",
    },
    icons: {
      icon: [
        { url: "/favicon.ico" },
        { url: "/images/brand/logo-mark.webp", type: "image/webp" },
      ],
      shortcut: "/favicon.ico",
      apple: [
        { url: "/images/brand/logo-mark.webp", type: "image/webp" },
      ],
    },
    robots: !isProduction
      ? { index: false, follow: false }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            "max-video-preview": -1,
            "max-image-preview": "large",
            "max-snippet": -1,
          },
        },
  };
}

export const viewport: Viewport = {
  themeColor: "#F3EBE1",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as (typeof routing.locales)[number])) {
    notFound();
  }

  setRequestLocale(locale);
  const messages = await getMessages();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": ["Person", "HealthAndBeautyBusiness", "MedicalBusiness"],
    "@id": `${SITE_URL}/#rozaliya-gabdulhakova`,
    name: "Rozaliya Gabdulhakova",
    alternateName: "Розалия Габдулхакова",
    jobTitle:
      locale === "ru"
        ? "Практикующий КПТ-психолог, специалист по семейным отношениям и воспитанию детей"
        : locale === "en"
        ? "CBT Psychologist, Family & Parenting Specialist"
        : "KBT psixolog, oilaviy munosabatlar va farzand tarbiyasi mutaxassisi",
    description:
      locale === "ru"
        ? "Индивидуальные консультации по КПТ и авторские курсы в Ташкенте и онлайн по всему миру. 100% конфиденциальность."
        : locale === "en"
        ? "CBT-based individual consultations and author courses in Tashkent and worldwide online. 100% confidential."
        : "Toshkentda oflayn va dunyo bo'ylab onlayn individual KBT konsultatsiyalar hamda mualliflik kurslari.",
    url: `${SITE_URL}/${locale}`,
    image: `${SITE_URL}/og-image.png`,
    logo: `${SITE_URL}/images/brand/logo-mark.webp`,
    telephone: contactConfig.phone.clean,
    priceRange: "$$",
    currenciesAccepted: "UZS, USD",
    paymentAccepted: "Cash, Card, Payme, Click",
    medicalSpecialty: "Psychology",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Toshkent shahri, 5/5",
      addressLocality: "Tashkent",
      addressCountry: "UZ",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: "41.311081",
      longitude: "69.240562",
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
        ],
        opens: "10:00",
        closes: "19:00",
      },
    ],
    knowsAbout: [
      "Psixologiya",
      "Individual konsultatsiya",
      "Stress va xavotirni yengish",
      "Ruhiy xotirjamlik",
      "Shaxsiy chegaralar",
      "Munosabatlar terapiyasi",
      "Art-terapiya",
    ],
    sameAs: [
      contactConfig.instagram.url,
      contactConfig.telegramDirect.url,
      contactConfig.telegramChannel.url,
    ],
  };

  return (
    <html
      lang={locale}
      className={`${inter.variable} ${playfair.variable}`}
      suppressHydrationWarning
    >
      <body className="font-sans antialiased bg-sand text-ink selection:bg-forest selection:text-ivory" suppressHydrationWarning>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <NextIntlClientProvider locale={locale} messages={messages}>
          <ApplyModalProvider>
            <SmoothScrollProvider>
              <MotionProvider>{children}</MotionProvider>
            </SmoothScrollProvider>
          </ApplyModalProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
