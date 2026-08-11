import React from 'react';
import { PageHeader } from '../components/PageHeader';
import { Breadcrumb } from '../components/Breadcrumb';

export function AboutPage() {
  return (
    <>
      <PageHeader
        tagIcon="fa-users"
        tagText="Perusahaan"
        title="Tentang One Moment"
        description="Platform undangan digital terdepan di Indonesia yang berkomitmen menghadirkan pengalaman berbagi kebahagiaan yang modern, efisien, dan berkesan."
      >
        <div className="page-header-img-card tall">
          <div className="page-header-img-placeholder"><i className="fa-solid fa-heart text-4xl"></i><span>Misi Kami</span></div>
        </div>
      </PageHeader>

      <Breadcrumb items={[{ label: 'Tentang Kami' }]} />

      <main className="page-content">
        <div className="container max-w-7xl mx-auto px-6">
          <div className="section-header mb-12">
            <span className="section-tag">Kisah Kami</span>
            <h2 className="section-title">Solusi Momen Berharga di Era Digital</h2>
            <p className="section-desc">
              Dipercaya oleh lebih dari 50.000+ pengguna di seluruh Indonesia untuk momen pernikahan, khitanan, ulang tahun, dan perayaan spesial lainnya.
            </p>
          </div>

          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon"><i className="fa-solid fa-bullseye"></i></div>
              <div className="feature-title">Visi &amp; Misi</div>
              <p className="feature-desc">Memudahkan setiap orang merayakan momen bahagia dengan teknologi yang ramah pengguna, cepat, dan ramah lingkungan.</p>
            </div>

            <div className="feature-card">
              <div className="feature-icon"><i className="fa-solid fa-shield-halved"></i></div>
              <div className="feature-title">Keamanan &amp; Privasi</div>
              <p className="feature-desc">Data tamu dan informasi pribadi kamu dilindungi dengan standar privasi tinggi serta server terpercaya.</p>
            </div>

            <div className="feature-card">
              <div className="feature-icon"><i className="fa-solid fa-headset"></i></div>
              <div className="feature-title">Layanan Ramah 24/7</div>
              <p className="feature-desc">Tim kami siap membantumu kapan saja apabila membutuhkan panduan atau bantuan penyesuaian desain.</p>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
