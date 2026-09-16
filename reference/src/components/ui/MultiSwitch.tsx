import React, { useId, forwardRef } from "react";

export interface MultiSwitchOption {
  id: string;
  label: string;
  sublabel?: string;
  icon?: React.ReactNode;
  badge?: string;
  badgeClassName?: string;
  disabled?: boolean;
}

export type MultiSwitchVariant =
  | "default"
  | "primary"
  | "orange"
  | "emerald"
  | "purple"
  | "blue"
  | "satucerita"
  | "dark";

export type MultiSwitchSize = "sm" | "md" | "lg";

export interface MultiSwitchProps {
  options: (MultiSwitchOption | string)[];
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  variant?: MultiSwitchVariant;
  size?: MultiSwitchSize;
  className?: string;
  itemClassName?: string;
  activeItemClassName?: string;
  activeBgClassName?: string;
  layoutId?: string;
  id?: string;
  ariaLabel?: string;
}

/**
 * MultiSwitch Component
 *
 * Exactly matching cupsiteproject.com capsule switcher:
 * - 3-layer button architecture:
 *   1. Inactive background layer with smooth hover opacity transition
 *   2. Inactive shimmer shine glint sweep across button on hover/release
 *   3. Active vibrant gradient background with transition-opacity duration-500
 * - Active glowing aura shadow (shadow-[0_0_32px])
 * - Active press scale bounce (active:scale-95 duration-500)
 * - Container scrollbar-none gap-3 md:gap-4.5
 */
