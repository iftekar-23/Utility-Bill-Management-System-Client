import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router";

const BillCard = ({ bill }) => {
  return (
    <motion.div
      className="border rounded-xl shadow-md p-4 bg-white flex flex-col justify-between hover:shadow-xl hover:-translate-y-2 transition-all duration-300"
      whileHover={{ scale: 1.03 }}
    >
      <img
        src={bill.image}
        alt={bill.title}
        className="w-full h-40 object-cover rounded-lg mb-3"
      />
      <div>
        <h2 className="font-semibold text-lg text-gray-800">{bill.title}</h2>
        <p className="text-sm text-blue-600 font-medium">{bill.category}</p>
        <p className="text-sm text-gray-500 mt-1">{bill.location}</p>
        <p className="mt-2 font-semibold text-gray-800">💰 Amount: ${bill.amount}</p>
      </div>
      <Link
        to={`/bills/${bill._id}`}
        className="mt-3 btn-primary py-2 rounded-lg text-center w-full inline-block text-white font-medium hover:shadow-md transition"
      >
        See Details
      </Link>
    </motion.div>
  );
};

export default BillCard;
