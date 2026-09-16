import React from 'react';
import { PageHeader } from '../components/PageHeader';
import { Breadcrumb } from '../components/Breadcrumb';
import { FaqAccordion } from '../components/FaqAccordion';

export function FAQPage() {
  return (
    <>
      <PageHeader
        tagIcon="fa-circle-question"
        tagText="Bantuan"
        title="Pertanyaan Umum (FAQ)"
        description="Temukan jawaban lengkap atas pertanyaan yang sering diajukan seputar pembuatan undangan digital di Satu Cerita."
      />

      <Breadcrumb items={[{ label: 'FAQ' }]} />

      <main className="page-content">
        <FaqAccordion />
      </main>
    </>
  );
}
