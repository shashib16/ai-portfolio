// src/types/index.ts

type categoryTypes = 'fullstack' | 'frontend' | 'backend' | 'ai';
type statusTypes = 'completed' | 'in-progress' | 'planned';
 type projectType = 'professional' | 'freelance' | 'open-source' | 'collaborative' | 'personal';

export interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  tech: string[];
  category: categoryTypes;
  github: string;
  live: string;
  status: statusTypes;
  progress: number; // 0-100
  projectType: projectType;
  company?: string; // Optional for personal projects
  teamSize?: number; // Optional for personal projects
  role?: string; // Optional for personal projects
  duration?: string; // Optional for personal projects
  impact?: string; // Optional for personal projects
  confidential?: boolean; // Optional for personal projects
  achievements?: string[]; // Optional for personal projects
  // Additional fields for enhanced project details
  createdAt?: Date; // Date when the project was added
  updatedAt?: Date; // Date when the project was last updated
  featured: boolean;
}

export interface ProjectFilter {
  id: string;
  name: string;
  count: number;
}

export interface ChatMessage {
  id: number;
  content: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

export interface ChatState {
  messages: ChatMessage[];
  isTyping: boolean;
  isListening: boolean;
  chatHistory: ChatMessage[];
}

export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface AnalyticsData {
  visitors: number;
  conversations: number;
  avgSessionTime: string;
  projectViews: number;
}

export interface Skill {
  name: string;
  level: number;
  color: string;
}

export interface Experience {
  id: number;
  title: string;
  company: string;
  period: string;
  description: string;
  technologies: string[];
}

export interface ProjectObjsProps {
    label: string;
    bgColor: string;
    textColor: string;
    icon: string;
    borderColor: string;
    
  }
  