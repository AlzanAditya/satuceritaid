import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Project } from "../../types";
import { useLanguage } from "../../context/LanguageContext";
import { Button } from "../ui/button";

gsap.registerPlugin(ScrollTrigger);

interface RecentProjectSectionProps {
  project: Project;
  onNavigate: (path: string) => void;
}

export const RecentProjectSection: React.FC<RecentProjectSectionProps> = ({
  project,
  onNavigate,
}) => {
  const { lang, t } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap
        .timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        })
        .from(".recent-title", {
          y: 40,
          opacity: 0,
          filter: "blur(10px)",
          duration: 1.2,
          delay: 1.5,
          ease: "power4.out",
        })
        .from(
          ".recent-desc",
          {
            y: 20,
            opacity: 0,
            duration: 0.8,
            ease: "power3.out",
          },
          "-=0.8"
        )
        .from(
          ".recent-project-card",
          {
            y: 50,
            opacity: 0,
            duration: 1,
            stagger: 0.3,
            ease: "power3.out",
          },
          "-=0.4"
        );
    },
    { scope: sectionRef }
  );

  const title = (lang === "id" ? project.title_id : project.title_en) || project.title;
  const overview = (lang === "id" ? project.overview_id : project.overview_en) || project.overview;
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
    <section
      ref={sectionRef}
      id="recent-projects"
      className="py-12 lg:py-20 px-4 md:px-12 lg:px-36 xl:px-48 2xl:container mx-auto overflow-x-hidden select-none relative z-20 bg-background"
    >
      <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-8 md:mb-12 lg:mb-20">
        <h2 className="recent-title font-semibold text-3xl md:text-5xl mb-2 lg:mb-0 leading-[1.2]">
          {t("projects.recentDeliveredTitle")}
        </h2>
        <p className="recent-desc md:text-lg font-medium text-text-secondary w-[80%] lg:w-[25%] lg:text-right">
          {t("projects.recentDeliveredSubtitle")}
        </p>
      </div>

      <div className="recent-project-card group/project grid lg:grid-cols-12 gap-5 lg:gap-8 rounded-xl">
        {/* Visual Showcase with Vertical Dual-Image Slide */}
        <div
          onClick={() => onNavigate(`/projects/${project.slug}`)}
          className="col-span-6 aspect-video bg-white rounded-xl overflow-hidden relative cursor-pointer"
        >
          <div
            data-cursor="view"
            className="flex flex-col h-full transition-transform duration-500 ease-in-out group-hover/project:-translate-y-full"
          >
            <div className="w-full h-full shrink-0">
              <img
                alt={title}
                width="600"
                height="300"
                decoding="async"
                className="w-full h-full object-cover"
                src={primaryImg}
              />
            </div>
            <div className="w-full h-full shrink-0">
              <img
                alt={`${title} alt`}
                width="600"
                height="300"
                decoding="async"
                className="w-full h-full object-cover"
                src={hoverImg}
              />
            </div>
          </div>
        </div>

        {/* Content & Action Area */}
        <div className="col-span-6 lg:p-2 flex flex-col justify-between gap-8 lg:gap-0">
          <div className="flex flex-col gap-3 md:gap-6">
            <div>
              <h3
                onClick={() => onNavigate(`/projects/${project.slug}`)}
                className="text-xl md:text-3xl font-medium mb-3 md:mb-5 cursor-pointer hover:text-primary transition-colors duration-300"
              >
                {title}
              </h3>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-3 bg-card rounded-full pl-3 pr-4 py-2 w-fit">
                  <div className="size-4 bg-linear-to-br from-primary to-secondary rounded-full"></div>
                  <strong className="text-xs md:text-sm font-semibold">
                    {category}
                  </strong>
                </div>
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
            <p className="text-text-secondary leading-relaxed line-clamp-3">
              {overview}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Button
              variant="secondary"
              scrollText
              href={`/projects/${project.slug}`}
              onClick={(e) => {
                e.preventDefault();
                onNavigate(`/projects/${project.slug}`);
              }}
              iconRight={
                <svg
                  stroke="currentColor"
                  fill="currentColor"
                  strokeWidth="0"
                  viewBox="0 0 448 512"
                  className="text-lg -rotate-45 transition-all duration-300 ease-in-out group-hover:scale-120 group-hover:text-background"
                  height="1em"
                  width="1em"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z"></path>
                </svg>
              }
            >
              {t("projects.detailButton")}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
