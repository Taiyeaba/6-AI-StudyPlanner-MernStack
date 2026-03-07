import React, { useState } from 'react';
import { Link } from 'react-router';

const FAQSection = () => {
  const faqs = [
    {
      question: "Is Study Planner really free?",
      answer: "Yes! We offer a free plan that includes up to 3 study plans and basic features. You can upgrade to Pro anytime for unlimited access."
    },
    {
      question: "Can I access my plans offline?",
      answer: "Currently, Study Planner requires an internet connection. However, we're working on offline mode for our mobile apps."
    },
    {
      question: "How do I track my progress?",
      answer: "Our dashboard shows you detailed progress charts, completion rates, and study streaks. You can see daily, weekly, and monthly progress."
    },
    {
      question: "Can I share plans with others?",
      answer: "Yes! Our Team plan allows you to share study plans with up to 5 team members and collaborate on tasks."
    },
    {
      question: "What happens to my data if I cancel?",
      answer: "You can export all your data before canceling. After cancellation, your data will be deleted within 30 days."
    },
    {
      question: "Do you have mobile apps?",
      answer: "We're currently web-based but optimized for mobile browsers. Native iOS and Android apps are coming soon!"
    }
  ];

  const [openIndex, setOpenIndex] = useState(null);

  return (
    <section className="relative py-20 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Frequently Asked{' '}
            <span className="bg-gradient-to-r from-indigo-400 to-purple-400 text-transparent bg-clip-text">
              Questions
            </span>
          </h2>
          <p className="text-gray-400">
            Got questions? We've got answers.
          </p>
        </div>

        {/* FAQ Items */}
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl overflow-hidden"
            >
              {/* Question Button */}
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-white/5 transition-colors"
              >
                <span className="text-white font-medium">{faq.question}</span>
                <span className="text-2xl text-indigo-400">
                  {openIndex === index ? '−' : '+'}
                </span>
              </button>

              {openIndex === index && (
                <div className="px-6 pb-4">
                  <p className="text-gray-400">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>

     
        <div className="text-center mt-12">
          <p className="text-gray-400 mb-4">Still have questions?</p>
          <Link to="">
            <button className="px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-lg transition-all">
              Contact Support
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;