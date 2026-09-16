import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useLanguage } from "../../context/LanguageContext";
import { TextTitle, TextDesc } from "../ui/Text";

gsap.registerPlugin(ScrollTrigger);

export interface ValueCardItem {
  icon: React.ReactNode;
  title: string;
  desc: string;
}

export interface ValueCardProps {
  item: ValueCardItem;
  className?: string;
}

export const ValueCard: React.FC<ValueCardProps> = ({ item, className = "" }) => {
  return (
    <div
      className={`why-card bg-linear-to-r from-primary/10 to-secondary/10 p-5 rounded-2xl flex flex-col gap-3 justify-between ${className}`}
    >
      <div className="why-card-icon size-12 bg-white rounded-xl flex items-center justify-center text-primary shadow-xs">
        {item.icon}
      </div>
      <div>
        <h4 className="text-xl font-medium mb-1 text-text-primary">
          {item.title}
        </h4>
        <p className="text-sm font-medium text-text-secondary leading-relaxed">
          {item.desc}
        </p>
      </div>
    </div>
  );
};

export interface ValueCoverProps {
  coverImage?: string;
  floatingLogos?: string[];
  className?: string;
}

export const ValueCover: React.FC<ValueCoverProps> = ({
  coverImage = "/why.webp",
  floatingLogos = ["/notion.png", "/postman.png", "/github.png"],
  className = "",
}) => {
  return (
    <div
      className={`why-visual w-full relative min-h-[380px] md:min-h-[460px] lg:h-full rounded-2xl bg-card overflow-hidden flex items-end justify-center ${className}`}
    >
      {/* Background ambient lighting */}
      <div className="absolute inset-0 bg-radial from-primary/10 via-transparent to-transparent opacity-60"></div>

      {/* Floating tools icons */}
      {floatingLogos[0] && (
        <div className="why-particle absolute top-8 left-8 size-14 md:size-16 bg-white rounded-2xl shadow-lg border border-white flex items-center justify-center p-3 rotate-6">
          <img
            alt="Notion logo"
            className="w-full h-full object-contain"
            src={floatingLogos[0]}
          />
        </div>
      )}
      {floatingLogos[1] && (
        <div className="why-particle absolute top-20 right-8 size-14 md:size-16 bg-white rounded-2xl shadow-lg border border-white flex items-center justify-center p-3 -rotate-12">
          <img
            alt="Postman logo"
            className="w-full h-full object-contain"
            src={floatingLogos[1]}
          />
        </div>
      )}
      {floatingLogos[2] && (
        <div className="why-particle absolute bottom-12 left-10 size-12 md:size-14 bg-white rounded-2xl shadow-lg border border-white flex items-center justify-center p-2.5 -rotate-6">
          <img
            alt="GitHub logo"
            className="w-full h-full object-contain"
            src={floatingLogos[2]}
          />
        </div>
      )}

      {/* Center Avatar */}
      <img
        alt="Alzan Adytia Profile"
        className="why-avatar relative z-10 w-[75%] md:w-[70%] max-w-[340px] object-cover drop-shadow-xl"
        src={coverImage}
      />
    </div>
  );
};

export interface ValueSectionProps {
  title?: string;
  subtitle?: string;
  coverImage?: string;
  floatingLogos?: string[];
  items?: ValueCardItem[];
  className?: string;
  id?: string;
}

