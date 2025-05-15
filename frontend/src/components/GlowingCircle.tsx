// GlowingCircle.tsx
import React from 'react';

export function GlowingCircle() {
  return (
    <div className="relative flex items-center justify-center w-5 h-5">
      {/* Glow Animation */}
      <div className="absolute w-5 h-5 rounded-full bg-purple-400 opacity-75 animate-ping" />
      
      {/* Solid Center */}
      <div className="relative w-3 h-3 rounded-full bg-purple-600 z-10" />
    </div>
  );
}
