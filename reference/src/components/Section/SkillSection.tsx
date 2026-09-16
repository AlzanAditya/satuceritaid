import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useLanguage } from "../../context/LanguageContext";
import { TextTitle, TextDesc } from "../ui/Text";
import { CarouselLogo, LogoGroup } from "../common/CarouselLogo";

gsap.registerPlugin(ScrollTrigger);

export interface SkillItem {
  name: string;
  icon?: string;
}

export interface SkillCategoryData {
  name: string;
  skills: string[];
}

export interface SkillCategoryProps {
  category: SkillCategoryData;
  className?: string;
}

export const SkillCategory: React.FC<SkillCategoryProps> = ({
  category,
  className = "",
}) => {
  return (
    <div
      className={`p-6 rounded-xl bg-card border border-foreground/5 flex flex-col gap-4 ${className}`}
    >
      <h3 className="text-xl font-medium text-text-primary">{category.name}</h3>
      <div className="flex flex-wrap gap-2">
        {category.skills.map((skill, idx) => (
          <span
            key={idx}
            className="px-3 py-1 bg-white text-text-primary text-sm font-medium rounded-lg border border-foreground/5"
          >
            {skill}
          </span>
        ))}
      </div>
    </div>
  );
};

export interface SkillSectionProps {
  title?: string;
  subtitle?: string;
  mode?: "marquee" | "grid" | "categorized";
  items?: Array<string | SkillItem>;
  groups?: LogoGroup[];
  categories?: SkillCategoryData[];
  className?: string;
  id?: string;
}

const DEFAULT_GROUPS: LogoGroup[] = [
  {
    direction: "left",
    icons: [
      "/tools/react.png",
      "/tools/nextjs.png",
      "/tools/typescript.png",
      "/tools/tailwind.png",
      "/tools/nodejs.png",
      "/tools/express.png",
    ],
  },
  {
    direction: "right",
    icons: [
      "/tools/postgresql.png",
      "/tools/mongodb.png",
      "/tools/git.png",
      "/tools/figma.png",
      "/tools/docker.png",
      "/tools/vite.png",
    ],
  },
];

export const SkillSection: React.FC<SkillSectionProps> = ({
  title,
  subtitle,
  mode = "marquee",
  items,
  groups,
  categories,
  className = "",
  id = "skills",
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { t } = useLanguage();

  const sectionTitle = title ?? t("skills.title", "Technologies & Tools");
  const sectionSubtitle =
    subtitle ?? t("skills.subtitle", "The tech stack and tools powering my digital solutions.");

  useGSAP(
    () => {
      gsap.from(".skill-header", {
        scrollTrigger: {
          trigger: ".skill-header",
          start: "top 75%",
          toggleActions: "play none none none",
        },
        y: 40,
        opacity: 0,
        filter: "blur(10px)",
        duration: 1,
        ease: "power3.out",
      });
    },
    { scope: containerRef }
  );

  return (
    <section
      ref={containerRef}
      id={id}
      className={`py-12 md:py-20 px-4 md:px-12 lg:px-36 xl:px-48 2xl:container mx-auto select-none ${className}`}
    >
      <div className="skill-header flex flex-col lg:flex-row lg:items-center justify-between mb-8 md:mb-12 lg:mb-16">
        <TextTitle className="mb-2 lg:mb-0 max-w-xl">
          {sectionTitle}
        </TextTitle>
        <TextDesc className="lg:w-[35%] lg:text-right">
          {sectionSubtitle}
        </TextDesc>
      </div>

      {mode === "marquee" && (
        <CarouselLogo
          groups={groups ?? DEFAULT_GROUPS}
        />
      )}

      {mode === "categorized" && categories && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {categories.map((cat, idx) => (
            <SkillCategory key={idx} category={cat} />
          ))}
        </div>
      )}

      {mode === "grid" && items && (
        <div className="flex flex-wrap gap-3">
          {items.map((it, idx) => {
            const name = typeof it === "string" ? it : it.name;
            const icon = typeof it === "object" ? it.icon : undefined;
            return (
              <div
                key={idx}
                className="flex items-center gap-2.5 px-4 py-2.5 bg-card rounded-xl border border-foreground/5 hover:border-primary/20 transition-colors"
              >
                {icon && <img src={icon} alt={name} className="w-5 h-5 object-contain" />}
                <span className="text-sm font-medium text-text-primary">{name}</span>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
};
