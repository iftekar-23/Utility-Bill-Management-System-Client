import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaEnvelope, FaCheckCircle } from 'react-icons/fa';
import { useTheme } from '../context/ThemeContext';
import toast from 'react-hot-toast';

const Newsletter = () => {
  const { isDark } = useTheme();
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!email) {
      toast.error('Please enter your email address');
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast.error('Please enter a valid email address');
      return;
    }

    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubscribed(true);
      setIsLoading(false);
      toast.success('Successfully subscribed to our newsletter!');
      setEmail('');
    }, 1500);
  };

  return (
    <section className={`section-padding ${isDark ? 'bg-gradient-to-br from-blue-900 to-purple-900' : 'bg-gradient-to-br from-blue-600 to-purple-600'}`}>
      <div className="container-max">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center text-white"
        >
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="inline-flex items-center justify-center w-20 h-20 bg-white/20 rounded-full mb-8"
          >
            <FaEnvelope className="text-3xl" />
          </motion.div>

          <h2 className="heading-lg mb-4">Stay Updated with UBM System</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
            Get the latest updates, tips for managing your bills, and exclusive offers delivered straight to your inbox.
          </p>

          {!isSubscribed ? (
            <motion.form
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
              onSubmit={handleSubmit}
              className="max-w-md mx-auto"
            >
              <div className="flex flex-col sm:flex-row gap-4">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className={`flex-1 px-6 py-4 rounded-lg text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-4 focus:ring-white/30 transition-all ${
                    isLoading ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                  disabled={isLoading}
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  type="submit"
                  disabled={isLoading}
                  className={`px-8 py-4 bg-white text-blue-600 font-semibold rounded-lg hover:bg-gray-100 transition-all shadow-lg ${
                    isLoading ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                >
                  {isLoading ? (
                    <div className="flex items-center gap-2">
                      <div className="w-5 h-5 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                      Subscribing...
                    </div>
                  ) : (
                    'Subscribe'
                  )}
                </motion.button>
              </div>
              
              <p className="text-sm mt-4 opacity-75">
                We respect your privacy. Unsubscribe at any time.
              </p>
            </motion.form>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="max-w-md mx-auto"
            >
              <div className="flex items-center justify-center gap-3 mb-4">
                <FaCheckCircle className="text-3xl text-green-400" />
                <h3 className="text-2xl font-semibold">You're All Set!</h3>
              </div>
              <p className="text-lg opacity-90">
                Thank you for subscribing! You'll receive our latest updates and exclusive content soon.
              </p>
            </motion.div>
          )}

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            viewport={{ once: true }}
            className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 text-center"
          >
            <div>
              <h4 className="text-lg font-semibold mb-2">Weekly Tips</h4>
              <p className="opacity-75">Get expert advice on managing your utility bills efficiently</p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-2">Exclusive Offers</h4>
              <p className="opacity-75">Be the first to know about special promotions and discounts</p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-2">Product Updates</h4>
              <p className="opacity-75">Stay informed about new features and improvements</p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Newsletter;