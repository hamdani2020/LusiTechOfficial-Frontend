'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { ButtonProps } from '@/lib/types';

const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  className,
  onClick,
  disabled = false,
  type = 'button',
  ...props
}) => {
  const baseStyles = 'font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';
  
  const variantStyles = {
    primary: 'bg-lusitech-blue hover:bg-lusitech-blue/90 text-white focus:ring-lusitech-blue/50',
    secondary: 'bg-lusitech-cyan hover:bg-lusitech-cyan/90 text-white focus:ring-lusitech-cyan/50',
    outline: 'border-2 border-lusitech-blue text-lusitech-blue hover:bg-lusitech-blue hover:text-white focus:ring-lusitech-blue/50',
  };
  
  const sizeStyles = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  };

  return (
    <button
      type={type}
      className={cn(
        baseStyles,
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;