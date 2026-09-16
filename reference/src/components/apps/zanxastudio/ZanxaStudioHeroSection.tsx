import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { SplitWords } from "../../common/SplitWords";
import { Button } from "../../ui/button";
import { Badge } from "../../ui/badge";
import { useLanguage } from "../../../context/LanguageContext";
import { home as zanxaHome } from "../../../locales/zanxastudio/home";

gsap.registerPlugin(ScrollTrigger);

interface ZanxaStudioHeroSectionProps {
  onNavigate?: (path: string) => void;
}

export const ZanxaStudioHeroSection: React.FC<ZanxaStudioHeroSectionProps> = ({
  onNavigate,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { lang } = useLanguage();
  const content = zanxaHome[lang];

  useGSAP(
    () => {
      const tl = gsap.timeline();

      // Entrance animation matching Yobss & HeroSection.tsx
      tl.from(".hero-badge", {
        y: 20,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
      });

      tl.from(
        ".hero-title .word",
        {
          y: 60,
          opacity: 0,
          filter: "blur(15px)",
          duration: 1.2,
          stagger: 0.08,
          ease: "power4.out",
        },
        "-=0.5"
      );

      tl.from(
        ".hero-subtitle .word",
        {
          x: -30,
          opacity: 0,
          filter: "blur(6px)",
          duration: 1,
          stagger: 0.03,
          ease: "power3.out",
        },
        "-=0.8"
      );

      tl.from(
        ".hero-btns",
        {
          y: 20,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out",
        },
        "-=0.6"
      );

      // Match media for phone, avatar, and floating image particles
      const mm = gsap.matchMedia();
      mm.add(
        {
          isMobile: "(max-width: 767px)",
          isDesktop: "(min-width: 768px)",
        },
        (context) => {
          const { isMobile } = context.conditions as { isMobile: boolean };

          gsap
            .timeline({
              scrollTrigger: {
                trigger: ".hero-images",
                start: "top 85%",
                toggleActions: "play none none none",
              },
            })
            .from(".hero-phone", {
              y: 100,
              opacity: 0,
              duration: 1.2,
              ease: "power4.out",
            })
            .from(
              ".hero-avatar",
              {
                y: 80,
                opacity: 0,
                filter: "blur(15px)",
                duration: 1.2,
                ease: "power4.out",
              },
              "-=0.5"
            )
            .from(
              ".hero-particles",
              {
                scale: 0.5,
                opacity: 0,
                filter: "blur(10px)",
                duration: 1,
                stagger: isMobile ? 0.08 : 0.15,
                ease: "back.out(1.5)",
              },
              "-=0.8"
            );
        }
      );

      // Continuous floating physics on tech particles
      gsap.to(".hero-particles", {
        y: -10,
        rotation: "+=2",
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        stagger: 0.3,
      });

      // Subtle parallax response to mouse movement
      const handleMouseMove = (e: MouseEvent) => {
        const { clientX, clientY } = e;
        const xPos = (clientX / window.innerWidth - 0.5) * 20;
        const yPos = (clientY / window.innerHeight - 0.5) * 20;

        gsap.to(".hero-avatar", {
          x: xPos * 0.8,
          y: yPos * 0.8,
          duration: 1,
          ease: "power2.out",
        });

        gsap.to(".hero-phone", {
          x: -xPos * 0.5,
          y: -yPos * 0.5,
          duration: 1.2,
          ease: "power2.out",
        });

        gsap.to(".hero-particles", {
          x: xPos * 1.2,
          y: yPos * 1.2,
          duration: 0.8,
          ease: "power1.out",
        });
      };

      window.addEventListener("mousemove", handleMouseMove);
      return () => window.removeEventListener("mousemove", handleMouseMove);
    },
    { scope: containerRef, dependencies: [lang] }
  );

  const handleCtaClick = (e: React.MouseEvent, path: string) => {
    e.preventDefault();
    if (onNavigate) {
      onNavigate(path);
    } else {
      window.location.href = path;
    }
  };

  // Split title words for animation
  const titleWords = content.hero.title.split(" ");

  return (
    <section
      ref={containerRef}
      id="hero"
      className="px-4 pt-6 md:pt-8 min-h-[115vh] max-h-[128vh] md:max-h-[132vh] lg:max-h-[178vh] 2xl:max-h-[145vh] 2xl:container mx-auto relative overflow-hidden select-none isolate"
    >
      <div className="flex flex-col items-center relative z-10">
        {/* Badge: «website dalam pengembangan» with red background and white dot */}
        <Badge
          type="header"
          className="hero-badge !bg-red-600 !border-red-600 shadow-sm"
          textClassName="!text-white font-medium"
          label={content.hero.badge}
          dotClassName="!bg-white shadow-[0_0_8px_rgba(255,255,255,0.85)]"
        />

        {/* Heading & Description */}
        <div className="mt-6 md:mt-8 flex flex-col items-center text-center">
          <h1 className="hero-title font-semibold text-[32px] leading-[1.2] md:text-6xl md:leading-[1.3] mb-4 md:mb-6 max-w-4xl">
            {titleWords.map((word, idx) => (
              <React.Fragment key={idx}>
                <span className="inline-block pb-1">
                  <span className="word inline-block">{word}&nbsp;</span>
                </span>
                {idx === Math.floor(titleWords.length / 2) && (
                  <br className="hidden lg:block" />
                )}
              </React.Fragment>
            ))}
          </h1>

          <h2 className="hero-subtitle font-medium w-[90%] md:w-[54%] md:text-xl text-text-secondary">
            <SplitWords text={content.hero.description} />
          </h2>
        </div>

        {/* Action Buttons: Primary CTA (Blue Gradient #516cff - #89bcf7) & Secondary CTA */}
        <div className="hero-btns mt-8 md:mt-16 flex items-center gap-3">
          {/* Primary CTA: Let's Talk! with Blue Gradient #516cff - #89bcf7 */}
          <Button
            id="zanxa-primary-cta"
            variant="primary"
            scrollText
            href="/#contact"
            onClick={(e) => handleCtaClick(e, "/#contact")}
            className="!bg-gradient-to-r !from-[#516cff] !to-[#89bcf7] hover:opacity-95 shadow-md text-white border-0 font-medium"
          >
            {content.hero.ctaPrimary}
          </Button>

          {/* Secondary CTA: View our Work with Portfolio Gray styling */}
          <Button
            id="zanxa-secondary-cta"
            variant="secondary"
            scrollText
            href="/projects"
            onClick={(e) => handleCtaClick(e, "/projects")}
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
            {content.hero.ctaSecondary}
          </Button>
        </div>
      </div>

      {/* Visual Composition matching HeroSection.tsx (Phone, Avatar, and floating particles) */}
      <div className="hero-images flex flex-col items-center mt-20 lg:mt-12 scale-82 md:scale-86 lg:scale-72 relative">
        <img
          alt="phone"
          width="600"
          height="1000"
          className="hero-phone w-auto h-auto -z-2 pointer-events-none"
          src="/assets/phone.png"
        />
        <img
          alt="avatar"
          width="910"
          height="1000"
          className="hero-avatar absolute inset-0 object-contain scale-150 md:scale-112 lg:scale-100 ml-16 md:ml-24 lg:ml-84 2xl:ml-96 translate-y-6 lg:-translate-y-30 pointer-events-none"
          src="/avatar/main.webp"
        />

        {/* Floating tech particles matching HeroSection.tsx */}
        <img
          alt="nextjs"
          width="230"
          height="200"
          className="hero-particles absolute inset-0 -top-20 lg:top-0 -left-26 md:left-0 object-contain lg:ml-68 translate-y-2 drop-shadow-lg scale-65 md:scale-80 lg:scale-100"
          src="/logos/nextjs.png"
        />
        <img
          alt="laravel"
          width="160"
          height="160"
          className="hero-particles absolute inset-0 object-contain rotate-30 -left-24 lg:left-0 md:ml-32 lg:ml-52 top-28 md:top-36 lg:top-64 drop-shadow-lg scale-65 md:scale-96 lg:scale-100"
          src="/logos/laravel.png"
        />
        <img
          alt="wordpress"
          width="200"
          height="200"
          className="hero-particles absolute inset-0 object-contain -rotate-20 -left-18 lg:left-0 lg:ml-64 top-58 md:top-68 lg:top-120 scale-65 lg:scale-100 drop-shadow-lg"
          src="/logos/wordpress.png"
        />
        <img
          alt="ads"
          width="400"
          height="200"
          className="hero-particles absolute inset-0 left-auto -right-40 md:-right-20 lg:right-0 object-contain -top-6 md:top-0 lg:mr-30 drop-shadow-lg -z-1 scale-60 md:scale-80 lg:scale-100"
          src="/assets/ads.png"
        />
        <img
          alt="github-activity"
          width="580"
          height="800"
          className="hero-particles absolute inset-0 left-auto -right-24 top-auto object-contain lg:mr-32 bottom-6 md:bottom-24 lg:bottom-64 -z-1 drop-shadow-lg"
          src="/assets/github-activity.png"
        />
      </div>

      {/* Atmospheric glow particles matching portfolio */}
      <img
        alt=""
        width="900"
        height="900"
        className="hero-bg-particle absolute -right-48 lg:-right-96 bottom-48 lg:bottom-12 z-0 pointer-events-none opacity-40 md:opacity-80"
        src="/particle/purple.png"
      />
      <img
        alt=""
        width="900"
        height="900"
        className="hero-bg-particle absolute -left-48 lg:-left-96 -bottom-32 lg:-bottom-72 z-0 pointer-events-none opacity-40 md:opacity-80"
        src="/particle/blue.png"
      />
    </section>
  );
};
