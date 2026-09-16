import React, { useState, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { motion, AnimatePresence } from "motion/react";
import { useLanguage } from "../../context/LanguageContext";
import { Button } from "../ui/button";
import { TextTitle, TextDesc } from "../ui/Text";

gsap.registerPlugin(ScrollTrigger);

export interface ServiceItem {
  number: string;
  title: string;
  desc: string;
  tags?: string[];
  image?: string;
}

export interface ItemServiceProps {
  index: number;
  item: ServiceItem;
  isOpen: boolean;
  onToggle: () => void;
  className?: string;
}

export const ItemService: React.FC<ItemServiceProps> = ({
  index,
  item,
  isOpen,
  onToggle,
  className = "",
}) => {
  return (
    <div
      className={`spec-item border-b border-foreground/10 py-6 md:py-8 transition-colors duration-300 ${className}`}
    >
      <div
        onClick={onToggle}
        data-cursor="expand"
        className="flex items-center justify-between cursor-pointer group"
      >
        <div className="flex items-baseline gap-4 md:gap-8">
          <span className="text-sm md:text-base font-semibold text-text-secondary group-hover:text-primary transition-colors">
            {item.number}
          </span>
          <h3 className="text-xl md:text-3xl font-medium text-text-primary group-hover:text-primary transition-colors">
            {item.title}
          </h3>
        </div>
        <Button
          variant="circle-toggle"
          isOpen={isOpen}
          aria-label={isOpen ? "Collapse service details" : "Expand service details"}
        />
      </div>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key={`service-desc-${index}`}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <div className="pt-6 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
              <div className="lg:col-span-8 flex flex-col gap-4">
                <p className="text-text-secondary text-sm md:text-base leading-relaxed">
                  {item.desc}
                </p>
                {item.tags && item.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {item.tags.map((tag, tagIdx) => (
                      <span
                        key={tagIdx}
                        className="px-3 py-1 bg-card text-text-secondary text-xs md:text-sm font-medium rounded-full border border-foreground/5"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
              {item.image && (
                <div className="lg:col-span-4 rounded-xl overflow-hidden aspect-16/10 border border-foreground/10">
                  <img
                    alt={item.title}
                    loading="lazy"
                    className="w-full h-full object-cover"
                    src={item.image}
                  />
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export interface ServiceSectionProps {
  title?: string;
  subtitle?: string;
  items?: ServiceItem[];
  defaultOpenIndex?: number;
  className?: string;
  id?: string;
}

export const ServiceSection: React.FC<ServiceSectionProps> = ({
  title,
  subtitle,
  items,
  defaultOpenIndex = 0,
  className = "",
  id = "specialize",
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [openIndex, setOpenIndex] = useState<number | null>(defaultOpenIndex);
  const { lang, t } = useLanguage();

  const sectionTitle = title ?? t("services.title");
  const sectionSubtitle = subtitle ?? t("services.subtitle");

  const defaultItems: ServiceItem[] = [
    {
      number: "01.",
      title: t("services.0.title"),
      desc: t("services.0.desc"),
      tags: [
        "Business Process",
        "Database",
        "Authentication",
        "Dashboard",
        "Role Management",
      ],
      image: "/assets/system-builder.jpeg",
    },
    {
      number: "02.",
      title: t("services.1.title"),
      desc: t("services.1.desc"),
      tags: [
        "React & Tanstack",
        "Full stack",
        "Responsive Design",
        "Performance & SEO",
      ],
      image: "/assets/web-dev.jpeg",
    },
    {
      number: "03.",
      title: t("services.2.title"),
      desc: t("services.2.desc"),
      tags: [
        "Figma",
        "Wireframing",
        "Prototyping",
        "Design System",
        "Responsive Design",
      ],
      image: "/assets/advertising.jpeg",
    },
  ];

  const serviceList = items ?? defaultItems;

  useGSAP(
    () => {
      gsap
        .timeline({
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 60%",
            toggleActions: "play none none none",
          },
        })
        .from(".spec-item", {
          y: 30,
          opacity: 0,
          stagger: 0.1,
          duration: 0.8,
          ease: "power3.out",
        });
    },
    { scope: containerRef }
  );

  return (
    <section
      ref={containerRef}
      id={id}
      className={`py-12 lg:py-20 px-4 md:px-12 lg:px-36 xl:px-48 2xl:container mx-auto overflow-x-hidden select-none ${className}`}
    >
      <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-8 md:mb-12 lg:mb-20">
        <TextTitle className="mb-2 lg:mb-0 max-w-xl">
          {sectionTitle}
        </TextTitle>
        <TextDesc className="lg:w-[32%] lg:text-right">
          {sectionSubtitle}
        </TextDesc>
      </div>

      <div className="flex flex-col">
        {serviceList.map((item, idx) => (
          <ItemService
            key={idx}
            index={idx}
            item={item}
            isOpen={openIndex === idx}
            onToggle={() => setOpenIndex(openIndex === idx ? null : idx)}
          />
        ))}
      </div>
    </section>
  );
};
