'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface ProductFilterProps {
  selectedStatus: string | null;
  onStatusChange: (status: string | null) => void;
  productCounts: Record<string, number>;
}

const ProductFilter: React.FC<ProductFilterProps> = ({ 
  selectedStatus, 
  onStatusChange, 
  productCounts 
}) => {
  const statusOptions = [
    { value: null, label: 'All Products', key: 'all' },
    { value: 'live', label: 'Live', key: 'live' },
    { value: 'beta', label: 'Beta', key: 'beta' },
    { value: 'development', label: 'In Development', key: 'development' },
  ];

  const getStatusColor = (status: string | null) => {
    switch (status) {
      case 'live':
        return 'border-green-500 bg-green-50 text-green-700';
      case 'beta':
        return 'border-blue-500 bg-blue-50 text-blue-700';
      case 'development':
        return 'border-yellow-500 bg-yellow-50 text-yellow-700';
      default:
        return 'border-lusitech-blue bg-lusitech-blue text-white';
    }
  };

  const getTotalCount = () => {
    return Object.values(productCounts).reduce((sum, count) => sum + count, 0);
  };

  const getCount = (status: string | null) => {
    if (status === null) return getTotalCount();
    return productCounts[status] || 0;
  };

  return (
    <div className="mb-8">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Filter by Status</h3>
      <div className="flex flex-wrap gap-3">
        {statusOptions.map((option) => {
          const isSelected = selectedStatus === option.value;
          const count = getCount(option.value);
          
          return (
            <motion.button
              key={option.key}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onStatusChange(option.value)}
              className={`
                px-4 py-2 rounded-lg border-2 font-medium text-sm transition-all duration-300
                ${isSelected 
                  ? getStatusColor(option.value)
                  : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300'
                }
              `}
            >
              {option.label}
              <span className={`ml-2 px-2 py-0.5 rounded-full text-xs ${
                isSelected 
                  ? 'bg-white bg-opacity-30' 
                  : 'bg-gray-100'
              }`}>
                {count}
              </span>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
};

export default ProductFilter;