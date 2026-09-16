import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

interface LoadingScreenProps {
  isVisible: boolean;
  /** Set to true to re-enable the loading screen; disabled by default */
  enabled?: boolean;
  isExiting?: boolean;
  onExitComplete?: () => void;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({
  isVisible,
  enabled = false,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Disabled per user request (preserved for future use without deleting file)
  const shouldRender = enabled && isVisible;

  // Lock scroll when visible, unlock when unmounted or hidden
  useEffect(() => {
    if (shouldRender) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [shouldRender]);

  // Fast crisp entrance animation when triggered
  useGSAP(
    () => {
      if (!shouldRender) return;

      // Entrance items
      gsap
        .timeline()
        .from(".loading-item", {
          opacity: 0,
          y: 8,
          duration: 0.25,
          stagger: 0.08,
          ease: "power2.out",
        });

      // Continuous loop on progress bar
      gsap.to(".loading-bar", {
        left: "150%",
        duration: 1.0,
        ease: "power2.inOut",
        repeat: -1,
      });
    },
    { scope: containerRef, dependencies: [shouldRender] }
  );

  if (!shouldRender) {
    return null;
  }

  return (
    <div
      ref={containerRef}
      id="app-loading-screen"
      aria-hidden={!isVisible}
      className="fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-background select-none pointer-events-none"
    >
      <div className="flex flex-col items-center gap-6">
        {/* Brand Name Text with signature gradient */}
        <h2 className="loading-item text-xl md:text-2xl font-bold tracking-widest bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent uppercase">
          Alzan Aditya
        </h2>

        {/* Animated Progress Bar matching reference exactly */}
        <div className="loading-item w-28 md:w-36 h-[2px] bg-primary/10 rounded-full overflow-hidden relative">
          <div className="loading-bar absolute top-0 -left-[60%] w-1/2 h-full bg-gradient-to-r from-primary to-secondary rounded-full" />
        </div>
      </div>
    </div>
  );
};
