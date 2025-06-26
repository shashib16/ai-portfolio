import { HTMLAttributes } from 'react';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  hover?: boolean;
  className?: string;
}

const Card: React.FC<CardProps> = ({ 
  children, 
  className = '', 
  hover = false, 
  ...props 
}) => {
  const baseClasses = 'bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700';
  const hoverClasses = hover ? 'hover:border-blue-500 transition-all duration-300 transform hover:scale-105 hover:shadow-xl' : '';
  
  return (
    <div className={`${baseClasses} ${hoverClasses} ${className}`} {...props}>
      {children}
    </div>
  );
};

export default Card;