'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { AnimatedSectionProps } from '@/lib/types';

const AnimatedSection: React.FC<AnimatedSectionProps> = ({
  children,
  className,
  animation = 'fadeIn',
  delay = 0,
  ...props
}) => {
  const animations = {
    fadeIn: {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      transition: { duration: 0.6, delay }
    },
    slideUp: {
      initial: { opacity: 0, y: 20 },
      animate: { opacity: 1, y: 0 },
      transition: { duration: 0.6, delay }
    },
    slideLeft: {
      initial: { opacity: 0, x: 20 },
      animate: { opacity: 1, x: 0 },
      transition: { duration: 0.6, delay }
    },
    slideRight: {
      initial: { opacity: 0, x: -20 },
      animate: { opacity: 1, x: 0 },
      transition: { duration: 0.6, delay }
    }
  };

  const selectedAnimation = animations[animation];

  return (
    <motion.div
      className={cn(className)}
      initial={selectedAnimation.initial}
      whileInView={selectedAnimation.animate}
      transition={selectedAnimation.transition}
      viewport={{ once: true, margin: '-50px' }}
      {...props}
    >
      {children}
    </motion.div>
  );
};

// Additional animation components for specific use cases
export const FadeInSection: React.FC<Omit<AnimatedSectionProps, 'animation'>> = (props) => (
  <AnimatedSection {...props} animation="fadeIn" />
);

export const SlideUpSection: React.FC<Omit<AnimatedSectionProps, 'animation'>> = (props) => (
  <AnimatedSection {...props} animation="slideUp" />
);

export const SlideLeftSection: React.FC<Omit<AnimatedSectionProps, 'animation'>> = (props) => (
  <AnimatedSection {...props} animation="slideLeft" />
);

export const SlideRightSection: React.FC<Omit<AnimatedSectionProps, 'animation'>> = (props) => (
  <AnimatedSection {...props} animation="slideRight" />
);

export default AnimatedSection;