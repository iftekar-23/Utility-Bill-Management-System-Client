import React from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { useTheme } from '../context/ThemeContext';

const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
  showFirstLast = true,
  maxVisible = 5
}) => {
  const { isDark } = useTheme();

  if (totalPages <= 1) return null;

  const getPageNumbers = () => {
    const pages = [];
    
    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= maxVisible; i++) {
          pages.push(i);
        }
      } else if (currentPage >= totalPages - 2) {
        for (let i = totalPages - maxVisible + 1; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        for (let i = currentPage - 2; i <= currentPage + 2; i++) {
          pages.push(i);
        }
      }
    }
    
    return pages;
  };

  const pageNumbers = getPageNumbers();

  return (
    <div className="flex justify-center items-center gap-2 mt-12">
      {/* First Page */}
      {showFirstLast && currentPage > 3 && totalPages > maxVisible && (
        <>
          <button
            onClick={() => onPageChange(1)}
            className={`w-10 h-10 rounded-lg transition-colors ${
              isDark ? 'hover:bg-gray-700 text-gray-300' : 'hover:bg-gray-100 text-gray-700'
            }`}
          >
            1
          </button>
          {currentPage > 4 && (
            <span className={`px-2 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>...</span>
          )}
        </>
      )}

      {/* Previous Button */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`p-2 rounded-lg transition-colors ${
          currentPage === 1
            ? 'opacity-50 cursor-not-allowed'
            : `${isDark ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`
        }`}
        aria-label="Previous page"
      >
        <FaChevronLeft />
      </button>

      {/* Page Numbers */}
      {pageNumbers.map(pageNum => (
        <button
          key={pageNum}
          onClick={() => onPageChange(pageNum)}
          className={`w-10 h-10 rounded-lg transition-colors font-medium ${
            currentPage === pageNum
              ? 'bg-blue-600 text-white shadow-lg'
              : `${isDark ? 'hover:bg-gray-700 text-gray-300' : 'hover:bg-gray-100 text-gray-700'}`
          }`}
        >
          {pageNum}
        </button>
      ))}

      {/* Next Button */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`p-2 rounded-lg transition-colors ${
          currentPage === totalPages
            ? 'opacity-50 cursor-not-allowed'
            : `${isDark ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`
        }`}
        aria-label="Next page"
      >
        <FaChevronRight />
      </button>

      {/* Last Page */}
      {showFirstLast && currentPage < totalPages - 2 && totalPages > maxVisible && (
        <>
          {currentPage < totalPages - 3 && (
            <span className={`px-2 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>...</span>
          )}
          <button
            onClick={() => onPageChange(totalPages)}
            className={`w-10 h-10 rounded-lg transition-colors ${
              isDark ? 'hover:bg-gray-700 text-gray-300' : 'hover:bg-gray-100 text-gray-700'
            }`}
          >
            {totalPages}
          </button>
        </>
      )}
    </div>
  );
};

export default Pagination;