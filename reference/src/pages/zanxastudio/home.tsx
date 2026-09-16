import React from "react";
import { ZanxaStudioHeroSection } from "../../components/apps/zanxastudio/ZanxaStudioHeroSection";
import { PricingSection } from "../../components/Section/PricingSection";
import { useSeo } from "../../hooks/useSeo";
import { useLanguage } from "../../context/LanguageContext";
import { home as zanxaHome } from "../../locales/zanxastudio/home";

interface ZanxaStudioHomePageProps {
  onNavigate?: (path: string) => void;
}

export const ZanxaStudioHomePage: React.FC<ZanxaStudioHomePageProps> = ({
  onNavigate,
}) => {
  const { lang } = useLanguage();
  const content = zanxaHome[lang];

  useSeo({
    title: `Zanxa Studio | ${content.hero.title}`,
    description: content.hero.description,
    image: "/logos/zanxastudio.png",
    imageWidth: 256,
    imageHeight: 256,
    url: "/apps/zanxa-studio",
    siteName: "Zanxa Studio",
    type: "website",
  });

  return (
    <main className="flex flex-col w-full overflow-x-clip">
      <ZanxaStudioHeroSection onNavigate={onNavigate} />
      <div id="work" className="scroll-mt-24" />
      <div id="testimonial" className="scroll-mt-24" />
      <PricingSection
        id="pricing"
        theme="blue"
        badge={lang === "id" ? "Investasi Website" : "Website Investment Packages"}
        title={
          lang === "id"
            ? "Pilih paket investasi sesuai dengan kebutuhan bisnis kamu"
            : "Select the right investment package for your business needs"
        }
        subtitle={
          lang === "id"
            ? "Setiap paket mencakup semua kebutuhan utama untuk meluncurkan website profesional, sehingga Anda dapat memulai dengan tenang."
            : "Every package includes all key essentials to launch a professional website, so you can start with peace of mind."
        }
      />
      <div id="contact" className="scroll-mt-24" />
    </main>
  );
};

export default ZanxaStudioHomePage;
