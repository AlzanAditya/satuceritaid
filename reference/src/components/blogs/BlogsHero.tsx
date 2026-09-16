import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { SplitWords } from "../common/SplitWords";
import { useLanguage } from "../../context/LanguageContext";

interface BlogsHeroProps {
  onComplete?: () => void;
}

export const BlogsHero: React.FC<BlogsHeroProps> = ({ onComplete }) => {
  const { t } = useLanguage();
  const heroRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap
        .timeline()
        .from(".hero-badge", {
          y: 20,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out",
        })
        .from(
          ".hero-title .word",
          {
            y: 40,
            opacity: 0,
            filter: "blur(10px)",
            duration: 1.2,
            stagger: 0.1,
            ease: "power4.out",
          },
          "-=0.6"
        )
        .from(
          ".hero-subtitle",
          {
            y: 20,
            opacity: 0,
            duration: 0.8,
            ease: "power3.out",
          },
          "-=0.8"
        )
        .call(
          () => {
            if (onComplete) onComplete();
          },
          undefined,
          "-=0.3"
        )
        .from(
          ".hero-bg-particle",
          {
            scale: 0.8,
            opacity: 0,
            duration: 1.5,
            stagger: 0.2,
            ease: "power2.out",
          },
          "-=1.2"
        );
    },
    { scope: heroRef }
  );

  return (
    <section
      ref={heroRef}
      className="px-4 pt-6 md:pt-8 2xl:container mx-auto relative z-10 min-h-[40vh] md:min-h-[45vh] 2xl:min-h-[40vh] overflow-visible select-none"
    >
      <div className="flex flex-col items-center gap-8 md:gap-12 relative z-10">
        <div className="flex flex-col items-center">
          {/* Hero Badge */}
          <div className="hero-badge flex items-center gap-3 px-4 py-2 border border-text-secondary/30 w-fit rounded-full">
            <span className="size-3 bg-primary rounded-full animate-pulse"></span>
            <strong className="font-medium text-sm md:text-lg">
              {t("blogsHero.badge")}
            </strong>
          </div>

          {/* Hero Title and Subtitle */}
          <div className="mt-6 md:mt-8 flex flex-col items-center text-center">
            <h1 className="hero-title font-semibold text-[32px] leading-[1.2] md:text-6xl md:leading-[1.3] mb-2 md:mb-6">
              <SplitWords text={t("blogsHero.title")} />
            </h1>
            <h2 className="hero-subtitle font-medium lg:w-[60%] md:text-xl text-text-secondary">
              {t("blogsHero.subtitle")}
            </h2>
          </div>
        </div>
      </div>

      {/* Hero Ambient Background Particles */}
      <img
        alt=""
        width="900"
        height="900"
        decoding="async"
        className="hero-bg-particle absolute -right-48 lg:-right-96 -bottom-32 lg:-bottom-72 z-0 pointer-events-none select-none opacity-50 md:opacity-90"
        src="/particle/purple.png"
      />
      <img
        alt=""
        width="900"
        height="900"
        decoding="async"
        className="hero-bg-particle absolute -left-48 lg:-left-96 -bottom-32 lg:-bottom-72 z-0 pointer-events-none select-none opacity-50 md:opacity-90"
        src="/particle/blue.png"
      />
    </section>
  );
};
