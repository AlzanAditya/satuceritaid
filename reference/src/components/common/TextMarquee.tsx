import React from "react";

const MARQUEE_ITEMS = [
  { text: "Website Developer", star: "/particle/star-purple.svg" },
  { text: "Businesses System Builder", star: "/particle/star-blue.svg" },
  { text: "Content Creator", star: "/particle/star-purple.svg" },
  { text: "Website Developer", star: "/particle/star-blue.svg" },
  { text: "Businesses System Builder", star: "/particle/star-purple.svg" },
  { text: "Content Creator", star: "/particle/star-blue.svg" },
];

export const TextMarquee: React.FC = () => {
  // 6 sets repeated (24 items total) ensures seamless infinite looping without gaps on any screen width
  const repeated = [
    ...MARQUEE_ITEMS,
    ...MARQUEE_ITEMS,
    ...MARQUEE_ITEMS,
    ...MARQUEE_ITEMS,
    ...MARQUEE_ITEMS,
    ...MARQUEE_ITEMS,
  ];

  return (
    // No extra clipping wrapper here — matches ref_index.html/ref_about.html exactly,
    // where this rotated band is a direct child of <main class="overflow-x-clip">.
    // That's the important bit: `overflow-x-clip` (not `overflow-x-hidden`) is used
    // on the ancestor <main>, because per the CSS spec, if overflow-x is 'hidden'/'auto'
    // while overflow-y is 'visible', the visible axis gets silently forced to 'auto'
    // (which still clips). 'clip' is exempt from that auto-correction, so the ancestor
    // clips X only and this band's rotated vertical bleed can still spill over/
    // "menimpa" the section above and below it instead of being flattened.
    // `isolate` + z-30 keeps it above other page content (hero photos, decorative
    // particles, etc.) regardless of stacking-context quirks from those sections,
    // while staying below the Navbar (z-50) and CustomCursor (z-9999).
    <div
      data-cursor="ROLES"
      className="relative isolate z-30 w-[110%] -ml-[5%] overflow-hidden bg-text-primary border-y border-foreground/5 py-6 md:py-8 select-none -rotate-3 md:-rotate-1 -translate-y-4"
    >
      <div
        className="flex whitespace-nowrap animate-marquee group w-max"
        style={{ animationDuration: "75s" }}
      >
        {repeated.map((item, idx) => (
          <div
            key={idx}
            className="flex items-center gap-6 md:gap-10 px-4 md:px-10 shrink-0"
          >
            <span className="text-4xl md:text-5xl font-bold uppercase tracking-tighter text-background">
              {item.text}
            </span>
            <img
              alt=""
              loading="lazy"
              width="40"
              height="40"
              decoding="async"
              className="w-6 h-6 md:w-10 md:h-10 group-hover:rotate-45 transition-all duration-800 shrink-0"
              src={item.star}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

