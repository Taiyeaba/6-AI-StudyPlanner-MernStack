import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaCheck, FaTimes } from 'react-icons/fa';

const Pricing = () => {
  const [isAnnual, setIsAnnual] = useState(true);

  const plans = [
    {
      name: "Basic",
      price: isAnnual ? "0" : "0",
      period: isAnnual ? "year" : "month",
      description: "Perfect for getting started",
      features: [
        { name: "Up to 3 study plans", included: true },
        { name: "Basic task management", included: true },
        { name: "Progress tracking", included: true },
        { name: "Email support", included: true },
        { name: "Advanced analytics", included: false },
        { name: "Calendar integration", included: false },
        { name: "Priority support", included: false },
        { name: "Group study features", included: false }
      ],
      buttonText: "Get Started",
      buttonLink: "/register",
      popular: false
    },
    {
      name: "Pro",
      price: isAnnual ? "7.99" : "9.99",
      period: isAnnual ? "month" : "month",
      description: "Best for serious students",
      features: [
        { name: "Unlimited study plans", included: true },
        { name: "Advanced task management", included: true },
        { name: "Detailed analytics", included: true },
        { name: "Calendar integration", included: true },
        { name: "Smart reminders", included: true },
        { name: "Priority support", included: true },
        { name: "Export reports", included: true },
        { name: "Group study features", included: false }
      ],
      buttonText: "Start Free Trial",
      buttonLink: "/register",
      popular: true
    },
    {
      name: "Team",
      price: isAnnual ? "24.99" : "29.99",
      period: isAnnual ? "month" : "month",
      description: "For study groups",
      features: [
        { name: "Everything in Pro", included: true },
        { name: "Up to 5 team members", included: true },
        { name: "Shared study plans", included: true },
        { name: "Collaborative tasks", included: true },
        { name: "Team analytics", included: true },
        { name: "24/7 priority support", included: true },
        { name: "Admin controls", included: true },
        { name: "Group study features", included: true }
      ],
      buttonText: "Contact Sales",
      buttonLink: "/contact",
      popular: false
    }
  ];

  return (
    <div className="min-h-screen pt-8 pb-12 px-4">
      {/* Hero Section */}
      <section className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
          Simple,{' '}
          <span className="bg-gradient-to-r from-indigo-400 to-purple-400 text-transparent bg-clip-text">
            Transparent Pricing
          </span>
        </h1>
        <p className="text-gray-300 text-lg max-w-3xl mx-auto">
          Choose the perfect plan for your study needs. All plans include a 14-day free trial.
        </p>
      </section>

      {/* Billing Toggle */}
      <div className="flex justify-center items-center gap-4 mb-12">
        <span className={`text-sm ${!isAnnual ? 'text-white' : 'text-gray-400'}`}>Monthly</span>
        <button
          onClick={() => setIsAnnual(!isAnnual)}
          className="relative w-16 h-8 bg-white/10 rounded-full border border-white/10"
        >
          <div className={`absolute top-1 w-6 h-6 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full transition-all duration-300 ${isAnnual ? 'left-9' : 'left-1'}`} />
        </button>
        <span className={`text-sm ${isAnnual ? 'text-white' : 'text-gray-400'}`}>
          Annual <span className="text-indigo-400">(Save 20%)</span>
        </span>
      </div>

      {/* Pricing Cards */}
      <section className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`relative bg-white/5 backdrop-blur-sm border rounded-2xl p-8 transition-all hover:scale-105 ${
                plan.popular 
                  ? 'border-indigo-500 shadow-xl shadow-indigo-500/20' 
                  : 'border-white/10 hover:border-white/20'
              }`}
            >
              {/* Popular Badge */}
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-4 py-1 rounded-full text-sm font-medium">
                    Most Popular
                  </span>
                </div>
              )}

              {/* Plan Name */}
              <h3 className="text-xl font-semibold text-white mb-2">{plan.name}</h3>
              
              {/* Price */}
              <div className="mb-4">
                <span className="text-4xl font-bold text-white">${plan.price}</span>
                <span className="text-gray-400">/{plan.period}</span>
              </div>
              
              {/* Description */}
              <p className="text-gray-400 text-sm mb-6">{plan.description}</p>
              
              {/* Features List */}
              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm">
                    {feature.included ? (
                      <FaCheck className="text-green-400 flex-shrink-0" />
                    ) : (
                      <FaTimes className="text-gray-600 flex-shrink-0" />
                    )}
                    <span className={feature.included ? 'text-gray-300' : 'text-gray-600'}>
                      {feature.name}
                    </span>
                  </li>
                ))}
              </ul>
              
              {/* Button */}
              <Link to={plan.buttonLink}>
                <button className={`w-full py-3 rounded-lg font-medium transition-all ${
                  plan.popular
                    ? 'bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white shadow-lg shadow-indigo-500/25'
                    : 'bg-white/5 hover:bg-white/10 text-white border border-white/10'
                }`}>
                  {plan.buttonText}
                </button>
              </Link>
            </div>
          ))}
        </div>
      </section>

    
    </div>
  );
};

export default Pricing;