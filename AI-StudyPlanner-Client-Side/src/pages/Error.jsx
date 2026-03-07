import React from 'react';
import { Link } from 'react-router-dom';

const Error = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-indigo-900 flex items-center justify-center px-4">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-indigo-600/30 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-600/30 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="relative text-center">
        
        <div className="text-8xl md:text-9xl font-bold text-white mb-4">
          4<span className="bg-gradient-to-r from-indigo-400 to-purple-400 text-transparent bg-clip-text">0</span>4
        </div>

        
        <div className="text-7xl mb-6 animate-bounce">😕</div>

        
        <h1 className="text-2xl md:text-3xl font-bold text-white mb-4">
          Page Not Found
        </h1>

        
        <p className="text-gray-400 max-w-md mx-auto mb-8">
          Oops! The page you're looking for doesn't exist or has been moved.
        </p>

       
        <Link to="/">
          <button className="px-8 py-4 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white rounded-xl font-semibold text-lg transition-all transform hover:scale-105 shadow-lg shadow-indigo-500/25 inline-flex items-center gap-2">
            <span>←</span>
            Go Back Home
          </button>
        </Link>

        
        <div className="mt-12 flex flex-wrap justify-center gap-6">
          <Link to="/" className="text-gray-400 hover:text-white transition-colors text-sm">
            Home
          </Link>
          <Link to="/features" className="text-gray-400 hover:text-white transition-colors text-sm">
            Features
          </Link>
          <Link to="/pricing" className="text-gray-400 hover:text-white transition-colors text-sm">
            Pricing
          </Link>
          <Link to="/contact" className="text-gray-400 hover:text-white transition-colors text-sm">
            Contact
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Error;