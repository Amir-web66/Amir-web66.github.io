import type { NavBarConfig } from "../types/config";
import { LinkPreset } from "../types/config";

export const navBarConfig: NavBarConfig = {
  links: [
    LinkPreset.Home,
    LinkPreset.Archive,

    {
      name: "Links",
      url: "/links/",
      icon: "material-symbols:link",
      children: [
        {
          name: "GitHub",
          url: "https://github.com/Amir-web66",
          external: true,
          icon: "fa7-brands:github",
        },
        {
          name: "LinkedIn",
          url: "https://www.linkedin.com/in/amir-khammar-934702389/",
          external: true,
          icon: "fa7-brands:linkedin",
        },
        {
          name: "Email",
          url: "mailto:aizensoski664@gmail.com",
          external: true,
          icon: "mdi:email",
        },
      ],
    },

    {
      name: "My",
      url: "/archive/",
      icon: "material-symbols:person",
      children: [
        {
          name: "Writeups",
          url: "/archive/",
          icon: "material-symbols:terminal",
        },
        {
          name: "HTB Machines Pwned",
          url: "/archive/?category=HTB",
          icon: "material-symbols:security",
        },
        {
          name: "CTF Challenges",
          url: "/archive/?category=CTF",
          icon: "material-symbols:flag",
        },
        {
          name: "Labs / Research",
          url: "/archive/?category=Labs",
          icon: "material-symbols:science",
        },
        {
          name: "Certifications / Courses",
          url: "/archive/?category=Certifications",
          icon: "material-symbols:school",
        },
        {
          name: "Skills",
          url: "/skills/",
          icon: "material-symbols:psychology",
        },
      ],
    },

    {
      name: "About",
      url: "/about/",
      icon: "material-symbols:info",
    },

    {
      name: "Others",
      url: "#",
      icon: "material-symbols:more-horiz",
      children: [
        {
          name: "Timeline",
          url: "/timeline/",
          icon: "material-symbols:timeline",
        },
	{
	  name: "Discord",
	  url: "https://discord.com/users/969977325749936229",
	  external: true,
	  icon: "fa7-brands:discord",
	},
        {
          name: "Projects",
          url: "/projects/",
          icon: "material-symbols:work",
        },
        {
          name: "AI / Tools I Use",
          url: "/ai-tools/",
          icon: "material-symbols:auto-awesome",
        },
      ],
    },
  ],
};
