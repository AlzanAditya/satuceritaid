import React from "react";
import { YobssHeroSection } from "../../components/apps/yobss/YobssHeroSection";
import { PricingSection } from "../../components/Section/PricingSection";
import { useSeo } from "../../hooks/useSeo";
import { useLanguage } from "../../context/LanguageContext";
import { home as yobssHome } from "../../locales/yobss/home";

interface YobssHomePageProps {
  onNavigate?: (path: string) => void;
}

export const YobssHomePage: React.FC<YobssHomePageProps> = ({ onNavigate }) => {
  const { lang } = useLanguage();
  const content = yobssHome[lang];

  useSeo({
    title: `Yobss - Your Business System | ${content.hero.titlePart1} ${content.hero.titlePart2}`,
    description: content.hero.description,
    image: "/logos/yobss.png",
    imageWidth: 256,
    imageHeight: 256,
    url: "/apps/yoobs",
    siteName: "Yobss - Your Business System",
    type: "website",
  });

  return (
    <main className="flex flex-col w-full overflow-x-clip">
      <YobssHeroSection onNavigate={onNavigate} />
      <div id="features" className="scroll-mt-24" />
      <PricingSection
        id="pricing"
        theme="emerald"
        badge={lang === "id" ? "Investasi Sistem Bisnis" : "System Pricing & Plans"}
        title={
          lang === "id"
            ? "Pilihan Paket Sistem Sesuai Skala Usaha"
            : "Modular Business System Tailored for Growth"
        }
        subtitle={
          lang === "id"
            ? "Mulai dari kasir UMKM hingga Enterprise ERP terpadu. Dukungan teknis penuh dan data 100% milik Anda."
            : "From modern retail POS to enterprise multi-branch ERP. Full technical support with complete data ownership."
        }
      />
      <div id="testimonial" className="scroll-mt-24" />
      <div id="contact" className="scroll-mt-24" />
      <div id="pre-order" className="scroll-mt-24" />
      <div id="modules" className="scroll-mt-24" />
    </main>
  );
};

export default YobssHomePage;
