import React, { useState } from 'react';

const Testimonials = () => {
  const testimonials = [
    {
      id: 1,
      name: "Sarah Johnson",
      role: "Medical Student",
      image: "https://randomuser.me/api/portraits/women/44.jpg",
      content: "Study Planner completely transformed how I prepare for exams. I increased my study efficiency by 40% and finally feel in control of my schedule.",
      rating: 5
    },
    {
      id: 2,
      name: "Michael Chen",
      role: "Software Engineering",
      image: "https://randomuser.me/api/portraits/men/32.jpg",
      content: "The progress tracking feature is amazing! I can see exactly where I'm spending time and adjust my study habits accordingly. Highly recommended!",
      rating: 5
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      role: "Law Student",
      image: "https://randomuser.me/api/portraits/women/68.jpg",
      content: "Finally a study planner that actually works! The calendar view and reminders help me stay on top of all my deadlines.",
      rating: 5
    },
    {
      id: 4,
      name: "David Kim",
      role: "PhD Candidate",
      image: "https://randomuser.me/api/portraits/men/75.jpg",
      content: "The analytics feature gives me insights I never had before. I've optimized my study schedule and seen real improvements.",
      rating: 5
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section className="relative py-20 px-4 overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute inset-0 bg-gradient-to-t from-indigo-900/20 to-transparent" />
      
      <div className="relative max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            What Our{' '}
            <span className="bg-gradient-to-r from-indigo-400 to-purple-400 text-transparent bg-clip-text">
              Students Say
            </span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Join thousands of satisfied students who have improved their study habits
          </p>
        </div>

        {/* Desktop Grid */}
        <div className="hidden md:grid grid-cols-2 lg:grid-cols-4 gap-6">
          {testimonials.map((testimonial) => (
            <TestimonialCard key={testimonial.id} testimonial={testimonial} />
          ))}
        </div>

        {/* Mobile Carousel */}
        <div className="md:hidden">
          <TestimonialCard testimonial={testimonials[currentIndex]} />
          
          {/* Carousel Controls */}
          <div className="flex justify-center gap-4 mt-6">
            <button 
              onClick={prevTestimonial}
              className="w-12 h-12 bg-white/5 border border-white/10 rounded-full flex items-center justify-center text-white hover:bg-white/10 transition-colors"
            >
              ←
            </button>
            <button 
              onClick={nextTestimonial}
              className="w-12 h-12 bg-white/5 border border-white/10 rounded-full flex items-center justify-center text-white hover:bg-white/10 transition-colors"
            >
              →
            </button>
          </div>

          {/* Dots */}
          <div className="flex justify-center gap-2 mt-4">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === currentIndex 
                    ? 'w-8 bg-indigo-500' 
                    : 'bg-white/20 hover:bg-white/40'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <Stat number="10K+" label="Happy Students" />
          <Stat number="95%" label="Success Rate" />
          <Stat number="50K+" label="Plans Created" />
          <Stat number="4.9" label="App Store Rating" />
        </div>
      </div>
    </section>
  );
};

const TestimonialCard = ({ testimonial }) => (
  <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all hover:scale-105">
    {/* Rating */}
    <div className="flex gap-1 text-yellow-400 mb-4">
      {[...Array(testimonial.rating)].map((_, i) => (
        <span key={i}>★</span>
      ))}
    </div>
    
    {/* Content */}
    <p className="text-gray-300 text-sm mb-6 line-clamp-4">
      "{testimonial.content}"
    </p>
    
    {/* User Info */}
    <div className="flex items-center gap-3">
      <img 
        src={testimonial.image} 
        alt={testimonial.name}
        className="w-12 h-12 rounded-full border-2 border-indigo-500"
      />
      <div>
        <h4 className="text-white font-semibold text-sm">{testimonial.name}</h4>
        <p className="text-gray-400 text-xs">{testimonial.role}</p>
      </div>
    </div>
  </div>
);

const Stat = ({ number, label }) => (
  <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4">
    <div className="text-2xl font-bold text-white">{number}</div>
    <div className="text-gray-400 text-sm">{label}</div>
  </div>
);

export default Testimonials;