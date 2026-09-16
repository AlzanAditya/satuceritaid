import React, { useState, useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { MultiSwitch, MultiSwitchOption } from "../ui/MultiSwitch";
import { useLanguage } from "../../context/LanguageContext";
import { personalInfo } from "../../data/portfolioData";

gsap.registerPlugin(ScrollTrigger);

/**
 * 4-Point Sparkle Star Icon Point
 * Replicates the exact SVG icon point used in cupsiteproject.com
 */
export const SparkleIcon: React.FC<{ className?: string }> = ({
  className = "",
}) => (
  <svg
    viewBox="0 0 256 256"
    fill="currentColor"
    className={`shrink-0 ${className}`}
    aria-hidden="true"
  >
    <path d="M240,128a15.79,15.79,0,0,1-10.5,15l-63.44,23.07L143,229.5a16,16,0,0,1-30,0L89.94,166.06,26.5,143a16,16,0,0,1,0-30L89.94,89.94,113,26.5a16,16,0,0,1,30,0l23.07,63.44L229.5,113A15.79,15.79,0,0,1,240,128Z" />
  </svg>
);

export interface PricingFeature {
  text: string;
  included?: boolean;
}

export interface PricingPlan {
  id: string;
  name: string;
  title?: string;
  subtitle?: string;
  description?: string;
  price: string;
  originalPrice?: string;
  period?: string;
  badge?: string;
  isBest?: boolean;
  best?: boolean;
  recommended?: boolean;
  bgClassName?: string;
  borderClassName?: string;
  buttonText?: string;
  whatsappMessage?: string;
  whatsappPhone?: string;
  ctaHref?: string;
  featuresTitle?: string;
  features: (string | PricingFeature)[];
}

export interface PricingTierGroup {
  id: string;
  label: string;
  sublabel?: string;
  badge?: string;
  icon?: React.ReactNode;
  plans: PricingPlan[];
}

export type PricingTheme =
  | "orange"
  | "emerald"
  | "purple"
  | "blue"
  | "satucerita"
  | "default";

export interface PricingCardProps {
  plan: PricingPlan;
  category?: string;
  index?: number;
  theme?: PricingTheme;
  whatsappPhone?: string;
  className?: string;
  onCtaClick?: (plan: PricingPlan, e: React.MouseEvent) => void;
}

/**
 * PricingCard Component
 *
 * Exact cupsiteproject.com structure and styling:
 * - Regular cards: pure crisp white background (bg-white) with dark text
 * - Best / Recommended card: refined, harmonious gradient with crisp white text
 * - 4-point Sparkle icon point
 * - Button hover shine sweep using before: transition
 * - Floating Best badge
 * - Direct WhatsApp CTA
 */
export const PricingCard: React.FC<PricingCardProps> = ({
  plan,
  category = "",
  index = 0,
  theme = "default",
  whatsappPhone,
  className = "",
  onCtaClick,
}) => {
  const { lang } = useLanguage();
  const isBest = Boolean(plan.isBest || plan.best || plan.recommended);
  const planTitle = plan.title || plan.name;
  const planDescription = plan.description || plan.subtitle;
  const planPeriod = plan.period || (lang === "id" ? "/ Projek" : "/ Project");

  const phone =
    whatsappPhone || plan.whatsappPhone || personalInfo.whatsapp || "6289528005812";
  const cleanPhone = phone.replace(/[^0-9]/g, "");

  // Prefilled WhatsApp message matching cupsiteproject format
  const defaultWaMessage =
    lang === "id"
      ? `Halo kak saya tertarik untuk membuat website ${
          category ? category + " " : ""
        }dengan paket ${planTitle}, bisa saya minta info nya lebih lanjut?`
      : `Hi, I am interested in building a website ${
          category ? `for ${category} ` : ""
        }with the ${planTitle} package (${plan.price}). Could you provide more details?`;

  const waMessage = plan.whatsappMessage || defaultWaMessage;
  const waLink =
    plan.ctaHref ||
    `https://wa.me/${cleanPhone}?text=${encodeURIComponent(waMessage)}`;

  // Theme-specific gradients for the Best card (carefully balanced, non-jarring hues)
  const themeGradients = {
    purple: {
      bestCardBg:
        "bg-gradient-to-br from-[#451e9e] via-[#3b1fa8] to-[#2c2692] text-white border-white/20 shadow-[0_20px_50px_rgba(69,30,158,0.3)]",
      badgeBg:
        "bg-gradient-to-r from-[#5e2cd1] via-[#5b8dff] to-[#5e2cd1] text-white shadow-[0_0_32px_rgba(94,44,209,0.6)]",
      bestBtn:
        "bg-white/15 hover:bg-white/25 text-white border-white/25 shadow-md",
    },
    orange: {
      bestCardBg:
        "bg-gradient-to-br from-[#b43403] via-[#9a2c02] to-[#7c2d12] text-white border-white/20 shadow-[0_20px_50px_rgba(180,52,3,0.3)]",
      badgeBg:
        "bg-gradient-to-r from-orange-500 via-amber-500 to-orange-600 text-white shadow-[0_0_32px_rgba(249,115,22,0.6)]",
      bestBtn:
        "bg-white/15 hover:bg-white/25 text-white border-white/25 shadow-md",
    },
    emerald: {
      bestCardBg:
        "bg-gradient-to-br from-[#065f46] via-[#064e3b] to-[#043d2e] text-white border-white/20 shadow-[0_20px_50px_rgba(6,95,70,0.3)]",
      badgeBg:
        "bg-gradient-to-r from-emerald-500 via-green-500 to-emerald-600 text-white shadow-[0_0_32px_rgba(16,185,129,0.6)]",
      bestBtn:
        "bg-white/15 hover:bg-white/25 text-white border-white/25 shadow-md",
    },
    blue: {
      bestCardBg:
        "bg-gradient-to-br from-[#2b4cdd] via-[#516cff] to-[#89bcf7] text-white border-white/20 shadow-[0_20px_50px_rgba(81,108,255,0.35)]",
      badgeBg:
        "bg-gradient-to-r from-[#516cff] via-[#89bcf7] to-[#516cff] text-white shadow-[0_0_32px_rgba(81,108,255,0.6)]",
      bestBtn:
        "bg-white/15 hover:bg-white/25 text-white border-white/25 shadow-md",
    },
    satucerita: {
      bestCardBg:
        "bg-gradient-to-br from-[#5b48cf] via-[#7d6aee] to-[#ad9fff] text-white border-white/20 shadow-[0_20px_50px_rgba(125,106,238,0.35)]",
      badgeBg:
        "bg-gradient-to-r from-[#7d6aee] via-[#ad9fff] to-[#7d6aee] text-white shadow-[0_0_32px_rgba(125,106,238,0.6)]",
      bestBtn:
        "bg-white/15 hover:bg-white/25 text-white border-white/25 shadow-md",
    },
    default: {
      bestCardBg:
        "bg-gradient-to-br from-[#451e9e] via-[#3b1fa8] to-[#2c2692] text-white border-white/20 shadow-[0_20px_50px_rgba(69,30,158,0.3)]",
      badgeBg:
        "bg-gradient-to-r from-[#5e2cd1] via-[#5b8dff] to-[#5e2cd1] text-white shadow-[0_0_32px_rgba(94,44,209,0.6)]",
      bestBtn:
        "bg-white/15 hover:bg-white/25 text-white border-white/25 shadow-md",
    },
  }[theme];

  const handleCta = (e: React.MouseEvent) => {
    if (onCtaClick) {
      onCtaClick(plan, e);
      return;
    }
    window.open(waLink, "_blank", "noopener,noreferrer");
  };

  const badgeText =
    plan.badge || (lang === "id" ? "Rekomendasi Terbaik" : "Best Recommendation");
  const ctaButtonText =
    plan.buttonText || (lang === "id" ? "Book 1:1 Meeting" : "Book 1:1 Meeting");
  const includedTitle =
    plan.featuresTitle || (lang === "id" ? "What's Included :" : "What's Included :");

  return (
    <div
      className={`group relative rounded-xl px-5 md:px-8 py-8 md:py-10 transition-all duration-300 flex flex-col justify-between h-full select-none ${
        isBest
          ? `${themeGradients.bestCardBg} border z-20`
          : "bg-white text-neutral-900 border border-neutral-200/90 shadow-sm hover:shadow-xl hover:border-neutral-300 z-10"
      } ${className}`}
    >
      {/* Floating Best Badge on Top matching cupsiteproject */}
      {isBest && (
        <p
          className={`group absolute -top-5 left-1/2 -translate-x-1/2 text-nowrap w-max justify-center flex items-center gap-2 py-2 px-8 rounded-full font-medium transition-all duration-500 text-sm md:text-base ${themeGradients.badgeBg}`}
        >
          {badgeText}
        </p>
      )}

      {/* Card Shimmer / Shiny Glint Sweep Effect on Hover & Release */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-[inherit] z-10">
        <div
          className={`absolute top-0 -left-full w-full h-full bg-gradient-to-r ${
            isBest
              ? "from-transparent via-white/15 to-transparent"
              : "from-transparent via-neutral-900/[0.04] to-transparent"
          } -skew-x-12 transition-transform duration-1000 ease-out group-hover:translate-x-[250%]`}
        />
      </div>

      {/* Card Top Section: Title, Description, Price & CTA */}
      <div className="relative z-20 mb-4 md:mb-6">
        {/* Title & Description */}
        <div className="mb-5">
          <h3
            className={`text-xl md:text-2xl mb-2 font-medium tracking-tight ${
              isBest ? "text-white" : "text-neutral-900"
            }`}
          >
            {planTitle}
          </h3>
          {planDescription && (
            <p
              className={`leading-[1.3] text-sm md:text-base min-h-[44px] ${
                isBest ? "text-white/80" : "text-neutral-600"
              }`}
            >
              {planDescription}
            </p>
          )}
        </div>

        {/* Price & Primary CTA */}
        <div>
          <p
            className={`text-xl md:text-2xl font-medium mb-3 flex items-baseline gap-1.5 ${
              isBest ? "text-white" : "text-neutral-900"
            }`}
          >
            <span className="font-semibold">{plan.price}</span>
            <span
              className={`text-sm font-normal ${
                isBest ? "text-white/70" : "text-neutral-500"
              }`}
            >
              {planPeriod}
            </span>
            {plan.originalPrice && (
              <span
                className={`text-xs line-through ml-2 ${
                  isBest ? "text-white/50" : "text-neutral-400"
                }`}
              >
                {plan.originalPrice}
              </span>
            )}
          </p>

          {/* CTA Button matching cupsiteproject before: shine transition */}
          <a
            href={waLink}
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleCta}
            className={`group/btn relative overflow-hidden font-medium flex justify-center items-center gap-2 lg:gap-3 px-4 lg:px-6 py-3 text-sm lg:text-base rounded-full transition-all duration-300 active:scale-95 cursor-pointer select-none before:ease-in-out before:absolute before:right-0 before:top-0 before:h-full before:w-6 before:translate-x-12 before:rotate-6 before:bg-white before:opacity-15 before:duration-700 before:transition-transform hover:before:-translate-x-72 ${
              isBest
                ? `${themeGradients.bestBtn} border`
                : "bg-neutral-100 hover:bg-neutral-200/90 text-neutral-900 border border-neutral-200/90 shadow-xs"
            }`}
          >
            {/* Live Indicator Dot (Green pulse) */}
            <div
              className={`relative z-10 size-2 lg:size-2.5 rounded-full transition-all duration-300 ${
                isBest
                  ? "bg-lime-400 shadow-[0_0_8px_rgba(163,230,53,0.8)] group-hover/btn:bg-lime-300 group-hover/btn:scale-125 group-hover/btn:shadow-[0_0_12px_rgba(163,230,53,1)]"
                  : "bg-lime-700 shadow-[0_0_8px_rgba(77,124,15,0.5)] group-hover/btn:bg-lime-500 group-hover/btn:scale-125 group-hover/btn:shadow-[0_0_12px_rgba(132,204,22,0.8)]"
              }`}
            />

            {/* CTA Label */}
            <span className="relative z-10 whitespace-nowrap font-medium">
              {ctaButtonText}
            </span>
          </a>
        </div>
      </div>

      {/* Feature List ("What's Included :") */}
      <div className="relative z-20">
        <p
          className={`text-sm md:text-base leading-[1.3] mb-4 font-medium ${
            isBest ? "text-white/90" : "text-neutral-600"
          }`}
        >
          {includedTitle}
        </p>
        <ul className="flex flex-col gap-2">
          {plan.features.map((feature, fIdx) => {
            const text = typeof feature === "string" ? feature : feature.text;
            const isIncluded =
              typeof feature === "string" || feature.included !== false;

            return (
              <li
                key={fIdx}
                className={`flex items-start gap-3 text-sm md:text-base ${
                  isBest
                    ? isIncluded
                      ? "text-white"
                      : "text-white/40 line-through"
                    : isIncluded
                    ? "text-neutral-800"
                    : "text-neutral-400 line-through"
                }`}
              >
                <SparkleIcon
                  className={`size-4 mt-0.5 shrink-0 ${
                    isBest ? "text-white" : "text-neutral-900"
                  }`}
                />
                <p className="leading-snug text-sm md:text-base">{text}</p>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export interface PricingSectionProps {
  id?: string;
  badge?: string;
  title?: string;
  subtitle?: string;
  tierGroups?: PricingTierGroup[];
  plans?: PricingPlan[];
  theme?: PricingTheme;
  whatsappPhone?: string;
  className?: string;
  defaultTierId?: string;
}

/**
 * PricingSection Component
 *
 * Exact cupsiteproject.com layout, typography, 4-point sparkle icon point,
 * MultiSwitch capsule switcher, and GSAP scrollTrigger + category exit/enter blur animations.
 */
export const PricingSection: React.FC<PricingSectionProps> = ({
  id = "pricing",
  badge,
  title,
  subtitle,
  tierGroups,
  plans,
  theme = "default",
  whatsappPhone = "6289528005812",
  className = "",
  defaultTierId,
}) => {
  const { lang } = useLanguage();

  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const switchRef = useRef<HTMLDivElement>(null);
  const cardsContainerRef = useRef<HTMLDivElement>(null);

  // Tier groups: use cupsiteproject data by default or custom groups if passed
  const effectiveTierGroups: PricingTierGroup[] =
    tierGroups ||
    (plans
      ? [{ id: "all", label: "All Plans", plans }]
      : theme === "emerald"
      ? getYobssTierGroups(lang)
      : getCupsiteTierGroups(lang));

  const [activeTierId, setActiveTierId] = useState<string>(
    defaultTierId || effectiveTierGroups[0]?.id || ""
  );

  const activeGroup =
    effectiveTierGroups.find((g) => g.id === activeTierId) ||
    effectiveTierGroups[0];

  const currentPlans = activeGroup ? activeGroup.plans : [];

  const defaultTitleText =
    title ||
    (lang === "id"
      ? "Pilih paket investasi sesuai dengan kebutuhan bisnis kamu"
      : "Select the right investment package for your business needs");

  const defaultSubtitleText =
    subtitle ||
    (lang === "id"
      ? "Setiap paket mencakup semua kebutuhan utama untuk meluncurkan website profesional, sehingga Anda dapat memulai dengan tenang."
      : "Every package includes all key essentials to launch a professional website, so you can start with peace of mind.");

  // Prepare options for MultiSwitch
  const switchOptions: MultiSwitchOption[] = effectiveTierGroups.map((group) => ({
    id: group.id,
    label: group.label,
    sublabel: group.sublabel,
    badge: group.badge,
    icon: group.icon,
  }));

  const hasMultipleTiers = effectiveTierGroups.length > 1;

  // Refresh ScrollTrigger on mount
  useEffect(() => {
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  // Exact cupsiteproject GSAP entrance animation on scroll into view
  const { contextSafe } = useGSAP(
    () => {
      const headerChildren = headerRef.current?.children || [];
      const switchButtons = switchRef.current?.children || [];
      const cards = cardsContainerRef.current?.children || [];

      gsap.set(headerChildren, { y: 30, opacity: 0, filter: "blur(10px)" });
      gsap.set(switchButtons, {
        scale: 0.9,
        opacity: 0,
        y: 15,
        filter: "blur(10px)",
      });
      gsap.set(cards, { y: 50, opacity: 0, filter: "blur(10px)" });

      gsap
        .timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            once: true,
          },
        })
        .to(headerChildren, {
          y: 0,
          opacity: 1,
          filter: "blur(0px)",
          duration: 0.6,
          stagger: 0.2,
          ease: "power3.out",
        })
        .to(
          switchButtons,
          {
            scale: 1,
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            duration: 0.5,
            stagger: 0.1,
            ease: "back.out(1.5)",
          },
          "-=0.4"
        )
        .to(
          cards,
          {
            y: 0,
            opacity: 1,
            filter: "blur(0px)",
            duration: 0.6,
            stagger: 0.1,
            ease: "power3.out",
          },
          "-=0.2"
        );
    },
    { scope: sectionRef }
  );

  // Exact cupsiteproject GSAP transition when user switches category
  const handleTierChange = contextSafe((targetTierId: string) => {
    if (targetTierId === activeTierId) return;

    const cards = cardsContainerRef.current?.children || [];

    // 1. Cards exit down with blur(10px) and fade out
    gsap.to(cards, {
      y: 20,
      opacity: 0,
      filter: "blur(10px)",
      duration: 0.3,
      stagger: 0.05,
      ease: "power2.in",
      onComplete: () => {
        // 2. Change active category
        setActiveTierId(targetTierId);

        // 3. New cards cascade in from y: 50, blur(10px) to y: 0, blur(0px)
        setTimeout(() => {
          const newCards = cardsContainerRef.current?.children || [];
          gsap.fromTo(
            newCards,
            { y: 50, opacity: 0, filter: "blur(10px)" },
            {
              y: 0,
              opacity: 1,
              filter: "blur(0px)",
              duration: 0.5,
              stagger: 0.1,
              ease: "power3.out",
            }
          );
        }, 0);
      },
    });
  });

  return (
    <section
      ref={sectionRef}
      id={id}
      className={`px-5 md:px-20 lg:px-45 2xl:px-56 py-10 md:py-20 2xl:container 2xl:mx-auto relative ${className}`}
    >
      {/* Header Section matching cupsiteproject.com */}
      <div
        ref={headerRef}
        className="flex flex-col items-center justify-center mb-6 md:mb-10"
      >
        <h2 className="text-3xl md:text-5xl leading-tight text-center mb-3 md:w-[65%] font-medium tracking-tight text-neutral-900">
          {defaultTitleText}
        </h2>
        <p className="text-base lg:text-lg text-neutral-600 w-full md:w-[60%] text-center">
          {defaultSubtitleText}
        </p>
      </div>

      {/* MultiSwitch Capsule Row */}
      {hasMultipleTiers && (
        <MultiSwitch
          ref={switchRef}
          options={switchOptions}
          value={activeTierId}
          onChange={handleTierChange}
          variant={
            theme === "orange"
              ? "orange"
              : theme === "emerald"
              ? "emerald"
              : theme === "blue"
              ? "blue"
              : theme === "satucerita"
              ? "satucerita"
              : "purple"
          }
          size="md"
        />
      )}

      {/* Pricing Cards Grid matching cupsiteproject */}
      <div
        ref={cardsContainerRef}
        className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-5"
      >
        {currentPlans.map((plan, i) => {
          const isBest = Boolean(plan.isBest || plan.best || plan.recommended);

          return (
            <div
              key={plan.id || i}
              className={isBest ? "md:-translate-y-6" : ""}
            >
              <PricingCard
                plan={plan}
                category={activeGroup?.label || ""}
                index={i}
                theme={theme}
                whatsappPhone={whatsappPhone}
              />
            </div>
          );
        })}
      </div>
    </section>
  );
};

/**
 * Exact cupsiteproject.com data for all 4 categories:
 * 1. Landing Page
 * 2. Website Company Profile
 * 3. Website Tour & Travel
 * 4. Website E-commerce
 */
export function getCupsiteTierGroups(lang: "id" | "en"): PricingTierGroup[] {
  return [
    {
      id: "landing-page",
      label: "Landing Page",
      plans: [
        {
          id: "landing-ekonomis",
          title: "Paket Ekonomis",
          name: "Paket Ekonomis",
          description:
            lang === "id"
              ? "Landing page cepat jadi buat bisnis yang baru mulai atau butuh promo singkat."
              : "Fast turnaround landing page for startups or short promotion campaigns.",
          price: "Rp. 1.250.000",
          period: lang === "id" ? "/ Projek" : "/ Project",
          isBest: false,
          features: [
            "1 halaman landing page",
            "Hingga 5 section (Hero, About, Layanan, Testimoni, CTA)",
            "CTA tombol WhatsApp",
            "Basic SEO (title, meta description)",
            "Gratis domain (.com) 1 tahun",
            "Shared hosting 6 bulan",
            "1 Email Bisnis",
            "1 GB Storage",
            "Revisi 1x",
          ],
        },
        {
          id: "landing-profesional",
          title: "Paket Profesional",
          name: "Paket Profesional",
          description:
            lang === "id"
              ? "Landing page yang jualan dengan copywriting & form leads, buat bisnis yang serius nambah customer."
              : "High-conversion sales page with copywriting and leads integration.",
          price: "Rp. 2.300.000",
          period: lang === "id" ? "/ Projek" : "/ Project",
          isBest: true,
          badge: lang === "id" ? "Rekomendasi Terbaik" : "Best Recommendation",
          features: [
            "Semua fitur dari paket Ekonomis",
            "1 halaman landing page scroll panjang",
            "Copywriting Marketing Gratis (Headline, CTA, Benefit)",
            "Form leads terintegrasi WhatsApp / Email",
            "Integrasi Google Maps / Pixel",
            "Hosting 1 tahun",
            "3 GB Storage",
            "Revisi 2x",
          ],
        },
        {
          id: "landing-premium",
          title: "Paket Premium",
          name: "Paket Premium",
          description:
            lang === "id"
              ? "Landing page eksklusif dengan desain interaktif & animasi halus untuk konversi maksimal."
              : "Exclusive landing page with interactive design and fluid animations.",
          price: "Rp. 3.200.000",
          period: lang === "id" ? "/ Projek" : "/ Project",
          isBest: false,
          features: [
            "Semua fitur dari paket Profesional",
            "Desain Interaktif (animasi halus & elemen visual dinamis)",
            "A/B testing layout sederhana",
            "Optimasi Kecepatan Website (image compression, lazyload, caching)",
            "Integrasi Google Analytics",
            "Revisi 3x",
          ],
        },
      ],
    },
    {
      id: "company-profile",
      label: "Website Company Profile",
      plans: [
        {
          id: "company-ekonomis",
          title: "Paket Ekonomis",
          name: "Paket Ekonomis",
          description:
            lang === "id"
              ? "Pilihan hemat untuk UMKM & startup yang butuh kredibilitas online cepat dengan halaman profil esensial."
              : "Budget-friendly option for SMBs and startups needing quick online credibility.",
          price: "Rp. 2.000.000",
          period: lang === "id" ? "/ Projek" : "/ Project",
          isBest: false,
          features: [
            "Hingga 3 halaman (Home, Tentang Kami, Kontak)",
            "CTA tombol WhatsApp",
            "Desain clean & profesional",
            "Gratis domain (.com) 1 tahun",
            "Shared hosting 6 bulan",
            "Basic SEO (title & meta description)",
            "1 Email Bisnis",
            "1 GB Storage",
            "Revisi 1x",
          ],
        },
        {
          id: "company-profesional",
          title: "Paket Profesional",
          name: "Paket Profesional",
          description:
            lang === "id"
              ? "Cocok untuk perusahaan berkembang yang butuh halaman lengkap, copywriting memikat, dan integrasi fitur lebih luas."
              : "Ideal for growing businesses needing a complete showcase with compelling copywriting.",
          price: "Rp. 3.600.000",
          period: lang === "id" ? "/ Projek" : "/ Project",
          isBest: true,
          badge: lang === "id" ? "Rekomendasi Terbaik" : "Best Recommendation",
          features: [
            "Semua fitur dari paket Ekonomis",
            "Hingga 6 halaman (Home, Tentang Kami, Layanan, Galeri/Portfolio, Blog/Artikel, Kontak)",
            "Desain professional sesuai branding",
            "Form kontak + CTA WhatsApp",
            "Copywriting Marketing Gratis (Headline, CTA, Benefit)",
            "SEO On-Page Basic (meta title, slug, heading structure)",
            "Integrasi Google Maps / sosial media",
            "Hosting 1 tahun",
            "5 GB Storage",
            "Revisi 2x",
          ],
        },
        {
          id: "company-premium",
          title: "Paket Premium",
          name: "Paket Premium",
          description:
            lang === "id"
              ? "Khusus untuk brand eksklusif yang menginginkan desain interaktif, performa maksimal, dan kustomisasi tanpa batas."
              : "Bespoke company profile for premium brands with high-performance customization.",
          price: "Rp. 4.500.000",
          period: lang === "id" ? "/ Projek" : "/ Project",
          isBest: false,
          features: [
            "Semua fitur dari paket Profesional",
            "Website company profile full custom",
            "Hingga 10 halaman (atau sesuai kebutuhan)",
            "Form kontak lanjutan (email / WhatsApp)",
            "Desain Interaktif (animasi halus & elemen visual dinamis)",
            "Optimasi Kecepatan Website (image compression, lazyload, caching)",
            "Integrasi Google Analytics",
            "Revisi 3x",
          ],
        },
      ],
    },
    {
      id: "tour-travel",
      label: "Website Tour & Travel",
      plans: [
        {
          id: "tour-ekonomis",
          title: "Paket Ekonomis",
          name: "Paket Ekonomis",
          description:
            lang === "id"
              ? "Untuk agen travel baru yang ingin memamerkan paket wisatanya secara online."
              : "For new tour and travel agencies looking to present packages online.",
          price: "Rp. 2.500.000",
          period: lang === "id" ? "/ Projek" : "/ Project",
          isBest: false,
          features: [
            "Website travel company profile",
            "Landing page utama",
            "Hingga 4 halaman (Home, Paket Wisata, Tentang Kami, Kontak)",
            "Desain profesional & clean",
            "Halaman daftar paket wisata",
            "Detail paket (deskripsi, harga, durasi)",
            "CTA Booking via WhatsApp",
            "Galeri foto destinasi",
            "Gratis domain (.com) 1 tahun",
            "Shared hosting 6 bulan",
            "Basic SEO (title & meta description)",
            "1 Email Bisnis",
            "1 GB Storage",
            "Garansi Perawatan 15 Hari",
            "Revisi 1x",
          ],
        },
        {
          id: "tour-profesional",
          title: "Paket Profesional",
          name: "Paket Profesional",
          description:
            lang === "id"
              ? "Solusi lengkap dengan sistem kategori paket tour dan form pemesanan terintegrasi WhatsApp."
              : "Complete tour solution with category filtering and WhatsApp booking.",
          price: "Rp. 4.500.000",
          period: lang === "id" ? "/ Projek" : "/ Project",
          isBest: true,
          badge: lang === "id" ? "Rekomendasi Terbaik" : "Best Recommendation",
          features: [
            "Semua fitur dari paket Ekonomis",
            "Hingga 7 halaman (Home, Paket Tour, Detail Paket, Tentang Kami, Testimoni, Galeri, Kontak)",
            "Desain professional sesuai branding travel",
            "Sistem kategori paket (One Day Tour, Full Day Tour, Honeymoon, Group Tour, dll)",
            "Copywriting Marketing Gratis (Headline, CTA, Benefit)",
            "SEO On-Page Basic (meta title, slug, heading structure)",
            "CTA WhatsApp + form booking",
            "Halaman testimoni pelanggan",
            "Integrasi Google Maps",
            "SEO on-page dasar",
            "Optimasi kecepatan website",
            "Hosting 1 tahun",
            "5 GB Storage",
            "Revisi 2x",
          ],
        },
        {
          id: "tour-premium",
          title: "Paket Premium",
          name: "Paket Premium",
          description:
            lang === "id"
              ? "Platform travel berskala besar dengan sistem booking lengkap dan desain eksklusif."
              : "Large-scale travel platform with full booking system and premium styling.",
          price: "Rp. 7.400.000",
          period: lang === "id" ? "/ Projek" : "/ Project",
          isBest: false,
          features: [
            "Semua fitur dari paket Profesional",
            "Website travel full custom & high-conversion",
            "Hingga 10–12 halaman (atau sesuai kebutuhan)",
            "Desain Interaktif (animasi halus & elemen visual dinamis)",
            "Struktur website ramah SEO",
            "Halaman paket wisata lengkap & detail (Itinerary, include-exclude, harga, highlight)",
            "Integrasi Payment Gateway (Midtrans / Tripay / Xendit / Stripe)",
            "Dashboard Admin (Kelola konten, booking, & transaksi)",
            "Tombol “Book & Bayar Sekarang” di setiap halaman paket",
            "Form booking lanjutan (tanggal, jumlah peserta)",
            "Halaman blog / artikel wisata",
            "Testimoni + galeri dokumentasi tamu",
            "Integrasi Google Analytics",
            "Optimasi Kecepatan Website (image compression, lazyload, caching)",
            "Revisi 3x",
          ],
        },
      ],
    },
    {
      id: "ecommerce",
      label: "Website E-commerce",
      plans: [
        {
          id: "ecommerce-ekonomis",
          title: "Paket Ekonomis",
          name: "Paket Ekonomis",
          description:
            lang === "id"
              ? "Toko online simpel dan cepat untuk mulai berjualan dengan checkout via WhatsApp."
              : "Fast and lightweight online shop with direct WhatsApp checkout.",
          price: "Rp. 2.500.000",
          period: lang === "id" ? "/ Projek" : "/ Project",
          isBest: false,
          features: [
            "Website toko online",
            "Hingga 4 halaman (Home, List Produk, Tentang Kami, Kontak)",
            "Hingga 10 produk",
            "Halaman utama (Home)",
            "Halaman produk & detail produk",
            "Checkout via whatsapp",
            "Gambar Produk, Harga, Deskripsi Singkat",
            "Section Testimoni / FAQ / Promo",
            "Gratis domain (.com) 1 tahun",
            "Shared hosting 6 bulan",
            "Basic SEO (title & meta description)",
            "1 Email Bisnis",
            "1 GB Storage",
          ],
        },
        {
          id: "ecommerce-profesional",
          title: "Paket Profesional",
          name: "Paket Profesional",
          description:
            lang === "id"
              ? "Toko online lengkap dengan kategori produk dan keranjang belanja terintegrasi WhatsApp."
              : "Comprehensive online store with product filtering and cart to WhatsApp.",
          price: "Rp. 4.500.000",
          period: lang === "id" ? "/ Projek" : "/ Project",
          isBest: true,
          badge: lang === "id" ? "Rekomendasi Terbaik" : "Best Recommendation",
          features: [
            "Semua fitur dari paket Ekonomis",
            "Hingga 7 Halaman (Home, Shop, About Us, Contact, FAQ, Testimoni, Promo)",
            "Hingga 30 produk",
            "Kategori produk",
            "Detail produk lengkap (harga, deskripsi, foto)",
            "Fitur Search / Filter Produk",
            "Tombol “Tambah ke Keranjang” -> Checkout via WhatsApp",
            "SEO On-Page Basic (meta title, slug, heading structure)",
            "Optimasi kecepatan website",
            "Hosting 1 tahun",
            "5 GB Storage",
            "Revisi 2x",
          ],
        },
        {
          id: "ecommerce-premium",
          title: "Paket Premium",
          name: "Paket Premium",
          description:
            lang === "id"
              ? "Website e-commerce eksklusif dengan otomatisasi pembayaran, ongkir, dan manajemen pesanan menyeluruh."
              : "Full-scale custom e-commerce with automated payments, shipping, and dashboard.",
          price: "Rp. 8.200.000",
          period: lang === "id" ? "/ Projek" : "/ Project",
          isBest: false,
          features: [
            "Semua fitur dari paket Profesional",
            "Website toko online full custom",
            "Sistem Keranjang Belanja Otomatis",
            "Integrasi Payment Gateway (Midtrans / Tripay / Xendit / Stripe)",
            "Metode Pembayaran: Transfer, QRIS, e-Wallet, Credit Card",
            "Dashboard Admin (Order, Produk, Stok, Diskon, User, dll)",
            "Checkout Otomatis + Email Notifikasi",
            "Ongkir Otomatis (via plugin ekspedisi)",
            "Mobile Friendly Cart Experience",
            "Integrasi Google Analytics",
            "Optimasi Kecepatan Website (image compression, lazyload, caching)",
            "Revisi 3x",
          ],
        },
      ],
    },
  ];
}

/**
 * Yobss System Tier Groups (Emerald Theme)
 */
export function getYobssTierGroups(lang: "id" | "en"): PricingTierGroup[] {
  return [
    {
      id: "modules",
      label: lang === "id" ? "Modul Sistem" : "System Modules",
      plans: [
        {
          id: "starter-pos",
          title: "Starter POS",
          name: "Starter POS",
          description:
            lang === "id"
              ? "Sistem kasir dan inventaris modern untuk UMKM yang butuh pembukuan rapi."
              : "Modern POS and stock management for retail and growing businesses.",
          price: "Rp 2.499.000",
          period: lang === "id" ? "/ Lisensi" : "/ License",
          isBest: false,
          features: [
            "Multi-Device Cashier POS (Tablet & Desktop)",
            "Real-Time Inventory & Peringatan Stok Rendah",
            "Integrasi Printer Kasir & Thermal Receipt",
            "Rekap Penjualan Harian & Laporan Shift",
            "Mode Offline (Tetap Beroperasi Tanpa Internet)",
            "1 Email Bisnis & Panduan Penggunaan",
            "Garansi Teknis & Update 3 Bulan",
          ],
        },
        {
          id: "business-suite",
          title: "Business Suite",
          name: "Business Suite",
          description:
            lang === "id"
              ? "Sistem terpadu kasir, gudang, keuangan, dan sinkronisasi multi-cabang."
              : "Integrated POS, multi-warehouse, finance & multi-branch ERP.",
          price: "Rp 4.999.000",
          period: lang === "id" ? "/ Lisensi" : "/ License",
          isBest: true,
          badge: lang === "id" ? "Rekomendasi Terbaik" : "Best Recommendation",
          features: [
            "Semua fitur dari Starter POS",
            "Sinkronisasi Multi-Cabang & Multi-Gudang",
            "Laporan Laba Rugi & General Ledger Otomatis",
            "Manajemen Supplier & Purchase Order",
            "Hak Akses Karyawan Berjenjang (Role-Based Access)",
            "Kirim Nota Otomatis via WhatsApp Pelanggan",
            "Database Terpisah (100% Kepemilikan Data Anda)",
            "Dukungan Teknis Prioritas 6 Bulan",
          ],
        },
        {
          id: "custom-erp",
          title: "Enterprise ERP",
          name: "Enterprise ERP",
          description:
            lang === "id"
              ? "Arsitektur kustom yang disesuaikan persis dengan workflow dan kebutuhan unik bisnis Anda."
              : "Bespoke system architecture tailored to complex enterprise workflows.",
          price: "Rp 9.999.000",
          period: lang === "id" ? "/ Lisensi" : "/ License",
          isBest: false,
          features: [
            "Semua fitur dari Business Suite",
            "Custom Workflow & Pemodelan Proses Bisnis Penuh",
            "Integrasi Payment Gateway & Virtual Account Bank",
            "Custom CRM & Sistem Poin Loyalitas Pelanggan",
            "Deployment ke Private Cloud / Server On-Premise",
            "Pelatihan Karyawan Langsung (Hands-on Training)",
            "SLA Prioritas 24/7 & Dedicated Tech Lead 1 Tahun",
          ],
        },
      ],
    },
    {
      id: "subscription",
      label: lang === "id" ? "Langganan Cloud" : "Cloud Subscription",
      plans: [
        {
          id: "cloud-monthly",
          title: "Cloud Bulanan",
          name: "Cloud Bulanan",
          description:
            lang === "id"
              ? "Akses cloud fleksibel tanpa komitmen jangka panjang, siap pakai seketika."
              : "Flexible monthly cloud access with zero upfront commitment.",
          price: "Rp 199.000",
          period: lang === "id" ? "/ Bulan" : "/ Month",
          isBest: false,
          features: [
            "Akses Cloud Server Otomatis & Terkelola",
            "Unlimited Transaksi Harian di Semua Kasir",
            "Auto Backup Cloud Harian (Data Terlindungi)",
            "Dukungan Teknis via WhatsApp (Jam Kerja)",
            "Update Fitur & Patch Keamanan Rutin",
          ],
        },
        {
          id: "cloud-annual",
          title: "Cloud Tahunan",
          name: "Cloud Tahunan",
          description:
            lang === "id"
              ? "Pilihan paling hemat dengan gratis setup & migrasi data produk awal."
              : "Best value cloud package with free setup and priority onboarding.",
          price: "Rp 159.000",
          period: lang === "id" ? "/ Bulan (Tahunan)" : "/ Mo (Annually)",
          isBest: true,
          badge: lang === "id" ? "Rekomendasi Terbaik" : "Best Recommendation",
          features: [
            "Semua Fitur Cloud Bulanan",
            "Hemat 20% (Bayar 10 Bulan, Dapat 12 Bulan)",
            "Gratis Bantuan Setup & Migrasi Data Produk Awal",
            "Dedicated Account Manager (Respons Prioritas)",
            "Kustom Subdomain Bisnis (system.brandanda.com)",
            "Dukungan Teknis WhatsApp Prioritas 24/7",
          ],
        },
      ],
    },
  ];
}

export default PricingSection;
