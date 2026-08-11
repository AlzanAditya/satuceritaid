import React from 'react';
import { Link, useLocation } from '../lib/tanstack-router';

interface NavbarProps {
  scrolled: boolean;
  onOpenDrawer: () => void;
}

export function Navbar({ scrolled, onOpenDrawer }: NavbarProps) {
  const { pathname } = useLocation();

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`} id="navbar">
      <div className="container max-w-7xl mx-auto px-6 h-full flex items-center justify-between">
        {/* Brand */}
        <Link to="/" className="nav-brand">
          <div className="nav-brand-icon">
            <i className="fa-solid fa-rotate"></i>
          </div>
          One Moment
        </Link>

        {/* Desktop Menu */}
        <ul className="nav-menu">
          {/* Products Dropdown */}
          <li className={`nav-item ${['/how-to-create', '/website', '/cetak', '/video'].includes(pathname) ? 'active' : ''}`}>
            <span className="nav-link">
              Products <i className="fa-solid fa-chevron-down chevron"></i>
            </span>
            <div className="dropdown with-image">
              <div className="dropdown-image">
                <div className="dropdown-image-placeholder">
                  <i className="fa-solid fa-mobile-screen-button"></i>
                </div>
              </div>
              <div className="dropdown-links">
                <Link to="/how-to-create" className="dropdown-item">
                  Undangan Website <i className="fa-solid fa-arrow-right arrow"></i>
                </Link>
                <Link to="/cetak" className="dropdown-item">
                  Undangan Cetak <i className="fa-solid fa-arrow-right arrow"></i>
                </Link>
                <Link to="/video" className="dropdown-item">
                  Undangan Video 3D <i className="fa-solid fa-arrow-right arrow"></i>
                </Link>
              </div>
            </div>
          </li>

          {/* Solutions Dropdown */}
          <li className={`nav-item ${['/themes', '/tema', '/pricing', '/harga', '/faq'].includes(pathname) ? 'active' : ''}`}>
            <span className="nav-link">
              Solutions <i className="fa-solid fa-chevron-down chevron"></i>
            </span>
            <div className="dropdown">
              <Link to="/themes" className="dropdown-item">
                <i className="fa-solid fa-palette"></i> Pilih Tema <i className="fa-solid fa-arrow-right arrow"></i>
              </Link>
              <Link to="/pricing" className="dropdown-item">
                <i className="fa-solid fa-tags"></i> Harga &amp; Paket <i className="fa-solid fa-arrow-right arrow"></i>
              </Link>
              <Link to="/faq" className="dropdown-item">
                <i className="fa-solid fa-circle-question"></i> FAQ <i className="fa-solid fa-arrow-right arrow"></i>
              </Link>
            </div>
          </li>

          {/* Company Dropdown */}
          <li className={`nav-item ${['/blog', '/about'].includes(pathname) ? 'active' : ''}`}>
            <span className="nav-link">
              Company <i className="fa-solid fa-chevron-down chevron"></i>
            </span>
            <div className="dropdown">
              <Link to="/blog" className="dropdown-item">
                <i className="fa-solid fa-newspaper"></i> Blog <i className="fa-solid fa-arrow-right arrow"></i>
              </Link>
              <Link to="/about" className="dropdown-item">
                <i className="fa-solid fa-users"></i> Tentang Kami <i className="fa-solid fa-arrow-right arrow"></i>
              </Link>
            </div>
          </li>

          {/* Pricing Direct Link */}
          <li className={`nav-item ${['/pricing', '/harga'].includes(pathname) ? 'active' : ''}`}>
            <Link to="/pricing" className="nav-link">
              Harga
            </Link>
          </li>
        </ul>

        {/* Actions */}
        <div className="nav-actions">
          <Link to="/login" className="btn-login">Log In</Link>
          <Link to="/register" className="btn btn-primary btn-register">Daftar Gratis</Link>
        </div>

        {/* Hamburger (mobile) */}
        <button className="nav-hamburger" aria-label="Buka Menu" onClick={onOpenDrawer}>
          <i className="fa-solid fa-bars"></i>
        </button>
      </div>
    </nav>
  );
}
