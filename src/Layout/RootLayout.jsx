import React from 'react';
import { Outlet } from "react-router";
import { Toaster } from "react-hot-toast";
import Navbar from '../Component/Navbar';
import Footer from '../Component/Footer';

const RootLayout = () => {
  return (
    <div>
     
      <Navbar />

    
      <div className="pt-20 pb-10 min-h-screen max-w-7xl mx-auto px-4">
        <Outlet />
      </div>

      <Footer />

      <Toaster />
    </div>
  );
};

export default RootLayout;
