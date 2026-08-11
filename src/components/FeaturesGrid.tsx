import React from 'react';

export interface FeatureItem {
  icon: string;
  title: string;
  desc: string;
}

export interface FeaturesGridProps {
  tag?: string;
  title?: string;
  description?: string;
  features?: FeatureItem[];
}

const DEFAULT_FEATURES: FeatureItem[] = [
  {
    icon: 'fa-music',
    title: 'Musik Background Custom',
    desc: 'Pilih dari pustaka lagu romantis kami atau unggah musik favoritmu sendiri.',
  },
  {
    icon: 'fa-images',
    title: 'Galeri Foto & Video',
    desc: 'Tampilkan momen prewedding terbaikmu dalam bentuk slider foto & video HD.',
  },
  {
    icon: 'fa-envelope-open-text',
    title: 'RSVP & Buku Tamu',
    desc: 'Tamu dapat mengonfirmasi kehadiran dan menuliskan doa ucapan selamat secara online.',
  },
  {
    icon: 'fa-map-location-dot',
    title: 'Petunjuk Lokasi Maps',
    desc: 'Integrasi Google Maps langsung untuk memudahkan tamu menemukan venue acara.',
  },
  {
    icon: 'fa-gift',
    title: 'Amplop Digital & Kado',
    desc: 'Fasilitas pengiriman angpau digital via transfer bank atau e-wallet secara aman.',
  },
  {
    icon: 'fa-qrcode',
    title: 'QR Code Check-in',
    desc: 'Sistem check-in tamu otomatis saat di venue dengan scan QR Code unik.',
  },
];

export function FeaturesGrid({
  tag = 'Fitur Lengkap',
  title = 'Fitur Terbaik untuk Undangan Impianmu',
  description = 'Segala kebutuhan undangan digital lengkap tersedia dalam satu platform mudah.',
  features = DEFAULT_FEATURES,
}: FeaturesGridProps) {
  return (
    <section className="section section-alt">
      <div className="container max-w-7xl mx-auto px-6">
        <div className="section-header">
          {tag && <span className="section-tag">{tag}</span>}
          {title && <h2 className="section-title">{title}</h2>}
          {description && <p className="section-desc">{description}</p>}
        </div>

        <div className="features-grid">
          {features.map((feature, idx) => (
            <div key={idx} className="feature-card">
              <div className="feature-icon">
                <i className={`fa-solid ${feature.icon}`}></i>
              </div>
              <h3 className="feature-title">{feature.title}</h3>
              <p className="feature-desc">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

