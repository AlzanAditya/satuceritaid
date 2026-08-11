import React from 'react';
import { Link } from '../lib/tanstack-router';

export interface ProductItem {
  icon: string;
  title: string;
  linkTo: string;
  desc: string;
  previewLabel: string;
}

export interface ProductsGridProps {
  tag?: string;
  title?: string;
  description?: string;
  products?: ProductItem[];
}

const DEFAULT_PRODUCTS: ProductItem[] = [
  {
    icon: 'fa-globe',
    title: 'Undangan Website',
    linkTo: '/how-to-create',
    desc: 'Undangan digital interaktif dengan domain custom, gallery foto/video, RSVP, peta lokasi, & ucapan.',
    previewLabel: 'Preview Website',
  },
  {
    icon: 'fa-clapperboard',
    title: 'Undangan Video 3D',
    linkTo: '/video',
    desc: 'Video animasi 3D elegan dengan musik latar pilihan dan kualitas Full HD. Sangat cocok dibagikan via WhatsApp.',
    previewLabel: 'Preview Video 3D',
  },
  {
    icon: 'fa-print',
    title: 'Undangan Cetak',
    linkTo: '/cetak',
    desc: 'Cetak undangan fisik bahan premium dengan finishing foil emas/perak, embos, dan desain eksklusif.',
    previewLabel: 'Preview Undangan Cetak',
  },
];

export function ProductsGrid({
  tag = 'Produk Unggulan',
  title = 'Pilih Format Undangan Sesuai Kebutuhan',
  description = 'Kami menyediakan berbagai pilihan format undangan digital dan cetak dengan kualitas terbaik.',
  products = DEFAULT_PRODUCTS,
}: ProductsGridProps) {
  return (
    <section className="section section-alt">
      <div className="container max-w-7xl mx-auto px-6">
        <div className="section-header">
          {tag && <span className="section-tag">{tag}</span>}
          {title && <h2 className="section-title">{title}</h2>}
          {description && <p className="section-desc">{description}</p>}
        </div>

        <div className="products-grid">
          {products.map((item, idx) => (
            <div key={idx} className="product-card">
              <div className="product-card-image">
                <div className="product-card-image-placeholder">
                  <i className={`fa-solid ${item.icon}`}></i>
                  <span>{item.previewLabel}</span>
                </div>
              </div>
              <div className="product-card-body">
                <h3 className="product-card-title">
                  <Link to={item.linkTo}>{item.title}</Link>
                </h3>
                <p className="product-card-desc">{item.desc}</p>
                <Link to={item.linkTo} className="product-card-link">
                  Lihat Selengkapnya <i className="fa-solid fa-arrow-right"></i>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

