import React, { useState, useEffect } from 'react';
import { Link } from '../lib/tanstack-router';

export function HeroSection() {
  // Typewriter effect state
  const words = ['Tunangan & Pernikahan', 'Ulang Tahun', 'Khitanan', 'Wisuda'];
  const [wordIndex, setWordIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentWord = words[wordIndex];
    let timer: NodeJS.Timeout;

    if (isDeleting) {
      if (currentText.length > 0) {
        timer = setTimeout(() => {
          setCurrentText(currentWord.substring(0, currentText.length - 1));
        }, 50);
      } else {
        setIsDeleting(false);
        setWordIndex((prev) => (prev + 1) % words.length);
      }
    } else {
      if (currentText.length < currentWord.length) {
        timer = setTimeout(() => {
          setCurrentText(currentWord.substring(0, currentText.length + 1));
        }, 110);
      } else {
        timer = setTimeout(() => {
          setIsDeleting(true);
        }, 2000);
      }
    }

    return () => clearTimeout(timer);
  }, [currentText, isDeleting, wordIndex]);

  return (
    <section className="hero">
      <div className="container max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div className="hero-content">
          <div className="hero-badge">
            <i className="fa-solid fa-sparkles"></i> Platform Undangan Digital No. 1
          </div>

          <h1 className="hero-title">
            Buat Undangan<br />
            Online Digital<br />
            Website Untuk<br />
            <span className="highlight min-h-[1.2em] inline-block">{currentText || '...'}</span>
          </h1>

          <p className="hero-desc">
            Solusi undangan digital modern dalam bentuk website, video 3D, dan cetak.
            Proses cepat, desain elegan, dan banyak fitur interaktif untuk momen spesial Anda.
          </p>

          <div className="hero-cta">
            <Link to="/pricing" className="btn btn-white">
              <i className="fa-solid fa-wand-magic-sparkles"></i> Buat Undangan Sekarang
            </Link>
            <Link to="/themes" className="btn btn-outline text-white border-white/40 hover:bg-white/10 hover:text-white">
              <i className="fa-solid fa-eye"></i> Lihat Demo
            </Link>
          </div>

          <div className="hero-stats">
            <div className="hero-stat">
              <div className="hero-stat-num" data-count="50000">50.000+</div>
              <div className="hero-stat-label">Pengguna Aktif</div>
            </div>
            <div className="hero-stat">
              <div className="hero-stat-num" data-count="500">500+</div>
              <div className="hero-stat-label">Desain Tema</div>
            </div>
            <div className="hero-stat">
              <div className="hero-stat-num">4.9/5</div>
              <div className="hero-stat-label">Rating Kepuasan</div>
            </div>
          </div>
        </div>

        <div className="hero-visual">
          <div className="hero-phone-mockup">
            <div className="phone-frame">
              <div className="phone-placeholder">
                <div className="phone-placeholder-logo">
                  <i className="fa-solid fa-heart"></i>
                </div>
                <div className="phone-placeholder-title">Undangan Pernikahan</div>
                <div className="phone-placeholder-names">Rizky &amp; Anisa</div>
                <div className="phone-placeholder-sub">Sabtu, 25 Oktober 2025</div>
                <button className="phone-placeholder-btn">Buka Undangan</button>
              </div>
            </div>
          </div>

          {/* Floating Cards */}
          <div className="hero-float-card card-rsvp">
            <div className="float-card-name">
              <i className="fa-solid fa-circle-check text-[#00A896] mr-1.5"></i>
              RSVP Konfirmasi
            </div>
            <div className="float-card-text">Budi Santoso: Hadir (2 Orang)</div>
          </div>

          <div className="hero-float-card card-stats">
            <div className="float-stat-box yellow">
              <div className="float-stat-num">1.2k</div>
              <div className="float-stat-label">Pengunjung</div>
            </div>
            <div className="float-stat-box pink">
              <div className="float-stat-num">98</div>
              <div className="float-stat-label">Ucapan</div>
            </div>
          </div>

          <div className="hero-float-card card-comment">
            <div className="float-card-name">Ucapan &amp; Doa</div>
            <div className="float-card-text">"Selamat ya! Semoga samawa..."</div>
          </div>
        </div>
      </div>
    </section>
  );
}
