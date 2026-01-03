import React, { useState, useEffect, useContext } from 'react';
import { motion } from 'framer-motion';
import { 
  FaCreditCard, 
  FaDollarSign, 
  FaCalendarAlt, 
  FaChartLine,
  FaArrowUp,
  FaArrowDown
} from 'react-icons/fa';
import { AuthContext } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import LoadingSkeleton from '../../Component/LoadingSkeleton';

const DashboardHome = () => {
  const { user } = useContext(AuthContext);
  const { isDark } = useTheme();
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.email) {
      fetchDashboardData();
    }
  }, [user]);

  const fetchDashboardData = async () => {
    try {
      const response = await fetch(`https://ubms-server.vercel.app/dashboard/stats/${user.email}`);
      const data = await response.json();
      setDashboardData(data);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const overviewCards = [
    {
      title: 'Total Payments',
      value: dashboardData?.totalPayments || 0,
      icon: <FaCreditCard className="text-2xl text-blue-600" />,
      change: '+12%',
      changeType: 'increase',
      bgColor: isDark ? 'bg-blue-900/20' : 'bg-blue-50'
    },
    {
      title: 'Total Amount',
      value: `$${dashboardData?.totalAmount?.toFixed(2) || '0.00'}`,
      icon: <FaDollarSign className="text-2xl text-green-600" />,
      change: '+8%',
      changeType: 'increase',
      bgColor: isDark ? 'bg-green-900/20' : 'bg-green-50'
    },
    {
      title: 'This Month',
      value: dashboardData?.monthlyStats?.find(m => m._id === new Date().getMonth() + 1)?.count || 0,
      icon: <FaCalendarAlt className="text-2xl text-purple-600" />,
      change: '+5%',
      changeType: 'increase',
      bgColor: isDark ? 'bg-purple-900/20' : 'bg-purple-50'
    },
    {
      title: 'Growth Rate',
      value: '15.3%',
      icon: <FaChartLine className="text-2xl text-orange-600" />,
      change: '+2.1%',
      changeType: 'increase',
      bgColor: isDark ? 'bg-orange-900/20' : 'bg-orange-50'
    }
  ];

  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <LoadingSkeleton type="card" count={4} />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <LoadingSkeleton type="card" count={2} />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className={`text-2xl font-bold ${isDark ? 'text-gray-100' : 'text-gray-900'}`}>
            Welcome back, {user?.displayName || 'User'}!
          </h1>
          <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            Here's what's happening with your bills today.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button className="btn-secondary text-sm">
            Download Report
          </button>
          <button className="btn-primary text-sm">
            Add Payment
          </button>
        </div>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {overviewCards.map((card, index) => (
          <motion.div
            key={card.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className={`card p-6 ${isDark ? 'bg-gray-800' : 'bg-white'}`}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-sm font-medium ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  {card.title}
                </p>
                <p className={`text-2xl font-bold mt-2 ${isDark ? 'text-gray-100' : 'text-gray-900'}`}>
                  {card.value}
                </p>
                <div className="flex items-center mt-2">
                  {card.changeType === 'increase' ? (
                    <FaArrowUp className="text-green-500 text-sm mr-1" />
                  ) : (
                    <FaArrowDown className="text-red-500 text-sm mr-1" />
                  )}
                  <span className={`text-sm font-medium ${
                    card.changeType === 'increase' ? 'text-green-500' : 'text-red-500'
                  }`}>
                    {card.change}
                  </span>
                  <span className={`text-sm ml-1 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                    vs last month
                  </span>
                </div>
              </div>
              <div className={`p-3 rounded-lg ${card.bgColor}`}>
                {card.icon}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Charts and Tables Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly Payments Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className={`card p-6 ${isDark ? 'bg-gray-800' : 'bg-white'}`}
        >
          <h3 className={`text-lg font-semibold mb-4 ${isDark ? 'text-gray-100' : 'text-gray-900'}`}>
            Monthly Payment Trends
          </h3>
          <div className="h-64 flex items-end justify-between gap-2">
            {monthNames.map((month, index) => {
              const monthData = dashboardData?.monthlyStats?.find(m => m._id === index + 1);
              const height = monthData ? (monthData.amount / Math.max(...(dashboardData?.monthlyStats?.map(m => m.amount) || [1]))) * 200 : 0;
              
              return (
                <div key={month} className="flex flex-col items-center flex-1">
                  <div
                    className="w-full bg-blue-600 rounded-t transition-all duration-500 hover:bg-blue-700"
                    style={{ height: `${height}px`, minHeight: '4px' }}
                    title={`${month}: $${monthData?.amount?.toFixed(2) || '0.00'}`}
                  />
                  <span className={`text-xs mt-2 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                    {month}
                  </span>
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* Category Breakdown */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className={`card p-6 ${isDark ? 'bg-gray-800' : 'bg-white'}`}
        >
          <h3 className={`text-lg font-semibold mb-4 ${isDark ? 'text-gray-100' : 'text-gray-900'}`}>
            Payment Categories
          </h3>
          <div className="space-y-4">
            {dashboardData?.categoryStats?.map((category, index) => {
              const colors = ['bg-blue-600', 'bg-green-600', 'bg-purple-600', 'bg-orange-600'];
              const percentage = (category.amount / dashboardData.totalAmount) * 100;
              
              return (
                <div key={category._id} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-3 h-3 rounded-full ${colors[index % colors.length]}`} />
                    <span className={`font-medium ${isDark ? 'text-gray-200' : 'text-gray-700'}`}>
                      {category._id}
                    </span>
                  </div>
                  <div className="text-right">
                    <p className={`font-semibold ${isDark ? 'text-gray-100' : 'text-gray-900'}`}>
                      ${category.amount.toFixed(2)}
                    </p>
                    <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                      {percentage.toFixed(1)}%
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>
      </div>

      {/* Recent Payments Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        className={`card ${isDark ? 'bg-gray-800' : 'bg-white'}`}
      >
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <h3 className={`text-lg font-semibold ${isDark ? 'text-gray-100' : 'text-gray-900'}`}>
            Recent Payments
          </h3>
        </div>
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
                  Date
                </th>
                <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                  isDark ? 'text-gray-300' : 'text-gray-500'
                }`}>
                  Status
                </th>
              </tr>
            </thead>
            <tbody className={`divide-y ${isDark ? 'divide-gray-700' : 'divide-gray-200'}`}>
              {dashboardData?.recentPayments?.map((payment, index) => (
                <tr key={payment._id} className={isDark ? 'hover:bg-gray-700' : 'hover:bg-gray-50'}>
                  <td className={`px-6 py-4 whitespace-nowrap ${isDark ? 'text-gray-200' : 'text-gray-900'}`}>
                    <div className="font-medium">{payment.billTitle}</div>
                  </td>
                  <td className={`px-6 py-4 whitespace-nowrap ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                    {payment.category}
                  </td>
                  <td className={`px-6 py-4 whitespace-nowrap font-semibold ${isDark ? 'text-gray-200' : 'text-gray-900'}`}>
                    ${payment.amount.toFixed(2)}
                  </td>
                  <td className={`px-6 py-4 whitespace-nowrap ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                    {new Date(payment.date).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                      Completed
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
};

export default DashboardHome;