'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import type { Metadata } from 'next';
import { motion } from 'framer-motion';
import { 
  AnimatedSection, 
  FadeInSection, 
  SlideUpSection, 
  ProductCard, 
  ProductFilter,
  Button
} from '@/components/ui';
import { Product } from '@/lib/types';
import { productApi, handleApiError } from '@/lib/api';

// Note: This metadata export won't work in client components
// We'll handle SEO through other means or convert to server component later
// export const metadata: Metadata = {
//   title: 'Solutions - LusiTech I.T Consult',
//   description: 'Explore LusiTech\'s AI-powered solutions including GOKAC, GreenAI, MediGen, VoiceGhana, and LusiLearnAI.',
// };

export default function SolutionsPage() {
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch products on component mount
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError(null);
        const fetchedProducts = await productApi.getProducts();
        
        // Sort products by order field, then by name
        const sortedProducts = fetchedProducts.sort((a, b) => {
          if (a.order !== b.order) {
            return a.order - b.order;
          }
          return a.name.localeCompare(b.name);
        });
        
        setProducts(sortedProducts);
        setFilteredProducts(sortedProducts);
      } catch (err) {
        console.error('Error fetching products:', err);
        const apiError = handleApiError(err);
        setError(apiError.message);
        
        // Fallback to mock data for development
        const mockProducts: Product[] = [
          {
            id: 1,
            name: 'GOKAC',
            slug: 'gokac',
            description: 'AI-powered governance and citizen engagement platform that streamlines government services and enhances transparency.',
            detailed_description: 'GOKAC is a comprehensive governance platform that leverages artificial intelligence to improve citizen services, enhance transparency, and streamline government operations across Africa.',
            status: 'live',
            image: '',
            features: ['Digital Services', 'Citizen Portal', 'Analytics Dashboard', 'Real-time Monitoring'],
            launch_date: '2024-01-15',
            order: 1
          },
          {
            id: 2,
            name: 'GreenAI',
            slug: 'greenai',
            description: 'Environmental sustainability AI that monitors climate data and provides actionable insights for conservation.',
            detailed_description: 'GreenAI combines satellite imagery, IoT sensors, and machine learning to provide comprehensive environmental monitoring and sustainability insights for African ecosystems.',
            status: 'beta',
            image: '',
            features: ['Climate Monitoring', 'Sustainability Metrics', 'Environmental Alerts', 'Carbon Tracking'],
            launch_date: '2024-06-01',
            order: 2
          },
          {
            id: 3,
            name: 'MediGen',
            slug: 'medigen',
            description: 'Healthcare AI platform that assists medical professionals with diagnosis and treatment recommendations.',
            detailed_description: 'MediGen is an advanced healthcare AI system designed to support African healthcare providers with AI-powered diagnostic tools and treatment recommendations.',
            status: 'development',
            image: '',
            features: ['Medical Diagnosis', 'Treatment Plans', 'Health Analytics', 'Patient Management'],
            launch_date: null,
            order: 3
          },
          {
            id: 4,
            name: 'VoiceGhana',
            slug: 'voiceghana',
            description: 'Voice AI technology that supports local Ghanaian languages for better communication and accessibility.',
            detailed_description: 'VoiceGhana breaks down language barriers by providing advanced voice recognition and translation services for local Ghanaian languages.',
            status: 'beta',
            image: '',
            features: ['Local Languages', 'Voice Recognition', 'Translation', 'Accessibility Tools'],
            launch_date: '2024-08-15',
            order: 4
          },
          {
            id: 5,
            name: 'LusiLearnAI',
            slug: 'lusilearnaI',
            description: 'Educational AI platform that personalizes learning experiences for African students and educators.',
            detailed_description: 'LusiLearnAI revolutionizes education across Africa by providing personalized learning experiences tailored to local contexts and individual student needs.',
            status: 'development',
            image: '',
            features: ['Personalized Learning', 'Progress Tracking', 'Content Creation', 'Teacher Tools'],
            launch_date: null,
            order: 5
          }
        ];
        
        setProducts(mockProducts);
        setFilteredProducts(mockProducts);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Filter products when status changes
  useEffect(() => {
    if (selectedStatus === null) {
      setFilteredProducts(products);
    } else {
      setFilteredProducts(products.filter(product => product.status === selectedStatus));
    }
  }, [products, selectedStatus]);

  // Calculate product counts by status
  const getProductCounts = () => {
    const counts: Record<string, number> = {
      live: 0,
      beta: 0,
      development: 0
    };

    products.forEach(product => {
      if (counts.hasOwnProperty(product.status)) {
        counts[product.status]++;
      }
    });

    return counts;
  };

  const handleProductClick = (product: Product) => {
    // Navigate to product detail page
    router.push(`/solutions/${product.id}`);
  };

  const handleRetry = () => {
    window.location.reload();
  };

  if (loading) {
    return (
      <div className="bg-white pt-16 lg:pt-20 min-h-screen">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-7xl mx-auto">
            {/* Loading Header */}
            <div className="text-center mb-16">
              <div className="h-12 bg-gray-200 rounded-lg mb-6 animate-pulse max-w-md mx-auto"></div>
              <div className="h-6 bg-gray-200 rounded-lg animate-pulse max-w-2xl mx-auto"></div>
            </div>
            
            {/* Loading Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(6)].map((_, index) => (
                <div key={index} className="bg-white border border-gray-200 rounded-xl p-6 animate-pulse">
                  <div className="flex justify-between items-start mb-4">
                    <div className="w-12 h-12 bg-gray-200 rounded-lg"></div>
                    <div className="w-20 h-6 bg-gray-200 rounded-full"></div>
                  </div>
                  <div className="h-6 bg-gray-200 rounded mb-3"></div>
                  <div className="h-4 bg-gray-200 rounded mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded mb-4 w-3/4"></div>
                  <div className="h-10 bg-gray-200 rounded"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error && products.length === 0) {
    return (
      <div className="bg-white pt-16 lg:pt-20 min-h-screen">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-2xl mx-auto text-center">
            <FadeInSection>
              <div className="text-6xl mb-6">⚠️</div>
              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                Unable to Load Products
              </h1>
              <p className="text-lg text-gray-600 mb-8">
                {error}
              </p>
              <Button onClick={handleRetry} variant="primary">
                Try Again
              </Button>
            </FadeInSection>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white pt-16 lg:pt-20">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-7xl mx-auto">
          {/* Page Header */}
          <div className="text-center mb-16">
            <FadeInSection>
              <h1 className="text-4xl md:text-5xl font-bold text-lusitech-blue mb-6">
                Our AI Solutions
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Innovative AI products designed to transform Africa&apos;s future through artificial intelligence
              </p>
            </FadeInSection>
          </div>

          {/* Error Banner (if API failed but we have fallback data) */}
          {error && products.length > 0 && (
            <SlideUpSection>
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-8">
                <div className="flex items-center">
                  <div className="text-yellow-600 mr-3">⚠️</div>
                  <div>
                    <p className="text-yellow-800 font-medium">
                      Unable to connect to server
                    </p>
                    <p className="text-yellow-700 text-sm">
                      Showing cached product information. Some data may be outdated.
                    </p>
                  </div>
                </div>
              </div>
            </SlideUpSection>
          )}

          {/* Product Filter */}
          <SlideUpSection delay={0.2}>
            <ProductFilter
              selectedStatus={selectedStatus}
              onStatusChange={setSelectedStatus}
              productCounts={getProductCounts()}
            />
          </SlideUpSection>

          {/* Products Grid */}
          {filteredProducts.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProducts.map((product, index) => (
                <SlideUpSection key={product.id} delay={index * 0.1}>
                  <ProductCard
                    product={product}
                    onViewDetails={handleProductClick}
                  />
                </SlideUpSection>
              ))}
            </div>
          ) : (
            <SlideUpSection>
              <div className="text-center py-16">
                <div className="text-6xl mb-6">🔍</div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  No Products Found
                </h3>
                <p className="text-gray-600 mb-8">
                  No products match the selected filter. Try selecting a different status.
                </p>
                <Button 
                  onClick={() => setSelectedStatus(null)}
                  variant="outline"
                >
                  Show All Products
                </Button>
              </div>
            </SlideUpSection>
          )}

          {/* Call to Action */}
          <SlideUpSection delay={0.8}>
            <div className="text-center mt-20 bg-gray-50 rounded-2xl p-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Interested in Our Solutions?
              </h2>
              <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
                Partner with us to bring cutting-edge AI technology to your organization and help build Africa&apos;s digital future.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button variant="primary" size="lg" className="px-8">
                    Contact Us
                  </Button>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button variant="outline" size="lg" className="px-8">
                    Learn About Partnerships
                  </Button>
                </motion.div>
              </div>
            </div>
          </SlideUpSection>
        </div>
      </div>
    </div>
  );
}