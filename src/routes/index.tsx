import React from 'react';
import { HeroSection } from '../components/HeroSection';
import { ProductsGrid } from '../components/ProductsGrid';
import { HowItWorks } from '../components/HowItWorks';
import { FeaturesGrid } from '../components/FeaturesGrid';
import { PricingTeaser } from '../components/PricingTeaser';
import { ThemesGallery } from '../components/ThemesGallery';
import { TestimonialsGrid } from '../components/TestimonialsGrid';
import { FaqAccordion } from '../components/FaqAccordion';

export function HomePage() {
  return (
    <>
      <HeroSection />
      <ProductsGrid />
      <HowItWorks />
      <FeaturesGrid />
      <PricingTeaser />
      <ThemesGallery />
      <TestimonialsGrid />
      <FaqAccordion />
    </>
  );
}
