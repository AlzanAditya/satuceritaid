import React from "react";
import { useLanguage } from "../../context/LanguageContext";
import { Badge } from "../ui/badge";

interface ProjectDetailOverviewProps {
  overview: string;
  tags: string[];
  onNavigate?: (path: string) => void;
}

export const ProjectDetailOverview: React.FC<ProjectDetailOverviewProps> = ({
  overview,
  tags,
  onNavigate,
}) => {
  const { t } = useLanguage();

  // Helper to parse formatted inline marks (bold, italic, code, quotes, links)
  const renderInlineFormatted = (text: string) => {
    const parts = text.split(/(`\*\*".*?"\*\*`|`.*?`|\*\*.*?\*\*|\*.*?\*|\[.*?\]\(.*?\))/g);
    return parts.map((part, idx) => {
      if (!part) return null;
      if (part.startsWith("`**\"") && part.endsWith("\"**`")) {
        const clean = part.replace(/^`\*\*"/, "").replace(/"\*\*`$/, "");
        return (
          <span
            key={idx}
            className="font-mono bg-card px-2.5 py-1 rounded text-sm text-text-primary border border-foreground/10 font-bold block my-3"
          >
            &ldquo;{clean}&rdquo;
          </span>
        );
      }
      if (part.startsWith("`") && part.endsWith("`")) {
        const clean = part.slice(1, -1);
        return (
          <code
            key={idx}
            className="font-mono bg-card px-2 py-0.5 rounded text-sm text-text-primary border border-foreground/10 font-medium"
          >
            {clean}
          </code>
        );
      }
      if (part.startsWith("**") && part.endsWith("**")) {
        const clean = part.slice(2, -2);
        return (
          <strong key={idx} className="font-semibold text-text-primary">
            {clean}
          </strong>
        );
      }
      if (part.startsWith("*") && part.endsWith("*")) {
        const clean = part.slice(1, -1);
        return (
          <em key={idx} className="italic">
            {clean}
          </em>
        );
      }
      if (part.startsWith("[") && part.includes("](")) {
        const match = part.match(/\[(.*?)\]\((.*?)\)/);
        if (match) {
          const href = match[2];
          const isInternal = href.startsWith("/") || href.startsWith("#");
          return (
            <a
              key={idx}
              href={href}
              onClick={(e) => {
                if (isInternal && onNavigate) {
                  e.preventDefault();
                  onNavigate(href);
                }
              }}
              target={isInternal ? undefined : "_blank"}
              rel={isInternal ? undefined : "noopener noreferrer"}
              className="text-primary hover:text-primary/80 hover:underline transition-all duration-300 font-semibold underline-offset-4"
            >
              {match[1]}
            </a>
          );
        }
      }
      return <span key={idx}>{part}</span>;
    });
  };

  // Helper to render markdown/plain text content with rich formatting & separated paragraphs
  const renderRichOverview = (contentStr: string) => {
    if (!contentStr) return null;
    const paragraphs = contentStr.split("\n\n");
    return paragraphs.map((para, index) => {
      const trimmed = para.trim();
      if (!trimmed) return null;

      if (trimmed.startsWith("### ")) {
        return (
          <h3
            key={index}
            className="text-xl md:text-2xl font-semibold mt-8 mb-3 text-text-primary tracking-tight"
          >
            {renderInlineFormatted(trimmed.replace("### ", ""))}
          </h3>
        );
      }

      if (trimmed.startsWith("## ")) {
        return (
          <h2
            key={index}
            className="text-2xl md:text-3xl font-semibold mt-10 mb-4 text-text-primary tracking-tight"
          >
            {renderInlineFormatted(trimmed.replace("## ", ""))}
          </h2>
        );
      }

      if (trimmed.startsWith("> ")) {
        return (
          <blockquote
            key={index}
            className="border-l-4 border-primary pl-4 italic my-6 text-text-secondary md:text-lg font-medium"
          >
            {renderInlineFormatted(trimmed.replace("> ", ""))}
          </blockquote>
        );
      }

      if (trimmed.startsWith("- ") || trimmed.startsWith("* ")) {
        const items = trimmed.split("\n").filter((l) => l.trim().length > 0);
        return (
          <ul
            key={index}
            className="list-disc pl-6 mb-6 text-text-secondary md:text-lg leading-relaxed flex flex-col gap-2.5 font-medium"
          >
            {items.map((it, itIdx) => (
              <li key={itIdx}>
                {renderInlineFormatted(it.replace(/^[-*]\s+/, ""))}
              </li>
            ))}
          </ul>
        );
      }

      return (
        <p
          key={index}
          className="md:text-lg text-text-secondary leading-relaxed mb-5 font-medium"
        >
          {renderInlineFormatted(trimmed)}
        </p>
      );
    });
  };

  return (
    <div
      id="project-detail-overview-column"
      className="lg:col-span-7 flex flex-col gap-8 md:gap-12"
    >
      {/* Project Overview */}
      <div id="project-overview-section" className="animate-overview">
        <h2 className="text-2xl md:text-3xl font-medium mb-6 text-text-primary">
          {t("projectDetail.overviewTitle")}
        </h2>
        <div className="prose-overview">
          {renderRichOverview(overview)}
        </div>
      </div>

      {/* Project Tags */}
      {tags && tags.length > 0 && (
        <div id="project-tags-section">
          <h3 className="text-xl md:text-2xl font-medium mb-5 animate-tags-title text-text-primary">
            {t("projectDetail.tagsTitle")}
          </h3>
          <div className="flex flex-wrap gap-2 gap-y-3">
            {tags.map((tag, index) => (
              <Badge
                key={index}
                type="simple"
                className="animate-tags"
                label={tag}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
