import React from 'react';
import { motion } from 'framer-motion';
import { FaUsers, FaBolt, FaCheckCircle, FaClock } from 'react-icons/fa';
import { useTheme } from '../context/ThemeContext';

const Statistics = () => {
  const { isDark } = useTheme();

  const stats = [
    {
      id: 1,
      icon: <FaUsers className="text-4xl text-blue-600" />,
      number: "50,000+",
      label: "Happy Customers",
      description: "Trusted by thousands"
    },
    {
      id: 2,
      icon: <FaBolt className="text-4xl text-yellow-500" />,
      number: "1M+",
      label: "Bills Processed",
      description: "Seamlessly handled"
    },
    {
      id: 3,
      icon: <FaCheckCircle className="text-4xl text-green-500" />,
      number: "99.9%",
      label: "Success Rate",
      description: "Reliable payments"
    },
    {
      id: 4,
      icon: <FaClock className="text-4xl text-purple-500" />,
      number: "24/7",
      label: "Support Available",
      description: "Always here to help"
    }
  ];

  return (
    <section className={`section-padding ${isDark ? 'bg-gray-800' : 'bg-gradient-to-br from-blue-50 to-indigo-100'}`}>
      <div className="container-max">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="heading-lg mb-4">Our Impact in Numbers</h2>
          <p className={`text-lg ${isDark ? 'text-gray-300' : 'text-gray-600'} max-w-2xl mx-auto`}>
            See how we're making a difference in the lives of our users with reliable bill management solutions.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
              className={`card p-8 text-center ${isDark ? 'bg-gray-700' : 'bg-white'}`}
            >
              <div className="flex justify-center mb-4">
                {stat.icon}
              </div>
              <motion.h3
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 + 0.3 }}
                viewport={{ once: true }}
                className="text-3xl font-bold text-blue-600 mb-2"
              >
                {stat.number}
              </motion.h3>
              <h4 className={`text-xl font-semibold mb-2 ${isDark ? 'text-gray-200' : 'text-gray-800'}`}>
                {stat.label}
              </h4>
              <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                {stat.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Statistics;