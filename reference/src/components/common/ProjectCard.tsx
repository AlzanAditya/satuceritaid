import React from 'react';
import { ArrowUpRight, Github, Users, Sparkles } from 'lucide-react';
import { Project } from '../../types';
import { useLanguage } from '../../context/LanguageContext';

interface ProjectCardProps {
  project: Project;
  onSelect: (slug: string) => void;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project, onSelect }) => {
  const { lang, t } = useLanguage();
  const coverImage = project.images[0] || '/projects/Yobss - Your Business System/cover.jpg';

  const title = (lang === "id" ? project.title_id : project.title_en) || project.title;
  const overview = (lang === "id" ? project.overview_id : project.overview_en) || project.overview;

  return (
    <div
      id={`project-card-${project.slug}`}
      data-cursor="VIEW"
      className="group relative bg-[#f5f6fe] rounded-3xl overflow-hidden border border-zinc-200/80 transition-all duration-300 hover:shadow-xl hover:shadow-[#5e2cd1]/10 hover:border-[#5e2cd1]/40 flex flex-col justify-between"
    >
      {/* Top Media Container */}
      <div
        onClick={() => onSelect(project.slug)}
        className="relative w-full aspect-video overflow-hidden bg-zinc-200 cursor-pointer"
      >
        <img
          src={coverImage}
          alt={title}
          className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />

        {/* Hover overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
          <span className="text-white text-xs font-semibold px-3 py-1.5 rounded-full bg-white/20 backdrop-blur-md flex items-center gap-1.5">
            <Sparkles className="w-3 h-3 text-amber-300" />
            {t("projects.viewProject")}
          </span>
        </div>

        {/* Category Badge */}
        <div className="absolute top-3.5 left-3.5 flex items-center gap-2">
          <span className="px-3 py-1 rounded-full text-xs font-semibold bg-white/90 backdrop-blur-md text-[#5e2cd1] shadow-xs">
            {project.category}
          </span>
        </div>

        {/* Collaborators badge */}
        <div className="absolute top-3.5 right-3.5">
          <span className="px-2.5 py-1 rounded-full text-[11px] font-medium bg-black/60 backdrop-blur-md text-white flex items-center gap-1">
            <Users className="w-3 h-3 text-zinc-300" />
            {project.collaborators}
          </span>
        </div>
      </div>

      {/* Content Container */}
      <div className="p-6 flex-1 flex flex-col justify-between">
        <div>
          {/* Tags */}
          <div className="flex flex-wrap gap-1.5 mb-3">
            {project.tags.slice(0, 3).map((tag, idx) => (
              <span
                key={idx}
                className="text-[11px] font-medium px-2.5 py-0.5 rounded-md bg-white border border-zinc-200/80 text-zinc-600"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Title */}
          <h3
            onClick={() => onSelect(project.slug)}
            className="text-xl font-bold text-zinc-900 mb-2 group-hover:text-[#5e2cd1] transition-colors cursor-pointer line-clamp-1 font-['Satoshi']"
          >
            {title}
          </h3>

          {/* Overview text */}
          <p className="text-zinc-600 text-sm line-clamp-2 leading-relaxed mb-4">
            {overview}
          </p>
        </div>

        {/* Action Bottom Bar */}
        <div className="pt-4 border-t border-zinc-200/80 flex items-center justify-between">
          <button
            id={`view-btn-${project.slug}`}
            onClick={() => onSelect(project.slug)}
            className="text-sm font-semibold text-[#5e2cd1] group-hover:text-[#4e22b3] flex items-center gap-1 transition-colors cursor-pointer"
          >
            <span>{t("projects.viewDetails")}</span>
            <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </button>

          <div className="flex items-center gap-2">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="p-2 rounded-full bg-white hover:bg-zinc-900 text-zinc-600 hover:text-white border border-zinc-200 transition-colors shadow-xs"
                title="View Source Code"
                aria-label="GitHub Repository"
              >
                <Github className="w-3.5 h-3.5" />
              </a>
            )}
            {project.demoUrl && (
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="p-2 rounded-full bg-[#5e2cd1] hover:bg-[#4e22b3] text-white transition-colors shadow-xs"
                title="Open Live Preview"
                aria-label="Live Demo"
              >
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
