import React, { useEffect, useState, useCallback } from "react";

interface ProjectImageLightboxProps {
  isOpen: boolean;
  onClose: () => void;
  images: string[];
  initialIndex?: number;
  projectTitle: string;
}

export const ProjectImageLightbox: React.FC<ProjectImageLightboxProps> = ({
  isOpen,
  onClose,
  images,
  initialIndex = 0,
  projectTitle,
}) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);

  useEffect(() => {
    setCurrentIndex(initialIndex);
  }, [initialIndex, isOpen]);

  const handlePrev = useCallback(() => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : images.length - 1));
  }, [images.length]);

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => (prev < images.length - 1 ? prev + 1 : 0));
  }, [images.length]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "ArrowRight") handleNext();
    };

    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose, handlePrev, handleNext]);

  if (!isOpen || images.length === 0) return null;

  return (
    <div
      id="project-lightbox-backdrop"
      className="fixed inset-0 z-50 flex flex-col items-center justify-between p-4 md:p-6 bg-black/92 backdrop-blur-md select-none transition-opacity duration-300"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      {/* Top Header Bar */}
      <div className="w-full flex items-center justify-between z-10 text-white/90">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-white/10 rounded-full text-xs md:text-sm font-semibold tracking-wide">
            {currentIndex + 1} / {images.length}
          </span>
          <span className="font-medium text-sm md:text-base text-white/80 truncate max-w-[200px] sm:max-w-md">
            {projectTitle}
          </span>
        </div>

        <button
          id="close-lightbox-btn"
          onClick={onClose}
          aria-label="Close Lightbox"
          className="p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
        >
          <svg
            stroke="currentColor"
            fill="none"
            strokeWidth="2"
            viewBox="0 0 24 24"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-xl"
            height="1em"
            width="1em"
            xmlns="http://www.w3.org/2000/svg"
          >
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
      </div>

      {/* Main Image Viewport */}
      <div className="relative w-full flex-1 flex items-center justify-center my-2 max-h-[78vh] overflow-hidden">
        {images.length > 1 && (
          <button
            id="lightbox-prev-btn"
            onClick={handlePrev}
            aria-label="Previous Image"
            className="absolute left-2 md:left-6 z-20 p-3 rounded-full bg-black/50 hover:bg-black/80 text-white/90 hover:text-white transition-all backdrop-blur-xs cursor-pointer border border-white/10"
          >
            <svg
              stroke="currentColor"
              fill="none"
              strokeWidth="2"
              viewBox="0 0 24 24"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-xl md:text-2xl"
              height="1em"
              width="1em"
              xmlns="http://www.w3.org/2000/svg"
            >
              <polyline points="15 18 9 12 15 6"></polyline>
            </svg>
          </button>
        )}

        <img
          key={currentIndex}
          src={images[currentIndex]}
          alt={`${projectTitle} screenshot ${currentIndex + 1}`}
          className="max-h-full max-w-full object-contain rounded-xl shadow-2xl transition-all duration-300 animate-fade-in"
        />

        {images.length > 1 && (
          <button
            id="lightbox-next-btn"
            onClick={handleNext}
            aria-label="Next Image"
            className="absolute right-2 md:right-6 z-20 p-3 rounded-full bg-black/50 hover:bg-black/80 text-white/90 hover:text-white transition-all backdrop-blur-xs cursor-pointer border border-white/10"
          >
            <svg
              stroke="currentColor"
              fill="none"
              strokeWidth="2"
              viewBox="0 0 24 24"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-xl md:text-2xl"
              height="1em"
              width="1em"
              xmlns="http://www.w3.org/2000/svg"
            >
              <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
          </button>
        )}
      </div>

      {/* Bottom Thumbnails */}
      {images.length > 1 && (
        <div className="flex items-center gap-2 overflow-x-auto max-w-full px-2 py-1 z-10 scrollbar-none">
          {images.map((img, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`relative rounded-lg overflow-hidden shrink-0 h-14 w-14 md:h-16 md:w-16 border-2 transition-all cursor-pointer ${
                currentIndex === idx
                  ? "border-primary scale-105 shadow-md opacity-100"
                  : "border-transparent opacity-50 hover:opacity-80"
              }`}
            >
              <img
                src={img}
                alt={`Thumbnail ${idx + 1}`}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
