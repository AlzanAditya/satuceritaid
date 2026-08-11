import React, { useState } from 'react';
import { PageHeader } from '../components/PageHeader';
import { Breadcrumb } from '../components/Breadcrumb';

export function ThemesPage() {
  const [activeCategory, setActiveCategory] = useState('Semua');
  const [searchTerm, setSearchTerm] = useState('');

  const categories = ['Semua', 'Pernikahan', 'Tunangan', 'Ulang Tahun', 'Khitanan', 'Wisuda'];

  const allThemes = [
    { id: 1, title: 'Modern Elegance', category: 'Pernikahan', icon: 'fa-heart', bg: 'linear-gradient(135deg,#1a2332,#2d3a4a)' },
    { id: 2, title: 'Royal Maroon', category: 'Pernikahan', icon: 'fa-crown', bg: 'linear-gradient(135deg,#8B0000,#C0392B)' },
    { id: 3, title: 'Ocean Breeze', category: 'Tunangan', icon: 'fa-dove', bg: 'linear-gradient(135deg,#1a5276,#2980b9)' },
    { id: 4, title: 'Golden Luxury', category: 'Pernikahan', icon: 'fa-gem', bg: 'linear-gradient(135deg,#d4ac0d,#f39c12)' },
    { id: 5, title: 'Botanical Garden', category: 'Wisuda', icon: 'fa-leaf', bg: 'linear-gradient(135deg,#1b5e20,#388e3c)' },
    { id: 6, title: 'Pastel Joy', category: 'Ulang Tahun', icon: 'fa-cake-candles', bg: 'linear-gradient(135deg,#8e44ad,#9b59b6)' },
    { id: 7, title: 'Islamic Star', category: 'Khitanan', icon: 'fa-star-and-crescent', bg: 'linear-gradient(135deg,#117a65,#16a085)' },
    { id: 8, title: 'Minimalist White', category: 'Pernikahan', icon: 'fa-square', bg: 'linear-gradient(135deg,#5d6d7e,#34495e)' },
  ];

  const filteredThemes = allThemes.filter((t) => {
    const matchesCategory = activeCategory === 'Semua' || t.category === activeCategory;
    const matchesSearch = t.title.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <>
      <PageHeader
        tagIcon="fa-palette"
        tagText="Koleksi Tema"
        title={
          <>
            Tema Undangan Digital<br />yang Bisa di Custom
          </>
        }
        description="Pilih dari koleksi template menakjubkan yang dapat diedit sesuka hati. Dengan desain undangan digital ini, tamu undangan tidak akan ragu untuk menghadiri acara Kamu!"
      >
        <div className="page-header-img-card">
          <div className="page-header-img-placeholder"><i className="fa-solid fa-heart text-3xl"></i><span>Elegan</span></div>
        </div>
        <div className="page-header-img-card tall">
          <div className="page-header-img-placeholder"><i className="fa-solid fa-ring text-4xl"></i><span>Modern</span></div>
        </div>
        <div className="page-header-img-card">
          <div className="page-header-img-placeholder"><i className="fa-solid fa-leaf text-3xl"></i><span>Natural</span></div>
        </div>
      </PageHeader>

      <Breadcrumb items={[{ label: 'Tema' }]} />

      <main className="page-content">
        <div className="container max-w-7xl mx-auto px-6">
          <div className="flex flex-col gap-6 mb-10 items-center">
            <div className="relative w-full max-w-md">
              <input
                type="text"
                placeholder="Cari tema..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full py-3 pr-4 pl-11 rounded-full border-[1.5px] border-gray-300 text-sm outline-none focus:border-[#00A896]"
              />
              <i className="fa-solid fa-magnifying-glass absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"></i>
            </div>

            <div className="themes-tabs !m-0">
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
          </div>

          <div className="themes-grid">
            {filteredThemes.map((item) => (
              <div key={item.id} className="theme-item">
                <div className="theme-item-placeholder" style={{ background: item.bg }}>
                  <i className={`fa-solid ${item.icon} text-white text-4xl`}></i>
                  <span className="text-white text-sm font-semibold">{item.title}</span>
                  <span className="text-white/70 text-xs">{item.category}</span>
                </div>
                <div className="theme-overlay">
                  <div className="text-center">
                    <span className="block mb-2">Lihat Demo</span>
                    <button className="btn btn-white text-xs px-3 py-1">Gunakan Tema</button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredThemes.length === 0 && (
            <div className="text-center py-12 text-gray-500">
              Tidak ada tema yang cocok dengan pencarian "{searchTerm}".
            </div>
          )}
        </div>
      </main>
    </>
  );
}
