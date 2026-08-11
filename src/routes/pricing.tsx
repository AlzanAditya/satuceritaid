import React from 'react';
import { Link } from '../lib/tanstack-router';
import { PageHeader } from '../components/PageHeader';
import { Breadcrumb } from '../components/Breadcrumb';

export function PricingPage() {
  const plans = [
    {
      name: 'Paket Gratis',
      price: 'Rp 0',
      period: 'selamanya',
      popular: false,
      badge: 'Free',
      features: [
        'Masa aktif 3 hari',
        'Pilih dari 10+ tema dasar',
        'Maksimal 50 tamu RSVP',
        'Lagu latar standar',
        'Peta lokasi Google Maps',
        'Format RSVP sederhana',
      ],
      buttonText: 'Mulai Gratis',
      buttonVariant: 'btn-outline',
    },
    {
      name: 'Paket Silver',
      price: 'Rp 49.000',
      period: 'per acara',
      popular: true,
      badge: 'Paling Populer',
      features: [
        'Masa aktif 6 bulan',
        'Akses 100+ tema premium',
        'Tamu RSVP tanpa batas',
        'Lagu latar custom / upload sendiri',
        'Galeri foto (s.d. 20 foto)',
        'Fitur Amplop Digital / Rekening',
        'Countdown timer & Peta Lokasi',
        'QR Code Check-in Tamu',
      ],
      buttonText: 'Pilih Silver',
      buttonVariant: 'btn-primary',
    },
    {
      name: 'Paket Gold',
      price: 'Rp 99.000',
      period: 'per acara',
      popular: false,
      badge: 'Lengkap',
      features: [
        'Masa aktif 1 tahun',
        'Akses seluruh 500+ tema premium',
        'Tamu RSVP & Ucapan tanpa batas',
        'Musik latar & Video Header',
        'Galeri foto tanpa batas + Video HD',
        'Amplop Digital + Gift Registry',
        'Buku tamu digital & QR Code scanner',
        'Domain Custom (.com / .id)',
        'Dukungan prioritas WhatsApp 24/7',
      ],
      buttonText: 'Pilih Gold',
      buttonVariant: 'btn-dark',
    },
  ];

  return (
    <>
      <PageHeader
        tagIcon="fa-tags"
        tagText="Harga & Paket"
        title={
          <>
            Mulai Gratis,<br />Upgrade Kapan Saja
          </>
        }
        description="Pilih paket yang sesuai kebutuhan kamu. Dari paket gratis untuk undangan sederhana, hingga paket premium dengan fitur lengkap untuk acara yang tak terlupakan."
      >
        <div className="page-header-img-card tall">
          <div className="page-header-img-placeholder"><i className="fa-solid fa-crown text-4xl"></i><span>Premium</span></div>
        </div>
        <div className="page-header-img-card">
          <div className="page-header-img-placeholder"><i className="fa-solid fa-gem text-3xl"></i><span>Gratis</span></div>
        </div>
      </PageHeader>

      <Breadcrumb items={[{ label: 'Harga & Paket' }]} />

      <main className="page-content">
        <div className="container max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="section-title">Daftar Paket Harga</h2>
            <p className="section-desc">Pilihan fleksibel tanpa biaya tersembunyi. Bebas bayar dengan berbagai metode pembayaran lokal.</p>
          </div>

          <div className="features-grid items-stretch">
            {plans.map((plan, idx) => (
              <div 
                key={idx} 
                className={`feature-card flex flex-col justify-between relative ${
                  plan.popular ? 'border-[#00A896] shadow-xl' : 'border-gray-200 shadow-md'
                }`}
              >
                {plan.popular && (
                  <span className="absolute top-4 right-4 bg-[#00A896] text-white px-3 py-1 rounded-full text-xs font-bold">
                    {plan.badge}
                  </span>
                )}

                <div>
                  <div className="feature-title text-xl mb-2">{plan.name}</div>
                  <div className="flex items-baseline gap-1 mb-6">
                    <span className="text-3xl font-extrabold text-[#111827]">{plan.price}</span>
                    <span className="text-sm text-gray-500">/ {plan.period}</span>
                  </div>

                  <ul className="list-none p-0 m-0 mb-8 flex flex-col gap-3">
                    {plan.features.map((feat, fIdx) => (
                      <li key={fIdx} className="text-sm text-gray-600 flex items-center gap-2">
                        <i className="fa-solid fa-circle-check text-[#00A896] text-sm"></i>
                        {feat}
                      </li>
                    ))}
                  </ul>
                </div>

                <Link to="/" className={`btn ${plan.buttonVariant} w-full justify-center`}>
                  {plan.buttonText}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </main>
    </>
  );
}
