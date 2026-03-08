import React from 'react';
import { Link } from 'react-router-dom';

const HeroSection = () => {
  return (
    <section className="relative pt-14 pb-20 px-4 md:px-6 overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/20 via-purple-900/20 to-pink-900/20" />
      
      {/* Animated Background Elements */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-indigo-600/30 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-20 right-10 w-72 h-72 bg-purple-600/30 rounded-full blur-3xl animate-pulse delay-1000" />
      
      <div className="relative max-w-7xl mx-auto">
        <div className="text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full mb-8">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            <span className="text-sm text-gray-300">Trusted by 1000+ students</span>
          </div>

          {/* Main Heading */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6">
            Plan Your{' '}
            <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 text-transparent bg-clip-text">
              Learning Journey
            </span>
          </h1>
          
          <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto mb-10">
            Create personalized study plans, track your progress, and achieve your academic goals with our intelligent study planner.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Link to="">
              <button className="group relative px-8 py-4 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white rounded-xl font-semibold text-lg transition-all transform hover:scale-105 shadow-lg shadow-indigo-500/25 w-full sm:w-auto">
                <span className="flex items-center justify-center gap-2">
                  Get Started Free
                  <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </span>
              </button>
            </Link>
            <Link to="">
              <button className="px-8 py-4 bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 text-white rounded-xl font-semibold text-lg transition-all w-full sm:w-auto">
                Watch Demo
              </button>
            </Link>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
              <div className="text-3xl font-bold text-white mb-2">10K+</div>
              <div className="text-indigo-300 font-medium">Active Users</div>
              <div className="text-gray-400 text-sm mt-2">Growing every day</div>
            </div>
            
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
              <div className="text-3xl font-bold text-white mb-2">50K+</div>
              <div className="text-purple-300 font-medium">Plans Created</div>
              <div className="text-gray-400 text-sm mt-2">And counting</div>
            </div>
            
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
              <div className="text-3xl font-bold text-white mb-2">95%</div>
              <div className="text-pink-300 font-medium">Success Rate</div>
              <div className="text-gray-400 text-sm mt-2">Happy students</div>
            </div>
          </div>

          {/* Feature Pills */}
          <div className="flex flex-wrap justify-center gap-3 mt-16">
            <FeaturePill icon="📋" text="Create Plans" />
            <FeaturePill icon="✅" text="Track Tasks" />
            <FeaturePill icon="📊" text="Progress Analytics" />
            <FeaturePill icon="📅" text="Calendar View" />
            <FeaturePill icon="🔔" text="Smart Reminders" />
            <FeaturePill icon="📈" text="Performance Stats" />
            <FeaturePill icon="🎯" text="Goal Setting" />
            <FeaturePill icon="📚" text="Subject Management" />
          </div>

         
        </div>
      </div>
    </section>
  );
};

// Feature Pill Component
const FeaturePill = ({ icon, text }) => (
  <div className="flex items-center gap-2 px-4 py-2 bg-white/5 backdrop-blur-sm border border-white/10 rounded-full hover:bg-white/10 transition-colors cursor-default">
    <span>{icon}</span>
    <span className="text-sm text-gray-300">{text}</span>
  </div>
);

export default HeroSection;