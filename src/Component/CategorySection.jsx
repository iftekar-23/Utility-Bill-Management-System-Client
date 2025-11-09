import React from "react";
import { GiElectric, GiGasPump, GiWaterDrop, GiWifiRouter } from "react-icons/gi";
import { motion } from "framer-motion";

const categories = [
  {
    id: 1,
    title: "Electricity",
    icon: <GiElectric className="text-4xl text-yellow-500" />,
    description: "Pay and track your electricity bills effortlessly.",
  },
  {
    id: 2,
    title: "Gas",
    icon: <GiGasPump className="text-4xl text-red-500" />,
    description: "Manage your gas bills and stay updated with usage.",
  },
  {
    id: 3,
    title: "Water",
    icon: <GiWaterDrop className="text-4xl text-blue-500" />,
    description: "Track and pay your water bills quickly and securely.",
  },
  {
    id: 4,
    title: "Internet",
    icon: <GiWifiRouter className="text-4xl text-green-500" />,
    description: "Pay your internet bills with ease and convenience.",
  },
];

const CategorySection = () => {
  return (
    <section className="my-16 max-w-7xl mx-auto px-4">
      <h2 className="text-center text-3xl md:text-4xl font-bold text-gray-800 mb-10 relative inline-block w-full">
        Categories
        <span className="block w-24 h-1 bg-blue-500 mx-auto mt-2 rounded"></span>
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {categories.map((cat) => (
          <motion.div
            key={cat.id}
            className="border rounded-xl shadow-md p-6 bg-white flex flex-col items-center text-center hover:shadow-xl hover:-translate-y-2 transition-all duration-300"
            whileHover={{ scale: 1.05 }}
          >
            <div className="mb-4">{cat.icon}</div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">{cat.title}</h3>
            <p className="text-gray-500 text-sm">{cat.description}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default CategorySection;
