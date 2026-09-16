import React, { useState, useEffect } from "react";

export const ProgressiveBlur: React.FC = () => {
  const [opacity, setOpacity] = useState(1);

  useEffect(() => {
    const handleScroll = () => {
      if (typeof window === "undefined") return;

      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const docHeight = document.documentElement.scrollHeight;
      const distFromBottom = docHeight - (scrollY + windowHeight);

      // Threshold in pixels before bottom of page where blur smoothly fades out
      const threshold = 350;
      if (distFromBottom < threshold) {
        const calculated = Math.max(0, distFromBottom / threshold);
        setOpacity(calculated);
      } else {
        setOpacity(1);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    // Fixed to the viewport bottom (not "sticky" in the CSS sense) so the blur
    // stays pinned above the footer as the user scrolls, then fades out via
    // the opacity calculated above once the real footer comes into view.
    <div
      className="fixed bottom-0 left-0 right-0 z-40 pointer-events-none select-none h-[15vh] md:h-[20vh] transition-opacity duration-300 ease-out"
      style={{
        opacity: opacity,
      }}
    >
      <div className="absolute inset-0 overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            zIndex: 1,
            maskImage:
              "linear-gradient(to bottom, rgba(0, 0, 0, 0) 0%, rgb(0, 0, 0) 12.5%, rgb(0, 0, 0) 25%, rgba(0, 0, 0, 0) 37.5%)",
            WebkitMaskImage:
              "linear-gradient(to bottom, rgba(0, 0, 0, 0) 0%, rgb(0, 0, 0) 12.5%, rgb(0, 0, 0) 25%, rgba(0, 0, 0, 0) 37.5%)",
            backdropFilter: "blur(0.078125px)",
            WebkitBackdropFilter: "blur(0.078125px)",
          }}
        ></div>
        <div
          className="absolute inset-0"
          style={{
            zIndex: 2,
            maskImage:
              "linear-gradient(to bottom, rgba(0, 0, 0, 0) 12.5%, rgb(0, 0, 0) 25%, rgb(0, 0, 0) 37.5%, rgba(0, 0, 0, 0) 50%)",
            WebkitMaskImage:
              "linear-gradient(to bottom, rgba(0, 0, 0, 0) 12.5%, rgb(0, 0, 0) 25%, rgb(0, 0, 0) 37.5%, rgba(0, 0, 0, 0) 50%)",
            backdropFilter: "blur(0.15625px)",
            WebkitBackdropFilter: "blur(0.15625px)",
          }}
        ></div>
        <div
          className="absolute inset-0"
          style={{
            zIndex: 3,
            maskImage:
              "linear-gradient(to bottom, rgba(0, 0, 0, 0) 25%, rgb(0, 0, 0) 37.5%, rgb(0, 0, 0) 50%, rgba(0, 0, 0, 0) 62.5%)",
            WebkitMaskImage:
              "linear-gradient(to bottom, rgba(0, 0, 0, 0) 25%, rgb(0, 0, 0) 37.5%, rgb(0, 0, 0) 50%, rgba(0, 0, 0, 0) 62.5%)",
            backdropFilter: "blur(0.3125px)",
            WebkitBackdropFilter: "blur(0.3125px)",
          }}
        ></div>
        <div
          className="absolute inset-0"
          style={{
            zIndex: 4,
            maskImage:
              "linear-gradient(to bottom, rgba(0, 0, 0, 0) 37.5%, rgb(0, 0, 0) 50%, rgb(0, 0, 0) 62.5%, rgba(0, 0, 0, 0) 75%)",
            WebkitMaskImage:
              "linear-gradient(to bottom, rgba(0, 0, 0, 0) 37.5%, rgb(0, 0, 0) 50%, rgb(0, 0, 0) 62.5%, rgba(0, 0, 0, 0) 75%)",
            backdropFilter: "blur(0.625px)",
            WebkitBackdropFilter: "blur(0.625px)",
          }}
        ></div>
        <div
          className="absolute inset-0"
          style={{
            zIndex: 5,
            maskImage:
              "linear-gradient(to bottom, rgba(0, 0, 0, 0) 50%, rgb(0, 0, 0) 62.5%, rgb(0, 0, 0) 75%, rgba(0, 0, 0, 0) 87.5%)",
            WebkitMaskImage:
              "linear-gradient(to bottom, rgba(0, 0, 0, 0) 50%, rgb(0, 0, 0) 62.5%, rgb(0, 0, 0) 75%, rgba(0, 0, 0, 0) 87.5%)",
            backdropFilter: "blur(1.25px)",
            WebkitBackdropFilter: "blur(1.25px)",
          }}
        ></div>
        <div
          className="absolute inset-0"
          style={{
            zIndex: 6,
            maskImage:
              "linear-gradient(to bottom, rgba(0, 0, 0, 0) 62.5%, rgb(0, 0, 0) 75%, rgb(0, 0, 0) 87.5%, rgba(0, 0, 0, 0) 100%)",
            WebkitMaskImage:
              "linear-gradient(to bottom, rgba(0, 0, 0, 0) 62.5%, rgb(0, 0, 0) 75%, rgb(0, 0, 0) 87.5%, rgba(0, 0, 0, 0) 100%)",
            backdropFilter: "blur(2.5px)",
            WebkitBackdropFilter: "blur(2.5px)",
          }}
        ></div>
        <div
          className="absolute inset-0"
          style={{
            zIndex: 7,
            maskImage:
              "linear-gradient(to bottom, rgba(0, 0, 0, 0) 75%, rgb(0, 0, 0) 87.5%, rgb(0, 0, 0) 100%)",
            WebkitMaskImage:
              "linear-gradient(to bottom, rgba(0, 0, 0, 0) 75%, rgb(0, 0, 0) 87.5%, rgb(0, 0, 0) 100%)",
            backdropFilter: "blur(5px)",
            WebkitBackdropFilter: "blur(5px)",
          }}
        ></div>
        <div
          className="absolute inset-0"
          style={{
            zIndex: 8,
            maskImage:
              "linear-gradient(to bottom, rgba(0, 0, 0, 0) 87.5%, rgb(0, 0, 0) 100%)",
            WebkitMaskImage:
              "linear-gradient(to bottom, rgba(0, 0, 0, 0) 87.5%, rgb(0, 0, 0) 100%)",
            backdropFilter: "blur(10px)",
            WebkitBackdropFilter: "blur(10px)",
          }}
        ></div>
      </div>
      <div className="absolute inset-0 bg-linear-to-t from-white via-white/40 to-transparent z-10"></div>
    </div>
  );
};
