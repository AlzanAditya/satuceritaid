import React, { useState } from 'react';
import { Link } from '../lib/tanstack-router';

export interface ThemeItem {
  title: string;
  cat: string;
  style: string;
}

export interface ThemesGalleryProps {
  tag?: string;
  title?: string;
  description?: string;
  categories?: string[];
  themes?: ThemeItem[];
}

const DEFAULT_CATEGORIES = ['Semua', 'Pernikahan', 'Tunangan', 'Ulang Tahun', 'Khitanan', 'Wisuda'];

const DEFAULT_THEMES: ThemeItem[] = [
  { title: 'Exquisite Emerald', cat: 'Pernikahan', style: 'Sangat Elegan' },
  { title: 'Blossom Pink', cat: 'Pernikahan', style: 'Romantis Soft' },
  { title: 'Rustic Gold', cat: 'Tunangan', style: 'Minimalis Vintage' },
  { title: 'Royal Sapphire', cat: 'Pernikahan', style: 'Mewah Classic' },
  { title: 'Fun Birthday', cat: 'Ulang Tahun', style: 'Ceria & Modern' },
  { title: 'Islamic Floral', cat: 'Khitanan', style: 'Tradsional Islami' },
  { title: 'Graduation Gold', cat: 'Wisuda', style: 'Formal Elegan' },
  { title: 'Minimalist Clean', cat: 'Pernikahan', style: 'Modern Simple' },
];

export function ThemesGallery({
  tag = 'Koleksi Tema',
  title = 'Pilih Desain Tema Sesuai Selera',
  description = 'Ratusan pilihan tema dengan tata letak unik dan dapat disesuaikan sepenuhnya.',
  categories = DEFAULT_CATEGORIES,
  themes = DEFAULT_THEMES,
}: ThemesGalleryProps) {
  const [activeCategory, setActiveCategory] = useState(categories[0] || 'Semua');

  const filteredThemes = activeCategory === (categories[0] || 'Semua')
    ? themes 
    : themes.filter((t) => t.cat === activeCategory);

  return (
    <section className="section">
      <div className="container max-w-7xl mx-auto px-6">
        <div className="section-header">
          {tag && <span className="section-tag">{tag}</span>}
          {title && <h2 className="section-title">{title}</h2>}
          {description && <p className="section-desc">{description}</p>}
        </div>

        <div className="themes-tabs">
          {categories.map((cat) => (
            <button
              key={cat}
              className={`theme-tab ${activeCategory === cat ? 'active' : ''}`}
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="themes-grid">
          {filteredThemes.map((theme, i) => (
            <div key={i} className="theme-item">
              <div className="theme-item-placeholder">
                <i className="fa-solid fa-heart text-3xl text-[#00A896]"></i>
                <div className="text-center">
                  <div className="font-bold text-sm text-[#111827]">{theme.title}</div>
                  <div className="text-xs text-gray-400">{theme.style}</div>
                </div>
              </div>
              <div className="theme-overlay">
                <Link to="/themes" className="btn btn-white text-xs px-4 py-1.5">
                  Preview Tema
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

