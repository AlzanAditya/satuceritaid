import React from 'react';
import { Link, useLocation } from '../lib/tanstack-router';

interface MobileNavProps {
  onOpenDrawer: () => void;
}

export function MobileNav({ onOpenDrawer }: MobileNavProps) {
  const { pathname } = useLocation();

  return (
    <nav className="bottom-nav" aria-label="Navigasi Bawah">
      <div className="bottom-nav-inner">
        <Link to="/" className={`bottom-nav-item ${pathname === '/' ? 'active' : ''}`}>
          <i className="fa-solid fa-house"></i>
          <span className="bottom-nav-label">Home</span>
        </Link>
        <Link to="/how-to-create" className={`bottom-nav-item ${['/how-to-create', '/website'].includes(pathname) ? 'active' : ''}`}>
          <i className="fa-solid fa-globe"></i>
          <span className="bottom-nav-label">Website</span>
        </Link>
        <Link to="/video" className={`bottom-nav-item ${pathname === '/video' ? 'active' : ''}`}>
          <i className="fa-solid fa-clapperboard"></i>
          <span className="bottom-nav-label">Video</span>
        </Link>
        <Link to="/cetak" className={`bottom-nav-item ${pathname === '/cetak' ? 'active' : ''}`}>
          <i className="fa-solid fa-print"></i>
          <span className="bottom-nav-label">Cetak</span>
        </Link>
        <button className="bottom-nav-item" onClick={onOpenDrawer}>
          <i className="fa-solid fa-bars"></i>
          <span className="bottom-nav-label">Menu</span>
        </button>
      </div>
    </nav>
  );
}
