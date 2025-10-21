'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { NavigationItem } from '@/lib/types';
import Button from '@/components/ui/Button';

const navigationItems: NavigationItem[] = [
  { label: 'Home', href: '/' },
  { label: 'About Us', href: '/about' },
  { label: 'Solutions', href: '/solutions' },
  { label: 'Blog', href: '/blog' },
  { label: 'Partnerships', href: '/partnerships' },
  { label: 'Contact', href: '/contact' },
];

const Navigation: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <>
      <nav
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
          isScrolled
            ? 'bg-white/95 backdrop-blur-md shadow-lg'
            : 'bg-transparent'
        )}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-lusitech-blue to-lusitech-cyan rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">L</span>
              </div>
              <div className="flex flex-col">
                <span className={cn(
                  'font-bold text-lg leading-tight',
                  isScrolled ? 'text-lusitech-blue' : 'text-white'
                )}>
                  LusiTech
                </span>
                <span className={cn(
                  'text-xs leading-tight',
                  isScrolled ? 'text-lusitech-cyan' : 'text-white/80'
                )}>
                  I.T Consult
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-8">
              {navigationItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    'relative font-medium transition-colors duration-200',
                    pathname === item.href
                      ? isScrolled
                        ? 'text-lusitech-blue'
                        : 'text-white'
                      : isScrolled
                        ? 'text-gray-700 hover:text-lusitech-blue'
                        : 'text-white/80 hover:text-white'
                  )}
                >
                  {item.label}
                  {pathname === item.href && (
                    <motion.div
                      className={cn(
                        'absolute -bottom-1 left-0 right-0 h-0.5 rounded-full',
                        isScrolled ? 'bg-lusitech-blue' : 'bg-white'
                      )}
                      layoutId="activeTab"
                      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    />
                  )}
                </Link>
              ))}
            </div>

            {/* CTA Button - Desktop */}
            <div className="hidden lg:block">
              <Button
                variant={isScrolled ? 'primary' : 'outline'}
                size="sm"
                className={!isScrolled ? 'border-white text-white hover:bg-white hover:text-lusitech-blue' : ''}
              >
                Get Started
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={toggleMenu}
              className="lg:hidden p-2 rounded-lg transition-colors duration-200"
              aria-label="Toggle menu"
            >
              <div className="w-6 h-6 flex flex-col justify-center items-center">
                <motion.span
                  className={cn(
                    'block h-0.5 w-6 rounded-full transition-colors duration-200',
                    isScrolled ? 'bg-lusitech-blue' : 'bg-white'
                  )}
                  animate={isOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
                  transition={{ duration: 0.2 }}
                />
                <motion.span
                  className={cn(
                    'block h-0.5 w-6 rounded-full mt-1.5 transition-colors duration-200',
                    isScrolled ? 'bg-lusitech-blue' : 'bg-white'
                  )}
                  animate={isOpen ? { opacity: 0 } : { opacity: 1 }}
                  transition={{ duration: 0.2 }}
                />
                <motion.span
                  className={cn(
                    'block h-0.5 w-6 rounded-full mt-1.5 transition-colors duration-200',
                    isScrolled ? 'bg-lusitech-blue' : 'bg-white'
                  )}
                  animate={isOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
                  transition={{ duration: 0.2 }}
                />
              </div>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-40 lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {/* Backdrop */}
            <motion.div
              className="absolute inset-0 bg-black/50 backdrop-blur-sm"
              onClick={toggleMenu}
            />

            {/* Menu Panel */}
            <motion.div
              className="absolute top-16 left-4 right-4 bg-white rounded-2xl shadow-2xl overflow-hidden"
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ duration: 0.2 }}
            >
              <div className="py-6">
                {navigationItems.map((item, index) => (
                  <motion.div
                    key={item.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Link
                      href={item.href}
                      className={cn(
                        'block px-6 py-3 text-lg font-medium transition-colors duration-200',
                        pathname === item.href
                          ? 'text-lusitech-blue bg-lusitech-blue/5'
                          : 'text-gray-700 hover:text-lusitech-blue hover:bg-gray-50'
                      )}
                    >
                      {item.label}
                    </Link>
                  </motion.div>
                ))}
                
                <motion.div
                  className="px-6 pt-4 mt-4 border-t border-gray-100"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: navigationItems.length * 0.05 }}
                >
                  <Button variant="primary" className="w-full">
                    Get Started
                  </Button>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navigation;