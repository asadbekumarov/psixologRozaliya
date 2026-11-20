"use client";

import React, { useState, useRef } from "react";
import { useTranslations, useLocale } from "next-intl";
import { MaskedHeading } from "@/components/ui/MaskedHeading";
import { Reveal } from "@/components/motion/Reveal";
import { contactConfig } from "@/config/contact";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import {
  Phone,
  Send,
  MapPin,
  Clock,
  Check,
  CheckCircle2,
  ArrowUpRight,
  Lock,
  Video,
  Sparkles,
  User,
  AlertCircle,
  Loader2,
} from "lucide-react";

function InstagramIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}
import {
  formatUzbekPhone,
  cleanUzbekPhone,
  isUzbekPhoneComplete,
} from "@/lib/formatPhone";

export function Contact() {
  const t = useTranslations("contact");
  const applyT = useTranslations("applyModal");
  const locale = useLocale();

  const [isAnonymous, setIsAnonymous] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    companySize: "Toshkent 5/5",
    business: "",
    honeypot: "",
  });

  const [displayPhone, setDisplayPhone] = useState("+998 ");
  const [fieldErrors, setFieldErrors] = useState<{
    name?: string;
    phone?: string;
  }>({});

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const nameInputRef = useRef<HTMLInputElement>(null);
  const phoneInputRef = useRef<HTMLInputElement>(null);

  const formatOptions = [
    { id: "Toshkent 5/5", label: t("formatOffline") || "Toshkent 5/5 (Oflayn)", icon: MapPin },
    { id: "Onlayn (Zoom/Telegram)", label: t("formatOnline") || "Onlayn (Zoom / Telegram)", icon: Video },
    { id: "Mualliflik Treningi", label: t("formatTraining") || "Mualliflik Treningi", icon: Sparkles },
  ];

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatUzbekPhone(e.target.value);
    setDisplayPhone(formatted);
    if (fieldErrors.phone) {
      setFieldErrors((prev) => ({ ...prev, phone: undefined }));
    }
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, name: e.target.value }));
    if (fieldErrors.name) {
      setFieldErrors((prev) => ({ ...prev, name: undefined }));
    }
  };

  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setErrorMessage(null);

    const errors: { name?: string; phone?: string } = {};

    if (!isAnonymous && formData.name.trim().length < 2) {
      errors.name = t("nameError");
    }

    if (!isUzbekPhoneComplete(displayPhone)) {
      errors.phone = t("phoneError");
    }

    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      if (errors.name && nameInputRef.current) {
        nameInputRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
        nameInputRef.current.focus();
      } else if (errors.phone && phoneInputRef.current) {
        phoneInputRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
        phoneInputRef.current.focus();
      }
      return;
    }

    setFieldErrors({});

    try {
      setIsSubmitting(true);
      const cleanedPhone = cleanUzbekPhone(displayPhone);

      const res = await fetch("/api/apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: isAnonymous ? (formData.name.trim() || "Anonim Mehmon") : formData.name.trim(),
          isAnonymous,
          phone: cleanedPhone,
          companySize: formData.companySize || "Toshkent 5/5",
          business: formData.companySize,
          question: formData.business.trim() || undefined,
          service: "Individual psixologik konsultatsiya",
          locale,
          pageUrl: typeof window !== "undefined" ? window.location.href : undefined,
          honeypot: formData.honeypot,
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.ok) {
        setErrorMessage(
          data.error || "Arizani yuborishda xatolik yuz berdi. Iltimos, qayta urinib ko'ring."
        );
        return;
      }

      setIsSuccess(true);
      setFormData({
        name: "",
        companySize: "Toshkent 5/5",
        business: "",
        honeypot: "",
      });
      setDisplayPhone("+998 ");
    } catch {
      setErrorMessage(
        "Aloqa xatosi yuz berdi. Internetni tekshirib qayta urinib ko'ring."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const officeAddress =
    locale === "ru"
      ? contactConfig.office.addressRu
      : locale === "en"
      ? contactConfig.office.addressEn
      : contactConfig.office.addressUz;

  const isUz = locale === "uz";
  const isPhoneValid = isUzbekPhoneComplete(displayPhone);

  const directTitle = t.has("directTitle")
    ? t("directTitle")
    : isUz
    ? "To'g'ridan-to'g'ri aloqa"
    : locale === "ru"
    ? "Прямая связь"
    : "Direct Connection";

  const directSubtitle = t.has("directSubtitle")
    ? t("directSubtitle")
    : isUz
    ? "O'zingizga qulay vosita orqali yozing yoki qo'ng'iroq qiling."
    : locale === "ru"
    ? "Напишите или позвоните удобным для вас способом."
    : "Feel free to call or message through your preferred channel.";

  const channelSubtitle = t.has("channelSubtitle")
    ? t("channelSubtitle")
    : isUz
    ? "Foydali maqolalar va tavsiyalar"
    : locale === "ru"
    ? "Полезные статьи и рекомендации"
    : "Helpful articles and reflections";

  const secureDataNotice = t.has("secureDataNotice")
    ? t("secureDataNotice")
    : isUz
    ? "Ma'lumotlaringiz xavfsiz va shifrlangan holda uzatiladi"
    : locale === "ru"
    ? "Ваши данные передаются в зашифрованном виде"
    : "Your information is transmitted securely and encrypted";

  return (
    <section
      id="aloqa"
      aria-label={t("title")}
      className="scroll-mt-20 relative bg-cream border-t border-border py-[var(--section-y)] pb-28 sm:pb-32 overflow-x-clip text-charcoal"
    >
      <div className="max-w-[1200px] mx-auto px-5 sm:px-8 relative z-10">
        {/* Section Header */}
        <Reveal className="max-w-3xl mb-12 sm:mb-16">
          <MaskedHeading className="text-3xl sm:text-4xl lg:text-5xl font-serif font-normal tracking-tight text-charcoal leading-[1.16]">
            {t("titlePrefix")}
            <span className="italic text-sage ml-1">
              {t("titleHighlight")}
            </span>
          </MaskedHeading>

          <p className="text-sm sm:text-base text-charcoal-muted font-normal leading-relaxed mt-4 max-w-2xl">
            {t("description")}
          </p>
        </Reveal>

        {/* 12-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-stretch">
          {/* Details Column (Desktop lg:col-span-5) */}
          <div className="order-2 lg:order-1 lg:col-span-5 h-full flex flex-col">
            {/* Direct Contact Channels Card */}
            <div className="border border-border bg-white/85 rounded-3xl p-6 sm:p-8 shadow-card flex flex-col justify-between h-full space-y-6">
              <div>
                <h3 className="font-serif text-xl sm:text-2xl text-charcoal font-normal">
                  {directTitle}
                </h3>
                <p className="text-xs sm:text-sm text-charcoal-muted mt-1 leading-relaxed">
                  {directSubtitle}
                </p>
              </div>

              <div className="space-y-3 sm:space-y-3.5 flex-1 flex flex-col justify-center">
                {/* Phone (Only displayed if phone number is configured) */}
                {contactConfig.phone.display && (
                  <a
                    href={contactConfig.phone.href}
                    className="group flex items-center justify-between p-3.5 sm:p-4 rounded-2xl bg-cream-100 hover:bg-cream-200/90 border border-border hover:border-sage/40 transition-all min-h-[56px]"
                  >
                    <div className="flex items-center gap-3.5 min-w-0">
                      <div className="w-10 h-10 rounded-xl bg-sage/10 text-sage flex items-center justify-center shrink-0 group-hover:bg-sage group-hover:text-cream transition-colors">
                        <Phone className="w-4 h-4" />
                      </div>
                      <div className="min-w-0">
                        <div className="font-mono text-[11px] text-charcoal-muted uppercase tracking-wider">
                          {t("phoneLabel")}
                        </div>
                        <div className="text-sm sm:text-base font-mono font-medium text-charcoal group-hover:text-sage transition-colors truncate">
                          {contactConfig.phone.display}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-1 text-sage text-xs font-mono shrink-0 pl-2">
                      <span className="hidden sm:inline">Qo&apos;ng&apos;iroq</span>
                      <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </div>
                  </a>
                )}

                {/* Telegram Direct */}
                <a
                  href={contactConfig.telegramDirect.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-between p-3.5 sm:p-4 rounded-2xl bg-cream-100 hover:bg-cream-200/90 border border-border hover:border-sage/40 transition-all min-h-[56px]"
                >
                  <div className="flex items-center gap-3.5 min-w-0">
                    <div className="w-10 h-10 rounded-xl bg-sage/10 text-sage flex items-center justify-center shrink-0 group-hover:bg-sage group-hover:text-cream transition-colors">
                      <Send className="w-4 h-4" />
                    </div>
                    <div className="min-w-0">
                      <span className="font-mono text-[11px] text-charcoal-muted uppercase tracking-wider block">
                        {t("telegramDirectLabel")}
                      </span>
                      <div className="text-sm sm:text-base font-mono font-medium text-charcoal group-hover:text-sage transition-colors truncate">
                        {contactConfig.telegramDirect.display}
                      </div>
                    </div>
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-sage group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform shrink-0" />
                </a>

                {/* Telegram Channel */}
                <a
                  href={contactConfig.telegramChannel.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-between p-3.5 sm:p-4 rounded-2xl bg-cream-100 hover:bg-cream-200/90 border border-border hover:border-sage/40 transition-all min-h-[56px]"
                >
                  <div className="flex items-center gap-3.5 min-w-0">
                    <div className="w-10 h-10 rounded-xl bg-sage/10 text-sage flex items-center justify-center shrink-0 group-hover:bg-sage group-hover:text-cream transition-colors">
                      <Send className="w-4 h-4" />
                    </div>
                    <div className="min-w-0">
                      <div className="font-mono text-[11px] text-charcoal-muted uppercase tracking-wider">
                        {t("telegramChannelLabel")}
                      </div>
                      <div className="text-xs sm:text-sm text-charcoal-muted truncate">
                        {channelSubtitle}
                      </div>
                    </div>
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-sage group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform shrink-0" />
                </a>

                {/* Instagram */}
                <a
                  href={contactConfig.instagram.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-between p-3.5 sm:p-4 rounded-2xl bg-cream-100 hover:bg-cream-200/90 border border-border hover:border-sage/40 transition-all min-h-[56px]"
                >
                  <div className="flex items-center gap-3.5 min-w-0">
                    <div className="w-10 h-10 rounded-xl bg-sage/10 text-sage flex items-center justify-center shrink-0 group-hover:bg-sage group-hover:text-cream transition-colors">
                      <InstagramIcon className="w-4 h-4" />
                    </div>
                    <div className="min-w-0">
                      <div className="font-mono text-[11px] text-charcoal-muted uppercase tracking-wider">
                        Instagram
                      </div>
                      <div className="text-sm font-mono font-medium text-charcoal group-hover:text-sage transition-colors truncate">
                        {contactConfig.instagram.display}
                      </div>
                    </div>
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-sage group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform shrink-0" />
                </a>
              </div>

              {/* Office & Working Hours */}
              <div className="p-4 sm:p-5 rounded-2xl bg-cream-100/80 border border-border/80 space-y-2.5 mt-auto">
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-sage mt-0.5 shrink-0" />
                  <div>
                    <div className="font-mono text-[11px] text-charcoal-muted uppercase tracking-wider">
                      {t("addressLabel")}
                    </div>
                    <div className="text-xs sm:text-sm font-medium text-charcoal mt-0.5">
                      {officeAddress}
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3 pt-1 border-t border-border/60">
                  <Clock className="w-4 h-4 text-sage mt-0.5 shrink-0" />
                  <div>
                    <div className="font-mono text-[11px] text-charcoal-muted uppercase tracking-wider">
                      {t("hoursLabel")}
                    </div>
                    <div className="text-xs sm:text-sm text-charcoal-muted mt-0.5">
                      {t("hoursValue")}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Form Column (Desktop lg:col-span-7) */}
          <div className="order-1 lg:order-2 lg:col-span-7 h-full flex flex-col">
            <div className="bg-white/95 border border-border rounded-3xl p-6 sm:p-9 shadow-card relative overflow-hidden flex flex-col justify-between h-full">
              {/* Subtle ambient light */}
              <div className="pointer-events-none absolute -top-24 -right-24 w-56 h-56 bg-sage/10 rounded-full blur-3xl" />

              <div className="relative z-10 mb-6">
                <h3 className="font-serif text-2xl sm:text-3xl text-charcoal font-normal">
                  {t("formTitle")}
                </h3>
                <p className="text-xs sm:text-sm text-charcoal-muted mt-1 leading-relaxed">
                  {t("formSubtitle")}
                </p>
              </div>

              {isSuccess ? (
                <div className="p-8 bg-sage/10 border border-sage/30 rounded-2xl text-center space-y-4">
                  <div className="w-14 h-14 rounded-full bg-sage text-cream mx-auto flex items-center justify-center shadow-sm">
                    <CheckCircle2 className="w-7 h-7" />
                  </div>
                  <h4 className="font-serif text-2xl text-charcoal font-normal">
                    {applyT("thankYouBadge") || "Arizangiz qabul qilindi"}
                  </h4>
                  <p className="text-xs sm:text-sm text-charcoal-muted leading-relaxed max-w-md mx-auto">
                    {t("successMessage")}
                  </p>
                  <Button
                    type="button"
                    onClick={() => setIsSuccess(false)}
                    variant="outline"
                    className="mt-2 rounded-full text-xs font-mono uppercase tracking-wider min-h-[44px] px-6 border-sage/40 hover:bg-sage hover:text-cream transition-colors"
                  >
                    {t("submitAnother")}
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5 relative z-10">
                  {/* Honeypot anti-spam */}
                  <input
                    type="text"
                    name="website"
                    value={formData.honeypot}
                    onChange={(e) => setFormData((p) => ({ ...p, honeypot: e.target.value }))}
                    className="hidden"
                    tabIndex={-1}
                    autoComplete="off"
                  />

                  {/* Anonymous Mode Switch */}
                  <div className="flex items-center justify-between p-4 min-h-[48px] bg-cream-100/90 border border-border rounded-2xl transition-colors">
                    <label htmlFor="contact-anonymous" className="pr-3 cursor-pointer flex-1">
                      <span className="font-medium text-xs sm:text-sm text-charcoal block">
                        {t("anonymousLabel")}
                      </span>
                      <span className="text-[11px] text-charcoal-muted font-mono block mt-0.5">
                        {t("anonymousHint")}
                      </span>
                    </label>
                    <Switch
                      id="contact-anonymous"
                      checked={isAnonymous}
                      onCheckedChange={(checked) => setIsAnonymous(checked)}
                      aria-label={t("anonymousLabel")}
                    />
                  </div>

                  {/* Format Selection Buttons */}
                  <div>
                    <label className="font-mono text-xs uppercase tracking-wider text-charcoal-muted font-medium block mb-2">
                      {t("formatLabel")} <span className="text-terracotta">*</span>
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                      {formatOptions.map((opt) => {
                        const isSelected = formData.companySize === opt.id;
                        const IconComponent = opt.icon;
                        return (
                          <button
                            key={opt.id}
                            type="button"
                            onClick={() => setFormData((p) => ({ ...p, companySize: opt.id }))}
                            className={`min-h-[52px] px-3.5 py-2.5 rounded-2xl border text-xs font-medium transition-all text-left flex items-center gap-2.5 cursor-pointer ${
                              isSelected
                                ? "bg-sage text-cream border-sage shadow-sm font-semibold"
                                : "bg-cream-100 hover:bg-cream-200 border-border text-charcoal"
                            }`}
                          >
                            <IconComponent className={`w-4 h-4 shrink-0 ${isSelected ? "text-cream" : "text-sage"}`} />
                            <span className="line-clamp-2 leading-tight">{opt.label}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Name Input (hidden if anonymous) */}
                  {!isAnonymous && (
                    <div>
                      <label htmlFor="contact-name" className="font-mono text-xs uppercase tracking-wider text-charcoal-muted font-medium block mb-1.5">
                        {t("nameLabel")} <span className="text-terracotta">*</span>
                      </label>
                      <div className="relative flex items-center">
                        <span className="absolute left-4 pointer-events-none text-charcoal-muted flex items-center justify-center" aria-hidden="true">
                          <User className="w-4 h-4 text-sage" />
                        </span>
                        <Input
                          ref={nameInputRef}
                          id="contact-name"
                          type="text"
                          value={formData.name}
                          onChange={handleNameChange}
                          placeholder={t("namePlaceholder")}
                          className={`w-full h-12 pl-11 pr-4 rounded-2xl bg-cream-100 text-charcoal text-base border-border focus:border-sage focus:ring-1 focus:ring-sage ${
                            fieldErrors.name ? "border-red-500 focus:border-red-600 focus:ring-red-500" : ""
                          }`}
                        />
                      </div>
                      {fieldErrors.name && (
                        <p
                          role="alert"
                          aria-live="polite"
                          className="text-xs sm:text-sm text-red-700 mt-1.5 flex items-center gap-1 font-normal"
                        >
                          <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                          <span>{fieldErrors.name}</span>
                        </p>
                      )}
                    </div>
                  )}

                  {/* Phone Input */}
                  <div>
                    <label htmlFor="contact-phone" className="font-mono text-xs uppercase tracking-wider text-charcoal-muted font-medium block mb-1.5">
                      {t("phoneInputLabel")} <span className="text-terracotta">*</span>
                    </label>
                    <div className="relative flex items-center">
                      <span className="absolute left-4 pointer-events-none text-charcoal-muted flex items-center justify-center" aria-hidden="true">
                        <Phone className="w-4 h-4 text-sage" />
                      </span>
                      <Input
                        ref={phoneInputRef}
                        id="contact-phone"
                        type="tel"
                        inputMode="tel"
                        autoComplete="tel"
                        value={displayPhone}
                        onChange={handlePhoneChange}
                        placeholder="+998 90 123 45 67"
                        className={`w-full h-12 pl-11 pr-10 rounded-2xl bg-cream-100 text-charcoal font-mono text-base border-border focus:border-sage focus:ring-1 focus:ring-sage ${
                          fieldErrors.phone ? "border-red-500 focus:border-red-600 focus:ring-red-500" : ""
                        }`}
                      />
                      {isPhoneValid && (
                        <span className="absolute right-3.5 pointer-events-none text-sage flex items-center justify-center" aria-hidden="true">
                          <Check className="w-4 h-4 text-sage" />
                        </span>
                      )}
                    </div>
                    {fieldErrors.phone && (
                      <p
                        role="alert"
                        aria-live="polite"
                        className="text-xs sm:text-sm text-red-700 mt-1.5 flex items-center gap-1 font-normal"
                      >
                        <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                        <span>{fieldErrors.phone}</span>
                      </p>
                    )}
                  </div>

                  {/* Note / Question */}
                  <div>
                    <label className="font-mono text-xs uppercase tracking-wider text-charcoal-muted font-medium block mb-1.5">
                      {t("noteLabel")}
                    </label>
                    <div className="relative">
                      <Textarea
                        value={formData.business}
                        onChange={(e) => setFormData((p) => ({ ...p, business: e.target.value }))}
                        placeholder={t("notePlaceholder")}
                        rows={3}
                        className="w-full rounded-2xl bg-cream-100 text-charcoal border-border focus:border-sage text-base leading-relaxed p-3.5"
                      />
                    </div>
                  </div>

                  {errorMessage && (
                    <div className="p-3.5 bg-red-50 border border-red-200 text-red-700 text-xs rounded-xl font-mono flex items-start gap-2">
                      <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                      <span>{errorMessage}</span>
                    </div>
                  )}

                  {/* Submit Button */}
                  <div className="pt-2">
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full min-h-[52px] rounded-full bg-sage hover:bg-sage-dark text-cream text-xs font-semibold uppercase tracking-wider shadow-sm active:scale-[0.99] transition-all cursor-pointer flex items-center justify-center gap-2"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin text-cream" />
                          <span>Yuborilmoqda...</span>
                        </>
                      ) : (
                        <>
                          <span>{t("submitButton")}</span>
                          <ArrowUpRight className="w-4 h-4" />
                        </>
                      )}
                    </Button>

                    <div className="mt-3 flex items-center justify-center gap-1.5 text-center text-[11px] text-charcoal-muted/80 font-mono">
                      <Lock className="w-3 h-3 text-sage" />
                      <span>{secureDataNotice}</span>
                    </div>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
