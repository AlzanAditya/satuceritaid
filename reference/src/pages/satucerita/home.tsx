import React from "react";
import { SatuCeritaHeroSection } from "../../components/apps/satucerita/SatuCeritaHeroSection";
import { PricingSection, PricingTierGroup } from "../../components/Section/PricingSection";
import { useSeo } from "../../hooks/useSeo";
import { useLanguage } from "../../context/LanguageContext";
import { home as satuCeritaHome } from "../../locales/satucerita/home";

interface SatuCeritaHomePageProps {
  onNavigate?: (path: string) => void;
}

export const SatuCeritaHomePage: React.FC<SatuCeritaHomePageProps> = ({
  onNavigate,
}) => {
  const { lang } = useLanguage();
  const content = satuCeritaHome[lang];

  useSeo({
    title: `Satu Cerita | ${content.hero.title}`,
    description: content.hero.description,
    image: "/logos/satucerita.png",
    imageWidth: 256,
    imageHeight: 256,
    url: "/apps/satu-cerita",
    siteName: "Satu Cerita - Undangan Digital",
    type: "website",
  });

  // Digital Invitation Tier Groups tailored for Satu Cerita
  const satuCeritaTierGroups: PricingTierGroup[] = [
    {
      id: "wedding",
      label: lang === "id" ? "Undangan Pernikahan" : "Wedding Invitation",
      plans: [
        {
          id: "wedding-basic",
          title: lang === "id" ? "Paket Simple" : "Simple Plan",
          name: lang === "id" ? "Paket Simple" : "Simple Plan",
          description:
            lang === "id"
              ? "Pilihan hemat dan praktis untuk undangan pernikahan digital elegan."
              : "Practical and elegant choice for modern digital wedding invitations.",
          price: "Rp. 99.000",
          period: lang === "id" ? "/ Undangan" : "/ Invitation",
          isBest: false,
          features: [
            "Pilihan Template Desain Elegan",
            "Masa Aktif Selamanya",
            "Informasi Mempelai & Acara Lengkap",
            "Navigasi Lokasi Google Maps",
            "Hitung Mundur Acara (Countdown)",
            "Background Musik Pilihan",
            "Konfirmasi Kehadiran via WhatsApp",
            "Revisi Maksimal 2x",
          ],
        },
        {
          id: "wedding-elegan",
          title: lang === "id" ? "Paket Spesial" : "Special Plan",
          name: lang === "id" ? "Paket Spesial" : "Special Plan",
          description:
            lang === "id"
              ? "Paket paling diminati dengan fitur galeri foto, amplop digital, dan ucapan online."
              : "Most popular tier featuring photo gallery, digital gift, and guestbook.",
          price: "Rp. 179.000",
          period: lang === "id" ? "/ Undangan" : "/ Invitation",
          isBest: true,
          badge: lang === "id" ? "Paling Favorit" : "Most Popular",
          features: [
            "Semua fitur dari Paket Simple",
            "Bebas Pilih Semua Tema Desain Premium",
            "Galeri Foto (Hingga 10 Foto)",
            "Kisah Cinta (Love Story Timeline)",
            "Amplop Digital & QRIS Pembayaran",
            "Kolom Ucapan & Buku Tamu Interaktif",
            "Integrasi Link Live Streaming (YouTube/IG)",
            "Kirim Undangan Tak Terbatas (Unlimited Guests)",
            "Revisi Sampai Hari H",
          ],
        },
        {
          id: "wedding-exclusive",
          title: lang === "id" ? "Paket Eksklusif" : "Exclusive Plan",
          name: lang === "id" ? "Paket Eksklusif" : "Exclusive Plan",
          description:
            lang === "id"
              ? "Desain kustom eksklusif sesuai konsep pernikahan impian Anda dengan domain khusus."
              : "Custom tailor-made invitation tailored to your wedding concept with custom domain.",
          price: "Rp. 349.000",
          period: lang === "id" ? "/ Undangan" : "/ Invitation",
          isBest: false,
          features: [
            "Semua fitur dari Paket Spesial",
            "Kustom Domain Khusus (nama-pasangan.com)",
            "Desain Kustom Eksklusif (Non-Template)",
            "Galeri Foto & Video Sinematik",
            "QR Code Check-in Tamu Otomatis",
            "Filter Instagram / AR Wedding Matching",
            "Prioritas Pengerjaan Ekspres (1x24 Jam)",
            "Dukungan Customer Care VIP 24/7",
          ],
        },
      ],
    },
    {
      id: "birthday-event",
      label: lang === "id" ? "Ulang Tahun & Event" : "Birthday & Events",
      plans: [
        {
          id: "event-basic",
          title: lang === "id" ? "Event Simple" : "Event Simple",
          name: lang === "id" ? "Event Simple" : "Event Simple",
          description:
            lang === "id"
              ? "Undangan digital untuk ulang tahun anak, sweet seventeen, atau gathering."
              : "Digital invites for birthday parties, sweet seventeen, or casual gatherings.",
          price: "Rp. 79.000",
          period: lang === "id" ? "/ Undangan" : "/ Invitation",
          isBest: false,
          features: [
            "Tema Ceria & Ramah Mobile",
            "Detail Waktu & Lokasi Acara",
            "Petunjuk Arah Google Maps",
            "Hitung Mundur Acara",
            "RSVP Tamu Otomatis",
            "Masa Aktif 6 Bulan",
          ],
        },
        {
          id: "event-premium",
          title: lang === "id" ? "Event Premium" : "Event Premium",
          name: lang === "id" ? "Event Premium" : "Event Premium",
          description:
            lang === "id"
              ? "Lengkap dengan dresscode guide, galeri dokumentasi, dan amplop digital kado."
              : "Complete with dress code guide, gallery highlights, and gift registry.",
          price: "Rp. 149.000",
          period: lang === "id" ? "/ Undangan" : "/ Invitation",
          isBest: true,
          badge: lang === "id" ? "Rekomendasi" : "Recommended",
          features: [
            "Semua fitur Event Simple",
            "Tema Interaktif & Animasi Khusus",
            "Galeri Foto Acara",
            "Dresscode & Panduan Acara",
            "Amplop Digital / Hadiah Kado",
            "Buku Tamu & Ucapan Selamat",
            "Link Siaran Langsung Acara",
          ],
        },
      ],
    },
  ];

  return (
    <main className="flex flex-col w-full overflow-x-clip">
      <SatuCeritaHeroSection onNavigate={onNavigate} />

      {/* Target anchor for 'themes' menu */}
      <div id="themes" className="scroll-mt-24" />

      {/* Target anchor for 'pricing' with purple gradient theme (#7d6aee to #ad9fff) */}
      <PricingSection
        id="pricing"
        theme="satucerita"
        tierGroups={satuCeritaTierGroups}
        badge={lang === "id" ? "Paket Undangan Digital" : "Digital Invitation Packages"}
        title={
          lang === "id"
            ? "Pilih paket undangan sesuai momen istimewa Anda"
            : "Choose the perfect invitation package for your special moment"
        }
        subtitle={
          lang === "id"
            ? "Undangan digital elegan siap disebarkan ke keluarga dan kerabat dengan mudah, praktis, dan berkesan."
            : "Elegant digital invitations ready to share effortlessly with friends and family."
        }
      />

      {/* Target anchor for 'contact' menu */}
      <div id="contact" className="scroll-mt-24" />
    </main>
  );
};

export default SatuCeritaHomePage;
