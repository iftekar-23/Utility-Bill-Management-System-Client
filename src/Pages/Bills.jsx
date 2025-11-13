import React, { useEffect, useState } from "react";
import BillCard from "../Component/BillCard";


const Bills = () => {
  const [bills, setBills] = useState([]);

  useEffect(() => {
    fetch("https://ubms-server.vercel.app/bills")
      .then((res) => res.json())
      .then((data) => setBills(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 my-16">
      <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">All Bills</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {bills.map((bill) => (
          <BillCard key={bill._id} bill={bill} />
        ))}
      </div>
    </div>
  );
};

export default Bills;
