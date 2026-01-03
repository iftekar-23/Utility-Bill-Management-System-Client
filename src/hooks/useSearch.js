import { useState, useEffect, useMemo } from 'react';

export const useSearch = (data, searchFields = [], initialFilters = {}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState(initialFilters);
  const [sortBy, setSortBy] = useState('date');
  const [sortOrder, setSortOrder] = useState('desc');

  const filteredAndSortedData = useMemo(() => {
    let filtered = [...data];

    // Apply search
    if (searchTerm) {
      filtered = filtered.filter(item => {
        return searchFields.some(field => {
          const value = getNestedValue(item, field);
          return value && value.toString().toLowerCase().includes(searchTerm.toLowerCase());
        });
      });
    }

    // Apply filters
    Object.entries(filters).forEach(([key, value]) => {
      if (value && value !== '' && value !== 'All') {
        if (key === 'dateRange') {
          filtered = applyDateFilter(filtered, value);
        } else if (key === 'minAmount' || key === 'maxAmount') {
          filtered = applyAmountFilter(filtered, key, value);
        } else {
          filtered = filtered.filter(item => {
            const itemValue = getNestedValue(item, key);
            return itemValue === value;
          });
        }
      }
    });

    // Apply sorting
    filtered.sort((a, b) => {
      const aValue = getNestedValue(a, sortBy);
      const bValue = getNestedValue(b, sortBy);

      let comparison = 0;
      
      if (sortBy === 'date') {
        comparison = new Date(aValue) - new Date(bValue);
      } else if (typeof aValue === 'string' && typeof bValue === 'string') {
        comparison = aValue.toLowerCase().localeCompare(bValue.toLowerCase());
      } else {
        comparison = aValue - bValue;
      }

      return sortOrder === 'asc' ? comparison : -comparison;
    });

    return filtered;
  }, [data, searchTerm, filters, sortBy, sortOrder, searchFields]);

  const updateFilter = (key, value) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const clearFilters = () => {
    setSearchTerm('');
    setFilters(initialFilters);
  };

  const toggleSortOrder = () => {
    setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc');
  };

  return {
    searchTerm,
    setSearchTerm,
    filters,
    updateFilter,
    sortBy,
    setSortBy,
    sortOrder,
    toggleSortOrder,
    filteredData: filteredAndSortedData,
    clearFilters,
    hasActiveFilters: searchTerm || Object.values(filters).some(v => v && v !== '' && v !== 'All')
  };
};

// Helper functions
const getNestedValue = (obj, path) => {
  return path.split('.').reduce((current, key) => current?.[key], obj);
};

const applyDateFilter = (data, dateRange) => {
  const now = new Date();
  
  return data.filter(item => {
    const itemDate = new Date(item.date);
    
    switch (dateRange) {
      case 'today':
        return itemDate.toDateString() === now.toDateString();
      case 'week':
        const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
        return itemDate >= weekAgo;
      case 'month':
        return itemDate.getMonth() === now.getMonth() && 
               itemDate.getFullYear() === now.getFullYear();
      case 'year':
        return itemDate.getFullYear() === now.getFullYear();
      default:
        return true;
    }
  });
};

const applyAmountFilter = (data, filterType, value) => {
  const amount = parseFloat(value);
  if (isNaN(amount)) return data;
  
  return data.filter(item => {
    const itemAmount = item.amount || 0;
    return filterType === 'minAmount' ? itemAmount >= amount : itemAmount <= amount;
  });
};