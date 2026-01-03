import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaFilter, 
  FaTimes, 
  FaSortAmountUp, 
  FaSortAmountDown,
  FaSearch
} from 'react-icons/fa';
import { useTheme } from '../context/ThemeContext';

const FilterPanel = ({
  searchTerm,
  onSearchChange,
  filters,
  onFilterChange,
  sortBy,
  onSortChange,
  sortOrder,
  onSortOrderToggle,
  showFilters,
  onToggleFilters,
  onClearFilters,
  filterOptions,
  sortOptions,
  hasActiveFilters,
  resultsCount,
  totalCount
}) => {
  const { isDark } = useTheme();

  return (
    <div className={`card p-6 mb-8 ${isDark ? 'bg-gray-800' : 'bg-white'}`}>
      {/* Search Bar and Controls */}
      <div className="flex flex-col lg:flex-row gap-4 mb-6">
        <div className="flex-1 relative">
          <FaSearch className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${
            isDark ? 'text-gray-400' : 'text-gray-500'
          }`} />
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className={`form-input pl-10 ${isDark ? 'bg-gray-700' : 'bg-gray-50'}`}
          />
        </div>
        
        <div className="flex gap-3">
          <button
            onClick={onToggleFilters}
            className={`btn-secondary flex items-center gap-2 ${showFilters ? 'bg-blue-600 text-white' : ''}`}
          >
            <FaFilter />
            Filters
            {hasActiveFilters && (
              <span className="bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {Object.values(filters).filter(v => v && v !== '' && v !== 'All').length + (searchTerm ? 1 : 0)}
              </span>
            )}
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
              {filterOptions.map((option) => (
                <div key={option.key}>
                  <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                    {option.label}
                  </label>
                  {option.type === 'select' ? (
                    <select
                      value={filters[option.key] || ''}
                      onChange={(e) => onFilterChange(option.key, e.target.value)}
                      className={`form-input ${isDark ? 'bg-gray-700' : 'bg-gray-50'}`}
                    >
                      {option.options.map(opt => (
                        <option key={opt.value} value={opt.value}>
                          {opt.label}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <input
                      type={option.type}
                      placeholder={option.placeholder}
                      value={filters[option.key] || ''}
                      onChange={(e) => onFilterChange(option.key, e.target.value)}
                      className={`form-input ${isDark ? 'bg-gray-700' : 'bg-gray-50'}`}
                    />
                  )}
                </div>
              ))}
            </div>

            <div className="flex justify-between items-center">
              <button
                onClick={onClearFilters}
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
                    onChange={(e) => onSortChange(e.target.value)}
                    className={`form-input text-sm ${isDark ? 'bg-gray-700' : 'bg-gray-50'}`}
                  >
                    {sortOptions.map(option => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                  <button
                    onClick={onSortOrderToggle}
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
          Showing {resultsCount} of {totalCount} results
        </p>
        {hasActiveFilters && (
          <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            {resultsCount} results found
          </p>
        )}
      </div>
    </div>
  );
};

export default FilterPanel;