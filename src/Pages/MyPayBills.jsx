import React, { useEffect, useState, useContext } from "react";
import { toast } from "react-hot-toast";
import { AuthContext } from "../context/AuthContext";

const MyPayBills = () => {
  const { user } = useContext(AuthContext);

  const [bills, setBills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updateModalOpen, setUpdateModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedBill, setSelectedBill] = useState(null);

  const [formData, setFormData] = useState({
    amount: "",
    address: "",
    phone: "",
    date: "",
  });

  // Fetch bills for logged-in user
  const fetchBills = async () => {
    if (!user) return;
    try {
      const res = await fetch(`http://localhost:4500/payments?email=${user.email}`);
      const data = await res.json();
      setBills(data);
      setLoading(false);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load your bills");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBills();
  }, [user]);

  // Calculate totals
  const totalPaid = bills.length;
  const totalAmount = bills.reduce((acc, bill) => acc + parseFloat(bill.amount), 0);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Open update modal safely
  const openUpdateModal = (bill) => {
    setSelectedBill(bill);
    setFormData({
      amount: bill.amount,
      address: bill.address,
      phone: bill.phone,
      date: bill.date
        ? new Date(bill.date).toISOString().split("T")[0]
        : new Date().toISOString().split("T")[0], // fallback to today
    });
    setUpdateModalOpen(true);
  };

  // Handle bill update
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const updatedData = {
        ...formData,
        amount: parseFloat(formData.amount), // ensure number
      };

      const res = await fetch(`http://localhost:4500/payments/${selectedBill._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedData),
      });

      if (!res.ok) throw new Error("Update failed");

      toast.success("Bill updated successfully");
      setUpdateModalOpen(false);

      // Update local state
      setBills((prev) =>
        prev.map((b) => (b._id === selectedBill._id ? { ...b, ...updatedData } : b))
      );
    } catch (err) {
      console.error(err);
      toast.error("Update failed");
    }
  };

  // Open delete modal
  const openDeleteModal = (bill) => {
    setSelectedBill(bill);
    setDeleteModalOpen(true);
  };

  // Handle bill deletion
  const handleDelete = async () => {
    try {
      const res = await fetch(`http://localhost:4500/payments/${selectedBill._id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Delete failed");

      toast.success("Bill deleted successfully");
      setDeleteModalOpen(false);

      setBills((prev) => prev.filter((b) => b._id !== selectedBill._id));
    } catch (err) {
      console.error(err);
      toast.error("Delete failed");
    }
  };

  // Download CSV
  const handleDownload = () => {
    const headers = ["Username", "Email", "Amount", "Address", "Phone", "Date"];
    const rows = bills.map((b) => [
      b.username,
      b.email,
      b.amount,
      b.address,
      b.phone,
      b.date ? new Date(b.date).toLocaleDateString() : new Date().toLocaleDateString(),
    ]);

    let csvContent =
      "data:text/csv;charset=utf-8," +
      [headers, ...rows].map((e) => e.join(",")).join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "my_bills_report.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-gray-500 text-lg">Loading your bills...</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto my-12 p-6 bg-white shadow-2xl rounded-2xl">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-4 md:mb-0">My Paid Bills</h1>
        <button
          onClick={handleDownload}
          className="px-6 py-3 bg-green-600 text-white rounded-2xl hover:bg-green-700 font-medium"
        >
          Download Report
        </button>
      </div>

      {/* Totals */}
      <div className="mb-6 flex flex-col sm:flex-row gap-4 text-gray-700 font-semibold">
        <p>Total Bills Paid: {totalPaid}</p>
        <p>Total Amount: ৳{totalAmount.toLocaleString()}</p>
      </div>

      {/* Bills Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-200 rounded-xl">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-3 px-4 text-left text-gray-700 font-medium">Username</th>
              <th className="py-3 px-4 text-left text-gray-700 font-medium">Email</th>
              <th className="py-3 px-4 text-left text-gray-700 font-medium">Amount</th>
              <th className="py-3 px-4 text-left text-gray-700 font-medium">Address</th>
              <th className="py-3 px-4 text-left text-gray-700 font-medium">Phone</th>
              <th className="py-3 px-4 text-left text-gray-700 font-medium">Date</th>
              <th className="py-3 px-4 text-left text-gray-700 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {bills.map((bill) => (
              <tr key={bill._id} className="border-t border-gray-200 hover:bg-gray-50 transition">
                <td className="py-3 px-4">{bill.username}</td>
                <td className="py-3 px-4">{bill.email}</td>
                <td className="py-3 px-4">৳{bill.amount}</td>
                <td className="py-3 px-4">{bill.address}</td>
                <td className="py-3 px-4">{bill.phone}</td>
                <td className="py-3 px-4">
                  {bill.date ? new Date(bill.date).toLocaleDateString() : "N/A"}
                </td>
                <td className="py-3 px-4 flex gap-2">
                  <button
                    onClick={() => openUpdateModal(bill)}
                    className="px-3 py-1 bg-blue-600 text-white rounded-xl hover:bg-blue-700"
                  >
                    Update
                  </button>
                  <button
                    onClick={() => openDeleteModal(bill)}
                    className="px-3 py-1 bg-red-600 text-white rounded-xl hover:bg-red-700"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Update Modal */}
      {updateModalOpen && (
        <div className="fixed inset-0 z-50 flex items-end lg:items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-t-3xl lg:rounded-3xl w-full max-w-md lg:max-w-lg p-6 lg:p-8 max-h-[90vh] overflow-y-auto shadow-2xl transform transition-transform duration-300 animate-slideUp">
            <h2 className="text-2xl font-bold mb-6 text-center lg:text-left">Update Bill</h2>
            <form onSubmit={handleUpdate} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Amount</label>
                <input
                  type="number"
                  name="amount"
                  value={formData.amount}
                  onChange={handleInputChange}
                  required
                  className="w-full mt-1 p-3 border rounded-xl"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Address</label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  required
                  className="w-full mt-1 p-3 border rounded-xl"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Phone</label>
                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                  className="w-full mt-1 p-3 border rounded-xl"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Date</label>
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleInputChange}
                  required
                  className="w-full mt-1 p-3 border rounded-xl"
                />
              </div>

              <div className="flex flex-col lg:flex-row justify-end gap-4 mt-4">
                <button
                  type="button"
                  onClick={() => setUpdateModalOpen(false)}
                  className="px-6 py-3 rounded-2xl bg-gray-300 hover:bg-gray-400 font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-3 rounded-2xl bg-blue-600 text-white hover:bg-blue-700 font-medium"
                >
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Modal */}
      {deleteModalOpen && (
        <div className="fixed inset-0 z-50 flex items-end lg:items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-t-3xl lg:rounded-3xl w-full max-w-sm p-6 lg:p-8 shadow-2xl transform transition-transform duration-300 animate-slideUp">
            <h2 className="text-xl font-bold mb-4 text-center">Confirm Delete</h2>
            <p className="text-gray-700 mb-6 text-center">
              Are you sure you want to delete this bill permanently?
            </p>
            <div className="flex justify-center gap-4">
              <button
                onClick={() => setDeleteModalOpen(false)}
                className="px-6 py-3 rounded-2xl bg-gray-300 hover:bg-gray-400 font-medium"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="px-6 py-3 rounded-2xl bg-red-600 text-white hover:bg-red-700 font-medium"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyPayBills;
