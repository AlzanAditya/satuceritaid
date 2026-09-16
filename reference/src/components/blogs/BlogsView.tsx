import React, { useState, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Blog } from "../../types";
import { useLanguage } from "../../context/LanguageContext";
import { BlogsHero } from "./BlogsHero";
import { BlogCardItem } from "./BlogCardItem";

gsap.registerPlugin(ScrollTrigger);

interface BlogsViewProps {
  blogs: Blog[];
  onNavigate: (path: string) => void;
}

export const BlogsView: React.FC<BlogsViewProps> = ({ blogs, onNavigate }) => {
  const { lang } = useLanguage();
  const [isHeroComplete, setIsHeroComplete] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const cards = gsap.utils.toArray<HTMLElement>(".blog-card-wrapper");
      if (!isHeroComplete) {
        gsap.set(cards, { opacity: 0, y: 40 });
        return;
      }

      let visibleCount = 0;
      cards.forEach((card) => {
        const isAlreadyInView =
          card.getBoundingClientRect().top < 0.85 * window.innerHeight;
        let delay = 0;
        if (isAlreadyInView) {
          delay = 0.15 * visibleCount;
          visibleCount++;
        }
        gsap.to(card, {
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
            toggleActions: "play none none none",
          },
          y: 0,
          opacity: 1,
          duration: 1,
          delay: delay,
          ease: "power3.out",
          clearProps: "all",
        });
      });
    },
    { dependencies: [isHeroComplete], scope: containerRef }
  );

  return (
    <div ref={containerRef} className="min-h-screen">
      {/* 1. Hero Section */}
      <BlogsHero onComplete={() => setIsHeroComplete(true)} />

      {/* 2. Blog List Section */}
      <section
        id="blog-list"
        className="px-4 md:px-12 lg:px-36 xl:px-48 2xl:container mx-auto select-none pb-16 md:pb-24 relative z-10"
      >
        <div className="grid md:grid-cols-2 gap-6 gap-y-10">
          {blogs.map((blog) => (
            <BlogCardItem
              key={blog.id}
              blog={blog}
              onNavigate={onNavigate}
              animateOnScroll={false}
            />
          ))}
        </div>
      </section>
    </div>
  );
};
