import React, { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { Home, CodeXml, FileText, User } from "lucide-react";
import { useLanguage } from "../../context/LanguageContext";
import { useAnimation } from "../../context/AnimationContext";
import { Button } from "../ui/button";

interface NavbarProps {
  currentPath: string;
  onNavigate: (path: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentPath, onNavigate }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { lang, setLang, t } = useLanguage();
  const { animationsEnabled, toggleAnimations } = useAnimation();
  const headerRef = useRef<HTMLElement>(null);
  const lastScrollY = useRef(0);
  const isHiddenRef = useRef(false);

  // Check if current page is a slug page: /blogs/:slug or /projects/:slug
  const isSlugPage =
    ((currentPath.startsWith("/blogs/") || currentPath.startsWith("/blog/")) &&
      currentPath !== "/blogs" &&
      currentPath !== "/blog") ||
    (currentPath.startsWith("/projects/") && currentPath !== "/projects");

  // Reset navbar to visible when changing routes
  useEffect(() => {
    if (headerRef.current) {
      gsap.killTweensOf(headerRef.current);
      gsap.set(headerRef.current, { yPercent: 0 });
    }
    isHiddenRef.current = false;
    lastScrollY.current = window.scrollY;
  }, [currentPath]);

  // Smooth hide/show on scroll with GSAP on slug pages
  useEffect(() => {
    if (!isSlugPage) {
      if (headerRef.current) {
        gsap.killTweensOf(headerRef.current);
        gsap.to(headerRef.current, {
          yPercent: 0,
          duration: 0.3,
          ease: "power2.out",
          overwrite: "auto",
        });
      }
      isHiddenRef.current = false;
      return;
    }

    const threshold = 10;
    lastScrollY.current = window.scrollY;

    const handleScroll = () => {
      // Keep navbar visible if navigation menu dropdown is open
      if (isMenuOpen) {
        if (isHiddenRef.current && headerRef.current) {
          gsap.to(headerRef.current, {
            yPercent: 0,
            duration: 0.35,
            ease: "power3.out",
            overwrite: "auto",
          });
          isHiddenRef.current = false;
        }
        return;
      }

      const currentScrollY = window.scrollY;
      const delta = currentScrollY - lastScrollY.current;

      // Always show near the very top of the page
      if (currentScrollY <= 50) {
        if (isHiddenRef.current && headerRef.current) {
          gsap.to(headerRef.current, {
            yPercent: 0,
            duration: 0.35,
            ease: "power3.out",
            overwrite: "auto",
          });
          isHiddenRef.current = false;
        }
        lastScrollY.current = currentScrollY;
        return;
      }

      // Ignore micro-scrolls
      if (Math.abs(delta) < threshold) {
        return;
      }

      if (delta > 0 && !isHiddenRef.current) {
        // Scrolling down -> hide navbar smoothly
        if (headerRef.current) {
          gsap.to(headerRef.current, {
            yPercent: -100,
            duration: 0.38,
            ease: "power3.out",
            overwrite: "auto",
          });
          isHiddenRef.current = true;
        }
      } else if (delta < 0 && isHiddenRef.current) {
        // Scrolling up -> reveal navbar smoothly
        if (headerRef.current) {
          gsap.to(headerRef.current, {
            yPercent: 0,
            duration: 0.38,
            ease: "power3.out",
            overwrite: "auto",
          });
          isHiddenRef.current = false;
        }
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isSlugPage, isMenuOpen]);

  const handleNav = (e: React.MouseEvent, path: string) => {
    e.preventDefault();
    setIsMenuOpen(false);
    onNavigate(path);
  };

  return (
    <header
      ref={headerRef}
      className="sticky z-50 top-0 left-0 right-0 bg-linear-to-t from-background via-background/90 to-background/80 backdrop-blur-sm border-b border-white"
    >
      <div className="2xl:container mx-auto px-4 md:px-18 py-4 flex items-center justify-between">
        {/* Brand Logo & Title with Invisible Global Animation Toggle Button */}
        <div className="flex items-center gap-1">
          <a
            className="flex items-center gap-3 md:gap-5 hover:opacity-75 transition-all duration-300 ease-in-out cursor-pointer"
            href="#home"
            onClick={(e) => handleNav(e, "/")}
          >
            <img
              alt="Logo"
              width="100"
              height="100"
              className="object-cover rounded-lg size-10 md:size-12 shadow-md border-4 border-white"
              src="/logo.webp"
            />
            <strong className="text-lg md:text-xl font-semibold tracking-tight">Alzan Aditya</strong>
          </a>

          {/* Invisible Global Animation Switch Button */}
          <button
            type="button"
            id="navbar-toggle-animations-btn"
            onClick={toggleAnimations}
            className="w-6 h-8 opacity-0 cursor-pointer focus:opacity-100 focus:outline-none focus:ring-2 focus:ring-primary/50 rounded transition-opacity"
            title={animationsEnabled ? "Matikan animasi (Toggle animations off)" : "Nyalakan animasi (Toggle animations on)"}
            aria-label={animationsEnabled ? "Matikan animasi secara global" : "Nyalakan animasi secara global"}
          >
            <span className="sr-only">
              {animationsEnabled ? "Disable animations" : "Enable animations"}
            </span>
          </button>
        </div>

        {/* Right side navigation buttons & Menu */}
        <div className="flex items-center gap-2 md:gap-3">
          {/* Collaborate Button (Desktop) */}
          <Button
            id="navbar-collaborate-button"
            variant="secondary"
            shape="rounded-xl"
            scrollText
            className="hidden md:inline-flex"
            href="#contact"
            onClick={(e) => {
              if (currentPath !== "/") {
                handleNav(e, "/#contact");
              } else {
                e.preventDefault();
                const contactEl = document.getElementById("contact");
                if (contactEl) {
                  contactEl.scrollIntoView({ behavior: "smooth" });
                }
              }
            }}
          >
            {t("nav.collaborate")}
          </Button>

          {/* Menu Dropdown Button */}
          <div className="relative w-fit">
            <Button
              variant="dark"
              shape="rounded-xl"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:pr-2 lg:pl-4 px-4 py-3.5 lg:py-2"
              aria-label="Toggle Navigation Menu"
            >
              <span className="flex items-center gap-3 lg:gap-4">
                <span className="hidden lg:flex">
                  <span className="scroll-text flex">
                    <span className="font-semibold">Menu</span>
                    <span className="font-semibold">Menu</span>
                  </span>
                </span>
                <span className="lg:p-2 rounded-lg transition-all duration-300 ease-in-out group-hover:bg-white/40">
                  <svg
                    stroke="currentColor"
                    fill="currentColor"
                    strokeWidth="0"
                    viewBox="0 0 448 512"
                    className={`transition-all duration-300 ease-in-out group-hover:scale-125 ${
                      isMenuOpen ? "rotate-45" : ""
                    }`}
                    height="1em"
                    width="1em"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 144L48 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l144 0 0 144c0 17.7 14.3 32 32 32s32-14.3 32-32l0-144 144 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-144 0 0-144z"></path>
                  </svg>
                </span>
              </span>
            </Button>

            {/* Dropdown Menu */}
            <nav
              className={`absolute z-50 right-0 top-full w-64 pt-4 transition-all duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] ${
                isMenuOpen
                  ? "translate-y-0 opacity-100 pointer-events-auto scale-100"
                  : "-translate-y-4 opacity-0 pointer-events-none scale-95"
              }`}
            >
              <ul className="bg-white border border-foreground/10 shadow-[0px_10px_30px_rgba(0,0,0,0.1)] rounded-xl p-2">
                <li>
                  <a
                    className={`flex items-center gap-4 p-2 rounded-xl group transition-all duration-300 ease-in-out cursor-pointer ${
                      currentPath === "/"
                        ? "bg-foreground text-text-primary"
                        : "text-text-secondary hover:bg-foreground hover:text-text-primary"
                    }`}
                    href="/"
                    onClick={(e) => handleNav(e, "/")}
                  >
                    <div className="p-2.5 bg-foreground group-hover:bg-white transition-all duration-300 ease-in-out rounded-lg flex items-center justify-center">
                      <div className={`group-hover:scale-120 transition duration-300 ease-in-out ${currentPath === "/" ? "text-text-primary" : "text-text-secondary group-hover:text-text-primary"}`}>
                        <Home className="w-5 h-5" strokeWidth={1.5} />
                      </div>
                    </div>
                    <span className="font-medium">{t("nav.home")}</span>
                  </a>
                </li>

                <li>
                  <a
                    className={`flex items-center gap-4 p-2 rounded-xl group transition-all duration-300 ease-in-out cursor-pointer ${
                      currentPath.startsWith("/projects")
                        ? "bg-foreground text-text-primary"
                        : "text-text-secondary hover:bg-foreground hover:text-text-primary"
                    }`}
                    href="/projects"
                    onClick={(e) => handleNav(e, "/projects")}
                  >
                    <div className="p-2.5 bg-foreground group-hover:bg-white transition-all duration-300 ease-in-out rounded-lg flex items-center justify-center">
                      <div className={`group-hover:scale-120 transition duration-300 ease-in-out ${currentPath.startsWith("/projects") ? "text-text-primary" : "text-text-secondary group-hover:text-text-primary"}`}>
                        <CodeXml className="w-5 h-5" strokeWidth={1.5} />
                      </div>
                    </div>
                    <span className="font-medium">{t("nav.projects")}</span>
                  </a>
                </li>

                <li>
                  <a
                    className={`flex items-center gap-4 p-2 rounded-xl group transition-all duration-300 ease-in-out cursor-pointer ${
                      currentPath.startsWith("/blogs")
                        ? "bg-foreground text-text-primary"
                        : "text-text-secondary hover:bg-foreground hover:text-text-primary"
                    }`}
                    href="/blogs"
                    onClick={(e) => handleNav(e, "/blogs")}
                  >
                    <div className="p-2.5 bg-foreground group-hover:bg-white transition-all duration-300 ease-in-out rounded-lg flex items-center justify-center">
                      <div className={`group-hover:scale-120 transition duration-300 ease-in-out ${currentPath.startsWith("/blogs") ? "text-text-primary" : "text-text-secondary group-hover:text-text-primary"}`}>
                        <FileText className="w-5 h-5" strokeWidth={1.5} />
                      </div>
                    </div>
                    <span className="font-medium">{t("nav.blogs")}</span>
                  </a>
                </li>

                <li>
                  <a
                    className={`flex items-center gap-4 p-2 rounded-xl group transition-all duration-300 ease-in-out cursor-pointer ${
                      currentPath === "/about"
                        ? "bg-foreground text-text-primary"
                        : "text-text-secondary hover:bg-foreground hover:text-text-primary"
                    }`}
                    href="/about"
                    onClick={(e) => handleNav(e, "/about")}
                  >
                    <div className="p-2.5 bg-foreground group-hover:bg-white transition-all duration-300 ease-in-out rounded-lg flex items-center justify-center">
                      <div className={`group-hover:scale-120 transition duration-300 ease-in-out ${currentPath === "/about" ? "text-text-primary" : "text-text-secondary group-hover:text-text-primary"}`}>
                        <User className="w-5 h-5" strokeWidth={1.5} />
                      </div>
                    </div>
                    <span className="font-medium">{t("nav.about")}</span>
                  </a>
                </li>

                {/* Bilingual Switcher inside Dropdown Menu - Clean, no background on container, active option has light grey background */}
                <li className="w-full">
                  <div className="flex items-center gap-1 p-1 rounded-xl text-text-secondary w-full">
                    <button
                      type="button"
                      onClick={() => setLang("id")}
                      className={`flex-1 py-2.5 rounded-xl text-sm font-semibold lowercase transition-all duration-300 cursor-pointer text-center ${
                        lang === "id"
                          ? "bg-foreground text-text-primary font-bold"
                          : "bg-transparent text-text-secondary hover:text-text-primary"
                      }`}
                    >
                      id
                    </button>
                    <button
                      type="button"
                      onClick={() => setLang("en")}
                      className={`flex-1 py-2.5 rounded-xl text-sm font-semibold lowercase transition-all duration-300 cursor-pointer text-center ${
                        lang === "en"
                          ? "bg-foreground text-text-primary font-bold"
                          : "bg-transparent text-text-secondary hover:text-text-primary"
                      }`}
                    >
                      en
                    </button>
                  </div>
                </li>

                {/* Mobile collaborate button in dropdown */}
                <li className="w-full mt-2 md:hidden">
                  <Button
                    variant="secondary"
                    shape="rounded-xl"
                    fullWidth
                    scrollText
                    className="text-text-secondary"
                    href="#contact"
                    onClick={(e) => {
                      if (currentPath !== "/") {
                        handleNav(e, "/#contact");
                      } else {
                        e.preventDefault();
                        setIsMenuOpen(false);
                        const contactEl = document.getElementById("contact");
                        if (contactEl) {
                          contactEl.scrollIntoView({ behavior: "smooth" });
                        }
                      }
                    }}
                  >
                    {t("nav.letsTalk")}
                  </Button>
                </li>

                {/* Other Section: Yobss & Zanxa Studio */}
                <li className="w-full mt-3 pt-3 border-t border-foreground/10 space-y-1">
                  <div className="px-2 py-1 text-xs font-semibold tracking-wider text-text-secondary/70">
                    {t("nav.other") || (lang === "id" ? "Lainnya" : "Other")}
                  </div>
                  <a
                    id="navbar-menu-yobss"
                    className={`flex items-center gap-3 p-2 rounded-xl group transition-all duration-300 ease-in-out cursor-pointer ${
                      currentPath.startsWith("/apps/yoobs") || currentPath.startsWith("/apps/yobss")
                        ? "bg-foreground text-text-primary"
                        : "text-text-secondary hover:bg-foreground hover:text-text-primary"
                    }`}
                    href="/apps/yoobs"
                    onClick={(e) => handleNav(e, "/apps/yoobs")}
                  >
                    <div className="size-10 rounded-lg overflow-hidden shadow-md border-2 border-white shrink-0 flex items-center justify-center bg-white">
                      <img
                        src="/logos/yobss.png"
                        alt="Yobss"
                        width="40"
                        height="40"
                        className="w-full h-full object-cover rounded-lg group-hover:scale-105 transition-all duration-300"
                      />
                    </div>
                    <div className="flex flex-col">
                      <span className="font-medium text-text-primary leading-tight">Yobss</span>
                      <span className="text-xs text-text-secondary">Business System</span>
                    </div>
                  </a>

                  <a
                    id="navbar-menu-zanxa-studio"
                    className={`flex items-center gap-3 p-2 rounded-xl group transition-all duration-300 ease-in-out cursor-pointer ${
                      currentPath.startsWith("/apps/zanxa")
                        ? "bg-foreground text-text-primary"
                        : "text-text-secondary hover:bg-foreground hover:text-text-primary"
                    }`}
                    href="/apps/zanxa-studio"
                    onClick={(e) => handleNav(e, "/apps/zanxa-studio")}
                  >
                    <div className="size-10 rounded-lg overflow-hidden shadow-md border-2 border-white shrink-0 flex items-center justify-center bg-white">
                      <img
                        src="/logos/zanxastudio.png"
                        alt="Zanxa Studio"
                        width="40"
                        height="40"
                        className="w-full h-full object-cover rounded-lg group-hover:scale-105 transition-all duration-300"
                      />
                    </div>
                    <div className="flex flex-col">
                      <span className="font-medium text-text-primary leading-tight">Zanxa Studio</span>
                      <span className="text-xs text-text-secondary">Web Agency</span>
                    </div>
                  </a>

                  <a
                    id="navbar-menu-satu-cerita"
                    className={`flex items-center gap-3 p-2 rounded-xl group transition-all duration-300 ease-in-out cursor-pointer ${
                      currentPath.startsWith("/apps/satu-cerita") || currentPath.startsWith("/apps/satucerita")
                        ? "bg-foreground text-text-primary"
                        : "text-text-secondary hover:bg-foreground hover:text-text-primary"
                    }`}
                    href="/apps/satu-cerita"
                    onClick={(e) => handleNav(e, "/apps/satu-cerita")}
                  >
                    <div className="size-10 rounded-lg overflow-hidden shadow-md border-2 border-white shrink-0 flex items-center justify-center bg-white">
                      <img
                        src="/logos/satucerita.png"
                        alt="Satu Cerita"
                        width="40"
                        height="40"
                        className="w-full h-full object-cover rounded-lg group-hover:scale-105 transition-all duration-300"
                      />
                    </div>
                    <div className="flex flex-col">
                      <span className="font-medium text-text-primary leading-tight">Satu Cerita</span>
                      <span className="text-xs text-text-secondary">Digital Invitation</span>
                    </div>
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
};

