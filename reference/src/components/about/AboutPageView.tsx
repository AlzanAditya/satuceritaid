import React, { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { motion, AnimatePresence } from "motion/react";
import { SplitWords } from "../common/SplitWords";
import { TextMarquee } from "../common/TextMarquee";
import { useLanguage } from "../../context/LanguageContext";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { TextTitle, TextDesc } from "../ui/Text";
import { RecordList } from "../common/RecordList";
import { SocialGrid } from "../Section/ContactSection";

gsap.registerPlugin(ScrollTrigger);

interface AboutPageViewProps {
  onNavigate: (path: string) => void;
}

export const AboutPageView: React.FC<AboutPageViewProps> = ({ onNavigate }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const leftSliderRef = useRef<HTMLDivElement>(null);
  const rightSliderRef = useRef<HTMLDivElement>(null);
  const galleryRef = useRef<HTMLDivElement>(null);
  const [openWorkExp, setOpenWorkExp] = useState<number | null>(0);
  const { lang, t } = useLanguage();

  const galleryList = [
    "/gallery/gallery-1.jpeg",
    "/gallery/gallery-2.jpeg",
    "/gallery/gallery-3.jpeg",
    "/gallery/gallery-4.jpeg",
    "/gallery/gallery-5.jpeg",
  ];

  const heroProjectList = [
    "/projects/Yobss - Your Business System/cover.jpg",
    "/projects/Satu Cerita - Digital Invitation Platform/cover.jpg",
    "/projects/Zanxa Studio - Web Development Studio/cover.jpg",
  ];
  const loopHeroProjects = [...heroProjectList, heroProjectList[0]];

  const techIcons = [
    "/icons/react.png",
    "/icons/nextjs.png",
    "/icons/vitejs.png",
    "/icons/tailwind.png",
    "/icons/shadcn-ui.png",
    "/icons/tanstack.png",
    "/icons/supabase.png",
  ];

  const toolIcons = [
    "/icons/github.png",
    "/icons/vercel.png",
    "/icons/cloudflare.png",
    "/icons/aistudio-google.png",
    "/icons/chatgpt.png",
    "/icons/claude.png",
    "/icons/antigravity.png",
  ];

  // GSAP Right Slider (reverse slide up loop)
  useGSAP(
    () => {
      const inner = rightSliderRef.current?.querySelector(".web-slider-inner");
      const items = rightSliderRef.current?.querySelectorAll(".web-image");
      if (inner && items && items.length > 1) {
        const count = items.length;
        gsap.set(inner, { yPercent: -100 * (count - 1) });
        const tl = gsap.timeline({
          repeat: -1,
          defaults: { ease: "power4.inOut", duration: 0.8 },
        });
        for (let l = count - 2; l >= 0; l--) {
          tl.to(inner, { yPercent: -100 * l, delay: 2 });
        }
        tl.set(inner, { yPercent: -100 * (count - 1) });
      }
    },
    { scope: rightSliderRef }
  );

  // GSAP Left Slider (slide up forwards loop)
  useGSAP(
    () => {
      const inner = leftSliderRef.current?.querySelector(".web-slider-inner");
      const items = leftSliderRef.current?.querySelectorAll(".web-image");
      if (inner && items && items.length > 1) {
        const count = items.length;
        const tl = gsap.timeline({
          repeat: -1,
          defaults: { ease: "power4.inOut", duration: 0.8 },
        });
        for (let l = 1; l < count; l++) {
          tl.to(inner, { yPercent: -100 * l, delay: 2.2 });
        }
        tl.set(inner, { yPercent: 0 });
      }
    },
    { scope: leftSliderRef }
  );

  // GSAP Gallery Carousel (horizontal loop)
  useGSAP(
    () => {
      const inner = galleryRef.current?.querySelector(".image-slider-inner");
      if (inner) {
        const tl = gsap.timeline({
          repeat: -1,
          defaults: { ease: "power4.inOut", duration: 0.8 },
        });
        for (let t = 1; t < galleryList.length; t++) {
          tl.to(inner, { xPercent: -100 * t, delay: 3 });
        }
        tl.set(inner, { xPercent: 0 });
      }
    },
    { scope: galleryRef }
  );

  useGSAP(
    () => {
      // Hero entrance
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
          ".hero-phone",
          {
            scale: 0.9,
            opacity: 0,
            filter: "blur(10px)",
            duration: 1,
            ease: "power3.out",
          },
          "-=0.8"
        )
        .from(
          ".hero-avatar",
          {
            y: 60,
            opacity: 0,
            filter: "blur(10px)",
            duration: 1.2,
            ease: "power3.out",
          },
          "-=0.4"
        );

      // Hero sliding windows
      gsap.from(".slider-window", {
        scrollTrigger: {
          trigger: ".hero-images",
          start: "top 70%",
          toggleActions: "play none none none",
        },
        scale: 0.8,
        delay: 0.6,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: "back.out(1.7)",
      });

      const mm = gsap.matchMedia();
      mm.add(
        {
          isMobile: "(max-width: 1023px)",
          isDesktop: "(min-width: 1024px)",
        },
        (context) => {
          const { isDesktop } = context.conditions as { isDesktop: boolean };

          // Section 1: About Me story (#about)
          gsap
            .timeline({
              scrollTrigger: {
                trigger: "#about",
                start: isDesktop ? "top 70%" : "top 60%",
                toggleActions: "play none none none",
              },
            })
            .from(".about-title .word", {
              y: 40,
              opacity: 0,
              filter: "blur(10px)",
              duration: 1.2,
              stagger: 0.1,
              ease: "power4.out",
            })
            .from(
              ".about-content p",
              {
                y: 30,
                opacity: 0,
                filter: "blur(5px)",
                duration: 0.8,
                stagger: 0.2,
                ease: "power3.out",
              },
              "-=0.6"
            )
            .from(
              ".about-btns",
              {
                y: 20,
                opacity: 0,
                duration: 0.8,
                ease: "power3.out",
              },
              "-=0.4"
            )
            .from(
              ".about-image-wrapper",
              {
                y: 50,
                opacity: 0,
                duration: 1,
                ease: "power3.out",
              },
              "-=0.4"
            )
            .to(
              ".about-image-curtain",
              {
                yPercent: -100,
                duration: 1.2,
                ease: "power4.inOut",
              },
              "-=0.2"
            )
            .from(
              ".about-image",
              {
                yPercent: 100,
                duration: 1.2,
                ease: "power4.inOut",
              },
              "<"
            );

          // Section 2: Background in Tech (#background)
          gsap
            .timeline({
              scrollTrigger: {
                trigger: "#background",
                start: "top 70%",
                toggleActions: "play none none none",
              },
            })
            .from(".bg-title", {
              y: 40,
              opacity: 0,
              filter: "blur(10px)",
              duration: 1.2,
              ease: "power4.out",
            })
            .from(
              ".bg-desc",
              {
                y: 20,
                opacity: 0,
                duration: 0.8,
                ease: "power3.out",
              },
              "-=0.8"
            )
            .fromTo(
              ".work-exp-item",
              { y: 30, opacity: 0 },
              {
                y: 0,
                opacity: 1,
                duration: 0.6,
                stagger: 0.1,
                ease: "power3.out",
                clearProps: "all",
              },
              "-=0.4"
            )
            .fromTo(
              ".achievement-item",
              { y: 30, opacity: 0 },
              {
                y: 0,
                opacity: 1,
                duration: 0.6,
                stagger: 0.1,
                ease: "power3.out",
                clearProps: "all",
              },
              "-=0.4"
            )
            .fromTo(
              ".edu-item",
              { y: 30, opacity: 0 },
              {
                y: 0,
                opacity: 1,
                duration: 0.6,
                stagger: 0.1,
                ease: "power3.out",
                clearProps: "all",
              },
              "-=0.4"
            );

          // Section 3: Say Hello
          gsap
            .timeline({
              scrollTrigger: {
                trigger: "#socialMedia",
                start: "top 70%",
                toggleActions: "play none none none",
              },
            })
            .from(".social-title", {
              y: 30,
              opacity: 0,
              filter: "blur(10px)",
              duration: 1,
              ease: "power3.out",
            })
            .from(
              ".social-desc",
              {
                y: 20,
                opacity: 0,
                duration: 0.8,
                ease: "power3.out",
              },
              "-=0.6"
            )
            .from(
              ".social-item",
              {
                y: 40,
                opacity: 0,
                duration: 0.8,
                stagger: 0.1,
                ease: "power3.out",
              },
              "-=0.4"
            );
        }
      );
    },
    { scope: containerRef, dependencies: [lang] }
  );

  return (
    <div ref={containerRef} className="min-h-screen overflow-x-clip">
      {/* SECTION 0: HERO */}
      <section className="px-4 pt-6 md:pt-8 pb-0 2xl:container mx-auto relative z-10 overflow-visible select-none isolate">
        <div className="flex flex-col items-center relative z-10">
          <Badge
            type="header"
            className="hero-badge"
            label={t("aboutPage.badge")}
          />

          <div className="mt-6 md:mt-8 flex flex-col items-center text-center">
            <h1 className="hero-title font-semibold text-[32px] leading-[1.2] md:text-6xl md:leading-[1.3] mb-4 md:mb-6">
              <span className="inline-block pb-1">
                <span className="word inline-block">{t("aboutPage.hero.title1")}&nbsp;</span>
              </span>
              <span className="inline-block pb-1">
                <span className="word inline-block">{t("aboutPage.hero.title2")}&nbsp;</span>
              </span>
              <span className="inline-block pb-1">
                <span className="word inline-block">{t("aboutPage.hero.title3")}&nbsp;</span>
              </span>
              <span className="inline-block pb-1">
                <span className="word inline-block">{t("aboutPage.hero.title4")}&nbsp;</span>
              </span>
              <span className="inline-block pb-1">
                <span className="word inline-block">{t("aboutPage.hero.title5")}&nbsp;</span>
              </span>
              <br className="hidden lg:block" />{" "}
              <span className="inline-block pb-1">
                <span className="word inline-block">{t("aboutPage.hero.title6")}&nbsp;</span>
              </span>
              <span className="inline-block pb-1">
                <span className="word inline-block">{t("aboutPage.hero.title7")}&nbsp;</span>
              </span>
              <span className="inline-block pb-1">
                <span className="word inline-block">{t("aboutPage.hero.title8")}&nbsp;</span>
              </span>
              <span className="inline-block pb-1">
                <span className="word inline-block">{t("aboutPage.hero.title9")}&nbsp;</span>
              </span>
            </h1>
          </div>
        </div>

        {/* Hero visual composition with phone, avatar, and 2 sliding windows */}
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
            className="hero-avatar absolute inset-0 object-contain scale-150 md:scale-112 lg:scale-100 -translate-x-2 lg:translate-x-48 2xl:translate-x-70 translate-y-2 lg:-translate-y-41 pointer-events-none"
            src="/avatar/about.webp"
          />

          {/* Right Slider Window */}
          <div
            ref={rightSliderRef}
            className="slider-window absolute -z-5 bottom-8 md:bottom-24 2xl:bottom-12 -right-48 2xl:-right-64 w-96 md:w-148 2xl:w-180 aspect-video overflow-hidden rounded-2xl border-4 border-white shadow-2xl rotate-3"
          >
            <div className="web-slider-inner w-full h-full flex flex-col">
              {loopHeroProjects.map((imgSrc, idx) => (
                <div key={idx} className="web-image w-full h-full shrink-0">
                  <img
                    alt="web"
                    loading="lazy"
                    className="w-full h-full object-cover"
                    src={imgSrc}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Left Slider Window */}
          <div
            ref={leftSliderRef}
            className="slider-window absolute -z-5 bottom-8 md:bottom-24 2xl:bottom-12 -left-48 2xl:-left-64 w-96 md:w-148 2xl:w-180 aspect-video overflow-hidden rounded-2xl border-4 border-white shadow-2xl -rotate-3"
          >
            <div className="web-slider-inner w-full h-full flex flex-col">
              {loopHeroProjects.map((imgSrc, idx) => (
                <div key={idx} className="web-image w-full h-full shrink-0">
                  <img
                    alt="web"
                    loading="lazy"
                    className="w-full h-full object-cover"
                    src={imgSrc}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Ambient atmospheric particles */}
        <img
          alt=""
          width="900"
          height="900"
          className="hero-bg-particle absolute -right-48 lg:-right-96 bottom-32 lg:-bottom-72 z-0 pointer-events-none opacity-40 md:opacity-80"
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

      {/* ROLES MARQUEE BANNER */}
      <TextMarquee />

      {/* SECTION 1: GET TO KNOW ME (#about) */}
      <section
        id="about"
        className="px-4 md:px-18 lg:px-36 xl:px-48 py-12 lg:py-20 2xl:container mx-auto overflow-hidden select-none"
      >
        <div className="grid gap-4 lg:gap-0 lg:grid-cols-12">
          {/* Left Column */}
          <div className="lg:col-span-4 flex flex-col gap-6 lg:gap-0 justify-between">
            <h2 className="text-2xl font-medium about-title">
              <SplitWords text={t("aboutPage.getToKnowMe")} />
            </h2>

            {/* Desktop blog image */}
            <div className="about-image-wrapper relative hidden lg:block overflow-hidden rounded-xl h-40">
              <div className="absolute inset-0 bg-card z-10 about-image-curtain pointer-events-none"></div>
              <img
                alt="project preview"
                className="w-full h-full object-cover about-image rounded-xl"
                src="/projects/Yobss - Your Business System/cover.jpg"
              />
            </div>
          </div>

          <div className="hidden lg:block lg:col-span-1"></div>

          {/* Right Column */}
          <div className="lg:col-span-7 flex flex-col gap-8 lg:gap-0">
            <div className="flex flex-col gap-5 about-content text-text-secondary md:text-lg leading-relaxed">
              <p>{t("aboutPage.bio1")}</p>
              <p>{t("aboutPage.bio2")}</p>
            </div>

            {/* Mobile blog image */}
            <div className="about-image-wrapper relative lg:hidden overflow-hidden rounded-xl h-40 mt-4">
              <div className="absolute inset-0 bg-card z-10 about-image-curtain pointer-events-none"></div>
              <img
                alt="project preview"
                className="w-full h-full object-cover about-image rounded-xl"
                src="/projects/Yobss - Your Business System/cover.jpg"
              />
            </div>

            {/* Action Buttons */}
            <div className="about-btns mt-8 md:mt-16 flex items-center gap-3">
              <Button
                variant="primary"
                scrollText
                target="_blank"
                rel="noopener noreferrer"
                href="mailto:alzanadytia.j@gmail.com"
                iconLeft={
                  <svg
                    stroke="currentColor"
                    fill="none"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-xl transition-all duration-300 ease-in-out group-hover:scale-120"
                    height="1em"
                    width="1em"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M5 4h4l2 5l-2.5 1.5a11 11 0 0 0 5 5l1.5 -2.5l5 2v4a2 2 0 0 1 -2 2a16 16 0 0 1 -15 -15a2 2 0 0 1 2 -2"></path>
                    <path d="M15 7a2 2 0 0 1 2 2"></path>
                    <path d="M15 3a6 6 0 0 1 6 6"></path>
                  </svg>
                }
              >
                {t("aboutPage.letsTalk")}
              </Button>

              <Button
                variant="secondary"
                scrollText
                target="_blank"
                rel="noopener noreferrer"
                href="/cv.pdf"
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
                {t("aboutPage.readCv")}
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: MY BACKGROUND IN TECH (#background) */}
      <section
        id="background"
        className="py-12 md:py-20 px-4 md:px-12 lg:px-36 xl:px-48 2xl:container mx-auto overflow-x-hidden overflow-y-clip select-none"
      >
        <div className="blog-header flex flex-col lg:flex-row lg:items-center justify-between mb-8 md:mb-12 lg:mb-20">
          <h2 className="bg-title font-semibold text-3xl md:text-5xl mb-2 lg:mb-0 leading-[1.2]">
            {t("aboutPage.bgTitle")}
          </h2>
          <p className="bg-desc md:text-lg font-medium text-text-secondary lg:w-[28%] lg:text-right">
            {t("aboutPage.bgSubtitle")}
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-5">
          {/* Work Experience (Col 12 while Achievements is temporarily hidden) */}
          <div className="lg:col-span-12">
            <div className="p-4 py-5 md:p-5 bg-card rounded-xl h-full">
              <h3 className="text-2xl font-medium mb-6 md:mb-8">{t("aboutPage.workExpTitle")}</h3>
              <RecordList
                type="accordion"
                itemClassName="work-exp-item"
                items={[
                  {
                    period: t("aboutPage.exp1.period"),
                    title: t("aboutPage.exp1.company"),
                    subtitle: t("aboutPage.exp1.role"),
                    description: t("aboutPage.exp1.desc"),
                  },
                  {
                    period: t("aboutPage.exp2.period"),
                    title: t("aboutPage.exp2.company"),
                    subtitle: t("aboutPage.exp2.role"),
                    description: t("aboutPage.exp2.desc"),
                  },
                ]}
              />
            </div>
          </div>

          {/* Sembunyikan sementara: Prestasi & Sertifikasi (Kode tetap ada) */}
          <div className="hidden lg:col-span-4" aria-hidden="true">
            <div className="p-4 py-5 md:p-5 bg-card rounded-xl h-full">
              <h3 className="text-2xl font-medium mb-6 md:mb-8">{t("aboutPage.achievementsTitle")}</h3>
              <RecordList
                type="card"
                layout="stack"
                itemClassName="achievement-item"
                items={[
                  {
                    period: "2026",
                    title: t("aboutPage.achieve1.title"),
                    subtitle: t("aboutPage.achieve1.org"),
                  },
                  {
                    period: "2025",
                    title: t("aboutPage.achieve2.title"),
                    subtitle: t("aboutPage.achieve2.org"),
                  },
                  {
                    period: "2024",
                    title: t("aboutPage.achieve3.title"),
                    subtitle: t("aboutPage.achieve3.org"),
                  },
                ]}
              />
            </div>
          </div>

          {/* Technologies & Tools Used (Col 7) */}
          <div className="lg:col-span-7 overflow-y-hidden overflow-auto">
            <div className="p-4 py-5 md:p-5 bg-card rounded-xl h-full overflow-y-hidden flex flex-col justify-between w-full overflow-hidden">
              <h3 className="text-2xl font-medium mb-6 md:mb-8">
                {t("aboutPage.techToolsTitle")}
              </h3>
              <div className="flex flex-col gap-4">
                {/* Techs scrolling left */}
                <div className="relative w-full overflow-hidden rounded-xl">
                  <div className="flex gap-2 animate-marquee w-max">
                    {[...techIcons, ...techIcons].map((icon, idx) => (
                      <div
                        key={idx}
                        className="bg-white p-4 rounded-xl min-w-17.5 h-17.5 flex items-center justify-center"
                      >
                        <img
                          alt="tech"
                          className="object-contain w-9 md:min-w-12"
                          src={icon}
                        />
                      </div>
                    ))}
                  </div>
                </div>
                {/* Tools scrolling right */}
                <div className="relative w-full overflow-hidden rounded-xl">
                  <div className="flex gap-2 animate-marquee-reverse w-max">
                    {[...toolIcons, ...toolIcons].map((icon, idx) => (
                      <div
                        key={idx}
                        className="bg-white p-4 rounded-xl min-w-17.5 h-17.5 flex items-center justify-center"
                      >
                        <img
                          alt="tool"
                          className="object-contain w-9 md:min-w-12"
                          src={icon}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Education (Col 5, 1 column stack) */}
          <div className="lg:col-span-5">
            <div className="p-4 py-5 md:p-5 bg-card rounded-xl h-full">
              <h3 className="text-2xl font-medium mb-6 md:mb-8">{t("aboutPage.educationTitle")}</h3>
              <RecordList
                type="card"
                layout="stack"
                itemClassName="edu-item"
                items={[
                  {
                    period: t("aboutPage.edu1.period"),
                    title: t("aboutPage.edu1.school"),
                    subtitle: t("aboutPage.edu1.major"),
                  },
                  {
                    period: t("aboutPage.edu2.period"),
                    title: t("aboutPage.edu2.school"),
                    subtitle: t("aboutPage.edu2.major"),
                  },
                ]}
              />
            </div>
          </div>

          {/* TEMPORARILY DISABLED: Photo Gallery Carousel (Col 4) */}
          {/*
          <div className="lg:col-span-4">
            <div
              ref={galleryRef}
              className="rounded-xl overflow-hidden bg-card aspect-[4/4] lg:aspect-[4/4.5] relative group"
            >
              <div className="absolute inset-0 bg-card z-10 image-slider-curtain pointer-events-none"></div>
              <div className="image-slider-inner flex w-full h-full relative">
                {galleryList.map((imgSrc, idx) => (
                  <div key={idx} className="web-image w-full h-full shrink-0">
                    <img
                      alt="gallery"
                      loading="lazy"
                      className="w-full h-full object-cover grayscale-100 group-hover:grayscale-0 transition-all duration-700 ease-in-out"
                      src={imgSrc}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
          */}
        </div>
      </section>

      {/* SECTION 3: SAY HELLO (#socialMedia) */}
      <section
        id="socialMedia"
        className="pt-12 md:pt-20 px-4 md:px-12 lg:px-36 xl:px-48 2xl:container mx-auto overflow-x-hidden overflow-y-clip select-none"
      >
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-0">
          <div className="contact-header col-span-1 md:col-span-4">
            <h2 className="social-title font-medium text-4xl md:text-6xl mb-4 md:mb-6 leading-[1.1] tracking-tight">
              {t("contact.sayHello")}
            </h2>
            <p className="social-desc md:text-lg font-medium text-text-secondary">
              {t("contact.sayHelloDesc")}
            </p>
          </div>

          <div className="hidden lg:block col-span-2"></div>

          <div className="col-span-1 md:col-span-6">
            <SocialGrid variant="card" />
          </div>
        </div>
      </section>
    </div>
  );
};

