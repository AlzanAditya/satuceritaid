import React, { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Project } from "../types";
import { useLanguage } from "../context/LanguageContext";
import { ProjectDetailHeader } from "../components/projects/ProjectDetailHeader";
import { ProjectDetailGallery } from "../components/projects/ProjectDetailGallery";
import { ProjectDetailOverview } from "../components/projects/ProjectDetailOverview";
import { ProjectDetailSidebar } from "../components/projects/ProjectDetailSidebar";
import { ProjectCollaboratorsModal } from "../components/projects/ProjectCollaboratorsModal";
import { ProjectImageLightbox } from "../components/projects/ProjectImageLightbox";
import { useSeo } from "../hooks/useSeo";

gsap.registerPlugin(ScrollTrigger);

interface ProjectDetailPageProps {
  project: Project;
  allProjects?: Project[];
  onNavigate: (path: string) => void;
}

export const ProjectDetailPage: React.FC<ProjectDetailPageProps> = ({
  project,
  allProjects = [],
  onNavigate,
}) => {
  const { lang, t } = useLanguage();
  const containerRef = useRef<HTMLDivElement>(null);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [collaboratorsOpen, setCollaboratorsOpen] = useState(false);

  const title = (lang === "id" ? project.title_id : project.title_en) || project.title;
  const overview = (lang === "id" ? project.overview_id : project.overview_en) || project.overview;

  const projectCover =
    project.images && project.images.length > 0
      ? project.images[0]
      : "/banner.jpg";

  useSeo({
    title: `${title} | Project Case Study - Alzan Aditya`,
    description: overview,
    image: projectCover,
    url: `/projects/${project.slug}`,
    type: "article",
    tags: project.tags,
    category: project.category,
    publishedTime: project.uploadedDate,
    author: project.authors?.[0]?.name || "Alzan Aditya",
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [project.id]);

  useGSAP(
    () => {
      gsap
        .timeline()
        .from(".animate-breadcrumb", {
          x: -10,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out",
        })
        .from(
          ".animate-title .word",
          {
            y: 30,
            opacity: 0,
            filter: "blur(8px)",
            duration: 1.2,
            stagger: 0.08,
            ease: "power4.out",
          },
          "-=0.6"
        )
        .from(
          ".animate-buttons",
          {
            y: 20,
            opacity: 0,
            duration: 0.8,
            ease: "power3.out",
          },
          "-=0.8"
        )
        .from(
          ".animate-image",
          {
            scale: 0.95,
            opacity: 0,
            y: 40,
            duration: 1.2,
            stagger: 0.1,
            ease: "power3.out",
          },
          "-=0.8"
        )
        .from(
          ".animate-overview",
          {
            y: 30,
            opacity: 0,
            duration: 1.2,
            ease: "power3.out",
          },
          "-=0.8"
        )
        .from(
          ".animate-tags-title",
          {
            y: 20,
            opacity: 0,
            duration: 0.8,
            ease: "power3.out",
          },
          "-=0.8"
        )
        .from(
          ".animate-tags",
          {
            y: 20,
            opacity: 0,
            duration: 0.8,
            stagger: 0.05,
            ease: "power3.out",
          },
          "-=0.6"
        )
        .from(
          ".animate-sidebar",
          {
            y: 30,
            opacity: 0,
            duration: 1,
            ease: "power3.out",
          },
          "-=0.8"
        );
    },
    { scope: containerRef, dependencies: [project.id] }
  );

  const handleOpenLightbox = (index: number) => {
    setActiveImageIndex(index);
    setLightboxOpen(true);
  };

  const otherProjects = allProjects
    .filter((p) => p.id !== project.id)
    .slice(0, 3);

  return (
    <div
      ref={containerRef}
      id="project-detail-page"
      className="min-h-screen pt-4 pb-16 md:pb-24 select-none"
    >
      <section className="px-4 md:px-12 lg:px-36 xl:px-48 2xl:container mx-auto relative overflow-visible">
        {/* Header (Breadcrumb, Title, Buttons) */}
        <ProjectDetailHeader project={project} onNavigate={onNavigate} />

        {/* 4-Image Grid Gallery */}
        <ProjectDetailGallery
          images={project.images}
          title={title}
          onOpenLightbox={handleOpenLightbox}
        />

        {/* Main Content Grid: Overview & Tags on Left, Sidebar on Right */}
        <div
          id="project-detail-content-grid"
          className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-0 content-grid mb-16"
        >
          <ProjectDetailOverview
            overview={overview}
            tags={(lang === "id" ? project.tags_id : project.tags_en) || project.tags}
            onNavigate={onNavigate}
          />

          <div className="hidden lg:block lg:col-span-1" />

          <ProjectDetailSidebar
            project={project}
            onOpenCollaborators={() => setCollaboratorsOpen(true)}
          />
        </div>

        {/* Explore More Projects Section (if other projects are provided) */}
        {otherProjects.length > 0 && (
          <div
            id="explore-more-projects-section"
            className="border-t border-black/10 pt-12 md:pt-16 mt-12"
          >
            <h2 className="text-2xl md:text-3xl font-medium mb-8 text-text-primary">
              {t("projectDetail.exploreMore")}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {otherProjects.map((p) => {
                const pTitle = (lang === "id" ? p.title_id : p.title_en) || p.title;
                const pOverview = (lang === "id" ? p.overview_id : p.overview_en) || p.overview;

                return (
                  <a
                    key={p.id}
                    id={`more-project-card-${p.slug}`}
                    data-cursor="view"
                    href={`/projects/${p.slug}`}
                    onClick={(e) => {
                      e.preventDefault();
                      onNavigate(`/projects/${p.slug}`);
                    }}
                    className="group flex flex-col gap-3 bg-card p-4 rounded-2xl border border-foreground/5 hover:border-primary/40 transition-all duration-300 shadow-2xs"
                  >
                    <div className="overflow-hidden rounded-xl aspect-video w-full bg-white relative">
                      <img
                        alt={pTitle}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 rounded-xl"
                        src={p.images[0]}
                      />
                    </div>
                    <h4 className="font-semibold text-base md:text-lg text-text-primary group-hover:text-primary transition-colors duration-300 line-clamp-1">
                      {pTitle}
                    </h4>
                    <p className="text-xs md:text-sm text-text-secondary line-clamp-2 leading-relaxed">
                      {pOverview}
                    </p>
                  </a>
                );
              })}
            </div>
          </div>
        )}
      </section>

      {/* Collaborators Modal */}
      <ProjectCollaboratorsModal
        isOpen={collaboratorsOpen}
        onClose={() => setCollaboratorsOpen(false)}
        collaborators={project.authors || []}
        projectTitle={title}
      />

      {/* Image Lightbox Gallery */}
      <ProjectImageLightbox
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        images={project.images}
        initialIndex={activeImageIndex}
        projectTitle={title}
      />
    </div>
  );
};
