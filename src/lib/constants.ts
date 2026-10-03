export const FORM_URL =
  'https://docs.google.com/forms/d/e/1FAIpQLSeL8f2MVguTO1VD1PLsxH0kI3hEPZ4FOWyZ6aNvrmXq9_D31Q/viewform?usp=header'

export const EMAIL = 'virat0270singh@gmail.com'

export const DOCS_PDF = `${import.meta.env.BASE_URL}NexaCraft-Docs.pdf`

export const SITE_URL = 'https://shreyansh0207.github.io/nexacraft/'

export const NAV_LINKS = [
  { label: 'Home', href: '#home' },
  { label: 'Services', href: '#services' },
  { label: 'AI Agents', href: '#agents' },
  { label: 'Automation', href: '#automation' },
  { label: 'Work', href: '#work' },
  { label: 'Contact', href: '#contact' },
]

export type Service = {
  num: string
  title: string
  desc: string
  icon: 'browser' | 'cube' | 'agent' | 'dials' | 'workflow' | 'video' | 'spark' | 'link'
}

export const SERVICES: Service[] = [
  {
    num: '01',
    title: 'Web Development',
    desc: 'Fast, premium, conversion-focused websites engineered with modern stacks.',
    icon: 'browser',
  },
  {
    num: '02',
    title: '3D Web Development',
    desc: 'Immersive WebGL and Three.js experiences that make brands unforgettable.',
    icon: 'cube',
  },
  {
    num: '03',
    title: 'AI Agents',
    desc: 'Intelligent agents that answer, qualify, book and act — 24/7.',
    icon: 'agent',
  },
  {
    num: '04',
    title: 'Custom AI Agents',
    desc: 'Agents designed around your exact workflow, tools and data.',
    icon: 'dials',
  },
  {
    num: '05',
    title: 'n8n Automation',
    desc: 'Automated pipelines connecting your apps, APIs, databases and AI.',
    icon: 'workflow',
  },
  {
    num: '06',
    title: 'AI Animation / Video',
    desc: 'AI-crafted characters, avatars and video content for your brand.',
    icon: 'video',
  },
  {
    num: '07',
    title: 'AI Website Integration',
    desc: 'We wire AI straight into the website you already own.',
    icon: 'spark',
  },
  {
    num: '08',
    title: 'Custom Integrations',
    desc: 'Custom APIs and AI integrations built to fit your systems.',
    icon: 'link',
  },
]

export const AGENT_EXAMPLES = [
  'Customer Support Agent',
  'Sales Agent',
  'Lead Qualification Agent',
  'Booking Agent',
  'Research Agent',
  'Data Extraction Agent',
  'Email Agent',
  'Internal Business Assistant',
  'Website AI Assistant',
  'Custom Agent',
]

export const AGENT_PIPELINE = [
  { step: 'USER', desc: 'Your customer asks, requests or clicks.' },
  { step: 'WEBSITE / WHATSAPP / EMAIL', desc: 'Any channel where your business already lives.' },
  { step: 'AI AGENT', desc: 'Understands intent and decides what to do next.' },
  { step: 'LLM', desc: 'Reasons over your knowledge, rules and context.' },
  { step: 'APIS / DATABASE / TOOLS', desc: 'Connects to real systems and real data.' },
  { step: 'n8n AUTOMATION', desc: 'Orchestrates the full workflow end-to-end.' },
  { step: 'BUSINESS ACTION', desc: 'A lead saved, a booking made, an email sent.' },
]

export const AUTOMATION_FLOW = [
  { node: 'Website Lead', icon: '🌐' },
  { node: 'n8n', icon: '⚙️' },
  { node: 'AI Agent', icon: '🧠' },
  { node: 'CRM', icon: '🗄️' },
  { node: 'Email', icon: '✉️' },
  { node: 'Sales Notification', icon: '🔔' },
]

export const UPGRADE_STAGES = [
  { stage: 'EXISTING WEBSITE', desc: 'Keep your current site exactly as it is.' },
  { stage: 'AI INTEGRATION', desc: 'We layer AI capabilities into it — no rebuild.' },
  { stage: 'CUSTOM AI AGENT', desc: 'An agent trained on your business and rules.' },
  { stage: 'APIS + DATABASE + AUTOMATION', desc: 'Wired to your tools and workflows end-to-end.' },
]

