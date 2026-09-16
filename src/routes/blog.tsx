import React from 'react';
import { Link } from '../lib/tanstack-router';
import { PageHeader } from '../components/PageHeader';
import { Breadcrumb } from '../components/Breadcrumb';

export function BlogPage() {
  const articles = [
    { title: '10 Tips Menyiapkan Pernikahan Hemat & Memukau', category: 'Tips & Trik', date: '10 Feb 2025' },
    { title: 'Cara Mengatur Daftar Tamu Undangan Agar Tidak Bikin Pusing', category: 'Panduan', date: '05 Feb 2025' },
    { title: 'Trend Undangan Digital 2025: Elegan, Hemat, dan Ramah Lingkungan', category: 'Inspirasi', date: '28 Jan 2025' },
  ];

  return (
    <>
      <PageHeader
        tagIcon="fa-newspaper"
        tagText="Blog"
        title="Artikel &amp; Inspirasi Undangan"
        description="Kumpulan tips, panduan pernikahan, dan tren seputar undangan digital terbaru dari Satu Cerita."
      />

      <Breadcrumb items={[{ label: 'Blog' }]} />

      <main className="page-content">
        <div className="container max-w-7xl mx-auto px-6">
          <div className="products-grid">
            {articles.map((art, idx) => (
              <div key={idx} className="product-card">
                <div className="product-card-image">
                  <div className="product-card-image-placeholder">
                    <i className="fa-solid fa-newspaper"></i>
                    <span>{art.category}</span>
                  </div>
                </div>
                <div className="product-card-body">
                  <span className="text-xs text-[#00A896] font-semibold">{art.date}</span>
                  <div className="product-card-title mt-1">{art.title}</div>
                  <p className="product-card-desc">Simak selengkapnya panduan praktis dari kami untuk kelancaran momen bahagia Anda.</p>
                  <Link to="/" className="product-card-link">Baca Artikel <i className="fa-solid fa-arrow-right"></i></Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </>
  );
}
