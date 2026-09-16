import React, { forwardRef } from "react";

export type BadgeType = "header" | "simple" | "point" | "category";

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * The structural and visual type of badge:
   * - "header": e.g., "Available For Freelance" with pulsing indicator dot & border
   * - "simple": e.g., clean project tags on /projects/:slug
   * - "point": e.g., "Full-Stack Web Developer" in "Hey, Tech Enthusiasts!" with gradient circle container & icon
   * - "category": e.g., project category (Website, Business System) or blog category (Freelance) with gradient bullet
   */
  type?: BadgeType;

  /**
   * Text label (can also be passed as children)
   */
  label?: React.ReactNode;

  /**
   * Icon or point element for type="point" or optional icon
   */
  icon?: React.ReactNode;

  /**
   * Whether to show the indicator dot / bullet
   * Default: true for "header" and "category", false for "simple" and "point"
   */
  dot?: boolean;

  /**
   * Custom dot className (override default dot styling)
   */
  dotClassName?: string;

  /**
   * Whether the dot pulses (for header badges). Default: true for "header"
   */
  animatePulse?: boolean;

  /**
   * Custom typography / text className
   */
  textClassName?: string;

  /**
   * Custom icon container className (for type="point")
   */
  iconContainerClassName?: string;
}

/**
 * Modular Badge Component
 * 
 * Centralizes styling, layout, borders, and shadows for all badges across the website.
 */
export const Badge = forwardRef<HTMLDivElement, BadgeProps>(
  (
    {
      type = "simple",
      label,
      icon,
      dot,
      dotClassName = "",
      animatePulse = true,
      textClassName = "",
      iconContainerClassName = "",
      className = "",
      children,
      ...rest
    },
    ref
  ) => {
    const content = children !== undefined ? children : label;

    // 1. TYPE: HEADER ("Available For Freelance")
    if (type === "header") {
      const showDot = dot !== false;
      return (
        <div
          ref={ref}
          className={`inline-flex items-center gap-3 px-4 py-2 border border-text-secondary/30 w-fit rounded-full select-none ${className}`}
          {...rest}
        >
          {showDot && (
            <span
              className={`size-3 bg-primary rounded-full shrink-0 ${
                animatePulse ? "animate-pulse" : ""
              } ${dotClassName}`}
            />
          )}
          <strong
            className={`font-medium text-sm md:text-lg text-text-primary ${textClassName}`}
          >
            {content}
          </strong>
        </div>
      );
    }

    // 2. TYPE: SIMPLE (projects tags on /projects/:slug)
    if (type === "simple") {
      return (
        <div
          ref={ref}
          className={`inline-flex items-center px-4 py-2 bg-card rounded-lg text-sm md:text-base font-medium text-text-primary border border-foreground/5 shadow-2xs select-none w-fit ${className}`}
          {...rest}
        >
          {icon && <span className="mr-2 inline-flex items-center">{icon}</span>}
          <span className={textClassName}>{content}</span>
        </div>
      );
    }

    // 3. TYPE: POINT ("Hey, Tech Enthusiasts!" - "Full-Stack Web Developer", etc.)
    if (type === "point") {
      return (
        <div
          ref={ref}
          className={`inline-flex items-center gap-3 bg-linear-to-r from-white/80 to-white/90 border border-white w-fit pr-3 md:pr-4 pl-1.5 md:pl-2 py-1.5 md:py-2 rounded-full shadow-xs select-none ${className}`}
          {...rest}
        >
          {icon && (
            <div
              className={`bg-linear-to-br from-primary to-secondary text-white p-1.5 rounded-full flex items-center justify-center shrink-0 ${iconContainerClassName}`}
            >
              {icon}
            </div>
          )}
          <strong
            className={`text-black text-sm md:text-lg lg:text-sm 2xl:text-base font-semibold ${textClassName}`}
          >
            {content}
          </strong>
        </div>
      );
    }

    // 4. TYPE: CATEGORY (Website, Business System, Freelance)
    if (type === "category") {
      const showDot = dot !== false;
      return (
        <div
          ref={ref}
          className={`inline-flex items-center gap-3 bg-card rounded-full pl-3 pr-4 py-2 w-fit select-none ${className}`}
          {...rest}
        >
          {showDot && (
            <div
              className={`size-3.5 md:size-4 bg-linear-to-br from-primary to-secondary rounded-full shrink-0 ${dotClassName}`}
            />
          )}
          <strong
            className={`text-sm md:text-xs font-semibold text-text-primary ${textClassName}`}
          >
            {content}
          </strong>
        </div>
      );
    }

    return null;
  }
);

Badge.displayName = "Badge";
