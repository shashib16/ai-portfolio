import { useState, useEffect } from 'react';
import { MessageCircle } from 'lucide-react';

// Particle Background Component
const ParticleBackground = () => {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {[...Array(100)].map((_, i) => (
        <div
          key={i}
          className="absolute animate-pulse"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 3}s`,
            animationDuration: `${2 + Math.random() * 4}s`
          }}
        >
          <div 
            className="bg-blue-400 rounded-full opacity-20"
            style={{
              width: `${2 + Math.random() * 4}px`,
              height: `${2 + Math.random() * 4}px`
            }}
          ></div>
        </div>
      ))}
      
      {/* Floating geometric shapes */}
      <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
      <div className="absolute top-3/4 right-1/4 w-32 h-32 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse" style={{animationDelay: '1s'}}></div>
      <div className="absolute bottom-1/4 left-1/3 w-32 h-32 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse" style={{animationDelay: '2s'}}></div>
    </div>
  );
};

const HeroSection: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [currentTitle, setCurrentTitle] = useState(0);
  
  const titles = [
    "Full Stack Developer",
    "AI Enthusiast", 
    "Problem Solver",
    "Tech Innovator"
  ];

  useEffect(() => {
    setIsVisible(true);
    const interval = setInterval(() => {
      setCurrentTitle((prev) => (prev + 1) % titles.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [setCurrentTitle, titles.length]);

  const scrollToProjects = () => {
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToChat = () => {
    document.getElementById('chat')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 overflow-hidden">
      <ParticleBackground />

      <div className={`relative z-10 text-center px-4 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="mb-8">
          <div className="w-32 h-32 mx-auto rounded-full bg-gradient-to-r from-blue-400 to-purple-500 p-1 shadow-2xl">
            <div className="w-full h-full rounded-full bg-gray-800 flex items-center justify-center text-4xl font-bold text-white">
              S
            </div>
          </div>
        </div>

        <h1 className="text-5xl md:text-7xl font-bold text-white mb-4">
          <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
            Shashi Bhushan
          </span>
        </h1>

        <div className="h-16 mb-8">
          <h2 className="text-2xl md:text-3xl text-gray-300 font-light">
            <span className="inline-block min-w-0 transition-all duration-500 transform">
              {titles[currentTitle]}
            </span>
            <span className="animate-pulse">|</span>
          </h2>
        </div>

        <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto leading-relaxed">
          Passionate about creating innovative solutions with cutting-edge technology. 
          Specializing in full-stack development and AI integration.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button 
            onClick={scrollToProjects}
            className="group relative px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
          >
            <span className="relative z-10">View My Work</span>
          </button>
          
          <button 
            onClick={scrollToChat}
            className="group px-8 py-4 border-2 border-blue-400 text-blue-400 font-semibold rounded-lg hover:bg-blue-400 hover:text-white transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2"
          >
            <MessageCircle size={20} />
            Talk to AI Assistant
          </button>
        </div>

        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-gray-400 rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;