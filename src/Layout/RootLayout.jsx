import React from 'react';
import { Outlet } from "react-router";
import { Toaster } from "react-hot-toast";
import Navbar from '../Component/Navbar';
import Footer from '../Component/Footer';

const RootLayout = () => {
  return (
    <div>
      {/* Fixed Navbar */}
      <Navbar />

      {/* Main Content Area */}
      <div className="pt-20 pb-10 min-h-screen max-w-7xl mx-auto px-4">
        <Outlet />
      </div>

      {/* Footer */}
      <Footer />

      {/* Toast Notifications */}
      <Toaster />
    </div>
  );
};

export default RootLayout;
