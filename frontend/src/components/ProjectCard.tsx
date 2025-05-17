import React from "react";

  
type Project = {
  title: string;
  description: string;
  tech: string[];
  link: string;
  ribbon?: string;
};

export default function ProjectCard({ title, description, tech, link, ribbon }: Project) {
  return (
    <a
      href={link}
      target="_blank"
      className="relative border p-4 rounded-xl shadow-sm hover:shadow-lg hover:scale-[1.02] transition-all duration-300 bg-white overflow-hidden"
    >
      {/* Diagonal Ribbon */}
      {ribbon && (
  <div className="absolute -left-[50px] top-[10px] w-[160px] h-[24px] -rotate-45 bg-gray-300 text-white text-center text-[10px] font-semibold flex items-center justify-center shadow-lg z-10">
    {ribbon}
  </div>
)}



      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-sm text-gray-600">{description}</p>
      <div className="mt-2 flex flex-wrap gap-2">
        {tech.map((t) => (
          <span key={t} className="text-xs bg-indigo-100 text-indigo-800 px-2 py-1 rounded">
            {t}
          </span>
        ))}
      </div>
    </a>
  );
}

  