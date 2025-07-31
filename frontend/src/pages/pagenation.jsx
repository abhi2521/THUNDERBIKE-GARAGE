import React, { useState } from 'react';

const Pagination = ({ itemsPerPage, totalItems, onPageChange }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const goToPage = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
      onPageChange(pageNumber);
    }
  };

  // Show limited page numbers on mobile
  const getVisiblePages = () => {
    if (totalPages <= 5) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    if (currentPage <= 3) {
      return [1, 2, 3, '...', totalPages];
    }

    if (currentPage >= totalPages - 2) {
      return [1, '...', totalPages - 2, totalPages - 1, totalPages];
    }

    return [1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages];
  };

  const visiblePages = getVisiblePages();

  return (
    <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-6">
      <div className="text-sm text-gray-600 dark:text-gray-400">
        Showing {(currentPage - 1) * itemsPerPage + 1} to{' '}
        {Math.min(currentPage * itemsPerPage, totalItems)} of {totalItems} items
      </div>

      <div className="flex items-center gap-1 sm:gap-2 flex-wrap justify-center">
        <button
          onClick={() => goToPage(currentPage - 1)}
          disabled={currentPage === 1}
          className={`px-3 sm:px-4 py-1 sm:py-2 border rounded-md text-sm sm:text-base transition ${
            currentPage === 1
              ? ' dark:bg-gray-800 text-gray-400 dark:text-gray-600 cursor-not-allowed'
              : 'bg-white dark:bg-gray-800 text-black dark:text-black hover:bg-gray-100 dark:hover:bg-gray-700 border-gray-300 dark:border-gray-600'
          }`}
        >
          ◀ Prev
        </button>

        {visiblePages.map((pageNum, index) => (
          <React.Fragment key={index}>
            {pageNum === '...' ? (
              <span className="px-2 sm:px-3 py-1 sm:py-2 text-gray-500">...</span>
            ) : (
              <button
                onClick={() => goToPage(pageNum)}
                className={`px-3 sm:px-4 py-1 sm:py-2 border rounded-md text-sm sm:text-base transition ${
                  currentPage === pageNum
                    ? 'bg-blue-500 text-white font-medium border-blue-500'
                    : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 border-gray-300 dark:border-gray-600'
                }`}
              >
                {pageNum}
              </button>
            )}
          </React.Fragment>
        ))}

        <button
          onClick={() => goToPage(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`px-3 sm:px-4 py-1 sm:py-2 border rounded-md text-sm sm:text-base transition ${
            currentPage === totalPages
              ? ' dark:bg-gray-800 text-gray-400 dark:text-gray-600 cursor-not-allowed'
              : ' dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 border-gray-300 dark:border-gray-600'
          }`}
        >
          Next ▶
        </button>
      </div>
    </div>
  );
};

export default Pagination;