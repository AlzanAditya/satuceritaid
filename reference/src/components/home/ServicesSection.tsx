import React, { useState, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { SplitWords } from "../common/SplitWords";
import { useLanguage } from "../../context/LanguageContext";
import { Button } from "../ui/button";

gsap.registerPlugin(ScrollTrigger);

interface SpecializeItem {
  number: string;
  titleKey: "services.0.title" | "services.1.title" | "services.2.title";
  descKey: "services.0.desc" | "services.1.desc" | "services.2.desc";
  tags: { en: string[]; id: string[] };
  image: string;
}

const SPECIALIZE_DATA: SpecializeItem[] = [
  {
    number: "01.",
    titleKey: "services.0.title",
    descKey: "services.0.desc",
    tags: {
      en: [
        "Business Process",
        "Database",
        "Authentication",
        "Dashboard",
        "Role Management",
      ],
      id: [
        "Business Process",
        "Database",
        "Authentication",
        "Dashboard",
        "Role Management",
      ],
    },
    image: "/assets/system-builder.jpeg",
  },
  {
    number: "02.",
    titleKey: "services.1.title",
    descKey: "services.1.desc",
    tags: {
      en: [
        "React & Tanstack",
        "Full stack",
        "Responsive Design",
        "Performance & SEO",
      ],
      id: [
        "React & Tanstack",
        "Full stack",
        "Responsive Design",
        "Performance & SEO",
      ],
    },
    image: "/assets/web-dev.jpeg",
  },
  {
    number: "03.",
    titleKey: "services.2.title",
    descKey: "services.2.desc",
    tags: {
      en: [
        "Figma",
        "Wireframing",
        "Prototyping",
        "Design System",
        "Responsive Design",
      ],
      id: [
        "Figma",
        "Wireframing",
        "Prototyping",
        "Design System",
        "Responsive Design",
      ],
    },
    image: "/assets/advertising.jpeg",
  },
];

interface SpecializeItemProps {
  index: number;
  item: SpecializeItem;
  isOpen: boolean;
  onToggle: () => void;
  buttonConfig?: ServicesButtonConfig;
}

export interface ServicesButtonConfig {
  /** Ensure the toggle button is a mathematically perfect 1:1 circle */
  perfectCircle?: boolean;
  /** Size styling for the toggle button */
  size?: "sm" | "md" | "lg" | "responsive";
  /** Custom additional classes */
  className?: string;
}

export const DEFAULT_SERVICES_BUTTON_CONFIG: ServicesButtonConfig = {
  perfectCircle: true,
  size: "responsive",
};

export interface ServicesSectionProps {
  buttonConfig?: ServicesButtonConfig;
}

const SpecializeAccordionItem: React.FC<SpecializeItemProps> = ({
  index,
  item,
  isOpen,
  onToggle,
  buttonConfig,
}) => {
  const itemRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const curtainRef = useRef<HTMLDivElement>(null);
  const { lang, t } = useLanguage();

  const title = t(item.titleKey);
  const desc = t(item.descKey);
  const tags = lang === "id" ? item.tags.id : item.tags.en;

  const isCircle = buttonConfig?.perfectCircle ?? true;
  const sizeClasses =
    buttonConfig?.size === "sm"
      ? "w-8 h-8 min-w-8 min-h-8"
      : buttonConfig?.size === "md"
      ? "w-10 h-10 min-w-10 min-h-10"
      : buttonConfig?.size === "lg"
      ? "w-12 h-12 min-w-12 min-h-12"
      : "w-9 h-9 min-w-9 min-h-9 md:w-12 md:h-12 md:min-w-12 md:min-h-12";

  useGSAP(
    () => {
      if (isOpen) {
        gsap
          .timeline()
          .to(contentRef.current, {
            height: "auto",
            opacity: 1,
            duration: 0.7,
            ease: "power3.inOut",
          })
          .to(
            curtainRef.current,
            { yPercent: -100, duration: 1, ease: "power4.inOut" },
            "-=0.4"
          )
          .to(imgRef.current, { y: 0, duration: 1, ease: "power4.inOut" }, "<")
          .fromTo(
            `.tag-item-${index}`,
            { y: 15, opacity: 0 },
            { y: 0, opacity: 1, stagger: 0.05, duration: 0.6, ease: "power2.out" },
            "-=0.8"
          );
      } else {
        gsap.to(contentRef.current, {
          height: 0,
          opacity: 0,
          duration: 0.5,
          ease: "power3.inOut",
        });
        gsap.set(curtainRef.current, { yPercent: 0 });
        gsap.set(imgRef.current, { y: "100%" });
        gsap.set(`.tag-item-${index}`, { opacity: 0 });
      }
    },
    { dependencies: [isOpen], scope: itemRef }
  );

  return (
    <div key={index} className="spec-item" ref={itemRef}>
      <div
        data-cursor={isOpen ? undefined : "Open"}
        className={`transition-all duration-500 border-b border-foreground/15 last:border-0 ${
          isOpen
            ? "bg-linear-to-r from-primary/10 to-secondary/10 rounded-2xl p-4 md:p-8 my-4"
            : "p-4 md:p-8 hover:bg-card/25"
        }`}
      >
        {/* Accordion Trigger Row */}
        <div
          onClick={onToggle}
          className="grid grid-cols-12 items-center cursor-pointer group"
        >
          <p className="col-span-1 hidden md:block text-3xl font-medium text-text-secondary">
            {item.number}
          </p>
          <h3 className="col-span-10 text-xl md:text-3xl font-medium text-text-primary group-hover:text-primary transition-colors duration-300">
            {title}
          </h3>
          <div className="col-span-2 md:col-span-1 flex justify-end">
            <Button
              id={`service-toggle-${index}`}
              variant="circle-toggle"
              shape="circle"
              isCircle={isCircle}
              isOpen={isOpen}
              aria-label="Toggle details"
              className={`${sizeClasses} rounded-full aspect-square shrink-0 flex items-center justify-center p-0 transition-all duration-300 ${
                isOpen ? "bg-primary text-white" : ""
              } ${buttonConfig?.className || ""}`.trim()}
            >
              <svg
                stroke="currentColor"
                fill="currentColor"
                strokeWidth="0"
                viewBox="0 0 448 512"
                className={`text-lg md:text-2xl transition-transform duration-300 pointer-events-none ${
                  isOpen ? "rotate-45" : ""
                }`}
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 144L48 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l144 0 0 144c0 17.7 14.3 32 32 32s32-14.3 32-32l0-144 144 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-144 0 0-144z"></path>
              </svg>
            </Button>
          </div>
        </div>

        {/* Accordion Content with GSAP animated container */}
        <div ref={contentRef} className="overflow-hidden h-0 opacity-0">
          <div className="grid lg:grid-cols-12 items-end gap-8 pt-6">
            <div className="hidden lg:block col-span-1 lg:order-1"></div>

            {/* Description & Tags */}
            <div className="order-2 lg:order-2 lg:col-span-6">
              <p className="text-sm md:text-base mb-6 leading-relaxed text-text-secondary">
                {desc}
              </p>
              <div className="flex flex-wrap gap-2 md:gap-x-3">
                {tags.map((tag, tIdx) => (
                  <span
                    key={tIdx}
                    className={`tag-item-${index} px-3 md:px-4 py-2 text-xs md:text-sm bg-white shadow-2xs border border-foreground/20 text-text-primary font-medium rounded-full opacity-0`}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Preview Image with curtain animation */}
            <div className="order-1 lg:order-3 lg:col-span-5 overflow-hidden rounded-2xl relative h-48 md:h-56 p-2 bg-white shadow-xs">
              <div
                ref={curtainRef}
                className="absolute inset-0 bg-white z-10 pointer-events-none"
              ></div>
              <img
                ref={imgRef}
                alt={title}
                loading="lazy"
                width="800"
                height="400"
                className="w-full h-full object-cover rounded-xl translate-y-full"
                src={item.image}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const ServicesSection: React.FC<ServicesSectionProps> = ({
  buttonConfig = DEFAULT_SERVICES_BUTTON_CONFIG,
}) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const { lang, t } = useLanguage();

  useGSAP(
    () => {
      gsap
        .timeline({
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 50%",
            toggleActions: "play none none none",
          },
        })
        .from(".spec-header", {
          y: 40,
          opacity: 0,
          filter: "blur(10px)",
          duration: 1,
          ease: "power3.out",
        })
        .from(
          ".spec-item",
          {
            y: 30,
            opacity: 0,
            stagger: 0.1,
            duration: 0.8,
            ease: "power3.out",
          },
          "-=0.6"
        )
        .call(() => {
          setOpenIndex(0);
        });
    },
    { scope: containerRef }
  );

  const toggleItem = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section
      ref={containerRef}
      id="specialize"
      className="py-12 lg:py-20 px-4 md:px-12 lg:px-36 xl:px-48 2xl:container mx-auto overflow-x-hidden select-none"
    >
      {/* Header */}
      <div className="spec-header flex flex-col lg:flex-row lg:items-center justify-between mb-8 md:mb-12 lg:mb-20">
        <h2 className="font-semibold text-3xl md:text-5xl mb-2 lg:mb-0 leading-[1.2]">
          <SplitWords text={t("services.title")} />
        </h2>
        <p className="md:text-lg font-medium text-text-secondary lg:w-[32%] lg:text-right">
          {t("services.subtitle")}
        </p>
      </div>

      {/* Accordion List */}
      <div className="flex flex-col">
        {SPECIALIZE_DATA.map((item, idx) => (
          <SpecializeAccordionItem
            key={idx}
            index={idx}
            item={item}
            isOpen={openIndex === idx}
            onToggle={() => toggleItem(idx)}
            buttonConfig={buttonConfig}
          />
        ))}
      </div>
    </section>
  );
};

