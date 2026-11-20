"use client";

import React, { useState, useTransition, useCallback, useRef } from "react";
import { useTranslations, useLocale } from "next-intl";
import {
  QUIZ_QUESTIONS,
  DIAGNOSTIC_MAP,
  calculateQuizScore,
  type QuizDiagnosticResult,
} from "../data/quizData";
import {
  formatUzbekPhone,
  cleanUzbekPhone,
  isUzbekPhoneComplete,
} from "@/lib/formatPhone";
import { contactConfig } from "@/config/contact";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import {
  Lock,
  ArrowLeft,
  ArrowRight,
  Check,
  RotateCcw,
} from "lucide-react";
import { m, AnimatePresence, useReducedMotion } from "motion/react";
import { EASE_EDITORIAL } from "@/lib/motion";

type QuizStep = "intro" | "questions" | "lead" | "result";

interface QuizResultData {
  score: number;
  answers: number[];
  diagnostic: QuizDiagnosticResult;
  telegramSent?: boolean;
}

export function QuizView() {
  const t = useTranslations("quiz");
  const locale = useLocale() as "uz" | "ru" | "en";
  const [, startTransition] = useTransition();
  const reduced = useReducedMotion();

  const [step, setStep] = useState<QuizStep>("intro");
  const [currentIdx, setCurrentIdx] = useState<number>(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [isTransitioning, setIsTransitioning] = useState<boolean>(false);

  // Lead form state
  const [isAnonymous, setIsAnonymous] = useState<boolean>(false);
  const [contactMethod, setContactMethod] = useState<"phone" | "telegram">("phone");
  const [telegramHandle, setTelegramHandle] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [displayPhone, setDisplayPhone] = useState<string>("+998 ");
  const [phone, setPhone] = useState<string>("+998");
  const companySize = "Toshkent 5/5";
  const honeypot = "";

  const [formErrors, setFormErrors] = useState<{
    name?: string;
    phone?: string;
    telegramHandle?: string;
    companySize?: string;
    general?: string;
  }>({});
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [resultData, setResultData] = useState<QuizResultData | null>(null);

  const nameInputRef = useRef<HTMLInputElement>(null);
  const phoneInputRef = useRef<HTMLInputElement>(null);
  const telegramInputRef = useRef<HTMLInputElement>(null);

  const totalQuestions = QUIZ_QUESTIONS.length;
  const currentQuestion = QUIZ_QUESTIONS[currentIdx];

  const handleStart = () => {
    setAnswers([]);
    setCurrentIdx(0);
    setStep("questions");
  };

  const handleSelectOption = useCallback(
    (points: 0 | 1 | 2 | 3) => {
      if (isTransitioning) return;

      const nextAnswers = [...answers];
      nextAnswers[currentIdx] = points;
      setAnswers(nextAnswers);
      setIsTransitioning(true);

      setTimeout(() => {
        startTransition(() => {
          if (currentIdx + 1 < totalQuestions) {
            setCurrentIdx((prev) => prev + 1);
          } else {
            setStep("lead");
          }
          setIsTransitioning(false);
        });
      }, 220);
    },
    [answers, currentIdx, isTransitioning, totalQuestions]
  );

  const handleBackQuestion = () => {
    if (currentIdx > 0) {
      setCurrentIdx((prev) => prev - 1);
    } else {
      setStep("intro");
    }
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatUzbekPhone(e.target.value);
    setDisplayPhone(formatted);
    setPhone(cleanUzbekPhone(formatted));
    if (formErrors.phone) {
      setFormErrors((prev) => ({ ...prev, phone: undefined }));
    }
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
    if (formErrors.name) {
      setFormErrors((prev) => ({ ...prev, name: undefined }));
    }
  };

  const handleTelegramChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value;
    if (val && !val.startsWith("@")) val = "@" + val;
    setTelegramHandle(val);
    if (formErrors.telegramHandle) {
      setFormErrors((prev) => ({ ...prev, telegramHandle: undefined }));
    }
  };

  const handleSubmitLead = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (honeypot) return;

    const errors: typeof formErrors = {};

    if (!isAnonymous && name.trim().length < 2) {
      errors.name = t("nameError");
    }

    if (contactMethod === "phone") {
      if (!isUzbekPhoneComplete(displayPhone)) {
        errors.phone = t("phoneError");
      }
    } else {
      const cleanHandle = telegramHandle.replace(/^@/, "").trim();
      if (cleanHandle.length < 3) {
        errors.telegramHandle = t("telegramError") || "Telegram username noto'g'ri";
      }
    }

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      if (errors.name && nameInputRef.current) {
        nameInputRef.current.focus();
      } else if (errors.phone && phoneInputRef.current) {
        phoneInputRef.current.focus();
      } else if (errors.telegramHandle && telegramInputRef.current) {
        telegramInputRef.current.focus();
      }
      return;
    }

    setIsSubmitting(true);
    setFormErrors({});

    try {
      const computedScore = calculateQuizScore(answers);
      const q1Index = answers[0] ?? 0;
      const diagnostic = DIAGNOSTIC_MAP[q1Index] ?? DIAGNOSTIC_MAP[0];

      const payload = {
        name: isAnonymous ? "Anonim Mijoz" : name.trim(),
        phone: contactMethod === "phone" ? phone : "",
        telegramHandle: contactMethod === "telegram" ? telegramHandle.trim() : "",
        contactMethod,
        answers,
        score: computedScore,
        diagnosticKey: q1Index,
        service: diagnostic.serviceTitle[locale] || diagnostic.serviceTitle.uz,
        companySize,
        honeypot,
      };

      const res = await fetch("/api/quiz", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      setResultData({
        score: computedScore,
        answers,
        diagnostic,
        telegramSent: data.success || res.ok,
      });

      setStep("result");
    } catch {
      const fallbackScore = calculateQuizScore(answers);
      const q1Index = answers[0] ?? 0;
      const fallbackDiagnostic = DIAGNOSTIC_MAP[q1Index] ?? DIAGNOSTIC_MAP[0];

      setResultData({
        score: fallbackScore,
        answers,
        diagnostic: fallbackDiagnostic,
        telegramSent: false,
      });

      setStep("result");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRetake = () => {
    setAnswers([]);
    setCurrentIdx(0);
    setName("");
    setDisplayPhone("+998 ");
    setPhone("+998");
    setTelegramHandle("");
    setIsAnonymous(false);
    setFormErrors({});
    setResultData(null);
    setStep("intro");
  };

  const directTelegramUrl =
    contactConfig.telegramDirect?.url || contactConfig.telegram?.url || "https://t.me/psixolog_rozaliya_admin";

  const progressPercent = Math.round(((currentIdx + 1) / totalQuestions) * 100);

  return (
    <div className="min-h-[calc(100dvh-5rem)] bg-sand text-ink flex flex-col justify-center py-6 sm:py-12 px-4 sm:px-6 lg:px-12">
      <div className="max-w-7xl mx-auto w-full">
        {/* DESKTOP 12-COLUMN SPLIT CONTAINER */}
        <div className="grid grid-cols-1 lg:grid-cols-12 rounded-3xl overflow-hidden border border-sand-border shadow-2xl bg-cream">
          {/* ================= LEFT NARROW PANEL (4 cols on lg: bg-forest text-ivory) ================= */}
          <div className="lg:col-span-4 bg-forest text-ivory p-6 sm:p-8 lg:p-10 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-white/10 relative">
            <div>
              {/* Eyebrow */}
              <div className="flex items-center gap-2 mb-4">
                <span className="font-mono text-xs uppercase tracking-[0.2em] text-terracotta font-semibold">
                  00 — Ekspress test
                </span>
                <div className="h-[1px] w-8 bg-terracotta/40" />
              </div>

              <h1 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-ivory leading-snug tracking-tight mb-4">
                {t("introTitle")}
              </h1>

              <p className="text-xs sm:text-sm text-mist leading-relaxed font-normal mb-6">
                {t("introDescription")}
              </p>

              {/* Progress Indicator (shown when in questions step) */}
              {step === "questions" && (
                <div className="pt-6 border-t border-white/10 space-y-2">
                  <div className="flex items-center justify-between text-xs font-mono uppercase tracking-wider text-mist">
                    <span>Savol</span>
                    <span className="text-terracotta font-semibold">
                      {currentIdx + 1} / {totalQuestions} ({progressPercent}%)
                    </span>
                  </div>
                  <Progress
                    value={progressPercent}
                    className="h-1.5 bg-white/15 [&>div]:bg-terracotta"
                  />
                </div>
              )}
            </div>

            {/* Bottom Confidentiality Badge */}
            <div className="pt-6 mt-6 border-t border-white/10 flex items-center gap-3 text-xs font-mono text-mist/80">
              <Lock className="w-4 h-4 text-terracotta shrink-0" />
              <span>100% maxfiy · 3 daqiqa · Ilmiy KBT</span>
            </div>
          </div>

          {/* ================= RIGHT MAIN AREA (8 cols on lg: bg-sand/40) ================= */}
          <div className="lg:col-span-8 p-6 sm:p-10 lg:p-14 flex flex-col justify-center">
            {/* STEP 1: INTRO */}
            {step === "intro" && (
              <div className="max-w-xl">
                <span className="font-mono text-xs uppercase tracking-widest text-terracotta font-semibold block mb-2">
                  Dastlabki diagnostika
                </span>
                <h2 className="font-serif text-3xl sm:text-4xl text-forest font-normal leading-snug mb-4">
                  {t("introSubtitle")}
                </h2>
                <p className="text-sm sm:text-base text-ink/80 leading-relaxed font-normal mb-8">
                  3 daqiqa davomida bir necha savollarga samimiy javob bering va o&apos;zingizning hozirgi emotsional holatingiz hamda eng to&apos;g&apos;ri psixologik yo&apos;nalishingizni aniqlang.
                </p>

                <m.div whileTap={{ scale: 0.98 }}>
                  <Button
                    type="button"
                    onClick={handleStart}
                    className="w-full sm:w-auto h-12 min-h-[48px] px-8 rounded-full bg-terracotta-hover hover:bg-terracotta text-white font-semibold text-sm shadow-[0_8px_24px_rgba(176,90,63,0.35)] transition-all cursor-pointer flex items-center justify-center gap-2"
                  >
                    <span>{t("startAction")}</span>
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </m.div>
              </div>
            )}

            {/* STEP 2: QUESTIONS (Full-width rows with letter marker) */}
            {step === "questions" && currentQuestion && (
              <div>
                <AnimatePresence mode="wait">
                  <m.div
                    key={currentIdx}
                    initial={reduced ? undefined : { opacity: 0, x: 16 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={reduced ? undefined : { opacity: 0, x: -16 }}
                    transition={{ duration: 0.22, ease: EASE_EDITORIAL }}
                  >
                    <h2 className="font-serif text-2xl sm:text-3xl text-forest font-normal leading-snug tracking-tight mb-8">
                      {currentQuestion.title[locale] || currentQuestion.title.uz}
                    </h2>

                    {/* Answer Options as Full-Width Rows */}
                    <div
                      role="radiogroup"
                      aria-label={currentQuestion.title[locale] || currentQuestion.title.uz}
                      className="space-y-3 mb-8"
                    >
                      {currentQuestion.options.map((option, optIdx) => {
                        const isSelected = answers[currentIdx] === option.points;
                        const letter = ["A", "B", "C", "D"][optIdx];

                        return (
                          <button
                            key={optIdx}
                            type="button"
                            role="radio"
                            aria-checked={isSelected}
                            onClick={() => handleSelectOption(option.points)}
                            className={`w-full min-h-[56px] p-4 rounded-2xl border text-left transition-all duration-200 cursor-pointer flex items-center justify-between gap-4 active:scale-[0.99] ${
                              isSelected
                                ? "bg-forest text-ivory border-forest shadow-md"
                                : "bg-cream hover:bg-sand-deep/60 border-sand-border text-ink"
                            }`}
                          >
                            <div className="flex items-center gap-4 flex-1">
                              {/* Letter badge: 36px */}
                              <span
                                className={`w-9 h-9 rounded-full shrink-0 flex items-center justify-center font-mono text-xs font-bold transition-colors ${
                                  isSelected
                                    ? "bg-terracotta text-white"
                                    : "bg-sand text-forest border border-sand-border"
                                }`}
                              >
                                {letter}
                              </span>
                              <span className="text-sm sm:text-base leading-relaxed font-normal">
                                {option.text[locale] || option.text.uz}
                              </span>
                            </div>

                            <span
                              className={`w-5 h-5 rounded-full border shrink-0 flex items-center justify-center ${
                                isSelected ? "border-terracotta bg-terracotta" : "border-sand-border"
                              }`}
                            >
                              {isSelected && <Check className="w-3 h-3 text-white" />}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </m.div>
                </AnimatePresence>

                {/* Back Button */}
                <div className="pt-4 border-t border-sand-border flex items-center justify-between">
                  <button
                    type="button"
                    onClick={handleBackQuestion}
                    className="min-h-[44px] px-3 font-mono text-xs uppercase tracking-wider text-ink/70 hover:text-forest transition-colors cursor-pointer inline-flex items-center gap-2 rounded-lg"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>{t("backAction")}</span>
                  </button>
                </div>
              </div>
            )}

            {/* STEP 3: LEAD FORM */}
            {step === "lead" && (
              <form onSubmit={handleSubmitLead} className="max-w-lg space-y-6">
                <div>
                  <span className="font-mono text-xs uppercase tracking-widest text-terracotta font-semibold block mb-1">
                    Natijani olish
                  </span>
                  <h2 className="font-serif text-2xl sm:text-3xl text-forest font-normal leading-snug">
                    {t("leadTitle")}
                  </h2>
                  <p className="text-xs sm:text-sm text-ink/70 mt-1">
                    {t("leadSubtitle")}
                  </p>
                </div>

                {/* Anonymous Switch */}
                <div className="flex items-center justify-between p-3.5 rounded-2xl bg-cream border border-sand-border">
                  <span className="text-xs sm:text-sm text-ink font-medium">
                    {t("anonymousToggle")}
                  </span>
                  <Switch
                    checked={isAnonymous}
                    onCheckedChange={setIsAnonymous}
                    aria-label={t("anonymousToggle")}
                  />
                </div>

                {!isAnonymous && (
                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-ink/80 mb-1.5 font-medium">
                      {t("nameLabel")}
                    </label>
                    <Input
                      ref={nameInputRef}
                      type="text"
                      value={name}
                      onChange={handleNameChange}
                      placeholder={t("namePlaceholder")}
                      className="h-12 rounded-xl bg-cream border-sand-border text-forest text-sm"
                    />
                    {formErrors.name && (
                      <p className="text-xs text-red-600 mt-1">{formErrors.name}</p>
                    )}
                  </div>
                )}

                {/* Contact Method Switcher */}
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <button
                      type="button"
                      onClick={() => setContactMethod("phone")}
                      className={`text-xs font-mono px-3 py-1 rounded-full transition-colors ${
                        contactMethod === "phone"
                          ? "bg-forest text-ivory font-semibold"
                          : "bg-cream text-ink/75 border border-sand-border"
                      }`}
                    >
                      Telefon orqali
                    </button>
                    <button
                      type="button"
                      onClick={() => setContactMethod("telegram")}
                      className={`text-xs font-mono px-3 py-1 rounded-full transition-colors ${
                        contactMethod === "telegram"
                          ? "bg-forest text-ivory font-semibold"
                          : "bg-cream text-ink/75 border border-sand-border"
                      }`}
                    >
                      Telegram orqali
                    </button>
                  </div>

                  {contactMethod === "phone" ? (
                    <div>
                      <Input
                        ref={phoneInputRef}
                        type="tel"
                        value={displayPhone}
                        onChange={handlePhoneChange}
                        placeholder="+998 (__) ___-__-__"
                        className="h-12 rounded-xl bg-cream border-sand-border text-forest text-sm font-mono"
                      />
                      {formErrors.phone && (
                        <p className="text-xs text-red-600 mt-1">{formErrors.phone}</p>
                      )}
                    </div>
                  ) : (
                    <div>
                      <Input
                        ref={telegramInputRef}
                        type="text"
                        value={telegramHandle}
                        onChange={handleTelegramChange}
                        placeholder="@username"
                        className="h-12 rounded-xl bg-cream border-sand-border text-forest text-sm font-mono"
                      />
                      {formErrors.telegramHandle && (
                        <p className="text-xs text-red-600 mt-1">{formErrors.telegramHandle}</p>
                      )}
                    </div>
                  )}
                </div>

                <m.div whileTap={{ scale: 0.98 }}>
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full h-12 min-h-[48px] rounded-full bg-terracotta-hover hover:bg-terracotta text-white font-semibold text-sm shadow-[0_8px_24px_rgba(176,90,63,0.35)] transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>{isSubmitting ? "Yuklanmoqda..." : t("submitAction")}</span>
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </m.div>
              </form>
            )}

            {/* STEP 4: RESULT SCREEN */}
            {step === "result" && resultData && (
              <div className="max-w-xl space-y-6">
                <div>
                  <span className="font-mono text-xs uppercase tracking-widest text-terracotta font-semibold block mb-1">
                    Diagnostika natijasi
                  </span>
                  <h2 className="font-serif text-3xl sm:text-4xl text-forest font-normal leading-snug">
                    {resultData.diagnostic.serviceTitle[locale] || resultData.diagnostic.serviceTitle.uz}
                  </h2>
                </div>

                {/* Score Visual Bar */}
                <div className="p-5 rounded-2xl bg-cream border border-sand-border">
                  <div className="flex items-center justify-between text-xs font-mono uppercase tracking-wider text-ink/70 mb-2">
                    <span>Moslik darajasi</span>
                    <span className="text-forest font-bold text-sm">
                      {Math.min(100, Math.max(60, Math.round((resultData.score / 15) * 100)))}%
                    </span>
                  </div>
                  <Progress
                    value={Math.min(100, Math.max(60, Math.round((resultData.score / 15) * 100)))}
                    className="h-2 bg-sand [&>div]:bg-forest"
                  />
                </div>

                {/* Insight Body Text */}
                <p className="text-sm sm:text-base text-ink/85 leading-relaxed font-normal">
                  {resultData.diagnostic.empathyNote[locale] || resultData.diagnostic.empathyNote.uz}
                </p>

                {/* Action CTA Buttons */}
                <div className="pt-4 flex flex-col sm:flex-row gap-4">
                  <a
                    href={directTelegramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 h-12 min-h-[48px] px-8 rounded-full bg-terracotta-hover hover:bg-terracotta text-white font-semibold text-sm shadow-[0_8px_24px_rgba(176,90,63,0.35)] transition-all cursor-pointer"
                  >
                    <span>{resultData.diagnostic.actionText[locale] || resultData.diagnostic.actionText.uz}</span>
                    <ArrowRight className="w-4 h-4" />
                  </a>

                  <button
                    type="button"
                    onClick={handleRetake}
                    className="inline-flex items-center justify-center gap-2 h-12 min-h-[48px] px-6 rounded-full bg-cream hover:bg-sand border border-sand-border text-forest font-serif text-sm transition-colors cursor-pointer"
                  >
                    <RotateCcw className="w-4 h-4" />
                    <span>Qayta topshirish</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default QuizView;
