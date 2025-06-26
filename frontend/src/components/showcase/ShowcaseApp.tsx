import React, { useEffect, useState } from 'react';
import Footer from '../ui/Footer';
import ProjectShowcase from './ProjectShowcase';
import AIChatShowcase from './AIChatShowcase';
// import AnalyticsShowcase from './AnalyticsShowcase';
// import ContactFormShowcase from './ContactFormShowcase';


const ShowcaseApp: React.FC = () => {
  const [activeTab, setActiveTab] = useState('projects');
  const [viewportHeight, setViewportHeight] = useState<number>(window.innerHeight);

  useEffect(() => {
    const handleResize = () => {
      setViewportHeight(window.innerHeight);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  const getSafePosition = () => {
    const navigationHeight = 240; // Approximate height of our navigation
    const minTopOffset = 80; // Minimum distance from top
    const maxBottomOffset = 80; // Minimum distance from bottom
    
    if (viewportHeight < navigationHeight + minTopOffset + maxBottomOffset) {
      // If viewport is too small, position near top
      return {
        top: `${minTopOffset}px`,
        transform: 'none'
      };
    } else {
      // Normal center positioning
      return {
        top: '50%',
        transform: 'translateY(-50%)'
      };
    }
  };


  const tabs = [
    { id: 'projects', name: 'Projects', component: ProjectShowcase },
    { id: 'chat', name: 'AI Chat', component: AIChatShowcase },
    // { id: 'contact', name: 'Contact', component: ContactFormShowcase },
    // { id: 'analytics', name: 'Analytics', component: AnalyticsShowcase }
  ];

  const safePosition = getSafePosition();
  const ActiveComponent = tabs.find(tab => tab.id === activeTab)?.component || ProjectShowcase;
console.log({ activeTab, ActiveComponent });
  return (
    <div className="min-h-screen relative bg-gray-900 p-0 m-0">
      {/* Header */}
      {/* DEVTOOLS-FRIENDLY RIGHT STICKY NAVIGATION */}

       <div className="absolute -left-3 top-1/2 -translate-y-1/2 flex flex-col gap-2">
            {tabs.map((tab) => (
              <div
                key={tab.id}
                className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                  activeTab === tab.id 
                    ? 'bg-blue-500 scale-150 shadow-lg shadow-blue-500/50' 
                    : 'bg-gray-600'
                }`}
              ></div>
            ))}
          </div>
      <div 
        className="fixed right-6 z-[9999]"
        style={{ 
          position: 'fixed',
          right: '24px',
          ...safePosition,
          zIndex: 9999,
          maxHeight: `${Math.min(viewportHeight - 100, 400)}px`, // Dynamic max height
          overflowY: 'auto' // Allow scrolling if needed
        }}
      >
        {/* Modern glassmorphism container */}
        <div className="relative">
          {/* Background glow effect */}
          <div className="absolute inset-0 bg-gradient-to-b from-blue-500/20 to-purple-500/20 rounded-3xl blur-xl"></div>
          
          {/* Main navigation container */}
          <div className="relative bg-gray-900/80 backdrop-blur-xl rounded-3xl border border-gray-700/50 shadow-2xl p-2 min-w-[140px]">
            {/* Navigation items */}
            <div className="flex flex-col gap-2">
              {tabs.map((tab, index) => {
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`group relative px-4 py-3 rounded-2xl font-medium transition-all duration-500 text-xs text-center overflow-hidden ${
                      isActive
                        ? 'text-white shadow-lg scale-105'
                        : 'text-gray-400 hover:text-white hover:scale-102'
                    }`}
                    style={{
                      transformOrigin: 'center',
                      animationDelay: `${index * 100}ms`
                    }}
                  >
                    {/* Active background gradient */}
                    {isActive && (
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-2xl">
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/90 to-purple-600/90 rounded-2xl"></div>
                      </div>
                    )}
                    
                    {/* Hover background */}
                    {!isActive && (
                      <div className="absolute inset-0 bg-gray-800/50 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    )}
                    
                    {/* Tab content */}
                    <div className="relative z-10 flex flex-col items-center gap-0.5">
                      {/* Icon */}
                      <div className={`text-base transition-transform duration-300 ${isActive ? 'scale-110' : 'group-hover:scale-105'}`}>
                        {tab.id === 'projects' && '💼'}
                        {tab.id === 'chat' && '🤖'}
                        {tab.id === 'contact' && '📧'}
                        {tab.id === 'analytics' && '📊'}
                      </div>
                      
                      {/* Label */}
                      <span className="font-semibold whitespace-nowrap text-xs">
                        {tab.name}
                      </span>
                      
                      {/* Active indicator dot */}
                      {isActive && (
                        <div className="w-0.5 h-0.5 bg-white rounded-full animate-pulse mt-0.5"></div>
                      )}
                    </div>
                    
                    {/* Ripple effect on click */}
                    {/* <div className="absolute inset-0 rounded-2xl overflow-hidden">
                      <div className="absolute inset-0 bg-white/10 rounded-2xl opacity-0 group-active:opacity-100 transition-opacity duration-150"></div>
                    </div> */}
                  </button>
                );
              })}
            </div>
            
          </div>
          
          {/* Side accent dots */}
          <div className="absolute -left-3 top-1/2 -translate-y-1/2 flex flex-col gap-2">
            {tabs.map((tab) => (
              <div
                key={tab.id}
                className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                  activeTab === tab.id 
                    ? 'bg-blue-500 scale-150 shadow-lg shadow-blue-500/50' 
                    : 'bg-gray-600'
                }`}
              ></div>
            ))}
          </div>
        </div>
      </div>



      {/* Active Component */}
      <div className="w-full">
        <ActiveComponent />
      </div>

       <Footer />
    </div>
  );
};

export default ShowcaseApp;