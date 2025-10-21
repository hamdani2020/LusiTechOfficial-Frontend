'use client';

import { BlogPost } from '@/lib/types';
import BlogCard from './BlogCard';

interface BlogGridProps {
  posts: BlogPost[];
  featuredPost?: BlogPost;
}

export default function BlogGrid({ posts, featuredPost }: BlogGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {/* Featured Post */}
      {featuredPost && (
        <BlogCard post={featuredPost} featured />
      )}
      
      {/* Regular Posts */}
      {posts.map((post) => (
        <BlogCard key={post.id} post={post} />
      ))}
    </div>
  );
}