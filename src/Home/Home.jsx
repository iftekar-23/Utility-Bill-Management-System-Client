import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Banner from "../Component/Banner";
import HowItWorks from "../Component/HowItWorks";
import WhyChooseUs from "../Component/WhyChooseUs";
import CategorySection from "../Component/CategorySection";
import RecentBills from "../Component/RecentBills";
import Features from "../Component/Features";
import Services from "../Component/Services";
import Statistics from "../Component/Statistics";
import Testimonials from "../Component/Testimonials";
import BlogSection from "../Component/BlogSection";
import FAQ from "../Component/FAQ";
import CallToAction from "../Component/CallToAction";
import Spinner from "../Component/Spinner";
import Newsletter from "../Component/NewsLetter";

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

  if (initialLoading) return <Spinner />; 

  return (
    <motion.div
      className="min-h-screen"
      initial="hidden"
      animate="visible"
      transition={{ staggerChildren: 0.2 }}
    >
      {/* 1. Hero/Banner Section */}
      <motion.section
        variants={sectionVariants}
        transition={{ duration: 0.8 }}
        className="container-max px-4 pt-20 pb-8"
      >
        <Banner />
      </motion.section>

      {/* 2. Category Section */}
      <motion.section
        id="next-section"
        className="section-padding"
        variants={sectionVariants}
        transition={{ duration: 0.8, delay: 0.1 }}
      >
        <div className="container-max">
          <CategorySection />
        </div>
      </motion.section>

      {/* 3. Features Section */}
      <Features />

      {/* 4. Services Section */}
      <Services />

      {/* 5. Recent Bills Section */}
      <motion.section
        variants={sectionVariants}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="section-padding"
      >
        <div className="container-max">
          <RecentBills /> 
        </div>
      </motion.section>

      {/* 6. Statistics Section */}
      <Statistics />

      {/* 7. How It Works Section */}
      <motion.section
        variants={sectionVariants}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="section-padding"
      >
        <div className="container-max">
          <HowItWorks />
        </div>
      </motion.section>

      {/* 8. Why Choose Us Section */}
      <motion.section
        variants={sectionVariants}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="section-padding"
      >
        <div className="container-max">
          <WhyChooseUs />
        </div>
      </motion.section>

      {/* 9. Testimonials Section */}
      <Testimonials />

      {/* 10. Blog Section */}
      <BlogSection />

      {/* 11. FAQ Section */}
      <FAQ />

      {/* 12. Newsletter Section */}
      <Newsletter />

      {/* 13. Call to Action Section */}
      <CallToAction />
    </motion.div>
  );
};

export default Home;
