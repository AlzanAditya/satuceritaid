import React, { useState, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Button } from "../ui/button";
import { TextTitle, TextDesc } from "../ui/Text";

gsap.registerPlugin(ScrollTrigger);

export interface ServicesButtonConfig {
  perfectCircle?: boolean;
  size?: "sm" | "md" | "lg" | "responsive";
  className?: string;
}

export const DEFAULT_SERVICES_BUTTON_CONFIG: ServicesButtonConfig = {
  perfectCircle: true,
  size: "responsive",
};

export interface AccordionMinimalItem {
  number: string;
  title: string;
  desc: string;
  tags: string[];
  image: string;
}

export interface ItemAccordionMinimalProps {
  index: number;
  item: AccordionMinimalItem;
  isOpen: boolean;
  onToggle: () => void;
  buttonConfig?: ServicesButtonConfig;
}

export const ItemAccordionMinimal: React.FC<ItemAccordionMinimalProps> = ({
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
    <div className="spec-item" ref={itemRef}>
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
            {item.title}
          </h3>
          <div className="col-span-2 md:col-span-1 flex justify-end">
            <Button
              variant="circle-toggle"
              isOpen={isOpen}
              aria-label={isOpen ? "Tutup detail layanan" : "Buka detail layanan"}
              className={`${isCircle ? "aspect-square rounded-full shrink-0" : ""} ${sizeClasses} ${
                buttonConfig?.className || ""
              }`}
            />
          </div>
        </div>

        {/* Accordion Content Row */}
        <div
          ref={contentRef}
          className="overflow-hidden opacity-0"
          style={{ height: 0 }}
        >
          <div className="pt-6 md:pt-10 flex flex-col md:flex-row justify-between gap-6 md:gap-12">
            {/* Left: Description & Tags */}
            <div className="md:w-[60%] flex flex-col justify-between">
              <p className="text-text-secondary md:text-lg leading-relaxed font-medium mb-6">
                {item.desc}
              </p>
              <div className="flex flex-wrap gap-2">
                {item.tags.map((tag, tagIdx) => (
                  <span
                    key={tagIdx}
                    className={`tag-item-${index} bg-white/80 border border-white text-text-primary text-xs md:text-sm font-medium px-3 py-1.5 rounded-full shadow-xs`}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Right: Feature Image */}
            <div className="md:w-[40%] flex justify-end">
              <div className="w-full h-48 md:h-56 relative rounded-xl overflow-hidden bg-card">
                <div
                  ref={curtainRef}
                  className="absolute inset-0 bg-card z-10 pointer-events-none"
                ></div>
                <img
                  ref={imgRef}
                  src={item.image}
                  alt={item.title}
                  loading="lazy"
                  className="w-full h-full object-cover will-change-transform rounded-xl"
                  style={{ transform: "translateY(100%)" }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export interface AccordionMinimalProps {
  title?: string;
  subtitle?: string;
  items: AccordionMinimalItem[];
  buttonConfig?: ServicesButtonConfig;
  className?: string;
  id?: string;
}

export const AccordionMinimal: React.FC<AccordionMinimalProps> = ({
  title,
  subtitle,
  items,
  buttonConfig = DEFAULT_SERVICES_BUTTON_CONFIG,
  className = "",
  id = "specialize",
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section
      ref={containerRef}
      id={id}
      className={`py-12 lg:py-20 px-4 md:px-12 lg:px-36 xl:px-48 2xl:container mx-auto overflow-hidden select-none ${className}`}
    >
      {(title || subtitle) && (
        <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-8 md:mb-12 lg:mb-20">
          {title && <TextTitle className="mb-2 lg:mb-0">{title}</TextTitle>}
          {subtitle && (
            <TextDesc className="lg:w-[35%] lg:text-right">{subtitle}</TextDesc>
          )}
        </div>
      )}

      <div className="flex flex-col">
        {items.map((item, index) => (
          <ItemAccordionMinimal
            key={index}
            index={index}
            item={item}
            isOpen={openIndex === index}
            onToggle={() => toggleAccordion(index)}
            buttonConfig={buttonConfig}
          />
        ))}
      </div>
    </section>
  );
};
