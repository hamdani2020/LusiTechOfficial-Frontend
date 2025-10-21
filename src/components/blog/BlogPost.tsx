'use client';

import Image from 'next/image';
import Link from 'next/link';
import { BlogPost as BlogPostType } from '@/lib/types';
import { AnimatedSection } from '@/components/ui';

interface BlogPostProps {
  post: BlogPostType;
}

export default function BlogPost({ post }: BlogPostProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const getAuthorName = () => {
    // Use author_name if available (from API response)
    if (post.author_name) {
      return post.author_name;
    }
    
    // Fallback to author object if available
    if (post.author) {
      if (post.author.first_name || post.author.last_name) {
        return `${post.author.first_name || ''} ${post.author.last_name || ''}`.trim();
      }
      return post.author.username || 'Unknown Author';
    }
    
    return 'Unknown Author';
  };

  return (
    <article className="max-w-4xl mx-auto">
      {/* Header */}
      <AnimatedSection animation="slideUp" className="mb-8">
        <div className="text-center">
          {/* Tags */}
          {post.tags && Array.isArray(post.tags) && post.tags.length > 0 && (
            <div className="flex flex-wrap justify-center gap-2 mb-6">
              {post.tags.map((tag) => (
                <Link
                  key={tag.id}
                  href={`/blog?tags=${tag.slug}`}
                  className="px-3 py-1 text-sm font-medium text-[#2D2F92] bg-blue-50 rounded-full hover:bg-blue-100 transition-colors"
                >
                  {tag.name}
                </Link>
              ))}
            </div>
          )}

          {/* Title */}
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
            {post.title}
          </h1>

          {/* Meta Information */}
          <div className="flex items-center justify-center space-x-6 text-gray-600 mb-8">
            <div className="flex items-center space-x-2">
              <span>By</span>
              <span className="font-medium text-gray-900">{getAuthorName()}</span>
            </div>
            <div className="flex items-center space-x-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span>{formatDate(post.created_at)}</span>
            </div>
            <div className="flex items-center space-x-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>{post.reading_time} min read</span>
            </div>
          </div>

          {/* Excerpt */}
          {post.excerpt && (
            <p className="text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto">
              {post.excerpt}
            </p>
          )}
        </div>
      </AnimatedSection>

      {/* Featured Image */}
      {post.featured_image && typeof post.featured_image === 'string' && (
        <AnimatedSection animation="slideUp" delay={0.1} className="mb-12">
          <div className="relative h-64 md:h-96 rounded-lg overflow-hidden">
            <Image
              src={post.featured_image}
              alt={post.title}
              fill
              className="object-cover"
              priority
            />
          </div>
        </AnimatedSection>
      )}

      {/* Content */}
      <AnimatedSection animation="slideUp" delay={0.2}>
        <div 
          className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-headings:font-bold prose-p:text-gray-700 prose-p:leading-relaxed prose-a:text-[#2D2F92] prose-a:no-underline hover:prose-a:underline prose-strong:text-gray-900 prose-code:text-[#2D2F92] prose-code:bg-gray-100 prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-pre:bg-gray-900 prose-pre:text-gray-100"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </AnimatedSection>
    </article>
  );
}