import React, { useState, useEffect, useRef } from "react";
import { Project, TechStackItem } from "../../types";
import { useLanguage } from "../../context/LanguageContext";

interface ProjectDetailSidebarProps {
  project: Project;
  onOpenCollaborators: () => void;
}

const getTechLogoUrl = (item: TechStackItem | string): { name: string; url: string } => {
  if (typeof item === "object" && item.url) {
    return { name: item.name, url: item.url };
  }

  const name = typeof item === "string" ? item : item.name;
  const lower = name.toLowerCase();

  if (lower.includes("tailwind")) {
    return {
      name,
      url: "https://cdn.sanity.io/images/6rdtpnze/production/2ab24671f65bd66c3091374082c3bfe06dd3998e-346x193.png",
    };
  }
  if (lower.includes("next")) {
    return {
      name,
      url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg",
    };
  }
  if (lower.includes("react")) {
    return {
      name,
      url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
    };
  }
  if (lower.includes("typescript")) {
    return {
      name,
      url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
    };
  }
  if (lower.includes("javascript")) {
    return {
      name,
      url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
    };
  }
  if (lower.includes("laravel")) {
    return {
      name,
      url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/laravel/laravel-original.svg",
    };
  }
  if (lower.includes("livewire")) {
    return {
      name,
      url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/livewire/livewire-original.svg",
    };
  }
  if (lower.includes("filament")) {
    return {
      name,
      url: "https://avatars.githubusercontent.com/u/61821035?s=200&v=4",
    };
  }
  if (lower.includes("postgres")) {
    return {
      name,
      url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg",
    };
  }
  if (lower.includes("mysql")) {
    return {
      name,
      url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg",
    };
  }
  if (lower.includes("vite")) {
    return {
      name,
      url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vitejs/vitejs-original.svg",
    };
  }
  if (lower.includes("express")) {
    return {
      name,
      url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg",
    };
  }
  if (lower.includes("motion") || lower.includes("framer")) {
    return {
      name,
      url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/framermotion/framermotion-original.svg",
    };
  }
  if (lower.includes("sanity")) {
    return {
      name,
      url: "https://cdn.sanity.io/images/6rdtpnze/production/89400f8b2cbce856effc07b8414055a6e0de9079-1080x1350.png",
    };
  }
  if (lower.includes("wordpress")) {
    return {
      name,
      url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/wordpress/wordpress-plain.svg",
    };
  }

  return {
    name,
    url: "https://cdn.sanity.io/images/6rdtpnze/production/2ab24671f65bd66c3091374082c3bfe06dd3998e-346x193.png",
  };
};

