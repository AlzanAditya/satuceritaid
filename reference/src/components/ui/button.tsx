import React, { forwardRef } from "react";

export type ButtonVariant =
  | "primary"
  | "secondary"
  | "dark"
  | "card"
  | "outline"
  | "ghost"
  | "circle-toggle";

export type ButtonSize = "sm" | "md" | "lg" | "icon" | "none";

export type ButtonShape = "rounded-xl" | "rounded-full" | "rounded-2xl" | "rounded-lg" | "circle";

export interface ButtonBaseProps {
  /** Visual variant style */
  variant?: ButtonVariant;
  /** Size variant */
  size?: ButtonSize;
  /** Border radius shape */
  shape?: ButtonShape;
  /** Explicitly enforce 1:1 perfect circular geometry */
  isCircle?: boolean;
  /** Enable shine / gloss sweep effect on hover (.btn-hover) */
  shine?: boolean;
  /** Alias for shine */
  hasShine?: boolean;
  /** Enable the portfolio's signature scrolling double-text hover effect */
  scrollText?: boolean;
  /** Stretch button to full container width */
  fullWidth?: boolean;
  /** Optional icon placed to the left of the label */
  iconLeft?: React.ReactNode;
  /** Optional icon placed to the right of the label */
  iconRight?: React.ReactNode;
  /** Icon wrapper styling style */
  iconWrapper?: "auto" | "rounded" | "circle" | "none";
  /** Optional custom class for icon wrappers */
  iconWrapperClassName?: string;
  /** For circle-toggle variant (e.g. accordion triggers) */
  isOpen?: boolean;
  /** Children content */
  children?: React.ReactNode;
  /** Optional custom class for the label or scroll-text wrapper (e.g. responsive visibility) */
  labelClassName?: string;
  /** Extra Tailwind classes */
  className?: string;
}

export type ButtonAsButton = ButtonBaseProps &
  Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, keyof ButtonBaseProps> & {
    href?: undefined;
  };

export type ButtonAsLink = ButtonBaseProps &
  Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, keyof ButtonBaseProps> & {
    href: string;
  };

export type ButtonProps = ButtonAsButton | ButtonAsLink;

/**
 * Centralized, reusable Button component for PORTO V5 portfolio.
 * Supports polymorphic rendering (as `<button>` or `<a>` when `href` is present),
 * full theme variants (primary gradient, secondary foreground, dark, card, toggle),
 * signature portfolio hover animations (shine sweep + scrolling double-text),
 * and flexible icon composition.
 */
