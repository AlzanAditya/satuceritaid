import React, { createContext, useContext, useState, useEffect } from "react";
import gsap from "gsap";

interface AnimationContextType {
  animationsEnabled: boolean;
  setAnimationsEnabled: (enabled: boolean) => void;
  toggleAnimations: () => void;
}

const AnimationContext = createContext<AnimationContextType | undefined>(undefined);

const STORAGE_KEY = "alzanaditya_animations_enabled";

export const AnimationProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [animationsEnabled, setAnimationsEnabledState] = useState<boolean>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved !== null) {
        return saved === "true";
      }
      // Check system reduced-motion preference as fallback default
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        return false;
      }
    }
    return true;
  });

  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Sync DOM classes, GSAP timeScale, and localStorage whenever state changes
  useEffect(() => {
    if (typeof document === "undefined") return;

    if (animationsEnabled) {
      document.documentElement.classList.remove("disable-animations");
      document.documentElement.classList.remove("reduce-motion");
      // Restore normal GSAP timeline speed
      try {
        gsap.globalTimeline.timeScale(1);
      } catch {
        // Safe fallback
      }
    } else {
      document.documentElement.classList.add("disable-animations");
      document.documentElement.classList.add("reduce-motion");
      // Accelerate GSAP timelines so animations resolve immediately without lag
      try {
        gsap.globalTimeline.timeScale(100);
      } catch {
        // Safe fallback
      }
    }

    try {
      localStorage.setItem(STORAGE_KEY, String(animationsEnabled));
    } catch {
      // Safe fallback
    }
  }, [animationsEnabled]);

  const setAnimationsEnabled = (enabled: boolean) => {
    setAnimationsEnabledState(enabled);
  };

  const toggleAnimations = () => {
    setAnimationsEnabledState((prev) => {
      const next = !prev;
      setToastMessage(next ? "Animasi: Diaktifkan (ON)" : "Animasi: Dinonaktifkan (OFF)");
      return next;
    });
  };

  // Auto-dismiss toast notification after 2.5s
  useEffect(() => {
    if (!toastMessage) return;
    const timer = setTimeout(() => {
      setToastMessage(null);
    }, 2500);
    return () => clearTimeout(timer);
  }, [toastMessage]);

  return (
    <AnimationContext.Provider
      value={{
        animationsEnabled,
        setAnimationsEnabled,
        toggleAnimations,
      }}
    >
      {children}

      {/* Floating Feedback Notification on Toggle */}
      {toastMessage && (
        <div
          role="status"
          aria-live="polite"
          className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[9999] px-4 py-2.5 rounded-full bg-neutral-900/90 backdrop-blur-md text-white text-xs md:text-sm font-medium shadow-xl border border-white/20 flex items-center gap-2 pointer-events-none transition-all duration-300 animate-in fade-in slide-in-from-bottom-3"
        >
          <span className="inline-block size-2 rounded-full bg-primary" />
          <span>{toastMessage}</span>
        </div>
      )}
    </AnimationContext.Provider>
  );
};

export const useAnimation = (): AnimationContextType => {
  const context = useContext(AnimationContext);
  if (!context) {
    throw new Error("useAnimation must be used within an AnimationProvider");
  }
  return context;
};
