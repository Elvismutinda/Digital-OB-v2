import { AdminConfig } from "@/types";

export const adminConfig: AdminConfig = {
  sidebarNav: [
    {
      title: "Dashboard",
      href: "/admin",
      icon: "dashboard",
    },
    {
      title: "Staff",
      href: "/admin/staff",
      icon: "user",
    },
    {
      title: "Stations",
      href: "/admin/stations",
      icon: "siren",
    },
    {
      title: "Cases",
      href: "/admin/cases",
      icon: "case",
    },
    {
      title: "Reports",
      href: "/admin/reports",
      icon: "analytics",
    },
    {
      title: "Settings",
      href: "/admin/settings",
      icon: "settings",
    },
    {
      title: "Audit Logs",
      href: "/admin/logs",
      icon: "key",
    },
  ],
};
