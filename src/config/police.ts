import { PoliceConfig } from "@/types";

export const policeConfig: PoliceConfig = {
  sidebarNav: [
    {
      title: "Dashboard",
      href: "/police",
      icon: "dashboard",
    },
    {
      title: "Complainants",
      href: "/police/complainants",
      icon: "complaint",
    },
    {
      title: "Cases",
      href: "/police/cases",
      icon: "case",
    },
    {
      title: "Suspects",
      href: "/police/suspects",
      icon: "search",
    },
    {
      title: "Settings",
      href: "/police/settings",
      icon: "settings",
    },
  ],
};
