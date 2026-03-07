import React from 'react';
import Navbar from '../shared/Navbar';
import { Outlet } from 'react-router-dom';  
import Footer from '../shared/Footer';

const MainLayout = () => {
  return (
    <div className="relative min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-indigo-900">

      {/* Animated Background */}
      <div className="fixed inset-0">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2072&q=80')] bg-cover bg-center opacity-5" />
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/50 via-purple-900/50 to-pink-900/50" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col min-h-screen">
        <Navbar />
        
        
        <main className="flex-1 pt-20">  
          <Outlet />
        </main>
        
        <Footer />
      </div>
    </div>
  );
};

export default MainLayout;