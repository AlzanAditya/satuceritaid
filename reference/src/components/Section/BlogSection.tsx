import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Blog } from "../../types";
import { useLanguage } from "../../context/LanguageContext";
import { Badge } from "../ui/badge";
import { TextTitle, TextDesc } from "../ui/Text";

gsap.registerPlugin(ScrollTrigger);

export interface ItemBlogProps {
  blog: Blog;
  onNavigate: (path: string) => void;
  className?: string;
  animateOnScroll?: boolean;
}

export const ItemBlog: React.FC<ItemBlogProps> = ({
  blog,
  onNavigate,
  className = "",
  animateOnScroll = true,
}) => {
  const { lang } = useLanguage();
  const cardRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!animateOnScroll) return;
      gsap.from(cardRef.current, {
        scrollTrigger: {
          trigger: cardRef.current,
          start: "top 80%",
          toggleActions: "play none none none",
        },
        y: 50,
        opacity: 0,
        duration: 0.9,
        ease: "power2.out",
        clearProps: "all",
      });
    },
    { scope: cardRef, dependencies: [animateOnScroll] }
  );

  const title = (lang === "id" ? blog.title_id : blog.title_en) || blog.title;
  const excerpt = (lang === "id" ? blog.excerpt_id : blog.excerpt_en) || blog.excerpt;
  const publishDate =
    lang === "id" && blog.publishDate_id
      ? blog.publishDate_id
      : blog.publishDate_en || blog.publishDate;

  return (
    <div ref={cardRef} className={`blog-card-wrapper ${className}`}>
      <a
        data-cursor="read"
        className="block h-full"
        href={`/blogs/${blog.slug}`}
        onClick={(e) => {
          e.preventDefault();
          onNavigate(`/blogs/${blog.slug}`);
        }}
      >
        <div className="flex flex-col gap-4 group cursor-pointer h-full">
          {/* Card Media with smooth scale on hover */}
          <div className="overflow-hidden rounded-xl bg-card aspect-4/2.5 relative">
            <img
              alt={title}
              loading="lazy"
              decoding="async"
              className="group-hover:scale-110 transition-transform duration-500 ease-in-out object-cover will-change-transform rounded-xl w-full h-full"
              src={blog.coverImage}
            />
          </div>

          {/* Card Details & Meta */}
          <div className="flex flex-col gap-4 flex-grow">
            <div className="flex gap-6">
              <Badge
                type="category"
                label={blog.tags[0] || "Freelance"}
              />
              <div className="text-text-secondary flex items-center gap-2 text-sm">
                <svg
                  stroke="currentColor"
                  fill="currentColor"
                  strokeWidth="0"
                  viewBox="0 0 448 512"
                  height="1em"
                  width="1em"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M128 0c17.7 0 32 14.3 32 32l0 32 128 0 0-32c0-17.7 14.3-32 32-32s32 14.3 32 32l0 32 48 0c26.5 0 48 21.5 48 48l0 48L0 160l0-48C0 85.5 21.5 64 48 64l48 0 0-32c0-17.7 14.3-32 32-32zM0 192l448 0 0 272c0 26.5-21.5 48-48 48L48 512c-26.5 0-48-21.5-48-48L0 192zm64 80l0 32c0 8.8 7.2 16 16 16l32 0c8.8 0 16-7.2 16-16l0-32c0-8.8-7.2-16-16-16l-32 0c-8.8 0-16 7.2-16 16zm128 0l0 32c0 8.8 7.2 16 16 16l32 0c8.8 0 16-7.2 16-16l0-32c0-8.8-7.2-16-16-16l-32 0c-8.8 0-16 7.2-16 16zm144-16c-8.8 0-16 7.2-16 16l0 32c0 8.8 7.2 16 16 16l32 0c8.8 0 16-7.2 16-16l0-32c0-8.8-7.2-16-16-16l-32 0zM64 400l0 32c0 8.8 7.2 16 16 16l32 0c8.8 0 16-7.2 16-16l0-32c0-8.8-7.2-16-16-16l-32 0c-8.8 0-16 7.2-16 16zm144-16c-8.8 0-16 7.2-16 16l0 32c0 8.8 7.2 16 16 16l32 0c8.8 0 16-7.2 16-16l0-32c0-8.8-7.2-16-16-16l-32 0zm112 16l0 32c0 8.8 7.2 16 16 16l32 0c8.8 0 16-7.2 16-16l0-32c0-8.8-7.2-16-16-16l-32 0c-8.8 0-16 7.2-16 16z"></path>
                </svg>
                <p className="font-medium">{publishDate}</p>
              </div>
            </div>

            <div className="px-2 flex-grow flex flex-col justify-between">
              <div>
                <h3 className="blog-title text-xl lg:text-2xl font-medium mb-2 group-hover:text-primary transition-colors duration-300 line-clamp-2">
                  {title}
                </h3>
                <p className="text-sm text-text-secondary leading-relaxed line-clamp-3">
                  {excerpt}
                </p>
              </div>
            </div>
          </div>
        </div>
      </a>
    </div>
  );
};

export interface BlogSectionProps {
  title?: string;
  subtitle?: string;
  items: Blog[];
  maxItems?: number;
  onNavigate: (path: string) => void;
  className?: string;
  id?: string;
}

export const BlogSection: React.FC<BlogSectionProps> = ({
  title,
  subtitle,
  items,
  maxItems,
  onNavigate,
  className = "",
  id = "blog",
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const displayItems = typeof maxItems === "number" ? items.slice(0, maxItems) : items;

  return (
    <section
      ref={containerRef}
      id={id}
      className={`select-none ${className}`}
    >
      {(title || subtitle) && (
        <div className="blog-header flex flex-col lg:flex-row lg:items-center justify-between mb-8 md:mb-12 lg:mb-20">
          {title && <TextTitle className="mb-2 lg:mb-0 max-w-xl">{title}</TextTitle>}
          {subtitle && (
            <TextDesc className="lg:w-[42%] lg:text-right">{subtitle}</TextDesc>
          )}
        </div>
      )}

      <div className="grid md:grid-cols-2 gap-5 gap-y-8 pb-16 md:pb-24">
        {displayItems.map((blog) => (
          <ItemBlog
            key={blog.id}
            blog={blog}
            onNavigate={onNavigate}
          />
        ))}
      </div>
    </section>
  );
};