export const Button = forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonProps>(
  (props, ref) => {
    const {
      variant = "primary",
      size = "md",
      shape = "rounded-xl",
      shine = true,
      hasShine,
      scrollText = false,
      fullWidth = false,
      iconLeft,
      iconRight,
      iconWrapper = "auto",
      iconWrapperClassName = "",
      isOpen,
      isCircle = false,
      children,
      labelClassName = "",
      className = "",
      href,
      ...rest
    } = props;

    const isShineEnabled = hasShine !== undefined ? hasShine : shine;
    const isCircleShape = isCircle || shape === "circle" || variant === "circle-toggle";

    // Base structural styling: if className explicitly supplies display utility (e.g. hidden), don't conflict
    const hasExplicitHidden = /\bhidden\b/.test(className);
    const baseDisplay = hasExplicitHidden ? "" : "inline-flex";
    const baseClasses =
      `${baseDisplay} items-center ${isCircleShape ? "justify-center" : ""} cursor-pointer font-medium group transition-all duration-300 ease-in-out select-none`.trim();

    // Width classes
    const hasCustomWidth = /\bw-/.test(className) || /\bsize-/.test(className);
    const widthClasses = fullWidth
      ? "w-full justify-center"
      : isCircleShape || hasCustomWidth
      ? ""
      : "w-fit";

    // Shape classes
    const shapeClass = isCircleShape
      ? "rounded-full aspect-square shrink-0"
      : shape === "rounded-full"
      ? "rounded-full"
      : shape === "rounded-2xl"
      ? "rounded-2xl"
      : shape === "rounded-lg"
      ? "rounded-lg"
      : "rounded-xl";

    // Shine effect (.btn-hover)
    const shineClass = isShineEnabled && !isCircleShape ? "btn-hover" : "";

    // Variant classes
    let variantClasses = "";
    switch (variant) {
      case "primary":
        variantClasses =
          "bg-gradient-to-br from-primary to-secondary text-white shadow-xs hover:opacity-95 active:scale-[0.98]";
        break;
      case "secondary":
        variantClasses =
          "bg-foreground text-text-primary hover:bg-neutral-200/80 shadow-xs active:scale-[0.98]";
        break;
      case "dark":
        variantClasses =
          "bg-black text-white hover:bg-neutral-900 active:scale-[0.98]";
        break;
      case "card":
        variantClasses =
          "bg-card text-text-primary border border-foreground/10 hover:border-foreground/20 shadow-xs active:scale-[0.98]";
        break;
      case "outline":
        variantClasses =
          "border border-foreground/20 bg-transparent text-text-primary hover:bg-foreground/10 active:scale-[0.98]";
        break;
      case "ghost":
        variantClasses =
          "bg-transparent text-text-secondary hover:text-text-primary hover:bg-foreground/5 active:scale-[0.98]";
        break;
      case "circle-toggle":
        variantClasses = `rounded-full aspect-square shrink-0 p-0 transition-colors duration-300 ${
          isOpen
            ? "bg-gradient-to-br from-primary to-secondary text-white"
            : "bg-foreground text-text-primary hover:bg-foreground/80"
        }`;
        break;
    }

    // Size / padding classes (if not circle-toggle / circle and not explicitly overridden via className)
    const hasCustomPadding = /\bp[xy]?-/.test(className);
    let sizeClasses = "";
    if (isCircleShape) {
      if (!hasCustomWidth) {
        // default circle size if not overridden
        sizeClasses = size === "sm" ? "size-8" : size === "lg" ? "size-12" : "size-9 md:size-12";
      }
    } else if (variant !== "circle-toggle" && !hasCustomPadding) {
      switch (size) {
        case "sm":
          sizeClasses = "px-3 py-2 text-sm gap-2";
          break;
        case "lg":
          sizeClasses = "px-6 py-3.5 text-base gap-2.5";
          break;
        case "icon":
          sizeClasses = "p-2.5 md:p-3 justify-center gap-0";
          break;
        case "none":
          sizeClasses = "";
          break;
        case "md":
        default:
          // Default responsive padding matching portfolio design:
          // If shape is rounded-full and has right icon (like contact button) -> px-6 py-2.5
          if (shape === "rounded-full") {
            sizeClasses = "px-4 lg:pr-2 lg:py-2 py-2 text-sm md:text-base gap-2";
          } else {
            // Rounded-xl: asymmetrical lg padding when icons are present
            const leftPad = iconLeft ? "lg:pl-2" : "lg:px-4";
            const rightPad = iconRight ? "lg:pr-2" : "lg:px-4";
            sizeClasses = `px-4 py-3 ${leftPad} ${rightPad} lg:py-2 text-sm md:text-base gap-2`;
          }
          break;
      }
    }

    // Determine icon wrapper element based on variant and shape
    const renderIconWrapper = (icon: React.ReactNode, position: "left" | "right") => {
      if (!icon) return null;
      if (iconWrapper === "none") {
        return <span className="shrink-0 flex items-center">{icon}</span>;
      }

      let wrapperClasses = "transition-all duration-300 ease-in-out shrink-0 flex items-center justify-center ";

      if (iconWrapper === "circle" || shape === "rounded-full") {
        wrapperClasses += "p-1.5 lg:p-2 rounded-full group-hover:bg-white/40";
      } else {
        // rounded-xl buttons
        if (variant === "primary" || variant === "dark") {
          wrapperClasses += "lg:p-2 rounded-lg group-hover:bg-white/40";
        } else if (variant === "secondary") {
          wrapperClasses += "lg:p-2 rounded-lg group-hover:bg-text-primary";
        } else {
          wrapperClasses += "p-1 rounded-lg";
        }
      }

      if (iconWrapperClassName) {
        wrapperClasses += ` ${iconWrapperClassName}`;
      }

      return <span className={wrapperClasses}>{icon}</span>;
    };

    // Label content with optional scrollText rolling animation
    const renderContent = () => {
      if (!children) return null;

      const innerText =
        scrollText && typeof children === "string" ? (
          <span className="scroll-text">
            <span className="font-semibold whitespace-nowrap">{children}</span>
            <span className="font-semibold whitespace-nowrap" aria-hidden="true">
              {children}
            </span>
          </span>
        ) : typeof children === "string" ? (
          <span className="font-semibold whitespace-nowrap">{children}</span>
        ) : (
          children
        );

      if (labelClassName) {
        return <span className={labelClassName}>{innerText}</span>;
      }

      return innerText;
    };

    const combinedClassName = [
      baseClasses,
      widthClasses,
      shapeClass,
      shineClass,
      variantClasses,
      sizeClasses,
      className,
    ]
      .filter(Boolean)
      .join(" ");

    const innerContent = (
      <>
        {iconLeft && renderIconWrapper(iconLeft, "left")}
        {renderContent()}
        {iconRight && renderIconWrapper(iconRight, "right")}
      </>
    );

    if (href !== undefined) {
      const { ...anchorRest } = rest as React.AnchorHTMLAttributes<HTMLAnchorElement>;
      return (
        <a
          ref={ref as React.Ref<HTMLAnchorElement>}
          href={href}
          className={combinedClassName}
          {...anchorRest}
        >
          {innerContent}
        </a>
      );
    }

    const { type = "button", ...buttonRest } = rest as React.ButtonHTMLAttributes<HTMLButtonElement>;
    return (
      <button
        ref={ref as React.Ref<HTMLButtonElement>}
        type={type}
        className={combinedClassName}
        {...buttonRest}
      >
        {innerContent}
      </button>
    );
  }
);

Button.displayName = "Button";

export default Button;
