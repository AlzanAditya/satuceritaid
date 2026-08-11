import React from 'react';

interface PageHeaderProps {
  tagIcon?: string;
  tagText: string;
  title: React.ReactNode;
  description: string;
  children?: React.ReactNode;
}

export function PageHeader({ tagIcon = 'fa-sparkles', tagText, title, description, children }: PageHeaderProps) {
  return (
    <header className="page-header">
      <div className="container max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        <div className="page-header-content">
          <div className="page-header-tag">
            <i className={`fa-solid ${tagIcon}`}></i> {tagText}
          </div>
          <h1 className="page-header-title">{title}</h1>
          <p className="page-header-desc">{description}</p>
        </div>
        {children && <div className="page-header-visual">{children}</div>}
      </div>
    </header>
  );
}
