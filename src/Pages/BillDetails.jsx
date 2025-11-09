import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router";
import { toast } from "react-hot-toast";
import { AuthContext } from "../context/AuthContext";

const BillDetails = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);

  const [bill, setBill] = useState(null);
  const [loading, setLoading] = useState(true);
  const [payDisabled, setPayDisabled] = useState(true);

  useEffect(() => {
    fetch(`http://localhost:4500/bills/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setBill(data);

        // Check if bill's month is current month
        const billDate = new Date(data.date);
        const currentMonth = new Date().getMonth();
        const currentYear = new Date().getFullYear();

        setPayDisabled(!(billDate.getMonth() === currentMonth && billDate.getFullYear() === currentYear));

        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        toast.error("Failed to load bill details");
        setLoading(false);
      });
  }, [id]);

  const handlePay = () => {
    if (!user) {
      toast.error("You must be logged in to pay this bill!");
      return;
    }
    toast.success("Payment successful!");
    // TODO: integrate payment logic
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-gray-500 text-lg">Loading bill details...</p>
      </div>
    );
  }

  if (!bill) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-red-500 text-lg">Bill not found!</p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto my-12 p-6 bg-white shadow-2xl rounded-2xl">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Image Section */}
        <div className="lg:w-1/2 flex justify-center items-center">
          <img
            src={bill.image}
            alt={bill.title}
            className="w-full h-auto max-h-96 object-cover rounded-2xl shadow-lg transition-transform duration-300 hover:scale-105"
          />
        </div>

        {/* Details Section */}
        <div className="lg:w-1/2 flex flex-col justify-between">
          <div>
            <h1 className="text-4xl font-extrabold text-gray-900 mb-4">{bill.title}</h1>
            <p className="text-blue-600 font-semibold text-lg mb-2">{bill.category}</p>
            <p className="text-gray-500 mb-4 text-sm">{bill.location}</p>
            <p className="text-gray-700 leading-relaxed mb-6">{bill.description}</p>

            <div className="flex items-center justify-between mb-4">
              <p className="text-gray-800 font-bold text-xl">💰 Amount: ${bill.amount}</p>
              <p className="text-gray-400 text-sm">Date: {new Date(bill.date).toLocaleDateString()}</p>
            </div>
          </div>

          {/* Pay Button */}
          <button
            disabled={payDisabled}
            onClick={handlePay}
            className={`w-full lg:w-auto px-8 py-3 rounded-2xl font-semibold text-white text-lg transition-all shadow-lg ${
              payDisabled
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700"
            }`}
          >
            {payDisabled ? "Only current month bills can be paid" : "Pay Bill"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default BillDetails;
