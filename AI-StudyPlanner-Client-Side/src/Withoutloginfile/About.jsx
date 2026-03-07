import React from 'react';
import { Link } from 'react-router-dom';
import { FaUsers, FaRocket, FaHeart, FaQuoteRight, FaEnvelope, FaMapMarkerAlt, FaPhone } from 'react-icons/fa';

const About = () => {
  const team = [
    {
      name: "Sarah Johnson",
      role: "Founder & CEO",
      image: "https://randomuser.me/api/portraits/women/44.jpg",
      bio: "Former university professor who saw students struggling with organization. Created Study Planner to solve this problem.",
      quote: "Every student deserves tools that make learning easier.",
      experience: "10+ years in education"
    },
    {
      name: "Michael Chen",
      role: "Lead Developer",
      image: "https://randomuser.me/api/portraits/men/32.jpg",
      bio: "Full-stack developer who was once a struggling student himself. Now builds tools he wishes he had.",
      quote: "Code can change how people learn.",
      experience: "8+ years in ed-tech"
    },
    {
      name: "Emily Rodriguez",
      role: "Product Designer",
      image: "https://randomuser.me/api/portraits/women/68.jpg",
      bio: "Designed interfaces for major tech companies. Joined Study Planner to make education more accessible.",
      quote: "Good design makes learning intuitive.",
      experience: "6+ years in UX design"
    },
    {
      name: "Dr. David Kim",
      role: "Education Advisor",
      image: "https://randomuser.me/api/portraits/men/75.jpg",
      bio: "PhD in Educational Psychology. Ensures our features are backed by learning science.",
      quote: "Psychology + Technology = Better Learning",
      experience: "15+ years in education research"
    }
  ];

  const milestones = [
    { year: "2020", event: "Study Planner founded in a dorm room" },
    { year: "2021", event: "First 1,000 users reached" },
    { year: "2022", event: "Launched mobile app" },
    { year: "2023", event: "10,000 active users milestone" },
    { year: "2024", event: "Featured in EdTech Magazine" }
  ];

  const stats = [
    { number: "10K+", label: "Active Students", icon: "👥", detail: "From 50+ countries" },
    { number: "50K+", label: "Study Plans", icon: "📚", detail: "Created and counting" },
    { number: "100K+", label: "Tasks Completed", icon: "✅", detail: "Every day" },
    { number: "4.9", label: "App Rating", icon: "⭐", detail: "From 5,000+ reviews" }
  ];

  return (
    <div className="min-h-screen pt-8 pb-12 px-4">
      {/* Hero Section */}
      <section className="relative text-center mb-20">
       
        
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
          We're on a mission to help{' '}
          <span className="bg-gradient-to-r from-indigo-400 to-purple-400 text-transparent bg-clip-text">
            every student succeed
          </span>
        </h1>
        <p className="text-gray-300 text-lg max-w-3xl mx-auto">
          What started as a simple idea in a college dorm room has grown into a platform used by thousands of students worldwide.
        </p>
      </section>

      {/* Stats Section */}
      <section className="max-w-7xl mx-auto mb-20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 text-center hover:border-indigo-500/50 transition-all">
              <div className="text-3xl mb-2">{stat.icon}</div>
              <div className="text-2xl font-bold text-white mb-1">{stat.number}</div>
              <div className="text-gray-400 text-sm mb-1">{stat.label}</div>
              <div className="text-xs text-indigo-400">{stat.detail}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Story Section */}
      <section className="max-w-7xl mx-auto mb-20">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold text-white mb-6">How It All Started</h2>
            <div className="space-y-4 text-gray-300">
              <p>
                In 2020, our founder Sarah was teaching at a university and noticed something troubling. 
                Bright, hardworking students were falling behind simply because they couldn't organize their study time effectively.
              </p>
              <p>
                She teamed up with Michael, a former student who struggled with the same issues, and together they built the first version of Study Planner. 
                It was simple: just a way to create study plans and track progress.
              </p>
              <p>
                Within months, hundreds of students were using it. Today, over 10,000 students across 50+ countries use Study Planner to organize their learning journey. 
                But our mission remains the same: help every student reach their full potential.
              </p>
            </div>
          </div>
          <div className="bg-gradient-to-br from-indigo-500/20 to-purple-500/20 rounded-2xl p-8 border border-white/10">
            <FaQuoteRight className="text-4xl text-indigo-400 mb-4" />
            <p className="text-white text-lg italic mb-4">
              "I built Study Planner because I believe organization shouldn't be a barrier to learning. Every student deserves tools that work for them."
            </p>
            <div className="flex items-center gap-3">
              <img src="https://randomuser.me/api/portraits/women/44.jpg" className="w-12 h-12 rounded-full" alt="Sarah" />
              <div>
                <p className="text-white font-medium">Sarah Johnson</p>
                <p className="text-gray-400 text-sm">Founder & CEO</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      

      {/* Team Section */}
      <section className="max-w-7xl mx-auto mb-20">
        <h2 className="text-3xl font-bold text-white text-center mb-4">Meet the Team</h2>
        <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto">
          Real people passionate about education, working remotely from around the world
        </p>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {team.map((member, index) => (
            <div key={index} className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 text-center group hover:border-indigo-500/50 transition-all">
              <img 
                src={member.image} 
                alt={member.name}
                className="w-24 h-24 rounded-full mx-auto mb-4 border-2 border-indigo-500 group-hover:scale-105 transition-transform"
              />
              <h3 className="text-lg font-semibold text-white mb-1">{member.name}</h3>
              <p className="text-indigo-400 text-sm mb-2">{member.role}</p>
              <p className="text-xs text-gray-500 mb-2">{member.experience}</p>
              <p className="text-gray-400 text-xs mb-3">{member.bio}</p>
              <p className="text-xs text-indigo-300 italic">"{member.quote}"</p>
            </div>
          ))}
        </div>
      </section>

     

     
    </div>
  );
};

export default About;