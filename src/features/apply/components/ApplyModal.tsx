"use client";

import React, { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { Modal } from "@/components/ui/Modal";
import { ApplyForm } from "./ApplyForm";
import { contactConfig } from "@/config/contact";
import { X } from "lucide-react";

interface ApplyModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedService?: string | null;
}

export function ApplyModal({
  isOpen,
  onClose,
  selectedService,
}: ApplyModalProps) {
  const t = useTranslations("applyModal");
  const commonT = useTranslations("common");
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsSuccess(false);
    }
  }, [isOpen]);

  const modalTitle = selectedService
    ? `${selectedService}`
    : t("title");

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      ariaLabel={modalTitle}
    >
      {/* Editorial Header Strip: bg-forest text-ivory */}
      <div className="bg-forest text-ivory px-6 py-5 flex justify-between items-center border-b border-white/10 shrink-0">
        <div>
          <span className="font-mono text-xs uppercase tracking-widest text-terracotta font-semibold block mb-0.5">
            Rozaliya Gabdulhakova · Qabul
          </span>
          <h3 className="font-serif text-xl sm:text-2xl text-ivory font-normal leading-snug">
            {modalTitle}
          </h3>
        </div>
        <button
          type="button"
          onClick={onClose}
          aria-label={commonT("close")}
          className="w-10 h-10 min-w-[40px] min-h-[40px] rounded-full bg-white/10 hover:bg-white/20 text-ivory flex items-center justify-center transition-colors cursor-pointer shrink-0 ml-4"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Scrollable Body: bg-cream */}
      <div className="flex-1 overflow-y-auto p-6 sm:p-8 bg-cream text-ink">
        {isSuccess ? (
          <div className="py-2 text-left animate-in fade-in duration-300">
            <h4 className="font-serif text-2xl sm:text-3xl text-forest mb-3">
              {t("thankYouTitle")}
            </h4>

            <p className="text-xs sm:text-sm text-ink/80 leading-relaxed mb-6 font-normal">
              {t("thankYouBody")}
            </p>

            <div className="border-t border-b border-sand-border py-4 mb-6 space-y-3 font-mono text-xs">
              <div className="flex items-start gap-2">
                <span className="text-forest shrink-0 font-bold">{t("timelineStep1Prefix")}</span>
                <span className="text-ink">{t("timelineStep1Text")}</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-terracotta shrink-0 font-bold">{t("timelineStep2Prefix")}</span>
                <span className="text-ink/80">{t("timelineStep2Text")}</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-terracotta shrink-0 font-bold">{t("timelineStep3Prefix")}</span>
                <span className="text-ink/80">{t("timelineStep3Text")}</span>
              </div>
            </div>

            <div className="flex flex-col gap-2.5">
              <a
                href={contactConfig.telegramChannel.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={contactConfig.telegramChannel.ariaLabel}
                className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-terracotta-hover hover:bg-terracotta text-white text-xs font-semibold rounded-full transition-all cursor-pointer shadow-md"
              >
                <span>{t("actionTelegram")}</span>
                <span>↗</span>
              </a>
              <button
                type="button"
                onClick={onClose}
                className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 border border-sand-border hover:bg-sand-deep text-forest text-xs font-medium rounded-full transition-all cursor-pointer"
              >
                <span>{commonT("close")}</span>
              </button>
            </div>
          </div>
        ) : (
          <div>
            <ApplyForm
              onSuccess={() => setIsSuccess(true)}
              selectedService={selectedService}
            />
          </div>
        )}
      </div>
    </Modal>
  );
}

export default ApplyModal;
