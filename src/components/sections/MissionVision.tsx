'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { AnimatedSection, SlideUpSection, FadeInSection } from '@/components/ui/AnimatedSection';

const MissionVision: React.FC = () => {
  return (
    <section className="py-20 lg:py-32 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <FadeInSection>
              <h2 className="text-4xl md:text-5xl font-bold text-lusitech-blue mb-6">
                Our Mission & Vision
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Driving Africa&apos;s digital transformation through innovative AI solutions
              </p>
            </FadeInSection>
          </div>

          {/* Mission and Vision Cards */}
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
            {/* Mission */}
            <SlideUpSection delay={0.2}>
              <motion.div 
                className="relative p-8 lg:p-10 bg-gradient-to-br from-lusitech-blue/5 to-lusitech-cyan/5 rounded-2xl border border-lusitech-blue/10"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <div className="absolute top-6 left-6 w-12 h-12 bg-lusitech-blue rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <div className="mt-8">
                  <h3 className="text-2xl lg:text-3xl font-bold text-lusitech-blue mb-6">
                    Our Mission
                  </h3>
                  <p className="text-lg text-gray-700 leading-relaxed mb-6">
                    We are dedicated to developing cutting-edge AI solutions that address the unique challenges 
                    and opportunities across Africa. From healthcare to education, agriculture to governance, 
                    our technology is designed to empower communities and drive sustainable development.
                  </p>
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <div className="w-2 h-2 bg-lusitech-cyan rounded-full mr-3"></div>
                      <span className="text-gray-600">Empower African communities through AI</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-2 h-2 bg-lusitech-cyan rounded-full mr-3"></div>
                      <span className="text-gray-600">Drive sustainable digital transformation</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-2 h-2 bg-lusitech-cyan rounded-full mr-3"></div>
                      <span className="text-gray-600">Bridge the technology gap in Africa</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </SlideUpSection>

            {/* Vision */}
            <SlideUpSection delay={0.4}>
              <motion.div 
                className="relative p-8 lg:p-10 bg-gradient-to-br from-lusitech-cyan/5 to-lusitech-blue/5 rounded-2xl border border-lusitech-cyan/10"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <div className="absolute top-6 left-6 w-12 h-12 bg-lusitech-cyan rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                </div>
                <div className="mt-8">
                  <h3 className="text-2xl lg:text-3xl font-bold text-lusitech-cyan mb-6">
                    Our Vision
                  </h3>
                  <p className="text-lg text-gray-700 leading-relaxed mb-6">
                    To be Africa&apos;s leading AI innovation hub, creating intelligent solutions that transform 
                    industries, improve lives, and position the continent as a global leader in artificial 
                    intelligence and digital innovation.
                  </p>
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <div className="w-2 h-2 bg-lusitech-blue rounded-full mr-3"></div>
                      <span className="text-gray-600">Lead Africa&apos;s AI revolution</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-2 h-2 bg-lusitech-blue rounded-full mr-3"></div>
                      <span className="text-gray-600">Transform industries across the continent</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-2 h-2 bg-lusitech-blue rounded-full mr-3"></div>
                      <span className="text-gray-600">Position Africa as a global AI leader</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </SlideUpSection>
          </div>

          {/* Impact Stats */}
          <SlideUpSection delay={0.6}>
            <div className="mt-20 grid grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="text-center">
                <motion.div 
                  className="text-3xl lg:text-4xl font-bold text-lusitech-blue mb-2"
                  initial={{ opacity: 0, scale: 0.5 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.8 }}
                  viewport={{ once: true }}
                >
                  5+
                </motion.div>
                <p className="text-gray-600 font-medium">AI Products</p>
              </div>
              <div className="text-center">
                <motion.div 
                  className="text-3xl lg:text-4xl font-bold text-lusitech-cyan mb-2"
                  initial={{ opacity: 0, scale: 0.5 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 1.0 }}
                  viewport={{ once: true }}
                >
                  10K+
                </motion.div>
                <p className="text-gray-600 font-medium">Users Impacted</p>
              </div>
              <div className="text-center">
                <motion.div 
                  className="text-3xl lg:text-4xl font-bold text-lusitech-blue mb-2"
                  initial={{ opacity: 0, scale: 0.5 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 1.2 }}
                  viewport={{ once: true }}
                >
                  3
                </motion.div>
                <p className="text-gray-600 font-medium">Countries</p>
              </div>
              <div className="text-center">
                <motion.div 
                  className="text-3xl lg:text-4xl font-bold text-lusitech-cyan mb-2"
                  initial={{ opacity: 0, scale: 0.5 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 1.4 }}
                  viewport={{ once: true }}
                >
                  24/7
                </motion.div>
                <p className="text-gray-600 font-medium">AI Support</p>
              </div>
            </div>
          </SlideUpSection>
        </div>
      </div>
    </section>
  );
};

export default MissionVision;