'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

interface BoundingBox {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
  label: string;
  confidence: number;
  color: string;
}

interface GeospatialData {
  latitude: number;
  longitude: number;
  altitude?: number;
  accuracy?: number;
  timestamp: string;
  location?: string;
}

interface ObjectDetectionImageProps {
  src: string;
  alt: string;
  boundingBoxes: BoundingBox[];
  geospatialData: GeospatialData;
  className?: string;
  showGeospatialInfo?: boolean;
  showBoundingBoxes?: boolean;
  interactive?: boolean;
}

const ObjectDetectionImage: React.FC<ObjectDetectionImageProps> = ({
  src,
  alt,
  boundingBoxes,
  geospatialData,
  className = '',
  showGeospatialInfo = true,
  showBoundingBoxes = true,
  interactive = true,
}) => {
  const [hoveredBox, setHoveredBox] = useState<string | null>(null);
  const [selectedBox, setSelectedBox] = useState<string | null>(null);
  const [imageLoaded, setImageLoaded] = useState(false);
  const imageRef = useRef<HTMLDivElement>(null);
  const [imageDimensions, setImageDimensions] = useState({ width: 0, height: 0 });

  // Calculate image dimensions when loaded
  useEffect(() => {
    if (imageLoaded && imageRef.current) {
      const rect = imageRef.current.getBoundingClientRect();
      setImageDimensions({ width: rect.width, height: rect.height });
    }
  }, [imageLoaded]);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      if (imageRef.current) {
        const rect = imageRef.current.getBoundingClientRect();
        setImageDimensions({ width: rect.width, height: rect.height });
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const formatCoordinate = (coord: number, precision: number = 6) => {
    return coord.toFixed(precision);
  };

  const formatLocation = (lat: number, lng: number) => {
    const latDir = lat >= 0 ? 'N' : 'S';
    const lngDir = lng >= 0 ? 'E' : 'W';
    return `${Math.abs(lat).toFixed(4)}°${latDir}, ${Math.abs(lng).toFixed(4)}°${lngDir}`;
  };

  const formatTimestamp = (timestamp: string) => {
    try {
      return new Date(timestamp).toLocaleString();
    } catch (error) {
      return timestamp; // Fallback to original string if parsing fails
    }
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 0.8) return '#10B981'; // green
    if (confidence >= 0.6) return '#F59E0B'; // yellow
    return '#EF4444'; // red
  };

  return (
    <div className={`relative group ${className}`}>
      {/* Main Image Container */}
      <div 
        ref={imageRef}
        className="relative overflow-hidden rounded-lg shadow-2xl w-full h-full"
      >
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          onLoad={() => setImageLoaded(true)}
          priority
        />

        {/* Bounding Boxes Overlay */}
        {showBoundingBoxes && imageLoaded && (
          <div className="absolute inset-0">
            {boundingBoxes.map((box) => {
              const isHovered = hoveredBox === box.id;
              const isSelected = selectedBox === box.id;
              
              return (
                <motion.div
                  key={box.id}
                  className="absolute border-2 cursor-pointer transition-all duration-200"
                  style={{
                    left: `${box.x}%`,
                    top: `${box.y}%`,
                    width: `${box.width}%`,
                    height: `${box.height}%`,
                    borderColor: isHovered || isSelected ? box.color : `${box.color}80`,
                    backgroundColor: isHovered || isSelected ? `${box.color}20` : 'transparent',
                  }}
                  onMouseEnter={() => interactive && setHoveredBox(box.id)}
                  onMouseLeave={() => interactive && setHoveredBox(null)}
                  onClick={() => interactive && setSelectedBox(selectedBox === box.id ? null : box.id)}
                  whileHover={{ scale: 1.02 }}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Label */}
                  <div
                    className="absolute -top-8 left-0 px-2 py-1 text-xs font-semibold text-white rounded-md shadow-lg"
                    style={{ backgroundColor: box.color }}
                  >
                    {box.label} ({(box.confidence * 100).toFixed(1)}%)
                  </div>

                  {/* Confidence Indicator */}
                  <div
                    className="absolute -top-1 -right-1 w-3 h-3 rounded-full border-2 border-white"
                    style={{ backgroundColor: getConfidenceColor(box.confidence) }}
                  />
                </motion.div>
              );
            })}
          </div>
        )}

        {/* Geospatial Overlay */}
        {showGeospatialInfo && (
          <motion.div
            className="absolute top-4 right-4 bg-black/80 backdrop-blur-sm text-white p-3 rounded-lg shadow-lg"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
          >
            <div className="flex items-center gap-2 mb-2">
              <div className="w-2 h-2 bg-lusitech-cyan rounded-full animate-pulse" />
              <span className="text-sm font-semibold">Geospatial Data</span>
            </div>
            <div className="space-y-1 text-xs">
              <div>{formatLocation(geospatialData.latitude, geospatialData.longitude)}</div>
              {geospatialData.altitude && (
                <div>{geospatialData.altitude.toFixed(1)}m altitude</div>
              )}
              {geospatialData.accuracy && (
                <div>±{geospatialData.accuracy.toFixed(1)}m accuracy</div>
              )}
              <div className="text-lusitech-cyan/80">
                {formatTimestamp(geospatialData.timestamp)}
              </div>
            </div>
          </motion.div>
        )}

        {/* Detection Stats */}
        <motion.div
          className="absolute bottom-4 left-4 bg-black/80 backdrop-blur-sm text-white p-3 rounded-lg shadow-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          <div className="flex items-center gap-2 mb-2">
            <div className="w-2 h-2 bg-lusitech-cyan rounded-full" />
            <span className="text-sm font-semibold">AI Detection</span>
          </div>
          <div className="text-xs space-y-1">
            <div>{boundingBoxes.length} objects detected</div>
            <div className="text-lusitech-cyan/80">
              Avg confidence: {((boundingBoxes.reduce((sum, box) => sum + box.confidence, 0) / boundingBoxes.length) * 100).toFixed(1)}%
            </div>
          </div>
        </motion.div>
      </div>

      {/* Detailed Info Panel */}
      <AnimatePresence>
        {selectedBox && (
          <motion.div
            className="absolute top-full left-0 right-0 mt-4 bg-white dark:bg-gray-800 rounded-lg shadow-xl p-4 z-10"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            {(() => {
              const box = boundingBoxes.find(b => b.id === selectedBox);
              if (!box) return null;
              
              return (
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      {box.label}
                    </h3>
                    <button
                      onClick={() => setSelectedBox(null)}
                      className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                    >
                      ✕
                    </button>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-500 dark:text-gray-400">Confidence:</span>
                      <div className="flex items-center gap-2 mt-1">
                        <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                          <div
                            className="h-2 rounded-full transition-all duration-300"
                            style={{
                              width: `${box.confidence * 100}%`,
                              backgroundColor: getConfidenceColor(box.confidence),
                            }}
                          />
                        </div>
                        <span className="font-medium">{(box.confidence * 100).toFixed(1)}%</span>
                      </div>
                    </div>
                    
                    <div>
                      <span className="text-gray-500 dark:text-gray-400">Position:</span>
                      <div className="mt-1">
                        <div>X: {box.x.toFixed(1)}%</div>
                        <div>Y: {box.y.toFixed(1)}%</div>
                        <div>W: {box.width.toFixed(1)}%</div>
                        <div>H: {box.height.toFixed(1)}%</div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="pt-2 border-t border-gray-200 dark:border-gray-700">
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      <div>Location: {formatLocation(geospatialData.latitude, geospatialData.longitude)}</div>
                      <div>Detected: {formatTimestamp(geospatialData.timestamp)}</div>
                    </div>
                  </div>
                </div>
              );
            })()}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ObjectDetectionImage;

