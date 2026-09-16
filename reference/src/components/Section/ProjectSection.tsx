import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Project } from "../../types";
import { useLanguage } from "../../context/LanguageContext";
import { Badge } from "../ui/badge";
import { TextTitle, TextDesc } from "../ui/Text";

gsap.registerPlugin(ScrollTrigger);

export interface ItemProjectProps {
  project: Project;
  onNavigate: (path: string) => void;
  className?: string;
}

export const ItemProject: React.FC<ItemProjectProps> = ({
  project,
  onNavigate,
  className = "",
}) => {
  const { lang } = useLanguage();
  const cardRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.from(cardRef.current, {
        scrollTrigger: {
          trigger: cardRef.current,
          start: "top 80%",
          toggleActions: "play none none none",
        },
        y: 50,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
      });
    },
    { scope: cardRef }
  );

  const title = (lang === "id" ? project.title_id : project.title_en) || project.title;
  const category = (lang === "id" ? project.category_id : project.category_en) || project.category;

  let displayDate = project.uploadedDate || "";
  if (/^\d{4}-\d{2}-\d{2}$/.test(displayDate)) {
    const [year, month, day] = displayDate.split("-").map(Number);
    const dateObj = new Date(year, month - 1, day);
    displayDate = dateObj.toLocaleDateString(lang === "id" ? "id-ID" : "en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  }

  const primaryImg =
    project.images[0] ||
    "/projects/Yobss - Your Business System/cover.jpg";
  const hoverImg =
    project.images[1] ||
    project.images[0] ||
    "/projects/Yobss - Your Business System/cover.jpg";

  return (
    <div ref={cardRef} className={`project-card-wrapper ${className}`}>
      <a
        href={`/projects/${project.slug}`}
        onClick={(e) => {
          e.preventDefault();
          onNavigate(`/projects/${project.slug}`);
        }}
        className="block"
      >
        <div className="flex flex-col gap-4 group cursor-pointer">
          {/* Card Media with dual-image vertical slide on hover */}
          <div className="w-full aspect-video overflow-hidden rounded-xl relative bg-white">
            <div
              data-cursor="view"
              className="flex flex-col h-full transition-transform duration-500 ease-in-out group-hover:-translate-y-full"
            >
              <div className="w-full h-full shrink-0">
                <img
                  alt={title}
                  loading="lazy"
                  width="800"
                  height="600"
                  decoding="async"
                  className="w-full h-full object-cover"
                  src={primaryImg}
                />
              </div>
              <div className="w-full h-full shrink-0">
                <img
                  alt={`${title} hover`}
                  loading="lazy"
                  width="800"
                  height="600"
                  decoding="async"
                  className="w-full h-full object-cover"
                  src={hoverImg}
                />
              </div>
            </div>
          </div>

          {/* Card Content */}
          <div>
            <h3 className="text-xl md:text-lg lg:text-2xl font-medium mb-3 px-2 group-hover:text-primary transition-colors duration-300 line-clamp-1">
              {title}
            </h3>
            <div className="flex items-center gap-4">
              <Badge
                type="category"
                label={category}
              />
              <div className="text-text-secondary flex items-center gap-2 text-sm">
                <svg
                  stroke="currentColor"
                  fill="currentColor"
                  strokeWidth="0"
                  viewBox="0 0 448 512"
                  height="1em"
                  width="1em"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M128 0c17.7 0 32 14.3 32 32l0 32 128 0 0-32c0-17.7 14.3-32 32-32s32 14.3 32 32l0 32 48 0c26.5 0 48 21.5 48 48l0 48L0 160l0-48C0 85.5 21.5 64 48 64l48 0 0-32c0-17.7 14.3-32 32-32zM0 192l448 0 0 272c0 26.5-21.5 48-48 48L48 512c-26.5 0-48-21.5-48-48L0 192zm64 80l0 32c0 8.8 7.2 16 16 16l32 0c8.8 0 16-7.2 16-16l0-32c0-8.8-7.2-16-16-16l-32 0c-8.8 0-16 7.2-16 16zm128 0l0 32c0 8.8 7.2 16 16 16l32 0c8.8 0 16-7.2 16-16l0-32c0-8.8-7.2-16-16-16l-32 0c-8.8 0-16 7.2-16 16zm144-16c-8.8 0-16 7.2-16 16l0 32c0 8.8 7.2 16 16 16l32 0c8.8 0 16-7.2 16-16l0-32c0-8.8-7.2-16-16-16l-32 0zM64 400l0 32c0 8.8 7.2 16 16 16l32 0c8.8 0 16-7.2 16-16l0-32c0-8.8-7.2-16-16-16l-32 0c-8.8 0-16 7.2-16 16zm144-16c-8.8 0-16 7.2-16 16l0 32c0 8.8 7.2 16 16 16l32 0c8.8 0 16-7.2 16-16l0-32c0-8.8-7.2-16-16-16l-32 0zm112 16l0 32c0 8.8 7.2 16 16 16l32 0c8.8 0 16-7.2 16-16l0-32c0-8.8-7.2-16-16-16l-32 0c-8.8 0-16 7.2-16 16z"></path>
                </svg>
                <p className="font-medium">{displayDate}</p>
              </div>
            </div>
          </div>
        </div>
      </a>
    </div>
  );
};

export interface ItemProjectPlaceholderProps {
  className?: string;
}

export const ItemProjectPlaceholder: React.FC<ItemProjectPlaceholderProps> = ({
  className = "",
}) => {
  const { t } = useLanguage();

  return (
    <div className={`project-card-wrapper ${className}`}>
      <div className="flex flex-col gap-4 group h-full select-none">
        <div className="w-full aspect-video overflow-hidden rounded-xl relative bg-card border-2 border-dashed border-primary/20 flex flex-col items-center justify-center gap-4 transition-all duration-300 group-hover:border-primary/40">
          <div className="size-16 bg-white rounded-full flex items-center justify-center shadow-sm">
            <div className="size-12 bg-linear-to-br from-primary/20 to-secondary/20 rounded-full animate-pulse"></div>
          </div>
          <div className="flex flex-col items-center gap-1">
            <span className="text-primary font-semibold">Coming Soon</span>
            <span className="text-xs text-text-secondary">
              {t("projects.comingSoonDesc")}
            </span>
          </div>
        </div>
        <div className="px-2">
          <h3 className="text-xl md:text-lg lg:text-2xl font-medium mb-3 text-text-secondary/50">
            {t("projects.comingSoonTitle")}
          </h3>
          <div className="flex items-center gap-3 bg-card/50 rounded-full pl-3 pr-4 py-2 w-fit">
            <div className="size-4 bg-text-secondary/20 rounded-full"></div>
            <strong className="text-sm md:text-xs font-semibold text-text-secondary/40">
              {t("projects.comingSoonBadge")}
            </strong>
          </div>
        </div>
      </div>
    </div>
  );
};

export interface ProjectSectionProps {
  title?: string;
  subtitle?: string;
  items: Project[];
  showPlaceholder?: boolean;
  onNavigate: (path: string) => void;
  className?: string;
  id?: string;
}

export const ProjectSection: React.FC<ProjectSectionProps> = ({
  title,
  subtitle,
  items,
  showPlaceholder = false,
  onNavigate,
  className = "",
  id,
}) => {
  return (
    <section id={id} className={`select-none ${className}`}>
      {(title || subtitle) && (
        <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-8 md:mb-12 lg:mb-20">
          {title && <TextTitle className="mb-2 lg:mb-0 max-w-xl">{title}</TextTitle>}
          {subtitle && <TextDesc className="lg:w-[35%] lg:text-right">{subtitle}</TextDesc>}
        </div>
      )}

      <div className="grid md:grid-cols-2 gap-5 gap-y-12 pb-16 md:pb-24">
        {items.map((project) => (
          <ItemProject
            key={project.id}
            project={project}
            onNavigate={onNavigate}
          />
        ))}
        {showPlaceholder && <ItemProjectPlaceholder />}
      </div>
    </section>
  );
};
