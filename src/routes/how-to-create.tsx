import React from 'react';
import { Link } from '../lib/tanstack-router';
import { PageHeader } from '../components/PageHeader';
import { Breadcrumb } from '../components/Breadcrumb';

export function HowToCreatePage() {
  const steps = [
    {
      num: 1,
      title: 'Daftar Akun Gratis',
      desc: 'Buat akun One Moment dalam hitungan detik menggunakan akun Google atau email kamu tanpa biaya.',
      icon: 'fa-user-plus',
    },
    {
      num: 2,
      title: 'Pilih Template & Tema',
      desc: 'Jelajahi 500+ tema eksklusif untuk pernikahan, tunangan, ulang tahun, khitanan, hingga wisuda.',
      icon: 'fa-palette',
    },
    {
      num: 3,
      title: 'Lengkapi Informasi Acara',
      desc: 'Isi detail mempelai/penyelenggara, tanggal, lokasi acara, galeri foto, kisah cinta, dan musik latar.',
      icon: 'fa-pen-to-square',
    },
    {
      num: 4,
      title: 'Sebarkan Undangan & Pantau RSVP',
      desc: 'Dapatkan link kustom serta QR Code unik. Kirim ke tamu via WhatsApp/Medsos dan pantau konfirmasi kehadiran secara real-time.',
      icon: 'fa-share-nodes',
    },
  ];

  return (
    <>
      <PageHeader
        tagIcon="fa-globe"
        tagText="Undangan Website"
        title={
          <>
            Undangan Website Digital<br />Interaktif &amp; Elegan
          </>
        }
        description="Cara termudah membuat undangan digital website dengan desain yang dapat di-kustomisasi. Tamu bisa RSVP, lihat foto, dan navigasi ke lokasi langsung dari undangan kamu."
      >
        <div className="page-header-img-card">
          <div className="page-header-img-placeholder"><i className="fa-solid fa-globe text-3xl"></i><span>Website</span></div>
        </div>
        <div className="page-header-img-card tall">
          <div className="page-header-img-placeholder"><i className="fa-solid fa-heart text-4xl"></i><span>Elegan</span></div>
        </div>
      </PageHeader>

      <Breadcrumb items={[{ label: 'Products', to: '/how-to-create' }, { label: 'Undangan Website' }]} />

      <main className="page-content">
        <div className="container max-w-7xl mx-auto px-6">
          <div className="section-header mb-12">
            <span className="section-tag">Panduan Pembuatan</span>
            <h2 className="section-title">Langkah Mudah Membuat Undangan Website</h2>
            <p className="section-desc">
              Hanya dengan 4 langkah sederhana, undangan digital kamu siap untuk disebarkan ke sanak saudara dan teman dekat.
            </p>
          </div>

          <div className="features-grid mb-16">
            {steps.map((step) => (
              <div key={step.num} className="feature-card">
                <div className="feature-icon"><i className={`fa-solid ${step.icon}`}></i></div>
                <div className="feature-title">Langkah {step.num}: {step.title}</div>
                <p className="feature-desc">{step.desc}</p>
              </div>
            ))}
          </div>

          <div className="pricing-teaser">
            <h2 className="pricing-teaser-title">Siap Membuat Undangan Pertama Kamu?</h2>
            <p className="pricing-teaser-desc">
              Coba sekarang tanpa perlu kartu kredit. Hanya butuh beberapa menit sampai undangan digitalmu tayang!
            </p>
            <div className="pricing-teaser-cta">
              <Link to="/pricing" className="btn btn-white">
                <i className="fa-solid fa-rocket"></i> Buat Undangan Sekarang
              </Link>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