export const ValueSection: React.FC<ValueSectionProps> = ({
  title,
  subtitle,
  coverImage = "/why.webp",
  floatingLogos = ["/notion.png", "/postman.png", "/github.png"],
  items,
  className = "",
  id = "why",
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { t } = useLanguage();

  const sectionTitle = title ?? t("why.title");
  const sectionSubtitle = subtitle ?? t("why.subtitle");

  const defaultCards: ValueCardItem[] = [
    {
      title: t("why.0.title"),
      desc: t("why.0.desc"),
      icon: (
        <svg
          stroke="currentColor"
          fill="currentColor"
          strokeWidth="0"
          viewBox="0 0 24 24"
          className="text-2xl"
          height="1em"
          width="1em"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path fill="none" d="M0 0h24v24H0z"></path>
          <path d="M12 2l2.4 7.2h7.6l-6 4.8 2.4 7.2-6-4.8-6 4.8 2.4-7.2-6-4.8h7.6z"></path>
        </svg>
      ),
    },
    {
      title: t("why.1.title"),
      desc: t("why.1.desc"),
      icon: (
        <svg
          stroke="currentColor"
          fill="currentColor"
          strokeWidth="0"
          viewBox="0 0 24 24"
          className="text-2xl"
          height="1em"
          width="1em"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path fill="none" d="M0 0h24v24H0z"></path>
          <path d="M13 2.05v3.03c3.39.49 6 3.39 6 6.92 0 .9-.18 1.75-.48 2.54l2.6 1.53c.56-1.24.88-2.62.88-4.07 0-5.18-3.95-9.45-9-9.95zM12 19c-3.87 0-7-3.13-7-7 0-3.53 2.61-6.43 6-6.92V2.05c-5.05.5-9 4.76-9 9.95 0 5.52 4.47 10 9.99 10 3.31 0 6.24-1.61 8.01-4.08l-2.45-1.45C16.14 17.92 14.21 19 12 19z"></path>
        </svg>
      ),
    },
    {
      title: t("why.2.title"),
      desc: t("why.2.desc"),
      icon: (
        <svg
          stroke="currentColor"
          fill="currentColor"
          strokeWidth="0"
          viewBox="0 0 24 24"
          className="text-2xl"
          height="1em"
          width="1em"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path fill="none" d="M0 0h24v24H0z"></path>
          <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8z"></path>
        </svg>
      ),
    },
    {
      title: t("why.3.title"),
      desc: t("why.3.desc"),
      icon: (
        <svg
          stroke="currentColor"
          fill="currentColor"
          strokeWidth="0"
          viewBox="0 0 24 24"
          className="text-2xl"
          height="1em"
          width="1em"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path fill="none" d="M0 0h24v24H0z"></path>
          <path d="M7 2v11h3v9l7-12h-4l4-8z"></path>
        </svg>
      ),
    },
  ];

  const cardItems = items ?? defaultCards;

  useGSAP(
    () => {
      // Visual stage (Avatar & Particles)
      gsap
        .timeline({
          scrollTrigger: {
            trigger: ".why-visual",
            start: "top 75%",
            toggleActions: "play none none none",
          },
        })
        .from(".why-avatar", {
          y: 70,
          opacity: 0,
          filter: "blur(12px)",
          duration: 1.2,
          ease: "power4.out",
        })
        .from(
          ".why-particle",
          {
            scale: 0,
            opacity: 0,
            duration: 1,
            stagger: 0.12,
            ease: "back.out(1.7)",
          },
          "-=0.7"
        );

      // Cards animate 1 by 1 as each card enters the viewport
      gsap.utils.toArray<HTMLElement>(".why-card").forEach((card) => {
        const icon = card.querySelector(".why-card-icon");
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: card,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        });

        tl.from(card, {
          y: 40,
          opacity: 0,
          scale: 0.94,
          duration: 0.8,
          ease: "back.out(1.4)",
          clearProps: "transform,opacity",
        });

        if (icon) {
          tl.fromTo(
            icon,
            { scale: 0, opacity: 0, rotation: -15 },
            {
              scale: 1,
              opacity: 1,
              rotation: 0,
              duration: 0.6,
              ease: "back.out(1.7)",
              clearProps: "transform,opacity",
            },
            "-=0.5"
          );
        }
      });
    },
    { scope: containerRef }
  );

  return (
    <section
      ref={containerRef}
      id={id}
      className={`py-12 lg:py-20 px-4 md:px-12 lg:px-36 xl:px-48 2xl:container mx-auto overflow-hidden select-none ${className}`}
    >
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-8 md:mb-12 lg:mb-20">
        <TextTitle className="mb-2 lg:mb-0 max-w-xl">
          {sectionTitle}
        </TextTitle>
        <TextDesc className="lg:w-[35%] lg:text-right">
          {sectionSubtitle}
        </TextDesc>
      </div>

      {/* Grid: Left Visual Cover & Right Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
        <div className="lg:col-span-5 flex">
          <ValueCover coverImage={coverImage} floatingLogos={floatingLogos} />
        </div>
        <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {cardItems.map((item, idx) => (
            <ValueCard key={idx} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
};
