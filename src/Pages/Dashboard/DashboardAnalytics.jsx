// import React, { useState, useEffect, useContext } from 'react';
// import { motion } from 'framer-motion';
// import { 
//   FaChartLine, 
//   FaChartPie, 
//   FaChartBar,
//   FaCalendarAlt,
//   FaDownload,
//   FaFilter
// } from 'react-icons/fa';
// import { AuthContext } from '../../context/AuthContext';
// import { useTheme } from '../../context/ThemeContext';
// import LoadingSkeleton from '../../Component/LoadingSkeleton';

// const DashboardAnalytics = () => {
//   const { user } = useContext(AuthContext);
//   const { isDark } = useTheme();
//   const [analyticsData, setAnalyticsData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [timeRange, setTimeRange] = useState('6months');

//   useEffect(() => {
//     if (user?.email) {
//       fetchAnalyticsData();
//     }
//   }, [user, timeRange]);

//   const fetchAnalyticsData = async () => {
//     try {
//       const response = await fetch(`https://ubms-server.vercel.app/dashboard/stats/${user.email}`);
//       const data = await response.json();
//       setAnalyticsData(data);
//     } catch (error) {
//       console.error('Error fetching analytics data:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
//   const categoryColors = ['#3b82f6', '#10b981', '#8b5cf6', '#f59e0b', '#ef4444', '#06b6d4'];

//   if (loading) {
//     return (
//       <div className="space-y-6">
//         <LoadingSkeleton type="card" count={3} />
//       </div>
//     );
//   }

//   return (
//     <div className="space-y-6">
//       {/* Page Header */}
//       <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
//         <div>
//           <h1 className={`text-2xl font-bold ${isDark ? 'text-gray-100' : 'text-gray-900'}`}>
//             Analytics Dashboard
//           </h1>
//           <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
//             Detailed insights into your payment patterns and spending habits
//           </p>
//         </div>
//         <div className="flex items-center gap-3">
//           <select
//             value={timeRange}
//             onChange={(e) => setTimeRange(e.target.value)}
//             className={`form-input ${isDark ? 'bg-gray-700' : 'bg-gray-50'}`}
//           >
//             <option value="3months">Last 3 Months</option>
//             <option value="6months">Last 6 Months</option>
//             <option value="1year">Last Year</option>
//           </select>
//           <button className="btn-secondary flex items-center gap-2">
//             <FaDownload />
//             Export
//           </button>
//         </div>
//       </div>

//       {/* Summary Cards */}
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           className={`card p-6 ${isDark ? 'bg-gray-800' : 'bg-white'}`}
//         >
//           <div className="flex items-center justify-between">
//             <div>
//               <p className={`text-sm font-medium ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
//                 Average Monthly Spend
//               </p>
//               <p className={`text-2xl font-bold mt-2 ${isDark ? 'text-gray-100' : 'text-gray-900'}`}>
//                 ${analyticsData?.totalAmount ? (analyticsData.totalAmount / 12).toFixed(2) : '0.00'}
//               </p>
//             </div>
//             <div className="p-3 rounded-lg bg-blue-100 dark:bg-blue-900/20">
//               <FaChartLine className="text-2xl text-blue-600" />
//             </div>
//           </div>
//         </motion.div>

//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ delay: 0.1 }}
//           className={`card p-6 ${isDark ? 'bg-gray-800' : 'bg-white'}`}
//         >
//           <div className="flex items-center justify-between">
//             <div>
//               <p className={`text-sm font-medium ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
//                 Most Expensive Category
//               </p>
//               <p className={`text-2xl font-bold mt-2 ${isDark ? 'text-gray-100' : 'text-gray-900'}`}>
//                 {analyticsData?.categoryStats?.[0]?._id || 'N/A'}
//               </p>
//             </div>
//             <div className="p-3 rounded-lg bg-green-100 dark:bg-green-900/20">
//               <FaChartPie className="text-2xl text-green-600" />
//             </div>
//           </div>
//         </motion.div>

//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ delay: 0.2 }}
//           className={`card p-6 ${isDark ? 'bg-gray-800' : 'bg-white'}`}
//         >
//           <div className="flex items-center justify-between">
//             <div>
//               <p className={`text-sm font-medium ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
//                 Payment Frequency
//               </p>
//               <p className={`text-2xl font-bold mt-2 ${isDark ? 'text-gray-100' : 'text-gray-900'}`}>
//                 {analyticsData?.totalPayments ? Math.round(analyticsData.totalPayments / 12) : 0}/month
//               </p>
//             </div>
//             <div className="p-3 rounded-lg bg-purple-100 dark:bg-purple-900/20">
//               <FaChartBar className="text-2xl text-purple-600" />
//             </div>
//           </div>
//         </motion.div>
//       </div>

//       {/* Charts Row */}
//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//         {/* Monthly Trend Chart */}
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ delay: 0.3 }}
//           className={`card p-6 ${isDark ? 'bg-gray-800' : 'bg-white'}`}
//         >
//           <div className="flex items-center justify-between mb-6">
//             <h3 className={`text-lg font-semibold ${isDark ? 'text-gray-100' : 'text-gray-900'}`}>
//               Monthly Spending Trend
//             </h3>
//             <FaChartLine className="text-blue-600" />
//           </div>
          
//           <div className="h-64">
//             <div className="flex items-end justify-between h-full gap-2">
//               {monthNames.slice(0, 6).map((month, index) => {
//                 const monthData = analyticsData?.monthlyStats?.find(m => m._id === index + 1);
//                 const maxAmount = Math.max(...(analyticsData?.monthlyStats?.map(m => m.amount) || [1]));
//                 const height = monthData ? (monthData.amount / maxAmount) * 200 : 0;
                
