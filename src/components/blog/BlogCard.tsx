'use client';

import Link from 'next/link';
import Image from 'next/image';
import { BlogPost } from '@/lib/types';
import { Card } from '@/components/ui';

interface BlogCardProps {
  post: BlogPost;
  featured?: boolean;
}

export default function BlogCard({ post, featured = false }: BlogCardProps) {
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
    <Card 
      className={`group overflow-hidden ${
        featured ? 'md:col-span-2 lg:col-span-2' : ''
      }`} 
      hover
    >
      <Link href={`/blog/${post.slug}`} className="block">
        {post.featured_image && typeof post.featured_image === 'string' && (
          <div className={`relative overflow-hidden ${
            featured ? 'h-64 md:h-80' : 'h-48'
          }`}>
            <Image
              src={post.featured_image}
              alt={post.title}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </div>
        )}
        
        <div className="p-6">
          {/* Tags */}
          {post.tags && Array.isArray(post.tags) && post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-3">
              {post.tags.slice(0, 3).map((tag) => (
                <span
                  key={tag.id}
                  className="px-2 py-1 text-xs font-medium text-[#2D2F92] bg-blue-50 rounded-full"
                >
                  {tag.name}
                </span>
              ))}
            </div>
          )}

          {/* Title */}
          <h3 className={`font-bold text-gray-900 mb-3 group-hover:text-[#2D2F92] transition-colors ${
            featured ? 'text-xl md:text-2xl' : 'text-lg'
          }`}>
            {post.title}
          </h3>

          {/* Excerpt */}
          <p className={`text-gray-600 mb-4 ${
            featured ? 'text-base' : 'text-sm'
          }`}>
            {post.excerpt}
          </p>

          {/* Meta information */}
          <div className="flex items-center justify-between text-sm text-gray-500">
            <div className="flex items-center space-x-4">
              <span>By {getAuthorName()}</span>
              <span>{formatDate(post.created_at)}</span>
            </div>
            <span>{post.reading_time} min read</span>
          </div>
        </div>
      </Link>
    </Card>
  );
}