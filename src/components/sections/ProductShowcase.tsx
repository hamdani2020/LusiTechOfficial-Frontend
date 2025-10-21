'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardTitle, CardDescription, Button } from '@/components/ui';
import AnimatedSection, { SlideUpSection, FadeInSection } from '@/components/ui/AnimatedSection';

const ProductShowcase: React.FC = () => {
  const products = [
    {
      name: 'GOKAC',
      description: 'AI-powered governance and citizen engagement platform that streamlines government services and enhances transparency.',
      status: 'Live',
      features: ['Digital Services', 'Citizen Portal', 'Analytics Dashboard'],
      icon: '🏛️',
      color: 'from-blue-500 to-blue-600'
    },
    {
      name: 'GreenAI',
      description: 'Environmental sustainability AI that monitors climate data and provides actionable insights for conservation.',
      status: 'Beta',
      features: ['Climate Monitoring', 'Sustainability Metrics', 'Environmental Alerts'],
      icon: '🌱',
      color: 'from-green-500 to-green-600'
    },
    {
      name: 'MediGen',
      description: 'Healthcare AI platform that assists medical professionals with diagnosis and treatment recommendations.',
      status: 'Development',
      features: ['Medical Diagnosis', 'Treatment Plans', 'Health Analytics'],
      icon: '🏥',
      color: 'from-red-500 to-red-600'
    },
    {
      name: 'VoiceGhana',
      description: 'Voice AI technology that supports local Ghanaian languages for better communication and accessibility.',
      status: 'Beta',
      features: ['Local Languages', 'Voice Recognition', 'Translation'],
      icon: '🗣️',
      color: 'from-yellow-500 to-orange-500'
    },
    {
      name: 'LusiLearnAI',
      description: 'Educational AI platform that personalizes learning experiences for African students and educators.',
      status: 'Development',
      features: ['Personalized Learning', 'Progress Tracking', 'Content Creation'],
      icon: '📚',
      color: 'from-purple-500 to-purple-600'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Live':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'Beta':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Development':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <section className="py-20 lg:py-32 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <FadeInSection>
              <h2 className="text-4xl md:text-5xl font-bold text-lusitech-blue mb-6">
                Our AI Solutions
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Innovative products designed to transform Africa&apos;s future through artificial intelligence
              </p>
            </FadeInSection>
          </div>

          {/* Products Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product, index) => (
              <SlideUpSection key={index} delay={index * 0.1}>
                <motion.div
                  whileHover={{ y: -8 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card className="h-full p-8 relative overflow-hidden group">
                    {/* Background Gradient */}
                    <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-br ${product.color} opacity-10 rounded-full transform translate-x-8 -translate-y-8 group-hover:scale-150 transition-transform duration-500`} />
                    
                    {/* Status Badge */}
                    <div className="flex justify-between items-start mb-6">
                      <div className="text-4xl">{product.icon}</div>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(product.status)}`}>
                        {product.status}
                      </span>
                    </div>

                    {/* Product Info */}
                    <CardTitle className="mb-4 text-2xl">{product.name}</CardTitle>
                    <CardDescription className="mb-6 text-base leading-relaxed">
                      {product.description}
                    </CardDescription>

                    {/* Features */}
                    <div className="mb-8">
                      <h4 className="font-semibold text-gray-800 mb-3">Key Features:</h4>
                      <div className="space-y-2">
                        {product.features.map((feature, featureIndex) => (
                          <div key={featureIndex} className="flex items-center">
                            <div className="w-2 h-2 bg-lusitech-cyan rounded-full mr-3" />
                            <span className="text-gray-600 text-sm">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Action Button */}
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Button 
                        variant="outline" 
                        className="w-full group-hover:bg-lusitech-blue group-hover:text-white group-hover:border-lusitech-blue transition-all duration-300"
                      >
                        Learn More
                      </Button>
                    </motion.div>
                  </Card>
                </motion.div>
              </SlideUpSection>
            ))}
          </div>

          {/* Call to Action */}
          <SlideUpSection delay={0.8}>
            <div className="text-center mt-16">
              <p className="text-lg text-gray-600 mb-8">
                Interested in partnering with us or learning more about our solutions?
              </p>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button variant="primary" size="lg" className="px-10">
                  Explore All Solutions
                </Button>
              </motion.div>
            </div>
          </SlideUpSection>
        </div>
      </div>
    </section>
  );
};

export default ProductShowcase;