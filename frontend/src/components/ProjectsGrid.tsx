import React from 'react';
import ProjectCard from './ProjectCard';

const projects = [
  {
    title: "AI Resume Generator",
    description: "Generate resumes based on LinkedIn profile with GPT.",
    tech: ["React", "GPT-4", "Tailwind"],
    link: "#",
    ribbon: "In Progress"
  },
  {
    title: "Portfolio Site",
    description: "Fully responsive and AI-integrated portfolio.",
    tech: ["React", "Vite", "Gemini","voiceMaker", "GPT-4", "Tailwind"],
    link: "https://github.com/shashib16/ai-portfolio",
    ribbon: "Done"
  }
  // add more projects here
];

export default function ProjectsGrid() {
  return (
    <section id="projectGrid" className="px-4 py-8 max-w-5xl mx-auto text-center">
      <h2 className="text-2xl font-bold mb-6">Projects</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {projects.map((project) => (
          <ProjectCard key={project.title} {...project} />
        ))}
      </div>
    </section>
  );
}
