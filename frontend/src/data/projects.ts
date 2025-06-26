// src/data/projects.ts
import { Project, ProjectFilter, ProjectObjsProps } from '../types';

export const projects: Project[] = [
    // PERSONAL PROJECTS
    {
      id: 1,
      title: "AI Portfolio Website",
      description: "Interactive portfolio with AI assistant, built with React and FastAPI",
      image: "🤖",
      tech: ["React", "TypeScript", "Python", "FastAPI", "AI"],
      category: "fullstack",
      github: "https://github.com/shashib16/ai-portfolio",
      live: "https://shashi-aiportfolio.netlify.app/",
      featured: true,
      status: "completed",
      progress: 100,
      projectType: "personal"
    },
    // {
    //   id: 2,
    //   title: "Weather Analytics Dashboard",
    //   description: "Real-time weather tracking with predictive analytics and beautiful visualizations",
    //   image: "🌤️",
    //   tech: ["React", "D3.js", "Python", "FastAPI"],
    //   category: "frontend",
    //   github: "#",
    //   live: "#",
    //   featured: false,
    //   status: "in-progress",
    //   progress: 75,
    //   projectType: "personal"
    // },

    // COMPANY/PROFESSIONAL PROJECTS
    {
    id: 11,
    title: "Knowledge Graph Validation System",
    description: "Scalable full-stack validation system that reduced validation time by 30% using modern architecture",
    image: "🧠",
    tech: ["React", "AWS Lambda", "DynamoDB", "TypeScript"],
    category: "fullstack",
    github: "#", // Private
    live: "#", // Internal
    featured: true,
    status: "completed",
    progress: 100,
    projectType: "professional",
    company: "Drishya AI",
    teamSize: 3,
    role: "Software Engineer",
    duration: "4 months",
    impact: "30% reduction in validation time",
    confidential: true,
    achievements: [
      "Architected scalable validation workflows",
      "Integrated AWS Lambda for serverless processing",
      "Built React-based dashboard interface",
      "Optimized object verification processes"
    ]
  },
  {
    id: 12,
    title: "Frontend Codebase Refactor",
    description: "Core codebase modernization with Zustand, TypeScript, and modular architecture for improved scalability",
    image: "🔧",
    tech: ["React", "Zustand", "TypeScript", "Modular Architecture"],
    category: "frontend",
    github: "#",
    live: "#",
    featured: true,
    status: "completed",
    progress: 100,
    projectType: "professional",
    company: "Drishya AI",
    teamSize: 4,
    role: "Software Engineer",
    duration: "3 months",
    impact: "Improved code quality and reduced onboarding time",
    confidential: true,
    achievements: [
      "Migrated to TypeScript for type safety",
      "Implemented Zustand for state management",
      "Created modular component architecture",
      "Reduced developer onboarding time"
    ]
  },
  {
    id: 13,
    title: "Image Processing Automation",
    description: "Automation pipeline for rule-based image processing with minimal user interaction using cloud services",
    image: "🖼️",
    tech: ["React", "AWS Lambda", "S3", "DynamoDB", "Pub-Sub"],
    category: "fullstack",
    github: "#",
    live: "#",
    featured: false,
    status: "completed",
    progress: 100,
    projectType: "professional",
    company: "Drishya AI",
    teamSize: 4,
    role: "Software Engineer",
    duration: "5 months",
    impact: "Automated image variant generation",
    confidential: true,
    achievements: [
      "Built serverless image processing pipeline",
      "Implemented pub-sub messaging system",
      "Created rule-based processing engine",
      "Minimal user interaction required"
    ]
  },
  {
    id: 14,
    title: "P&ID Annotation System",
    description: "React-based UI for plotting and validating JSON data within P&ID workflows with 40% speed improvement",
    image: "📐",
    tech: ["React", "JSON Validation", "Jest", "Testing"],
    category: "frontend",
    github: "#",
    live: "#",
    featured: false,
    status: "completed",
    progress: 100,
    projectType: "professional",
    company: "Drishya AI",
    teamSize: 3,
    role: "Software Engineer",
    duration: "3 months",
    impact: "40% improvement in digitization speed",
    confidential: true,
    achievements: [
      "Built React-based annotation interface",
      "JSON data plotting and validation",
      "Comprehensive Jest testing suite",
      "Enhanced workflow consistency"
    ]
  },
  {
    id: 15,
    title: "Responsive Web Platform",
    description: "Full-stack web application with React frontend and Node.js backend, integrated with multiple databases",
    image: "💻",
    tech: ["React", "Node.js", "PostgreSQL", "MongoDB", "API Integration"],
    category: "fullstack",
    github: "#",
    live: "#",
    featured: false,
    status: "completed",
    progress: 100,
    projectType: "professional",
    company: "Datoin",
    teamSize: 5,
    role: "Frontend Intern",
    duration: "10 months",
    impact: "Enhanced user experience and system integration",
    confidential: false,
    achievements: [
      "Developed responsive React interfaces",
      "API integration and backend services",
      "Multi-database implementation",
      "UI/UX requirement implementation"
    ]
  },
  ];

export const projectFilters: ProjectFilter[] = [
  { id: 'all', name: 'All Projects', count: projects.length },
  { 
    id: 'fullstack', 
    name: 'Full Stack', 
    count: projects.filter(p => p.category === 'fullstack').length 
  },
  { 
    id: 'frontend', 
    name: 'Frontend', 
    count: projects.filter(p => p.category === 'frontend').length 
  },
];

export const getProjectsByCategory = (category: string): Project[] => {
  if (category === 'all') return projects;
  if (category === 'ai') {
    return projects.filter(project => 
      project.category === 'ai' || 
      project.tech.some(tech => tech.includes('AI') || tech.includes('ML'))
    );
  }
  return projects.filter(project => project.category === category);
};

export const searchProjects = (searchTerm: string): Project[] => {
  if (!searchTerm) return projects;
  
  return projects.filter(project =>
    project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    project.tech.some(tech => tech.toLowerCase().includes(searchTerm.toLowerCase()))
  );
};

export const getProjectTypeConfig = (type: Project['projectType']) : ProjectObjsProps => {
    switch (type) {
      case 'professional':
        return {
          label: 'Professional',
          bgColor: 'bg-blue-600',
          textColor: 'text-blue-400',
          icon: '🏢',
          borderColor: 'border-blue-500'
        };
      case 'personal':
        return {
          label: 'Personal',
          bgColor: 'bg-green-600',
          textColor: 'text-green-400',
          icon: '👨‍💻',
          borderColor: 'border-green-500'
        };
      case 'freelance':
        return {
          label: 'Freelance',
          bgColor: 'bg-orange-600',
          textColor: 'text-orange-400',
          icon: '💼',
          borderColor: 'border-orange-500'
        };
      case 'open-source':
        return {
          label: 'Open Source',
          bgColor: 'bg-purple-600',
          textColor: 'text-purple-400',
          icon: '🌟',
          borderColor: 'border-purple-500'
        };
      default:
        return {
          label: 'Project',
          bgColor: 'bg-gray-600',
          textColor: 'text-gray-400',
          icon: '📁',
          borderColor: 'border-gray-500'
        };
    }
  };