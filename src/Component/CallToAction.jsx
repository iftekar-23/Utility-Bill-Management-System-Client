import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router';
import { FaRocket, FaArrowRight, FaDownload } from 'react-icons/fa';
import { useTheme } from '../context/ThemeContext';

const CallToAction = () => {
  const { isDark } = useTheme();

  return (
    <section className={`section-padding ${isDark ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <div className="container-max">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-full mb-6"
            >
              <FaRocket className="text-2xl text-white" />
            </motion.div>

            <h2 className="heading-lg mb-6">
              Ready to Simplify Your Bill Management?
            </h2>
            
            <p className={`text-lg mb-8 leading-relaxed ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
              Join thousands of satisfied customers who have streamlined their utility bill payments with UBM System. 
              Start managing your bills more efficiently today with our secure, user-friendly platform.
            </p>

            <div className="space-y-4 mb-8">
              {[
                "Set up your account in under 2 minutes",
                "Connect all your utility providers instantly",
                "Never miss a payment with smart reminders",
                "Track your spending with detailed analytics"
              ].map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                  viewport={{ once: true }}
                  className="flex items-center gap-3"
                >
                  <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                  <span className={isDark ? 'text-gray-300' : 'text-gray-700'}>{benefit}</span>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              viewport={{ once: true }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Link to="/register">
                <motion.button
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="btn-primary flex items-center gap-2 text-lg px-8 py-4"
                >
                  Get Started Free
                  <FaArrowRight />
                </motion.button>
              </Link>
              
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="btn-secondary flex items-center gap-2 text-lg px-8 py-4"
              >
                <FaDownload />
                Download Brochure
              </motion.button>
            </motion.div>
          </motion.div>

          {/* Right Content - Visual Element */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className={`card p-8 ${isDark ? 'bg-gray-800' : 'bg-white'}`}>
              <div className="text-center mb-6">
                <h3 className={`text-2xl font-bold mb-2 ${isDark ? 'text-gray-200' : 'text-gray-800'}`}>
                  Start Your Journey Today
                </h3>
                <p className={isDark ? 'text-gray-400' : 'text-gray-600'}>
                  Join the UBM System community
                </p>
              </div>

              <div className="space-y-4">
                <div className={`p-4 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-blue-50'}`}>
                  <div className="flex items-center justify-between">
                    <span className={`font-semibold ${isDark ? 'text-gray-200' : 'text-gray-800'}`}>
                      Free Account Setup
                    </span>
                    <span className="text-green-500 font-bold">$0</span>
                  </div>
                </div>
                
                <div className={`p-4 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-blue-50'}`}>
                  <div className="flex items-center justify-between">
                    <span className={`font-semibold ${isDark ? 'text-gray-200' : 'text-gray-800'}`}>
                      Basic Bill Management
                    </span>
                    <span className="text-green-500 font-bold">Free</span>
                  </div>
                </div>
                
                <div className={`p-4 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-blue-50'}`}>
                  <div className="flex items-center justify-between">
                    <span className={`font-semibold ${isDark ? 'text-gray-200' : 'text-gray-800'}`}>
                      24/7 Customer Support
                    </span>
                    <span className="text-green-500 font-bold">Included</span>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-600">
                <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
                  <span>🔒</span>
                  <span>Bank-level security guaranteed</span>
                </div>
              </div>
            </div>

            {/* Floating Elements */}
            <motion.div
              animate={{ y: [-10, 10, -10] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="absolute -top-4 -right-4 w-20 h-20 bg-blue-600 rounded-full opacity-20"
            />
            <motion.div
              animate={{ y: [10, -10, 10] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="absolute -bottom-4 -left-4 w-16 h-16 bg-purple-600 rounded-full opacity-20"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;