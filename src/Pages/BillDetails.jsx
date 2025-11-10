import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router";
import { toast } from "react-hot-toast";
import { AuthContext } from "../context/AuthContext";
import Spinner from "../Component/Spinner";

const BillDetails = () => {
    const { id } = useParams();
    const { user } = useContext(AuthContext);

    const [bill, setBill] = useState(null);
    const [loading, setLoading] = useState(true);
    const [payDisabled, setPayDisabled] = useState(true);
    const [modalOpen, setModalOpen] = useState(false);

    const [formData, setFormData] = useState({
        email: "",
        billId: "",
        amount: "",
        username: "",
        address: "",
        phone: "",
        additionalInfo: "",
    });

    useEffect(() => {
        fetch(`http://localhost:4500/bills/${id}`)
            .then((res) => res.json())
            .then((data) => {
                setBill(data);

                const billDate = new Date(data.date);
                const currentMonth = new Date().getMonth();
                const currentYear = new Date().getFullYear();
                setPayDisabled(!(billDate.getMonth() === currentMonth && billDate.getFullYear() === currentYear));

                setLoading(false);

                // Pre-fill form fields if user is logged in
                setFormData({
                    email: user?.email || "",
                    billId: data._id,
                    amount: data.amount,
                    username: "",
                    address: "",
                    phone: "",
                    additionalInfo: "",
                });
            })
            .catch((err) => {
                console.error(err);
                toast.error("Failed to load bill details");
                setLoading(false);
            });
    }, [id, user]);

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!user) {
            toast.error("You must be logged in to pay this bill!");
            return;
        }

        try {
            const res = await fetch("http://localhost:4500/payments", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            if (!res.ok) throw new Error("Failed to save payment");

            toast.success("Payment successful!");
            setModalOpen(false);
        } catch (err) {
            console.error(err);
            toast.error("Payment failed!");
        }
    };

    if (loading) {
        return <Spinner></Spinner>
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
                        onClick={() => setModalOpen(true)}
                        className={`w-full lg:w-auto px-8 py-3 rounded-2xl font-semibold text-white text-lg transition-all shadow-lg ${payDisabled
                            ? "bg-gray-400 cursor-not-allowed"
                            : "bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700"
                            }`}
                    >
                        {payDisabled ? "Only current month bills can be paid" : "Pay Bill"}
                    </button>
                </div>
            </div>

            {/* Modal */}
            {modalOpen && (
                <div className="fixed inset-0 z-50 flex items-end lg:items-center justify-center bg-black/50 backdrop-blur-sm">
                    <div className="bg-white rounded-t-3xl lg:rounded-3xl w-full max-w-md lg:max-w-lg p-6 lg:p-8 transform transition-transform duration-300 animate-slideUp max-h-[90vh] overflow-y-auto shadow-2xl">
                        <h2 className="text-2xl font-bold mb-6 text-center lg:text-left">Pay Bill</h2>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            {/* Email */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    readOnly
                                    className="w-full mt-1 p-3 border rounded-xl bg-gray-100"
                                />
                            </div>

                            {/* Bill ID */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Bill ID</label>
                                <input
                                    type="text"
                                    name="billId"
                                    value={formData.billId}
                                    readOnly
                                    className="w-full mt-1 p-3 border rounded-xl bg-gray-100"
                                />
                            </div>

                            {/* Amount */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Amount</label>
                                <input
                                    type="text"
                                    name="amount"
                                    value={formData.amount}
                                    readOnly
                                    className="w-full mt-1 p-3 border rounded-xl bg-gray-100"
                                />
                            </div>

                            {/* Username */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Username</label>
                                <input
                                    type="text"
                                    name="username"
                                    value={formData.username}
                                    onChange={(e) =>
                                        setFormData({ ...formData, username: e.target.value })
                                    }
                                    required
                                    className="w-full mt-1 p-3 border rounded-xl"
                                    placeholder="Enter your name"
                                />
                            </div>

                            {/* Address */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Address</label>
                                <input
                                    type="text"
                                    name="address"
                                    value={formData.address}
                                    onChange={(e) =>
                                        setFormData({ ...formData, address: e.target.value })
                                    }
                                    required
                                    className="w-full mt-1 p-3 border rounded-xl"
                                    placeholder="Enter your address"
                                />
                            </div>

                            {/* Phone */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Phone</label>
                                <input
                                    type="text"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={(e) =>
                                        setFormData({ ...formData, phone: e.target.value })
                                    }
                                    required
                                    className="w-full mt-1 p-3 border rounded-xl"
                                    placeholder="Enter your phone number"
                                />
                            </div>

                            {/* Additional Info */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Additional Info</label>
                                <textarea
                                    name="additionalInfo"
                                    value={formData.additionalInfo}
                                    onChange={(e) =>
                                        setFormData({ ...formData, additionalInfo: e.target.value })
                                    }
                                    className="w-full mt-1 p-3 border rounded-xl"
                                    placeholder="Any additional info"
                                ></textarea>
                            </div>

                            {/* Buttons */}
                            <div className="flex flex-col lg:flex-row justify-end gap-4 mt-4">
                                <button
                                    type="button"
                                    onClick={() => setModalOpen(false)}
                                    className="px-6 py-3 rounded-2xl bg-gray-300 hover:bg-gray-400 font-medium"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-6 py-3 rounded-2xl bg-blue-600 text-white hover:bg-blue-700 font-medium"
                                >
                                    Pay Now
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default BillDetails;
