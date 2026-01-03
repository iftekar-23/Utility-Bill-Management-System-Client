import { Link, NavLink, useLocation } from "react-router";
import { useState, useEffect, useContext } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  HiHome, 
  HiDocumentText, 
  HiPlus, 
  HiCreditCard, 
  HiQuestionMarkCircle,
  HiMenu,
  HiX,
  HiSun,
  HiMoon,
  HiBell,
  HiUser,
  HiCog,
  HiLogout
} from "react-icons/hi";
import { MdPayment } from "react-icons/md";
import Swal from "sweetalert2";
import { AuthContext } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";

const NavBar = () => {
  const { user, signOutUser } = useContext(AuthContext);
  const { toggleTheme, isDark } = useTheme();
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close dropdowns when route changes
  useEffect(() => {
    setMobileMenuOpen(false);
    setProfileDropdownOpen(false);
  }, [location.pathname]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileDropdownOpen && !event.target.closest('.profile-dropdown')) {
        setProfileDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [profileDropdownOpen]);

  const navigationItems = [
    { name: "Home", path: "/", icon: HiHome },
    { name: "Bills", path: "/bills", icon: HiDocumentText },
    { name: "New Bill", path: "/add-bill", icon: HiPlus },
    ...(user ? [
      { name: "Payments", path: "/my-pay-bills", icon: HiCreditCard }
    ] : []),
    { name: "Help", path: "/help", icon: HiQuestionMarkCircle }
  ];

  const handleLogout = () => {
    Swal.fire({
      title: "Sign out?",
      text: "You'll need to sign in again to access your account.",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Sign out",
      cancelButtonText: "Cancel",
      background: isDark ? '#0f172a' : '#ffffff',
      color: isDark ? '#f1f5f9' : '#0f172a',
      customClass: {
        popup: 'rounded-lg border-0',
        confirmButton: 'rounded-md font-medium',
        cancelButton: 'rounded-md font-medium'
      }
    }).then((result) => {
      if (result.isConfirmed) {
        signOutUser()
          .then(() => {
            setProfileDropdownOpen(false);
          })
          .catch((err) => {
            console.error('Logout error:', err);
          });
      }
    });
  };

  const isActiveRoute = (path) => {
    if (path === "/") {
      return location.pathname === "/";
    }
    return location.pathname.startsWith(path);
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 ${
          isScrolled 
            ? `${isDark ? 'bg-gray-950/80' : 'bg-white/80'} backdrop-blur-xl border-b ${isDark ? 'border-gray-800' : 'border-gray-200'}` 
            : `${isDark ? 'bg-gray-950/60' : 'bg-white/60'} backdrop-blur-sm`
        }`}
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between h-16">
            
            {/* Logo */}
            <Link 
              to="/" 
              className="flex items-center space-x-2 group"
            >
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center group-hover:bg-blue-700 transition-colors">
                <MdPayment className="w-5 h-5 text-white" />
              </div>
              <span className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-900'} group-hover:text-blue-600 transition-colors`}>
                UBM
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-1">
              {navigationItems.map((item) => {
                const isActive = isActiveRoute(item.path);
                
                return (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    className={`relative px-3 py-2 text-sm font-medium rounded-md transition-all duration-200 ${
                      isActive
                        ? `${isDark ? 'text-white bg-gray-800' : 'text-gray-900 bg-gray-100'}`
                        : `${isDark ? 'text-gray-400 hover:text-white hover:bg-gray-800/50' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100/50'}`
                    }`}
                  >
                    {item.name}
                    {isActive && (
                      <motion.div
                        layoutId="activeTab"
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 rounded-full"
                        initial={false}
                        transition={{ type: "spring", stiffness: 500, damping: 30 }}
                      />
                    )}
                  </NavLink>
                );
              })}
            </div>

            {/* Desktop Actions */}
            <div className="hidden md:flex items-center space-x-2">
              
              {/* Notifications */}
              {user && (
                <button className={`p-2 rounded-md transition-colors ${
                  isDark 
                    ? 'text-gray-400 hover:text-white hover:bg-gray-800' 
                    : 'text-gray-500 hover:text-gray-900 hover:bg-gray-100'
                }`}>
                  <HiBell className="w-5 h-5" />
                </button>
              )}

              {/* Theme Toggle */}
              <button
                onClick={toggleTheme}
                className={`p-2 rounded-md transition-colors ${
                  isDark 
                    ? 'text-gray-400 hover:text-white hover:bg-gray-800' 
                    : 'text-gray-500 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                {isDark ? <HiSun className="w-5 h-5" /> : <HiMoon className="w-5 h-5" />}
              </button>

              {user ? (
                <div className="relative profile-dropdown">
                  <button
                    onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                    className="w-8 h-8 rounded-full overflow-hidden ring-2 ring-transparent hover:ring-gray-300 dark:hover:ring-gray-600 transition-all"
                  >
                    <img
                      src={user.photoURL || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.displayName || user.email)}&background=3b82f6&color=fff`}
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                  </button>

                  {/* Profile Dropdown */}
                  <AnimatePresence>
                    {profileDropdownOpen && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: -10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: -10 }}
                        transition={{ duration: 0.15 }}
                        className={`absolute right-0 top-full mt-2 w-56 rounded-lg shadow-lg border overflow-hidden ${
                          isDark ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'
                        }`}
                      >
                        {/* User Info */}
                        <div className={`px-4 py-3 border-b ${isDark ? 'border-gray-800' : 'border-gray-100'}`}>
                          <div className="flex items-center space-x-3">
                            <img
                              src={user.photoURL || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.displayName || user.email)}&background=3b82f6&color=fff`}
                              alt="Profile"
                              className="w-10 h-10 rounded-full object-cover"
                            />
                            <div className="flex-1 min-w-0">
                              <p className={`text-sm font-medium truncate ${isDark ? 'text-white' : 'text-gray-900'}`}>
                                {user.displayName || 'User'}
                              </p>
                              <p className={`text-xs truncate ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                                {user.email}
                              </p>
                            </div>
                          </div>
                        </div>

                        {/* Menu Items */}
                        <div className="py-1">
                          <Link
                            to="/dashboard"
                            onClick={() => setProfileDropdownOpen(false)}
                            className={`flex items-center px-4 py-2 text-sm transition-colors ${
                              isDark ? 'text-gray-300 hover:bg-gray-800 hover:text-white' : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                            }`}
                          >
                            <HiUser className="w-4 h-4 mr-3" />
                            Dashboard
                          </Link>
                          <Link
                            to="/dashboard/profile"
                            onClick={() => setProfileDropdownOpen(false)}
                            className={`flex items-center px-4 py-2 text-sm transition-colors ${
                              isDark ? 'text-gray-300 hover:bg-gray-800 hover:text-white' : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                            }`}
                          >
                            <HiCog className="w-4 h-4 mr-3" />
                            Profile Settings
                          </Link>
                          <hr className={`my-1 ${isDark ? 'border-gray-800' : 'border-gray-100'}`} />
                          <button
                            onClick={handleLogout}
                            className={`w-full flex items-center px-4 py-2 text-sm transition-colors ${
                              isDark ? 'text-gray-300 hover:bg-red-900/20 hover:text-red-400' : 'text-gray-700 hover:bg-red-50 hover:text-red-600'
                            }`}
                          >
                            <HiLogout className="w-4 h-4 mr-3" />
                            Sign out
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <div className="flex items-center space-x-3">
                  <Link
                    to="/login"
                    className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${
                      isDark 
                        ? 'text-gray-300 hover:text-white hover:bg-gray-800' 
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                    }`}
                  >
                    Sign in
                  </Link>
                  <Link
                    to="/register"
                    className="px-3 py-1.5 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md transition-colors"
                  >
                    Sign up
                  </Link>
                </div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`md:hidden p-2 rounded-md transition-colors ${
                isDark 
                  ? 'text-gray-400 hover:text-white hover:bg-gray-800' 
                  : 'text-gray-500 hover:text-gray-900 hover:bg-gray-100'
              }`}
            >
              {mobileMenuOpen ? <HiX className="w-5 h-5" /> : <HiMenu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className={`fixed top-16 left-0 right-0 z-40 md:hidden border-b overflow-hidden ${
              isDark ? 'bg-gray-950/95 border-gray-800' : 'bg-white/95 border-gray-200'
            } backdrop-blur-xl`}
          >
            <div className="px-6 py-4">
              
              {/* Mobile Navigation */}
              <div className="space-y-1 mb-4">
                {navigationItems.map((item, index) => {
                  const isActive = isActiveRoute(item.path);
                  
                  return (
                    <motion.div
                      key={item.path}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <NavLink
                        to={item.path}
                        className={`flex items-center space-x-3 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                          isActive
                            ? `${isDark ? 'text-white bg-gray-800' : 'text-gray-900 bg-gray-100'}`
                            : `${isDark ? 'text-gray-300 hover:text-white hover:bg-gray-800' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'}`
                        }`}
                      >
                        <item.icon className="w-5 h-5" />
                        <span>{item.name}</span>
                      </NavLink>
                    </motion.div>
                  );
                })}
              </div>

              {/* Mobile Actions */}
              <div className={`pt-4 border-t ${isDark ? 'border-gray-800' : 'border-gray-200'}`}>
                {user ? (
                  <div className="space-y-3">
                    {/* User Info */}
                    <div className={`flex items-center space-x-3 p-3 rounded-lg ${
                      isDark ? 'bg-gray-800' : 'bg-gray-100'
                    }`}>
                      <img
                        src={user.photoURL || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.displayName || user.email)}&background=3b82f6&color=fff`}
                        alt="Profile"
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      <div className="flex-1 min-w-0">
                        <p className={`text-sm font-medium truncate ${isDark ? 'text-white' : 'text-gray-900'}`}>
                          {user.displayName || 'User'}
                        </p>
                        <p className={`text-xs truncate ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                          {user.email}
                        </p>
                      </div>
                      <button
                        onClick={toggleTheme}
                        className={`p-1.5 rounded-md transition-colors ${
                          isDark 
                            ? 'text-gray-400 hover:text-white hover:bg-gray-700' 
                            : 'text-gray-500 hover:text-gray-900 hover:bg-gray-200'
                        }`}
                      >
                        {isDark ? <HiSun className="w-4 h-4" /> : <HiMoon className="w-4 h-4" />}
                      </button>
                    </div>

                    {/* Dashboard Link */}
                    <Link
                      to="/dashboard"
                      className={`flex items-center space-x-3 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                        isDark ? 'text-gray-300 hover:text-white hover:bg-gray-800' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                      }`}
                    >
                      <HiUser className="w-5 h-5" />
                      <span>Dashboard</span>
                    </Link>

                    {/* Sign Out Button */}
                    <button
                      onClick={handleLogout}
                      className={`w-full flex items-center space-x-3 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                        isDark 
                          ? 'text-gray-300 hover:bg-red-900/20 hover:text-red-400' 
                          : 'text-gray-600 hover:bg-red-50 hover:text-red-600'
                      }`}
                    >
                      <HiLogout className="w-5 h-5" />
                      <span>Sign out</span>
                    </button>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <div className="flex items-center justify-between mb-3">
                      <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                        Theme
                      </span>
                      <button
                        onClick={toggleTheme}
                        className={`p-1.5 rounded-md transition-colors ${
                          isDark 
                            ? 'text-gray-400 hover:text-white hover:bg-gray-800' 
                            : 'text-gray-500 hover:text-gray-900 hover:bg-gray-100'
                        }`}
                      >
                        {isDark ? <HiSun className="w-4 h-4" /> : <HiMoon className="w-4 h-4" />}
                      </button>
                    </div>
                    <Link
                      to="/login"
                      className={`w-full flex items-center justify-center px-3 py-2 rounded-md text-sm font-medium transition-colors border ${
                        isDark 
                          ? 'text-gray-300 hover:text-white hover:bg-gray-800 border-gray-700' 
                          : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100 border-gray-300'
                      }`}
                    >
                      Sign in
                    </Link>
                    <Link
                      to="/register"
                      className="w-full flex items-center justify-center px-3 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md transition-colors"
                    >
                      Sign up
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/10 backdrop-blur-sm md:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}
    </>
  );
};

export default NavBar;
