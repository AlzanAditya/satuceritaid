import React, { useState } from 'react';
import { Link } from '../lib/tanstack-router';

interface MobileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MobileDrawer({ isOpen, onClose }: MobileDrawerProps) {
  const [openSection, setOpenSection] = useState<string | null>(null);

  const toggleSection = (section: string) => {
    setOpenSection(openSection === section ? null : section);
  };

  return (
    <div className={`mobile-drawer ${isOpen ? 'open' : ''}`}>
      <div className="drawer-overlay" onClick={onClose}></div>
      <div className="drawer-panel">
        <div className="drawer-header">
          <div className="drawer-brand">
            <div className="nav-brand-icon">
              <i className="fa-solid fa-rotate"></i>
            </div>
            One Moment
          </div>
          <button className="drawer-close" aria-label="Tutup Menu" onClick={onClose}>
            <i className="fa-solid fa-xmark"></i>
          </button>
        </div>

        <div className="drawer-body">
          <div className="drawer-menu">
            {/* Products Accordion */}
            <div className={`drawer-menu-item ${openSection === 'products' ? 'open' : ''}`}>
              <button
                className={`drawer-menu-toggle ${openSection === 'products' ? 'open' : ''}`}
                onClick={() => toggleSection('products')}
              >
                Products
                <i className="fa-solid fa-chevron-down chevron"></i>
              </button>
              <div className="drawer-submenu">
                <Link to="/how-to-create" className="drawer-submenu-item" onClick={onClose}>
                  Undangan Website <i className="fa-solid fa-arrow-right arrow"></i>
                </Link>
                <Link to="/cetak" className="drawer-submenu-item" onClick={onClose}>
                  Undangan Cetak <i className="fa-solid fa-arrow-right arrow"></i>
                </Link>
                <Link to="/video" className="drawer-submenu-item" onClick={onClose}>
                  Undangan Video 3D <i className="fa-solid fa-arrow-right arrow"></i>
                </Link>
              </div>
            </div>

            {/* Solutions Accordion */}
            <div className={`drawer-menu-item ${openSection === 'solutions' ? 'open' : ''}`}>
              <button
                className={`drawer-menu-toggle ${openSection === 'solutions' ? 'open' : ''}`}
                onClick={() => toggleSection('solutions')}
              >
                Solutions
                <i className="fa-solid fa-chevron-down chevron"></i>
              </button>
              <div className="drawer-submenu">
                <Link to="/themes" className="drawer-submenu-item" onClick={onClose}>
                  Pilih Tema <i className="fa-solid fa-arrow-right arrow"></i>
                </Link>
                <Link to="/pricing" className="drawer-submenu-item" onClick={onClose}>
                  Harga &amp; Paket <i className="fa-solid fa-arrow-right arrow"></i>
                </Link>
                <Link to="/faq" className="drawer-submenu-item" onClick={onClose}>
                  FAQ <i className="fa-solid fa-arrow-right arrow"></i>
                </Link>
              </div>
            </div>

            {/* Company Accordion */}
            <div className={`drawer-menu-item ${openSection === 'company' ? 'open' : ''}`}>
              <button
                className={`drawer-menu-toggle ${openSection === 'company' ? 'open' : ''}`}
                onClick={() => toggleSection('company')}
              >
                Company
                <i className="fa-solid fa-chevron-down chevron"></i>
              </button>
              <div className="drawer-submenu">
                <Link to="/blog" className="drawer-submenu-item" onClick={onClose}>
                  Blog <i className="fa-solid fa-arrow-right arrow"></i>
                </Link>
                <Link to="/about" className="drawer-submenu-item" onClick={onClose}>
                  Tentang Kami <i className="fa-solid fa-arrow-right arrow"></i>
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="drawer-footer">
          <Link to="/login" className="btn btn-outline" onClick={onClose}>Log In</Link>
          <Link to="/register" className="btn btn-primary" onClick={onClose}>Daftar Gratis</Link>
        </div>
      </div>
    </div>
  );
}
