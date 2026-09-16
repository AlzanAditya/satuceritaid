import React from "react";
import { NavbarInline, NavbarInlineProps, NavbarInlineItem } from "./NavbarInline";

export type { NavbarInlineProps as NavbarAppsProps, NavbarInlineItem as NavAppMenuItem };

/**
 * NavbarApps wrapper that delegates to NavbarInline
 * Preserves backwards compatibility while providing the new inline desktop navbar.
 */
export const NavbarApps: React.FC<NavbarInlineProps> = (props) => {
  return <NavbarInline {...props} />;
};

export default NavbarApps;
