import React, { useState, useEffect, useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaPlus, 
  FaEdit, 
  FaTrash, 
  FaSearch, 
  FaFilter,
  FaDownload,
  FaEye
} from 'react-icons/fa';
import { AuthContext } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import LoadingSkeleton from '../../Component/LoadingSkeleton';
import FormInput from '../../Component/FormInput';
import { validateForm } from '../../utils/formValidation';
import toast from 'react-hot-toast';
import Swal from 'sweetalert2';

const DashboardPayments = () => {
  const { user } = useContext(AuthContext);
  const { isDark } = useTheme();
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingPayment, setEditingPayment] = useState(null);
  const [formData, setFormData] = useState({
    billTitle: '',
    category: '',
    amount: '',
    date: '',
    location: ''
  });
  const [formErrors, setFormErrors] = useState({});

  const categories = ['Electricity', 'Gas', 'Water', 'Internet'];

  useEffect(() => {
    if (user?.email) {
      fetchPayments();
    }
  }, [user]);

  const fetchPayments = async () => {
    try {
      const response = await fetch(`https://ubms-server.vercel.app/payments?email=${user.email}`);
      const data = await response.json();
      // Ensure data is an array and filter out any invalid entries
      const validPayments = Array.isArray(data) ? data.filter(payment => payment && typeof payment === 'object') : [];
      setPayments(validPayments);
    } catch (error) {
      console.error('Error fetching payments:', error);
      toast.error('Failed to fetch payments');
      setPayments([]); // Set empty array on error
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (formErrors[name]) {
      setFormErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validatePaymentForm = () => {
    const rules = {
      billTitle: { required: true, minLength: 3 },
      category: { required: true },
      amount: { required: true, amount: true },
      date: { required: true },
      location: { required: true, minLength: 3 }
    };

    return validateForm(formData, rules);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const validation = validatePaymentForm();
    if (!validation.isValid) {
      setFormErrors(validation.errors);
      return;
    }

    const paymentData = {
      ...formData,
      email: user.email,
      amount: parseFloat(formData.amount),
      createdAt: new Date().toISOString()
    };

    try {
      let response;
      if (editingPayment) {
        response = await fetch(`https://ubms-server.vercel.app/payments/${editingPayment._id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(paymentData)
        });
      } else {
        response = await fetch('https://ubms-server.vercel.app/payments', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(paymentData)
        });
      }

      if (response.ok) {
        toast.success(editingPayment ? 'Payment updated successfully!' : 'Payment added successfully!');
        setShowModal(false);
        setEditingPayment(null);
        setFormData({ billTitle: '', category: '', amount: '', date: '', location: '' });
        setFormErrors({});
        fetchPayments();
      } else {
        throw new Error('Failed to save payment');
      }
    } catch (error) {
      console.error('Error saving payment:', error);
      toast.error('Failed to save payment');
    }
  };

  const handleEdit = (payment) => {
    setEditingPayment(payment);
    setFormData({
      billTitle: payment.billTitle || '',
      category: payment.category || '',
      amount: payment.amount ? payment.amount.toString() : '',
      date: payment.date || '',
      location: payment.location || ''
    });
    setShowModal(true);
  };

  const handleDelete = async (paymentId) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
      background: isDark ? '#1e293b' : '#ffffff',
      color: isDark ? '#f1f5f9' : '#0f172a'
    });

    if (result.isConfirmed) {
      try {
        const response = await fetch(`https://ubms-server.vercel.app/payments/${paymentId}`, {
          method: 'DELETE'
        });

        if (response.ok) {
          toast.success('Payment deleted successfully!');
          fetchPayments();
        } else {
          throw new Error('Failed to delete payment');
        }
      } catch (error) {
        console.error('Error deleting payment:', error);
        toast.error('Failed to delete payment');
      }
    }
  };

  const filteredPayments = payments.filter(payment => {
    // Safely handle potentially undefined/null properties
    const billTitle = payment.billTitle || '';
    const category = payment.category || '';
    const searchTermSafe = searchTerm || '';
    
    const matchesSearch = billTitle.toLowerCase().includes(searchTermSafe.toLowerCase()) ||
                         category.toLowerCase().includes(searchTermSafe.toLowerCase());
    const matchesCategory = !filterCategory || payment.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  const totalAmount = filteredPayments.reduce((sum, payment) => sum + (payment.amount || 0), 0);

  if (loading) {
    return (
      <div className="space-y-6">
        <LoadingSkeleton type="card" count={1} />
        <LoadingSkeleton type="list" count={5} />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className={`text-2xl font-bold ${isDark ? 'text-gray-100' : 'text-gray-900'}`}>
            My Payments
          </h1>
          <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            Manage your payment records and history
          </p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="btn-primary flex items-center gap-2"
        >
          <FaPlus />
          Add Payment
        </button>
      </div>

      {/* Filters and Search */}
      <div className={`card p-6 ${isDark ? 'bg-gray-800' : 'bg-white'}`}>
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <FaSearch className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${
                isDark ? 'text-gray-400' : 'text-gray-500'
              }`} />
              <input
                type="text"
                placeholder="Search payments..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={`form-input pl-10 ${isDark ? 'bg-gray-700' : 'bg-gray-50'}`}
              />
            </div>
          </div>
          <div className="flex gap-4">
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className={`form-input ${isDark ? 'bg-gray-700' : 'bg-gray-50'}`}
            >
              <option value="">All Categories</option>
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
            <button className="btn-secondary flex items-center gap-2">
              <FaDownload />
              Export
            </button>
          </div>
        </div>
        
        {/* Summary */}
        <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
          <div className="flex justify-between items-center">
            <span className={`${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
              Total: {filteredPayments.length} payments
            </span>
            <span className={`font-semibold ${isDark ? 'text-gray-100' : 'text-gray-900'}`}>
              Amount: ${totalAmount.toFixed(2)}
            </span>
          </div>
        </div>
      </div>

      {/* Payments Table */}
      <div className={`card overflow-hidden ${isDark ? 'bg-gray-800' : 'bg-white'}`}>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className={`${isDark ? 'bg-gray-700' : 'bg-gray-50'}`}>
              <tr>
                <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                  isDark ? 'text-gray-300' : 'text-gray-500'
                }`}>
                  Bill Title
                </th>
                <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                  isDark ? 'text-gray-300' : 'text-gray-500'
                }`}>
                  Category
                </th>
                <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                  isDark ? 'text-gray-300' : 'text-gray-500'
                }`}>
                  Amount
                </th>
                <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                  isDark ? 'text-gray-300' : 'text-gray-500'
                }`}>
                  Location
                </th>
                <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                  isDark ? 'text-gray-300' : 'text-gray-500'
                }`}>
                  Date
                </th>
                <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                  isDark ? 'text-gray-300' : 'text-gray-500'
                }`}>
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className={`divide-y ${isDark ? 'divide-gray-700' : 'divide-gray-200'}`}>
              {filteredPayments.map((payment) => (
                <motion.tr
                  key={payment._id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className={`${isDark ? 'hover:bg-gray-700' : 'hover:bg-gray-50'} transition-colors`}
                >
                  <td className={`px-6 py-4 whitespace-nowrap ${isDark ? 'text-gray-200' : 'text-gray-900'}`}>
                    <div className="font-medium">{payment.billTitle || 'N/A'}</div>
                  </td>
                  <td className={`px-6 py-4 whitespace-nowrap ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                    <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                      {payment.category || 'N/A'}
                    </span>
                  </td>
                  <td className={`px-6 py-4 whitespace-nowrap font-semibold ${isDark ? 'text-gray-200' : 'text-gray-900'}`}>
                    ${(payment.amount || 0).toFixed(2)}
                  </td>
                  <td className={`px-6 py-4 whitespace-nowrap ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                    {payment.location || 'N/A'}
                  </td>
                  <td className={`px-6 py-4 whitespace-nowrap ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                    {payment.date ? new Date(payment.date).toLocaleDateString() : 'N/A'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleEdit(payment)}
                        className="text-blue-600 hover:text-blue-900 p-1 rounded"
                        title="Edit"
                      >
                        <FaEdit />
                      </button>
                      <button
                        onClick={() => handleDelete(payment._id)}
                        className="text-red-600 hover:text-red-900 p-1 rounded"
                        title="Delete"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {filteredPayments.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">💳</div>
            <h3 className={`text-lg font-semibold mb-2 ${isDark ? 'text-gray-200' : 'text-gray-800'}`}>
              No payments found
            </h3>
            <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              {searchTerm || filterCategory ? 'Try adjusting your filters' : 'Add your first payment to get started'}
            </p>
          </div>
        )}
      </div>

      {/* Add/Edit Payment Modal */}
      <AnimatePresence>
        {showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className={`w-full max-w-md rounded-lg shadow-xl ${isDark ? 'bg-gray-800' : 'bg-white'}`}
            >
              <div className="p-6">
                <h3 className={`text-lg font-semibold mb-4 ${isDark ? 'text-gray-100' : 'text-gray-900'}`}>
                  {editingPayment ? 'Edit Payment' : 'Add New Payment'}
                </h3>
                
                <form onSubmit={handleSubmit} className="space-y-4">
                  <FormInput
                    label="Bill Title"
                    name="billTitle"
                    value={formData.billTitle}
                    onChange={handleInputChange}
                    error={formErrors.billTitle}
                    required
                  />
                  
                  <div>
                    <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                      Category <span className="text-red-500">*</span>
                    </label>
                    <select
                      name="category"
                      value={formData.category}
                      onChange={handleInputChange}
                      className={`form-input ${formErrors.category ? 'border-red-500' : ''}`}
                      required
                    >
                      <option value="">Select Category</option>
                      {categories.map(category => (
                        <option key={category} value={category}>{category}</option>
                      ))}
                    </select>
                    {formErrors.category && (
                      <p className="form-error">{formErrors.category}</p>
                    )}
                  </div>
                  
                  <FormInput
                    label="Amount"
                    name="amount"
                    type="number"
                    step="0.01"
                    value={formData.amount}
                    onChange={handleInputChange}
                    error={formErrors.amount}
                    required
                  />
                  
                  <FormInput
                    label="Date"
                    name="date"
                    type="date"
                    value={formData.date}
                    onChange={handleInputChange}
                    error={formErrors.date}
                    required
                  />
                  
                  <FormInput
                    label="Location"
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    error={formErrors.location}
                    required
                  />
                  
                  <div className="flex justify-end gap-3 pt-4">
                    <button
                      type="button"
                      onClick={() => {
                        setShowModal(false);
                        setEditingPayment(null);
                        setFormData({ billTitle: '', category: '', amount: '', date: '', location: '' });
                        setFormErrors({});
                      }}
                      className="btn-secondary"
                    >
                      Cancel
                    </button>
                    <button type="submit" className="btn-primary">
                      {editingPayment ? 'Update' : 'Add'} Payment
                    </button>
                  </div>
                </form>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default DashboardPayments;