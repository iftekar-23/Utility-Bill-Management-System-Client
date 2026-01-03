import React from "react";
import { GiElectric, GiGasPump, GiWaterDrop, GiWifiRouter } from "react-icons/gi";
import { motion } from "framer-motion";
import { useTheme } from "../context/ThemeContext";

const categories = [
  {
    id: 1,
    title: "Electricity",
    icon: <GiElectric className="text-4xl text-yellow-500" />,
    description: "Pay and track your electricity bills effortlessly.",
    color: "from-yellow-400 to-orange-500"
  },
  {
    id: 2,
    title: "Gas",
    icon: <GiGasPump className="text-4xl text-red-500" />,
    description: "Manage your gas bills and stay updated with usage.",
    color: "from-red-400 to-pink-500"
  },
  {
    id: 3,
    title: "Water",
    icon: <GiWaterDrop className="text-4xl text-blue-500" />,
    description: "Track and pay your water bills quickly and securely.",
    color: "from-blue-400 to-cyan-500"
  },
  {
    id: 4,
    title: "Internet",
    icon: <GiWifiRouter className="text-4xl text-green-500" />,
    description: "Pay your internet bills with ease and convenience.",
    color: "from-green-400 to-emerald-500"
  },
];

const CategorySection = () => {
  const { isDark } = useTheme();

  return (
    <section className="my-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="text-center mb-12"
      >
        <h2 className="heading-lg mb-4">Bill Categories</h2>
        <p className={`text-lg ${isDark ? 'text-gray-300' : 'text-gray-600'} max-w-2xl mx-auto`}>
          Manage all your utility bills in one place. Choose from our supported categories and streamline your payment process.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {categories.map((cat, index) => (
          <motion.div
            key={cat.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            viewport={{ once: true }}
            whileHover={{ y: -8, scale: 1.02 }}
            className={`card p-8 text-center group relative overflow-hidden ${isDark ? 'bg-gray-800' : 'bg-white'}`}
          >
            {/* Background Gradient */}
            <div className={`absolute inset-0 bg-gradient-to-br ${cat.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}></div>
            
            <motion.div
              whileHover={{ scale: 1.1, rotate: 5 }}
              className="relative z-10 mb-6"
            >
              {cat.icon}
            </motion.div>
            
            <h3 className={`text-xl font-semibold mb-4 relative z-10 ${isDark ? 'text-gray-200' : 'text-gray-800'}`}>
              {cat.title}
            </h3>
            
            <p className={`relative z-10 leading-relaxed ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              {cat.description}
            </p>

            {/* Hover Effect Border */}
            <div className="absolute inset-0 border-2 border-transparent group-hover:border-blue-500/20 rounded-xl transition-colors duration-300"></div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default CategorySection;
