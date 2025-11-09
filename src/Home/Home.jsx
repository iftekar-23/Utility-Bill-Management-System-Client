import React, { useEffect, useState } from "react";
import Banner from "../Component/Banner";
import BillCard from "../Component/BillCard";

const Home = () => {
  const [bills, setBills] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4500/bills")
      .then((res) => res.json())
      .then((data) => setBills(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4">
      {/* Banner Section */}
      <Banner />

      {/* Category Section */}
      <section className="my-16">
        <h2 className="text-center text-3xl md:text-4xl font-bold text-gray-800 mb-10 relative inline-block w-full">
          Categories
          <span className="block w-24 h-1 bg-blue-500 mx-auto mt-2 rounded"></span>
        </h2>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {bills.map((bill) => (
            <BillCard key={bill._id} bill={bill} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
