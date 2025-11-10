import React from "react";
import { motion } from "framer-motion";
import { FaInfoCircle } from "react-icons/fa";
import Banner from "../Component/Banner";
import HowItWorks from "../Component/HowItWorks";
import WhyChooseUs from "../Component/WhyChooseUs";
import CategorySection from "../Component/CategorySection";
import RecentBills from "../Component/RecentBills";

const Home = () => {
  const sectionVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0 },
  };

  const tooltipVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1 },
  };

  return (
    <motion.div
      className="max-w-7xl mx-auto px-4"
      initial="hidden"
      animate="visible"
      transition={{ staggerChildren: 0.3 }}
    >
      {/* Banner Section */}
      <motion.div
        variants={sectionVariants}
        transition={{ duration: 0.8 }}
        className="relative"
      >
        <div className="flex justify-between items-center mb-4">
          <Banner />
        </div>
      </motion.div>

      {/* Category Section */}
      <motion.section
        className="my-16"
        variants={sectionVariants}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <motion.div
          variants={tooltipVariants}
          transition={{ duration: 0.5, delay: 0.4 }}
          data-tooltip-id="global-tooltip"
          data-tooltip-content="Browse through all available bill categories"
        >
          <CategorySection />
        </motion.div>
      </motion.section>

      {/* Recent Bills */}
      <motion.div
        variants={sectionVariants}
        transition={{ duration: 0.8, delay: 0.3 }}
      >
        <motion.div
          variants={tooltipVariants}
          transition={{ duration: 0.5, delay: 0.5 }}
          data-tooltip-id="global-tooltip"
          data-tooltip-content="See your most recent bills here"
        >
          <RecentBills />
        </motion.div>
      </motion.div>

      {/* How It Works */}
      <motion.div
        variants={sectionVariants}
        transition={{ duration: 0.8, delay: 0.4 }}
        data-tooltip-id="global-tooltip"
        data-tooltip-content="Understand how UBM System works"
      >
        <HowItWorks />
      </motion.div>

      {/* Why Choose Us */}
      <motion.div
        variants={sectionVariants}
        transition={{ duration: 0.8, delay: 0.5 }}
        data-tooltip-id="global-tooltip"
        data-tooltip-content="Discover why users love UBM System"
      >
        <WhyChooseUs />
      </motion.div>
    </motion.div>
  );
};

export default Home;
