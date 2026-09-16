import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import {
  Home,
  Sparkles,
  CreditCard,
  MessageSquareQuote,
  Send,
  Briefcase,
} from "lucide-react";
import { useLanguage } from "../../context/LanguageContext";
import { useAnimation } from "../../context/AnimationContext";
import { Button } from "../ui/button";
import { home as yobssLocale } from "../../locales/yobss/home";
import { home as zanxaLocale } from "../../locales/zanxastudio/home";
import { home as satuCeritaLocale } from "../../locales/satucerita/home";

export interface NavbarInlineItem {
  id: string;
  label: string;
  href: string;
  icon?: React.ReactNode;
  isHome?: boolean;
  isMainCta?: boolean;
  badge?: string;
  ctaClassName?: string;
  onClick?: (e: React.MouseEvent) => void;
}

export interface NavbarInlineProps {
  currentPath?: string;
  onNavigate?: (path: string) => void;
  brandName?: string;
  brandSubtitle?: string;
  logoSrc?: string;
  logoAlt?: string;
  homePath?: string;
  items?: NavbarInlineItem[];
  // Active outline indicator configuration (for center items)
  activeIndicatorColor?: string;
  activeIndicatorHeight?: string;
  activeIndicatorWidth?: string;
  activeIndicatorClassName?: string;
  // Responsive brand name hiding on compact desktop viewports
  hideBrandNameBreakpoint?: "md" | "lg" | "xl" | "2xl";
  mainCtaClassName?: string;
}

/**
 * NavbarInline Component
 * Used across Yobss and Zanxa Studio apps.
 * 
 * Features:
 * - Desktop: Direct inline options in the center with an animated bottom outline indicator.
 * - Mobile: Exactly identical configuration, styling, animations, and dropdown behavior as Navbar.tsx.
 * - Responsive: Hides web name on desktop when screen width is constrained, displaying only the logo.
 * - Main CTA: Positioned at far right corner on desktop.
 * - Active Outline Bottom: Animated gliding bottom border exclusively for center items.
 *   Disappears smoothly when Home or Main CTA is selected.
 */
