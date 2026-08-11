import React from 'react';
import { Link } from '../lib/tanstack-router';
import { PageHeader } from '../components/PageHeader';
import { Breadcrumb } from '../components/Breadcrumb';

export function VideoPage() {
  return (
    <>
      <PageHeader
        tagIcon="fa-clapperboard"
        tagText="Produk"
        title="Undangan Video 3D"
        description="Undangan video animasi 3D elegan dengan musik sinematik yang membuat tamu terpukau dan antusias menghadiri acara Anda."
      />

      <Breadcrumb items={[{ label: 'Undangan Video 3D' }]} />

      <main className="page-content">
        <div className="container max-w-7xl mx-auto px-6">
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon"><i className="fa-solid fa-wand-magic-sparkles"></i></div>
              <div className="feature-title">Animasi 3D Sinematik</div>
              <p className="feature-desc">Visual memukau beresolusi HD dengan pergerakan kamera dan transisi 3D yang sangat halus.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon"><i className="fa-solid fa-music"></i></div>
              <div className="feature-title">Musik Latar Custom</div>
              <p className="feature-desc">Pilih lagu kesayangan Anda untuk menambah suasana romantis dan berkesan.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon"><i className="fa-solid fa-bolt"></i></div>
              <div className="feature-title">Pengerjaan Cepat</div>
              <p className="feature-desc">Proses pengerjaan kilat 1x24 jam siap dikirim via WhatsApp &amp; Instagram Status.</p>
            </div>
          </div>

          <div className="text-center mt-12">
            <Link to="/pricing" className="btn btn-primary">Pesan Undangan Video <i className="fa-solid fa-arrow-right"></i></Link>
          </div>
        </div>
      </main>
    </>
  );
}
