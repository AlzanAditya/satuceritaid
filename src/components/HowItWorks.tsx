import React, { useState } from 'react';

export interface HowStepItem {
  stepNumber: number;
  title: string;
  desc: string;
  screenSub: string;
  screenNames: string;
}

export interface HowItWorksProps {
  tag?: string;
  title?: string;
  description?: string;
  steps?: HowStepItem[];
}

const DEFAULT_STEPS: HowStepItem[] = [
  {
    stepNumber: 1,
    title: 'Pilih Tema Favorit',
    desc: 'Ratusan pilihan desain tema modern, elegan, minimalis, dan tradisional.',
    screenSub: 'Langkah 1: Memilih Tema',
    screenNames: 'Pilihan Tema Exquisite',
  },
  {
    stepNumber: 2,
    title: 'Edit Detail Acara',
    desc: 'Isi informasi mempelai, tanggal, lokasi, gallery foto, musik, dan cerita cinta.',
    screenSub: 'Langkah 2: Mengisi Informasi',
    screenNames: 'Rizky & Anisa',
  },
  {
    stepNumber: 3,
    title: 'Bagikan ke Tamu',
    desc: 'Sebarkan undangan via WhatsApp, media sosial, atau SMS dengan link khusus.',
    screenSub: 'Langkah 3: Membagikan Link',
    screenNames: 'one-moment.id/rizky-anisa',
  },
  {
    stepNumber: 4,
    title: 'Kelola RSVP Real-time',
    desc: 'Pantau jumlah konfirmasi kehadiran tamu dan baca ucapan doa secara langsung.',
    screenSub: 'Langkah 4: RSVP Dashboard',
    screenNames: '450 Tamu Hadir',
  },
];

export function HowItWorks({
  tag = 'Cara Kerja',
  title = '4 Langkah Mudah Buat Undangan',
  description = 'Tidak perlu keahlian koding atau desain. Buat undangan impianmu hanya dalam hitungan menit.',
  steps = DEFAULT_STEPS,
}: HowItWorksProps) {
  const [activeStep, setActiveStep] = useState(1);
  const currentStepData = steps.find((s) => s.stepNumber === activeStep) || steps[0];

  return (
    <section className="section">
      <div className="container max-w-7xl mx-auto px-6">
        <div className="section-header">
          {tag && <span className="section-tag">{tag}</span>}
          {title && <h2 className="section-title">{title}</h2>}
          {description && <p className="section-desc">{description}</p>}
        </div>

        <div className="how-grid">
          <div className="how-list">
            {steps.map((stepItem) => (
              <div
                key={stepItem.stepNumber}
                className={`how-item ${activeStep === stepItem.stepNumber ? 'active' : ''}`}
                onMouseEnter={() => setActiveStep(stepItem.stepNumber)}
                onClick={() => setActiveStep(stepItem.stepNumber)}
              >
                <div className="how-step-num">{stepItem.stepNumber}</div>
                <div className="how-item-content">
                  <div className="how-item-title">{stepItem.title}</div>
                  <div className="how-item-desc">{stepItem.desc}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="how-visual">
            <div className="how-phone-wrap">
              <div className="how-phone">
                <div className="how-phone-screen">
                  <div className="how-phone-sub">{currentStepData?.screenSub}</div>
                  <div className="how-phone-title">The Wedding Of</div>
                  <div className="how-phone-names">{currentStepData?.screenNames}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

