'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Button, ObjectDetectionImage } from '@/components/ui';
import { FadeInSection, SlideUpSection } from '@/components/ui/AnimatedSection';

const Hero: React.FC = () => {
  // Sample object detection data for demonstration
  const sampleBoundingBoxes = [
    {
      id: '1',
      x: 15,
      y: 20,
      width: 25,
      height: 30,
      label: 'vegetation',
      confidence: 0.92,
      color: '#10B981'
    },
    {
      id: '2',
      x: 45,
      y: 15,
      width: 20,
      height: 35,
      label: 'Relief',
      confidence: 0.88,
      color: '#3B82F6'
    },
    {
      id: '3',
      x: 70,
      y: 25,
      width: 15,
      height: 20,
      label: 'Building',
      confidence: 0.95,
      color: '#8B5CF6'
    },
    {
      id: '4',
      x: 25,
      y: 60,
      width: 30,
      height: 25,
      label: 'Vegetation',
      confidence: 0.78,
      color: '#059669'
    }
  ];

  const sampleGeospatialData = {
    latitude: -1.2921,
    longitude: 36.8219,
    altitude: 1795,
    accuracy: 5.2,
    timestamp: '2024-01-15T10:30:00.000Z', // Static timestamp to avoid hydration issues
    location: 'Nairobi, Kenya'
  };

  return (
    <section className="relative min-h-screen bg-gradient-to-br from-lusitech-blue via-lusitech-blue to-lusitech-cyan text-white overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Gradient Orbs */}
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-lusitech-cyan/20 rounded-full blur-3xl"
          animate={{
            x: [0, 100, 0],
            y: [0, -50, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-white/10 rounded-full blur-3xl"
          animate={{
            x: [0, -80, 0],
            y: [0, 60, 0],
            scale: [1, 0.8, 1],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Grid Pattern */}
        <div className="absolute inset-0 opacity-30">
          <div className="w-full h-full bg-white/5" style={{
            backgroundImage: `radial-gradient(circle, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: '60px 60px'
          }} />
        </div>

        {/* AI Detection Animated Elements */}
        
        {/* Pothole Detection Animation */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Multiple Pothole Detection Boxes - Spread across background */}
          {[
            { x: '10%', y: '15%', size: 'w-16 h-12', confidence: '92%', delay: 0 },
            { x: '75%', y: '25%', size: 'w-12 h-8', confidence: '87%', delay: 2 },
            { x: '20%', y: '70%', size: 'w-14 h-10', confidence: '89%', delay: 4 },
            { x: '80%', y: '75%', size: 'w-10 h-6', confidence: '85%', delay: 6 },
            { x: '5%', y: '45%', size: 'w-18 h-14', confidence: '94%', delay: 8 },
            { x: '90%', y: '50%', size: 'w-12 h-9', confidence: '88%', delay: 10 }
          ].map((pothole, index) => (
            <motion.div
              key={`pothole-${index}`}
              className="absolute"
              style={{ left: pothole.x, top: pothole.y }}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ 
                opacity: [0, 0.3, 0.3, 0],
                scale: [0.8, 1, 1, 0.8]
              }}
              transition={{ 
                duration: 6,
                repeat: Infinity,
                delay: pothole.delay,
                ease: "easeInOut"
              }}
            >
              <div className="relative">
                <div className={`${pothole.size} border-2 border-red-500/60 rounded-sm bg-red-500/5`}>
                  {/* Corner markers */}
                  <div className="absolute -top-1 -left-1 w-3 h-3 border-l-2 border-t-2 border-red-500/60"></div>
                  <div className="absolute -top-1 -right-1 w-3 h-3 border-r-2 border-t-2 border-red-500/60"></div>
                  <div className="absolute -bottom-1 -left-1 w-3 h-3 border-l-2 border-b-2 border-red-500/60"></div>
                  <div className="absolute -bottom-1 -right-1 w-3 h-3 border-r-2 border-b-2 border-red-500/60"></div>
                </div>
                
                {/* Detection Label */}
                <motion.div 
                  className="absolute -top-8 left-0 bg-red-500/70 text-white text-xs px-2 py-1 rounded font-medium shadow-lg"
                  animate={{ opacity: [0, 0.6, 0.6, 0] }}
                  transition={{ duration: 6, repeat: Infinity, delay: pothole.delay }}
                >
                  Pothole ({pothole.confidence})
                </motion.div>
                
                {/* Confidence Bar */}
                <div className="absolute -bottom-6 left-0 w-16 h-1 bg-gray-300 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-red-500"
                    animate={{ width: ["0%", `${pothole.confidence}`, `${pothole.confidence}`, "0%"] }}
                    transition={{ duration: 6, repeat: Infinity, delay: pothole.delay }}
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Crop Detection Animation */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Multiple Crop Detection Boxes - Spread across background */}
          {[
            { x: '60%', y: '20%', size: 'w-20 h-16', confidence: '94%', status: 'Healthy', delay: 1 },
            { x: '15%', y: '60%', size: 'w-16 h-12', confidence: '89%', status: 'Good', delay: 3 },
            { x: '85%', y: '60%', size: 'w-18 h-14', confidence: '96%', status: 'Excellent', delay: 5 },
            { x: '40%', y: '80%', size: 'w-14 h-10', confidence: '87%', status: 'Good', delay: 7 },
            { x: '70%', y: '40%', size: 'w-22 h-18', confidence: '98%', status: 'Optimal', delay: 9 },
            { x: '25%', y: '30%', size: 'w-12 h-8', confidence: '91%', status: 'Healthy', delay: 11 }
          ].map((crop, index) => (
            <motion.div
              key={`crop-${index}`}
              className="absolute"
              style={{ left: crop.x, top: crop.y }}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ 
                opacity: [0, 0.3, 0.3, 0],
                scale: [0.8, 1, 1, 0.8]
              }}
              transition={{ 
                duration: 8,
                repeat: Infinity,
                delay: crop.delay,
                ease: "easeInOut"
              }}
            >
              <div className="relative">
                <div className={`${crop.size} border-2 border-green-500/60 rounded-sm bg-green-500/5`}>
                  {/* Corner markers */}
                  <div className="absolute -top-1 -left-1 w-3 h-3 border-l-2 border-t-2 border-green-500/60"></div>
                  <div className="absolute -top-1 -right-1 w-3 h-3 border-r-2 border-t-2 border-green-500/60"></div>
                  <div className="absolute -bottom-1 -left-1 w-3 h-3 border-l-2 border-b-2 border-green-500/60"></div>
                  <div className="absolute -bottom-1 -right-1 w-3 h-3 border-r-2 border-b-2 border-green-500/60"></div>
                </div>
                
                {/* Detection Label */}
                <motion.div 
                  className="absolute -top-8 right-0 bg-green-500/70 text-white text-xs px-2 py-1 rounded font-medium shadow-lg"
                  animate={{ opacity: [0, 0.6, 0.6, 0] }}
                  transition={{ duration: 8, repeat: Infinity, delay: crop.delay }}
                >
                  {crop.status} Crop ({crop.confidence})
                </motion.div>
                
                {/* Health Status Indicator */}
                <motion.div 
                  className="absolute -bottom-6 right-0 flex items-center gap-1"
                  animate={{ opacity: [0, 1, 1, 0] }}
                  transition={{ duration: 8, repeat: Infinity, delay: crop.delay }}
                >
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-xs text-green-500 font-medium">{crop.status}</span>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Vehicle Detection Animation */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Multiple Vehicle Detection Boxes - Spread across background */}
          {[
            { x: '30%', y: '10%', size: 'w-24 h-16', confidence: '91%', type: 'Car', delay: 2 },
            { x: '70%', y: '35%', size: 'w-28 h-18', confidence: '88%', type: 'Truck', delay: 4 },
            { x: '10%', y: '80%', size: 'w-20 h-12', confidence: '93%', type: 'Motorcycle', delay: 6 },
            { x: '50%', y: '90%', size: 'w-26 h-14', confidence: '86%', type: 'Bus', delay: 8 },
            { x: '90%', y: '15%', size: 'w-22 h-15', confidence: '89%', type: 'Van', delay: 10 }
          ].map((vehicle, index) => (
            <motion.div
              key={`vehicle-${index}`}
              className="absolute"
              style={{ left: vehicle.x, top: vehicle.y }}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ 
                opacity: [0, 0.3, 0.3, 0],
                scale: [0.8, 1, 1, 0.8]
              }}
              transition={{ 
                duration: 7,
                repeat: Infinity,
                delay: vehicle.delay,
                ease: "easeInOut"
              }}
            >
              <div className="relative">
                <div className={`${vehicle.size} border-2 border-blue-500/60 rounded-sm bg-blue-500/5`}>
                  {/* Corner markers */}
                  <div className="absolute -top-1 -left-1 w-3 h-3 border-l-2 border-t-2 border-blue-500/60"></div>
                  <div className="absolute -top-1 -right-1 w-3 h-3 border-r-2 border-t-2 border-blue-500/60"></div>
                  <div className="absolute -bottom-1 -left-1 w-3 h-3 border-l-2 border-b-2 border-blue-500/60"></div>
                  <div className="absolute -bottom-1 -right-1 w-3 h-3 border-r-2 border-b-2 border-blue-500/60"></div>
                </div>
                
                {/* Detection Label */}
                <motion.div 
                  className="absolute -top-8 left-0 bg-blue-500/70 text-white text-xs px-2 py-1 rounded font-medium shadow-lg"
                  animate={{ opacity: [0, 0.6, 0.6, 0] }}
                  transition={{ duration: 7, repeat: Infinity, delay: vehicle.delay }}
                >
                  {vehicle.type} ({vehicle.confidence})
                </motion.div>
                
                {/* Speed Indicator */}
                <motion.div 
                  className="absolute -bottom-6 left-0 flex items-center gap-1"
                  animate={{ opacity: [0, 1, 1, 0] }}
                  transition={{ duration: 7, repeat: Infinity, delay: vehicle.delay }}
                >
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span className="text-xs text-blue-500 font-medium">Moving</span>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Data Points Animation */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Floating Data Points */}
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-lusitech-cyan/60 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -20, 0],
                opacity: [0.3, 1, 0.3],
                scale: [0.8, 1.2, 0.8],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>
      </div>

      {/* Hero Content */}
      <div className="relative z-10 flex items-center min-h-screen">
        <div className="container mx-auto px-4 py-24 lg:py-32">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center max-w-7xl mx-auto">
            {/* Left Column - Text Content */}
            <div className="text-center lg:text-left">
            {/* Main Headline */}
            <FadeInSection>
              <motion.h1 
                className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                Building Africa&apos;s{' '}
                <span className="bg-gradient-to-r from-lusitech-cyan to-white bg-clip-text text-transparent">
                  Future
                </span>{' '}
                with AI
              </motion.h1>
            </FadeInSection>

            {/* Subtitle */}
            <SlideUpSection delay={0.4}>
              <p className="text-lg md:text-xl lg:text-2xl mb-8 opacity-90 max-w-4xl mx-auto leading-relaxed">
                LusiTech I.T Consult - Pioneering innovative AI solutions that empower 
                African businesses and communities for sustainable growth and digital transformation
              </p>
            </SlideUpSection>

            {/* Call-to-Action Buttons */}
            <SlideUpSection delay={0.6}>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start items-center">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button 
                    variant="secondary" 
                    size="lg"
                    className="px-8 py-3 text-base font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    Explore Our Solutions
                  </Button>
                </motion.div>
                
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button 
                    variant="outline" 
                    size="lg"
                    className="px-8 py-3 text-base font-semibold border-2 border-white text-white hover:bg-white hover:text-lusitech-blue shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    Learn About Us
                  </Button>
                </motion.div>
              </div>
            </SlideUpSection>

            {/* Scroll Indicator */}
            <SlideUpSection delay={0.8}>
              <motion.div 
                className="mt-16 flex flex-col items-center"
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <p className="text-sm opacity-70 mb-2">Scroll to explore</p>
                <motion.div 
                  className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center"
                  whileHover={{ borderColor: 'rgba(255, 255, 255, 0.8)' }}
                >
                  <motion.div 
                    className="w-1 h-3 bg-white/70 rounded-full mt-2"
                    animate={{ y: [0, 12, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  />
                </motion.div>
              </motion.div>
            </SlideUpSection>

            </div>

            {/* Right Column - Object Detection Image */}
            <div className="relative">
              <SlideUpSection delay={0.8}>
                <motion.div
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 1.0 }}
                >
                  <ObjectDetectionImage
                    src="https://images.unsplash.com/photo-1544735716-392fe2489ffa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
                    alt="AI Object Detection Demo - African Urban Scene"
                    boundingBoxes={sampleBoundingBoxes}
                    geospatialData={sampleGeospatialData}
                    className="w-full h-96 lg:h-[500px] mx-auto"
                    showGeospatialInfo={true}
                    showBoundingBoxes={true}
                    interactive={true}
                  />
                  
                  {/* AI Technology Badge */}
                  <motion.div
                    className="absolute -bottom-2 -left-2 bg-lusitech-cyan text-lusitech-blue px-3 py-1 rounded-full text-xs font-semibold shadow-lg"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 1.5 }}
                  >
                    AI-Powered Detection
                  </motion.div>
                </motion.div>
              </SlideUpSection>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg 
          viewBox="0 0 1200 120" 
          preserveAspectRatio="none" 
          className="w-full h-16 md:h-20 lg:h-24"
        >
          <path 
            d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" 
            opacity=".25" 
            className="fill-white"
          />
          <path 
            d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" 
            opacity=".5" 
            className="fill-white"
          />
          <path 
            d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z" 
            className="fill-white"
          />
        </svg>
      </div>
    </section>
  );
};

export default Hero;