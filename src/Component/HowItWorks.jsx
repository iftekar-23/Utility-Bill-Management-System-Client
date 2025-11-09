import React from "react";
import { motion } from "framer-motion";
import { ShieldCheck, CreditCard, Clock } from "lucide-react";

const HowItWorks = () => {
  const steps = [
    {
      id: 1,
      icon: <ShieldCheck className="mx-auto text-blue-500 w-10 h-10 mb-3" />,
      title: "Register or Login",
      desc: "Create your account securely and access your dashboard instantly.",
    },
    {
      id: 2,
      icon: <CreditCard className="mx-auto text-blue-500 w-10 h-10 mb-3" />,
      title: "Add Your Bills",
      desc: "Add electricity, water, gas, or internet bills easily from your profile.",
    },
    {
      id: 3,
      icon: <Clock className="mx-auto text-blue-500 w-10 h-10 mb-3" />,
      title: "Pay & Track",
      desc: "Pay instantly and track your transaction history anytime, anywhere.",
    },
  ];

  return (
    <section className="my-20 max-w-7xl mx-auto px-4">
      <h2 className="text-center text-3xl md:text-4xl font-bold text-gray-800 mb-12">
        How It Works
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
        {steps.map((step) => (
          <motion.div
            key={step.id}
            whileHover={{ scale: 1.05 }}
            className="p-6 bg-white shadow-lg rounded-xl hover:shadow-2xl transition-all duration-300"
          >
            {step.icon}
            <h3 className="text-xl font-semibold text-gray-800 mb-2">{step.title}</h3>
            <p className="text-gray-500">{step.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default HowItWorks;