export const MultiSwitch = forwardRef<HTMLDivElement, MultiSwitchProps>(
  (
    {
      options,
      value,
      defaultValue,
      onChange,
      variant = "default",
      size = "md",
      className = "",
      itemClassName = "",
      activeItemClassName = "",
      activeBgClassName = "",
      id,
      ariaLabel = "Multi-option switch",
    },
    ref
  ) => {
    // Normalize options to object shape
    const normalizedOptions: MultiSwitchOption[] = options.map((opt) => {
      if (typeof opt === "string") {
        return { id: opt, label: opt };
      }
      return opt;
    });

    const generatedId = useId().replace(/:/g, "");
    const switchId = id || `multi-switch-${generatedId}`;

    const initialValue =
      defaultValue !== undefined
        ? defaultValue
        : normalizedOptions[0]?.id || "";

    const [internalValue, setInternalValue] = React.useState<string>(initialValue);
    const activeId = value !== undefined ? value : internalValue;

    const handleSelect = (optionId: string) => {
      if (value === undefined) {
        setInternalValue(optionId);
      }
      onChange?.(optionId);
    };

    // Size styling maps matching cupsiteproject (default: px-4 py-2 lg:px-6 lg:py-3 text-sm lg:text-base)
    const sizeStyles = {
      sm: "px-3 py-1.5 text-xs rounded-full gap-1.5",
      md: "px-4 py-2 lg:px-6 lg:py-3 text-sm lg:text-base rounded-full gap-2",
      lg: "px-5 py-2.5 lg:px-8 lg:py-3.5 text-base lg:text-lg rounded-full gap-2.5",
    }[size];

    // Theme active gradient and glowing shadow
    const themeStyles: Record<
      MultiSwitchVariant,
      { gradient: string; shadow: string }
    > = {
      default: {
        gradient:
          "bg-gradient-to-r from-[#5e2cd1] via-[#5b8dff] to-[#5e2cd1] bg-[length:200%_auto] bg-left text-white",
        shadow: "shadow-[0_0_32px_rgba(94,44,209,0.55)]",
      },
      primary: {
        gradient:
          "bg-gradient-to-r from-primary via-secondary to-primary bg-[length:200%_auto] bg-left text-white",
        shadow: "shadow-[0_0_32px_rgba(229,0,157,0.55)]",
      },
      purple: {
        gradient:
          "bg-gradient-to-r from-[#5e2cd1] via-[#5b8dff] to-[#5e2cd1] bg-[length:200%_auto] bg-left text-white",
        shadow: "shadow-[0_0_32px_rgba(94,44,209,0.55)]",
      },
      orange: {
        gradient:
          "bg-gradient-to-r from-orange-500 via-amber-500 to-orange-600 bg-[length:200%_auto] bg-left text-white",
        shadow: "shadow-[0_0_32px_rgba(249,115,22,0.55)]",
      },
      emerald: {
        gradient:
          "bg-gradient-to-r from-emerald-500 via-green-500 to-emerald-600 bg-[length:200%_auto] bg-left text-white",
        shadow: "shadow-[0_0_32px_rgba(16,185,129,0.55)]",
      },
      blue: {
        gradient:
          "bg-gradient-to-r from-[#516cff] via-[#89bcf7] to-[#516cff] bg-[length:200%_auto] bg-left text-white",
        shadow: "shadow-[0_0_32px_rgba(81,108,255,0.55)]",
      },
      satucerita: {
        gradient:
          "bg-gradient-to-r from-[#7d6aee] via-[#ad9fff] to-[#7d6aee] bg-[length:200%_auto] bg-left text-white",
        shadow: "shadow-[0_0_32px_rgba(125,106,238,0.55)]",
      },
      dark: {
        gradient: "bg-neutral-900 text-white border border-white/20",
        shadow: "shadow-[0_0_24px_rgba(0,0,0,0.5)]",
      },
    };

    const currentTheme = themeStyles[variant] || themeStyles.default;
    const activeGradient = activeBgClassName || currentTheme.gradient;

    return (
      <div
        ref={ref}
        id={switchId}
        role="tablist"
        aria-label={ariaLabel}
        className={`flex flex-wrap justify-center gap-3 md:gap-4.5 mb-10 md:mb-16 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] scrollbar-none ${className}`}
      >
        {normalizedOptions.map((option) => {
          const isActive = option.id === activeId;
          const isDisabled = option.disabled;

          return (
            <button
              key={option.id}
              id={`${switchId}-tab-${option.id}`}
              role="tab"
              type="button"
              aria-selected={isActive}
              disabled={isDisabled}
              onClick={() => !isDisabled && handleSelect(option.id)}
              className={`group relative overflow-hidden font-medium flex items-center justify-center cursor-pointer transition-all duration-500 active:scale-95 select-none ${sizeStyles} ${
                isActive ? `${currentTheme.shadow} ${activeItemClassName}` : "shadow-none"
              } ${isDisabled ? "opacity-40 cursor-not-allowed" : ""} ${itemClassName}`}
            >
              {/* Layer 1: Inactive Background with 500ms hover transition */}
              <div
                className={`absolute inset-0 bg-neutral-100 hover:bg-neutral-200/90 dark:bg-white/12 dark:hover:bg-white/20 border border-neutral-200 dark:border-white/10 transition-all duration-500 ${
                  isActive ? "opacity-0 pointer-events-none" : "opacity-100"
                }`}
              />

              {/* Layer 2: Inactive Shimmer / Shiny Glint Sweep on hover & release */}
              <div
                className={`absolute inset-0 transition-opacity duration-500 pointer-events-none overflow-hidden ${
                  isActive ? "opacity-0" : "opacity-100"
                }`}
              >
                <div className="absolute right-0 top-0 h-full w-6 translate-x-12 rotate-6 bg-white/40 dark:bg-white opacity-25 transition-transform duration-700 ease-in-out group-hover:-translate-x-64" />
              </div>

              {/* Layer 3: Active Gradient Background with 500ms cross-fade transition */}
              <div
                className={`absolute inset-0 ${activeGradient} transition-opacity duration-500 ${
                  isActive ? "opacity-100" : "opacity-0 pointer-events-none"
                }`}
              />

              {/* Text Label & Badges */}
              <span
                className={`relative z-10 whitespace-nowrap text-xs md:text-base flex items-center gap-2 transition-colors duration-300 ${
                  isActive
                    ? "text-white font-semibold"
                    : "text-neutral-700 dark:text-neutral-200 group-hover:text-neutral-950 dark:group-hover:text-white"
                }`}
              >
                {option.icon && (
                  <span className="shrink-0 transition-transform duration-200 group-hover:scale-105">
                    {option.icon}
                  </span>
                )}
                <span>{option.label}</span>
                {option.sublabel && (
                  <span className="text-[11px] opacity-80 font-normal ml-0.5">
                    {option.sublabel}
                  </span>
                )}
                {option.badge && (
                  <span
                    className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium shrink-0 transition-colors ${
                      option.badgeClassName ||
                      (isActive
                        ? "bg-white/25 text-white"
                        : "bg-primary/10 text-primary")
                    }`}
                  >
                    {option.badge}
                  </span>
                )}
              </span>
            </button>
          );
        })}
      </div>
    );
  }
);

MultiSwitch.displayName = "MultiSwitch";

export default MultiSwitch;
