import { Github } from "lucide-react";

// Enhanced Project interface with work projects
interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  tech: string[];
  category: 'fullstack' | 'frontend' | 'backend' | 'ai';
  github: string;
  live: string;
  featured: boolean;
  status: 'completed' | 'in-progress' | 'planned' | 'paused';
  progress?: number;
  projectType: 'personal' | 'professional' | 'open-source' | 'freelance'; // New field
  company?: string; // For professional projects
  teamSize?: number; // Team involvement
  role?: string; // Your role in the project
  impact?: string; // Business impact
  confidential?: boolean; // If details are limited due to NDA
}

// Updated projects array with work projects
const projectsWithWork: Project[] = [
  // Personal Projects
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

  // Professional/Work Projects
  {
    id: 2,
    title: "Enterprise Analytics Platform",
    description: "Scalable analytics dashboard serving 1M+ users with real-time data processing and visualization",
    image: "📊",
    tech: ["React", "Node.js", "Python", "AWS", "Docker", "MongoDB"],
    category: "fullstack",
    github: "#", // Private repo
    live: "#", // Internal/confidential
    featured: true,
    status: "completed",
    progress: 100,
    projectType: "professional",
    company: "TechCorp Solutions",
    teamSize: 5,
    role: "Lead Developer",
    impact: "Reduced data processing time by 60%, served 1M+ users",
    confidential: true
  },

  {
    id: 3,
    title: "AI Customer Support Chatbot",
    description: "Intelligent chatbot reducing customer support tickets by 60% using NLP and machine learning",
    image: "🤖",
    tech: ["Python", "FastAPI", "TensorFlow", "React", "WebSocket"],
    category: "ai",
    github: "#",
    live: "#",
    featured: true,
    status: "completed",
    progress: 100,
    projectType: "professional",
    company: "TechCorp Solutions",
    teamSize: 3,
    role: "AI Developer",
    impact: "60% reduction in support tickets, 40% faster response time",
    confidential: true
  },

  {
    id: 4,
    title: "Microservices Architecture Migration",
    description: "Led migration from monolith to microservices, improving scalability and deployment speed",
    image: "🏗️",
    tech: ["Docker", "Kubernetes", "Node.js", "AWS", "PostgreSQL"],
    category: "backend",
    github: "#",
    live: "#",
    featured: false,
    status: "completed",
    progress: 100,
    projectType: "professional",
    company: "TechCorp Solutions",
    teamSize: 8,
    role: "Senior Developer",
    impact: "40% faster deployments, 99.9% uptime achieved",
    confidential: true
  },

  // Open Source Contributions
  {
    id: 5,
    title: "React Performance Optimization Library",
    description: "Open-source library for React performance monitoring and optimization",
    image: "⚡",
    tech: ["React", "TypeScript", "Jest", "Webpack"],
    category: "frontend",
    github: "https://github.com/example/react-perf-lib",
    live: "https://npm.js/package/react-perf-lib",
    featured: false,
    status: "in-progress",
    progress: 70,
    projectType: "open-source"
  },

  // Freelance Projects
  {
    id: 6,
    title: "E-commerce Platform for Local Business",
    description: "Custom e-commerce solution with inventory management and payment processing",
    image: "🛒",
    tech: ["Next.js", "Stripe", "MongoDB", "Tailwind"],
    category: "fullstack",
    github: "#", // Private client work
    live: "https://client-store.com",
    featured: false,
    status: "completed",
    progress: 100,
    projectType: "freelance",
    company: "Local Retail Client",
    impact: "30% increase in online sales"
  }
];

// Enhanced Project Card Component for work projects
const EnhancedProjectCard: React.FC<{ project: Project }> = ({ project }) => {
  const getProjectTypeConfig = (type: Project['projectType']) => {
    switch (type) {
      case 'professional':
        return {
          label: 'Professional',
          bgColor: 'bg-blue-600',
          textColor: 'text-blue-400',
          icon: '🏢'
        };
      case 'personal':
        return {
          label: 'Personal',
          bgColor: 'bg-green-600',
          textColor: 'text-green-400',
          icon: '👨‍💻'
        };
      case 'open-source':
        return {
          label: 'Open Source',
          bgColor: 'bg-purple-600',
          textColor: 'text-purple-400',
          icon: '🌟'
        };
      case 'freelance':
        return {
          label: 'Freelance',
          bgColor: 'bg-orange-600',
          textColor: 'text-orange-400',
          icon: '💼'
        };
      default:
        return {
          label: 'Project',
          bgColor: 'bg-gray-600',
          textColor: 'text-gray-400',
          icon: '📁'
        };
    }
  };

  const typeConfig = getProjectTypeConfig(project.projectType);

  return (
    <div className="flex-1 min-w-[350px] max-w-[400px] group relative bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700 overflow-hidden hover:border-blue-500 transition-all duration-300 transform hover:scale-105 hover:shadow-xl">
      {/* Project Type Badge */}
      <div className="absolute top-4 left-4 z-10 flex items-center gap-2">
        <div className={`px-3 py-1 ${typeConfig.bgColor} text-white rounded-full text-sm font-medium flex items-center gap-1`}>
          <span>{typeConfig.icon}</span>
          {typeConfig.label}
        </div>
        {project.featured && (
          <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black px-3 py-1 rounded-full text-sm font-bold">
            ⭐ Featured
          </div>
        )}
      </div>

      {/* Company Info (for professional projects) */}
      {project.projectType === 'professional' && project.company && (
        <div className="absolute top-4 right-4 z-10">
          <div className="bg-gray-900/80 backdrop-blur-sm rounded-lg px-3 py-2">
            <div className="text-white text-sm font-medium">{project.company}</div>
            {project.role && (
              <div className="text-gray-400 text-xs">{project.role}</div>
            )}
          </div>
        </div>
      )}

      {/* Project Image/Icon */}
      <div className="relative h-48 bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center">
        <div className="text-6xl">{project.image}</div>
      </div>

      {/* Project Content */}
      <div className="p-6">
        <h3 className="text-xl font-bold text-white mb-2">{project.title}</h3>
        <p className="text-gray-400 mb-4 line-clamp-2">{project.description}</p>
        
        {/* Professional Project Details */}
        {project.projectType === 'professional' && (
          <div className="mb-4 p-3 bg-gray-700/50 rounded-lg">
            <div className="space-y-1 text-sm">
              {project.teamSize && (
                <div className="flex justify-between">
                  <span className="text-gray-400">Team Size:</span>
                  <span className="text-white">{project.teamSize} developers</span>
                </div>
              )}
              {project.impact && (
                <div>
                  <span className="text-gray-400">Impact:</span>
                  <span className="text-green-400 ml-1">{project.impact}</span>
                </div>
              )}
            </div>
          </div>
        )}
        
        {/* Tech Stack */}
        <div className="flex flex-wrap gap-2 mb-4">
          {project.tech.map(tech => (
            <span key={tech} className="px-3 py-1 bg-gray-700 text-gray-300 rounded-full text-sm">
              {tech}
            </span>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          {project.confidential ? (
            <button className="flex-1 px-4 py-2 bg-gray-700 text-gray-300 rounded-lg cursor-not-allowed text-sm font-medium">
              🔒 Confidential
            </button>
          ) : (
            <button className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium">
              View Details
            </button>
          )}
          
          {project.github !== '#' && !project.confidential && (
            <button className="px-4 py-2 border border-gray-600 text-gray-300 rounded-lg hover:border-gray-500 transition-colors text-sm">
              <Github size={16} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export { projectsWithWork, EnhancedProjectCard };