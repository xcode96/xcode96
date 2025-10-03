import React from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from './Icons';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
  const getPageNumbers = () => {
    const pages = [];
    const maxPagesToShow = 5;
    const halfPagesToShow = Math.floor(maxPagesToShow / 2);

    if (totalPages <= maxPagesToShow + 2) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1);
      if (currentPage > halfPagesToShow + 2) {
        pages.push('...');
      }

      let start = Math.max(2, currentPage - halfPagesToShow);
      let end = Math.min(totalPages - 1, currentPage + halfPagesToShow);

      if (currentPage <= halfPagesToShow + 1) {
          end = maxPagesToShow;
      }

      if (currentPage >= totalPages - halfPagesToShow) {
          start = totalPages - maxPagesToShow + 1;
      }

      for (let i = start; i <= end; i++) {
        pages.push(i);
      }

      if (currentPage < totalPages - halfPagesToShow - 1) {
        pages.push('...');
      }
      pages.push(totalPages);
    }
    return pages;
  };

  const pages = getPageNumbers();

  return (
    <nav className="flex items-center justify-center mt-8" aria-label="Pagination">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="flex items-center justify-center px-3 h-8 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        <ChevronLeftIcon className="w-4 h-4 mr-1" />
        Previous
      </button>
      
      <div className="flex items-center">
        {pages.map((page, index) => (
          typeof page === 'number' ? (
            <button
              key={index}
              onClick={() => onPageChange(page)}
              className={`flex items-center justify-center px-3 h-8 text-sm font-medium transition-colors border-y -ml-px ${
                currentPage === page
                  ? 'text-white bg-blue-600 border-blue-600'
                  : 'text-gray-500 bg-white border-gray-300 hover:bg-gray-100 hover:text-gray-700'
              }`}
            >
              {page}
            </button>
          ) : (
            <span key={index} className="flex items-center justify-center px-3 h-8 text-sm font-medium text-gray-500 bg-white border border-gray-300 -ml-px">
              {page}
            </span>
          )
        ))}
      </div>

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="flex items-center justify-center px-3 h-8 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        Next
        <ChevronRightIcon className="w-4 h-4 ml-1" />
      </button>
    </nav>
  );
};