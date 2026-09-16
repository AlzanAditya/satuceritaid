import React from "react";

export interface StatCardItem {
  value: string | number;
  suffix?: string;
  suffixColor?: "primary" | "secondary" | string;
  label: React.ReactNode;
  action?: React.ReactNode;
  colSpan?: string;
  order?: string;
  className?: string;
}

export interface StatCardProps {
  item: StatCardItem;
  defaultColSpan?: string;
  defaultOrder?: string;
}

export const StatCard: React.FC<StatCardProps> = ({
  item,
  defaultColSpan = "col-span-1 lg:col-span-4",
  defaultOrder = "",
}) => {
  const colSpanClass = item.colSpan || defaultColSpan;
  const orderClass = item.order || defaultOrder;
  const suffixColorClass =
    item.suffixColor === "secondary"
      ? "text-secondary"
      : item.suffixColor === "primary"
      ? "text-primary"
      : item.suffixColor || "text-primary";

  return (
    <div
      className={`about-stat-card ${colSpanClass} ${orderClass} bg-linear-to-r from-primary/10 to-secondary/10 p-4 rounded-xl flex flex-col gap-4 md:gap-5 ${
        item.className || ""
      }`}
    >
      <div className="flex items-start justify-between">
        <strong className="text-5xl font-medium">
          {item.value}
          {item.suffix && <span className={suffixColorClass}>{item.suffix}</span>}
        </strong>
        {item.action && <div>{item.action}</div>}
      </div>
      <p className="md:text-lg font-medium text-text-primary">
        {item.label}
      </p>
    </div>
  );
};

export interface StatCardsProps {
  items: StatCardItem[];
  className?: string;
}

export const StatCards: React.FC<StatCardsProps> = ({
  items,
  className = "",
}) => {
  const defaultLayouts = [
    { colSpan: "lg:col-span-3", order: "order-first lg:order-1" },
    { colSpan: "lg:col-span-5 col-span-2", order: "order-last lg:order-2" },
    { colSpan: "lg:col-span-4", order: "order-2 lg:order-3" },
  ];

  return (
    <div
      className={`grid grid-cols-2 lg:grid-cols-12 gap-4 md:gap-5 ${className}`}
    >
      {items.map((item, idx) => {
        const layout = defaultLayouts[idx] || {
          colSpan: "col-span-2 lg:col-span-4",
          order: "",
        };
        return (
          <StatCard
            key={idx}
            item={item}
            defaultColSpan={layout.colSpan}
            defaultOrder={layout.order}
          />
        );
      })}
    </div>
  );
};