//                 return (
//                   <div key={month} className="flex flex-col items-center flex-1">
//                     <div className="relative group">
//                       <div
//                         className="w-full bg-gradient-to-t from-blue-600 to-blue-400 rounded-t transition-all duration-500 hover:from-blue-700 hover:to-blue-500"
//                         style={{ height: `${height}px`, minHeight: '8px' }}
//                       />
//                       <div className={`absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity ${
//                         isDark ? 'bg-gray-700 text-gray-200' : 'bg-gray-800 text-white'
//                       }`}>
//                         ${monthData?.amount?.toFixed(2) || '0.00'}
//                       </div>
//                     </div>
//                     <span className={`text-xs mt-2 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
//                       {month}
//                     </span>
//                   </div>
//                 );
//               })}
//             </div>
//           </div>
//         </motion.div>

//         {/* Category Distribution */}
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ delay: 0.4 }}
//           className={`card p-6 ${isDark ? 'bg-gray-800' : 'bg-white'}`}
//         >
//           <div className="flex items-center justify-between mb-6">
//             <h3 className={`text-lg font-semibold ${isDark ? 'text-gray-100' : 'text-gray-900'}`}>
//               Category Distribution
//             </h3>
//             <FaChartPie className="text-green-600" />
//           </div>
          
//           <div className="space-y-4">
//             {analyticsData?.categoryStats?.map((category, index) => {
//               const percentage = (category.amount / analyticsData.totalAmount) * 100;
//               const color = categoryColors[index % categoryColors.length];
              
//               return (
//                 <div key={category._id} className="space-y-2">
//                   <div className="flex items-center justify-between">
//                     <div className="flex items-center gap-3">
//                       <div 
//                         className="w-4 h-4 rounded-full"
//                         style={{ backgroundColor: color }}
//                       />
//                       <span className={`font-medium ${isDark ? 'text-gray-200' : 'text-gray-700'}`}>
//                         {category._id}
//                       </span>
//                     </div>
//                     <div className="text-right">
//                       <p className={`font-semibold ${isDark ? 'text-gray-100' : 'text-gray-900'}`}>
//                         ${category.amount.toFixed(2)}
//                       </p>
//                       <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
//                         {percentage.toFixed(1)}%
//                       </p>
//                     </div>
//                   </div>
//                   <div className={`w-full h-2 rounded-full ${isDark ? 'bg-gray-700' : 'bg-gray-200'}`}>
//                     <div
//                       className="h-2 rounded-full transition-all duration-500"
//                       style={{ 
//                         width: `${percentage}%`,
//                         backgroundColor: color
//                       }}
//                     />
//                   </div>
//                 </div>
//               );
//             })}
//           </div>
//         </motion.div>
//       </div>

//       {/* Insights and Recommendations */}
//       <motion.div
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ delay: 0.5 }}
//         className={`card p-6 ${isDark ? 'bg-gray-800' : 'bg-white'}`}
//       >
//         <h3 className={`text-lg font-semibold mb-6 ${isDark ? 'text-gray-100' : 'text-gray-900'}`}>
//           Insights & Recommendations
//         </h3>
        
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//           <div className={`p-4 rounded-lg ${isDark ? 'bg-blue-900/20 border border-blue-800' : 'bg-blue-50 border border-blue-200'}`}>
//             <h4 className={`font-semibold mb-2 ${isDark ? 'text-blue-300' : 'text-blue-800'}`}>
//               💡 Spending Pattern
//             </h4>
//             <p className={`text-sm ${isDark ? 'text-blue-200' : 'text-blue-700'}`}>
//               Your highest spending months are typically in winter. Consider budgeting extra for heating costs.
//             </p>
//           </div>
          
//           <div className={`p-4 rounded-lg ${isDark ? 'bg-green-900/20 border border-green-800' : 'bg-green-50 border border-green-200'}`}>
//             <h4 className={`font-semibold mb-2 ${isDark ? 'text-green-300' : 'text-green-800'}`}>
//               💰 Savings Opportunity
//             </h4>
//             <p className={`text-sm ${isDark ? 'text-green-200' : 'text-green-700'}`}>
//               You could save up to 15% by switching to energy-efficient appliances and LED lighting.
//             </p>
//           </div>
          
//           <div className={`p-4 rounded-lg ${isDark ? 'bg-purple-900/20 border border-purple-800' : 'bg-purple-50 border border-purple-200'}`}>
//             <h4 className={`font-semibold mb-2 ${isDark ? 'text-purple-300' : 'text-purple-800'}`}>
//               📊 Payment Consistency
//             </h4>
//             <p className={`text-sm ${isDark ? 'text-purple-200' : 'text-purple-700'}`}>
//               Great job! You've maintained consistent payment schedules with 98% on-time payments.
//             </p>
//           </div>
          
//           <div className={`p-4 rounded-lg ${isDark ? 'bg-orange-900/20 border border-orange-800' : 'bg-orange-50 border border-orange-200'}`}>
//             <h4 className={`font-semibold mb-2 ${isDark ? 'text-orange-300' : 'text-orange-800'}`}>
//               🎯 Budget Goal
//             </h4>
//             <p className={`text-sm ${isDark ? 'text-orange-200' : 'text-orange-700'}`}>
//               Set a monthly budget of ${analyticsData?.totalAmount ? (analyticsData.totalAmount / 10).toFixed(2) : '0'} to reduce spending by 10%.
//             </p>
//           </div>
//         </div>
//       </motion.div>
//     </div>
//   );
// };

// export default DashboardAnalytics;
