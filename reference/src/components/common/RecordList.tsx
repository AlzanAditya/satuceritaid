import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Button } from "../ui/button";

export interface RecordItem {
  period: string;
  title?: string;
  subtitle?: string;
  role?: string;
  company?: string;
  school?: string;
  major?: string;
  description?: string;
  detail?: string;
}

export interface RecordCardProps {
  item: RecordItem;
  type?: "accordion" | "card";
  expandable?: boolean;
  isOpen?: boolean;
  onToggle?: () => void;
  className?: string;
  itemClassName?: string;
}

export const RecordCard: React.FC<RecordCardProps> = ({
  item,
  type,
  expandable = false,
  isOpen = false,
  onToggle,
  className = "",
  itemClassName = "",
}) => {
  const isAccordion = type === "accordion" || expandable;
  const displayTitle = item.title || item.company || item.school || "";
  const displaySubtitle = item.subtitle || item.role || item.major || "";
  const displayDescription = item.description || item.detail || "";

  if (isAccordion) {
    const baseItemClass = itemClassName || "work-exp-item";
    return (
      <div className={`${baseItemClass} ${className}`.trim()}>
        <div
          data-cursor="Read"
          onClick={onToggle}
          className="bg-white cursor-pointer flex flex-col group btn-hover transition duration-400 ease-in-out p-5 rounded-xl hover:bg-foreground"
        >
          <div className="flex items-center justify-between">
            <div className="flex flex-col gap-2">
              <p className="font-medium text-text-secondary text-sm md:text-base">
                {item.period}
              </p>
              <div className="flex flex-col md:flex-row md:items-center md:gap-3">
                <h4 className="text-lg md:text-xl font-medium text-text-primary">
                  {displayTitle}
                </h4>
                {displaySubtitle && (
                  <>
                    <p className="text-xl hidden md:block text-text-secondary">•</p>
                    <strong className="text-base md:text-lg text-text-secondary font-medium">
                      {displaySubtitle}
                    </strong>
                  </>
                )}
              </div>
            </div>
            <Button
              variant="circle-toggle"
              isOpen={isOpen}
              className="size-9 md:size-10 flex items-center justify-center shrink-0"
              aria-label={isOpen ? "Collapse details" : "Expand details"}
            >
              <svg
                stroke="currentColor"
                fill="currentColor"
                strokeWidth="0"
                viewBox="0 0 448 512"
                className={`transition-all duration-300 ease-in-out group-hover:scale-125 ${
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

          <AnimatePresence initial={false}>
            {isOpen && displayDescription && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="overflow-hidden"
              >
                <div className="pt-4">
                  <p className="text-text-secondary text-sm md:text-base font-medium border-foreground leading-relaxed">
                    {displayDescription}
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`bg-white p-5 rounded-xl transition-colors duration-300 group ${itemClassName} ${className}`.trim()}
    >
      <p className="font-medium text-text-secondary text-sm md:text-base mb-3">
        {item.period}
      </p>
      <div className="flex flex-col gap-1">
        <h4 className="text-lg font-medium text-text-primary transition-colors duration-300">
          {displayTitle}
        </h4>
        {displaySubtitle && (
          <p className="text-sm font-medium text-text-secondary">
            {displaySubtitle}
          </p>
        )}
        {displayDescription && (
          <p className="text-sm text-text-secondary mt-2 leading-relaxed">
            {displayDescription}
          </p>
        )}
      </div>
    </div>
  );
};

export interface RecordListProps {
  title?: string;
  items?: RecordItem[];
  type?: "accordion" | "card";
  expandable?: boolean;
  layout?: "stack" | "grid";
  columns?: 1 | 2;
  asContainer?: boolean;
  className?: string;
  itemClassName?: string;
  initialOpenIndex?: number | null;
}

export const RecordList: React.FC<RecordListProps> = ({
  title,
  items = [],
  type = "card",
  expandable,
  layout = "stack",
  columns,
  asContainer,
  className = "",
  itemClassName = "",
  initialOpenIndex = 0,
}) => {
  const isAccordion = type === "accordion" || expandable === true;
  const [openIndex, setOpenIndex] = useState<number | null>(
    isAccordion ? initialOpenIndex : null
  );

  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
    setTimeout(() => {
      try {
        ScrollTrigger.refresh();
      } catch (e) {
        // ignore if not running in DOM
      }
    }, 380);
  };

  const isGrid = layout === "grid" || columns === 2;
  const listClass = isGrid
    ? "grid sm:grid-cols-2 gap-3"
    : "flex flex-col gap-3";

  // Wrap in outer bg-card container ONLY if explicitly requested OR if title is provided
  const shouldWrapContainer = asContainer ?? Boolean(title);

  const content = (
    <div className={`${listClass} ${shouldWrapContainer ? "" : className}`}>
      {items.map((item, idx) => (
        <RecordCard
          key={idx}
          item={item}
          type={type}
          itemClassName={itemClassName}
          expandable={isAccordion}
          isOpen={openIndex === idx}
          onToggle={() => handleToggle(idx)}
        />
      ))}
    </div>
  );

  if (!shouldWrapContainer) {
    return content;
  }

  return (
    <div className={`p-4 py-5 md:p-5 bg-card rounded-xl h-full ${className}`}>
      {title && (
        <h3 className="text-2xl font-medium mb-6 md:mb-8 text-text-primary">
          {title}
        </h3>
      )}
      {content}
    </div>
  );
};
