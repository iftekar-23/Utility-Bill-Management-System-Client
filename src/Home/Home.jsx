import React from "react";
import Banner from "../Component/Banner";
import BillCard from "../Component/BillCard";
import HowItWorks from "../Component/HowItWorks";
import WhyChooseUs from "../Component/WhyChooseUs";
import CategorySection from "../Component/CategorySection";

const Home = () => {
 

  return (
    <div className="max-w-7xl mx-auto px-4">
      {/* Banner Section */}
      <Banner />

      {/* Category Section */}
      <section className="my-16">


        <CategorySection></CategorySection>

        <HowItWorks></HowItWorks>

        <WhyChooseUs></WhyChooseUs>
      </section>
    </div>
  );
};

export default Home;
