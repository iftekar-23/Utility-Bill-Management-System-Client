import React from 'react';
import { FaTh, FaList, FaThLarge } from 'react-icons/fa';
import { useTheme } from '../context/ThemeContext';

const ViewModeToggle = ({ viewMode, onViewModeChange, options = ['grid', 'list'] }) => {
  const { isDark } = useTheme();

  const viewModeIcons = {
    grid: <FaTh />,
    list: <FaList />,
    large: <FaThLarge />
  };

  const viewModeLabels = {
    grid: 'Grid',
    list: 'List',
    large: 'Large Grid'
  };

  return (
    <div className={`inline-flex rounded-lg border ${isDark ? 'border-gray-600' : 'border-gray-300'}`}>
      {options.map((mode, index) => (
        <button
          key={mode}
          onClick={() => onViewModeChange(mode)}
          className={`
            flex items-center gap-2 px-4 py-2 text-sm font-medium transition-all duration-200
            ${index === 0 ? 'rounded-l-lg' : ''}
            ${index === options.length - 1 ? 'rounded-r-lg' : ''}
            ${viewMode === mode
              ? 'bg-blue-600 text-white shadow-sm'
              : `${isDark 
                  ? 'bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white' 
                  : 'bg-white text-gray-700 hover:bg-gray-50 hover:text-blue-600'
                }`
            }
            ${index > 0 ? `border-l ${isDark ? 'border-gray-600' : 'border-gray-300'}` : ''}
          `}
          title={`Switch to ${viewModeLabels[mode]} view`}
        >
          {viewModeIcons[mode]}
          <span className="hidden sm:inline">{viewModeLabels[mode]}</span>
        </button>
      ))}
    </div>
  );
};

export default ViewModeToggle;