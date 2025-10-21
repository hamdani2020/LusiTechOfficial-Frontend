'use client';

import { useState, useEffect } from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { AnimatedSection } from '@/components/ui';
import { BlogPost, SocialShare, RelatedPosts } from '@/components/blog';
import { blogApi, handleApiError } from '@/lib/api';
import { BlogPost as BlogPostType } from '@/lib/types';

interface BlogPostClientProps {
  slug: string;
}

export default function BlogPostClient({ slug }: BlogPostClientProps) {
  const [post, setPost] = useState<BlogPostType | null>(null);
  const [relatedPosts, setRelatedPosts] = useState<BlogPostType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Fetch the blog post
        const postData = await blogApi.getPost(slug);
        setPost(postData);
        
        // Fetch related posts
        try {
          const related = await blogApi.getRelatedPosts(slug, 3);
          setRelatedPosts(related);
        } catch (relatedError) {
          // Related posts are optional, don't fail the whole page
          console.warn('Failed to fetch related posts:', handleApiError(relatedError));
        }
        
      } catch (err) {
        const apiError = handleApiError(err);
        if (apiError.status === 404 || apiError.message.includes('not found')) {
          notFound();
        } else {
          setError(apiError.message);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [slug]);

  // Generate current URL for sharing
  const currentUrl = typeof window !== 'undefined' 
    ? window.location.href 
    : `https://lusitech.com/blog/${slug}`;

  if (loading) {
    return (
      <div className="bg-white pt-16 lg:pt-20">
        <div className="container mx-auto px-4 py-16">
          <div className="flex justify-center items-center py-16">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#2D2F92]"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white pt-16 lg:pt-20">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-2xl mx-auto text-center">
            <div className="bg-red-50 border border-red-200 rounded-lg p-8">
              <svg className="mx-auto h-12 w-12 text-red-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
              <h1 className="text-2xl font-bold text-red-800 mb-2">Error Loading Article</h1>
              <p className="text-red-700 mb-6">{error}</p>
              <Link
                href="/blog"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-[#2D2F92] hover:bg-[#1e1f6b] transition-colors"
              >
                ← Back to Blog
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!post) {
    return notFound();
  }

  return (
    <div className="bg-white pt-16 lg:pt-20">
      <div className="container mx-auto px-4 py-16">
        {/* Breadcrumb */}
        <AnimatedSection animation="slideUp" className="mb-8">
          <nav className="flex items-center space-x-2 text-sm text-gray-600">
            <Link href="/" className="hover:text-[#2D2F92] transition-colors">
              Home
            </Link>
            <span>/</span>
            <Link href="/blog" className="hover:text-[#2D2F92] transition-colors">
              Blog
            </Link>
            <span>/</span>
            <span className="text-gray-900">{post.title}</span>
          </nav>
        </AnimatedSection>

        {/* Blog Post Content */}
        <BlogPost post={post} />

        {/* Social Share */}
        <AnimatedSection animation="slideUp" delay={0.3} className="mt-12 pt-8 border-t border-gray-200">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <SocialShare
              title={post.title}
              url={currentUrl}
              description={post.excerpt}
            />
            
            <Link
              href="/blog"
              className="mt-4 sm:mt-0 inline-flex items-center text-[#2D2F92] hover:text-[#00ACF8] transition-colors"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to Blog
            </Link>
          </div>
        </AnimatedSection>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <AnimatedSection animation="slideUp" delay={0.4}>
            <RelatedPosts posts={relatedPosts} />
          </AnimatedSection>
        )}

        {/* Newsletter Signup (Optional) */}
        <AnimatedSection animation="slideUp" delay={0.5} className="mt-16 pt-16 border-t border-gray-200">
          <div className="bg-gradient-to-r from-[#2D2F92] to-[#00ACF8] rounded-lg p-8 text-center text-white">
            <h3 className="text-2xl font-bold mb-4">Stay Updated with LusiTech</h3>
            <p className="text-lg mb-6 opacity-90">
              Get the latest insights on AI technology and innovation delivered to your inbox.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center px-6 py-3 bg-white text-[#2D2F92] font-medium rounded-lg hover:bg-gray-100 transition-colors"
            >
              Subscribe to Updates
            </Link>
          </div>
        </AnimatedSection>
      </div>
    </div>
  );
}