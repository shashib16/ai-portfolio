// components/CardGrid.tsx
import React from "react";
import { FaLinkedin, FaGithub } from "react-icons/fa";
import { FaFileAlt, FaFolderOpen } from "react-icons/fa";
import { ReactNode } from "react";
import { GITHUB_IN, LINKED_IN, RESUME_NAME } from "../utils/constant";

interface CardProps {
  icon: ReactNode;
  title: string;
  link: string;
}

const Card = ({ icon, title, link }: CardProps) => (
  <a
    href={link}
    target="_blank"
    rel="noopener noreferrer"
    className="flex flex-col items-center justify-center p-6 border rounded-2xl shadow hover:shadow-lg transition-all text-center space-y-3"
  >
    <div className="text-4xl text-gray-700">{icon}</div>
    <p className="text-md font-medium text-gray-900">{title}</p>
  </a>
);

export const CardGrid = () => {
  const cards = [
    {
      icon: <FaLinkedin />,
      title: "LinkedIn",
      link: LINKED_IN || "#",
    },
    {
      icon: <FaFolderOpen />,
      title: "Projects",
      link: "#projects",
    },
    {
      icon: <FaGithub />,
      title: "GitHub",
      link: GITHUB_IN || "#",
    },
    {
      icon: <FaFileAlt />,
      title: "Resume",
      link: `${RESUME_NAME}`,
    },
  ];

  return (
    <section className="py-10">
      <h2 className="text-2xl font-semibold text-center mb-8">AI-powered Portfolio</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto">
        {cards.map((card, index) => (
          <Card key={index} {...card} />
        ))}
      </div>
    </section>
  );
};
