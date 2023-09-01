import { DetectiveConfig } from "@/types";

export const detectiveConfig: DetectiveConfig = {
  sidebarNav: [
    {
      title: "Dashboard",
      href: "/detective",
      icon: "dashboard",
    },
    {
      title: "Assigned Cases",
      href: "/detective/cases",
      icon: "case",
    },
    {
      title: "Suspects",
      href: "/detective/suspects",
      icon: "search",
    },
    {
      title: "Settings",
      href: "/detective/settings",
      icon: "settings",
    },
  ],
};
