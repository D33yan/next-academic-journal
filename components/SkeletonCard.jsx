import React from 'react';

const SkeletonCard = () => {
  return (
    <div className="animate-pulse">
      <div className="h-56 w-full bg-gray-700 rounded-xl mb-4"></div>
      <div className="h-4 bg-gray-700 rounded w-3/4 mb-2"></div>
      <div className="h-4 bg-gray-700 rounded mb-2"></div>
      <div className="h-4 bg-gray-700 rounded w-5/6 mb-2"></div>
    </div>
  );
};

export default SkeletonCard;
