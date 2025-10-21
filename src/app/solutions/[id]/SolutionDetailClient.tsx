'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { 
  AnimatedSection, 
  FadeInSection, 
  SlideUpSection, 
  Button,
  Card,
  ProductCard,
  ImageGallery
} from '@/components/ui';
import { Product, CaseStudy } from '@/lib/types';
import { productApi, caseStudyApi, handleApiError } from '@/lib/api';

interface SolutionDetailClientProps {
  productSlug: string;
}

export default function SolutionDetailClient({ productSlug }: SolutionDetailClientProps) {
  const router = useRouter();
  
  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [caseStudies, setCaseStudies] = useState<CaseStudy[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        setLoading(true);
        setError(null);

        // Fetch product by slug
        const fetchedProduct = await productApi.getProduct(productSlug);
        setProduct(fetchedProduct);

        // Fetch all products to get related ones
        const allProducts = await productApi.getProducts();
        const related = allProducts
          .filter(p => p.id !== fetchedProduct.id)
          .slice(0, 3); // Show 3 related products
        setRelatedProducts(related);

        // Fetch case studies (we'll filter relevant ones)
        try {
          const studies = await caseStudyApi.getCaseStudies();
          setCaseStudies(studies.slice(0, 2)); // Show 2 case studies
        } catch (caseStudyError) {
          console.warn('Could not fetch case studies:', caseStudyError);
        }

      } catch (err) {
        console.error('Error fetching product:', err);
        const apiError = handleApiError(err);
        setError(apiError.message);
        
        // Fallback to mock data for development
        const mockProduct: Product = {
          id: 1,
          name: 'Sample Product',
          slug: productSlug,
          description: 'This is a sample product for development purposes.',
          detailed_description: 'This is a detailed description of the sample product. It includes comprehensive information about features, capabilities, and benefits.',
          status: 'development',
          image: '',
          features: ['Feature 1', 'Feature 2', 'Feature 3'],
          launch_date: null,
          order: 1
        };
        setProduct(mockProduct);
      } finally {
        setLoading(false);
      }
    };

    if (productSlug) {
      fetchProductData();
    } else {
      setError('Invalid product slug');
      setLoading(false);
    }
  }, [productSlug]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'live':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'beta':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'development':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'live':
        return 'Live';
      case 'beta':
        return 'Beta';
      case 'development':
        return 'In Development';
      default:
        return status;
    }
  };

  const getProductIcon = (name: string) => {
    switch (name.toLowerCase()) {
      case 'gokac':
        return '🏛️';
      case 'greenai':
        return '🌱';
      case 'medigen':
        return '🏥';
      case 'voiceghana':
        return '🗣️';
      case 'lusilearnaI':
        return '📚';
      default:
        return '🤖';
    }
  };

  const handleBackToSolutions = () => {
    router.push('/solutions');
  };

  const handleRelatedProductClick = (relatedProduct: Product) => {
    router.push(`/solutions/${relatedProduct.slug}`);
  };

  if (loading) {
    return (
      <div className="bg-white pt-16 lg:pt-20 min-h-screen">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto">
            {/* Loading Content */}
            <div className="animate-pulse">
              <div className="h-8 bg-gray-200 rounded mb-8 w-32"></div>
              <div className="h-12 bg-gray-200 rounded mb-6"></div>
              <div className="h-6 bg-gray-200 rounded mb-8 w-3/4"></div>
              <div className="grid md:grid-cols-2 gap-8 mb-12">
                <div className="h-64 bg-gray-200 rounded-lg"></div>
                <div className="space-y-4">
                  <div className="h-6 bg-gray-200 rounded"></div>
                  <div className="h-6 bg-gray-200 rounded w-5/6"></div>
                  <div className="h-6 bg-gray-200 rounded w-4/6"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="bg-white pt-16 lg:pt-20 min-h-screen">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-2xl mx-auto text-center">
            <FadeInSection>
              <div className="text-6xl mb-6">❌</div>
              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                Product Not Found
              </h1>
              <p className="text-lg text-gray-600 mb-8">
                {error || 'The product you\'re looking for doesn\'t exist or has been removed.'}
              </p>
              <Button onClick={handleBackToSolutions} variant="primary">
                Back to Solutions
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
          <div className="max-w-6xl mx-auto">
          {/* Breadcrumb */}
          <FadeInSection>
            <nav className="mb-8">
              <button
                onClick={handleBackToSolutions}
                className="text-lusitech-blue hover:text-lusitech-blue/80 font-medium flex items-center transition-colors duration-200"
              >
                ← Back to Solutions
              </button>
            </nav>
          </FadeInSection>

          {/* Product Header */}
          <div className="mb-12">
            <FadeInSection>
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
                <div className="flex items-center mb-4 md:mb-0">
                  <div className="text-5xl mr-4">{getProductIcon(product.name)}</div>
                  <div>
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-2">
                      {product.name}
                    </h1>
                    <span className={`px-4 py-2 rounded-full text-sm font-medium border ${getStatusColor(product.status)}`}>
                      {getStatusLabel(product.status)}
                    </span>
                  </div>
                </div>
                {product.launch_date && (
                  <div className="text-right">
                    <p className="text-sm text-gray-500">Launch Date</p>
                    <p className="text-lg font-semibold text-gray-900">
                      {new Date(product.launch_date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </p>
                  </div>
                )}
              </div>
              <p className="text-xl text-gray-600 leading-relaxed">
                {product.description}
              </p>
            </FadeInSection>
          </div>

          {/* Product Details */}
          <div className="grid lg:grid-cols-3 gap-12 mb-16">
            {/* Main Content */}
            <div className="lg:col-span-2">
              {/* Image Gallery */}
              <SlideUpSection>
                <Card className="p-6 mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Product Gallery</h2>
                  <ImageGallery 
                    images={product.image ? [product.image] : []} 
                    productName={product.name}
                  />
                </Card>
              </SlideUpSection>

              <SlideUpSection delay={0.1}>
                <Card className="p-8 mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">About {product.name}</h2>
                  <div className="prose prose-lg max-w-none">
                    <p className="text-gray-700 leading-relaxed">
                      {product.detailed_description}
                    </p>
                  </div>
                </Card>
              </SlideUpSection>

              {/* Technical Specifications */}
              {(product.features || product.features_list) && (product.features || product.features_list)!.length > 0 && (
                <SlideUpSection delay={0.2}>
                  <Card className="p-8">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">Key Features & Capabilities</h2>
                    <div className="grid md:grid-cols-2 gap-4">
                      {(product.features || product.features_list)!.map((feature: string, index: number) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="flex items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200"
                        >
                          <div className="w-3 h-3 bg-lusitech-cyan rounded-full mr-4 flex-shrink-0" />
                          <span className="text-gray-800 font-medium">{feature}</span>
                        </motion.div>
                      ))}
                    </div>
                  </Card>
                </SlideUpSection>
              )}

              {/* Technical Specifications */}
              <SlideUpSection delay={0.3}>
                <Card className="p-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Technical Specifications</h2>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-3">Platform</h3>
                      <ul className="space-y-2 text-gray-600">
                        <li>• Cloud-based AI platform</li>
                        <li>• RESTful API integration</li>
                        <li>• Real-time data processing</li>
                        <li>• Scalable architecture</li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-3">Security</h3>
                      <ul className="space-y-2 text-gray-600">
                        <li>• End-to-end encryption</li>
                        <li>• GDPR compliant</li>
                        <li>• Multi-factor authentication</li>
                        <li>• Regular security audits</li>
                      </ul>
                    </div>
                  </div>
                </Card>
              </SlideUpSection>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <SlideUpSection delay={0.1}>
                <Card className="p-6 mb-8">
                  <h3 className="text-xl font-bold text-gray-900 mb-6">Get Started</h3>
                  <div className="space-y-4">
                    <Button variant="primary" className="w-full">
                      Request Demo
                    </Button>
                    <Button variant="outline" className="w-full">
                      Download Brochure
                    </Button>
                    <Button variant="outline" className="w-full">
                      Contact Sales
                    </Button>
                  </div>
                </Card>
              </SlideUpSection>

              {/* Product Stats */}
              <SlideUpSection delay={0.2}>
                <Card className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-6">Product Info</h3>
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm text-gray-500">Status</p>
                      <p className="font-semibold text-gray-900">{getStatusLabel(product.status)}</p>
                    </div>
                    {product.launch_date && (
                      <div>
                        <p className="text-sm text-gray-500">Launch Date</p>
                        <p className="font-semibold text-gray-900">
                          {new Date(product.launch_date).toLocaleDateString()}
                        </p>
                      </div>
                    )}
                    <div>
                      <p className="text-sm text-gray-500">Category</p>
                      <p className="font-semibold text-gray-900">AI Solution</p>
                    </div>
                  </div>
                </Card>
              </SlideUpSection>
            </div>
          </div>

          {/* Case Studies Section */}
          {caseStudies.length > 0 && (
            <SlideUpSection delay={0.3}>
              <div className="mb-16">
                <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
                  Success Stories
                </h2>
                <div className="grid md:grid-cols-2 gap-8">
                  {caseStudies.map((study, index) => (
                    <motion.div
                      key={study.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Card className="p-6 h-full">
                        <h3 className="text-xl font-bold text-gray-900 mb-3">
                          {study.title}
                        </h3>
                        <p className="text-sm text-lusitech-blue font-medium mb-3">
                          {study.client}
                        </p>
                        <p className="text-gray-600 mb-4 line-clamp-3">
                          {study.problem || `Case study for ${study.client} in the ${study.industry} industry.`}
                        </p>
                        <Button variant="outline" size="sm">
                          Read Case Study
                        </Button>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </div>
            </SlideUpSection>
          )}

          {/* Related Products */}
          {relatedProducts.length > 0 && (
            <SlideUpSection delay={0.4}>
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
                  Related Solutions
                </h2>
                <div className="grid md:grid-cols-3 gap-8">
                  {relatedProducts.map((relatedProduct, index) => (
                    <motion.div
                      key={relatedProduct.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <ProductCard
                        product={relatedProduct}
                        onViewDetails={handleRelatedProductClick}
                      />
                    </motion.div>
                  ))}
                </div>
              </div>
            </SlideUpSection>
          )}

          {/* Call to Action */}
          <SlideUpSection delay={0.5}>
            <div className="text-center mt-16 bg-gradient-to-r from-lusitech-blue to-lusitech-cyan rounded-2xl p-12 text-white">
              <h2 className="text-3xl font-bold mb-4">
                Ready to Transform Your Business?
              </h2>
              <p className="text-xl mb-8 opacity-90">
                Get in touch with our team to learn how {product.name} can help your organization.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button variant="secondary" size="lg" className="px-8 bg-white text-lusitech-blue hover:bg-gray-100">
                    Schedule Consultation
                  </Button>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button variant="outline" size="lg" className="px-8 border-white text-white hover:bg-white hover:text-lusitech-blue">
                    View All Solutions
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