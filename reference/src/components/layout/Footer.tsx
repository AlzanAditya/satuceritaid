import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useLanguage } from "../../context/LanguageContext";
import { CtaSection } from "../Section/CtaSection";

gsap.registerPlugin(ScrollTrigger);

interface FooterProps {
  onNavigate: (path: string) => void;
  currentPath?: string;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, currentPath }) => {
  const containerRef = useRef<HTMLElement>(null);
  const { t, lang } = useLanguage();

  useGSAP(
    () => {
      // Ensure initial visibility before animation or if ScrollTrigger doesn't fire
      const ctx = gsap.context(() => {
        gsap.timeline({
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 85%",
            toggleActions: "play none none none",
            refreshPriority: -1,
            onRefresh: (self) => {
              // If footer is already visible in viewport on mount, play immediately
              if (self.progress > 0) {
                gsap.set([".footer-content", ".footer-text"], {
                  opacity: 1,
                  y: 0,
                  scale: 1,
                  clearProps: "transform,opacity",
                });
              }
            },
          },
        })
        .fromTo(
          ".footer-content",
          { y: 50, opacity: 0, scale: 0.96 },
          { y: 0, opacity: 1, scale: 1, duration: 1.1, ease: "power3.out" }
        )
        .fromTo(
          ".footer-text",
          { y: 25, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.9, ease: "power3.out" },
          "-=0.6"
        );
      }, containerRef);

      return () => ctx.revert();
    },
    { scope: containerRef, dependencies: [currentPath] }
  );

  const handleNav = (e: React.MouseEvent, path: string) => {
    e.preventDefault();
    onNavigate(path);
  };

  return (
    <footer ref={containerRef} className="px-4 md:px-12 lg:px-20 xl:px-36 2xl:container mx-auto bg-white pt-8">
      {/* Call To Action Box */}
      <CtaSection />

      {/* Bottom Bar */}
      <div className="border-t border-foreground/10 py-5 sm:py-6 md:py-8 mt-4 sm:mt-6">
        <div className="flex flex-col items-center gap-3.5 sm:gap-4 md:grid md:grid-cols-2 md:gap-y-4 md:items-center lg:flex lg:flex-row lg:items-center lg:justify-between">
          {/* Logo & Identity */}
          <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 text-center sm:text-left justify-center md:justify-self-start shrink-0">
            <img
              alt="Logo"
              width="60"
              height="60"
              className="object-cover rounded-full size-12 sm:size-14 shadow-md border-2 border-white shrink-0"
              src="/logo.webp"
            />
            <div>
              <strong className="text-base sm:text-lg font-semibold block text-text-primary">
                Alzan Adytia J.
              </strong>
              <p className="text-xs sm:text-sm text-text-secondary">{t("footer.status")}</p>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="flex justify-center md:justify-self-end lg:justify-center shrink-0">
            <ul className="flex flex-wrap justify-center items-center gap-x-5 sm:gap-x-7 md:gap-x-8 gap-y-1.5 sm:gap-y-2">
              <li>
                <a
                  className="font-medium text-text-secondary hover:text-text-primary transition ease-in-out duration-300 cursor-pointer text-sm sm:text-base"
                  href="/"
                  onClick={(e) => handleNav(e, "/")}
                >
                  {t("nav.home")}
                </a>
              </li>
              <li>
                <a
                  className="font-medium text-text-secondary hover:text-text-primary transition ease-in-out duration-300 cursor-pointer text-sm sm:text-base"
                  href="/about"
                  onClick={(e) => handleNav(e, "/about")}
                >
                  {t("nav.about")}
                </a>
              </li>
              <li>
                <a
                  className="font-medium text-text-secondary hover:text-text-primary transition ease-in-out duration-300 cursor-pointer text-sm sm:text-base"
                  href="/projects"
                  onClick={(e) => handleNav(e, "/projects")}
                >
                  {t("nav.projects")}
                </a>
              </li>
              <li>
                <a
                  className="font-medium text-text-secondary hover:text-text-primary transition ease-in-out duration-300 cursor-pointer text-sm sm:text-base"
                  href="/blogs"
                  onClick={(e) => handleNav(e, "/blogs")}
                >
                  {t("nav.blogs")}
                </a>
              </li>
            </ul>
          </nav>

          {/* Copyright */}
          <div className="text-center md:col-span-2 md:justify-self-center lg:text-right lg:shrink-0">
            <p className="text-xs sm:text-sm font-medium text-text-secondary leading-snug">
              <span className="inline lg:block">2026 Alzan Aditya.</span>{" "}
              <span className="inline lg:block">
                {lang === "id" ? "Hak Cipta Dilindungi." : "All Rights Reserved."}
              </span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

