import React, { useRef, useId } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

export interface TextBaseProps {
  children: React.ReactNode;
  className?: string;
  size?: string;
  weight?: string;
  as?: React.ElementType;
  animate?: boolean;
}

/**
 * Helper to split text / react nodes into words for staggered word-by-word animation.
 */
function renderWords(children: React.ReactNode, wordClassName: string = "word inline-block") {
  if (typeof children === "string") {
    const words = children.trim().split(/\s+/);
    return words.map((word, idx) => (
      <span key={`${word}-${idx}`} className="inline-block pb-1">
        <span className={wordClassName}>{word}&nbsp;</span>
      </span>
    ));
  }
  return children;
}

/**
 * TextMainTitle: Used for the primary hero title of a page.
 * Animates from bottom to top word-by-word (y: 60->0, opacity: 0->1, blur: 10px->0px).
 * Default: font-semibold, text-[32px] md:text-6xl.
 */
export const TextMainTitle: React.FC<TextBaseProps> = ({
  children,
  className = "",
  size = "text-[32px] md:text-6xl",
  weight = "font-semibold",
  as: Component = "h1",
  animate = true,
}) => {
  const containerRef = useRef<HTMLElement>(null);
  const id = useId().replace(/:/g, "");
  const markerClass = `main-title-word-${id}`;

  useGSAP(
    () => {
      if (!animate || !containerRef.current) return;
      gsap.from(`.${markerClass}`, {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 90%",
          toggleActions: "play none none none",
        },
        y: 60,
        opacity: 0,
        filter: "blur(10px)",
        duration: 1.2,
        stagger: 0.08,
        ease: "power4.out",
      });
    },
    { scope: containerRef, dependencies: [animate] }
  );

  return (
    <Component
      ref={containerRef as any}
      className={`leading-[1.2] md:leading-[1.3] ${weight} ${size} ${className}`}
    >
      {renderWords(children, `${markerClass} inline-block`)}
    </Component>
  );
};

/**
 * TextTitle: Section header title preceding other components.
 * Simple container fade-up + blur (y: 40->0, opacity: 0->1, blur(10px)->0).
 * Default: font-semibold, text-3xl md:text-5xl.
 */
export const TextTitle: React.FC<TextBaseProps> = ({
  children,
  className = "",
  size = "text-3xl md:text-5xl",
  weight = "font-semibold",
  as: Component = "h2",
  animate = true,
}) => {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (!animate || !containerRef.current) return;
      gsap.from(containerRef.current, {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 85%",
          toggleActions: "play none none none",
        },
        y: 40,
        opacity: 0,
        filter: "blur(10px)",
        duration: 1,
        ease: "power3.out",
      });
    },
    { scope: containerRef, dependencies: [animate] }
  );

  return (
    <Component
      ref={containerRef as any}
      className={`leading-[1.2] ${weight} ${size} ${className}`}
    >
      {children}
    </Component>
  );
};

/**
 * TextMainDesc: Subtitle in the primary page hero section, paired with TextMainTitle.
 * Word-by-word blur-out + slide from left to center (x: -30->0, blur(6px)->0).
 * Default: font-medium, md:text-xl, text-text-secondary.
 */
export const TextMainDesc: React.FC<TextBaseProps> = ({
  children,
  className = "",
  size = "md:text-xl",
  weight = "font-medium",
  as: Component = "p",
  animate = true,
}) => {
  const containerRef = useRef<HTMLElement>(null);
  const id = useId().replace(/:/g, "");
  const markerClass = `main-desc-word-${id}`;

  useGSAP(
    () => {
      if (!animate || !containerRef.current) return;
      gsap.from(`.${markerClass}`, {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 90%",
          toggleActions: "play none none none",
        },
        x: -30,
        opacity: 0,
        filter: "blur(6px)",
        duration: 1,
        stagger: 0.03,
        ease: "power3.out",
      });
    },
    { scope: containerRef, dependencies: [animate] }
  );

  return (
    <Component
      ref={containerRef as any}
      className={`text-text-secondary leading-relaxed ${weight} ${size} ${className}`}
    >
      {renderWords(children, `${markerClass} inline-block`)}
    </Component>
  );
};

/**
 * TextDesc: Companion description for TextTitle.
 * Container fade-up without per-word stagger.
 * Default: font-medium, md:text-lg, text-text-secondary.
 */
export const TextDesc: React.FC<TextBaseProps> = ({
  children,
  className = "",
  size = "md:text-lg",
  weight = "font-medium",
  as: Component = "p",
  animate = true,
}) => {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (!animate || !containerRef.current) return;
      gsap.from(containerRef.current, {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 85%",
          toggleActions: "play none none none",
        },
        y: 20,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
      });
    },
    { scope: containerRef, dependencies: [animate] }
  );

  return (
    <Component
      ref={containerRef as any}
      className={`text-text-secondary leading-relaxed ${weight} ${size} ${className}`}
    >
      {children}
    </Component>
  );
};
