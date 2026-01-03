import React from 'react';
import { useTheme } from '../context/ThemeContext';

const LoadingSkeleton = ({ type = 'card', count = 1 }) => {
  const { isDark } = useTheme();

  const skeletonClass = `animate-pulse ${isDark ? 'bg-gray-700' : 'bg-gray-200'} rounded`;

  const renderCardSkeleton = () => (
    <div className={`card p-6 ${isDark ? 'bg-gray-800' : 'bg-white'}`}>
      <div className={`${skeletonClass} h-48 mb-4`}></div>
      <div className={`${skeletonClass} h-4 mb-2`}></div>
      <div className={`${skeletonClass} h-4 w-3/4 mb-2`}></div>
      <div className={`${skeletonClass} h-3 w-1/2`}></div>
    </div>
  );

  const renderListSkeleton = () => (
    <div className={`card p-4 ${isDark ? 'bg-gray-800' : 'bg-white'} flex items-center gap-4`}>
      <div className={`${skeletonClass} w-12 h-12 rounded-full`}></div>
      <div className="flex-1">
        <div className={`${skeletonClass} h-4 mb-2`}></div>
        <div className={`${skeletonClass} h-3 w-2/3`}></div>
      </div>
    </div>
  );

  const renderTextSkeleton = () => (
    <div className="space-y-2">
      <div className={`${skeletonClass} h-4`}></div>
      <div className={`${skeletonClass} h-4 w-5/6`}></div>
      <div className={`${skeletonClass} h-4 w-4/6`}></div>
    </div>
  );

  const renderSkeleton = () => {
    switch (type) {
      case 'card':
        return renderCardSkeleton();
      case 'list':
        return renderListSkeleton();
      case 'text':
        return renderTextSkeleton();
      default:
        return renderCardSkeleton();
    }
  };

  return (
    <div className="space-y-4">
      {Array.from({ length: count }, (_, index) => (
        <div key={index}>
          {renderSkeleton()}
        </div>
      ))}
    </div>
  );
};

export default LoadingSkeleton;