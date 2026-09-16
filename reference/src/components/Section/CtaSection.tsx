import React, { useState } from "react";
import { useLanguage } from "../../context/LanguageContext";
import { Button } from "../ui/button";

export interface CtaSectionProps {
  title?: string;
  subtitle?: string;
  placeholder?: string;
  buttonText?: string;
  emailRecipient?: string;
  className?: string;
}

export const CtaSection: React.FC<CtaSectionProps> = ({
  title,
  subtitle,
  placeholder,
  buttonText,
  emailRecipient = "alzanadytia.j@gmail.com",
  className = "",
}) => {
  const [projectIdea, setProjectIdea] = useState("");
  const { t } = useLanguage();

  const ctaTitle = title ?? t("footer.ctaTitle");
  const ctaSubtitle = subtitle ?? t("footer.ctaSubtitle");
  const inputPlaceholder = placeholder ?? t("footer.placeholder");
  const sendButtonLabel = buttonText ?? t("footer.send");

  return (
    <div
      className={`bg-card rounded-2xl md:rounded-3xl relative overflow-hidden footer-content shadow-xs ${className}`}
    >
      <div className="flex flex-col gap-8 md:gap-14 justify-center items-center min-h-[64vh] md:min-h-[83vh] lg:min-h-[90vh] p-6 py-16 md:py-22 lg:py-26 relative z-10">
        <div className="text-center flex flex-col items-center footer-text">
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-semibold mb-3 md:mb-6 leading-tight text-text-primary">
            {ctaTitle}
          </h2>
          <p className="text-sm md:text-lg w-[90%] md:w-[60%] text-text-secondary leading-relaxed font-medium">
            {ctaSubtitle}
          </p>
        </div>

        {/* Quick email CTA form */}
        <div className="bg-white/90 border border-white backdrop-blur-md w-full max-w-md pl-6 pr-2 py-2 rounded-full flex gap-3 justify-between items-center shadow-lg">
          <input
            type="text"
            placeholder={inputPlaceholder}
            className="text-sm md:text-base focus:outline-none font-medium w-full text-text-primary placeholder:text-text-secondary/60 bg-transparent"
            value={projectIdea}
            onChange={(e) => setProjectIdea(e.target.value)}
          />
          <Button
            id="footer-cta-send-btn"
            variant="primary"
            shape="rounded-full"
            scrollText
            className="shrink-0 aspect-square sm:aspect-auto flex items-center justify-center p-2.5 sm:px-4 sm:py-2 sm:gap-2 text-sm md:text-base"
            labelClassName="hidden sm:inline-flex"
            iconWrapper="none"
            target="_blank"
            rel="noopener noreferrer"
            href={`mailto:${emailRecipient}?subject=Project%20Inquiry&body=${encodeURIComponent(
              projectIdea
            )}`}
            iconRight={
              <svg
                stroke="currentColor"
                fill="currentColor"
                strokeWidth="0"
                viewBox="0 0 512 512"
                className="text-sm transition-all duration-300 ease-in-out group-hover:scale-120"
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M498.1 5.6c10.1 7 15.4 19.1 13.5 31.2l-64 416c-1.5 9.7-7.4 18.2-16 23s-18.9 5.4-28 1.6L284 427.7l-68.5 74.1c-8.9 9.7-22.9 12.9-35.2 8.1S160 493.2 160 480l0-83.6c0-4 1.5-7.8 4.2-10.8L331.8 202.8c5.8-6.3 5.6-16-.4-22s-15.7-6.4-22-.7L106 360.8 17.7 316.6C7.1 311.3 .3 300.7 0 288.9s5.9-22.8 16.1-28.7l448-256c10.7-6.1 23.9-5.5 34 1.4z"></path>
              </svg>
            }
          >
            {sendButtonLabel}
          </Button>
        </div>
      </div>

      {/* Ambient background particles */}
      <img
        alt="particle"
        width="850"
        height="850"
        className="absolute -bottom-40 md:-bottom-72 -left-40 md:-left-72 opacity-50 md:opacity-90 particle-blue pointer-events-none"
        src="/particle/blue.png"
      />
      <img
        alt="particle"
        width="850"
        height="850"
        className="absolute -top-40 md:-top-80 -right-40 md:-right-80 opacity-50 md:opacity-90 particle-purple pointer-events-none"
        src="/particle/purple.png"
      />
    </div>
  );
};
