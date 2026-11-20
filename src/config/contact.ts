/**
 * Markazlashtirilgan aloqa ma'lumotlari - Rozaliya Gabdulhakova
 */

export interface TelegramAccount {
  handle: string;
  url: string;
  display: string;
  ariaLabel: string;
}

const buildTelegramAccount = (
  handleName: string,
  purpose: { uz: string; ru: string; en: string }
): TelegramAccount => {
  const cleanHandle = handleName.replace(/^@/, "");
  return {
    handle: cleanHandle,
    display: `@${cleanHandle}`,
    url: `https://t.me/${cleanHandle}`,
    ariaLabel: `Telegram (${cleanHandle}) - ${purpose.uz}`,
  };
};

export const contactConfig = {
  phone: {
    display: "",
    href: "",
    clean: "",
    ariaLabel: "Telefon orqali bog'lanish",
  },
  // Rasmiy Telegram kanal (blog va foydali postlar)
  telegramChannel: buildTelegramAccount("psixolog_rozaliya", {
    uz: "Rasmiy psixologik blog va foydali maqolalar",
    ru: "Официальный психологический канал и полезные статьи",
    en: "Official psychology channel and useful articles",
  }),
  // Kurslar va anonslar Telegram kanali
  telegramCourses: buildTelegramAccount("kurslar_anons", {
    uz: "Mualliflik kurslari va yangiliklar kanali",
    ru: "Канал авторских курсов и анонсов",
    en: "Author courses and announcements channel",
  }),
  // Konsultatsiya uchun admin Telegram
  telegramDirect: buildTelegramAccount("psixolog_rozaliya_admin", {
    uz: "Konsultatsiyaga yozilish va to'g'ridan-to'g'ri aloqa",
    ru: "Запись на консультацию и прямой контакт",
    en: "Book a consultation and direct contact",
  }),
  // Menejer Telegram
  telegramManager: buildTelegramAccount("psixolog_rozaliya_menejer", {
    uz: "Menejer bilan bog'lanish va kurslar qabuli",
    ru: "Связь с менеджером и запись на курсы",
    en: "Contact manager and course enrollment",
  }),
  get telegram() {
    return this.telegramDirect;
  },
  instagram: {
    url: "https://www.instagram.com/psixolog_rozaliya/",
    handle: "@psixolog_rozaliya",
    display: "@psixolog_rozaliya",
    ariaLabel: "Rozaliya Gabdulhakova Instagram profili",
  },
  youtube: {
    url: "https://www.instagram.com/psixolog_rozaliya/",
    handle: "@psixolog_rozaliya",
    display: "@psixolog_rozaliya",
    ariaLabel: "Instagram profiliga o'tish",
  },
  linkedin: {
    url: "https://t.me/psixolog_rozaliya",
    display: "Rozaliya Gabdulhakova",
    ariaLabel: "Rozaliya Gabdulhakova Telegram kanali",
  },
  email: {
    address: "",
    href: "https://t.me/psixolog_rozaliya_admin",
    ariaLabel: "Telegram orqali bog'lanish",
  },
  office: {
    hasExactAddress: false,
    addressUz: "Toshkent shahri (Oflayn va Onlayn qabul)",
    addressRu: "г. Ташкент (Офлайн и Онлайн приём)",
    addressEn: "Tashkent, Uzbekistan (In-Person & Online)",
    landmarkUz: "Toshkent (Oflayn qabul) & Onlayn Dunyo",
    landmarkRu: "Ташкент (Офлайн) & Онлайн по всему миру",
    landmarkEn: "Tashkent (In-Person) & Online Worldwide",
  },
};
