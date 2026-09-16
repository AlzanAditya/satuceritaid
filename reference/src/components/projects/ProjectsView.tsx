import React, { useState, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Project } from "../../types";
import { useLanguage } from "../../context/LanguageContext";
import { ProjectsHero } from "./ProjectsHero";
import { RecentProjectSection } from "./RecentProjectSection";
import { ProjectGridItem } from "./ProjectGridItem";
import { ComingSoonCard } from "./ComingSoonCard";

gsap.registerPlugin(ScrollTrigger);

interface ProjectsViewProps {
  projects: Project[];
  onNavigate: (path: string) => void;
}

export const ProjectsView: React.FC<ProjectsViewProps> = ({
  projects,
  onNavigate,
}) => {
  const { lang, t } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const gridSectionRef = useRef<HTMLElement>(null);

  const categories = ["Website", "Business System", "Web App"];

  const filteredProjects =
    selectedCategory === "All" || selectedCategory === "All Categories"
      ? projects
      : projects.filter((p) => {
          if (selectedCategory === "Business System" || selectedCategory === "Dashboard System") {
            return (
              p.category === "Business System" ||
              p.category === "Dashboard System" ||
              p.category === "System & ERP"
            );
          }
          return p.category === selectedCategory;
        });

  // Recent delivered project (Yobss or first project)
  const recentProject =
    projects.find(
      (p) => p.slug === "yobss-your-business-system"
    ) || projects[0];

  useGSAP(
    () => {
      gsap
        .timeline({
          scrollTrigger: {
            trigger: gridSectionRef.current,
            start: "top 50%",
            toggleActions: "play none none none",
          },
        })
        .from(".project-title", {
          y: 40,
          opacity: 0,
          filter: "blur(10px)",
          duration: 1.2,
          ease: "power4.out",
        })
        .from(
          ".project-desc",
          {
            y: 20,
            opacity: 0,
            duration: 0.8,
            ease: "power3.out",
          },
          "-=0.8"
        );
    },
    { scope: gridSectionRef }
  );

  return (
    <div className="min-h-screen">
      {/* 1. Hero Section */}
      <ProjectsHero
        activeCategory={selectedCategory}
        onSelectCategory={(cat) => setSelectedCategory(cat)}
        categories={categories}
      />

      {/* 2. Recently Delivered Projects Section */}
      {recentProject && (
        <RecentProjectSection
          project={recentProject}
          onNavigate={onNavigate}
        />
      )}

      {/* 3. Everything I've Built Section */}
      <section
        ref={gridSectionRef}
        id="all-projects-section"
        className="pt-12 lg:pt-20 px-4 md:px-12 lg:px-36 xl:px-48 2xl:container mx-auto overflow-x-hidden select-none pb-16 md:pb-24"
      >
        <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-8 md:mb-12 lg:mb-20">
          <h2 className="project-title font-semibold text-3xl md:text-5xl mb-2 lg:mb-0 leading-[1.2]">
            {t("projects.everythingBuiltTitle")}
          </h2>
          <p className="project-desc md:text-lg font-medium text-text-secondary lg:text-right">
            {t("projects.everythingBuiltSubtitle")}
          </p>
        </div>

        {/* Project Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 overflow-y-clip gap-6 gap-y-10 lg:gap-8 lg:gap-y-12">
          {filteredProjects.map((project) => (
            <ProjectGridItem
              key={project.id}
              project={project}
              onNavigate={onNavigate}
            />
          ))}

          {/* 10th Card: Coming Soon (shown when viewing all categories or web app) */}
          {(selectedCategory === "All" ||
            selectedCategory === "All Categories") && <ComingSoonCard />}
        </div>
      </section>
    </div>
  );
};
