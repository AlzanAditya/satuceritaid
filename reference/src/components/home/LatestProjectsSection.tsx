import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Project } from "../../types";
import { SplitWords } from "../common/SplitWords";
import { useLanguage } from "../../context/LanguageContext";
import { Button } from "../ui/button";

gsap.registerPlugin(ScrollTrigger);

interface LatestProjectsSectionProps {
  projects: Project[];
  onNavigate: (path: string) => void;
}

export const LatestProjectsSection: React.FC<LatestProjectsSectionProps> = ({
  projects,
  onNavigate,
}) => {
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
        .from(".project-title", {
          y: 30,
          opacity: 0,
          filter: "blur(10px)",
          duration: 1,
          ease: "power3.out",
        })
        .from(
          ".project-desc",
          {
            y: 20,
            opacity: 0,
            duration: 0.8,
            ease: "power3.out",
          },
          "-=0.6"
        )
        .from(
          ".project-carousel-container",
          {
            y: 80,
            opacity: 0,
            duration: 1.2,
            ease: "power3.out",
          },
          "-=0.4"
        );
    },
    { scope: containerRef }
  );

  // Repeat projects for seamless infinite horizontal carousel scroll
  const carouselItems = [...projects, ...projects];

  return (
    <section
      ref={containerRef}
      id="latestProject"
      className="py-12 lg:py-20 overflow-x-hidden overflow-y-clip select-none"
    >
      {/* Header */}
      <div className="px-4 md:px-12 lg:px-36 xl:px-48 2xl:container mx-auto flex flex-col lg:flex-row lg:items-center justify-between mb-8 md:mb-12 lg:mb-20">
        <h2 className="project-title font-semibold text-3xl md:text-5xl mb-2 lg:mb-0 leading-[1.2]">
          <SplitWords text={t("latestProjects.title")} />
        </h2>
        <p className="project-desc md:text-lg font-medium text-text-secondary lg:w-[20%] lg:text-right">
          {t("latestProjects.subtitle")}
        </p>
      </div>

      {/* Carousel Container */}
      <div className="project-carousel-container relative flex overflow-visible overflow-x-hidden rounded-xl md:rounded-none px-4 md:px-0 group">
        <div className="flex gap-4 md:gap-6 animate-carousel hover:[animation-play-state:paused] py-4">
          {carouselItems.map((project, idx) => {
            const projectTitle =
              lang === "id" && project.title_id ? project.title_id : project.title_en || project.title;
            const projectCategory =
              lang === "id" && project.category_id ? project.category_id : project.category_en || project.category;

            return (
              <a
                key={`${project.id}-${idx}`}
                data-cursor="view"
                className="shrink-0 group/card w-72 sm:w-84 md:w-[500px] lg:w-[560px] aspect-video p-3 md:p-4 bg-linear-to-r from-primary/10 to-secondary/10 rounded-2xl md:rounded-3xl transition-all duration-500 hover:z-10 cursor-pointer border border-transparent block"
                href={`/projects/${project.slug}`}
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate(`/projects/${project.slug}`);
                }}
              >
                <div className="relative w-full h-full overflow-hidden rounded-xl md:rounded-2xl">
                  <img
                    alt={projectTitle}
                    loading="lazy"
                    width="600"
                    height="600"
                    className="rounded-xl group-hover/card:brightness-60 md:rounded-2xl object-cover group-hover/card:scale-95 transition ease-in-out duration-500 w-full h-full shadow-lg"
                    src={
                      project.images[0] ||
                      "/projects/Yobss - Your Business System/cover.jpg"
                    }
                  />
                  <div className="absolute inset-0 flex flex-col justify-end p-6 opacity-0 group-hover/card:opacity-100 transition-opacity duration-300 pointer-events-none bg-gradient-to-t from-black/80 via-black/20 to-transparent rounded-xl md:rounded-2xl">
                    <span className="text-white/80 text-xs font-medium uppercase tracking-wider">
                      {projectCategory}
                    </span>
                    <h4 className="text-white text-lg md:text-xl font-semibold mt-1">
                      {projectTitle}
                    </h4>
                  </div>
                </div>
              </a>
            );
          })}
        </div>
      </div>

      {/* View All Projects Button */}
      <div className="px-4 md:px-12 lg:px-36 xl:px-48 2xl:container mx-auto flex justify-center mt-10 md:mt-14">
        <Button
          variant="secondary"
          size="lg"
          shape="rounded-xl"
          scrollText
          iconWrapper="none"
          href="/projects"
          onClick={(e) => {
            e.preventDefault();
            onNavigate("/projects");
          }}
          iconRight={
            <svg
              stroke="currentColor"
              fill="currentColor"
              strokeWidth="0"
              viewBox="0 0 448 512"
              className="text-base -rotate-45 transition-transform duration-300 group-hover:scale-120"
              height="1em"
              width="1em"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z"></path>
            </svg>
          }
        >
          {t("latestProjects.viewAll")}
        </Button>
      </div>
    </section>
  );
};

