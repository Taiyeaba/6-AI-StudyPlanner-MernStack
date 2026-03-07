import React from 'react';
import { Link } from 'react-router-dom';
import { FaUserPlus, FaBullseye, FaTasks, FaTrophy } from 'react-icons/fa';

const HowItWorks = () => {
  const steps = [
    {
      number: "01",
      title: "Create Account",
      description: "Sign up for free in less than a minute. No credit card required.",
      icon: <FaUserPlus className="text-4xl" />,
      color: "from-blue-500 to-cyan-500"
    },
    {
      number: "02",
      title: "Set Your Goals",
      description: "Create study plans, add subjects, and set your target deadlines.",
      icon: <FaBullseye className="text-4xl" />,
      color: "from-purple-500 to-pink-500"
    },
    {
      number: "03",
      title: "Add Tasks",
      description: "Break down your plans into daily tasks and track your progress.",
      icon: <FaTasks className="text-4xl" />,
      color: "from-orange-500 to-red-500"
    },
    {
      number: "04",
      title: "Achieve Success",
      description: "Complete tasks, earn streaks, and reach your academic goals.",
      icon: <FaTrophy className="text-4xl" />,
      color: "from-green-500 to-emerald-500"
    }
  ];

  return (
    <section className="relative py-24 px-4 overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-indigo-900/10 to-transparent" />
      
      {/* Floating Elements */}
      <div className="absolute top-20 left-10 w-64 h-64 bg-indigo-600/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-20 right-10 w-64 h-64 bg-purple-600/10 rounded-full blur-3xl animate-pulse delay-1000" />

      <div className="relative max-w-7xl mx-auto">
        {/* Section Header with Animation */}
        <div className="text-center mb-16">
         
          
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            How It{' '}
            <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 text-transparent bg-clip-text">
              Works
            </span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Get started in four simple steps and transform your study routine
          </p>
        </div>

        {/* Timeline for Mobile/Tablet */}
        <div className="lg:hidden space-y-6">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              {/* Mobile Step Card */}
              <div className={`relative bg-gradient-to-br from-white/5 to-white/0 backdrop-blur-md border border-white/10 rounded-2xl p-6 hover:border-indigo-500/50 transition-all duration-300`}>
                {/* Step Number Badge */}
                <div className={`absolute -top-3 -right-3 w-10 h-10 bg-gradient-to-r ${step.color} rounded-full flex items-center justify-center text-white font-bold text-sm shadow-xl`}>
                  {step.number}
                </div>
                
                <div className="flex items-start gap-4">
                  {/* Icon with Gradient */}
                  <div className={`w-16 h-16 bg-gradient-to-br ${step.color} rounded-xl flex items-center justify-center text-white shadow-lg flex-shrink-0`}>
                    {step.icon}
                  </div>
                  
                  <div className="flex-1">
                    <h3 className="text-xl  font-semibold text-white mb-2">
                      {step.title}
                    </h3>
                    <p className="text-gray-400 text-sm">
                      {step.description}
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Connecting Line (for mobile) */}
              {index < steps.length - 1 && (
                <div className="hidden sm:block absolute left-8 top-full h-8 w-0.5 bg-gradient-to-b from-indigo-500 to-transparent ml-8" />
              )}
            </div>
          ))}
        </div>

        {/* Desktop Vertical Timeline */}
        <div className="hidden lg:block relative">
          {/* Center Line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-indigo-500/0 via-indigo-500/50 to-purple-500/0" />
          
          <div className="space-y-16">
            {steps.map((step, index) => (
              <div key={index} className={`relative flex items-center ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}>
                {/* Content */}
                <div className="w-1/2 px-8">
                  <div className={`${index % 2 === 0 ? 'text-right' : 'text-left'}`}>
                    {/* Step Number */}
                    <span className={`inline-block px-4 py-1 bg-gradient-to-r ${step.color} text-white text-sm font-bold rounded-full mb-4`}>
                      Step {step.number}
                    </span>
                    
                    {/* Title */}
                    <h3 className="text-2xl mx-5 font-bold text-white mb-3">
                      {step.title}
                    </h3>
                    
                    {/* Description */}
                    <p className="text-gray-400 mx-3">
                      {step.description}
                    </p>
                  </div>
                </div>

                {/* Center Icon */}
                <div className="absolute left-1/2 transform -translate-x-1/2">
                  <div className={`w-20 h-20 bg-gradient-to-br ${step.color} rounded-2xl flex items-center justify-center text-white shadow-2xl border-4 border-gray-900 group hover:scale-110 transition-all duration-300`}>
                    {step.icon}
                  </div>
                </div>

                {/* Empty space for the other side */}
                <div className="w-1/2" />
              </div>
            ))}
          </div>
        </div>

        {/* Stats Section */}
        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
          <StatBox number="1min" label="Sign up time" />
          <StatBox number="1000+" label="Daily users" />
          <StatBox number="50k+" label="Tasks completed" />
          <StatBox number="4.9⭐" label="User rating" />
        </div>

       

        
      </div>
    </section>
  );
};


const StatBox = ({ number, label }) => (
  <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4 text-center hover:border-indigo-500/50 transition-all duration-300">
    <div className="text-xl font-bold text-white">{number}</div>
    <div className="text-xs text-gray-400 mt-1">{label}</div>
  </div>
);

export default HowItWorks;