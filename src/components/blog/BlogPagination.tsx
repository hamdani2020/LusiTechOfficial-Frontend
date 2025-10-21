'use client';

interface BlogPaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  hasNext: boolean;
  hasPrevious: boolean;
}

export default function BlogPagination({
  currentPage,
  totalPages,
  onPageChange,
  hasNext,
  hasPrevious,
}: BlogPaginationProps) {
  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;
    
    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      const startPage = Math.max(1, currentPage - 2);
      const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
      
      if (startPage > 1) {
        pages.push(1);
        if (startPage > 2) {
          pages.push('...');
        }
      }
      
      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }
      
      if (endPage < totalPages) {
        if (endPage < totalPages - 1) {
          pages.push('...');
        }
        pages.push(totalPages);
      }
    }
    
    return pages;
  };

  if (totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-center space-x-2 mt-12">
      {/* Previous Button */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={!hasPrevious}
        className={`px-4 py-2 rounded-lg border transition-colors ${
          hasPrevious
            ? 'border-gray-300 text-gray-700 hover:border-[#2D2F92] hover:text-[#2D2F92]'
            : 'border-gray-200 text-gray-400 cursor-not-allowed'
        }`}
      >
        Previous
      </button>

      {/* Page Numbers */}
      {getPageNumbers().map((page, index) => (
        <button
          key={index}
          onClick={() => typeof page === 'number' && onPageChange(page)}
          disabled={page === '...'}
          className={`px-4 py-2 rounded-lg border transition-colors ${
            page === currentPage
              ? 'bg-[#2D2F92] text-white border-[#2D2F92]'
              : page === '...'
              ? 'border-transparent text-gray-400 cursor-default'
              : 'border-gray-300 text-gray-700 hover:border-[#2D2F92] hover:text-[#2D2F92]'
          }`}
        >
          {page}
        </button>
      ))}

      {/* Next Button */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={!hasNext}
        className={`px-4 py-2 rounded-lg border transition-colors ${
          hasNext
            ? 'border-gray-300 text-gray-700 hover:border-[#2D2F92] hover:text-[#2D2F92]'
            : 'border-gray-200 text-gray-400 cursor-not-allowed'
        }`}
      >
        Next
      </button>
    </div>
  );
}