import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { SplitWords } from "../common/SplitWords";
import { useLanguage } from "../../context/LanguageContext";

gsap.registerPlugin(ScrollTrigger);

export const SkillsSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { lang, t } = useLanguage();

  useGSAP(
    () => {
      // Header animation
      gsap.from(".why-header", {
        scrollTrigger: {
          trigger: ".why-header",
          start: "top 75%",
          toggleActions: "play none none none",
        },
        y: 40,
        opacity: 0,
        filter: "blur(10px)",
        duration: 1,
        ease: "power3.out",
      });

      // Visual stage (Avatar & Particles)
      gsap
        .timeline({
          scrollTrigger: {
            trigger: ".why-visual",
            start: "top 75%",
            toggleActions: "play none none none",
          },
        })
        .from(".why-avatar", {
          y: 70,
          opacity: 0,
          filter: "blur(12px)",
          duration: 1.2,
          ease: "power4.out",
        })
        .from(
          ".why-particle",
          {
            scale: 0,
            opacity: 0,
            duration: 1,
            stagger: 0.12,
            ease: "back.out(1.7)",
          },
          "-=0.7"
        );

      // 4 Cards animate 1 by 1 as each card enters the viewport
      gsap.utils.toArray<HTMLElement>(".why-card").forEach((card) => {
        const icon = card.querySelector(".why-card-icon");
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: card,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        });

        tl.from(card, {
          y: 40,
          opacity: 0,
          scale: 0.94,
          duration: 0.8,
          ease: "back.out(1.4)",
          clearProps: "transform,opacity",
        });

        if (icon) {
          tl.fromTo(
            icon,
            { scale: 0, opacity: 0, rotation: -15 },
            {
              scale: 1,
              opacity: 1,
              rotation: 0,
              duration: 0.6,
              ease: "back.out(1.7)",
              clearProps: "transform,opacity",
            },
            "-=0.5"
          );
        }
      });
    },
    { scope: containerRef }
  );

  const cards = [
    {
      title: t("why.0.title"),
      desc: t("why.0.desc"),
      icon: (
        <svg
          stroke="currentColor"
          fill="currentColor"
          strokeWidth="0"
          viewBox="0 0 512 512"
          className="text-2xl md:text-3xl"
          height="1em"
          width="1em"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M345.14 480H274a18 18 0 0 1-18-18v-27.71a31.32 31.32 0 0 0-9.71-22.77c-7.78-7.59-19.08-11.8-30.89-11.51-21.36.5-39.4 19.3-39.4 41.06V462a18 18 0 0 1-18 18H87.62A55.62 55.62 0 0 1 32 424.38V354a18 18 0 0 1 18-18h27.71c9.16 0 18.07-3.92 25.09-11a42.06 42.06 0 0 0 12.2-29.92C114.7 273.89 97.26 256 76.91 256H50a18 18 0 0 1-18-18v-70.38A55.62 55.62 0 0 1 87.62 112h55.24a8 8 0 0 0 8-8v-6.48A65.53 65.53 0 0 1 217.54 32c35.49.62 64.36 30.38 64.36 66.33V104a8 8 0 0 0 8 8h55.24A54.86 54.86 0 0 1 400 166.86v55.24a8 8 0 0 0 8 8h5.66c36.58 0 66.34 29 66.34 64.64 0 36.61-29.39 66.4-65.52 66.4H408a8 8 0 0 0-8 8v56A54.86 54.86 0 0 1 345.14 480z"></path>
        </svg>
      ),
    },
    {
      title: t("why.1.title"),
      desc: t("why.1.desc"),
      icon: (
        <svg
          stroke="currentColor"
          fill="currentColor"
          strokeWidth="0"
          viewBox="0 0 512 512"
          className="text-2xl md:text-3xl"
          height="1em"
          width="1em"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M184 0c30.9 0 56 25.1 56 56l0 400c0 30.9-25.1 56-56 56c-28.9 0-52.7-21.9-55.7-50.1c-5.2 1.4-10.7 2.1-16.3 2.1c-35.3 0-64-28.7-64-64c0-7.4 1.3-14.6 3.6-21.2C21.4 367.4 0 338.2 0 304c0-31.9 18.7-59.5 45.8-72.3C37.1 220.8 32 207 32 192c0-30.7 21.6-56.3 50.4-62.6C80.8 123.9 80 118 80 112c0-29.9 20.6-55.1 48.3-62.1C131.3 21.9 155.1 0 184 0zM328 0c28.9 0 52.6 21.9 55.7 49.9c27.8 7 48.3 32.1 48.3 62.1c0 6-.8 11.9-2.4 17.4c28.8 6.2 50.4 31.9 50.4 62.6c0 15-5.1 28.8-13.8 39.7C493.3 244.5 512 272.1 512 304c0 34.2-21.4 63.4-51.6 74.8c2.3 6.6 3.6 13.8 3.6 21.2c0 35.3-28.7 64-64 64c-5.6 0-11.1-.7-16.3-2.1c-3 28.2-26.8 50.1-55.7 50.1c-30.9 0-56-25.1-56-56l0-400c0-30.9 25.1-56 56-56z"></path>
        </svg>
      ),
    },
    {
      title: t("why.2.title"),
      desc: t("why.2.desc"),
      icon: (
        <svg
          stroke="currentColor"
          fill="none"
          strokeWidth="2"
          viewBox="0 0 24 24"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-2xl md:text-3xl"
          height="1em"
          width="1em"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M3 2v6h6"></path>
          <path d="M21 12A9 9 0 0 0 6 5.3L3 8"></path>
          <path d="M21 22v-6h-6"></path>
          <path d="M3 12a9 9 0 0 0 15 6.7l3-2.7"></path>
          <circle cx="12" cy="12" r="1"></circle>
        </svg>
      ),
    },
    {
      title: t("why.3.title"),
      desc: t("why.3.desc"),
      icon: (
        <svg
          stroke="currentColor"
          fill="currentColor"
          strokeWidth="0"
          viewBox="0 0 640 512"
          className="text-2xl md:text-3xl"
          height="1em"
          width="1em"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M96 128a128 128 0 1 1 256 0A128 128 0 1 1 96 128zM0 482.3C0 383.8 79.8 304 178.3 304l91.4 0C368.2 304 448 383.8 448 482.3c0 16.4-13.3 29.7-29.7 29.7L29.7 512C13.3 512 0 498.7 0 482.3zM609.3 512l-137.8 0c5.4-9.4 8.6-20.3 8.6-32l0-8c0-60.7-27.1-115.2-69.8-151.8c2.4-.1 4.7-.2 7.1-.2l61.4 0C567.8 320 640 392.2 640 481.3c0 17-13.8 30.7-30.7 30.7zM432 256c-31 0-59-12.6-79.3-32.9C372.4 196.5 384 163.6 384 128c0-26.8-6.6-52.1-18.3-74.3C384.3 40.1 407.2 32 432 32c61.9 0 112 50.1 112 112s-50.1 112-112 112z"></path>
        </svg>
      ),
    },
  ];

  return (
    <section
      ref={containerRef}
      id="why"
      className="py-12 lg:py-20 px-4 md:px-12 lg:px-36 xl:px-48 2xl:container mx-auto overflow-x-hidden select-none"
    >
      {/* Header */}
      <div className="why-header flex flex-col lg:flex-row lg:items-center justify-between mb-8 md:mb-12 lg:mb-20">
        <h2 className="font-semibold text-3xl md:text-5xl mb-2 lg:mb-0 leading-[1.2]">
          <SplitWords text={t("why.title")} />
        </h2>
        <p className="md:text-lg font-medium text-text-secondary lg:w-[42%] lg:text-right">
          {t("why.subtitle")}
        </p>
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Visual Stage (Left) */}
        <div className="why-visual h-[50vh] lg:h-auto lg:col-span-4 bg-card rounded-xl justify-center p-4">
          <div className="relative h-full rounded-xl bg-linear-to-br from-primary/10 to-secondary/10">
            <img
              alt="Collaboration"
              loading="lazy"
              width="500"
              height="400"
              className="why-avatar absolute inset-0 left-auto top-auto md:min-w-120 lg:min-w-89 max-w-79 2xl:min-w-96 2xl:max-w-96"
              src="/avatar/why.webp"
            />
            <img
              alt="particle"
              loading="lazy"
              width="400"
              height="400"
              className="why-particle absolute inset-0 right-auto -left-8 md:left-34 lg:-left-14 top-26 w-24"
              src="/logos/github.png"
            />
            <img
              alt="particle"
              loading="lazy"
              width="400"
              height="400"
              className="why-particle absolute inset-0 right-auto left-6 md:left-48 lg:-left-5 top-9 md:top-6 w-18"
              src="/logos/postman.png"
            />
            <img
              alt="particle"
              loading="lazy"
              width="400"
              height="400"
              className="why-particle absolute inset-0 right-auto left-12 md:left-64 lg:left-12 -top-6 md:-top-6 w-12 md:w-16"
              src="/logos/notion.png"
            />
          </div>
        </div>

        {/* 4 Cards (Right) */}
        <div className="why-cards lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-5">
          {cards.map((card, idx) => (
            <div
              key={idx}
              className="why-card p-6 md:p-8 bg-card rounded-xl hover:bg-card/70 transition-colors duration-300 flex flex-col justify-between"
            >
              <div className="why-card-icon bg-linear-to-br from-primary to-secondary text-white w-fit p-3.5 rounded-full mb-6 shadow-sm">
                {card.icon}
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2.5 text-text-primary">{card.title}</h3>
                <p className="text-sm md:text-base leading-relaxed text-text-secondary">{card.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

