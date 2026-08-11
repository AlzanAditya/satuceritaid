import React from 'react';
import { Link } from '../lib/tanstack-router';

export interface PricingTeaserProps {
  title?: string;
  description?: string;
  buttonText?: string;
  buttonTo?: string;
  buttonIcon?: string;
}

export function PricingTeaser({
  title = 'Mulai Buat Undangan Cantikmu Hari Ini',
  description = 'Dapatkan paket terbaik dengan harga terjangkau dan masa aktif fleksibel.',
  buttonText = 'Lihat Paket & Harga',
  buttonTo = '/pricing',
  buttonIcon = 'fa-tags',
}: PricingTeaserProps) {
  return (
    <section className="section">
      <div className="container max-w-7xl mx-auto px-6">
        <div className="pricing-teaser">
          {title && <h2 className="pricing-teaser-title">{title}</h2>}
          {description && <p className="pricing-teaser-desc">{description}</p>}
          <div className="pricing-teaser-cta">
            <Link to={buttonTo} className="btn btn-white">
              <i className={`fa-solid ${buttonIcon}`}></i> {buttonText}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