export const UPGRADE_EXAMPLES = [
  'AI Customer Support',
  'AI Booking',
  'AI Lead Qualification',
  'AI Product Assistant',
  'AI FAQ Assistant',
  'AI Sales Assistant',
]

export const AI_VIDEO_ITEMS = [
  { title: 'AI Characters & Avatars', desc: 'Presenters and brand characters generated with AI.' },
  { title: 'Product Videos', desc: 'Cinematic product showcases without a film crew.' },
  { title: 'Explainer Videos', desc: 'Complex ideas explained in seconds.' },
  { title: 'Marketing Videos', desc: 'Campaign-ready creative at AI speed.' },
  { title: 'Social Media Videos', desc: 'Scroll-stopping clips for every platform.' },
  { title: 'Product Demos', desc: 'Walkthroughs that sell while you sleep.' },
]

export const PROCESS_STEPS = [
  { num: '01', title: 'DISCOVER', desc: 'Understand the requirement.' },
  { num: '02', title: 'DESIGN', desc: 'Plan the experience and workflow.' },
  { num: '03', title: 'BUILD', desc: 'Develop the website, AI system or automation.' },
  { num: '04', title: 'INTEGRATE', desc: 'Connect APIs, databases, agents and tools.' },
  { num: '05', title: 'LAUNCH', desc: 'Deploy and support the solution.' },
]

export type Project = {
  title: string
  category: 'Websites' | '3D Web' | 'AI Agents' | 'Automation' | 'AI Video' | 'Integrations'
  desc: string
  hue: number
}

export const PROJECTS: Project[] = [
  {
    title: 'Aurora Commerce',
    category: 'Websites',
    desc: 'Concept storefront with an AI product assistant wired into checkout.',
    hue: 18,
  },
  {
    title: 'Orbital Configurator',
    category: '3D Web',
    desc: 'Interactive WebGL product configurator concept with cinematic camera moves.',
    hue: 190,
  },
  {
    title: 'SupportPilot',
    category: 'AI Agents',
    desc: 'Customer-support agent concept that resolves tickets and escalates smartly.',
    hue: 265,
  },
  {
    title: 'LeadFlow Engine',
    category: 'Automation',
    desc: 'n8n pipeline concept: capture → enrich → qualify → notify sales.',
    hue: 150,
  },
  {
    title: 'Cinematic AI Ad',
    category: 'AI Video',
    desc: 'AI-generated product film concept: script, voice, motion — one brief.',
    hue: 330,
  },
  {
    title: 'Legacy Boost',
    category: 'Integrations',
    desc: 'Concept of an existing site transformed with AI search and a booking agent.',
    hue: 45,
  },
]

export const PROJECT_CATEGORIES = [
  'All',
  'Websites',
  '3D Web',
  'AI Agents',
  'Automation',
  'AI Video',
  'Integrations',
] as const

export const TECH_GROUPS = [
  {
    label: 'Frontend',
    items: ['React', 'Next.js', 'Three.js', 'React Three Fiber', 'Tailwind CSS'],
  },
  {
    label: 'Backend',
    items: ['Node.js', 'Express', 'FastAPI', 'Python'],
  },
  {
    label: 'AI',
    items: ['LLMs', 'RAG', 'AI Agents', 'Embeddings', 'Vector Databases', 'AI APIs'],
  },
  {
    label: 'Automation',
    items: ['n8n', 'Webhooks', 'REST APIs'],
  },
  {
    label: 'Databases',
    items: ['MongoDB', 'PostgreSQL', 'MySQL'],
  },
  {
    label: 'Deployment',
    items: ['Docker', 'Cloud Platforms', 'CI/CD'],
  },
]

export const MARQUEE_ITEMS = [
  'Web Development',
  '3D Web',
  'AI Agents',
  'n8n Automation',
  'AI Video',
  'Custom Integrations',
  'RAG Systems',
  'LLM Apps',
  'WebGL',
  'AI Website Integration',
]
