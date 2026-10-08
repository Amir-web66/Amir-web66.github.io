// Skill data configuration
// Personal portfolio skills

export interface Skill {
	id: string;
	name: string;
	description: string;
	icon: string; // Iconify icon name
	category: "frontend" | "backend" | "database" | "tools" | "other";
	level: "beginner" | "intermediate" | "advanced" | "expert";
	experience: {
		years: number;
		months: number;
	};
	projects?: string[];
	certifications?: string[];
	color?: string;
}

export const skillsData: Skill[] = [
	// Programming & Systems
	{
		id: "python",
		name: "Python",
		description:
			"Programming language used for automation, POO, cybersecurity experimentation, data analysis, and machine learning.",
		icon: "logos:python",
		category: "backend",
		level: "beginner",
		experience: { years: 3, months: 0 },
		color: "#3776AB",
	},

	{
		id: "c",
		name: "C",
		description:
			"Low-level programming studied for systems, embedded processors, memory, and computer architecture.",
		icon: "logos:c",
		category: "backend",
		level: "beginner",
		experience: { years: 1, months: 0 },
		color: "#A8B9CC",
	},
	{
	id: "html",
	name: "HTML",
	description:
		"Web markup fundamentals used to structure websites and understand the building blocks of web applications.",
	icon: "logos:html-5",
	category: "frontend",
	level: "intermediate",
	experience: { years: 1, months: 2 },
	color: "#E34F26",
},

	{
		id: "arm",
		name: "ARM / Cortex",
		description:
			"Embedded processor architecture and programming, including ARM Cortex concepts and low-level execution.",
		icon: "material-symbols:memory",
		category: "other",
		level: "beginner",
		experience: { years: 0, months: 6 },
		color: "#0091BD",
	},

	// Networking & Telecommunications
	{
		id: "computer-networks",
		name: "Computer Networks",
		description:
			"Networking fundamentals including TCP/IP, Ethernet, MAC/IP addressing, routing, network services, and protocols.",
		icon: "material-symbols:lan",
		category: "other",
		level: "intermediate",
		experience: { years: 2, months: 0 },
		color: "#2196F3",
	},

	{
		id: "network-security",
		name: "Network Security",
		description:
			"Foundations of securing networks through traffic analysis, firewalling, monitoring, access control, and defensive security.",
		icon: "material-symbols:security",
		category: "other",
		level: "beginner",
		experience: { years: 1, months: 0 },
		color: "#00C853",
	},

	{
		id: "cisco-networking",
		name: "Cisco Networking",
		description:
			"Networking concepts and practical configuration studied through Cisco Networking Academy and CCNAv7 coursework.",
		icon: "logos:cisco",
		category: "other",
		level: "beginner",
		experience: { years: 1, months: 0 },
		certifications: ["cisco-ccnav7-itn"],
		color: "#1BA0D7",
	},

	{
		id: "rf",
		name: "RF & Wireless Communications",
		description:
			"Telecommunications concepts involving radio frequency, wireless communication, and communication systems.",
		icon: "material-symbols:cell-tower",
		category: "other",
		level: "beginner",
		experience: { years: 1, months: 0 },
		color: "#7E57C2",
	},

	// Cybersecurity
	{
		id: "cybersecurity",
		name: "Cybersecurity",
		description:
			"Foundational cybersecurity knowledge developed through academic work, security projects, CTFs, and hands-on labs.",
		icon: "material-symbols:shield-lock",
		category: "other",
		level: "beginner",
		experience: { years: 1, months: 0 },
		color: "#00C853",
	},

	{
		id: "web-exploitation",
		name: "Web Exploitation",
		description:
			"Hands-on learning of web application security through Hack The Box Academy and CTF challenges.",
		icon: "material-symbols:language",
		category: "other",
		level: "beginner",
		experience: { years: 0, months: 6 },
		color: "#7C4DFF",
	},

	{
		id: "ctf",
		name: "CTF",
		description:
			"Hands-on cybersecurity challenges covering web, forensics, OSINT, reverse engineering, pwn, cryptography, and miscellaneous categories.",
		icon: "material-symbols:flag",
		category: "other",
		level: "beginner",
		experience: { years: 1, months: 0 },
		color: "#FF5252",
	},

	{
		id: "forensics",
		name: "Digital Forensics",
		description:
			"Developing practical skills in digital forensics through CTF challenges and cybersecurity labs.",
		icon: "material-symbols:find-in-page",
		category: "other",
		level: "beginner",
		experience: { years: 0, months: 6 },
		color: "#26A69A",
	},

	{
		id: "osint",
		name: "OSINT",
		description:
			"Open-source intelligence techniques practiced through cybersecurity CTF challenges and reconnaissance exercises.",
		icon: "material-symbols:travel-explore",
		category: "other",
		level: "beginner",
		experience: { years: 0, months: 6 },
		color: "#42A5F5",
	},

	{
		id: "reconnaissance",
		name: "Security Reconnaissance",
		description:
			"Reconnaissance and threat-planning concepts used to understand attack surfaces, domains, networks, and web applications.",
		icon: "material-symbols:radar",
		category: "other",
		level: "beginner",
		experience: { years: 0, months: 6 },
		color: "#FF9800",
	},

	// Defensive Security
	{
		id: "opnsense",
		name: "OPNsense",
		description:
			"Open-source firewall platform used in the AI-enhanced intrusion detection project.",
		icon: "material-symbols:firewall",
		category: "other",
		level: "intermediate",
		experience: { years: 0, months: 8 },
		projects: ["ai-enhanced-ids"],
		color: "#00A878",
	},

	{
		id: "suricata",
		name: "Suricata",
		description:
			"Network IDS/IPS technology used to monitor traffic and generate security events.",
		icon: "material-symbols:shield",
		category: "other",
		level: "intermediate",
		experience: { years: 0, months: 8 },
		projects: ["ai-enhanced-ids"],
		color: "#E53935",
	},
	// Linux & Infrastructure
	{
		id: "linux",
		name: "Linux",
		description:
			"Linux command-line usage, system administration fundamentals, development environments, and cybersecurity labs.",
		icon: "logos:linux-tux",
		category: "tools",
		level: "intermediate",
		experience: { years: 2, months: 0 },
		color: "#FCC624",
	},

	{
		id: "ubuntu-server",
		name: "Ubuntu Server",
		description:
			"Server administration and security configuration using Ubuntu Server in an industrial robotics environment.",
		icon: "logos:ubuntu",
		category: "tools",
		level: "beginner",
		experience: { years: 0, months: 3 },
		projects: ["iris-technologies"],
		color: "#E95420",
	},

	{
		id: "docker",
		name: "Docker",
		description:
			"Containerization fundamentals studied for development and infrastructure environments.",
		icon: "logos:docker-icon",
		category: "tools",
		level: "beginner",
		experience: { years: 0, months: 6 },
		color: "#2496ED",
	},

	{
		id: "git",
		name: "Git",
		description:
			"Version control and collaborative development using Git and GitHub.",
		icon: "logos:git-icon",
		category: "tools",
		level: "intermediate",
		experience: { years: 2, months: 0 },
		color: "#F05032",
	},
	{
	id: "bash",
	name: "Bash",
	description:
		"Shell scripting and command-line automation used for Linux administration, development, and cybersecurity labs.",
	icon: "logos:bash-icon",
	category: "tools",
	level: "beginner",
	experience: { years: 1, months: 0 },
	color: "#4EAA25",
},

	{
		id: "ssh",
		name: "SSH",
		description:
			"Secure remote access and key-based authentication used for Linux and server environments.",
		icon: "material-symbols:terminal",
		category: "tools",
		level: "beginner",
		experience: { years: 1, months: 2 },
		projects: ["iris-technologies"],
		color: "#455A64",
	},

	{
		id: "ufw",
		name: "UFW",
		description:
			"Linux firewall configuration used for host-level network security.",
		icon: "material-symbols:firewall",
		category: "tools",
		level: "beginner",
		experience: { years: 0, months: 6 },
		projects: ["iris-technologies"],
		color: "#607D8B",
	},

	{
		id: "fail2ban",
		name: "Fail2Ban",
		description:
			"Host-based security tool used to automatically block suspicious authentication activity.",
		icon: "material-symbols:block",
		category: "tools",
		level: "beginner",
		experience: { years: 0, months: 6 },
		projects: ["iris-technologies"],
		color: "#795548",
	},

	// AI / Machine Learning
	{
		id: "machine-learning",
		name: "Machine Learning",
		description:
			"Foundational machine learning knowledge with practical application to cybersecurity event classification.",
		icon: "material-symbols:model-training",
		category: "other",
		level: "beginner",
		experience: { years: 0, months: 4 },
		projects: ["ai-enhanced-ids"],
		certifications: ["nvidia-fundamentals-deep-learning"],
		color: "#76B900",
	},
	{
	id: "mathematics",
	name: "Mathematics",
	description:
		"Advanced mathematical foundations used in engineering, including algebra, calculus, differential equations, probability, and applied mathematics.",
	icon: "material-symbols:functions",
	category: "other",
	level: "advanced",
	experience: { years: 3, months: 0 },
	color: "#7E57C2",
},

{
	id: "physics",
	name: "Physics",
	description:
		"Fundamentals of physics applied to engineering, including mechanics, electromagnetism, waves, quantum physics and physical principles relevant to telecommunications.",
	icon: "material-symbols:science",
	category: "other",
	level: "intermediate",
	experience: { years: 3, months: 0 },
	color: "#00897B",
},

{
	id: "taekwondo",
	name: "Taekwondo",
	description:
		"Long-term martial arts practice focused on discipline, technique, physical conditioning, and continuous improvement. 1st Dan black belt.",
	icon: "mdi:human-handsdown",
	category: "other",
	level: "advanced",
	experience: { years: 12, months: 7 },
	color: "#212121",
},
	

	// Robotics
	{
		id: "ros2",
		name: "ROS 2",
		description:
			"Robotics middleware studied and used in the context of autonomous robotic platforms and system security.",
		icon: "material-symbols:smart-toy",
		category: "other",
		level: "beginner",
		experience: { years: 0, months: 3 },
		projects: ["iris-technologies"],
		color: "#455A64",
	},

	{
		id: "robotics-security",
		name: "Robotics Security",
		description:
			"Security fundamentals applied to robotic platforms, ROS 2 communication, servers, and connected systems.",
		icon: "material-symbols:precision-manufacturing",
		category: "other",
		level: "beginner",
		experience: { years: 0, months: 6 },
		projects: ["iris-technologies"],
		color: "#5C6BC0",
	},
];
