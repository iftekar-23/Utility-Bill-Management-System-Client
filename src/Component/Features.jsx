import React from 'react';
import { motion } from 'framer-motion';
import { 
  FaShieldAlt, 
  FaMobile, 
  FaCreditCard, 
  FaChartLine, 
  FaBell, 
  FaHeadset 
} from 'react-icons/fa';
import { useTheme } from '../context/ThemeContext';

const Features = () => {
  const { isDark } = useTheme();

  const features = [
    {
      id: 1,
      icon: <FaShieldAlt className="text-4xl text-blue-600" />,
      title: "Bank-Level Security",
      description: "Your financial data is protected with advanced encryption and security protocols."
    },
    {
      id: 2,
      icon: <FaMobile className="text-4xl text-green-600" />,
      title: "Mobile Optimized",
      description: "Access your bills and make payments seamlessly from any device, anywhere."
    },
    {
      id: 3,
      icon: <FaCreditCard className="text-4xl text-purple-600" />,
      title: "Multiple Payment Options",
      description: "Pay with credit cards, debit cards, bank transfers, or digital wallets."
    },
    {
      id: 4,
      icon: <FaChartLine className="text-4xl text-orange-600" />,
      title: "Smart Analytics",
      description: "Track your spending patterns and get insights to manage your bills better."
    },
    {
      id: 5,
      icon: <FaBell className="text-4xl text-red-600" />,
      title: "Smart Reminders",
      description: "Never miss a payment with intelligent notifications and due date alerts."
    },
    {
      id: 6,
      icon: <FaHeadset className="text-4xl text-indigo-600" />,
      title: "24/7 Support",
      description: "Get help whenever you need it with our round-the-clock customer support."
    }
  ];

  return (
    <section className="section-padding" id="features">
      <div className="container-max">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="heading-lg mb-4">Powerful Features</h2>
          <p className={`text-lg ${isDark ? 'text-gray-300' : 'text-gray-600'} max-w-3xl mx-auto`}>
            Discover the comprehensive features that make UBM System the perfect choice for managing your utility bills efficiently and securely.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -8, scale: 1.02 }}
              className={`card p-8 text-center group ${isDark ? 'bg-gray-800' : 'bg-white'}`}
            >
              <motion.div
                whileHover={{ scale: 1.1, rotate: 5 }}
                className="flex justify-center mb-6"
              >
                {feature.icon}
              </motion.div>
              <h3 className={`text-xl font-semibold mb-4 ${isDark ? 'text-gray-200' : 'text-gray-800'}`}>
                {feature.title}
              </h3>
              <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'} leading-relaxed`}>
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;