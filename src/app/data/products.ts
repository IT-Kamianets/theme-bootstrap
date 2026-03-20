import { Product } from '../models/Product.model';

export const PRODUCTS: Product[] = [
	{
		id: 1,
		title: 'AI Code Assistant',
		description: 'An advanced AI-powered coding assistant utilizing machine learning to help developers write clean, bug-free code quickly.',
		fullDescription: 'AI Code Assistant is a revolutionary tool designed for modern development workflows. It integrates directly into popular IDES and provides real-time context-aware code suggestions, auto-completion, and bug detection. Trained on open-source codebases, it supports Python, JavaScript, TypeScript, Go, and Rust. Features include intelligent refactoring suggestions and automated unit test generation.',
		price: 0,
		category: 'AI Tools',
		image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=800&q=80',
		rating: 4.9,
		stock: 999,
		isNew: true,
		technologies: ['Python', 'TensorFlow', 'TypeScript', 'Node.js'],
		status: 'active',
		githubUrl: 'https://github.com/it-kamianets/ai-code-assist',
		demoUrl: 'https://demo.itkamianets.com/ai-assist',
		team: [
			{ name: 'Alex M.', role: 'ML Engineer', avatar: '', githubUrl: 'https://github.com/alexm-dev' },
			{ name: 'Sarah K.', role: 'Frontend Lead', avatar: '', githubUrl: 'https://github.com/sarahk-dev' }
		],
		images: [
			'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80',
			'https://images.unsplash.com/photo-1542831371-29b0f74f9713?auto=format&fit=crop&w=800&q=80'
		],
		tags: ['ai', 'developer-tools', 'machine-learning']
	},
	{
		id: 2,
		title: 'EcoTrack Analytics',
		description: 'A comprehensive dashboard for businesses to monitor and reduce their carbon footprint in real-time.',
		fullDescription: 'EcoTrack Analytics gives organizations the visibility they need to become carbon neutral. It aggregates data from various sensors and APIs to track energy usage, waste production, and supply chain emissions. The platform provides actionable insights and automated reporting for ESG compliance. Includes customizable alerts and a predictive modeling engine.',
		price: 0,
		category: 'Data Analytics',
		image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80',
		rating: 4.7,
		stock: 999,
		technologies: ['Angular', 'RxJS', 'PostgreSQL', 'Python'],
		status: 'active',
		githubUrl: 'https://github.com/it-kamianets/eco-track',
		team: [
			{ name: 'John D.', role: 'Data Scientist', avatar: '', githubUrl: 'https://github.com/johnd-dev' },
			{ name: 'Elena R.', role: 'UI/UX Designer', avatar: '', githubUrl: 'https://github.com/elenar-dev' }
		],
        images: [
			'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80'
		],
		tags: ['analytics', 'dashboard', 'sustainability']
	},
	{
		id: 3,
		title: 'SecureAuth Gateway',
		description: 'An open-source identity and access management (IAM) solution designed for high scalability and supreme security.',
		fullDescription: 'SecureAuth Gateway is an enterprise-grade authentication service supporting OAuth2, OIDC, and SAML out of the box. It offers seamless integration with existing active directories, provides MFA (Multi-Factor Authentication), and features a highly customizable login interface. Built with Zero-Trust architecture principles in mind, ensuring your API boundaries remain strictly protected.',
		price: 0,
		category: 'Security',
		image: 'https://images.unsplash.com/photo-1510511459019-5efa3702469d?auto=format&fit=crop&w=800&q=80',
		rating: 4.8,
		stock: 999,
		technologies: ['Go', 'Redis', 'Docker', 'Kubernetes'],
		status: 'maintenance',
		githubUrl: 'https://github.com/it-kamianets/secure-auth',
		demoUrl: 'https://auth.itkamianets.com',
		images: [
			'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=800&q=80'
		],
		tags: ['security', 'iam', 'authentication']
	},
	{
		id: 4,
		title: 'FinFlow Manager',
		description: 'Personal finance and budget management progressive web app (PWA) with intuitive data visualizations.',
		fullDescription: 'FinFlow Manager helps users take control of their finances. By securely connecting to bank APIs, it automatically categorizes transactions and identifies spending patterns. Users can set custom budgets, savings goals, and receive smart notifications. The app works completely offline thanks to its robust Service Worker implementation and syncs data when connectivity is restored.',
		price: 0,
		category: 'FinTech',
		image: 'https://images.unsplash.com/photo-1579621970588-a35d0e7ab9b6?auto=format&fit=crop&w=800&q=80',
		rating: 4.6,
		stock: 999,
		isNew: true,
		technologies: ['React', 'TypeScript', 'Tailwind', 'Node.js'],
		status: 'completed',
		githubUrl: 'https://github.com/it-kamianets/fin-flow',
		demoUrl: 'https://finflow.demo.com',
		team: [
			{ name: 'Mike T.', role: 'Fullstack Dev', avatar: '', githubUrl: 'https://github.com/miket-dev' }
		],
        images: [
            'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=800&q=80'
        ],
		tags: ['finance', 'pwa', 'react']
	},
	{
		id: 5,
		title: 'Kamianets Bot Framework',
		description: 'A versatile, multi-platform chatbot framework aimed at streamlining customer support for local businesses.',
		fullDescription: 'This bot framework allows quick deployment of conversational agents across Telegram, Viber, and Facebook Messenger using a single codebase. It features a visual flow builder, NLP integration for intent recognition, and a robust fallback mechanism to hand off complex queries to human operators. It is specifically tailored to handle common inquiries for HoReCa businesses in the region.',
		price: 0,
		category: 'Bots',
		image: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=800&q=80',
		rating: 4.5,
		stock: 999,
		technologies: ['Node.js', 'Express', 'BotKit', 'MongoDB'],
		status: 'planned',
		githubUrl: 'https://github.com/it-kamianets/bot-framework',
		tags: ['chatbot', 'automation', 'nlp']
	},
	{
		id: 6,
		title: 'DevOps Metrics Exporter',
		description: 'A lightweight Prometheus exporter for pulling custom CI/CD metrics from GitHub Actions and GitLab CI.',
		fullDescription: 'Designed to give DevOps teams better visibility into their pipelines. The exporter connects securely to APIs, collects data on build times, failure rates, and deployment frequencies, and exposes them in PromQL-ready format. Includes pre-built Grafana dashboard templates for immediate visualization of your delivery performance metrics.',
		price: 0,
		category: 'DevOps',
		image: 'https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?auto=format&fit=crop&w=800&q=80',
		rating: 4.8,
		stock: 999,
		technologies: ['Go', 'Prometheus', 'Grafana'],
		status: 'active',
		githubUrl: 'https://github.com/it-kamianets/devops-metrics',
		team: [
			{ name: 'Oleh P.', role: 'DevOps Engineer', avatar: '', githubUrl: 'https://github.com/olehp-dev' }
		],
		tags: ['devops', 'metrics', 'ci-cd']
	}
];
