import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaEye, FaEyeSlash, FaCheck, FaTimes } from 'react-icons/fa';
import { useTheme } from '../context/ThemeContext';

const FormInput = ({
  label,
  type = 'text',
  name,
  value,
  onChange,
  onBlur,
  placeholder,
  error,
  success,
  required = false,
  disabled = false,
  icon,
  className = '',
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const { isDark } = useTheme();

  const inputType = type === 'password' && showPassword ? 'text' : type;

  const handleFocus = () => setIsFocused(true);
  const handleBlur = (e) => {
    setIsFocused(false);
    if (onBlur) onBlur(e);
  };

  return (
    <div className={`relative ${className}`}>
      {/* Label */}
      {label && (
        <label
          htmlFor={name}
          className={`block text-sm font-medium mb-2 transition-colors ${
            isDark ? 'text-gray-300' : 'text-gray-700'
          } ${error ? 'text-red-500' : success ? 'text-green-500' : ''}`}
        >
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}

      {/* Input Container */}
      <div className="relative">
        {/* Left Icon */}
        {icon && (
          <div className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${
            isDark ? 'text-gray-400' : 'text-gray-500'
          }`}>
            {icon}
          </div>
        )}

        {/* Input Field */}
        <input
          id={name}
          name={name}
          type={inputType}
          value={value}
          onChange={onChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          placeholder={placeholder}
          disabled={disabled}
          className={`
            form-input
            ${icon ? 'pl-10' : 'pl-4'}
            ${type === 'password' ? 'pr-12' : success || error ? 'pr-10' : 'pr-4'}
            ${error ? 'border-red-500 focus:border-red-500' : ''}
            ${success ? 'border-green-500 focus:border-green-500' : ''}
            ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
            ${isFocused ? 'ring-2 ring-blue-500/20' : ''}
          `}
          {...props}
        />

        {/* Password Toggle */}
        {type === 'password' && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className={`absolute right-3 top-1/2 transform -translate-y-1/2 ${
              isDark ? 'text-gray-400 hover:text-gray-300' : 'text-gray-500 hover:text-gray-700'
            } transition-colors`}
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
        )}

        {/* Success/Error Icons */}
        {(success || error) && type !== 'password' && (
          <div className={`absolute right-3 top-1/2 transform -translate-y-1/2 ${
            error ? 'text-red-500' : 'text-green-500'
          }`}>
            {error ? <FaTimes /> : <FaCheck />}
          </div>
        )}
      </div>

      {/* Error Message */}
      {error && (
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="form-error"
        >
          {error}
        </motion.p>
      )}

      {/* Success Message */}
      {success && !error && (
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="form-success"
        >
          {success}
        </motion.p>
      )}
    </div>
  );
};

export default FormInput;