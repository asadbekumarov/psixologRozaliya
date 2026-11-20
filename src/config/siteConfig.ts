import { contactConfig } from "./contact";

const getBaseUrl = (): string => {
  if (process.env.NEXT_PUBLIC_SITE_URL) {
    return process.env.NEXT_PUBLIC_SITE_URL.replace(/\/$/, "");
  }
  if (process.env.VERCEL_PROJECT_PRODUCTION_URL) {
    return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL.replace(/\/$/, "")}`;
  }
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL.replace(/\/$/, "")}`;
  }
  return "https://psixolog-rozaliya.uz";
};

export const SITE_URL = getBaseUrl();

export const siteConfig = {
  name: "Rozaliya Gabdulhakova",
  title: "Rozaliya Gabdulhakova | KBT Psixolog · Ayollar va Onalar Mutaxassisi",
  description:
    "KBT (kognitiv-xulq-atvor terapiyasi) asosida ishlovchi amaliyotchi psixolog. Ayollar va onalar uchun oilaviy munosabatlar, farzand tarbiyasi bo'yicha individual konsultatsiyalar va mualliflik kurslari.",
  url: SITE_URL,
  ogImage: `${SITE_URL}/og-image.png`,

  contact: {
    phone: contactConfig.phone.display,
    phoneClean: contactConfig.phone.clean,
    email: contactConfig.email.address,
    address: contactConfig.office.addressUz,
    workingHours: "Dush - Shan: 09:00 - 20:00",
  },

  socials: {
    telegram: contactConfig.telegramDirect.url,
    telegramChannel: contactConfig.telegramChannel.url,
    telegramDirect: contactConfig.telegramDirect.url,
    instagram: contactConfig.instagram.url,
    youtube: contactConfig.youtube.url,
    linkedin: contactConfig.linkedin.url,
  },

  navLinks: [
    { href: "#xizmatlar", labelKey: "services" },
    { href: "#bosqichlar", labelKey: "methodology" },
    { href: "#ekspert", labelKey: "expert" },
    { href: "#natijalar", labelKey: "media" },
    { href: "#faq", labelKey: "faq" },
    { href: "#aloqa", labelKey: "contact" },
  ],
};
