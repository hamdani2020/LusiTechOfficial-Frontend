'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Card, Button } from '@/components/ui';
import { Product } from '@/lib/types';

interface ProductCardProps {
  product: Product;
  onViewDetails?: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onViewDetails }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'live':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'beta':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'development':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'live':
        return 'Live';
      case 'beta':
        return 'Beta';
      case 'development':
        return 'In Development';
      default:
        return status;
    }
  };

  const getProductIcon = (name: string) => {
    switch (name.toLowerCase()) {
      case 'gokac':
        return '🏛️';
      case 'greenai':
        return '🌱';
      case 'medigen':
        return '🏥';
      case 'voiceghana':
        return '🗣️';
      case 'lusilearnaI':
        return '📚';
      default:
        return '🤖';
    }
  };

  const getProductColor = (name: string) => {
    switch (name.toLowerCase()) {
      case 'gokac':
        return 'from-blue-500 to-blue-600';
      case 'greenai':
        return 'from-green-500 to-green-600';
      case 'medigen':
        return 'from-red-500 to-red-600';
      case 'voiceghana':
        return 'from-yellow-500 to-orange-500';
      case 'lusilearnaI':
        return 'from-purple-500 to-purple-600';
      default:
        return 'from-gray-500 to-gray-600';
    }
  };

  return (
    <motion.div
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3 }}
      className="h-full"
    >
      <Card className="h-full p-6 relative overflow-hidden group cursor-pointer">
        {/* Background Gradient */}
        <div 
          className={`absolute top-0 right-0 w-20 h-20 bg-gradient-to-br ${getProductColor(product.name)} opacity-10 rounded-full transform translate-x-6 -translate-y-6 group-hover:scale-150 transition-transform duration-500`} 
        />
        
        {/* Product Image or Icon */}
        <div className="flex justify-between items-start mb-4">
          {product.image ? (
            <div className="w-12 h-12 rounded-lg overflow-hidden bg-gray-100">
              <img 
                src={product.image} 
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
          ) : (
            <div className="text-3xl">{getProductIcon(product.name)}</div>
          )}
          
          {/* Status Badge */}
          <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(product.status)}`}>
            {getStatusLabel(product.status)}
          </span>
        </div>

        {/* Product Info */}
        <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-lusitech-blue transition-colors duration-300">
          {product.name}
        </h3>
        
        <p className="text-gray-600 mb-4 line-clamp-3 leading-relaxed">
          {product.description}
        </p>

        {/* Features Preview */}
        {product.features && product.features.length > 0 && (
          <div className="mb-6">
            <div className="flex flex-wrap gap-2">
              {product.features.slice(0, 3).map((feature, index) => (
                <span 
                  key={index}
                  className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-md"
                >
                  {feature}
                </span>
              ))}
              {product.features.length > 3 && (
                <span className="px-2 py-1 bg-gray-100 text-gray-500 text-xs rounded-md">
                  +{product.features.length - 3} more
                </span>
              )}
            </div>
          </div>
        )}

        {/* Launch Date */}
        {product.launch_date && (
          <div className="mb-4">
            <p className="text-sm text-gray-500">
              Launch Date: {new Date(product.launch_date).toLocaleDateString()}
            </p>
          </div>
        )}

        {/* Action Button */}
        <motion.div
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="mt-auto"
        >
          <Link href={`/solutions/${product.slug}`}>
            <Button 
              variant="outline" 
              className="w-full group-hover:bg-lusitech-blue group-hover:text-white group-hover:border-lusitech-blue transition-all duration-300"
            >
              Learn More
            </Button>
          </Link>
        </motion.div>
      </Card>
    </motion.div>
  );
};

export default ProductCard;