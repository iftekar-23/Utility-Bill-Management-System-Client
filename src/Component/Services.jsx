import React from 'react';
import { motion } from 'framer-motion';
import { 
  FaCreditCard, 
  FaCalendarAlt, 
  FaChartBar, 
  FaBell, 
  FaFileDownload, 
  FaShieldAlt,
  FaMobile,
  FaHeadset
} from 'react-icons/fa';
import { useTheme } from '../context/ThemeContext';

const Services = () => {
  const { isDark } = useTheme();

  const services = [
    {
      id: 1,
      icon: <FaCreditCard className="text-4xl text-blue-600" />,
      title: "Instant Payments",
      description: "Pay your bills instantly with multiple payment options including cards, bank transfers, and digital wallets.",
      features: ["Multiple payment methods", "Instant processing", "Secure transactions"]
    },
    {
      id: 2,
      icon: <FaCalendarAlt className="text-4xl text-green-600" />,
      title: "Auto-Pay Setup",
      description: "Never miss a payment again with our intelligent auto-pay system that handles your bills automatically.",
      features: ["Automatic payments", "Smart scheduling", "Payment reminders"]
    },
    {
      id: 3,
      icon: <FaChartBar className="text-4xl text-purple-600" />,
      title: "Expense Analytics",
      description: "Get detailed insights into your spending patterns with comprehensive analytics and reporting tools.",
      features: ["Spending insights", "Monthly reports", "Budget tracking"]
    },
    {
      id: 4,
      icon: <FaBell className="text-4xl text-orange-600" />,
      title: "Smart Notifications",
      description: "Stay informed with intelligent notifications about due dates, payment confirmations, and account updates.",
      features: ["Due date alerts", "Payment confirmations", "Account updates"]
    },
    {
      id: 5,
      icon: <FaFileDownload className="text-4xl text-indigo-600" />,
      title: "Document Management",
      description: "Download receipts, statements, and reports in PDF format for your records and tax purposes.",
      features: ["PDF receipts", "Monthly statements", "Tax documents"]
    },
    {
      id: 6,
      icon: <FaShieldAlt className="text-4xl text-red-600" />,
      title: "Security & Privacy",
      description: "Your data is protected with bank-level encryption and advanced security measures.",
      features: ["Bank-level encryption", "Secure storage", "Privacy protection"]
    },
    {
      id: 7,
      icon: <FaMobile className="text-4xl text-teal-600" />,
      title: "Mobile Optimization",
      description: "Access your account and manage bills seamlessly from any device, anywhere, anytime.",
      features: ["Responsive design", "Mobile app", "Cross-platform sync"]
    },
    {
      id: 8,
      icon: <FaHeadset className="text-4xl text-pink-600" />,
      title: "24/7 Support",
      description: "Get help whenever you need it with our round-the-clock customer support team.",
      features: ["Live chat support", "Phone assistance", "Email support"]
    }
  ];

  return (
    <section className={`section-padding ${isDark ? 'bg-gray-800' : 'bg-gray-50'}`} id="services">
      <div className="container-max">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="heading-lg mb-4">Our Services</h2>
          <p className={`text-lg ${isDark ? 'text-gray-300' : 'text-gray-600'} max-w-3xl mx-auto`}>
            Comprehensive bill management services designed to make your life easier. From instant payments to detailed analytics, we've got you covered.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -8, scale: 1.02 }}
              className={`card p-6 text-center group ${isDark ? 'bg-gray-700' : 'bg-white'}`}
            >
              <motion.div
                whileHover={{ scale: 1.1, rotate: 5 }}
                className="flex justify-center mb-4"
              >
                {service.icon}
              </motion.div>
              
              <h3 className={`text-lg font-semibold mb-3 ${isDark ? 'text-gray-200' : 'text-gray-800'}`}>
                {service.title}
              </h3>
              
              <p className={`text-sm mb-4 leading-relaxed ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                {service.description}
              </p>

              <ul className="space-y-1">
                {service.features.map((feature, idx) => (
                  <li key={idx} className={`text-xs flex items-center gap-2 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                    <div className="w-1 h-1 bg-blue-600 rounded-full"></div>
                    {feature}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <p className={`text-lg mb-6 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
            Ready to experience our comprehensive bill management services?
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="btn-primary"
          >
            Get Started Today
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default Services;