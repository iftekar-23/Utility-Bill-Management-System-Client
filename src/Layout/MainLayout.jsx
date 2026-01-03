import React from 'react';
import { Outlet } from 'react-router';
import { Toaster } from 'react-hot-toast';
import Navbar from '../Component/Navbar';
import Footer from '../Component/Footer';
import { useTheme } from '../context/ThemeContext';

const MainLayout = () => {
  const { isDark } = useTheme();

  return (
    <div className={`min-h-screen flex flex-col ${isDark ? 'bg-gray-900 text-gray-100' : 'bg-white text-gray-900'}`}>
      {/* Navigation */}
      <Navbar />
      
      {/* Main Content */}
      <main className="flex-1 pt-16">
        <Outlet />
      </main>
      
      {/* Footer */}
      <Footer />
      
      {/* Toast Notifications */}
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: isDark ? '#374151' : '#ffffff',
            color: isDark ? '#f3f4f6' : '#111827',
            border: `1px solid ${isDark ? '#4b5563' : '#e5e7eb'}`,
          },
          success: {
            iconTheme: {
              primary: '#10b981',
              secondary: '#ffffff',
            },
          },
          error: {
            iconTheme: {
              primary: '#ef4444',
              secondary: '#ffffff',
            },
          },
        }}
      />
    </div>
  );
};

export default MainLayout;