'use client';

import { useState } from 'react';
import { Tag } from '@/lib/types';

interface BlogFiltersProps {
  tags?: Tag[];
  selectedTags: string[];
  onTagChange: (tags: string[]) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export default function BlogFilters({
  tags = [],
  selectedTags,
  onTagChange,
  searchQuery,
  onSearchChange,
}: BlogFiltersProps) {
  const [isTagsExpanded, setIsTagsExpanded] = useState(false);

  const handleTagToggle = (tagSlug: string) => {
    if (selectedTags.includes(tagSlug)) {
      onTagChange(selectedTags.filter(tag => tag !== tagSlug));
    } else {
      onTagChange([...selectedTags, tagSlug]);
    }
  };

  const clearAllFilters = () => {
    onTagChange([]);
    onSearchChange('');
  };

  const hasActiveFilters = selectedTags.length > 0 || searchQuery.length > 0;

  return (
    <div className="bg-gray-50 p-6 rounded-lg mb-8">
      {/* Search */}
      <div className="mb-6">
        <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-2">
          Search Articles
        </label>
        <input
          type="text"
          id="search"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search by title or content..."
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2D2F92] focus:border-transparent"
        />
      </div>

      {/* Tags Filter */}
      {tags && tags.length > 0 && (
        <div>
          <div className="flex items-center justify-between mb-3">
            <label className="block text-sm font-medium text-gray-700">
              Filter by Topics
            </label>
            {tags && tags.length > 6 && (
              <button
                onClick={() => setIsTagsExpanded(!isTagsExpanded)}
                className="text-sm text-[#2D2F92] hover:text-[#00ACF8] transition-colors"
              >
                {isTagsExpanded ? 'Show Less' : 'Show All'}
              </button>
            )}
          </div>
          
          <div className="flex flex-wrap gap-2">
            {tags && (isTagsExpanded ? tags : tags.slice(0, 6)).map((tag) => (
              <button
                key={tag.id}
                onClick={() => handleTagToggle(tag.slug)}
                className={`px-3 py-1 text-sm rounded-full border transition-colors ${
                  selectedTags.includes(tag.slug)
                    ? 'bg-[#2D2F92] text-white border-[#2D2F92]'
                    : 'bg-white text-gray-700 border-gray-300 hover:border-[#2D2F92] hover:text-[#2D2F92]'
                }`}
              >
                {tag.name}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Clear Filters */}
      {hasActiveFilters && (
        <div className="mt-4 pt-4 border-t border-gray-200">
          <button
            onClick={clearAllFilters}
            className="text-sm text-gray-600 hover:text-[#2D2F92] transition-colors"
          >
            Clear all filters
          </button>
        </div>
      )}
    </div>
  );
}