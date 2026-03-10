

import React, { useEffect, useState } from 'react';
import { Link, NavLink, } from 'react-router-dom';
import LoginModal from '../Authentication/LoginModal';
import RegisterModal from '../Authentication/RegisterModal';
import useAuth from '../hooks/UseAuth';
import Swal from 'sweetalert2';
import useAxiosSecure from '../hooks/useAxiosSecure';

const Navbar = () => {

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);

     const [dbUser, setDbUser] = useState(null);
const axiosSecure = useAxiosSecure();

  const { user, logOut } = useAuth();


  const handleLogout = () => {
    console.log('logout');
    logOut()
      .then(() => {
        Swal.fire({
          icon: 'success',
          title: 'Logged Out Successfully!',
          text: 'You have been logged out',
          timer: 1500,
          showConfirmButton: false
        });
        setIsMobileMenuOpen(false);
      })
      .catch((error) => {
        console.log(error);
        Swal.fire({
          icon: 'error',
          title: 'Logout Failed',
          text: error.message || 'Something went wrong',
          confirmButtonColor: '#6366f1'
        });
      });
  };

   useEffect(() => {
  if (user?.email) {
    axiosSecure.get(`/users/${user.email}`)
      .then(res => {
        setDbUser(res.data);
      });
  }
}, [user, axiosSecure]);



  // Active link style for desktop
  const activeLinkStyle = ({ isActive }) =>
    isActive
      ? "text-indigo-400 font-medium border-b-2 border-indigo-400 pb-1 text-sm lg:text-base"
      : "text-gray-300 hover:text-white transition-colors text-sm lg:text-base";

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between w-full py-4 sm:py-3 md:py-4 px-4 sm:px-4 md:px-8 lg:px-16 xl:px-24 backdrop-blur-md bg-black/30 border-b border-white/10">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 sm:gap-2">
          <div className="w-8 h-8 sm:w-7 sm:h-7 md:w-8 md:h-8 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-base sm:text-sm md:text-base">📚</span>
          </div>
          <span className="text-white font-semibold text-base sm:text-sm md:text-base lg:text-lg xl:text-xl">Study Planner</span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-3 lg:gap-4 xl:gap-6">
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
               <NavLink to="/profile" className={activeLinkStyle}>Profile</NavLink>
            </>
          )}
        </div>

        {/* Desktop Buttons */}
        <div className="hidden md:flex items-center gap-1 lg:gap-2 xl:gap-3">
          {user ? (
            <div className="flex items-center gap-1 lg:gap-2">
              {/* User Info with Hover */}
              <div className="relative group">
                <div className="flex items-center gap-1 lg:gap-2 px-2 lg:px-3 py-1 lg:py-1.5 bg-white/10 rounded-lg cursor-pointer hover:bg-white/15 transition-all">
                  <div className="w-6 h-6 lg:w-7 lg:h-7 xl:w-8 xl:h-8 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center">
                    {user?.photoURL ? (
                      <img
                        src={user.photoURL}
                        alt={user.displayName}
                        className="w-full h-full rounded-full object-cover"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.style.display = 'none';
                          e.target.parentElement.innerHTML = '<span class="text-white text-xs lg:text-sm">👤</span>';
                        }}
                      />
                    ) : (
                      <span className="text-white text-xs lg:text-sm">👤</span>
                    )}
                  </div>
                  <span className="text-white text-xs lg:text-sm max-w-[60px] lg:max-w-[80px] xl:max-w-[100px] truncate">
                    {/* {user?.displayName?.split(' ')[0] || 'User'} */}
                    {dbUser?.name?.split(' ')[0] || 'User'}
                  </span>
                </div>

               
                <div className="absolute left-0 top-full mt-1 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50">
                  <div className="bg-gray-900 text-white text-[10px] lg:text-xs rounded-lg py-1.5 lg:py-2 px-2 lg:px-3 border border-white/10 shadow-xl whitespace-nowrap">
                    {user?.email}
                  </div>
                </div>
              </div>

              {/* Logout Button */}
              <button
                onClick={handleLogout}
                className="px-2 lg:px-3 xl:px-4 py-1 lg:py-1.5 xl:py-2 text-xs lg:text-sm xl:text-base text-red-400 hover:text-red-300 border border-red-400 rounded-lg transition-all whitespace-nowrap"
              >
                Logout
              </button>
            </div>
          ) : (
            <>
              <button
                onClick={() => setIsLoginOpen(true)}
                className="px-2 lg:px-3 xl:px-5 py-1 lg:py-1.5 xl:py-2 text-xs lg:text-sm xl:text-base text-white border-2 border-indigo-500 rounded-lg transition-all whitespace-nowrap">
                Login
              </button>
              <button
                onClick={() => setIsRegisterOpen(true)}
                className="px-2 lg:px-3 xl:px-5 py-1 lg:py-1.5 xl:py-2 text-xs lg:text-sm xl:text-base bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white rounded-lg transition-all whitespace-nowrap">
                Register
              </button>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMobileMenuOpen(true)}
          className="md:hidden text-white p-3 sm:p-1.5"
        >
          <svg className="w-6 h-6 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </nav>

      {/* Mobile Menu Overlay */}
      <div className={`fixed inset-0 z-50 bg-gradient-to-br from-gray-900 via-purple-900 to-indigo-900 backdrop-blur-xl transition-transform duration-300 ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'} md:hidden`}>
        <div className="flex flex-col h-full p-5 sm:p-4 md:p-6">

          {/* Mobile Menu Header */}
          <div className="flex justify-between items-center mb-6 sm:mb-6 md:mb-8">
            <div className="flex items-center gap-2 sm:gap-2">
              <div className="w-10 h-10 sm:w-7 sm:h-7 md:w-8 md:h-8 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl sm:text-sm md:text-base">📚</span>
              </div>
              <span className="text-white font-semibold text-xl sm:text-sm md:text-base lg:text-lg">Study Planner</span>
            </div>
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="w-10 h-10 sm:w-8 sm:h-8 md:w-10 md:h-10 bg-white/10 hover:bg-white/20 rounded-lg flex items-center justify-center text-white transition-all"
            >
              <svg className="w-6 h-6 sm:w-4 sm:h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Mobile Menu Links */}
          <div className="flex-1 overflow-y-auto">
            <MobileMenuLink to="/" onClick={() => setIsMobileMenuOpen(false)}>Home</MobileMenuLink>
            {!user ? (
              <div className="space-y-2 sm:space-y-2">
                <MobileMenuLink to="/features" onClick={() => setIsMobileMenuOpen(false)}>Features</MobileMenuLink>
                <MobileMenuLink to="/pricing" onClick={() => setIsMobileMenuOpen(false)}>Pricing</MobileMenuLink>
                <MobileMenuLink to="/about" onClick={() => setIsMobileMenuOpen(false)}>About</MobileMenuLink>
                <MobileMenuLink to="/blog" onClick={() => setIsMobileMenuOpen(false)}>Blog</MobileMenuLink>
              </div>
            ) : (
              <div className="space-y-2 sm:space-y-2">
                <MobileMenuLink to="/dashboard" onClick={() => setIsMobileMenuOpen(false)}>Dashboard</MobileMenuLink>
                <MobileMenuLink to="/plans" onClick={() => setIsMobileMenuOpen(false)}>My Plans</MobileMenuLink>
                <MobileMenuLink to="/calendar" onClick={() => setIsMobileMenuOpen(false)}>Calendar</MobileMenuLink>
                <MobileMenuLink to="/analytics" onClick={() => setIsMobileMenuOpen(false)}>Analytics</MobileMenuLink>
                    <MobileMenuLink to="/profile" onClick={() => setIsMobileMenuOpen(false)}>Profile</MobileMenuLink>
              </div>
            )}
          </div>

          {/* Mobile Menu Footer */}
          <div className="mt-auto space-y-3 sm:space-y-3 pt-5 sm:pt-4 md:pt-6 border-t border-white/10">
            {user ? (
              <div className="space-y-3 sm:space-y-3">
                {/* User Info Card */}
                <div className="relative group">
                  <div className="flex items-center gap-3 sm:gap-3 p-4 sm:p-3 md:p-4 bg-white/5 rounded-xl border border-white/10 cursor-pointer hover:bg-white/10 transition-all">
                    <div className="w-12 h-12 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
                      {user?.photoURL ? (
                        <img
                          src={user.photoURL}
                          alt={user.displayName}
                          className="w-full h-full rounded-full object-cover"
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.style.display = 'none';
                            e.target.parentElement.innerHTML = '<span class="text-white text-base sm:text-sm md:text-base">👤</span>';
                          }}
                        />
                      ) : (
                        <span className="text-white text-base sm:text-sm md:text-base">👤</span>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-white font-medium text-base sm:text-sm md:text-base truncate">
                        {/* {user?.displayName || 'User'} */}
                        {dbUser?.name?.split(' ')[0] || 'User'}
                      </p>
                      <p className="text-gray-400 text-sm sm:text-xs md:text-sm truncate">
                        {user?.email}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Logout Button */}
                <button
                  onClick={handleLogout}
                  className="w-full py-4 sm:py-2.5 md:py-3.5 bg-red-500/10 hover:bg-red-500/20 text-red-400 hover:text-red-300 rounded-xl transition-all font-medium border border-red-500/30 text-base sm:text-sm md:text-base"
                >
                  Logout
                </button>
              </div>
            ) : (
              <>
                <button
                  onClick={() => {
                    setIsLoginOpen(true);
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full py-4 sm:py-2.5 md:py-3.5 text-white border-2 border-indigo-500 rounded-xl transition-all font-medium text-base sm:text-sm md:text-base my-3 sm:my-3">
                  Login
                </button>
                <button
                  onClick={() => {
                    setIsRegisterOpen(true);
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full py-4 sm:py-2.5 md:py-3.5 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white rounded-xl transition-all font-medium shadow-lg shadow-indigo-500/25 text-base sm:text-sm md:text-base">
                  Register
                </button>
              </>
            )}
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
      `block text-lg sm:text-sm md:text-base lg:text-lg py-3 sm:py-2 md:py-2.5 lg:py-3 px-4 sm:px-3 md:px-4 rounded-xl transition-all ${isActive
        ? 'bg-gradient-to-r from-indigo-500/20 to-purple-600/20 text-indigo-400 font-medium border-l-4 border-indigo-400'
        : 'text-gray-300 hover:bg-white/5 hover:text-white'
      }`
    }
  >
    {children}
  </NavLink>
);

export default Navbar;