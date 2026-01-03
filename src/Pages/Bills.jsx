import React, { useEffect, useState } from "react";
import { Link } from "react-router";
import { motion, AnimatePresence } from "framer-motion";
import { 
  FaSearch, 
  FaFilter, 
  FaSortAmountDown, 
  FaSortAmountUp,
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaTag,
  FaChevronDown,
  FaChevronLeft,
  FaChevronRight,
  FaTh,
  FaList,
  FaTimes
} from "react-icons/fa";
import { useTheme } from "../context/ThemeContext";
import LoadingSkeleton from "../Component/LoadingSkeleton";

const Bills = () => {
  const { isDark } = useTheme();
  const [bills, setBills] = useState([]);
  const [filteredBills, setFilteredBills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'
  
  // Search and Filter States
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    category: '',
    location: '',
    dateRange: '',
    minAmount: '',
    maxAmount: ''
  });
  const [sortBy, setSortBy] = useState('date');
  const [sortOrder, setSortOrder] = useState('desc');
  const [showFilters, setShowFilters] = useState(false);
  
  // Pagination States
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(12);
  
  // Available filter options
  const categories = ['All', 'Electricity', 'Gas', 'Water', 'Internet'];
  const locations = ['All'];
  const dateRanges = [
    { value: '', label: 'All Time' },
    { value: 'today', label: 'Today' },
    { value: 'week', label: 'This Week' },
    { value: 'month', label: 'This Month' },
    { value: 'year', label: 'This Year' }
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

  useEffect(() => {
    applyFiltersAndSearch();
  }, [bills, searchTerm, filters, sortBy, sortOrder]);

  const fetchBills = async () => {
    try {
      const response = await fetch("https://ubms-server.vercel.app/bills");
      const data = await response.json();
      setBills(data);
      
      // Extract unique locations for filter options
      const uniqueLocations = [...new Set(data.map(bill => bill.location))];
      locations.push(...uniqueLocations.filter(loc => loc && !locations.includes(loc)));
    } catch (error) {
      console.error('Error fetching bills:', error);
    } finally {
      setLoading(false);
    }
  };

  const applyFiltersAndSearch = () => {
    let filtered = [...bills];

    // Apply search
    if (searchTerm) {
      filtered = filtered.filter(bill =>
        bill.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        bill.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        bill.location.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply category filter
    if (filters.category && filters.category !== 'All') {
      filtered = filtered.filter(bill => bill.category === filters.category);
    }

    // Apply location filter
    if (filters.location && filters.location !== 'All') {
      filtered = filtered.filter(bill => bill.location === filters.location);
    }

    // Apply date range filter
    if (filters.dateRange) {
      const now = new Date();
      const billDate = (bill) => new Date(bill.date);
      
      filtered = filtered.filter(bill => {
        const date = billDate(bill);
        switch (filters.dateRange) {
          case 'today':
            return date.toDateString() === now.toDateString();
          case 'week':
            const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
            return date >= weekAgo;
          case 'month':
            return date.getMonth() === now.getMonth() && date.getFullYear() === now.getFullYear();
          case 'year':
            return date.getFullYear() === now.getFullYear();
          default:
            return true;
        }
      });
    }

    // Apply amount filters (if bills have amount property)
    if (filters.minAmount) {
      filtered = filtered.filter(bill => (bill.amount || 0) >= parseFloat(filters.minAmount));
    }
    if (filters.maxAmount) {
      filtered = filtered.filter(bill => (bill.amount || 0) <= parseFloat(filters.maxAmount));
    }

    // Apply sorting
    filtered.sort((a, b) => {
      let aValue, bValue;
      
      switch (sortBy) {
        case 'date':
          aValue = new Date(a.date);
          bValue = new Date(b.date);
          break;
        case 'title':
          aValue = a.title.toLowerCase();
          bValue = b.title.toLowerCase();
          break;
        case 'category':
          aValue = a.category.toLowerCase();
          bValue = b.category.toLowerCase();
          break;
        case 'location':
          aValue = a.location.toLowerCase();
          bValue = b.location.toLowerCase();
          break;
        default:
          return 0;
      }

      if (aValue < bValue) return sortOrder === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortOrder === 'asc' ? 1 : -1;
      return 0;
    });

    setFilteredBills(filtered);
    setCurrentPage(1); // Reset to first page when filters change
  };

  const handleFilterChange = (filterType, value) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  };

  const clearFilters = () => {
    setFilters({
      category: '',
      location: '',
      dateRange: '',
      minAmount: '',
      maxAmount: ''
    });
    setSearchTerm('');
  };

  const toggleSortOrder = () => {
    setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc');
  };

  // Pagination logic
  const totalPages = Math.ceil(filteredBills.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentBills = filteredBills.slice(startIndex, endIndex);

  const goToPage = (page) => {
    setCurrentPage(Math.max(1, Math.min(page, totalPages)));
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
          Discover and manage utility bills from various providers. Use filters and search to find exactly what you need.
        </p>
      </div>

      {/* Search and Filter Bar */}
      <div className={`card p-6 mb-8 ${isDark ? 'bg-gray-800' : 'bg-white'}`}>
        {/* Search Bar */}
        <div className="flex flex-col lg:flex-row gap-4 mb-6">
          <div className="flex-1 relative">
            <FaSearch className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${
              isDark ? 'text-gray-400' : 'text-gray-500'
            }`} />
            <input
              type="text"
              placeholder="Search bills by title, category, or location..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={`form-input pl-10 ${isDark ? 'bg-gray-700' : 'bg-gray-50'}`}
            />
          </div>
          
          <div className="flex gap-3">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`btn-secondary flex items-center gap-2 ${showFilters ? 'bg-blue-600 text-white' : ''}`}
            >
              <FaFilter />
              Filters
              {Object.values(filters).some(v => v) && (
                <span className="bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {Object.values(filters).filter(v => v).length}
                </span>
              )}
            </button>
            
            <button
              onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
              className="btn-secondary flex items-center gap-2"
            >
              {viewMode === 'grid' ? <FaList /> : <FaTh />}
              {viewMode === 'grid' ? 'List' : 'Grid'}
            </button>
          </div>
        </div>

        {/* Advanced Filters */}
        <AnimatePresence>
          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="border-t border-gray-200 dark:border-gray-700 pt-6"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-4">
                {/* Category Filter */}
                <div>
                  <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                    Category
                  </label>
                  <select
                    value={filters.category}
                    onChange={(e) => handleFilterChange('category', e.target.value)}
                    className={`form-input ${isDark ? 'bg-gray-700' : 'bg-gray-50'}`}
                  >
                    {categories.map(category => (
                      <option key={category} value={category === 'All' ? '' : category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Location Filter */}
                <div>
                  <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                    Location
                  </label>
                  <select
                    value={filters.location}
                    onChange={(e) => handleFilterChange('location', e.target.value)}
                    className={`form-input ${isDark ? 'bg-gray-700' : 'bg-gray-50'}`}
                  >
                    {locations.map(location => (
                      <option key={location} value={location === 'All' ? '' : location}>
                        {location}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Date Range Filter */}
                <div>
                  <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                    Date Range
                  </label>
                  <select
                    value={filters.dateRange}
                    onChange={(e) => handleFilterChange('dateRange', e.target.value)}
                    className={`form-input ${isDark ? 'bg-gray-700' : 'bg-gray-50'}`}
                  >
                    {dateRanges.map(range => (
                      <option key={range.value} value={range.value}>
                        {range.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Min Amount Filter */}
                <div>
                  <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                    Min Amount
                  </label>
                  <input
                    type="number"
                    placeholder="0"
                    value={filters.minAmount}
                    onChange={(e) => handleFilterChange('minAmount', e.target.value)}
                    className={`form-input ${isDark ? 'bg-gray-700' : 'bg-gray-50'}`}
                  />
                </div>

                {/* Max Amount Filter */}
                <div>
                  <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                    Max Amount
                  </label>
                  <input
                    type="number"
                    placeholder="1000"
                    value={filters.maxAmount}
                    onChange={(e) => handleFilterChange('maxAmount', e.target.value)}
                    className={`form-input ${isDark ? 'bg-gray-700' : 'bg-gray-50'}`}
                  />
                </div>
              </div>

              <div className="flex justify-between items-center">
                <button
                  onClick={clearFilters}
                  className="text-red-600 hover:text-red-700 flex items-center gap-2 text-sm"
                >
                  <FaTimes />
                  Clear All Filters
                </button>
                
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <label className={`text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                      Sort by:
                    </label>
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className={`form-input text-sm ${isDark ? 'bg-gray-700' : 'bg-gray-50'}`}
                    >
                      {sortOptions.map(option => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                    <button
                      onClick={toggleSortOrder}
                      className={`p-2 rounded-lg transition-colors ${
                        isDark ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
                      }`}
                      title={`Sort ${sortOrder === 'asc' ? 'Descending' : 'Ascending'}`}
                    >
                      {sortOrder === 'asc' ? <FaSortAmountUp /> : <FaSortAmountDown />}
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Results Summary */}
        <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
          <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            Showing {startIndex + 1}-{Math.min(endIndex, filteredBills.length)} of {filteredBills.length} bills
          </p>
          {(searchTerm || Object.values(filters).some(v => v)) && (
            <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              {filteredBills.length} results found
            </p>
          )}
        </div>
      </div>

      {/* Bills Grid/List */}
      {currentBills.length === 0 ? (
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
          {currentBills.map((bill, index) => (
            <motion.div
              key={bill._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={viewMode === 'grid' ? 'bill-card-grid' : 'bill-card-list'}
            >
              {viewMode === 'grid' ? (
                // Grid View
                <div className={`card overflow-hidden group ${isDark ? 'bg-gray-800' : 'bg-white'}`}>
                  <div className="relative overflow-hidden">
                    <img
                      src={bill.image}
                      alt={bill.title}
                      className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 bg-blue-600 text-white text-xs font-semibold rounded-full">
                        {bill.category}
                      </span>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <h3 className={`text-lg font-bold mb-2 line-clamp-2 ${isDark ? 'text-gray-200' : 'text-gray-800'}`}>
                      {bill.title}
                    </h3>
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center gap-2 text-sm">
                        <FaMapMarkerAlt className="text-gray-400" />
                        <span className={isDark ? 'text-gray-300' : 'text-gray-600'}>
                          {bill.location}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
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
                      className="w-24 h-24 object-cover rounded-lg"
                    />
                    
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className={`text-xl font-bold ${isDark ? 'text-gray-200' : 'text-gray-800'}`}>
                          {bill.title}
                        </h3>
                        <span className="px-3 py-1 bg-blue-600 text-white text-xs font-semibold rounded-full">
                          {bill.category}
                        </span>
                      </div>
                      
                      <div className="flex items-center gap-6 text-sm mb-4">
                        <div className="flex items-center gap-2">
                          <FaMapMarkerAlt className="text-gray-400" />
                          <span className={isDark ? 'text-gray-300' : 'text-gray-600'}>
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
          ))}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 mt-12">
          <button
            onClick={() => goToPage(currentPage - 1)}
            disabled={currentPage === 1}
            className={`p-2 rounded-lg transition-colors ${
              currentPage === 1
                ? 'opacity-50 cursor-not-allowed'
                : `${isDark ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`
            }`}
          >
            <FaChevronLeft />
          </button>
          
          {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
            let pageNum;
            if (totalPages <= 5) {
              pageNum = i + 1;
            } else if (currentPage <= 3) {
              pageNum = i + 1;
            } else if (currentPage >= totalPages - 2) {
              pageNum = totalPages - 4 + i;
            } else {
              pageNum = currentPage - 2 + i;
            }
            
            return (
              <button
                key={pageNum}
                onClick={() => goToPage(pageNum)}
                className={`w-10 h-10 rounded-lg transition-colors ${
                  currentPage === pageNum
                    ? 'bg-blue-600 text-white'
                    : `${isDark ? 'hover:bg-gray-700 text-gray-300' : 'hover:bg-gray-100 text-gray-700'}`
                }`}
              >
                {pageNum}
              </button>
            );
          })}
          
          <button
            onClick={() => goToPage(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={`p-2 rounded-lg transition-colors ${
              currentPage === totalPages
                ? 'opacity-50 cursor-not-allowed'
                : `${isDark ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`
            }`}
          >
            <FaChevronRight />
          </button>
        </div>
      )}
    </div>
  );
};

export default Bills;