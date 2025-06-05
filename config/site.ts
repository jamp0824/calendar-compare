export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "Policy Match Portal",
  description:
    "A modern government portal for policy matching and citizen services.",
  mainNav: [
    {
      title: "Home",
      href: "/",
    },
    {
      title: "Services",
      href: "/services",
    },
    {
      title: "Policies",
      href: "/policies",
    },
    {
      title: "About",
      href: "/about",
    },
  ],
  links: {
    github: "https://github.com/your-org/policy-match",
    docs: "/docs",
    feedback: "/feedback",
  },
  metadata: {
    keywords: [
      "government",
      "policy",
      "services",
      "citizen",
      "portal",
      "public services",
    ],
    authors: [
      {
        name: "Your Organization",
        url: "https://your-org.gov",
      },
    ],
  },
  features: {
    auth: true,
    search: true,
    notifications: true,
    darkMode: true,
    accessibility: true,
  },
} as const; 