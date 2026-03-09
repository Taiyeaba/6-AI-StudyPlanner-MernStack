
import { Link } from 'react-router-dom';

import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram, FaGithub, FaEnvelope, FaPhoneAlt } from 'react-icons/fa';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-gradient-to-b from-transparent to-black/80 pt-20 pb-8 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2072&q=80')] bg-cover bg-center opacity-5" />


      <div className="absolute inset-0 bg-gradient-to-b from-indigo-900/20 via-purple-900/20 to-black" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 mb-12">


          <div className="space-y-4 text-center sm:text-left">
            <div className="flex items-center justify-center sm:justify-start gap-2">
              <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/25">
                <span className="text-white text-xl">📚</span>
              </div>
              <span className="text-white font-bold text-2xl">Study Planner</span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed max-w-xs mx-auto sm:mx-0">
              Plan your learning journey, track progress, and achieve your academic goals with our intelligent study planner.
            </p>

            {/* Social Links - রিয়েল আইকন */}
            <div className="flex justify-center sm:justify-start gap-3 pt-4">
              <SocialLink href="#" icon={<FaFacebookF />} label="Facebook" />
              <SocialLink href="#" icon={<FaTwitter />} label="Twitter" />
              <SocialLink href="#" icon={<FaLinkedinIn />} label="LinkedIn" />
              <SocialLink href="#" icon={<FaInstagram />} label="Instagram" />
              <SocialLink href="#" icon={<FaGithub />} label="GitHub" />
            </div>
          </div>


          <div className="space-y-4 text-center sm:text-left">
            <h3 className="text-white font-semibold text-lg">Quick Links</h3>
            <ul className="space-y-3">
              <FooterLink to="/">Home</FooterLink>
              <FooterLink to="/features">Features</FooterLink>
              <FooterLink to="/pricing">Pricing</FooterLink>
              <FooterLink to="/about">About Us</FooterLink>
              <FooterLink to="/blog">Blog</FooterLink>
            </ul>
          </div>


          <div className="space-y-4 text-center sm:text-left">
            <h3 className="text-white font-semibold text-lg">Resources</h3>
            <ul className="space-y-3">
              <FooterLink to="">Help Center</FooterLink>
              <FooterLink to="">Study Guides</FooterLink>
              <FooterLink to="">Plan Templates</FooterLink>
              <FooterLink to="">Community</FooterLink>
              <FooterLink to="">FAQ</FooterLink>
            </ul>
          </div>


          <div className="space-y-4 text-center sm:text-left">
            <h3 className="text-white font-semibold text-lg">Stay Updated</h3>
            <p className="text-gray-400 text-sm">
              Get study tips and updates directly in your inbox.
            </p>


            <div className="space-y-2">
              <div className="flex items-center justify-center sm:justify-start gap-2 text-gray-400">
                <FaEnvelope className="text-indigo-400 flex-shrink-0" />
                <span className="text-sm">support@studyplanner.com</span>
              </div>
              <div className="flex items-center justify-center sm:justify-start gap-2 text-gray-400">
                <FaPhoneAlt className="text-indigo-400 flex-shrink-0" />
                <span className="text-sm">+1 (555) 123-4567</span>
              </div>
            </div>


            <div className="space-y-3 pt-2">
              <div className="relative">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500 transition-colors text-sm"
                />
              </div>
              <button className="w-full px-4 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white rounded-lg font-medium transition-all transform hover:scale-[1.02] shadow-lg shadow-indigo-500/25 text-sm">
                Subscribe
              </button>
            </div>
          </div>
        </div>


        <div className="relative pt-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            {/* Copyright */}
            <div className="text-gray-400 text-sm order-2 md:order-1">
              © {currentYear} Study Planner. All rights reserved.
            </div>


            <div className="flex gap-6 order-1 md:order-2">
              <BottomLink to="">Privacy Policy</BottomLink>
              <BottomLink to="">Terms of Service</BottomLink>
              <BottomLink to="">Cookie Policy</BottomLink>
            </div>


            <div className="text-gray-400 text-sm flex items-center gap-1 order-3">
              <span>Made with</span>
              <span className="text-red-400 animate-pulse">❤️</span>
              <span>by Study Planner Team</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};


const SocialLink = ({ href, icon, label }) => (
  <a
    href={href}
    aria-label={label}
    target="_blank"
    rel="noopener noreferrer"
    className="w-10 h-10 bg-white/5 hover:bg-indigo-600 border border-white/10 rounded-lg flex items-center justify-center text-gray-400 hover:text-white transition-all hover:scale-110"
  >
    <span className="text-lg">{icon}</span>
  </a>
);


const FooterLink = ({ to, children }) => (
  <li>
    <Link
      to={to}
      className="text-gray-400 hover:text-white transition-colors flex items-center justify-center sm:justify-start gap-2 group"
    >
      <span className="w-1 h-1 bg-indigo-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
      {children}
    </Link>
  </li>
);


const BottomLink = ({ to, children }) => (
  <Link
    to={to}
    className="text-gray-400 hover:text-white text-sm transition-colors"
  >
    {children}
  </Link>
);

export default Footer;