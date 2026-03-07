// components/Loader.jsx

import React from "react";

const Loader = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-indigo-900">
      
      <div className="text-center">
        
        {/* Unique Spinner - Ring with Pulse */}
        <div className="relative w-20 h-20 mx-auto mb-6">
          {/* Outer ring */}
          <div className="absolute inset-0 border-4 border-indigo-500/30 rounded-full animate-ping"></div>
          
          {/* Middle ring */}
          <div className="absolute inset-2 border-4 border-purple-500/40 rounded-full animate-[spin_3s_linear_infinite]"></div>
          
          {/* Inner ring */}
          <div className="absolute inset-4 border-4 border-pink-500/60 rounded-full animate-[spin_2s_linear_infinite_reverse]"></div>
          
          {/* Center book icon */}
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-2xl animate-bounce">📚</span>
          </div>
        </div>

        {/* App Name */}
        <h1 className="text-3xl font-bold text-white mb-2">
          Study Planner
        </h1>

        {/* Loading Text */}
        <p className="text-indigo-300 font-medium">
          preparing your study plan is loading.......
        </p>

      </div>
    </div>
  );
};

export default Loader;