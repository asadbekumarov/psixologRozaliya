export interface QuizOption {
  text: {
    uz: string;
    ru: string;
    en: string;
  };
  shortText: {
    uz: string;
    ru: string;
    en: string;
  };
  points: 0 | 1 | 2 | 3;
}

export interface QuizQuestion {
  id: number;
  order: number;
  title: {
    uz: string;
    ru: string;
    en: string;
  };
  options: QuizOption[];
}

export interface QuizDiagnosticResult {
  struggleKey: "stress" | "relationships" | "self_confidence" | "growth";
  serviceTitle: { uz: string; ru: string; en: string };
  empathyNote: { uz: string; ru: string; en: string };
  actionText: { uz: string; ru: string; en: string };
}

export const DIAGNOSTIC_MAP: Record<number, QuizDiagnosticResult> = {
  0: {
    struggleKey: "stress",
    serviceTitle: {
      uz: "Individual Antistress & Hissiy Tiklanish Terapiyasi (60 daqiqa)",
      ru: "Индивидуальная Антистресс-Терапия и Восстановление Ресурса (60 минут)",
      en: "Individual Anti-Stress & Emotional Restoration Therapy (60 mins)",
    },
    empathyNote: {
      uz: "Doimiy zo'riqish va charchoq — tanangiz va ruhiyatingizning dam olishga bo'lgan jiddiy chaqirig'idir. Birinchi seansdayoq chuqur nafas olib, yengillikni his qilasiz.",
      ru: "Постоянное напряжение и усталость — это сигнал вашей психики о необходимости глубокой заботы. Уже на первой сессии вы почувствуете ощутимое облегчение.",
      en: "Chronic tension and exhaustion are your nervous system's call for care. From the very first session, you will experience tangible lightness and calm.",
    },
    actionText: {
      uz: "Stressni yengish va sokinlikka qaytish uchun yozing",
      ru: "Напишите, чтобы снять стресс и вернуть спокойствие",
      en: "Reach out to relieve stress and restore calm",
    },
  },
  1: {
    struggleKey: "relationships",
    serviceTitle: {
      uz: "Munosabatlar & Oila Psixoterapiyasi (60–90 daqiqa)",
      ru: "Терапия Отношений и Семейной Гармонии (60–90 минут)",
      en: "Relationship & Family Harmony Therapy (60–90 mins)",
    },
    empathyNote: {
      uz: "Yaqin insonlar bilan tushunmovchiliklar eng nozik va og'riqli tuyg'ulardan biridir. Biz birgalikda sog'lom shaxsiy chegaralar va samimiy iliqlikni tiklaymiz.",
      ru: "Непонимание с близкими — одно из самых уязвимых переживаний. Вместе мы бережно восстановим личные границы и искреннее взаимопонимание.",
      en: "Misunderstandings with loved ones are deeply vulnerable. Together, we gently rebuild healthy emotional boundaries and warmth.",
    },
    actionText: {
      uz: "Munosabatlarni iliq va tushunarli qilish uchun suhbatga yoziling",
      ru: "Запишитесь, чтобы восстановить тепло и доверие в отношениях",
      en: "Book a consultation to rebuild warmth and trust in your relationships",
    },
  },
  2: {
    struggleKey: "self_confidence",
    serviceTitle: {
      uz: "O'ziga Ishonch & Ichki Erkinlik Seansi (60 daqiqa)",
      ru: "Сессия Уверенности в Себе и Внутренней Свободы (60 минут)",
      en: "Self-Worth & Inner Freedom Session (60 mins)",
    },
    empathyNote: {
      uz: "Ichki tanqidchi, ikkilanishlar va qo'rquvlar sizning asl quvvatingizni to'smoqda. O'zingizni shartsiz qabul qilish va erkin yashash vaqti keldi.",
      ru: "Внутренний критик, сомнения и страхи сковывают ваш потенциал. Пришло время обрести непоколебимую внутреннюю опору и веру в себя.",
      en: "Self-doubt and inner criticism hold back your true radiance. It is time to step into unshakeable self-acceptance and inner freedom.",
    },
    actionText: {
      uz: "Qo'rquvlarni yengib, mustahkam o'ziga ishonch topish uchun yozing",
      ru: "Напишите, чтобы обрести уверенность и отпустить страхи",
      en: "Reach out to overcome fears and anchor true self-worth",
    },
  },
  3: {
    struggleKey: "growth",
    serviceTitle: {
      uz: "Maqsad & Shaxsiy Rivojlanish Terapiyasi (60 daqiqa)",
      ru: "Терапия Личностного Роста и Поиска Смыслов (60 минут)",
      en: "Life Purpose & Personal Growth Therapy (60 mins)",
    },
    empathyNote: {
      uz: "Bir joyda to'xtab qolgandek his qilish — bu aslida yangi bosqichga o'tish oldidagi to'planishdir. Ichki resurslaringizni uyg'otib, aniq qadamlarni belgilaymiz.",
      ru: "Ощущение застоя — это естественная пауза перед мощным качественным сказком. Мы раскроем ваши скрытые ресурсы и выстроим ясный путь вперед.",
      en: "Feeling stuck is often the necessary stillness before a major breakthrough. We will awaken your inner drive and design a clear path forward.",
    },
    actionText: {
      uz: "Yangi bosqichga qadam tashlash va maqsadni aniqlash uchun yozing",
      ru: "Сделайте шаг к новому уровню и запишитесь на консультацию",
      en: "Take a step toward your next chapter and book your session",
    },
  },
};

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    order: 1,
    title: {
      uz: "Hozir sizni eng ko'p nima bezovta qilmoqda?",
      ru: "Что больше всего беспокоит вас прямо сейчас?",
      en: "What is troubling you the most right now?",
    },
    options: [
      {
        text: {
          uz: "Doimiy stress, uyqusizlik va hissiy charchoq",
          ru: "Постоянный стресс, бессонница и эмоциональное истощение",
          en: "Chronic stress, insomnia, and emotional fatigue",
        },
        shortText: {
          uz: "Stress va charchoq",
          ru: "Стресс и усталость",
          en: "Stress & fatigue",
        },
        points: 0,
      },
      {
        text: {
          uz: "Oilaviy yoki juftlik munosabatlaridagi tushunmovchiliklar",
          ru: "Непонимание в семье или романтических отношениях",
          en: "Misunderstandings in family or romantic relationships",
        },
        shortText: {
          uz: "Oila va munosabatlar",
          ru: "Отношения и семья",
          en: "Relationships",
        },
        points: 1,
      },
      {
        text: {
          uz: "O'ziga ishonchsizlik, qo'rquv va ichki tanqid",
          ru: "Неуверенность в себе, страхи и жесткая самокритика",
          en: "Lack of confidence, fears, and inner self-criticism",
        },
        shortText: {
          uz: "Ishonchsizlik va qo'rquv",
          ru: "Неуверенность и страх",
          en: "Self-doubt & fear",
        },
        points: 2,
      },
      {
        text: {
          uz: "Shaxsiy o'sish, hayotiy maqsad topish va bir joyda to'xtab qolish hissi",
          ru: "Поиск призвания, целей и чувство застоя в жизни",
          en: "Life direction, purpose, and feeling stuck in growth",
        },
        shortText: {
          uz: "Maqsad va o'sish",
          ru: "Цели и рост",
          en: "Purpose & growth",
        },
        points: 3,
      },
    ],
  },
  {
    id: 2,
    order: 2,
    title: {
      uz: "Bu holat qancha vaqtdan beri davom etmoqda?",
      ru: "Как долго продолжается это состояние?",
      en: "How long has this condition been persisting?",
    },
    options: [
      {
        text: {
          uz: "Yaqinda boshlandi (oxirgi bir necha hafta)",
          ru: "Началось недавно (последние несколько недель)",
          en: "Started recently (last few weeks)",
        },
        shortText: {
          uz: "Yaqinda boshlandi",
          ru: "Недавно",
          en: "Recently",
        },
        points: 0,
      },
      {
        text: {
          uz: "Bir necha oydan beri davom etmoqda",
          ru: "Продолжается уже несколько месяцев",
          en: "Persisting for several months",
        },
        shortText: {
          uz: "Bir necha oydan beri",
          ru: "Несколько месяцев",
          en: "Several months",
        },
        points: 1,
      },
      {
        text: {
          uz: "1 yildan ortiq vaqtdan beri qiynamoqda",
          ru: "Беспокоит уже более одного года",
          en: "Bothering me for over a year",
        },
        shortText: {
          uz: "1 yildan ortiq",
          ru: "Более года",
          en: "Over a year",
        },
        points: 2,
      },
    ],
  },
  {
    id: 3,
    order: 3,
    title: {
      uz: "Mutaxassis bilan ishlashga qanchalik tayyormisiz?",
      ru: "Насколько вы готовы работать с психологом?",
      en: "How ready are you to work with a professional?",
    },
    options: [
      {
        text: {
          uz: "Ha, to'liq tayyorman — menga tezroq aniq yechim kerak",
          ru: "Да, полностью готов(а) — нужно решение как можно скорее",
          en: "Yes, fully ready — need a clear solution soon",
        },
        shortText: {
          uz: "Tezroq yechim kerak",
          ru: "Нужно решение",
          en: "Need solution soon",
        },
        points: 0,
      },
      {
        text: {
          uz: "Avval birinchi konsultatsiyada sinab ko'rmoqchiman",
          ru: "Хочу сначала попробовать на одной первой консультации",
          en: "Want to try first in one initial session",
        },
        shortText: {
          uz: "Dastlab 1 seans",
          ru: "Сначала 1 сессия",
          en: "First session trial",
        },
        points: 1,
      },
    ],
  },
  {
    id: 4,
    order: 4,
    title: {
      uz: "Siz uchun qaysi konsultatsiya formati qulayroq?",
      ru: "Какой формат консультации для вас наиболее удобен?",
      en: "Which consultation format is most convenient for you?",
    },
    options: [
      {
        text: {
          uz: "Toshkentda oflayn (5/5 shinam kabinetda)",
          ru: "Очно в Ташкенте (5/5, уютный кабинет)",
          en: "Offline in Tashkent (5/5 private clinic)",
        },
        shortText: {
          uz: "Toshkent 5/5 oflayn",
          ru: "Ташкент 5/5 очно",
          en: "Tashkent offline",
        },
        points: 0,
      },
      {
        text: {
          uz: "Onlayn (Zoom yoki Telegram video-aloqa)",
          ru: "Онлайн (видеосвязь через Zoom или Telegram)",
          en: "Online (video call via Zoom or Telegram)",
        },
        shortText: {
          uz: "Onlayn video",
          ru: "Онлайн видео",
          en: "Online video",
        },
        points: 1,
      },
    ],
  },
];

