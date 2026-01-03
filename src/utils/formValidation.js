// Form validation utilities
export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePassword = (password) => {
  // At least 8 characters, 1 uppercase, 1 lowercase, 1 number
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]{8,}$/;
  return passwordRegex.test(password);
};

export const validateRequired = (value) => {
  return value && value.toString().trim().length > 0;
};

export const validateMinLength = (value, minLength) => {
  return value && value.toString().trim().length >= minLength;
};

export const validateMaxLength = (value, maxLength) => {
  return value && value.toString().trim().length <= maxLength;
};

export const validatePhone = (phone) => {
  const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
  return phoneRegex.test(phone.replace(/\s/g, ''));
};

export const validateAmount = (amount) => {
  const amountRegex = /^\d+(\.\d{1,2})?$/;
  return amountRegex.test(amount) && parseFloat(amount) > 0;
};

// Form validation messages
export const validationMessages = {
  required: 'This field is required',
  email: 'Please enter a valid email address',
  password: 'Password must be at least 8 characters with uppercase, lowercase, and number',
  passwordMatch: 'Passwords do not match',
  phone: 'Please enter a valid phone number',
  amount: 'Please enter a valid amount',
  minLength: (min) => `Must be at least ${min} characters`,
  maxLength: (max) => `Must be no more than ${max} characters`,
};

// Comprehensive form validator
export const validateForm = (formData, rules) => {
  const errors = {};
  
  Object.keys(rules).forEach(field => {
    const value = formData[field];
    const fieldRules = rules[field];
    
    // Check required
    if (fieldRules.required && !validateRequired(value)) {
      errors[field] = validationMessages.required;
      return;
    }
    
    // Skip other validations if field is empty and not required
    if (!value && !fieldRules.required) return;
    
    // Check email
    if (fieldRules.email && !validateEmail(value)) {
      errors[field] = validationMessages.email;
      return;
    }
    
    // Check password
    if (fieldRules.password && !validatePassword(value)) {
      errors[field] = validationMessages.password;
      return;
    }
    
    // Check password match
    if (fieldRules.passwordMatch && value !== formData[fieldRules.passwordMatch]) {
      errors[field] = validationMessages.passwordMatch;
      return;
    }
    
    // Check phone
    if (fieldRules.phone && !validatePhone(value)) {
      errors[field] = validationMessages.phone;
      return;
    }
    
    // Check amount
    if (fieldRules.amount && !validateAmount(value)) {
      errors[field] = validationMessages.amount;
      return;
    }
    
    // Check min length
    if (fieldRules.minLength && !validateMinLength(value, fieldRules.minLength)) {
      errors[field] = validationMessages.minLength(fieldRules.minLength);
      return;
    }
    
    // Check max length
    if (fieldRules.maxLength && !validateMaxLength(value, fieldRules.maxLength)) {
      errors[field] = validationMessages.maxLength(fieldRules.maxLength);
      return;
    }
  });
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};