import React from "react";
import { motion } from "framer-motion";
import Banner from "../Component/Banner";
import BillCard from "../Component/BillCard";
import HowItWorks from "../Component/HowItWorks";
import WhyChooseUs from "../Component/WhyChooseUs";
import CategorySection from "../Component/CategorySection";
import RecentBills from "../Component/RecentBills";

const Home = () => {

  const sectionVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      className="max-w-7xl mx-auto px-4"
      initial="hidden"
      animate="visible"
      transition={{ staggerChildren: 0.3 }}
    >
      {/* Banner Section */}
      <motion.div variants={sectionVariants} transition={{ duration: 0.8 }}>
        <Banner />
      </motion.div>

      {/* Category Section */}
      <motion.section
        className="my-16"
        variants={sectionVariants}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <CategorySection />
      </motion.section>

      {/* Recent Bills */}
      <motion.div
        variants={sectionVariants}
        transition={{ duration: 0.8, delay: 0.3 }}
      >
        <RecentBills />
      </motion.div>

      {/* How It Works */}
      <motion.div
        variants={sectionVariants}
        transition={{ duration: 0.8, delay: 0.4 }}
      >
        <HowItWorks />
      </motion.div>

      {/* Why Choose Us */}
      <motion.div
        variants={sectionVariants}
        transition={{ duration: 0.8, delay: 0.5 }}
      >
        <WhyChooseUs />
      </motion.div>
    </motion.div>
  );
};

export default Home;
