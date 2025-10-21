'use client';

import { useState, useEffect } from 'react';
import type { Metadata } from 'next';
import { AnimatedSection } from '@/components/ui';
import { BlogGrid, BlogFilters, BlogPagination } from '@/components/blog';
import { blogApi, handleApiError } from '@/lib/api';
import { BlogPost, Tag, PaginatedResponse } from '@/lib/types';

// Note: Since this is now a client component, metadata should be handled differently
// We'll add proper SEO handling in a future enhancement

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [featuredPost, setFeaturedPost] = useState<BlogPost | undefined>(undefined);
  const [tags, setTags] = useState<Tag[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Filter states
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);

  // Pagination states
  const [totalPages, setTotalPages] = useState(1);
  const [hasNext, setHasNext] = useState(false);
  const [hasPrevious, setHasPrevious] = useState(false);
  const [totalCount, setTotalCount] = useState(0);

  const postsPerPage = 9;

  // Fetch posts with current filters
  const fetchPosts = async (page = 1, search = '', tagFilters: string[] = []) => {
    try {
      setLoading(true);
      setError(null);

      const response: PaginatedResponse<BlogPost> = await blogApi.getPosts(
        page,
        postsPerPage,
        search || undefined,
        tagFilters.length > 0 ? tagFilters : undefined
      );

      setPosts(response.results);
      setTotalCount(response.count);
      setTotalPages(Math.ceil(response.count / postsPerPage));
      setHasNext(!!response.next);
      setHasPrevious(!!response.previous);

      // Set featured post (first post on first page with no filters)
      if (page === 1 && !search && tagFilters.length === 0 && response.results.length > 0) {
        setFeaturedPost(response.results[0]);
        setPosts(response.results.slice(1));
      } else {
        setFeaturedPost(undefined);
      }

    } catch (err) {
      const apiError = handleApiError(err);
      setError(apiError.message);
      setPosts([]);
      setFeaturedPost(undefined);
    } finally {
      setLoading(false);
    }
  };

  // Fetch tags
  const fetchTags = async () => {
    try {
      const tagsData = await blogApi.getTags();
      setTags(tagsData);
    } catch (err) {
      const apiError = handleApiError(err);
      console.error('Failed to fetch tags:', apiError.message);
    }
  };

  // Initial data fetch
  useEffect(() => {
    fetchPosts();
    fetchTags();
  }, []);

  // Handle filter changes
  useEffect(() => {
    setCurrentPage(1);
    fetchPosts(1, searchQuery, selectedTags);
  }, [searchQuery, selectedTags]);

  // Handle page changes
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    fetchPosts(page, searchQuery, selectedTags);
    // Scroll to top of blog section
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const hasActiveFilters = searchQuery.length > 0 || selectedTags.length > 0;

  return (
    <div className="bg-white pt-16 lg:pt-20">
      <div className="container mx-auto px-4 py-16">
        {/* Header */}
        <AnimatedSection animation="slideUp" className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-[#2D2F92] mb-4">
            LusiTech Blog
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover insights on AI technology, innovation stories, and the future of artificial intelligence in Africa.
          </p>
        </AnimatedSection>

        {/* Filters */}
        <AnimatedSection animation="slideUp" delay={0.1}>
          <BlogFilters
            tags={tags}
            selectedTags={selectedTags}
            onTagChange={setSelectedTags}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
          />
        </AnimatedSection>

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center items-center py-16">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#2D2F92]"></div>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-8">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-red-800">
                  Error loading blog posts
                </h3>
                <p className="mt-1 text-sm text-red-700">{error}</p>
              </div>
            </div>
          </div>
        )}

        {/* Results Info */}
        {!loading && !error && (
          <div className="mb-6">
            <p className="text-gray-600">
              {hasActiveFilters ? (
                <>
                  Found {totalCount} article{totalCount !== 1 ? 's' : ''}
                  {searchQuery && ` matching "${searchQuery}"`}
                  {selectedTags.length > 0 && ` in selected topics`}
                </>
              ) : (
                <>Showing {totalCount} article{totalCount !== 1 ? 's' : ''}</>
              )}
            </p>
          </div>
        )}

        {/* Blog Posts */}
        {!loading && !error && (
          <AnimatedSection animation="slideUp" delay={0.2}>
            {posts.length > 0 || featuredPost ? (
              <>
                <BlogGrid posts={posts} featuredPost={featuredPost} />

                {/* Pagination */}
                <BlogPagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                  hasNext={hasNext}
                  hasPrevious={hasPrevious}
                />
              </>
            ) : (
              <div className="text-center py-16">
                <div className="max-w-md mx-auto">
                  <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                  <h3 className="mt-4 text-lg font-medium text-gray-900">
                    {hasActiveFilters ? 'No articles found' : 'No articles yet'}
                  </h3>
                  <p className="mt-2 text-gray-500">
                    {hasActiveFilters
                      ? 'Try adjusting your search or filter criteria.'
                      : 'Check back soon for the latest insights on AI technology and innovation.'}
                  </p>
                  {hasActiveFilters && (
                    <button
                      onClick={() => {
                        setSearchQuery('');
                        setSelectedTags([]);
                      }}
                      className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-[#2D2F92] hover:bg-[#1e1f6b] transition-colors"
                    >
                      Clear filters
                    </button>
                  )}
                </div>
              </div>
            )}
          </AnimatedSection>
        )}
      </div>
    </div>
  );
}
