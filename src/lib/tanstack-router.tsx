import React from 'react';
import {
  RouterProvider,
  createRouter,
  createRoute,
  createRootRoute,
  Link as TanStackLink,
  Outlet,
  useNavigate,
  useLocation,
  useParams,
  useSearch,
  Router,
} from '@tanstack/react-router';

export {
  RouterProvider,
  createRouter,
  createRoute,
  createRootRoute,
  Outlet,
  useNavigate,
  useLocation,
  useParams,
  useSearch,
  Router,
};

export interface LinkProps extends Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> {
  to: string;
  className?: string;
  style?: React.CSSProperties;
  activeProps?: { className?: string; style?: React.CSSProperties };
  activeOptions?: { exact?: boolean };
  children?: React.ReactNode;
}

export function Link({ to, activeProps, activeOptions, children, className, style, onClick, ...rest }: any) {
  return (
    <TanStackLink
      to={to}
      activeProps={activeProps}
      activeOptions={activeOptions}
      className={className}
      style={style}
      onClick={onClick}
      {...rest}
    >
      {children}
    </TanStackLink>
  );
}

