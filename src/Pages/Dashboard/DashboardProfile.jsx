import React, { useState, useEffect, useContext } from 'react';
import { motion } from 'framer-motion';
import { 
  FaUser, 
  FaEnvelope, 
  FaPhone, 
  FaMapMarkerAlt, 
  FaEdit, 
  FaSave, 
  FaTimes,
  FaCamera,
  FaShieldAlt,
  FaBell
} from 'react-icons/fa';
import { AuthContext } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import FormInput from '../../Component/FormInput';
import { validateForm } from '../../utils/formValidation';
import toast from 'react-hot-toast';

const DashboardProfile = () => {
  const { user } = useContext(AuthContext);
  const { isDark } = useTheme();
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [profileData, setProfileData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    bio: '',
    notifications: {
      email: true,
      sms: false,
      push: true
    }
  });
  const [formErrors, setFormErrors] = useState({});

  useEffect(() => {
    if (user?.email) {
      fetchProfile();
    }
  }, [user]);

  const fetchProfile = async () => {
    try {
      const response = await fetch(`https://ubms-server.vercel.app/profile/${user.email}`);
      const data = await response.json();
      setProfileData({
        name: data.name || user.displayName || '',
        email: data.email || user.email || '',
        phone: data.phone || '',
        address: data.address || '',
        bio: data.bio || '',
        notifications: data.notifications || {
          email: true,
          sms: false,
          push: true
        }
      });
    } catch (error) {
      console.error('Error fetching profile:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (name.startsWith('notifications.')) {
      const notificationKey = name.split('.')[1];
      setProfileData(prev => ({
        ...prev,
        notifications: {
          ...prev.notifications,
          [notificationKey]: checked
        }
      }));
    } else {
      setProfileData(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value
      }));
    }
    
    // Clear error when user starts typing
    if (formErrors[name]) {
      setFormErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateProfileForm = () => {
    const rules = {
      name: { required: true, minLength: 2 },
      email: { required: true, email: true },
      phone: { phone: true },
      address: { minLength: 5 }
    };

    return validateForm(profileData, rules);
  };

  const handleSave = async () => {
    const validation = validateProfileForm();
    if (!validation.isValid) {
      setFormErrors(validation.errors);
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`https://ubms-server.vercel.app/profile/${user.email}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(profileData)
      });

      if (response.ok) {
        toast.success('Profile updated successfully!');
        setIsEditing(false);
        setFormErrors({});
      } else {
        throw new Error('Failed to update profile');
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      toast.error('Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setFormErrors({});
    fetchProfile(); // Reset to original data
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className={`text-2xl font-bold ${isDark ? 'text-gray-100' : 'text-gray-900'}`}>
            Profile Settings
          </h1>
          <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            Manage your account information and preferences
          </p>
        </div>
        <div className="flex items-center gap-3">
          {isEditing ? (
            <>
              <button
                onClick={handleCancel}
                className="btn-secondary flex items-center gap-2"
                disabled={loading}
              >
                <FaTimes />
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="btn-primary flex items-center gap-2"
                disabled={loading}
              >
                <FaSave />
                {loading ? 'Saving...' : 'Save Changes'}
              </button>
            </>
          ) : (
            <button
              onClick={() => setIsEditing(true)}
              className="btn-primary flex items-center gap-2"
            >
              <FaEdit />
              Edit Profile
            </button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className={`card p-6 text-center ${isDark ? 'bg-gray-800' : 'bg-white'}`}
        >
          <div className="relative inline-block mb-4">
            <img
              src={user?.photoURL || "https://via.placeholder.com/120"}
              alt="Profile"
              className="w-24 h-24 rounded-full object-cover mx-auto"
            />
            {isEditing && (
              <button className="absolute bottom-0 right-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors">
                <FaCamera className="text-sm" />
              </button>
            )}
          </div>
          
          <h3 className={`text-xl font-semibold mb-2 ${isDark ? 'text-gray-100' : 'text-gray-900'}`}>
            {profileData.name || 'User Name'}
          </h3>
          <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'} mb-4`}>
            {profileData.email}
          </p>
          
          <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm ${
            isDark ? 'bg-green-900/20 text-green-400' : 'bg-green-100 text-green-800'
          }`}>
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            Active User
          </div>
        </motion.div>

        {/* Profile Information */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className={`lg:col-span-2 card p-6 ${isDark ? 'bg-gray-800' : 'bg-white'}`}
        >
          <h3 className={`text-lg font-semibold mb-6 ${isDark ? 'text-gray-100' : 'text-gray-900'}`}>
            Personal Information
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormInput
              label="Full Name"
              name="name"
              value={profileData.name}
              onChange={handleInputChange}
              error={formErrors.name}
              disabled={!isEditing}
              icon={<FaUser />}
              required
            />
            
            <FormInput
              label="Email Address"
              name="email"
              type="email"
              value={profileData.email}
              onChange={handleInputChange}
              error={formErrors.email}
              disabled={!isEditing}
              icon={<FaEnvelope />}
              required
            />
            
            <FormInput
              label="Phone Number"
              name="phone"
              value={profileData.phone}
              onChange={handleInputChange}
              error={formErrors.phone}
              disabled={!isEditing}
              icon={<FaPhone />}
              placeholder="+1 (555) 123-4567"
            />
            
            <FormInput
              label="Address"
              name="address"
              value={profileData.address}
              onChange={handleInputChange}
              error={formErrors.address}
              disabled={!isEditing}
              icon={<FaMapMarkerAlt />}
              placeholder="123 Main St, City, State"
            />
          </div>
          
          <div className="mt-6">
            <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
              Bio
            </label>
            <textarea
              name="bio"
              value={profileData.bio}
              onChange={handleInputChange}
              disabled={!isEditing}
              rows={3}
              className={`form-input resize-none ${!isEditing ? 'opacity-60' : ''}`}
              placeholder="Tell us about yourself..."
            />
          </div>
        </motion.div>
      </div>

      {/* Notification Preferences */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className={`card p-6 ${isDark ? 'bg-gray-800' : 'bg-white'}`}
      >
        <div className="flex items-center gap-3 mb-6">
          <FaBell className="text-xl text-blue-600" />
          <h3 className={`text-lg font-semibold ${isDark ? 'text-gray-100' : 'text-gray-900'}`}>
            Notification Preferences
          </h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex items-center justify-between">
            <div>
              <h4 className={`font-medium ${isDark ? 'text-gray-200' : 'text-gray-800'}`}>
                Email Notifications
              </h4>
              <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                Receive updates via email
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                name="notifications.email"
                checked={profileData.notifications.email}
                onChange={handleInputChange}
                disabled={!isEditing}
                className="sr-only peer"
              />
              <div className={`w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600 ${!isEditing ? 'opacity-50' : ''}`}></div>
            </label>
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <h4 className={`font-medium ${isDark ? 'text-gray-200' : 'text-gray-800'}`}>
                SMS Notifications
              </h4>
              <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                Receive updates via SMS
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                name="notifications.sms"
                checked={profileData.notifications.sms}
                onChange={handleInputChange}
                disabled={!isEditing}
                className="sr-only peer"
              />
              <div className={`w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600 ${!isEditing ? 'opacity-50' : ''}`}></div>
            </label>
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <h4 className={`font-medium ${isDark ? 'text-gray-200' : 'text-gray-800'}`}>
                Push Notifications
              </h4>
              <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                Receive browser notifications
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                name="notifications.push"
                checked={profileData.notifications.push}
                onChange={handleInputChange}
                disabled={!isEditing}
                className="sr-only peer"
              />
              <div className={`w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600 ${!isEditing ? 'opacity-50' : ''}`}></div>
            </label>
          </div>
        </div>
      </motion.div>

      {/* Security Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className={`card p-6 ${isDark ? 'bg-gray-800' : 'bg-white'}`}
      >
        <div className="flex items-center gap-3 mb-6">
          <FaShieldAlt className="text-xl text-green-600" />
          <h3 className={`text-lg font-semibold ${isDark ? 'text-gray-100' : 'text-gray-900'}`}>
            Security & Privacy
          </h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className={`p-4 rounded-lg border ${isDark ? 'border-gray-700 bg-gray-700/50' : 'border-gray-200 bg-gray-50'}`}>
            <h4 className={`font-medium mb-2 ${isDark ? 'text-gray-200' : 'text-gray-800'}`}>
              Account Security
            </h4>
            <p className={`text-sm mb-3 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              Last login: {new Date().toLocaleDateString()}
            </p>
            <button className="btn-secondary text-sm">
              Change Password
            </button>
          </div>
          
          <div className={`p-4 rounded-lg border ${isDark ? 'border-gray-700 bg-gray-700/50' : 'border-gray-200 bg-gray-50'}`}>
            <h4 className={`font-medium mb-2 ${isDark ? 'text-gray-200' : 'text-gray-800'}`}>
              Two-Factor Authentication
            </h4>
            <p className={`text-sm mb-3 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              Add an extra layer of security
            </p>
            <button className="btn-secondary text-sm">
              Enable 2FA
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default DashboardProfile;