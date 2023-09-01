import { DocsConfig } from "@/types";

export const docsConfig: DocsConfig = {
  mainNav: [
    {
      title: "Documentation",
      href: "/docs",
    },
    {
      title: "Login to App",
      href: "/login",
    },
  ],
  sidebarNav: [
    {
      title: "Project Documentation",
      items: [
        {
          title: "Overview",
          href: "/docs",
        },
      ],
    },
    {
      title: "INTRODUCTION",
      items: [
        {
          title: "Background of the Study",
          href: "/docs/introduction",
        },
        {
          title: "Problem Statement",
          href: "/docs/introduction/problem",
        },
        {
          title: "Objectives",
          href: "/docs/introduction/objectives",
        },
        {
          title: "Scope of the Study",
          href: "/docs/introduction/scope",
        },
      ],
    },
    {
      title: "LITERATURE REVIEW",
      items: [
        {
          title: "Definition of Crime",
          href: "/docs/literature/definition",
        },
        {
          title: "Classification of Crime",
          href: "/docs/literature/classification",
        },
        {
          title: "Crime in Kenya",
          href: "/docs/literature/crime-in-kenya",
        },
        {
          title: "Proposed Solution",
          href: "/docs/literature/proposal",
        },
        {
          title: "Existing Crime Management Systems",
          href: "/docs/literature/existing-systems",
        },
      ],
    },
    {
      title: "SYSTEM ANALYSIS & DESIGN",
      items: [
        {
          title: "System Development Methodology",
          href: "/docs/analysis/methodology",
        },
        {
          title: "Requirements Elicitation",
          href: "/docs/analysis/requirements",
        },
        {
          title: "System Design",
          href: "/docs/analysis/design",
        },
      ],
    },
    {
      title: "SYSTEM IMPLEMENTATION",
      items: [
        {
          title: "Technologies Used",
          href: "/docs/implementation",
          disabled: true,
        },
        {
          title: "System Testing",
          href: "/docs/implementation",
          disabled: true,
        },
        {
          title: "Test Cases and Results",
          href: "/docs/implementation",
          disabled: true,
        },
      ],
    },
    {
      title: "CONCLUSION",
      items: [
        {
          title: "Recommendations",
          href: "/docs/conclusion",
          disabled: true,
        },
        {
          title: "References",
          href: "/docs/conclusion",
          disabled: true,
        },
      ],
    },
    {
      title: "APPENDICES",
      items: [
        {
          title: "User Manual",
          href: "/docs/appendix",
          disabled: true,
        },
        {
          title: "Sample Code",
          href: "/docs/appendix",
          disabled: true,
        },
        {
          title: "Work Plan",
          href: "/docs/appendix",
          disabled: true,
        },
        {
          title: "Interview Guide",
          href: "/docs/appendix",
          disabled: true,
        },
      ],
    },
  ],
};
