import React, { useEffect } from "react";
import { Collaborator } from "../../types";
import { useLanguage } from "../../context/LanguageContext";

interface ProjectCollaboratorsModalProps {
  isOpen: boolean;
  onClose: () => void;
  collaborators: Collaborator[];
  projectTitle: string;
}

export const ProjectCollaboratorsModal: React.FC<ProjectCollaboratorsModalProps> = ({
  isOpen,
  onClose,
  collaborators,
  projectTitle,
}) => {
  const { t } = useLanguage();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      id="collaborators-modal-backdrop"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs transition-opacity duration-300"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      <div
        id="collaborators-modal-container"
        className="bg-card w-full max-w-lg rounded-2xl border border-foreground/10 shadow-2xl p-6 md:p-8 relative overflow-hidden transition-all duration-300 transform scale-100"
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between pb-4 border-b border-foreground/10 mb-6">
          <div className="flex items-center gap-3">
            <span className="p-2.5 bg-white rounded-xl shadow-2xs text-primary">
              <svg
                stroke="currentColor"
                fill="currentColor"
                strokeWidth="0"
                viewBox="0 0 640 512"
                className="text-lg"
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M144 0a80 80 0 1 1 0 160A80 80 0 1 1 144 0zM512 0a80 80 0 1 1 0 160A80 80 0 1 1 512 0zM0 298.7C0 239.8 47.8 192 106.7 192h74.7c58.8 0 106.7 47.8 106.7 106.7V352h-288V298.7zM352 352v-53.3c0-58.8 47.8-106.7 106.7-106.7h74.7c58.8 0 106.7 47.8 106.7 106.7V352H352zm-32-128a64 64 0 1 1 0-128 64 64 0 1 1 0 128zm-64 160c0-35.3 28.7-64 64-64h64c35.3 0 64 28.7 64 64v32H256v-32z"></path>
              </svg>
            </span>
            <div>
              <h3 className="text-xl md:text-2xl font-bold text-text-primary leading-tight">
                {t("collaboratorsModal.title")}
              </h3>
              <p className="text-xs md:text-sm text-text-secondary truncate max-w-[260px] md:max-w-xs">
                {projectTitle}
              </p>
            </div>
          </div>

          <button
            id="close-collaborators-modal"
            onClick={onClose}
            aria-label="Close modal"
            className="p-2 rounded-xl text-text-secondary hover:text-text-primary hover:bg-foreground/5 transition-all duration-200 cursor-pointer"
          >
            <svg
              stroke="currentColor"
              fill="none"
              strokeWidth="2"
              viewBox="0 0 24 24"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-xl"
              height="1em"
              width="1em"
              xmlns="http://www.w3.org/2000/svg"
            >
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>

        {/* Collaborators List */}
        <div className="flex flex-col gap-3 max-h-[60vh] overflow-y-auto pr-1">
          {collaborators && collaborators.length > 0 ? (
            collaborators.map((c, idx) => {
              const cleanInsta = c.instagram
                ? c.instagram.replace(/^@/, "").replace(/^https?:\/\/(www\.)?instagram\.com\//, "").replace(/\/$/, "")
                : "";
              const initials = c.name
                .split(" ")
                .map((n) => n[0])
                .slice(0, 2)
                .join("")
                .toUpperCase();

              return (
                <div
                  key={c._key || idx}
                  className="flex items-center justify-between p-3.5 md:p-4 bg-white rounded-xl border border-foreground/5 hover:border-primary/20 transition-all duration-300 shadow-2xs"
                >
                  <div className="flex items-center gap-3.5 min-w-0">
                    <div className="w-10 h-10 md:w-11 md:h-11 rounded-full bg-gradient-to-br from-primary to-secondary text-white font-bold text-sm md:text-base flex items-center justify-center shrink-0 shadow-2xs">
                      {initials || "U"}
                    </div>
                    <div className="min-w-0">
                      <h4 className="font-semibold text-sm md:text-base text-text-primary truncate">
                        {c.name}
                      </h4>
                      <span className="text-xs text-text-secondary font-medium block truncate">
                        {c.role}
                      </span>
                    </div>
                  </div>

                  {cleanInsta && (
                    <a
                      href={`https://instagram.com/${cleanInsta}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-card hover:bg-primary/10 text-xs md:text-sm font-medium text-text-primary hover:text-primary transition-all duration-200 shrink-0 ml-2"
                      title={`@${cleanInsta}`}
                    >
                      <svg
                        stroke="currentColor"
                        fill="currentColor"
                        strokeWidth="0"
                        viewBox="0 0 448 512"
                        className="text-sm shrink-0"
                        height="1em"
                        width="1em"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z"></path>
                      </svg>
                      <span className="hidden sm:inline">@{cleanInsta}</span>
                    </a>
                  )}
                </div>
              );
            })
          ) : (
            <div className="p-4 bg-white rounded-xl text-center text-text-secondary text-sm">
              {t("collaboratorsModal.noDetails")}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
