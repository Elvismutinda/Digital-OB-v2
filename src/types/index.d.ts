import type { Icon } from "lucide-react";
import { Icons } from "@components/Icons";

export type SiteConfig = {
  name: string;
  description: string;
  url: string;
  links: {
    twitter: string;
    github: string;
  };
};

export type SidebarNavItem = {
  title: string;
  disabled?: boolean;
  external?: boolean;
  icon?: keyof typeof Icons;
} & (
  | {
      href: string;
      items?: never;
    }
  | {
      href?: string;
      items: NavLink[];
    }
);

export type DocsConfig = {
  mainNav: MainNavItem[];
  sidebarNav: SidebarNavItem[];
};

export type NavItem = {
  title: string;
  href: string;
  disabled?: boolean;
};

export type MainNavItem = NavItem;

export type DetailsConfig = {
  mainNav: MainNavItem[];
};

export type AdminConfig = {
  sidebarNav: SidebarNavItem[];
};

export type InchargeConfig = {
  sidebarNav: SidebarNavItem[];
};

export type PoliceConfig = {
  sidebarNav: SidebarNavItem[];
};

export type DetectiveConfig = {
  sidebarNav: SidebarNavItem[];
};
