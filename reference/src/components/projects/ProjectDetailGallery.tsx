import React, { useState, useRef, useEffect } from "react";
import { ChevronRight } from "lucide-react";

interface ProjectDetailGalleryProps {
  images: string[];
  title: string;
  onOpenLightbox: (index: number) => void;
}

export const ProjectDetailGallery: React.FC<ProjectDetailGalleryProps> = ({
  images,
  title,
  onOpenLightbox,
}) => {
  if (!images || images.length === 0) return null;

  // Desktop display: up to 4 slots in grid
  const displayImages = images.slice(0, 4);
  const remainingCount = images.length > 4 ? images.length - 3 : 0;

  // Mobile display:
  // Slot 1: Cover Image (images[0])
  // Slot 2: Content Images Slider (images.slice(1) -> image-1, image-2, etc.)
  const coverImage = images[0];
  const sliderImages = images.slice(1);

  const [activeSlide, setActiveSlide] = useState(0);
  const [hasMovedToNext, setHasMovedToNext] = useState(false);

  // Reset active slide and navigation tracking when project images change
  useEffect(() => {
    setActiveSlide(0);
    setHasMovedToNext(false);
  }, [images]);

  // Once moved away from the first slide, mark as moved so the button never re-appears
  useEffect(() => {
    if (activeSlide > 0) {
      setHasMovedToNext(true);
    }
  }, [activeSlide]);

  // Touch and swipe gesture handling
  const touchStartX = useRef<number>(0);
  const touchStartY = useRef<number>(0);
  const touchDeltaX = useRef<number>(0);
  const isDragging = useRef<boolean>(false);
  const hasMoved = useRef<boolean>(false);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
    touchDeltaX.current = 0;
    hasMoved.current = false;
    isDragging.current = true;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging.current) return;
    const currentX = e.touches[0].clientX;
    const currentY = e.touches[0].clientY;
    const deltaX = currentX - touchStartX.current;
    const deltaY = currentY - touchStartY.current;

    // Only recognize horizontal drag if horizontal motion exceeds vertical motion
    if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 8) {
      hasMoved.current = true;
      touchDeltaX.current = deltaX;
    }
  };

  const handleTouchEnd = () => {
    if (!isDragging.current) return;
    isDragging.current = false;
    const minSwipeDistance = 35;

    if (hasMoved.current && Math.abs(touchDeltaX.current) > minSwipeDistance) {
      if (touchDeltaX.current < 0) {
        // Swiped left -> advance to next image
        handleNextSlide();
      } else {
        // Swiped right -> go back to previous image
        handlePrevSlide();
      }
    }
    touchDeltaX.current = 0;
  };

  // Mouse drag support for desktop responsive mode testing
  const isMouseDown = useRef<boolean>(false);
  const mouseStartX = useRef<number>(0);
  const mouseDeltaX = useRef<number>(0);
  const mouseHasMoved = useRef<boolean>(false);

  const handleMouseDown = (e: React.MouseEvent) => {
    isMouseDown.current = true;
    mouseStartX.current = e.clientX;
    mouseDeltaX.current = 0;
    mouseHasMoved.current = false;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isMouseDown.current) return;
    const delta = e.clientX - mouseStartX.current;
    if (Math.abs(delta) > 8) {
      mouseHasMoved.current = true;
      mouseDeltaX.current = delta;
    }
  };

  const handleMouseUp = () => {
    if (!isMouseDown.current) return;
    isMouseDown.current = false;
    if (mouseHasMoved.current && Math.abs(mouseDeltaX.current) > 35) {
      if (mouseDeltaX.current < 0) {
        handleNextSlide();
      } else {
        handlePrevSlide();
      }
    }
    mouseDeltaX.current = 0;
  };

  const handleMouseLeave = () => {
    if (isMouseDown.current) {
      isMouseDown.current = false;
      mouseDeltaX.current = 0;
    }
  };

  const handleNextSlide = () => {
    setHasMovedToNext(true);
    setActiveSlide((prev) => (prev < sliderImages.length - 1 ? prev + 1 : prev));
  };

  const handlePrevSlide = () => {
    setActiveSlide((prev) => (prev > 0 ? prev - 1 : prev));
  };

  const handleSlideClick = (index: number) => {
    if (!hasMoved.current && !mouseHasMoved.current) {
      // Open lightbox at actual index (slider index + 1)
      onOpenLightbox(index + 1);
    }
  };

  return (
    <>
      {/* MOBILE ONLY VIEW: Shows Cover + 1 Swipeable Content Image Carousel */}
      <div
        id="project-detail-gallery-mobile"
        className="md:hidden flex flex-col gap-4 mb-8 image-grid"
      >
        {/* 1. Cover Image */}
        <div
          id="mobile-gallery-cover"
          className="animate-image relative group overflow-hidden rounded-xl bg-card border border-foreground/5 shadow-xs"
          onClick={() => onOpenLightbox(0)}
        >
          <img
            alt={`${title} cover screenshot`}
            data-cursor="View"
            loading="eager"
            decoding="async"
            className="w-full h-auto rounded-xl cursor-pointer transition-transform duration-500 active:scale-98 block"
            src={coverImage}
          />
        </div>

        {/* 2. Swipeable Content Images (image-1, image-2, etc.) */}
        {sliderImages.length > 0 && (
          <div className="animate-image flex flex-col">
            <div
              id="mobile-gallery-slider"
              className="relative overflow-hidden rounded-xl bg-card border border-foreground/5 shadow-xs select-none touch-pan-y"
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseLeave}
            >
              {/* Slides Track with smooth animation */}
              <div
                className="flex transition-transform duration-300 ease-out will-change-transform"
                style={{ transform: `translateX(-${activeSlide * 100}%)` }}
              >
                {sliderImages.map((image, idx) => (
                  <div
                    key={idx}
                    className="w-full shrink-0 relative cursor-pointer"
                    onClick={() => handleSlideClick(idx)}
                  >
                    <img
                      alt={`${title} screenshot ${idx + 2}`}
                      data-cursor="View"
                      loading={idx === 0 ? "eager" : "lazy"}
                      decoding="async"
                      className="w-full h-auto rounded-xl block pointer-events-none"
                      src={image}
                    />
                  </div>
                ))}
              </div>

              {/* Next Slide Button: Only appears on image-1 (slide 0) and once moved to other images, does not appear anymore */}
              {sliderImages.length > 1 && activeSlide === 0 && !hasMovedToNext && (
                <button
                  type="button"
                  id="mobile-gallery-next-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleNextSlide();
                  }}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/50 hover:bg-black/70 text-white backdrop-blur-md flex items-center justify-center transition-all duration-200 z-10 shadow-xs cursor-pointer active:scale-90"
                  aria-label="Next image"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Indicator Dots Below Image: Active is Purple & 2x wider pill, Inactive are faded softer/whiter */}
            {sliderImages.length > 1 && (
              <div
                id="mobile-gallery-indicator-dots"
                className="flex items-center justify-center gap-1.5 mt-3 py-1"
              >
                {sliderImages.map((_, idx) => {
                  const isActive = idx === activeSlide;
                  return (
                    <button
                      key={idx}
                      type="button"
                      id={`mobile-gallery-dot-${idx}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        setActiveSlide(idx);
                      }}
                      aria-label={`Go to screenshot ${idx + 1}`}
                      className={`h-2 rounded-full transition-all duration-300 ease-out cursor-pointer ${
                        isActive
                          ? "w-6 bg-primary shadow-xs"
                          : "w-2 bg-zinc-200/60 dark:bg-zinc-700/40 hover:bg-zinc-300"
                      }`}
                    />
                  );
                })}
              </div>
            )}
          </div>
        )}
      </div>

      {/* DESKTOP & TABLET VIEW: Unchanged 4-Slot Grid Gallery */}
      <div
        id="project-detail-gallery-grid"
        className="hidden md:grid md:grid-cols-12 gap-4 mb-8 md:mb-12 image-grid items-start"
      >
        {displayImages.map((image, index) => {
          const isLastSlotWithMore = index === 3 && remainingCount > 0;
          const colSpanClass =
            displayImages.length === 1 ? "md:col-span-12" : "md:col-span-6";

          return (
            <div
              key={index}
              id={`project-gallery-item-${index}`}
              className={`${colSpanClass} animate-image relative group overflow-hidden rounded-xl bg-card border border-foreground/5 shadow-xs`}
              onClick={() => onOpenLightbox(index)}
            >
              <img
                alt={`${title} screenshot ${index + 1}`}
                data-cursor="View"
                loading={index < 2 ? "eager" : "lazy"}
                decoding="async"
                className="w-full h-auto rounded-xl cursor-pointer transition-transform duration-500 group-hover:scale-105 block"
                src={image}
              />

              {isLastSlotWithMore && (
                <div
                  id="gallery-view-more-overlay"
                  className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center cursor-pointer transition-all duration-300 group-hover:bg-black/50"
                >
                  <span className="text-white text-4xl md:text-5xl font-bold mb-1">
                    +{remainingCount}
                  </span>
                  <span className="text-white/80 text-sm md:text-base font-medium tracking-wide uppercase">
                    View More
                  </span>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </>
  );
};
