import React from 'react';
import SkeletonCard from './SkeletonCard';

const SkeletonLoader = () => {
  return (
    <div className='container mx-auto p-4'>
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
        {Array.from({ length: 6 }).map((_, index) => (
          <SkeletonCard key={index} />
        ))}
      </div>
    </div>
  );
};

export default SkeletonLoader;