export function calculateQuizScore(answers: number[]): number {
  if (!Array.isArray(answers)) return 0;
  return answers.reduce((sum, curr) => sum + (Number.isFinite(curr) ? Number(curr) : 0), 0);
}

export function getQuizTier(_score: number) {
  void _score;
  // Always returns an empathetic baseline tier object for backward compatibility
  return {
    id: "clarity",
    minScore: 0,
    maxScore: 10,
    title: {
      uz: "Shaxsiy Ichki Tahlil Natijasi",
      ru: "Результат Индивидуальной Диагностики",
      en: "Personal Diagnostic Outcome",
    },
    description: {
      uz: "Sizning holatingiz chuqur o'rganildi va eng mos ruhiy yo'nalish aniqlandi.",
      ru: "Ваша ситуация бережно проанализирована и подобрано оптимальное терапевтическое направление.",
      en: "Your situation has been carefully evaluated to identify the best therapeutic pathway.",
    },
    recommendation: {
      uz: "Rozaliya Gabdulhakova bilan shaxsiy konsultatsiya belgilash tavsiya etiladi.",
      ru: "Рекомендуется назначить индивидуальную сессию с Розалией Габдулхаковой.",
      en: "An individual session with Rozaliya Gabdulhakova is strongly recommended.",
    },
  };
}
