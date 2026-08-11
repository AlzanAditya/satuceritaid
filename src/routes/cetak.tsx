import React from 'react';
import { Link } from '../lib/tanstack-router';
import { PageHeader } from '../components/PageHeader';
import { Breadcrumb } from '../components/Breadcrumb';

export function CetakPage() {
  return (
    <>
      <PageHeader
        tagIcon="fa-print"
        tagText="Produk"
        title="Undangan Cetak Premium"
        description="Undangan kertas fisik dengan bahan berkualitas tinggi, foil emas/perak, embos, dan desain eksklusif harga terjangkau."
      />

      <Breadcrumb items={[{ label: 'Undangan Cetak' }]} />

      <main className="page-content">
        <div className="container max-w-7xl mx-auto px-6">
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon"><i className="fa-solid fa-gem"></i></div>
              <div className="feature-title">Bahan Kertas Premium</div>
              <p className="feature-desc">Mulai dari kertas Jasmine, Akasia, Art Paper, hingga Hardcover elegan tahan lama.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon"><i className="fa-solid fa-qrcode"></i></div>
              <div className="feature-title">Integrasi QR Code Website</div>
              <p className="feature-desc">Bonus cetak QR code di setiap lembar yang terhubung langsung ke undangan website digital Anda.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon"><i className="fa-solid fa-truck-fast"></i></div>
              <div className="feature-title">Pengiriman Seluruh Indonesia</div>
              <p className="feature-desc">Pengemasan aman berlapis bubble wrap dengan jaminan sampai tepat waktu ke kota Anda.</p>
            </div>
          </div>

          <div className="text-center mt-12">
            <Link to="/pricing" className="btn btn-primary">Konsultasi Cetak <i className="fa-solid fa-arrow-right"></i></Link>
          </div>
        </div>
      </main>
    </>
  );
}
