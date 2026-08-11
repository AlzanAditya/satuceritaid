import React from 'react';
import { Link } from '../lib/tanstack-router';

export function Footer() {
  return (
    <footer className="footer">
      <div className="container max-w-7xl mx-auto px-6">
        <div className="footer-grid">
          <div className="footer-col">
            <div className="footer-brand-name">
              <div className="nav-brand-icon">
                <i className="fa-solid fa-rotate"></i>
              </div>
              One Moment
            </div>
            <p className="footer-brand-desc">
              Platform undangan digital terbaik di Indonesia. Buat undangan cantik dalam hitungan menit, langsung dari smartphone kamu.
            </p>
            <div className="footer-socials">
              <a href="#" className="social-btn" aria-label="Instagram"><i className="fa-brands fa-instagram"></i></a>
              <a href="#" className="social-btn" aria-label="TikTok"><i className="fa-brands fa-tiktok"></i></a>
              <a href="#" className="social-btn" aria-label="YouTube"><i className="fa-brands fa-youtube"></i></a>
              <a href="#" className="social-btn" aria-label="Facebook"><i className="fa-brands fa-facebook-f"></i></a>
              <a href="#" className="social-btn" aria-label="WhatsApp"><i className="fa-brands fa-whatsapp"></i></a>
            </div>
          </div>

          <div className="footer-col">
            <div className="footer-col-title">Produk</div>
            <ul className="footer-links">
              <li>
                <Link to="/how-to-create" className="footer-link">
                  <i className="fa-solid fa-chevron-right text-[0.6rem] text-[#00A896]"></i> Undangan Website
                </Link>
              </li>
              <li>
                <Link to="/video" className="footer-link">
                  <i className="fa-solid fa-chevron-right text-[0.6rem] text-[#00A896]"></i> Undangan Video 3D
                </Link>
              </li>
              <li>
                <Link to="/cetak" className="footer-link">
                  <i className="fa-solid fa-chevron-right text-[0.6rem] text-[#00A896]"></i> Undangan Cetak
                </Link>
              </li>
              <li>
                <Link to="/themes" className="footer-link">
                  <i className="fa-solid fa-chevron-right text-[0.6rem] text-[#00A896]"></i> Koleksi Tema
                </Link>
              </li>
            </ul>
          </div>

          <div className="footer-col">
            <div className="footer-col-title">Perusahaan</div>
            <ul className="footer-links">
              <li>
                <Link to="/about" className="footer-link">
                  <i className="fa-solid fa-chevron-right text-[0.6rem] text-[#00A896]"></i> Tentang Kami
                </Link>
              </li>
              <li>
                <Link to="/blog" className="footer-link">
                  <i className="fa-solid fa-chevron-right text-[0.6rem] text-[#00A896]"></i> Blog
                </Link>
              </li>
              <li>
                <Link to="/about" className="footer-link">
                  <i className="fa-solid fa-chevron-right text-[0.6rem] text-[#00A896]"></i> Afiliasi &amp; Reseller
                </Link>
              </li>
            </ul>
          </div>

          <div className="footer-col">
            <div className="footer-col-title">Bantuan</div>
            <ul className="footer-links">
              <li>
                <Link to="/faq" className="footer-link">
                  <i className="fa-solid fa-chevron-right text-[0.6rem] text-[#00A896]"></i> FAQ
                </Link>
              </li>
              <li>
                <Link to="/pricing" className="footer-link">
                  <i className="fa-solid fa-chevron-right text-[0.6rem] text-[#00A896]"></i> Hubungi Kami
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p className="footer-copy">&copy; 2025 One Moment. Seluruh hak cipta dilindungi.</p>
          <div className="footer-bottom-links">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
            <a href="#">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