export const ProjectDetailSidebar: React.FC<ProjectDetailSidebarProps> = ({
  project,
  onOpenCollaborators,
}) => {
  const { lang, t } = useLanguage();

  const category = (lang === "id" ? project.category_id : project.category_en) || project.category;
  const count = project.authors?.length || 0;
  const collaboratorsLabel =
    (lang === "id" ? project.collaborators_id : project.collaborators_en) ||
    project.collaborators ||
    (lang === "id"
      ? `${count > 0 ? count : 1} Kolaborator`
      : `${count > 0 ? count : 1} Collaborator${count > 1 ? "s" : ""}`);

  // Format uploadedDate if it's in YYYY-MM-DD format
  let displayDate = project.uploadedDate;
  if (/^\d{4}-\d{2}-\d{2}$/.test(project.uploadedDate)) {
    const [year, month, day] = project.uploadedDate.split("-").map(Number);
    const dateObj = new Date(year, month - 1, day);
    displayDate = dateObj.toLocaleDateString(lang === "id" ? "id-ID" : "en-GB", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  }

  const techContainerRef = useRef<HTMLDivElement>(null);
  const [isOverflowing, setIsOverflowing] = useState(() =>
    project.techStack ? project.techStack.length * 78 > 340 : false
  );

  useEffect(() => {
    const checkOverflow = () => {
      if (techContainerRef.current && project.techStack) {
        const containerWidth = techContainerRef.current.clientWidth;
        const itemWidth = 70;
        const gap = 8;
        const totalItemsWidth =
          project.techStack.length * itemWidth +
          Math.max(0, project.techStack.length - 1) * gap;

        setIsOverflowing(totalItemsWidth > containerWidth);
      }
    };

    checkOverflow();

    const observer = new ResizeObserver(() => {
      checkOverflow();
    });

    if (techContainerRef.current) {
      observer.observe(techContainerRef.current);
    }

    window.addEventListener("resize", checkOverflow);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", checkOverflow);
    };
  }, [project.techStack]);

  return (
    <div
      id="project-detail-sidebar-column"
      className="lg:col-span-4 order-first lg:order-last max-w-full animate-sidebar"
    >
      <div
        id="project-detail-sidebar-card"
        className="bg-card p-4 md:p-6 rounded-xl flex flex-col gap-6 border border-foreground/5 shadow-xs"
      >
        {/* Tech Stack */}
        {project.techStack && project.techStack.length > 0 && (
          <div id="sidebar-tech-stack-section">
            <h2 className="text-xl md:text-2xl font-medium mb-4 text-text-primary">
              {t("projectDetail.techStackTitle")}
            </h2>
            <div
              ref={techContainerRef}
              className="relative w-full overflow-hidden rounded-xl group"
            >
              {isOverflowing ? (
                <>
                  {/* Subtle edge fade masks */}
                  <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-4 bg-gradient-to-r from-card to-transparent z-10" />
                  <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-4 bg-gradient-to-l from-card to-transparent z-10" />

                  {/* Infinite Carousel: Pauses on hover, resumes on unhover */}
                  <div
                    className="flex gap-2 animate-marquee w-max pr-2 hover:[animation-play-state:paused] group-hover:[animation-play-state:paused]"
                    style={{ animationDuration: "25s" }}
                  >
                    {[...project.techStack, ...project.techStack].map((item, idx) => {
                      const tech = getTechLogoUrl(item);
                      return (
                        <div
                          key={idx}
                          className="bg-white p-4 rounded-xl min-w-17.5 h-17.5 flex items-center justify-center shadow-2xs border border-foreground/5 shrink-0 transition-transform duration-200 hover:scale-105"
                          title={tech.name}
                        >
                          <img
                            alt={tech.name}
                            loading="lazy"
                            width="60"
                            height="60"
                            decoding="async"
                            className="object-contain w-9 md:min-w-12 h-9 md:h-12"
                            src={tech.url}
                          />
                        </div>
                      );
                    })}
                  </div>
                </>
              ) : (
                <div className="flex gap-2 justify-center w-full flex-wrap sm:flex-nowrap">
                  {project.techStack.map((item, idx) => {
                    const tech = getTechLogoUrl(item);
                    return (
                      <div
                        key={idx}
                        className="bg-white p-4 rounded-xl min-w-17.5 h-17.5 flex items-center justify-center shadow-2xs border border-foreground/5 shrink-0 transition-transform duration-200 hover:scale-105"
                        title={tech.name}
                      >
                        <img
                          alt={tech.name}
                          loading="lazy"
                          width="60"
                          height="60"
                          decoding="async"
                          className="object-contain w-9 md:min-w-12 h-9 md:h-12"
                          src={tech.url}
                        />
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Project Detail */}
        <div id="sidebar-project-detail-section">
          <h2 className="text-xl md:text-2xl font-medium mb-4 text-text-primary">
            {t("projectDetail.detailTitle")}
          </h2>
          <div className="flex flex-col gap-2 md:gap-4 bg-white p-3 md:p-4 rounded-xl border border-foreground/5 shadow-2xs">
            {/* Category */}
            <div className="flex items-center gap-3">
              <span className="text-base bg-card p-2 rounded-full text-text-primary">
                <svg
                  stroke="currentColor"
                  fill="currentColor"
                  strokeWidth="0"
                  viewBox="0 0 24 24"
                  height="1em"
                  width="1em"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path fill="none" d="M0 0h24v24H0z"></path>
                  <path d="m21.41 11.58-9-9C12.05 2.22 11.55 2 11 2H4c-1.1 0-2 .9-2 2v7c0 .55.22 1.05.59 1.42l9 9c.36.36.86.58 1.41.58.55 0 1.05-.22 1.41-.59l7-7c.37-.36.59-.86.59-1.41 0-.55-.23-1.06-.59-1.42zM5.5 7C4.67 7 4 6.33 4 5.5S4.67 4 5.5 4 7 4.67 7 5.5 6.33 7 5.5 7z"></path>
                </svg>
              </span>
              <strong className="font-medium text-sm md:text-base text-text-primary">
                {category}
              </strong>
            </div>

            {/* Collaborator Button */}
            <div className="flex items-center gap-3">
              <span className="text-base bg-card p-2 rounded-full text-text-primary">
                <svg
                  stroke="currentColor"
                  fill="currentColor"
                  strokeWidth="0"
                  viewBox="0 0 640 512"
                  height="1em"
                  width="1em"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M144 0a80 80 0 1 1 0 160A80 80 0 1 1 144 0zM512 0a80 80 0 1 1 0 160A80 80 0 1 1 512 0zM0 298.7C0 239.8 47.8 192 106.7 192h74.7c58.8 0 106.7 47.8 106.7 106.7V352h-288V298.7zM352 352v-53.3c0-58.8 47.8-106.7 106.7-106.7h74.7c58.8 0 106.7 47.8 106.7 106.7V352H352zm-32-128a64 64 0 1 1 0-128 64 64 0 1 1 0 128zm-64 160c0-35.3 28.7-64 64-64h64c35.3 0 64 28.7 64 64v32H256v-32z"></path>
                </svg>
              </span>
              {project.authors && project.authors.length > 0 ? (
                <button
                  id="sidebar-collaborators-button"
                  onClick={onOpenCollaborators}
                  className="font-medium text-sm md:text-base text-text-primary hover:underline cursor-pointer transition-colors duration-300 text-left underline-offset-4"
                >
                  {collaboratorsLabel}
                </button>
              ) : (
                <span className="font-medium text-sm md:text-base text-text-primary">
                  {collaboratorsLabel}
                </span>
              )}
            </div>

            {/* Uploaded Date */}
            <div className="flex items-center gap-3">
              <span className="text-base bg-card p-2 rounded-full text-text-primary">
                <svg
                  stroke="currentColor"
                  fill="currentColor"
                  strokeWidth="0"
                  viewBox="0 0 24 24"
                  height="1em"
                  width="1em"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path fill="none" d="M0 0h24v24H0z"></path>
                  <path d="M19 4h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20a2 2 0 0 0 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V10h14v10zm0-12H5V6h14v2zM9 14H7v-2h2v2zm4 0h-2v-2h2v2zm4 0h-2v-2h2v2zm-8 4H7v-2h2v2zm4 0h-2v-2h2v2zm4 0h-2v-2h2v2z"></path>
                </svg>
              </span>
              <strong className="font-medium text-sm md:text-base text-text-primary">
                {t("projectDetail.uploaded")}: {displayDate}
              </strong>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
