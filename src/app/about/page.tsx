'use client';

import React from 'react';
import { FadeInSection, SlideUpSection } from '@/components/ui/AnimatedSection';
import { MissionVision, MarketTraction } from '@/components/sections';
import { motion } from 'framer-motion';

export default function AboutPage() {
  const companyValues = [
    {
      title: 'Innovation First',
      description: 'We push the boundaries of what\'s possible with AI, creating solutions that didn\'t exist before.',
      icon: '💡',
      color: 'from-yellow-400 to-orange-500'
    },
    {
      title: 'African-Centric',
      description: 'Every solution we build is designed specifically for African contexts, challenges, and opportunities.',
      icon: '🌍',
      color: 'from-green-400 to-blue-500'
    },
    {
      title: 'Ethical AI',
      description: 'We believe in responsible AI development that respects privacy, promotes fairness, and builds trust.',
      icon: '⚖️',
      color: 'from-blue-400 to-purple-500'
    },
    {
      title: 'Community Impact',
      description: 'Our success is measured by the positive impact we create in African communities.',
      icon: '🤝',
      color: 'from-purple-400 to-pink-500'
    }
  ];

  const companyHistory = [
    {
      year: '2022',
      title: 'The Vision Begins',
      description: 'Founded with the mission to bridge Africa\'s AI gap and create locally-relevant solutions.',
      milestone: 'Company Founded'
    },
    {
      year: '2023',
      title: 'First Breakthrough',
      description: 'Launched GOKAC, our first AI platform, serving thousands of users across Ghana.',
      milestone: 'Product Launch'
    },
    {
      year: '2024',
      title: 'Scaling Impact',
      description: 'Expanded to multiple countries and launched 4 additional AI products.',
      milestone: 'Regional Expansion'
    },
    {
      year: '2025',
      title: 'Leading the Future',
      description: 'Positioned as Africa\'s premier AI innovation hub with continental reach.',
      milestone: 'Market Leadership'
    }
  ];

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="pt-20 lg:pt-28 pb-16 lg:pb-20 bg-gradient-to-br from-lusitech-blue/5 via-white to-lusitech-cyan/5">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <FadeInSection>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-lusitech-blue mb-6">
                About LusiTech I.T Consult
              </h1>
              <p className="text-xl lg:text-2xl text-gray-600 mb-8 leading-relaxed">
                We are pioneering the future of artificial intelligence in Africa, creating innovative solutions 
                that address real challenges and unlock unprecedented opportunities across the continent.
              </p>
              <div className="inline-flex items-center px-6 py-3 bg-lusitech-blue/10 rounded-full text-lusitech-blue font-semibold">
                <span className="w-2 h-2 bg-lusitech-cyan rounded-full mr-3 animate-pulse"></span>
                Building Africa's Future with AI
              </div>
            </FadeInSection>
          </div>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <MissionVision />

      {/* Company Values */}
      <section className="py-20 lg:py-32 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <FadeInSection>
                <h2 className="text-4xl md:text-5xl font-bold text-lusitech-blue mb-6">
                  Our Core Values
                </h2>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                  The principles that guide everything we do and every solution we create
                </p>
              </FadeInSection>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {companyValues.map((value, index) => (
                <SlideUpSection key={index} delay={0.2 + index * 0.1}>
                  <motion.div
                    className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300 h-full relative overflow-hidden"
                    whileHover={{ y: -8 }}
                    transition={{ duration: 0.3 }}
                  >
                    {/* Background Gradient */}
                    <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-br ${value.color} opacity-10 rounded-full transform translate-x-8 -translate-y-8`} />
                    
                    <div className="relative z-10">
                      <div className="text-4xl mb-6">{value.icon}</div>
                      <h3 className="text-xl font-bold text-lusitech-blue mb-4">
                        {value.title}
                      </h3>
                      <p className="text-gray-600 leading-relaxed">
                        {value.description}
                      </p>
                    </div>
                  </motion.div>
                </SlideUpSection>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Company History */}
      <section className="py-20 lg:py-32 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <FadeInSection>
                <h2 className="text-4xl md:text-5xl font-bold text-lusitech-blue mb-6">
                  Our Journey
                </h2>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                  From a bold vision to Africa's leading AI innovation hub
                </p>
              </FadeInSection>
            </div>

            <div className="relative">
              {/* Timeline Line */}
              <div className="absolute left-1/2 transform -translate-x-px top-0 bottom-0 w-0.5 bg-gradient-to-b from-lusitech-blue via-lusitech-cyan to-lusitech-blue" />
              
              <div className="space-y-16">
                {companyHistory.map((item, index) => (
                  <SlideUpSection key={index} delay={0.3 + index * 0.2}>
                    <motion.div
                      className={`relative flex items-center ${
                        index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'
                      }`}
                      initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                      viewport={{ once: true }}
                    >
                      {/* Timeline Dot */}
                      <div className="absolute left-1/2 transform -translate-x-1/2 w-6 h-6 bg-lusitech-blue rounded-full border-4 border-white shadow-lg z-10">
                        <div className="w-full h-full bg-lusitech-cyan rounded-full animate-pulse" />
                      </div>
                      
                      {/* Content Card */}
                      <div className={`w-5/12 ${index % 2 === 0 ? 'pr-8' : 'pl-8'}`}>
                        <motion.div
                          className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100"
                          whileHover={{ scale: 1.02 }}
                          transition={{ duration: 0.3 }}
                        >
                          <div className="flex items-center mb-4">
                            <span className="text-2xl font-bold text-lusitech-cyan bg-lusitech-cyan/10 px-4 py-2 rounded-full">
                              {item.year}
                            </span>
                            <span className="ml-4 text-sm font-semibold text-lusitech-blue bg-lusitech-blue/10 px-3 py-1 rounded-full">
                              {item.milestone}
                            </span>
                          </div>
                          <h3 className="text-2xl font-bold text-lusitech-blue mb-4">
                            {item.title}
                          </h3>
                          <p className="text-gray-600 leading-relaxed">
                            {item.description}
                          </p>
                        </motion.div>
                      </div>
                      
                      {/* Empty space for alternating layout */}
                      <div className="w-5/12" />
                    </motion.div>
                  </SlideUpSection>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Market Opportunity & Traction */}
      <MarketTraction />

      {/* Call to Action */}
      <section className="py-20 lg:py-32 bg-gradient-to-r from-lusitech-blue to-lusitech-cyan">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center text-white">
            <SlideUpSection>
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Ready to Build the Future Together?
              </h2>
              <p className="text-xl mb-8 opacity-90">
                Join us in our mission to transform Africa through innovative AI solutions. 
                Whether you're a potential partner, client, or team member, we'd love to hear from you.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <motion.a
                  href="/contact"
                  className="inline-flex items-center justify-center px-8 py-4 bg-white text-lusitech-blue font-semibold rounded-full hover:bg-gray-100 transition-colors duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Get in Touch
                  <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </motion.a>
                <motion.a
                  href="/partnerships"
                  className="inline-flex items-center justify-center px-8 py-4 border-2 border-white text-white font-semibold rounded-full hover:bg-white hover:text-lusitech-blue transition-colors duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Explore Partnerships
                </motion.a>
              </div>
            </SlideUpSection>
          </div>
        </div>
      </section>
    </div>
  );
}