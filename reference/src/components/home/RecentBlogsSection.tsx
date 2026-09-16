import React from "react";
import { Blog } from "../../types";
import { useLanguage } from "../../context/LanguageContext";
import { BlogSection } from "../Section/BlogSection";

interface RecentBlogsSectionProps {
  blogs: Blog[];
  onNavigate: (path: string) => void;
}

export const RecentBlogsSection: React.FC<RecentBlogsSectionProps> = ({
  blogs,
  onNavigate,
}) => {
  const { t } = useLanguage();

  return (
    <div className="pt-12 md:pt-20 px-4 md:px-12 lg:px-36 xl:px-48 2xl:container mx-auto overflow-x-hidden overflow-y-clip select-none">
      <BlogSection
        title={t("recentBlogs.title")}
        subtitle={t("recentBlogs.subtitle")}
        items={blogs}
        maxItems={4}
        onNavigate={onNavigate}
      />
    </div>
  );
};
