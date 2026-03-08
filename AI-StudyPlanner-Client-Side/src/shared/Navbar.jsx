import React, { useState } from 'react';
import { Link, NavLink, } from 'react-router-dom';
import LoginModal from '../Authentication/LoginModal';
import RegisterModal from '../Authentication/RegisterModal';
import useAuth from '../hooks/UseAuth';

const Navbar = () => {
  
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);

  
  const { user, logOut } = useAuth();

  const handleLogout = () => {
    console.log('logout');
    logOut()
    .then(() =>{
      alert("logout successfully");
    })
    .catch((error) =>{
      console.log(error);
    })
   
    
    setIsMobileMenuOpen(false);
  };

  // Active link style for desktop
  const activeLinkStyle = ({ isActive }) =>
    isActive
      ? "text-indigo-400 font-medium border-b-2 border-indigo-400 pb-1"
      : "text-gray-300 hover:text-white transition-colors";

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between w-full py-3 sm:py-4 px-4 sm:px-6 md:px-16 lg:px-24 backdrop-blur-md bg-black/30 border-b border-white/10">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-1 sm:gap-2">
          <div className="w-7 h-7 sm:w-8 sm:h-8 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm sm:text-base">📚</span>
          </div>
          <span className="text-white font-semibold text-base sm:text-lg md:text-xl">Study Planner</span>
        </Link>

        {/* Desktop Menu */}


        <div className="hidden md:flex items-center gap-4 lg:gap-8">
           <NavLink to="/" className={activeLinkStyle} end>Home</NavLink>
          {!user ? (
            <>
             
              <NavLink to="/features" className={activeLinkStyle}>Features</NavLink>
              <NavLink to="/pricing" className={activeLinkStyle}>Pricing</NavLink>
              <NavLink to="/about" className={activeLinkStyle}>About</NavLink>
              <NavLink to="/blog" className={activeLinkStyle}>Blog</NavLink>
            </>
          ) : (
            <>
             
              <NavLink to="/dashboard" className={activeLinkStyle}>Dashboard</NavLink>
              <NavLink to="/plans" className={activeLinkStyle}>My Plans</NavLink>
              <NavLink to="/calendar" className={activeLinkStyle}>Calendar</NavLink>
              <NavLink to="/analytics" className={activeLinkStyle}>Analytics</NavLink>
            </>
          )}
        </div>

        {/* Desktop Buttons */}
        <div className="hidden md:flex items-center gap-2 lg:gap-3">
          {user ? (
            <>
              <button
                onClick={handleLogout}
                className="px-3 lg:px-4 py-1.5 lg:py-2 text-sm lg:text-base text-red-400 hover:text-red-300 border border-red-400 rounded-lg transition-all"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => setIsLoginOpen(true)}
                className="px-3 lg:px-5 py-1.5 lg:py-2 text-sm lg:text-base  text-white border-2 border-indigo-500 rounded-lg transition-all">
                Login
              </button>

            </>
          )}


          <button
            onClick={() => setIsRegisterOpen(true)}
            className="px-3 lg:px-5 py-1.5 lg:py-2 text-sm lg:text-base bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white rounded-lg transition-all">
            Register
          </button>

        </div>





        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMobileMenuOpen(true)}
          className="md:hidden text-white p-1.5 sm:p-2"
        >
          <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </nav>

      {/* Mobile Menu Overlay */}
      <div className={`fixed inset-0 z-50 bg-gradient-to-br from-gray-900 via-purple-900 to-indigo-900 backdrop-blur-xl transition-transform duration-300 ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'} md:hidden`}>
        <div className="flex flex-col h-full p-4 sm:p-6">

          {/* Mobile Menu Header */}
          <div className="flex justify-between items-center mb-6 sm:mb-8">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 sm:w-8 sm:h-8 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm sm:text-base">📚</span>
              </div>
              <span className="text-white font-semibold text-base sm:text-lg md:text-xl">Study Planner</span>
            </div>
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="w-8 h-8 sm:w-10 sm:h-10 bg-white/10 hover:bg-white/20 rounded-lg flex items-center justify-center text-white transition-all"
            >
              <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Mobile Menu Links */}
          <div className="flex-1 overflow-y-auto">
            <MobileMenuLink to="/" onClick={() => setIsMobileMenuOpen(false)}>Home</MobileMenuLink>
            {!user ? (
              <div className="space-y-1 sm:space-y-2">
                
                <MobileMenuLink to="/features" onClick={() => setIsMobileMenuOpen(false)}>Features</MobileMenuLink>
                <MobileMenuLink to="/pricing" onClick={() => setIsMobileMenuOpen(false)}>Pricing</MobileMenuLink>
                <MobileMenuLink to="/about" onClick={() => setIsMobileMenuOpen(false)}>About</MobileMenuLink>
                <MobileMenuLink to="/blog" onClick={() => setIsMobileMenuOpen(false)}>Blog</MobileMenuLink>
              </div>
            ) : (
              <div className="space-y-1 sm:space-y-2">
                 
                <MobileMenuLink to="/dashboard" onClick={() => setIsMobileMenuOpen(false)}>Dashboard</MobileMenuLink>
                <MobileMenuLink to="/plans" onClick={() => setIsMobileMenuOpen(false)}>My Plans</MobileMenuLink>
                <MobileMenuLink to="/calendar" onClick={() => setIsMobileMenuOpen(false)}>Calendar</MobileMenuLink>
                <MobileMenuLink to="/analytics" onClick={() => setIsMobileMenuOpen(false)}>Analytics</MobileMenuLink>
              </div>
            )}
          </div>

          {/* Mobile Menu Footer */}
          <div className="mt-auto space-y-2 sm:space-y-3 pt-4 sm:pt-6 border-t border-white/10">
            {user ? (
              <>
              

                <button
                  onClick={handleLogout}
                  className="w-full py-3 sm:py-3.5 bg-red-500/10 bg-red-500 text-red-400 hover:text-red-300 rounded-xl transition-all font-medium border border-red-600 text-sm sm:text-base"
                >
                  Logout
                </button>


              </>
            ) : (
              <>
               <button
                  onClick={() => {
                    setIsLoginOpen(true);
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full py-3 sm:py-3.5 text-white border-2  border-indigo-500 rounded-xl transition-all font-medium text-sm sm:text-base my-3">
                  Login
                </button>

              </>

            )}

            <button
              onClick={() => {
                setIsRegisterOpen(true);
                setIsMobileMenuOpen(false);
              }}
              className="w-full py-3 sm:py-3.5 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white rounded-xl transition-all font-medium shadow-lg shadow-indigo-500/25 text-sm sm:text-base">
              Register
            </button>
          </div>









        </div>
      </div>


      <LoginModal
        isOpen={isLoginOpen}
        onClose={() => setIsLoginOpen(false)}
        onSwitchToRegister={() => {
          setIsLoginOpen(false);
          setIsRegisterOpen(true);
        }}
      />

      <RegisterModal
        isOpen={isRegisterOpen}
        onClose={() => setIsRegisterOpen(false)}
        onSwitchToLogin={() => {
          setIsRegisterOpen(false);
          setIsLoginOpen(true);
        }}
      />







    </>
  );
};

// Mobile Menu Link Component
const MobileMenuLink = ({ to, onClick, children }) => (
  <NavLink
    to={to}
    onClick={onClick}
    className={({ isActive }) =>
      `block text-base sm:text-lg py-2.5 sm:py-3 px-3 sm:px-4 rounded-xl transition-all ${isActive
        ? 'bg-gradient-to-r from-indigo-500/20 to-purple-600/20 text-indigo-400 font-medium border-l-4 border-indigo-400'
        : 'text-gray-300 hover:bg-white/5 hover:text-white'
      }`
    }
  >
    {children}
  </NavLink>
);



export default Navbar;