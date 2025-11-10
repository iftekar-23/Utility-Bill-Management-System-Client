import React, { useEffect, useState } from "react";
import { Link } from "react-router";
import Spinner from "./Spinner";

const RecentBills = () => {
  const [recentBills, setRecentBills] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:4500/recent-bills")
      .then((res) => res.json())
      .then((data) => {
        setRecentBills(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <Spinner></Spinner>;
  }

  return (
    <section className="my-16">
    
      <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">
        Recent Bills
      </h2>

      {recentBills.length === 0 ? (
        <p className="text-center text-gray-500">No recent bills found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
          {recentBills.map((bill) => (
            <div
              key={bill._id}
              className="bg-white border border-gray-100 shadow-md rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-300 flex flex-col"
            >
              {/* Bill Image */}
              <img
                src={bill.image}
                alt={bill.title}
                className="w-full h-48 object-cover"
              />

              {/* Bill Info */}
              <div className="p-5 flex flex-col justify-between flex-grow">
                <div>
                  <h3 className="text-xl font-bold mb-1 text-gray-800">
                    {bill.title}
                  </h3>
                  <p className="text-blue-600 font-medium">{bill.category}</p>
                  <p className="text-gray-600 text-sm">{bill.location}</p>
                  <p className="text-gray-500 text-sm mt-1">
                    Date: {new Date(bill.date).toLocaleDateString()}
                  </p>
                </div>

            
                <Link to={`/bills/${bill._id}`} className="mt-6">
                  <button className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white py-2.5 rounded-xl font-semibold transition-all">
                    See Details
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default RecentBills;
