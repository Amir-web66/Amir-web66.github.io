
import type { TimelineItem } from "../components/features/timeline/types";

export const timelineData: TimelineItem[] = [
	{
		id: "taekwondo-black-belt",
		title: "Taekwondo — 1st Dan Black Belt",
		description:
			"Achieved 1st Dan black belt in Taekwondo, marking an important milestone in a long-term journey built around discipline, consistency, and perseverance.",
		type: "achievement",
		startDate: "2019-11-11",
		skills: ["Taekwondo", "Discipline", "Consistency", "Perseverance"],
		achievements: [
			"Achieved 1st Dan black belt",
			"Continued a long-term practice in martial arts",
		],
		icon: "material-symbols:sports-martial-arts",
		color: "#DC2626",
		featured: true,
	},

	{
		id: "baccalaureat-2023",
		title: "Baccalauréat Technique",
		description:
			"Obtained the Tunisian Baccalauréat Technique in 2023, beginning the path toward engineering studies.",
		type: "education",
		startDate: "2023-06-01",
		organization: "Tunisian Baccalauréat",
		achievements: [
			"Final grade: 14.98 / 20",
			"Obtained the Baccalauréat Technique",
		],
		icon: "material-symbols:school",
		color: "#2563EB",
		featured: true,
	},

	{
		id: "prepa-pt",
		title: "Préparatoire — Cycle PT",
		description:
			"Completed the preparatory engineering cycle in Physics and Technology (PT), building a strong foundation in mathematics, physics, engineering sciences, and problem solving.",
		type: "education",
		startDate: "2023-09-01",
		endDate: "2025-06-30",
		organization: "Engineering Preparatory Cycle — PT",
		skills: [
			"Mathematics",
			"Physics",
			"Engineering Sciences",
			"Problem Solving",
		],
		achievements: [
			"Major de promotion in 2nd year",
			"Ranked 79th out of 735 in the national engineering entrance competition",
			"Admitted to the National Engineering School of Tunis (ENIT)",
		],
		icon: "material-symbols:school",
		color: "#7C3AED",
		featured: true,
	},

	{
		id: "enit-telecommunications",
		title: "ENIT — Telecommunications Engineering",
		description:
			"Started the engineering cycle at the National Engineering School of Tunis, specializing in Telecommunications Engineering and building foundations in networks, systems, embedded technologies, and cybersecurity.",
		type: "education",
		startDate: "2025-09-01",
		location: "Tunis, Tunisia",
		organization: "National Engineering School of Tunis (ENIT)",
		position: "Telecommunications Engineering Student",
		skills: [
			"Telecommunications",
			"Computer Networks",
			"Linux",
			"Embedded Systems",
			"Cybersecurity",
		],
		icon: "material-symbols:school",
		color: "#2563EB",
		featured: true,
	},

	{
		id: "securinets-enit",
		title: "Joined Securinets ENIT",
		description:
			"Joined Securinets ENIT and started developing a deeper interest in cybersecurity through community activities, technical learning, and security challenges.",
		type: "achievement",
		startDate: "2025-09-01",
		location: "ENIT — Tunis, Tunisia",
		organization: "Securinets ENIT",
		skills: [
			"Cybersecurity",
			"CTFs",
			"Networking",
			"Linux",
			"Security",
		],
		achievements: [
			"Joined Securinets ENIT",
			"Started exploring practical cybersecurity",
			"Participated in cybersecurity activities and challenges",
		],
		icon: "material-symbols:security",
		color: "#059669",
		featured: true,
	},

	{
		id: "pfa1-ids",
		title: "PFA1 — AI-Enhanced IDS Integration",
		description:
			"Developed an AI-enhanced intrusion detection integration for firewalls, combining OPNsense, Suricata, and a Random Forest machine-learning model to analyze network security events.",
		type: "project",
		startDate: "2025-04-22",
		organization: "ENIT — PFA1",
		skills: [
			"Cybersecurity",
			"OPNsense",
			"Suricata",
			"Python",
			"Machine Learning",
			"Random Forest",
			"Network Security",
		],
		achievements: [
			"Analyzed 5,418 security events",
			"Built a model using 12 features",
			"Achieved 99.63% accuracy",
			"Achieved 99.78% F1 score",
			"AUC: 1.00",
		],
		icon: "material-symbols:shield",
		color: "#059669",
		featured: true,
	},

	{
		id: "nvidia-deep-learning",
		title: "NVIDIA — Fundamentals of Deep Learning",
		description:
			"Completed the NVIDIA Fundamentals of Deep Learning course, strengthening foundations in artificial intelligence and deep learning.",
		type: "achievement",
		startDate: "2026-01-01",
		organization: "NVIDIA",
		skills: ["Artificial Intelligence", "Deep Learning", "Neural Networks"],
		achievements: [
			"Completed NVIDIA Fundamentals of Deep Learning",
		],
		icon: "material-symbols:neurology",
		color: "#76B900",
	},

	{
		id: "cisco-itn",
		title: "Cisco NetAcad — Introduction to Networks",
		description:
			"Completed Cisco Networking Academy's Introduction to Networks course, developing practical foundations in networking and network infrastructure.",
		type: "achievement",
		startDate: "2026-01-01",
		organization: "Cisco Networking Academy — ENIT",
		skills: [
			"Computer Networks",
			"TCP/IP",
			"Routing",
			"Switching",
			"Networking Fundamentals",
		],
		achievements: [
			"Completed Introduction to Networks",
			"Built foundations in network infrastructure",
		],
		icon: "material-symbols:lan",
		color: "#2563EB",
	},

	{
		id: "cybersecurity-journey",
		title: "Cybersecurity Journey",
		description:
			"Started building practical cybersecurity skills through CTFs, Hack The Box, Linux, networking, digital forensics, web exploitation, reverse engineering, and security labs.",
		type: "project",
		startDate: "2026-01-01",
		skills: [
			"Linux",
			"Networking",
			"CTFs",
			"Hack The Box",
			"Web Security",
			"Digital Forensics",
			"Reverse Engineering",
			"Binary Exploitation",
		],
		achievements: [
			"Started solving practical CTF challenges",
			"Started documenting security writeups",
			"Explored multiple cybersecurity domains",
			"Built a personal cybersecurity lab environment",
		],
		icon: "material-symbols:terminal",
		color: "#DC2626",
		featured: true,
	},

	{
		id: "lbrinss-portfolio",
		title: "Building LBrinss",
		description:
			"Building a personal engineering and cybersecurity portfolio to document projects, CTF writeups, Hack The Box machines, labs, certifications, and the ongoing learning journey.",
		type: "project",
		startDate: "2026-01-01",
		skills: [
			"Astro",
			"TypeScript",
			"Git",
			"Cybersecurity",
			"Documentation",
		],
		achievements: [
			"Building a public technical portfolio",
			"Documenting cybersecurity experiments and writeups",
			"Organizing projects, labs, and learning progress",
		],
		icon: "material-symbols:code",
		color: "#7C3AED",
		featured: true,
	},
];

