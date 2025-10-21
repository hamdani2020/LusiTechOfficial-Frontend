'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui';
import AnimatedSection, { SlideUpSection, FadeInSection } from '@/components/ui/AnimatedSection';

const MarketTraction: React.FC = () => {
  const marketStats = [
    {
      title: 'African AI Market Size',
      value: '$2.9B',
      growth: '+35% YoY',
      description: 'Projected to reach $10B by 2030',
      icon: '📈',
      color: 'from-green-500 to-green-600'
    },
    {
      title: 'Digital Transformation',
      value: '78%',
      growth: 'of businesses',
      description: 'Actively seeking AI solutions',
      icon: '🚀',
      color: 'from-blue-500 to-blue-600'
    },
    {
      title: 'Mobile Penetration',
      value: '84%',
      growth: '+12% YoY',
      description: 'Creating massive AI opportunities',
      icon: '📱',
      color: 'from-purple-500 to-purple-600'
    },
    {
      title: 'Youth Population',
      value: '60%',
      growth: 'under 25',
      description: 'Tech-savvy and AI-ready workforce',
      icon: '👥',
      color: 'from-orange-500 to-orange-600'
    }
  ];

  const tractionMetrics = [
    {
      metric: 'Revenue Growth',
      value: '300%',
      period: 'Year over Year',
      trend: 'up',
      description: 'Consistent growth across all product lines'
    },
    {
      metric: 'Client Retention',
      value: '95%',
      period: 'Annual Rate',
      trend: 'up',
      description: 'High satisfaction and long-term partnerships'
    },
    {
      metric: 'Market Expansion',
      value: '5',
      period: 'New Countries',
      trend: 'up',
      description: 'Expanding across West and East Africa'
    },
    {
      metric: 'Product Adoption',
      value: '10K+',
      period: 'Active Users',
      trend: 'up',
      description: 'Growing user base across all platforms'
    }
  ];

  const milestones = [
    {
      year: '2022',
      title: 'Company Founded',
      description: 'LusiTech established with vision for African AI',
      status: 'completed'
    },
    {
      year: '2023',
      title: 'First Product Launch',
      description: 'GOKAC platform deployed in Ghana',
      status: 'completed'
    },
    {
      year: '2024',
      title: 'Series A Funding',
      description: 'Secured $2M for product development and expansion',
      status: 'completed'
    },
    {
      year: '2025',
      title: 'Regional Expansion',
      description: 'Launching in 5 additional African countries',
      status: 'in-progress'
    }
  ];

  return (
    <section className="py-20 lg:py-32 bg-gradient-to-br from-gray-50 to-white">
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <FadeInSection>
              <h2 className="text-4xl md:text-5xl font-bold text-lusitech-blue mb-6">
                Market Opportunity & Traction
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Positioned at the forefront of Africa&apos;s AI revolution with proven growth and market validation
              </p>
            </FadeInSection>
          </div>

          {/* Market Opportunity */}
          <div className="mb-20">
            <SlideUpSection delay={0.2}>
              <h3 className="text-2xl lg:text-3xl font-bold text-center text-lusitech-blue mb-12">
                The African AI Opportunity
              </h3>
            </SlideUpSection>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {marketStats.map((stat, index) => (
                <SlideUpSection key={index} delay={0.3 + index * 0.1}>
                  <motion.div
                    whileHover={{ y: -8, scale: 1.02 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Card className="p-6 text-center h-full relative overflow-hidden">
                      {/* Background Gradient */}
                      <div className={`absolute top-0 right-0 w-20 h-20 bg-gradient-to-br ${stat.color} opacity-10 rounded-full transform translate-x-6 -translate-y-6`} />
                      
                      <div className="relative z-10">
                        <div className="text-4xl mb-4">{stat.icon}</div>
                        <h4 className="font-bold text-lusitech-blue mb-2">{stat.title}</h4>
                        <div className="text-3xl font-bold text-lusitech-cyan mb-1">{stat.value}</div>
                        <div className="text-sm font-semibold text-green-600 mb-3">{stat.growth}</div>
                        <p className="text-gray-600 text-sm">{stat.description}</p>
                      </div>
                    </Card>
                  </motion.div>
                </SlideUpSection>
              ))}
            </div>
          </div>

          {/* Traction Metrics */}
          <div className="mb-20">
            <SlideUpSection delay={0.4}>
              <h3 className="text-2xl lg:text-3xl font-bold text-center text-lusitech-blue mb-12">
                Our Proven Traction
              </h3>
            </SlideUpSection>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {tractionMetrics.map((metric, index) => (
                <SlideUpSection key={index} delay={0.5 + index * 0.1}>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Card className="p-6 text-center bg-white border-2 border-lusitech-blue/10 hover:border-lusitech-blue/30 transition-colors duration-300">
                      <div className="flex items-center justify-center mb-4">
                        <motion.div
                          className="text-2xl font-bold text-lusitech-blue"
                          initial={{ opacity: 0, scale: 0.5 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                          viewport={{ once: true }}
                        >
                          {metric.value}
                        </motion.div>
                        <svg className="w-5 h-5 text-green-500 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17l9.2-9.2M17 17V7H7" />
                        </svg>
                      </div>
                      <h4 className="font-bold text-gray-800 mb-2">{metric.metric}</h4>
                      <p className="text-sm text-lusitech-cyan font-semibold mb-3">{metric.period}</p>
                      <p className="text-gray-600 text-sm">{metric.description}</p>
                    </Card>
                  </motion.div>
                </SlideUpSection>
              ))}
            </div>
          </div>

          {/* Milestones Timeline */}
          <SlideUpSection delay={0.6}>
            <div className="bg-white rounded-2xl p-8 lg:p-12 shadow-lg">
              <h3 className="text-2xl lg:text-3xl font-bold text-center text-lusitech-blue mb-12">
                Key Milestones
              </h3>
              
              <div className="relative">
                {/* Timeline Line */}
                <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-lusitech-blue/20" />
                
                <div className="space-y-8">
                  {milestones.map((milestone, index) => (
                    <motion.div
                      key={index}
                      className="relative flex items-start"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: 0.7 + index * 0.1 }}
                      viewport={{ once: true }}
                    >
                      {/* Timeline Dot */}
                      <div className={`relative z-10 w-4 h-4 rounded-full border-4 ${
                        milestone.status === 'completed' 
                          ? 'bg-lusitech-blue border-lusitech-blue' 
                          : 'bg-white border-lusitech-cyan'
                      } mr-6 mt-1`}>
                        {milestone.status === 'completed' && (
                          <svg className="w-2 h-2 text-white absolute top-0.5 left-0.5" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        )}
                      </div>
                      
                      {/* Milestone Content */}
                      <div className="flex-1">
                        <div className="flex items-center mb-2">
                          <span className="text-sm font-bold text-lusitech-cyan bg-lusitech-cyan/10 px-3 py-1 rounded-full mr-4">
                            {milestone.year}
                          </span>
                          <h4 className="text-lg font-bold text-lusitech-blue">
                            {milestone.title}
                          </h4>
                        </div>
                        <p className="text-gray-600">
                          {milestone.description}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </SlideUpSection>
        </div>
      </div>
    </section>
  );
};

export default MarketTraction;