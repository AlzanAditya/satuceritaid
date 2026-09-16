import React from "react";
import { ChevronRight } from "lucide-react";

export interface BreadcrumbItem {
  label: string;
  href?: string;
  onClick?: () => void;
  isCurrent?: boolean;
  id?: string;
}

export interface BreadcrumbProps {
  items: BreadcrumbItem[];
  className?: string;
  id?: string;
  ariaLabel?: string;
}

export const Breadcrumb: React.FC<BreadcrumbProps> = ({
  items,
  className = "",
  id,
  ariaLabel = "Breadcrumb",
}) => {
  if (!items || items.length === 0) return null;

  return (
    <div className={`animate-breadcrumb w-full max-w-full overflow-hidden min-w-0 ${className}`.trim()} id={id}>
      <nav
        aria-label={ariaLabel}
        className="flex items-center flex-nowrap gap-1.5 sm:gap-2 text-sm md:text-base font-medium select-none w-full max-w-full overflow-hidden min-w-0"
      >
        {items.map((item, index) => {
          const isLast = index === items.length - 1 || item.isCurrent;

          return (
            <React.Fragment key={index}>
              {index > 0 && (
                <ChevronRight
                  className="breadcrumb-item text-text-secondary/40 text-base md:text-lg shrink-0 pointer-events-none"
                  aria-hidden="true"
                />
              )}

              {isLast ? (
                <span
                  id={item.id}
                  aria-current="page"
                  className="breadcrumb-item text-text-primary font-medium whitespace-nowrap truncate min-w-0 flex-1 block"
                  title={item.label}
                >
                  {item.label}
                </span>
              ) : (
                <a
                  id={item.id}
                  href={item.href || "#"}
                  onClick={(e) => {
                    if (item.onClick) {
                      e.preventDefault();
                      item.onClick();
                    }
                  }}
                  className="breadcrumb-item shrink-0 max-w-[120px] sm:max-w-[170px] md:max-w-[220px] truncate whitespace-nowrap text-text-secondary hover:text-text-primary transition-colors duration-300 cursor-pointer capitalize block"
                  title={item.label}
                >
                  {item.label}
                </a>
              )}
            </React.Fragment>
          );
        })}
      </nav>
    </div>
  );
};

export default Breadcrumb;
