import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Project } from "../../types";
import { useLanguage } from "../../context/LanguageContext";
import { Button } from "../ui/button";
import { TextTitle, TextDesc } from "../ui/Text";

gsap.registerPlugin(ScrollTrigger);

export interface CarouselImageProps {
  title: string;
  subtitle?: string;
  items: Project[];
  onNavigate: (path: string) => void;
  viewAllLabel?: string;
  viewAllHref?: string;
  className?: string;
  id?: string;
}

export const CarouselImage: React.FC<CarouselImageProps> = ({
  title,
  subtitle,
  items,
  onNavigate,
  viewAllLabel,
  viewAllHref = "/projects",
  className = "",
  id = "latestProject",
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { lang } = useLanguage();

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
        .from(".carousel-image-container", {
          y: 80,
          opacity: 0,
          duration: 1.2,
          ease: "power3.out",
        });
    },
    { scope: containerRef }
  );

  // Duplicate items for seamless infinite loop
  const carouselItems = items.length > 0 ? [...items, ...items] : [];

  return (
    <section
      ref={containerRef}
      id={id}
      className={`py-12 lg:py-20 px-4 md:px-12 lg:px-36 xl:px-48 2xl:container mx-auto overflow-x-hidden overflow-y-clip select-none ${className}`}
    >
      {/* Header using TextTitle + TextDesc */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-8 md:mb-12 lg:mb-20">
        <TextTitle className="mb-2 lg:mb-0 max-w-2xl">
          {title}
        </TextTitle>
        {subtitle && (
          <TextDesc className="lg:w-[25%] lg:text-right">
            {subtitle}
          </TextDesc>
        )}
      </div>

      {/* Carousel Container */}
      <div className="carousel-image-container relative flex overflow-visible overflow-x-hidden rounded-xl group">
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
                className="shrink-0 group/card w-72 h-64 md:w-lg md:h-94 p-4 md:p-5 bg-linear-to-r from-primary/10 to-secondary/10 rounded-2xl md:rounded-3xl transition-all duration-500 hover:z-10 cursor-pointer border border-transparent block"
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

      {/* Optional View All Projects Button */}
      {viewAllLabel && (
        <div className="flex justify-center mt-10 md:mt-14">
          <Button
            variant="secondary"
            size="lg"
            shape="rounded-xl"
            scrollText
            iconWrapper="none"
            href={viewAllHref}
            onClick={(e) => {
              e.preventDefault();
              onNavigate(viewAllHref);
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
            {viewAllLabel}
          </Button>
        </div>
      )}
    </section>
  );
};
