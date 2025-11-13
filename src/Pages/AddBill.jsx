import { useState } from "react";
import Swal from "sweetalert2";

const AddBill = () => {
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    email: "",
    amount: "",
    location: "",
    description: "",
    image: "",
    date: "",
  });

  // handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.title ||
      !formData.category ||
      !formData.amount ||
      !formData.location ||
      !formData.description ||
      !formData.image ||
      !formData.date
    ) {
      Swal.fire("Error!", "Please fill in all fields.", "error");
      return;
    }

    try {
      const response = await fetch("https://ubms-server.vercel.app/bills", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          amount: parseFloat(formData.amount),
        }),
      });

      const data = await response.json();

      if (data.insertedId) {
        Swal.fire("Success!", "Bill added successfully!", "success");
        setFormData({
          title: "",
          category: "",
          email: "",
          amount: "",
          location: "",
          description: "",
          image: "",
          date: "",
        });
      } else {
        Swal.fire("Added!", "Bill added successfully.", "success");
      }
    } catch (err) {
      console.error(err);
      Swal.fire("Error!", "Failed to add bill.", "error");
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-24 mb-10 p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold text-blue-600 mb-6 text-center">
        Add a New Bill
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Title */}
        <div>
          <label className="block text-gray-700 mb-1">Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md p-2"
            placeholder="Enter bill title"
          />
        </div>

        {/* Category */}
        <div>
          <label className="block text-gray-700 mb-1">Category</label>
          <input
            type="text"
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md p-2"
            placeholder="e.g. Water, Road, Electricity"
          />
        </div>

        {/* Email */}
        <div>
          <label className="block text-gray-700 mb-1">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md p-2"
            placeholder="Enter your email"
          />
        </div>

        {/* Location */}
        <div>
          <label className="block text-gray-700 mb-1">Location</label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md p-2"
            placeholder="Enter location"
          />
        </div>

        {/* Amount */}
        <div>
          <label className="block text-gray-700 mb-1">Amount (৳)</label>
          <input
            type="number"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md p-2"
            placeholder="Enter amount"
          />
        </div>

        {/* Date */}
        <div>
          <label className="block text-gray-700 mb-1">Date</label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md p-2"
          />
        </div>

        {/* Image */}
        <div>
          <label className="block text-gray-700 mb-1">Image URL</label>
          <input
            type="text"
            name="image"
            value={formData.image}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md p-2"
            placeholder="Paste image URL"
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-gray-700 mb-1">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md p-2"
            rows="4"
            placeholder="Write details about the issue"
          ></textarea>
        </div>

        <button
          type="submit"
          className="bg-blue-600 w-full text-white py-2 rounded-md font-medium hover:bg-blue-700 transition"
        >
          Add Bill
        </button>
      </form>
    </div>
  );
};

export default AddBill;
