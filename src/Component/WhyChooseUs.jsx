import React from "react";
import { motion } from "framer-motion";
import { Zap, ShieldCheck, Clock } from "lucide-react";

const WhyChooseUs = () => {
  const features = [
    {
      id: 1,
      icon: <Zap className="text-blue-500 w-12 h-12 mb-3" />,
      title: "Fast & Reliable",
      desc: "Experience lightning-fast payments and bill updates with our optimized system.",
    },
    {
      id: 2,
      icon: <ShieldCheck className="text-blue-500 w-12 h-12 mb-3" />,
      title: "Highly Secure",
      desc: "Your data and transactions are protected with modern JWT-based authentication.",
    },
    {
      id: 3,
      icon: <Clock className="text-blue-500 w-12 h-12 mb-3" />,
      title: "24/7 Access",
      desc: "Manage and pay your bills anytime, from any device — no waiting, no hassle.",
    },
  ];

  return (
    <section className="my-20 bg-gradient-to-r from-blue-50 to-white py-16 rounded-2xl max-w-7xl mx-auto px-4">
      <h2 className="text-center text-3xl md:text-4xl font-bold text-gray-800 mb-12">
        Why Choose UBM System?
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        {features.map((feature) => (
          <motion.div
            key={feature.id}
            whileHover={{ y: -8 }}
            className="bg-white shadow-md p-8 rounded-xl text-center hover:shadow-2xl transition-all"
          >
            <div className="flex justify-center">{feature.icon}</div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">{feature.title}</h3>
            <p className="text-gray-500">{feature.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default WhyChooseUs;
