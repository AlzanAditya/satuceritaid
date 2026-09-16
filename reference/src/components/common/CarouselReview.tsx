import React, { useRef } from "react";
import { TextTitle, TextDesc } from "../ui/Text";

export interface ReviewItem {
  id: string;
  name: string;
  role: string;
  avatar?: string;
  content: string;
  rating?: number;
  company?: string;
}

export interface CarouselReviewProps {
  title: string;
  subtitle?: string;
  items?: ReviewItem[];
  className?: string;
}

/**
 * CarouselReview: Scaffold component for testimonial/review carousel.
 * Matches CarouselImage API pattern with TextTitle and TextDesc.
 */
export const CarouselReview: React.FC<CarouselReviewProps> = ({
  title,
  subtitle,
  items = [],
  className = "",
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const loopItems = items.length > 0 ? [...items, ...items] : [];

  return (
    <section
      ref={containerRef}
      className={`py-12 lg:py-20 px-4 md:px-12 lg:px-36 xl:px-48 2xl:container mx-auto overflow-x-hidden overflow-y-clip select-none ${className}`}
    >
      <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-8 md:mb-12 lg:mb-20">
        <TextTitle className="mb-2 lg:mb-0 max-w-2xl">
          {title}
        </TextTitle>
        {subtitle && (
          <TextDesc className="lg:w-[25%] lg:text-right">
            {subtitle}
          </TextDesc>
        )}
      </div>

      <div className="relative flex overflow-hidden rounded-xl group">
        <div className="flex gap-4 md:gap-6 animate-carousel hover:[animation-play-state:paused] py-4">
          {loopItems.map((review, idx) => (
            <div
              key={`${review.id}-${idx}`}
              className="shrink-0 w-80 md:w-96 p-6 bg-card rounded-2xl border border-foreground/10 flex flex-col justify-between"
            >
              <p className="text-text-secondary italic text-sm md:text-base leading-relaxed mb-6">
                "{review.content}"
              </p>
              <div className="flex items-center gap-3">
                {review.avatar ? (
                  <img
                    src={review.avatar}
                    alt={review.name}
                    className="size-10 rounded-full object-cover"
                  />
                ) : (
                  <div className="size-10 rounded-full bg-primary/20 text-primary flex items-center justify-center font-semibold text-sm">
                    {review.name.charAt(0)}
                  </div>
                )}
                <div>
                  <h4 className="font-semibold text-text-primary text-sm">
                    {review.name}
                  </h4>
                  <p className="text-xs text-text-secondary">
                    {review.role} {review.company ? `• ${review.company}` : ""}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
