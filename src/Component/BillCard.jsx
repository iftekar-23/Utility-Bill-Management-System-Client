import React from "react";
import { motion } from "framer-motion";

const BillCard = ({ bill }) => {
  return (
    <motion.div
      className="border rounded-xl shadow-md p-4 bg-white hover:shadow-xl hover:-translate-y-2 transition-all duration-300"
      whileHover={{ scale: 1.03 }}
    >
      <img
        src={bill.image}
        alt={bill.title}
        className="w-full h-40 object-cover rounded-lg"
      />
      <h2 className="font-semibold text-lg mt-3 text-gray-800">
        {bill.title}
      </h2>
      <p className="text-sm text-blue-600 font-medium mt-1">
        {bill.category}
      </p>
      <p className="text-sm text-gray-500 mt-2 line-clamp-3">
        {bill.description}
      </p>
      <p className="mt-3 font-semibold text-gray-800">
        💰 Amount: ${bill.amount}
      </p>
      <p className="text-xs text-gray-400 mt-1">{bill.date}</p>
    </motion.div>
  );
};

export default BillCard;
