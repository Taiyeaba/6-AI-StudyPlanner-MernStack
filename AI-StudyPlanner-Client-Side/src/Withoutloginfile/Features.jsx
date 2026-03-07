import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  FaCheckCircle, FaClock, FaChartLine, FaCalendarAlt, 
  FaBell, FaUsers, FaMobile, FaCloud, FaBook,
  FaTasks, FaAward, FaRocket, FaQuoteRight, FaStar,
  FaRegClock, FaRegCalendarCheck, FaChartBar
} from 'react-icons/fa';

const Features = () => {
  const [activeTab, setActiveTab] = useState('all');

  const categories = [
    { id: 'all', name: 'All Features' },
    { id: 'planning', name: 'Planning' },
    { id: 'tracking', name: 'Tracking' },
    { id: 'collaboration', name: 'Collaboration' }
  ];

  const features = [
    {
      id: 1,
      category: 'planning',
      icon: <FaTasks className="text-3xl" />,
      title: "Smart Study Plans",
      description: "Create personalized study plans with AI-powered suggestions based on your goals and available time.",
      color: "from-green-500 to-emerald-500",
      stats: "Used by 10k+ students",
      testimonial: "The smart planning feature helped me organize my entire semester!",
      author: "Rahim, Engineering Student"
    },
    {
      id: 2,
      category: 'tracking',
      icon: <FaClock className="text-3xl" />,
      title: "Time Tracking",
      description: "Track exactly how much time you spend on each subject. Get detailed reports on your study patterns.",
      color: "from-blue-500 to-cyan-500",
      stats: "50k+ hours tracked",
      testimonial: "I discovered I was spending too much time on one subject. Now I balance better!",
      author: "Sarah, Medical Student"
    },
    {
      id: 3,
      category: 'tracking',
      icon: <FaChartLine className="text-3xl" />,
      title: "Progress Analytics",
      description: "Beautiful charts showing your progress over time. See your improvement week by week.",
      color: "from-purple-500 to-pink-500",
      stats: "95% users track progress",
      testimonial: "Seeing my progress chart motivates me to study every day.",
      author: "Michael, CS Student"
    },
    {
      id: 4,
      category: 'planning',
      icon: <FaCalendarAlt className="text-3xl" />,
      title: "Study Calendar",
      description: "Visual calendar showing all your study sessions. Drag and drop to reschedule easily.",
      color: "from-orange-500 to-red-500",
      stats: "100k+ sessions scheduled",
      testimonial: "The calendar view is a game-changer for exam preparation.",
      author: "Priya, Law Student"
    },
    {
      id: 5,
      category: 'tracking',
      icon: <FaBell className="text-3xl" />,
      title: "Smart Reminders",
      description: "Get reminders before study sessions. Never miss a planned study time again.",
      color: "from-yellow-500 to-orange-500",
      stats: "1M+ reminders sent",
      testimonial: "The reminders keep me accountable. I haven't missed a session in months!",
      author: "David, Working Professional"
    },
    {
      id: 6,
      category: 'collaboration',
      icon: <FaUsers className="text-3xl" />,
      title: "Study Groups",
      description: "Create groups with friends. Share notes, discuss topics, and study together virtually.",
      color: "from-indigo-500 to-purple-500",
      stats: "500+ active groups",
      testimonial: "My study group productivity increased by 40% after using this feature.",
      author: "Emma, Group Study Leader"
    },
    {
      id: 7,
      category: 'planning',
      icon: <FaBook className="text-3xl" />,
      title: "Subject Management",
      description: "Organize all your subjects in one place. Add notes, resources, and past papers.",
      color: "from-pink-500 to-rose-500",
      stats: "10k+ subjects created",
      testimonial: "All my study materials organized perfectly. No more searching for notes!",
      author: "Alex, High School Student"
    },
    {
      id: 8,
      category: 'tracking',
      icon: <FaAward className="text-3xl" />,
      title: "Achievement System",
      description: "Earn badges and rewards for consistent study. Stay motivated with gamification.",
      color: "from-amber-500 to-orange-500",
      stats: "50k+ badges earned",
      testimonial: "The badges make studying fun. I'm addicted to maintaining my streak!",
      author: "Tom, University Student"
    }
  ];

  const filteredFeatures = activeTab === 'all' 
    ? features 
    : features.filter(f => f.category === activeTab);

  return (
    <div className="min-h-screen pt-8 pb-12 px-4">
      {/* Hero Section */}
      <section className="text-center mb-16">
        
        
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
          Features that{' '}
          <span className="bg-gradient-to-r from-indigo-400 to-purple-400 text-transparent bg-clip-text">
            Actually Work
          </span>
        </h1>
        <p className="text-gray-300 text-lg max-w-3xl mx-auto">
          Real features designed by students, for students. Join thousands who've transformed their study habits.
        </p>
      </section>

      {/* Category Tabs */}
      <section className="max-w-7xl mx-auto mb-12">
        <div className="flex flex-wrap justify-center gap-3">
          {categories.map(category => (
            <button
              key={category.id}
              onClick={() => setActiveTab(category.id)}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                activeTab === category.id
                  ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white'
                  : 'bg-white/5 text-gray-400 hover:text-white hover:bg-white/10'
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>
      </section>

      {/* Features Grid */}
      <section className="max-w-7xl mx-auto mb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredFeatures.map((feature) => (
            <div
              key={feature.id}
              className="group bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300"
            >
              <div className="flex items-start gap-4">
                {/* Icon */}
                <div className={`w-16 h-16 bg-gradient-to-br ${feature.color} rounded-xl flex items-center justify-center text-white shadow-lg flex-shrink-0`}>
                  {feature.icon}
                </div>

                {/* Content */}
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
                  <p className="text-gray-400 text-sm mb-4">{feature.description}</p>
                  
                  {/* Stats */}
                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-xs bg-indigo-500/20 text-indigo-300 px-2 py-1 rounded-full">
                      {feature.stats}
                    </span>
                  </div>

                  {/* Testimonial */}
                  <div className="bg-white/5 rounded-lg p-3 border-l-2 border-indigo-500">
                    <p className="text-xs text-gray-300 italic mb-1">"{feature.testimonial}"</p>
                    <p className="text-xs text-gray-500">- {feature.author}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Real Stats Section */}
      <section className="max-w-7xl mx-auto mb-20">
        <div className="bg-gradient-to-br from-indigo-500/10 to-purple-500/10 rounded-3xl p-8 border border-white/10">
          <h2 className="text-3xl font-bold text-white text-center mb-12">Real Results from Real Students</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-5xl font-bold text-indigo-400 mb-2">89%</div>
              <p className="text-white font-medium mb-2">of users improved grades</p>
              <p className="text-gray-400 text-sm">within first 3 months</p>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold text-purple-400 mb-2">2.5x</div>
              <p className="text-white font-medium mb-2">more study consistency</p>
              <p className="text-gray-400 text-sm">compared to traditional methods</p>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold text-pink-400 mb-2">94%</div>
              <p className="text-white font-medium mb-2">would recommend to friends</p>
              <p className="text-gray-400 text-sm">based on user survey</p>
            </div>
          </div>
        </div>
      </section>

    
    </div>
  );
};

export default Features;