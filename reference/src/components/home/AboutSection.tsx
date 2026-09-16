import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useLanguage } from "../../context/LanguageContext";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { StatCards } from "../common/StatCards";

gsap.registerPlugin(ScrollTrigger);

interface AboutSectionProps {
  onNavigate: (path: string) => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ onNavigate }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { lang, t } = useLanguage();

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add(
        {
          isDesktop: "(min-width: 1024px)",
          isMobile: "(max-width: 1023px)",
        },
        (context) => {
          const { isDesktop } = context.conditions as { isDesktop: boolean };

          if (isDesktop) {
            gsap
              .timeline({
                scrollTrigger: {
                  trigger: containerRef.current,
                  start: "top 50%",
                  toggleActions: "play none none none",
                },
              })
              .from(".about-badge", {
                y: 20,
                opacity: 0,
                duration: 0.8,
                ease: "power3.out",
              })
              .from(
                ".about-title .word",
                {
                  y: 40,
                  opacity: 0,
                  filter: "blur(10px)",
                  duration: 1,
                  stagger: 0.05,
                  ease: "power3.out",
                },
                "-=0.6"
              )
              .from(
                ".about-p",
                {
                  y: 30,
                  opacity: 0,
                  duration: 1,
                  stagger: 0.2,
                  ease: "power3.out",
                },
                "-=0.7"
              )
              .from(
                ".about-phone",
                {
                  y: 100,
                  opacity: 0,
                  duration: 1.2,
                  ease: "power4.out",
                },
                "-=1"
              )
              .from(
                ".about-avatar",
                {
                  y: 80,
                  opacity: 0,
                  filter: "blur(15px)",
                  duration: 1.2,
                  ease: "power4.out",
                },
                "-=1"
              )
              .from(
                ".about-overlay",
                {
                  opacity: 0,
                  duration: 1,
                },
                "-=0.6"
              )
              .from(
                ".about-role-tag",
                {
                  scale: 0,
                  opacity: 0,
                  duration: 0.8,
                  stagger: 0.1,
                  ease: "back.out(1.7)",
                },
                "-=0.8"
              )
              .from(
                ".about-stat-card",
                {
                  y: 40,
                  opacity: 0,
                  duration: 1,
                  stagger: 0.15,
                  ease: "power3.out",
                },
                "-=1"
              );
          } else {
            gsap
              .timeline({
                scrollTrigger: {
                  trigger: containerRef.current,
                  start: "top 60%",
                  toggleActions: "play none none none",
                },
              })
              .from(".about-badge", {
                y: 20,
                opacity: 0,
                duration: 0.8,
                ease: "power3.out",
              })
              .from(
                ".about-title .word",
                {
                  y: 30,
                  opacity: 0,
                  filter: "blur(10px)",
                  stagger: 0.05,
                  duration: 0.8,
                  ease: "power3.out",
                },
                "-=0.4"
              )
              .from(
                ".about-p",
                {
                  y: 20,
                  opacity: 0,
                  stagger: 0.2,
                  duration: 0.8,
                  ease: "power3.out",
                },
                "-=0.5"
              );

            gsap
              .timeline({
                scrollTrigger: {
                  trigger: ".about-img-container",
                  start: "top 80%",
                  toggleActions: "play none none none",
                },
              })
              .from(".about-phone", {
                y: 80,
                opacity: 0,
                duration: 1.2,
                ease: "power4.out",
              })
              .from(
                ".about-avatar",
                {
                  y: 60,
                  opacity: 0,
                  filter: "blur(15px)",
                  duration: 1.2,
                  ease: "power4.out",
                },
                "-=1"
              )
              .from(
                ".about-overlay",
                {
                  opacity: 0,
                  duration: 1,
                },
                "-=0.5"
              );

            gsap.from(".about-role-tag", {
              scrollTrigger: {
                trigger: ".about-role-tag",
                start: "top 80%",
                toggleActions: "play none none none",
              },
              scale: 0,
              opacity: 0,
              duration: 0.8,
              stagger: 0.1,
              ease: "back.out(1.7)",
              clearProps: "all",
            });

            gsap.from(".about-stat-card", {
              scrollTrigger: {
                trigger: ".about-stat-card",
                start: "top 80%",
                toggleActions: "play none none none",
              },
              y: 40,
              opacity: 0,
              duration: 1,
              stagger: 0.15,
              ease: "power3.out",
            });
          }
        }
      );
    },
    { scope: containerRef }
  );

  return (
    <section
      ref={containerRef}
      id="about"
      className="px-4 md:px-12 lg:px-36 xl:px-48 py-12 lg:py-20 2xl:container mx-auto overflow-hidden select-none"
    >
      <div className="grid gap-12 lg:gap-0 lg:grid-cols-12 lg:items-center mb-12 md:mb-14">
        {/* Left Column: Story */}
        <div className="lg:col-span-6 flex flex-col gap-5 lg:gap-8">
          <div>
            <strong className="about-badge inline-block font-semibold text-lg">
              {t("about.badge")}
            </strong>
            <h2 className="about-title font-medium text-3xl md:text-5xl mt-3 leading-[1.2]">
              <span className="inline-block pb-1">
                <span className="word inline-block">{t("about.heading1")}&nbsp;</span>
              </span>
              <span className="inline-block pb-1">
                <span className="word inline-block">{t("about.heading2")}&nbsp;</span>
              </span>
              <span className="inline-block pb-1">
                <span className="word inline-block">{t("about.heading3")}&nbsp;</span>
              </span>
            </h2>
          </div>
          <div className="leading-[1.4] md:leading-normal flex flex-col gap-4 md:gap-5 md:text-lg">
            <p className="about-p">
              {t("about.p1")}
            </p>
            <p className="about-p">
              {t("about.p2")}
            </p>
          </div>
        </div>

        {/* Spacer */}
        <div className="hidden lg:block col-span-1"></div>

        {/* Right Column: Phone, Avatar & 5 Floating Badges */}
        <div className="relative lg:col-span-5 about-img-container">
          <img
            alt="hero"
            loading="lazy"
            width="500"
            height="100"
            className="about-phone object-cover w-full"
            src="/assets/phone.png"
          />
          <img
            alt="hero"
            loading="lazy"
            width="320"
            height="100"
            className="about-avatar object-cover w-full md:w-full lg:w-100 absolute bottom-0 left-0 md:left-4"
            src="/avatar/secondary.webp"
          />
          <div className="about-overlay absolute inset-0 bg-linear-to-b from-transparent via-transparent to-white pointer-events-none"></div>

          {/* 5 Badges Exactly Matching Reference */}
          <div className="absolute -bottom-4 flex flex-wrap justify-center gap-2 left-0 right-0">
            {/* 1. Full-Stack Web Developer */}
            <div className="about-role-tag">
              <Badge
                type="point"
                label={t("about.tagDeveloper")}
                icon={
                  <svg
                    stroke="currentColor"
                    fill="currentColor"
                    strokeWidth="0"
                    viewBox="0 0 640 512"
                    height="1em"
                    width="1em"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M392.8 1.2c-17-4.9-34.7 5-39.6 22l-128 448c-4.9 17 5 34.7 22 39.6s34.7-5 39.6-22l128-448c4.9-17-5-34.7-22-39.6zm80.6 120.1c-12.5 12.5-12.5 32.8 0 45.3L562.7 256l-89.4 89.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l112-112c12.5-12.5 12.5-32.8 0-45.3l-112-112c-12.5-12.5-32.8-12.5-45.3 0zm-306.7 0c-12.5-12.5-32.8-12.5-45.3 0l-112 112c-12.5 12.5-12.5 32.8 0 45.3l112 112c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L77.3 256l89.4-89.4c12.5-12.5 12.5-32.8 0-45.3z"></path>
                  </svg>
                }
              />
            </div>

            {/* 2. System Builder */}
            <div className="about-role-tag">
              <Badge
                type="point"
                label={t("about.tagSystem")}
                icon={
                  <svg
                    stroke="currentColor"
                    fill="currentColor"
                    strokeWidth="0"
                    viewBox="0 0 512 512"
                    height="1em"
                    width="1em"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M413.967 276.8c1.06-6.235 1.06-13.518 1.06-20.8s-1.06-13.518-1.06-20.8l44.667-34.318c4.26-3.118 5.319-8.317 2.13-13.518L418.215 115.6c-2.129-4.164-8.507-6.235-12.767-4.164l-53.186 20.801c-10.638-8.318-23.394-15.601-36.16-20.801l-7.448-55.117c-1.06-4.154-5.319-8.318-10.638-8.318h-85.098c-5.318 0-9.577 4.164-10.637 8.318l-8.508 55.117c-12.767 5.2-24.464 12.482-36.171 20.801l-53.186-20.801c-5.319-2.071-10.638 0-12.767 4.164L49.1 187.365c-2.119 4.153-1.061 10.399 2.129 13.518L96.97 235.2c0 7.282-1.06 13.518-1.06 20.8s1.06 13.518 1.06 20.8l-44.668 34.318c-4.26 3.118-5.318 8.317-2.13 13.518L92.721 396.4c2.13 4.164 8.508 6.235 12.767 4.164l53.187-20.801c10.637 8.318 23.394 15.601 36.16 20.801l8.508 55.117c1.069 5.2 5.318 8.318 10.637 8.318h85.098c5.319 0 9.578-4.164 10.638-8.318l8.518-55.117c12.757-5.2 24.464-12.482 36.16-20.801l53.187 20.801c5.318 2.071 10.637 0 12.767-4.164l42.549-71.765c2.129-4.153 1.06-10.399-2.13-13.518l-46.8-34.317zm-158.499 52c-41.489 0-74.46-32.235-74.46-72.8s32.971-72.8 74.46-72.8 74.461 32.235 74.461 72.8-32.972 72.8-74.461 72.8z"></path>
                  </svg>
                }
              />
            </div>

            {/* 3. Content Creator */}
            <div className="about-role-tag">
              <Badge
                type="point"
                label={t("about.tagContent")}
                icon={
                  <svg
                    stroke="currentColor"
                    fill="currentColor"
                    strokeWidth="0"
                    viewBox="0 0 512 512"
                    className="text-sm"
                    height="1em"
                    width="1em"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M362.7 19.3L314.3 67.7 444.3 197.7l48.4-48.4c25-25 25-65.5 0-90.5L453.3 19.3c-25-25-65.5-25-90.5 0zm-71 71L58.6 323.5c-10.4 10.4-18 23.3-22.2 37.4L1 481.2C-1.5 489.7 .8 498.8 7 505s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L421.7 220.3 291.7 90.3z"></path>
                  </svg>
                }
              />
            </div>

            {/* 4. Business Growth */}
            <div className="about-role-tag">
              <Badge
                type="point"
                label={t("about.tagGrowth")}
                icon={
                  <svg
                    stroke="currentColor"
                    fill="currentColor"
                    strokeWidth="0"
                    viewBox="0 0 24 24"
                    height="1em"
                    width="1em"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path fill="none" d="M0 0h24v24H0z"></path>
                    <path d="M9.19 6.35c-2.04 2.29-3.44 5.58-3.57 5.89L2 10.69l4.05-4.05c.47-.47 1.15-.68 1.81-.55l1.33.26zM11.17 17s3.74-1.55 5.89-3.7c5.4-5.4 4.5-9.62 4.21-10.57-.95-.3-5.17-1.19-10.57 4.21C8.55 9.09 7 12.83 7 12.83L11.17 17zm6.48-2.19c-2.29 2.04-5.58 3.44-5.89 3.57L13.31 22l4.05-4.05c.47-.47.68-1.15.55-1.81l-.26-1.33zM9 18c0 .83-.34 1.58-.88 2.12C6.94 21.3 2 22 2 22s.7-4.94 1.88-6.12A2.996 2.996 0 0 1 9 18zm4-9c0-1.1.9-2 2-2s2 .9 2 2-.9 2-2 2-2-.9-2-2z"></path>
                  </svg>
                }
              />
            </div>
          </div>
        </div>
      </div>

      {/* Stat Cards Grid */}
      <StatCards
        items={[
          {
            value: 1,
            suffix: "+",
            suffixColor: "primary",
            label: t("about.statYears"),
          },
          {
            value: 8,
            suffix: "+",
            suffixColor: "secondary",
            label: t("about.statProjects"),
            action: (
              <Button
                variant="primary"
                shape="rounded-full"
                scrollText
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
                    className="-rotate-45"
                    height="1em"
                    width="1em"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z"></path>
                  </svg>
                }
              >
                {t("about.statWorksBtn")}
              </Button>
            ),
          },
          {
            value: 5,
            suffix: "+",
            suffixColor: "primary",
            label: t("about.statCollabs"),
          },
        ]}
      />
    </section>
  );
};

