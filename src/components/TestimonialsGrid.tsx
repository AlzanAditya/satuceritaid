import React from 'react';

export interface TestimonialItem {
  rating?: number;
  text: string;
  name: string;
  role: string;
  initials: string;
}

export interface TestimonialsGridProps {
  tag?: string;
  title?: string;
  description?: string;
  testimonials?: TestimonialItem[];
}

const DEFAULT_TESTIMONIALS: TestimonialItem[] = [
  {
    rating: 5,
    text: '"Fitur undangan websitenya keren banget! Mudah digunakan, temanya mewah dan harganya sangat terjangkau. Teman-teman pada puji undangannya."',
    name: 'Rian & Amanda',
    role: 'Pernikahan di Jakarta',
    initials: 'RA',
  },
  {
    rating: 5,
    text: '"Pesan undangan video 3D pengerjaannya cepat banget, hasilnya HD dan musiknya pas banget sama konsep nikahan kami. Sukses terus Satu Cerita!"',
    name: 'Dina & Syafiq',
    role: 'Pernikahan di Bandung',
    initials: 'DS',
  },
  {
    rating: 5,
    text: '"Fitur RSVP real-time nya sangat membantu tim catering kami untuk estimasi makanan. Sangat recommended buat yang mau sebar undangan praktis."',
    name: 'Bagus & Putri',
    role: 'Pernikahan di Surabaya',
    initials: 'BP',
  },
];

export function TestimonialsGrid({
  tag = 'Testimoni',
  title = 'Apa Kata Mereka?',
  description = 'Ribuan pasangan telah mempercayakan momen bahagianya bersama Satu Cerita.',
  testimonials = DEFAULT_TESTIMONIALS,
}: TestimonialsGridProps) {
  return (
    <section className="section section-alt">
      <div className="container max-w-7xl mx-auto px-6">
        <div className="section-header">
          {tag && <span className="section-tag">{tag}</span>}
          {title && <h2 className="section-title">{title}</h2>}
          {description && <p className="section-desc">{description}</p>}
        </div>

        <div className="testimonials-grid">
          {testimonials.map((item, idx) => (
            <div key={idx} className="testimonial-card">
              <div className="testimonial-stars">
                {Array.from({ length: item.rating || 5 }).map((_, sIdx) => (
                  <i key={sIdx} className="fa-solid fa-star"></i>
                ))}
              </div>
              <p className="testimonial-text">{item.text}</p>
              <div className="testimonial-author">
                <div className="testimonial-avatar">{item.initials}</div>
                <div>
                  <div className="testimonial-name">{item.name}</div>
                  <div className="testimonial-role">{item.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

