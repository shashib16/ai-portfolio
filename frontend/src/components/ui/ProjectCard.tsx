import { useState } from 'react';
import { ExternalLink, Github, Eye } from 'lucide-react';
import { Project } from '../../types';
import Button from '../ui/Button.tsx';

interface ProjectCardProps {
  project: Project;
  index?: number;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, index = 0 }) => {
  const [isHovered, setIsHovered] = useState<boolean>(false);

  const handleViewDetails = () => {
    // You can implement modal or navigation logic here
    console.log('View details for:', project.title);
  };

  const handleGithubClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    console.log({project: project.github});
    if (project.github !== '#') {
      window.open(project.github, '_blank', 'noopener,noreferrer');
    }
  };

  const handleLiveClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (project.live !== '#') {
      window.open(project.live, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <div
      className="group relative bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700 overflow-hidden hover:border-blue-500 transition-all duration-300 transform hover:scale-105 hover:shadow-xl animate-fadeIn"
      style={{ animationDelay: `${index * 100}ms` }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Featured Badge */}
      {project.featured && (
        <div className="absolute top-4 right-4 z-10 bg-gradient-to-r from-yellow-400 to-orange-500 text-black px-3 py-1 rounded-full text-sm font-bold">
          ⭐ Featured
        </div>
      )}

      {/* Project Image/Icon */}
      <div className="relative h-48 bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center">
        <div className="text-6xl select-none">{project.image}</div>
        
        {/* Hover Overlay */}
        <div className={`absolute inset-0 bg-black/80 flex items-center justify-center gap-4 transition-opacity duration-300 ${
          isHovered ? 'opacity-100' : 'opacity-0'
        }`}>
          <button 
            onClick={handleViewDetails}
            className="p-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors"
            aria-label="View project details"
          >
            <Eye size={20} />
          </button>
          <button 
            onClick={handleGithubClick}
            className="p-3 bg-gray-700 text-white rounded-full hover:bg-gray-600 transition-colors"
            aria-label="View GitHub repository"
            disabled={project.github === '#'}
          >
            <Github size={20} />
          </button>
          <button 
            onClick={handleLiveClick}
            className="p-3 bg-green-600 text-white rounded-full hover:bg-green-700 transition-colors"
            aria-label="View live demo"
            disabled={project.live === '#'}
          >
            <ExternalLink size={20} />
          </button>
        </div>
      </div>

      {/* Project Content */}
      <div className="p-6">
        <h3 className="text-xl font-bold text-white mb-2">{project.title}</h3>
        <p className="text-gray-400 mb-4 line-clamp-2">{project.description}</p>
        
        {/* Tech Stack */}
        <div className="flex flex-wrap gap-2 mb-4">
          {project.tech.map((tech) => (
            <span 
              key={tech} 
              className="px-3 py-1 bg-gray-700 text-gray-300 rounded-full text-sm hover:bg-gray-600 transition-colors"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <Button 
            variant="primary" 
            className="flex-1 text-sm"
            onClick={handleViewDetails}
          >
            View Details
          </Button>
          <button 
            onClick={handleGithubClick}
            className="px-4 py-2 border border-gray-600 text-gray-300 rounded-lg hover:border-gray-500 transition-colors text-sm flex items-center justify-center disabled:opacity-50"
            disabled={project.github === '#'}
            aria-label="GitHub repository"
          >
            <Github size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;