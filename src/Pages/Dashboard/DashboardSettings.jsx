import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  FaCog, 
  FaPalette, 
  FaBell, 
  FaShieldAlt, 
  FaDownload,
  FaTrash,
  FaKey,
  FaGlobe
} from 'react-icons/fa';
import { useTheme } from '../../context/ThemeContext';
import toast from 'react-hot-toast';

const DashboardSettings = () => {
  const { isDark, toggleTheme } = useTheme();
  const [settings, setSettings] = useState({
    theme: isDark ? 'dark' : 'light',
    language: 'en',
    currency: 'USD',
    notifications: {
      email: true,
      push: true,
      sms: false,
      marketing: false
    },
    privacy: {
      profileVisible: true,
      dataSharing: false,
      analytics: true
    },
    security: {
      twoFactor: false,
      loginAlerts: true,
      sessionTimeout: 30
    }
  });

  const handleSettingChange = (category, setting, value) => {
    setSettings(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [setting]: value
      }
    }));
    toast.success('Setting updated successfully!');
  };

  const handleSimpleSettingChange = (setting, value) => {
    setSettings(prev => ({
      ...prev,
      [setting]: value
    }));
    
    if (setting === 'theme') {
      toggleTheme();
    }
    
    toast.success('Setting updated successfully!');
  };

  const exportData = () => {
    toast.success('Data export initiated! You will receive an email shortly.');
  };

  const deleteAccount = () => {
    toast.error('Account deletion is not available in demo mode.');
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className={`text-2xl font-bold ${isDark ? 'text-gray-100' : 'text-gray-900'}`}>
            Settings
          </h1>
          <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            Customize your account preferences and security settings
          </p>
        </div>
      </div>

      {/* Appearance Settings */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className={`card p-6 ${isDark ? 'bg-gray-800' : 'bg-white'}`}
      >
        <div className="flex items-center gap-3 mb-6">
          <FaPalette className="text-xl text-purple-600" />
          <h3 className={`text-lg font-semibold ${isDark ? 'text-gray-100' : 'text-gray-900'}`}>
            Appearance
          </h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
              Theme
            </label>
            <select
              value={settings.theme}
              onChange={(e) => handleSimpleSettingChange('theme', e.target.value)}
              className={`form-input ${isDark ? 'bg-gray-700' : 'bg-gray-50'}`}
            >
              <option value="light">Light</option>
              <option value="dark">Dark</option>
              <option value="auto">Auto (System)</option>
            </select>
          </div>
          
          <div>
            <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
              Language
            </label>
            <select
              value={settings.language}
              onChange={(e) => handleSimpleSettingChange('language', e.target.value)}
              className={`form-input ${isDark ? 'bg-gray-700' : 'bg-gray-50'}`}
            >
              <option value="en">English</option>
              <option value="es">Spanish</option>
              <option value="fr">French</option>
              <option value="de">German</option>
            </select>
          </div>
          
          <div>
            <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
              Currency
            </label>
            <select
              value={settings.currency}
              onChange={(e) => handleSimpleSettingChange('currency', e.target.value)}
              className={`form-input ${isDark ? 'bg-gray-700' : 'bg-gray-50'}`}
            >
              <option value="USD">USD ($)</option>
              <option value="EUR">EUR (€)</option>
              <option value="GBP">GBP (£)</option>
              <option value="CAD">CAD (C$)</option>
            </select>
          </div>
        </div>
      </motion.div>

      {/* Notification Settings */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className={`card p-6 ${isDark ? 'bg-gray-800' : 'bg-white'}`}
      >
        <div className="flex items-center gap-3 mb-6">
          <FaBell className="text-xl text-blue-600" />
          <h3 className={`text-lg font-semibold ${isDark ? 'text-gray-100' : 'text-gray-900'}`}>
            Notifications
          </h3>
        </div>
        
        <div className="space-y-4">
          {Object.entries(settings.notifications).map(([key, value]) => (
            <div key={key} className="flex items-center justify-between">
              <div>
                <h4 className={`font-medium ${isDark ? 'text-gray-200' : 'text-gray-800'}`}>
                  {key.charAt(0).toUpperCase() + key.slice(1)} Notifications
                </h4>
                <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  {key === 'email' && 'Receive notifications via email'}
                  {key === 'push' && 'Receive browser push notifications'}
                  {key === 'sms' && 'Receive notifications via SMS'}
                  {key === 'marketing' && 'Receive marketing and promotional emails'}
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={value}
                  onChange={(e) => handleSettingChange('notifications', key, e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
              </label>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Privacy Settings */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className={`card p-6 ${isDark ? 'bg-gray-800' : 'bg-white'}`}
      >
        <div className="flex items-center gap-3 mb-6">
          <FaShieldAlt className="text-xl text-green-600" />
          <h3 className={`text-lg font-semibold ${isDark ? 'text-gray-100' : 'text-gray-900'}`}>
            Privacy & Data
          </h3>
        </div>
        
        <div className="space-y-4">
          {Object.entries(settings.privacy).map(([key, value]) => (
            <div key={key} className="flex items-center justify-between">
              <div>
                <h4 className={`font-medium ${isDark ? 'text-gray-200' : 'text-gray-800'}`}>
                  {key === 'profileVisible' && 'Profile Visibility'}
                  {key === 'dataSharing' && 'Data Sharing'}
                  {key === 'analytics' && 'Usage Analytics'}
                </h4>
                <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  {key === 'profileVisible' && 'Make your profile visible to other users'}
                  {key === 'dataSharing' && 'Share anonymized data for service improvement'}
                  {key === 'analytics' && 'Help us improve by sharing usage analytics'}
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={value}
                  onChange={(e) => handleSettingChange('privacy', key, e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
              </label>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Security Settings */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className={`card p-6 ${isDark ? 'bg-gray-800' : 'bg-white'}`}
      >
        <div className="flex items-center gap-3 mb-6">
          <FaKey className="text-xl text-red-600" />
          <h3 className={`text-lg font-semibold ${isDark ? 'text-gray-100' : 'text-gray-900'}`}>
            Security
          </h3>
        </div>
        
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h4 className={`font-medium ${isDark ? 'text-gray-200' : 'text-gray-800'}`}>
                Two-Factor Authentication
              </h4>
              <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                Add an extra layer of security to your account
              </p>
            </div>
            <button className="btn-secondary text-sm">
              {settings.security.twoFactor ? 'Disable' : 'Enable'} 2FA
            </button>
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <h4 className={`font-medium ${isDark ? 'text-gray-200' : 'text-gray-800'}`}>
                Login Alerts
              </h4>
              <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                Get notified of new login attempts
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={settings.security.loginAlerts}
                onChange={(e) => handleSettingChange('security', 'loginAlerts', e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
            </label>
          </div>
          
          <div>
            <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
              Session Timeout (minutes)
            </label>
            <select
              value={settings.security.sessionTimeout}
              onChange={(e) => handleSettingChange('security', 'sessionTimeout', parseInt(e.target.value))}
              className={`form-input ${isDark ? 'bg-gray-700' : 'bg-gray-50'}`}
            >
              <option value={15}>15 minutes</option>
              <option value={30}>30 minutes</option>
              <option value={60}>1 hour</option>
              <option value={120}>2 hours</option>
            </select>
          </div>
        </div>
      </motion.div>

      {/* Data Management */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className={`card p-6 ${isDark ? 'bg-gray-800' : 'bg-white'}`}
      >
        <div className="flex items-center gap-3 mb-6">
          <FaDownload className="text-xl text-orange-600" />
          <h3 className={`text-lg font-semibold ${isDark ? 'text-gray-100' : 'text-gray-900'}`}>
            Data Management
          </h3>
        </div>
        
        <div className="space-y-4">
          <div className={`p-4 rounded-lg border ${isDark ? 'border-gray-700 bg-gray-700/50' : 'border-gray-200 bg-gray-50'}`}>
            <h4 className={`font-medium mb-2 ${isDark ? 'text-gray-200' : 'text-gray-800'}`}>
              Export Your Data
            </h4>
            <p className={`text-sm mb-3 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              Download a copy of all your data including payments, bills, and profile information.
            </p>
            <button onClick={exportData} className="btn-secondary text-sm flex items-center gap-2">
              <FaDownload />
              Export Data
            </button>
          </div>
          
          <div className={`p-4 rounded-lg border border-red-200 ${isDark ? 'bg-red-900/20' : 'bg-red-50'}`}>
            <h4 className={`font-medium mb-2 ${isDark ? 'text-red-300' : 'text-red-800'}`}>
              Delete Account
            </h4>
            <p className={`text-sm mb-3 ${isDark ? 'text-red-200' : 'text-red-700'}`}>
              Permanently delete your account and all associated data. This action cannot be undone.
            </p>
            <button 
              onClick={deleteAccount}
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2"
            >
              <FaTrash />
              Delete Account
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default DashboardSettings;