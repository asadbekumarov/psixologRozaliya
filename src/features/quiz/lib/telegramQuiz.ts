import {
  QUIZ_QUESTIONS,
  DIAGNOSTIC_MAP,
  calculateQuizScore,
} from "../data/quizData";
import type { QuizSubmissionData } from "../schemas/quizSchema";

export interface TelegramQuizResult {
  success: boolean;
  messageId?: number;
  error?: string;
  score: number;
}

/**
 * Escapes HTML characters for Telegram parse_mode: "HTML"
 */
function cleanText(str?: string): string {
  return (str || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

/**
 * Dispatches structured diagnostic quiz outcome to Telegram channel/group for Rozaliya Gabdulhakova.
 * Reads TELEGRAM_BOT_TOKEN and TELEGRAM_CHAT_ID from process.env.
 */
export async function sendTelegramQuizLead(
  payload: QuizSubmissionData,
  clientIp?: string
): Promise<TelegramQuizResult> {
  const token = process.env.TELEGRAM_BOT_TOKEN?.trim();
  const chatId = process.env.TELEGRAM_CHAT_ID?.trim();

  const score = calculateQuizScore(payload.answers);
  const locale = (payload.locale || "uz") as "uz" | "ru" | "en";
  const isAnonymous = Boolean(payload.isAnonymous);

  const clientName = isAnonymous
    ? `${cleanText(payload.name) || "Mehmon"} 🔒 [ANONIM MUROJAAT]`
    : cleanText(payload.name || "Mijoz");

  const contactLine = payload.telegramHandle
    ? `✈️ <b>Telegram:</b> ${cleanText(payload.telegramHandle)}`
    : `📞 <b>Telefon:</b> <code>${cleanText(payload.phone || "Ko'rsatilmagan")}</code>`;

  const q1Answer = payload.answers[0] ?? 0;
  const diagnostic = DIAGNOSTIC_MAP[q1Answer] || DIAGNOSTIC_MAP[0];
  const recommendedService = diagnostic.serviceTitle[locale] || diagnostic.serviceTitle.uz;

  if (!token || !chatId) {
    console.warn(
      "[Telegram Quiz Service] Missing TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID. Skipping dispatch in dev mode."
    );
    return {
      success: true,
      score,
    };
  }

  const timestamp = new Intl.DateTimeFormat("uz-UZ", {
    timeZone: "Asia/Tashkent",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  }).format(new Date());

  const questionsSummary = QUIZ_QUESTIONS.map((q, idx) => {
    const selectedPoints = payload.answers[idx] ?? 0;
    const option =
      q.options.find((opt) => opt.points === selectedPoints) || q.options[0];
    const optLabel = option?.shortText?.[locale] || option?.shortText?.uz || "Belgilanmagan";
    return `<b>${idx + 1}.</b> ${cleanText(optLabel)}`;
  }).join("\n");

  const localeUpper = (payload.locale || "uz").toUpperCase();
  const sourceStr = payload.pageUrl ? ` · ${cleanText(payload.pageUrl)}` : "";

  const message = [
    `🌿 <b>Yangi Psixologik Diagnostika Natijasi</b>`,
    isAnonymous ? `🔒 <b>[ANONIM MUROJAAT]</b>` : null,
    `<b>"Muammodan Yechimga: Pre-Qualifying Test"</b>`,
    `━━━━━━━━━━━━━━━━━━━━`,
    `👤 <b>Mijoz:</b> ${clientName}`,
    contactLine,
    payload.phone && payload.telegramHandle ? `📞 <b>Telefon:</b> <code>${cleanText(payload.phone)}</code>` : null,
    payload.companySize ? `📍 <b>Format:</b> ${cleanText(payload.companySize)}` : null,
    `━━━━━━━━━━━━━━━━━━━━`,
    `💡 <b>TAVSIYA ETILGAN YO'NALISH:</b>`,
    `👉 <b>${cleanText(recommendedService)}</b>`,
    `━━━━━━━━━━━━━━━━━━━━`,
    `<b>JAVOBLAR TAHLILI:</b>`,
    questionsSummary,
    `━━━━━━━━━━━━━━━━━━━━`,
    `🌐 <b>Til:</b> ${localeUpper}${sourceStr}`,
    `🕒 <b>Vaqt:</b> ${timestamp} (Toshkent vaqti)`,
    clientIp ? `🌐 <b>IP:</b> <code>${clientIp}</code>` : null,
    `━━━━━━━━━━━━━━━━━━━━`,
    `🔒 <i>100% maxfiylik kafolatlangan.</i>`,
  ]
    .filter(Boolean)
    .join("\n");

  try {
    const inlineButtons: Array<{ text: string; url: string }> = [];

    if (payload.telegramHandle) {
      const cleanHandle = payload.telegramHandle.replace(/^@/, "").trim();
      if (cleanHandle) {
        inlineButtons.push({
          text: "✈️ Telegramda yozish",
          url: `https://t.me/${cleanHandle}`,
        });
      }
    } else if (payload.phone) {
      const cleanPhoneDigits = payload.phone.replace(/[^0-9]/g, "");
      if (cleanPhoneDigits) {
        inlineButtons.push({
          text: "📞 Aloqaga chiqish",
          url: `https://t.me/+${cleanPhoneDigits}`,
        });
      }
    }

    const requestPayload: Record<string, unknown> = {
      chat_id: chatId,
      text: message,
      parse_mode: "HTML",
      disable_web_page_preview: true,
    };

    if (inlineButtons.length > 0) {
      requestPayload.reply_markup = {
        inline_keyboard: [inlineButtons],
      };
    }

    const url = `https://api.telegram.org/bot${token}/sendMessage`;
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(requestPayload),
    });

    if (!response.ok) {
      const errorText = await response.text();
      return {
        success: false,
        error: `Telegram HTTP error: ${response.status} - ${errorText}`,
        score,
      };
    }

    const data = await response.json();
    return {
      success: true,
      messageId: data.result?.message_id,
      score,
    };
  } catch (err: unknown) {
    const errorMessage =
      err instanceof Error ? err.message : "Unknown Telegram dispatch error";
    return {
      success: false,
      error: errorMessage,
      score,
    };
  }
}
