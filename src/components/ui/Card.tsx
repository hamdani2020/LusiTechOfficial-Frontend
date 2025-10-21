'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { CardProps } from '@/lib/types';

const Card: React.FC<CardProps> = ({
  children,
  className,
  hover = true,
  ...props
}) => {
  const baseStyles = 'bg-white rounded-lg shadow-md border border-gray-100';
  const hoverStyles = hover ? 'hover:shadow-lg hover:shadow-gray-200/50 transition-shadow duration-300' : '';

  return (
    <div
      className={cn(
        baseStyles,
        hoverStyles,
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

// Card sub-components for better composition
const CardHeader: React.FC<{ children: React.ReactNode; className?: string }> = ({
  children,
  className,
}) => (
  <div className={cn('p-6 pb-4', className)}>
    {children}
  </div>
);

const CardContent: React.FC<{ children: React.ReactNode; className?: string }> = ({
  children,
  className,
}) => (
  <div className={cn('px-6 pb-6', className)}>
    {children}
  </div>
);

const CardFooter: React.FC<{ children: React.ReactNode; className?: string }> = ({
  children,
  className,
}) => (
  <div className={cn('px-6 py-4 border-t border-gray-100 bg-gray-50/50 rounded-b-lg', className)}>
    {children}
  </div>
);

const CardTitle: React.FC<{ children: React.ReactNode; className?: string }> = ({
  children,
  className,
}) => (
  <h3 className={cn('text-xl font-semibold text-lusitech-blue mb-2', className)}>
    {children}
  </h3>
);

const CardDescription: React.FC<{ children: React.ReactNode; className?: string }> = ({
  children,
  className,
}) => (
  <p className={cn('text-gray-600 leading-relaxed', className)}>
    {children}
  </p>
);

// Export the main component and sub-components
export default Card;
export { CardHeader, CardContent, CardFooter, CardTitle, CardDescription };