import React, { useState } from 'react';

export interface FaqItem {
  q: string;
  a: string;
}

export interface FaqAccordionProps {
  tag?: string;
  title?: string;
  description?: string;
  faqs?: FaqItem[];
}

const DEFAULT_FAQS: FaqItem[] = [
  {
    q: 'Berapa lama proses pembuatan undangan website?',
    a: 'Proses pembuatan sangat cepat! Setelah memilih tema dan mengisikan data acara, undangan website kamu bisa langsung aktif dan siap disebarkan dalam waktu kurang dari 10 menit.',
  },
  {
    q: 'Apakah bisa menggunakan musik dan lagu buatan sendiri?',
    a: 'Tentu saja! Kamu bisa memilih dari koleksi musik romantis yang sudah kami sediakan, atau mengunggah file musik mp3 sesuai keinginanmu.',
  },
  {
    q: 'Bagaimana cara sebar undangan ke penerima secara personal?',
    a: 'Kamu dapat membuat link unik sesuai nama tamu (misal: one-moment.id/namamu?to=Budi) secara otomatis melalui fitur Sebar Undangan kami dan langsung kirim via WhatsApp.',
  },
  {
    q: 'Berapa lama masa aktif undangan website?',
    a: 'Masa aktif undangan bervariasi sesuai paket pilihanmu, mulai dari 3 bulan, 6 bulan, hingga Masa Aktif Selamanya (Tanpa Batas).',
  },
];

export function FaqAccordion({
  tag = 'FAQ',
  title = 'Pertanyaan Sering Diajukan',
  description = 'Temukan jawaban cepat untuk pertanyaan seputar platform undangan digital Satu Cerita.',
  faqs = DEFAULT_FAQS,
}: FaqAccordionProps) {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <section className="section section-alt">
      <div className="container max-w-7xl mx-auto px-6">
        <div className="section-header">
          {tag && <span className="section-tag">{tag}</span>}
          {title && <h2 className="section-title">{title}</h2>}
          {description && <p className="section-desc">{description}</p>}
        </div>

        <div className="faq-list">
          {faqs.map((faq, index) => (
            <div key={index} className={`faq-item ${openFaq === index ? 'open' : ''}`}>
              <button
                className="faq-question"
                onClick={() => setOpenFaq(openFaq === index ? null : index)}
              >
                <span>{faq.q}</span>
                <i className="fa-solid fa-chevron-down"></i>
              </button>
              <div className="faq-answer">
                <p>{faq.a}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

