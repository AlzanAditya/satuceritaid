import React from 'react';
import { Link } from '../lib/tanstack-router';

export interface BreadcrumbItem {
  label: string;
  to?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <div className="breadcrumb-bar">
      <div className="container max-w-7xl mx-auto px-6">
        <div className="breadcrumb">
          <div className="breadcrumb-item">
            <Link to="/">Beranda</Link>
          </div>
          {items.map((item, index) => {
            const isLast = index === items.length - 1;
            return (
              <React.Fragment key={index}>
                <span className="breadcrumb-sep">
                  <i className="fa-solid fa-chevron-right"></i>
                </span>
                <div className={`breadcrumb-item ${isLast ? 'current' : ''}`}>
                  {isLast || !item.to ? (
                    item.label
                  ) : (
                    <Link to={item.to}>{item.label}</Link>
                  )}
                </div>
              </React.Fragment>
            );
          })}
        </div>
      </div>
    </div>
  );
}
