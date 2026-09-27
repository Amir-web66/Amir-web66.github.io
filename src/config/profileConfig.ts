
import type { ProfileConfig } from "../types/config";

// 个人资料配置
export const profileConfig: ProfileConfig = {
	avatar: "/assets/profile/avatar.png",
	name: "Amir Khammar",
	bio: "ICT Engineering student at ENIT · Cybersecurity, Cloud, AI",
	typewriter: {
		enable: true,
		speed: 80,
	},
	links: [
		{
			name: "GitHub",
			icon: "fa7-brands:github",
			url: "https://github.com/Amir-web66",
		},
		{
			name: "LinkedIn",
			icon: "fa7-brands:linkedin",
			url: "https://www.linkedin.com/in/amir-khammar-934702389/",
		},
		{
			name: "Email",
			icon: "mdi:email",
			url: "mailto:aizensoski664@gmail.com",
		},
	],
};