export const NavbarInline: React.FC<NavbarInlineProps> = ({
  currentPath = "/apps/yoobs",
  onNavigate = (_path: string) => {},
  brandName,
  brandSubtitle,
  logoSrc,
  logoAlt,
  homePath,
  items,
  activeIndicatorColor,
  activeIndicatorHeight = "h-[2.5px]",
  activeIndicatorWidth = "w-full",
  activeIndicatorClassName = "rounded-full",
  hideBrandNameBreakpoint = "xl",
  mainCtaClassName,
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeCenterId, setActiveCenterId] = useState<string | null>(null);
  const { lang, setLang } = useLanguage();
  const { animationsEnabled, toggleAnimations } = useAnimation();

  const isSatuCerita =
    currentPath.startsWith("/apps/satu-cerita") ||
    currentPath.startsWith("/apps/satucerita");
  const isZanxa = currentPath.startsWith("/apps/zanxa");

  // Effective branding
  const effectiveBrandName =
    brandName || (isSatuCerita ? "Satu Cerita" : isZanxa ? "Zanxa Studio" : "Yobss");
  const effectiveBrandSubtitle =
    brandSubtitle !== undefined
      ? brandSubtitle
      : isSatuCerita
      ? "Digital Invitation"
      : isZanxa
      ? "Web Agency"
      : "Business System";
  const effectiveLogoSrc =
    logoSrc ||
    (isSatuCerita
      ? "/logos/satucerita.png"
      : isZanxa
      ? "/logos/zanxastudio.png"
      : "/logos/yobss.png");
  const effectiveLogoAlt = logoAlt || `${effectiveBrandName} Logo`;
  const effectiveHomePath =
    homePath ||
    (isSatuCerita
      ? "/apps/satu-cerita"
      : isZanxa
      ? "/apps/zanxa-studio"
      : "/apps/yoobs");

  // Locales
  const yContent = yobssLocale[lang];
  const zContent = zanxaLocale[lang];
  const sContent = satuCeritaLocale[lang];

  // Default menu items for Yobss:
  // 1. Home / Beranda (hidden on desktop inline, navigated via logo/brand)
  // 2. Features / Fitur
  // 3. Pricing / Harga
  // 4. Testimonial / Testimoni
  // 5. Contact / Kontak (Main CTA)
  const defaultYobssItems: NavbarInlineItem[] = [
    {
      id: "home",
      label: yContent.nav.home || (lang === "id" ? "Beranda" : "Home"),
      href: "/apps/yoobs",
      isHome: true,
      icon: <Home className="w-5 h-5" strokeWidth={1.5} />,
    },
    {
      id: "features",
      label: yContent.nav.features || (lang === "id" ? "Fitur" : "Features"),
      href: "#features",
      icon: <Sparkles className="w-5 h-5" strokeWidth={1.5} />,
    },
    {
      id: "pricing",
      label: yContent.nav.pricing || (lang === "id" ? "Harga" : "Pricing"),
      href: "#pricing",
      icon: <CreditCard className="w-5 h-5" strokeWidth={1.5} />,
    },
    {
      id: "testimonial",
      label: yContent.nav.testimonial || (lang === "id" ? "Testimoni" : "Testimonial"),
      href: "#testimonial",
      icon: <MessageSquareQuote className="w-5 h-5" strokeWidth={1.5} />,
    },
    {
      id: "contact",
      label: yContent.nav.contact || (lang === "id" ? "Kontak" : "Contact"),
      href: "#contact",
      isMainCta: true,
      icon: <Send className="w-5 h-5" strokeWidth={1.5} />,
      ctaClassName:
        "!bg-gradient-to-r !from-emerald-500 !to-green-600 hover:!from-emerald-600 hover:!to-green-700 text-white shadow-xs",
    },
  ];

  // Default menu items for Zanxa Studio (Blue gradient #516cff - #89bcf7, no orange):
  // 1. Home / Beranda (hidden on desktop inline, navigated via logo/brand)
  // 2. Work / Portofolio
  // 3. Testimonial / Testimoni
  // 4. Pricing / Harga
  // 5. Contact / Kontak (Main CTA)
  const defaultZanxaItems: NavbarInlineItem[] = [
    {
      id: "home",
      label: zContent.nav.home || (lang === "id" ? "Beranda" : "Home"),
      href: "/apps/zanxa-studio",
      isHome: true,
      icon: <Home className="w-5 h-5" strokeWidth={1.5} />,
    },
    {
      id: "work",
      label: zContent.nav.work || (lang === "id" ? "Portofolio" : "Work"),
      href: "#work",
      icon: <Briefcase className="w-5 h-5" strokeWidth={1.5} />,
    },
    {
      id: "testimonial",
      label: zContent.nav.testimonial || (lang === "id" ? "Testimoni" : "Testimonial"),
      href: "#testimonial",
      icon: <MessageSquareQuote className="w-5 h-5" strokeWidth={1.5} />,
    },
    {
      id: "pricing",
      label: zContent.nav.pricing || (lang === "id" ? "Harga" : "Pricing"),
      href: "#pricing",
      icon: <CreditCard className="w-5 h-5" strokeWidth={1.5} />,
    },
    {
      id: "contact",
      label: zContent.nav.contact || (lang === "id" ? "Kontak" : "Contact"),
      href: "/#contact",
      isMainCta: true,
      icon: <Send className="w-5 h-5" strokeWidth={1.5} />,
      ctaClassName:
        "!bg-gradient-to-r !from-[#516cff] !to-[#89bcf7] hover:opacity-95 text-white shadow-xs",
    },
  ];

  // Default menu items for Satu Cerita (Purple gradient #7d6aee - #ad9fff):
  // Menu: home, themes, pricing, contact
  const defaultSatuCeritaItems: NavbarInlineItem[] = [
    {
      id: "home",
      label: sContent.nav.home || (lang === "id" ? "Beranda" : "Home"),
      href: "/apps/satu-cerita",
      isHome: true,
      icon: <Home className="w-5 h-5" strokeWidth={1.5} />,
    },
    {
      id: "themes",
      label: sContent.nav.themes || (lang === "id" ? "Tema" : "Themes"),
      href: "#themes",
      icon: <Sparkles className="w-5 h-5" strokeWidth={1.5} />,
    },
    {
      id: "pricing",
      label: sContent.nav.pricing || (lang === "id" ? "Harga" : "Pricing"),
      href: "#pricing",
      icon: <CreditCard className="w-5 h-5" strokeWidth={1.5} />,
    },
    {
      id: "contact",
      label: sContent.nav.contact || (lang === "id" ? "Kontak" : "Contact"),
      href: "#contact",
      isMainCta: true,
      icon: <Send className="w-5 h-5" strokeWidth={1.5} />,
      ctaClassName:
        "!bg-gradient-to-r !from-[#7d6aee] !to-[#ad9fff] hover:opacity-95 text-white shadow-xs",
    },
  ];

  const allItems =
    items ||
    (isSatuCerita
      ? defaultSatuCeritaItems
      : isZanxa
      ? defaultZanxaItems
      : defaultYobssItems);

  // Separate center items from Home and Main CTA
  const homeItem = allItems.find((it) => it.isHome);
  const mainCtaItem = allItems.find((it) => it.isMainCta);
  const centerItems = allItems.filter((it) => !it.isHome && !it.isMainCta);

  // Indicator styling defaults
  const effectiveIndicatorColor =
    activeIndicatorColor ||
    (isSatuCerita
      ? "bg-[#7d6aee]"
      : isZanxa
      ? "bg-[#516cff]"
      : "bg-emerald-500");
  const effectiveMainCtaClassName =
    mainCtaClassName ||
    (isSatuCerita
      ? "!bg-gradient-to-r !from-[#7d6aee] !to-[#ad9fff] hover:opacity-95 text-white shadow-xs"
      : isZanxa
      ? "!bg-gradient-to-r !from-[#516cff] !to-[#89bcf7] hover:opacity-95 text-white shadow-xs"
      : "!bg-gradient-to-r !from-emerald-500 !to-green-600 hover:!from-emerald-600 hover:!to-green-700 text-white shadow-xs");

  // Sync activeCenterId with URL hash if present
  useEffect(() => {
    const handleHashSync = () => {
      if (typeof window === "undefined") return;
      const hash = window.location.hash.replace("#", "");
      if (!hash) {
        // If on clean path without hash, no center item is forced active
        return;
      }
      const matched = centerItems.find(
        (it) => it.id === hash || it.href === `#${hash}`
      );
      if (matched) {
        setActiveCenterId(matched.id);
      }
    };

    handleHashSync();
    window.addEventListener("hashchange", handleHashSync);
    return () => window.removeEventListener("hashchange", handleHashSync);
  }, [centerItems]);

  // Handle Home navigation (logo or brand click)
  const handleHomeClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsMenuOpen(false);
    setActiveCenterId(null); // Clear indicator on home click

    if (homeItem?.onClick) {
      homeItem.onClick(e);
      return;
    }

    if (currentPath === effectiveHomePath) {
      window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
      return;
    }

    onNavigate(effectiveHomePath);
  };

  // Handle center menu item navigation
  const handleCenterItemClick = (e: React.MouseEvent, item: NavbarInlineItem) => {
    e.preventDefault();
    setIsMenuOpen(false);
    setActiveCenterId(item.id); // Outline indicator glides to this item

    if (item.onClick) {
      item.onClick(e);
      return;
    }

    if (item.href.startsWith("#")) {
      const targetEl = document.querySelector(item.href);
      if (targetEl) {
        targetEl.scrollIntoView({ behavior: "smooth" });
      } else {
        // Update URL hash smoothly even if anchor element is dynamically mounted
        window.history.pushState(null, "", item.href);
      }
      return;
    }

    onNavigate(item.href);
  };

  // Handle Main CTA click
  const handleCtaClick = (e: React.MouseEvent, item: NavbarInlineItem) => {
    e.preventDefault();
    setIsMenuOpen(false);
    setActiveCenterId(null); // Clear indicator on CTA click

    if (item.onClick) {
      item.onClick(e);
      return;
    }

    if (item.href.startsWith("#")) {
      const targetEl = document.querySelector(item.href);
      if (targetEl) {
        targetEl.scrollIntoView({ behavior: "smooth" });
        return;
      }
    }

    onNavigate(item.href);
  };

  return (
    <header className="sticky z-50 top-0 left-0 right-0 bg-linear-to-t from-background via-background/90 to-background/80 backdrop-blur-sm border-b border-white">
      <div className="relative 2xl:container mx-auto px-4 md:px-18 py-4 flex items-center justify-between">
        {/* Brand & Logo with Invisible Global Animation Switch Button */}
        <div className="flex items-center gap-1 shrink-0 z-10">
          <a
            id="navbar-inline-brand"
            className="flex items-center gap-3 md:gap-4 hover:opacity-85 transition-all duration-300 ease-in-out cursor-pointer group"
            href={effectiveHomePath}
            onClick={handleHomeClick}
            aria-label={`Navigate to ${effectiveBrandName} Home`}
          >
            <div className="size-10 md:size-12 rounded-lg overflow-hidden shadow-md border-2 border-white shrink-0 flex items-center justify-center bg-white">
              <img
                alt={effectiveLogoAlt}
                width="100"
                height="100"
                className="w-full h-full object-cover rounded-lg group-hover:scale-105 transition-all duration-300"
                src={effectiveLogoSrc}
              />
            </div>
            <strong className="text-lg md:text-xl font-semibold tracking-tight text-text-primary whitespace-nowrap">
              {effectiveBrandName}
            </strong>
          </a>

          {/* Invisible Global Animation Switch Button */}
          <button
            type="button"
            id="navbar-inline-toggle-animations-btn"
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

        {/* Desktop Inline Center Menu: Absolute Centered (guarantees mathematical dead-center alignment) */}
        <nav
          id="navbar-inline-desktop-menu"
          className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 items-center pointer-events-auto z-10"
        >
          <ul className="flex items-center gap-1 lg:gap-2">
            {centerItems.map((item) => {
              const isActive = activeCenterId === item.id;
              return (
                <li key={item.id} className="relative">
                  <button
                    type="button"
                    id={`navbar-inline-item-${item.id}`}
                    onClick={(e) => handleCenterItemClick(e, item)}
                    className={`relative px-3.5 py-2 rounded-lg text-sm lg:text-base font-medium transition-colors duration-200 cursor-pointer flex items-center justify-center ${
                      isActive
                        ? "text-text-primary font-semibold"
                        : "text-text-secondary hover:text-text-primary"
                    }`}
                  >
                    <span>{item.label}</span>

                    {/* Animated Outline Bottom Indicator (Active center menu only) */}
                    {isActive && (
                      <motion.span
                        layoutId="navbar-inline-active-outline-indicator"
                        className={`absolute bottom-0 left-0 right-0 mx-auto ${activeIndicatorHeight} ${activeIndicatorWidth} ${effectiveIndicatorColor} ${activeIndicatorClassName}`}
                        initial={{ opacity: 0, scaleX: 0.6 }}
                        animate={{ opacity: 1, scaleX: 1 }}
                        exit={{ opacity: 0, scaleX: 0 }}
                        transition={{
                          type: "spring",
                          stiffness: 420,
                          damping: 30,
                        }}
                      />
                    )}
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Right side Cluster: Language Toggle + Desktop Main CTA + Mobile Hamburger */}
        <div className="flex items-center gap-2 md:gap-3 shrink-0 z-10">
          {/* Desktop Language Switcher: Displays current active language initial (id / en). Clicking toggles. */}
          <button
            type="button"
            id="navbar-inline-desktop-lang"
            onClick={() => setLang(lang === "id" ? "en" : "id")}
            className="hidden md:inline-flex items-center justify-center h-10 px-3 rounded-xl text-xs font-medium lowercase text-text-secondary hover:text-text-primary bg-foreground/60 hover:bg-foreground border border-foreground/10 transition-all duration-200 cursor-pointer shadow-2xs hover:scale-105 active:scale-95"
            title={`Ganti bahasa / Switch language (Aktif: ${lang})`}
            aria-label={`Current language: ${lang}. Click to switch.`}
          >
            {lang}
          </button>

          {/* Desktop Main CTA Button */}
          {mainCtaItem && (
            <Button
              id="navbar-inline-main-cta"
              variant="primary"
              shape="rounded-xl"
              scrollText
              className={`hidden md:inline-flex ${
                mainCtaItem.ctaClassName || effectiveMainCtaClassName
              }`}
              href={mainCtaItem.href}
              onClick={(e) => handleCtaClick(e, mainCtaItem)}
            >
              {mainCtaItem.label}
            </Button>
          )}

          {/* Mobile Hamburger Menu Toggle Button (matches Navbar.tsx exactly) */}
          <div className="relative w-fit md:hidden">
            <Button
              id="navbar-inline-mobile-toggle"
              variant="dark"
              shape="rounded-xl"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="px-4 py-3.5"
              aria-label="Toggle Navigation Menu"
            >
              <span className="flex items-center gap-3">
                <span className="p-1 rounded-lg transition-all duration-300 ease-in-out group-hover:bg-white/40">
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

            {/* Mobile Dropdown Menu (matches Navbar.tsx configuration & appearance) */}
            <nav
              id="navbar-inline-mobile-dropdown"
              className={`absolute z-50 right-0 top-full w-64 pt-4 transition-all duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] ${
                isMenuOpen
                  ? "translate-y-0 opacity-100 pointer-events-auto scale-100"
                  : "-translate-y-4 opacity-0 pointer-events-none scale-95"
              }`}
            >
              <ul className="bg-white border border-foreground/10 shadow-[0px_10px_30px_rgba(0,0,0,0.1)] rounded-xl p-2 space-y-1">
                {/* Brand Header & Mobile Language Switcher (aligned in top row, no background, displays active language, toggles on click) */}
                <li className="px-3 py-2 border-b border-foreground/10 mb-1">
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="size-8 rounded-lg overflow-hidden shrink-0 bg-white border border-foreground/10 flex items-center justify-center">
                        <img
                          alt={effectiveLogoAlt}
                          className="w-full h-full object-cover"
                          src={effectiveLogoSrc}
                        />
                      </div>
                      <div className="flex flex-col min-w-0">
                        <strong className="text-sm font-semibold text-text-primary truncate">
                          {effectiveBrandName}
                        </strong>
                        {effectiveBrandSubtitle && (
                          <span className="text-xs text-text-secondary truncate">
                            {effectiveBrandSubtitle}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Mobile Language Switcher: No background, enlarged by ~25% (text-[15px]), font-medium (reduced weight by 200), toggles on click */}
                    <button
                      type="button"
                      id="navbar-inline-mobile-dropdown-lang"
                      onClick={() => setLang(lang === "id" ? "en" : "id")}
                      className="shrink-0 px-2.5 py-1 text-[15px] font-medium lowercase text-text-secondary hover:text-text-primary bg-transparent transition-colors duration-200 cursor-pointer"
                      title={`Ganti bahasa / Switch language (Aktif: ${lang})`}
                      aria-label={`Current language: ${lang}. Click to switch.`}
                    >
                      {lang}
                    </button>
                  </div>
                </li>

                {/* 1. Home / Beranda in mobile menu */}
                {homeItem && (
                  <li>
                    <a
                      className={`flex items-center gap-4 p-2 rounded-xl group transition-all duration-300 ease-in-out cursor-pointer ${
                        activeCenterId === null && currentPath === effectiveHomePath
                          ? "bg-foreground text-text-primary"
                          : "text-text-secondary hover:bg-foreground hover:text-text-primary"
                      }`}
                      href={homeItem.href}
                      onClick={handleHomeClick}
                    >
                      <div className="p-2.5 bg-foreground group-hover:bg-white transition-all duration-300 ease-in-out rounded-lg flex items-center justify-center">
                        <div className="group-hover:scale-120 transition duration-300 ease-in-out text-text-secondary group-hover:text-text-primary">
                          {homeItem.icon || (
                            <Home className="w-5 h-5" strokeWidth={1.5} />
                          )}
                        </div>
                      </div>
                      <span className="font-medium">{homeItem.label}</span>
                    </a>
                  </li>
                )}

                {/* 2. Center Menu Items in mobile menu */}
                {centerItems.map((item) => {
                  const isActive = activeCenterId === item.id;
                  return (
                    <li key={item.id}>
                      <a
                        className={`flex items-center gap-4 p-2 rounded-xl group transition-all duration-300 ease-in-out cursor-pointer ${
                          isActive
                            ? "bg-foreground text-text-primary"
                            : "text-text-secondary hover:bg-foreground hover:text-text-primary"
                        }`}
                        href={item.href}
                        onClick={(e) => handleCenterItemClick(e, item)}
                      >
                        <div className="p-2.5 bg-foreground group-hover:bg-white transition-all duration-300 ease-in-out rounded-lg flex items-center justify-center">
                          <div
                            className={`group-hover:scale-120 transition duration-300 ease-in-out ${
                              isActive
                                ? "text-text-primary"
                                : "text-text-secondary group-hover:text-text-primary"
                            }`}
                          >
                            {item.icon || (
                              <span className="size-2 rounded-full bg-current"></span>
                            )}
                          </div>
                        </div>
                        <span className="font-medium flex-1">{item.label}</span>
                        {item.badge && (
                          <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700 font-medium">
                            {item.badge}
                          </span>
                        )}
                      </a>
                    </li>
                  );
                })}

                {/* 3. Main CTA Button (Mobile): Gap sama dengan menu biasa lainnya */}
                {mainCtaItem && (
                  <li className="w-full">
                    <Button
                      id="navbar-inline-mobile-cta"
                      variant="primary"
                      shape="rounded-xl"
                      fullWidth
                      scrollText
                      shine
                      iconLeft={mainCtaItem.icon || <Send className="w-5 h-5" strokeWidth={1.5} />}
                      className={`h-11 font-medium ${
                        mainCtaItem.ctaClassName || effectiveMainCtaClassName
                      }`}
                      href={mainCtaItem.href}
                      onClick={(e) => handleCtaClick(e, mainCtaItem)}
                    >
                      {mainCtaItem.label}
                    </Button>
                  </li>
                )}

                {/* Separator dan extra gap antara CTA dan Portfolio */}
                <li className="pt-2 border-t border-foreground/10" />

                {/* 4. Return to Portfolio link */}
                <li>
                  <a
                    className="flex items-center gap-4 p-2 rounded-xl group transition-all duration-300 ease-in-out cursor-pointer text-text-secondary hover:bg-foreground hover:text-text-primary"
                    href="/"
                    onClick={(e) => {
                      e.preventDefault();
                      setIsMenuOpen(false);
                      onNavigate("/");
                    }}
                  >
                    <div className="p-2.5 bg-foreground group-hover:bg-white transition-all duration-300 ease-in-out rounded-lg flex items-center justify-center">
                      <div className="group-hover:-translate-x-0.5 transition duration-300 ease-in-out text-lg text-text-secondary group-hover:text-text-primary flex items-center justify-center">
                        <svg
                          stroke="currentColor"
                          fill="none"
                          strokeWidth="2"
                          viewBox="0 0 24 24"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          height="1em"
                          width="1em"
                        >
                          <line x1="19" y1="12" x2="5" y2="12"></line>
                          <polyline points="12 19 5 12 12 5"></polyline>
                        </svg>
                      </div>
                    </div>
                    <span className="font-medium">Portfolio</span>
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
