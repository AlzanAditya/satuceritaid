import React from "react";

export interface LogoGroup {
  icons: string[];
  direction: "left" | "right";
}

export interface CarouselLogoProps {
  title?: string;
  groups: LogoGroup[];
  className?: string;
}

export const CarouselLogo: React.FC<CarouselLogoProps> = ({
  title,
  groups,
  className = "",
}) => {
  return (
    <div
      className={`p-4 py-5 md:p-5 bg-card rounded-xl h-full overflow-y-hidden flex flex-col justify-between w-full overflow-hidden ${className}`}
    >
      {title && (
        <h3 className="text-2xl font-medium mb-6 md:mb-8 lg:w-[65%]">
          {title}
        </h3>
      )}
      <div className="flex flex-col gap-4">
        {groups.map((group, groupIdx) => {
          const marqueeClass =
            group.direction === "right"
              ? "animate-marquee-reverse"
              : "animate-marquee";
          const loopIcons = [...group.icons, ...group.icons];

          return (
            <div
              key={groupIdx}
              className="relative w-full overflow-hidden rounded-xl"
            >
              <div className={`flex gap-2 ${marqueeClass} w-max`}>
                {loopIcons.map((icon, idx) => (
                  <div
                    key={idx}
                    className="bg-white p-4 rounded-xl min-w-17.5 h-17.5 flex items-center justify-center"
                  >
                    <img
                      alt="tool-icon"
                      className="object-contain w-9 md:min-w-12"
                      src={icon}
                    />
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
