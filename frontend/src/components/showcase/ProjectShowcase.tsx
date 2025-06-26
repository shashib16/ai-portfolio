import React, { useState } from 'react';
import { Search, Eye, Github, ExternalLink, Building, Lock, Download } from 'lucide-react';
import { getProjectTypeConfig, projects } from '../../data/projects';
import { RESUME_NAME } from '../../utils/constant';

const ProjectsWithCompanyWork: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);

 
  const filteredProjects = projects.filter(project => {
    const matchesFilter = activeFilter === 'all' || 
                         project.category === activeFilter || 
                         project.projectType === activeFilter;
    const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.tech.some(tech => tech.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesFilter && matchesSearch;
  });

  const filters = [
    { id: 'all', name: 'All Projects', count: projects.length },
    { id: 'professional', name: 'Professional', count: projects.filter(p => p.projectType === 'professional').length },
    { id: 'personal', name: 'Personal', count: projects.filter(p => p.projectType === 'personal').length },
    {id: "frontend", name: "Frontend", count: projects.filter(p => p.category === 'frontend').length },
    { id: 'fullstack', name: 'Full Stack', count: projects.filter(p => p.category === 'fullstack').length },
    // { id: 'freelance', name: 'Freelance', count: projects.filter(p => p.projectType === 'freelance').length },
  ];

  return (
    <div className="w-full bg-gray-900 px-4 sm:px-6 lg:px-8 py-8">
      <div className="max-w-7xl mx-auto">
        <div className="fixed top-6 right-6 z-50">
          <div className="group relative">
            <a 
              href={`/${RESUME_NAME}`}
              download
              className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110 inline-flex items-center justify-center"
              title="Download Resume"
            >
              <Download size={20} className="group-hover:animate-pulse" />
            </a>

            
            {/* Tooltip */}
            <div className="absolute right-full mr-3 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white text-sm px-3 py-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
              Download Resume
              <div className="absolute left-full top-1/2 transform -translate-y-1/2 border-4 border-transparent border-l-gray-800"></div>
            </div>
          </div>
        </div>
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-white mb-4">
            Shashi's <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">Work</span>
          </h2>
          <p className="text-gray-400 text-lg">Professional work, personal projects</p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          {filters.map(filter => (
            <button
              key={filter.id}
              onClick={() => setActiveFilter(filter.id)}
              className={`px-4 py-2 rounded-full font-medium transition-all duration-300 capitalize text-sm ${
                activeFilter === filter.id
                  ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg'
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
            >
              {filter.name} ({filter.count})
            </button>
          ))}
        </div>

        {/* Search Bar */}
        <div className="relative max-w-md mx-auto mb-8">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search projects..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Projects Grid */}
        <div className="flex flex-wrap gap-8 pb-8">
          {filteredProjects.map((project) => {
            const typeConfig = getProjectTypeConfig(project.projectType);
            
            return (
              <div
                key={project.id}
                className={`flex-1 min-w-[350px] max-w-[400px] group relative bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700 overflow-hidden hover:${typeConfig.borderColor} transition-all duration-300 transform hover:scale-105 hover:shadow-xl`}
                onMouseEnter={() => setHoveredProject(project.id)}
                onMouseLeave={() => setHoveredProject(null)}
              >
                {/* Project Type & Company Badge */}
                <div className="absolute top-4 left-4 z-10 flex flex-col gap-2">
                  <div className={`px-3 py-1 ${typeConfig.bgColor} text-white rounded-full text-sm font-medium flex items-center gap-1`}>
                    <span>{typeConfig.icon}</span>
                    {typeConfig.label}
                  </div>
                  {project.company && (
                    <div className="px-3 py-1 bg-gray-900/80 text-gray-300 rounded-full text-xs flex items-center gap-1">
                      <Building size={12} />
                      {project.company}
                    </div>
                  )}
                </div>

                {/* Featured & Confidential Badges */}
                <div className="absolute top-4 right-4 z-10 flex flex-col gap-2">
                  {project.featured && (
                    <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black px-3 py-1 rounded-full text-sm font-bold">
                      ⭐ Featured
                    </div>
                  )}
                  {project.confidential && (
                    <div className="bg-red-600 text-white px-3 py-1 rounded-full text-xs flex items-center gap-1">
                      <Lock size={12} />
                      Confidential
                    </div>
                  )}
                </div>

                {/* Project Image/Icon */}
                <div className="relative h-48 bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center">
                  <div className="text-6xl">{project.image}</div>
                  
                  {/* Hover Overlay */}
                  <div className={`absolute inset-0 bg-black/80 flex items-center justify-center gap-4 transition-opacity duration-300 ${
                    hoveredProject === project.id ? 'opacity-100' : 'opacity-0'
                  }`}>
                    {!project.confidential ? (
                      <>
                        <button className="p-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors">
                          <Eye size={20} />
                        </button>
                        {project.github !== '#' && (
                          <button className="p-3 bg-gray-700 text-white rounded-full hover:bg-gray-600 transition-colors">
                            <Github size={20} />
                          </button>
                        )}
                        {project.live !== '#' && (
                          <button className="p-3 bg-green-600 text-white rounded-full hover:bg-green-700 transition-colors">
                            <ExternalLink size={20} />
                          </button>
                        )}
                      </>
                    ) : (
                      <div className="text-white text-center">
                        <Lock size={32} className="mx-auto mb-2" />
                        <p className="text-sm">Protected Content</p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Project Content */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-white mb-2">{project.title}</h3>
                  <p className="text-gray-400 mb-4 line-clamp-2">{project.description}</p>
                  
                  {/* Professional Project Details */}
                  {(project.projectType === 'professional' || project.projectType === 'freelance') && (
                    <div className="mb-4 p-3 bg-gray-700/50 rounded-lg">
                      <div className="space-y-1 text-sm">
                        {project.role && (
                          <div className="flex justify-between">
                            <span className="text-gray-400">Role:</span>
                            <span className="text-white">{project.role}</span>
                          </div>
                        )}
                        {project.teamSize && (
                          <div className="flex justify-between">
                            <span className="text-gray-400">Team:</span>
                            <span className="text-white">{project.teamSize} people</span>
                          </div>
                        )}

                        {project.impact && (
                          <div className="mt-2">
                            <span className="text-gray-400">Impact:</span>
                            <span className="text-green-400 ml-1 text-xs">{project.impact}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                  
                  {/* Key Achievements */}
                  {project.achievements && project.achievements.length > 0 && (
                    <div className="mb-4">
                      <h4 className="text-white font-medium text-sm mb-2">Key Achievements:</h4>
                      <ul className="space-y-1">
                        {project.achievements.slice(0, 2).map((achievement, i) => (
                          <li key={i} className="text-gray-300 text-xs flex items-start gap-1">
                            <span className="text-yellow-400 mt-0.5">•</span>
                            {achievement}
                          </li>
                        ))}
                        {project.achievements.length > 2 && (
                          <li className="text-gray-500 text-xs">
                            +{project.achievements.length - 2} more achievements
                          </li>
                        )}
                      </ul>
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
                      <button className="flex-1 px-4 py-2 bg-gray-700 text-gray-300 rounded-lg cursor-not-allowed text-sm font-medium flex items-center justify-center gap-2">
                        <Lock size={16} />
                        NDA Protected
                      </button>
                    ) : (
                      <>
                        <button className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium">
                          View Details
                        </button>
                        {project.github !== '#' && (
                          <button className="px-4 py-2 border border-gray-600 text-gray-300 rounded-lg hover:border-gray-500 transition-colors text-sm">
                            <Github size={16} />
                          </button>
                        )}
                      </>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Project Summary */}
        <div className="mt-12 bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
          <h3 className="text-xl font-bold text-white mb-6 text-center">📊 Project Portfolio Summary</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { 
                label: 'Professional Projects', 
                count: projects.filter(p => p.projectType === 'professional').length,
                color: 'text-blue-400',
                icon: '🏢'
              },
              { 
                label: 'Personal Projects', 
                count: projects.filter(p => p.projectType === 'personal').length,
                color: 'text-green-400',
                icon: '👨‍💻'
              },
              { 
                label: 'Team Projects', 
                count: projects.filter(p => p.teamSize && p.teamSize > 1).length,
                color: 'text-purple-400',
                icon: '👥'
              },
              { 
                label: 'Total Impact Projects', 
                count: projects.filter(p => p.impact).length,
                color: 'text-orange-400',
                icon: '🎯'
              }
            ].map(stat => (
              <div key={stat.label} className="text-center">
                <div className="text-2xl mb-2">{stat.icon}</div>
                <div className={`text-2xl font-bold ${stat.color} mb-1`}>{stat.count}</div>
                <div className="text-gray-400 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectsWithCompanyWork;