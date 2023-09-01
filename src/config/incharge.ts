import { InchargeConfig } from "@/types";

export const inchargeConfig: InchargeConfig = {
  sidebarNav: [
    {
      title: "Dashboard",
      href: "/incharge",
      icon: "dashboard",
    },
    {
      title: "Staff",
      href: "/incharge/staff",
      icon: "user",
    },
    {
      title: "Cases",
      href: "/incharge/cases",
      icon: "case",
    },
    {
      title: "Suspects",
      href: "/incharge/suspects",
      icon: "search",
    },
    {
      title: "Reports",
      href: "/incharge/reports",
      icon: "analytics",
    },
    {
      title: "Settings",
      href: "/incharge/settings",
      icon: "settings",
    },
  ],
};
