import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Banner from "../Component/Banner";
import HowItWorks from "../Component/HowItWorks";
import WhyChooseUs from "../Component/WhyChooseUs";
import CategorySection from "../Component/CategorySection";
import RecentBills from "../Component/RecentBills";
import Spinner from "../Component/Spinner";

const Home = () => {
 
  const [initialLoading, setInitialLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setInitialLoading(false), 1000); 
    return () => clearTimeout(timer);
  }, []);


  const sectionVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0 },
  };

  const tooltipVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1 },
  };

  if (initialLoading) return <Spinner />; 

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
        className="relative mb-16"
      >
        <Banner />
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

    
      <motion.section
        variants={sectionVariants}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="mb-16"
      >
        <motion.div
          variants={tooltipVariants}
          transition={{ duration: 0.5, delay: 0.5 }}
          data-tooltip-id="global-tooltip"
          data-tooltip-content="See your most recent bills here"
        >
          <RecentBills /> 
        </motion.div>
      </motion.section>

      {/* How It Works Section */}
      <motion.section
        variants={sectionVariants}
        transition={{ duration: 0.8, delay: 0.4 }}
        data-tooltip-id="global-tooltip"
        data-tooltip-content="Understand how UBM System works"
        className="mb-16"
      >
        <HowItWorks />
      </motion.section>

      {/* Why Choose Us Section */}
      <motion.section
        variants={sectionVariants}
        transition={{ duration: 0.8, delay: 0.5 }}
        data-tooltip-id="global-tooltip"
        data-tooltip-content="Discover why users love UBM System"
        className="mb-16"
      >
        <WhyChooseUs />
      </motion.section>
    </motion.div>
  );
};

export default Home;
