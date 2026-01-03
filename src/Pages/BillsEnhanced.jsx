import React, { useEffect, useState } from "react";
import { Link } from "react-router";
import { motion } from "framer-motion";
import { 
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaTag
} from "react-icons/fa";
import { useTheme } from "../context/ThemeContext";
import { useSearch } from "../hooks/useSearch";
import { usePagination } from "../hooks/usePagination";
import LoadingSkeleton from "../Component/LoadingSkeleton";
import FilterPanel from "../Component/FilterPanel";
import Pagination from "../Component/Pagination";
import ViewModeToggle from "../Component/ViewModeToggle";

const BillsEnhanced = () => {
  const { isDark } = useTheme();
  const [bills, setBills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState('grid');
  const [showFilters, setShowFilters] = useState(false);

  // Search and filter configuration
  const searchFields = ['title', 'category', 'location'];
  const initialFilters = {
    category: '',
    location: '',
    dateRange: '',
    minAmount: '',
    maxAmount: ''
  };

  const {
    searchTerm,
    setSearchTerm,
    filters,
    updateFilter,
    sortBy,
    setSortBy,
    sortOrder,
    toggleSortOrder,
    filteredData,
    clearFilters,
    hasActiveFilters
  } = useSearch(bills, searchFields, initialFilters);

  const {
    currentPage,
    currentItems,
    totalPages,
    totalItems,
    startIndex,
    endIndex,
    goToPage
  } = usePagination(filteredData, 12);

  // Filter and sort options
  const filterOptions = [
    {
      key: 'category',
      label: 'Category',
      type: 'select',
      options: [
        { value: '', label: 'All Categories' },
        { value: 'Electricity', label: 'Electricity' },
        { value: 'Gas', label: 'Gas' },
        { value: 'Water', label: 'Water' },
        { value: 'Internet', label: 'Internet' }
      ]
    },
    {
      key: 'location',
      label: 'Location',
      type: 'select',
      options: [
        { value: '', label: 'All Locations' },
        // Will be populated dynamically
      ]
    },
    {
      key: 'dateRange',
      label: 'Date Range',
      type: 'select',
      options: [
        { value: '', label: 'All Time' },
        { value: 'today', label: 'Today' },
        { value: 'week', label: 'This Week' },
        { value: 'month', label: 'This Month' },
        { value: 'year', label: 'This Year' }
      ]
    },
    {
      key: 'minAmount',
      label: 'Min Amount',
      type: 'number',
      placeholder: '0'
    },
    {
      key: 'maxAmount',
      label: 'Max Amount',
      type: 'number',
      placeholder: '1000'
    }
  ];

  const sortOptions = [
    { value: 'date', label: 'Date' },
    { value: 'title', label: 'Title' },
    { value: 'category', label: 'Category' },
    { value: 'location', label: 'Location' }
  ];

  useEffect(() => {
    fetchBills();
  }, []);

  const fetchBills = async () => {
    try {
      const response = await fetch("https://ubms-server.vercel.app/bills");
      const data = await response.json();
      setBills(data);
      
      // Update location options dynamically
      const uniqueLocations = [...new Set(data.map(bill => bill.location))];
      const locationFilter = filterOptions.find(opt => opt.key === 'location');
      if (locationFilter) {
        locationFilter.options = [
          { value: '', label: 'All Locations' },
          ...uniqueLocations.map(loc => ({ value: loc, label: loc }))
        ];
      }
    } catch (error) {
      console.error('Error fetching bills:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="container-max px-4 py-8">
        <div className="mb-8">
          <LoadingSkeleton type="text" count={1} />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <LoadingSkeleton type="card" count={9} />
        </div>
      </div>
    );
  }

  return (
    <div className="container-max px-4 py-8">
      {/* Page Header */}
      <div className="text-center mb-8">
        <h1 className={`text-4xl font-bold mb-4 ${isDark ? 'text-gray-100' : 'text-gray-900'}`}>
          Explore All Bills
        </h1>
        <p className={`text-lg ${isDark ? 'text-gray-300' : 'text-gray-600'} max-w-2xl mx-auto`}>
          Discover and manage utility bills from various providers. Use our advanced search and filtering system to find exactly what you need.
        </p>
      </div>

      {/* Filter Panel */}
      <FilterPanel
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        filters={filters}
        onFilterChange={updateFilter}
        sortBy={sortBy}
        onSortChange={setSortBy}
        sortOrder={sortOrder}
        onSortOrderToggle={toggleSortOrder}
        showFilters={showFilters}
        onToggleFilters={() => setShowFilters(!showFilters)}
        onClearFilters={clearFilters}
        filterOptions={filterOptions}
        sortOptions={sortOptions}
        hasActiveFilters={hasActiveFilters}
        resultsCount={`${startIndex + 1}-${endIndex}`}
        totalCount={totalItems}
      />

      {/* View Mode Toggle and Results Info */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-4">
          <ViewModeToggle
            viewMode={viewMode}
            onViewModeChange={setViewMode}
            options={['grid', 'list']}
          />
          <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            {totalItems} {totalItems === 1 ? 'bill' : 'bills'} found
          </span>
        </div>
      </div>

      {/* Bills Display */}
      {currentItems.length === 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className={`text-center py-16 ${isDark ? 'bg-gray-800' : 'bg-gray-50'} rounded-2xl`}
        >
          <div className="text-6xl mb-4">🔍</div>
          <h3 className={`text-xl font-semibold mb-2 ${isDark ? 'text-gray-200' : 'text-gray-800'}`}>
            No Bills Found
          </h3>
          <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'} mb-4`}>
            Try adjusting your search terms or filters to find what you're looking for.
          </p>
          <button
            onClick={clearFilters}
            className="btn-primary"
          >
            Clear Filters
          </button>
        </motion.div>
      ) : (
        <div className={`${viewMode === 'grid' 
          ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6' 
          : 'space-y-4'
        }`}>
          {currentItems.map((bill, index) => (
            <BillCard
              key={bill._id}
              bill={bill}
              viewMode={viewMode}
              index={index}
            />
          ))}
        </div>
      )}

      {/* Pagination */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={goToPage}
      />
    </div>
  );
};

// Bill Card Component
const BillCard = ({ bill, viewMode, index }) => {
  const { isDark } = useTheme();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      {viewMode === 'grid' ? (
        // Grid View
        <div className={`card overflow-hidden group ${isDark ? 'bg-gray-800' : 'bg-white'}`}>
          <div className="relative overflow-hidden">
            <img
              src={bill.image}
              alt={bill.title}
              className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
              loading="lazy"
            />
            <div className="absolute top-4 left-4">
              <span className="px-3 py-1 bg-blue-600 text-white text-xs font-semibold rounded-full">
                {bill.category}
              </span>
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>
          
          <div className="p-6">
            <h3 className={`text-lg font-bold mb-3 line-clamp-2 ${isDark ? 'text-gray-200' : 'text-gray-800'}`}>
              {bill.title}
            </h3>
            <div className="space-y-2 mb-4">
              <div className="flex items-center gap-2 text-sm">
                <FaMapMarkerAlt className="text-gray-400 flex-shrink-0" />
                <span className={`${isDark ? 'text-gray-300' : 'text-gray-600'} truncate`}>
                  {bill.location}
                </span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <FaCalendarAlt className="text-gray-400 flex-shrink-0" />
                <span className={isDark ? 'text-gray-300' : 'text-gray-600'}>
                  {new Date(bill.date).toLocaleDateString()}
                </span>
              </div>
            </div>
            
            <Link to={`/bills/${bill._id}`}>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full btn-primary"
              >
                View Details
              </motion.button>
            </Link>
          </div>
        </div>
      ) : (
        // List View
        <div className={`card p-6 ${isDark ? 'bg-gray-800' : 'bg-white'}`}>
          <div className="flex items-center gap-6">
            <img
              src={bill.image}
              alt={bill.title}
              className="w-24 h-24 object-cover rounded-lg flex-shrink-0"
              loading="lazy"
            />
            
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between mb-2">
                <h3 className={`text-xl font-bold truncate pr-4 ${isDark ? 'text-gray-200' : 'text-gray-800'}`}>
                  {bill.title}
                </h3>
                <span className="px-3 py-1 bg-blue-600 text-white text-xs font-semibold rounded-full flex-shrink-0">
                  {bill.category}
                </span>
              </div>
              
              <div className="flex items-center gap-6 text-sm mb-4">
                <div className="flex items-center gap-2">
                  <FaMapMarkerAlt className="text-gray-400" />
                  <span className={`${isDark ? 'text-gray-300' : 'text-gray-600'} truncate`}>
                    {bill.location}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <FaCalendarAlt className="text-gray-400" />
                  <span className={isDark ? 'text-gray-300' : 'text-gray-600'}>
                    {new Date(bill.date).toLocaleDateString()}
                  </span>
                </div>
              </div>
              
              <Link to={`/bills/${bill._id}`}>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="btn-primary"
                >
                  View Details
                </motion.button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default BillsEnhanced;