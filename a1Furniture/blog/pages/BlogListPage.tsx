import React, { useState, useMemo } from 'react';
import { blogPosts } from '../data/blogPosts';
import SEOHead from '../../src/components/SEOHead';
import BlogCard from '../components/BlogCard';

import { getCanonicalURL } from '../../src/utils/canonicalURL';


const BlogListPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 9;

  // All posts (no filtering)
  const filteredPosts = blogPosts;

  // Pagination
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);
  const paginatedPosts = filteredPosts.slice(
    (currentPage - 1) * postsPerPage,
    currentPage * postsPerPage
  );

  // Featured posts
  const featuredPosts = blogPosts.filter(post => post.featured).slice(0, 2);



  return (
    <>
      <SEOHead
        title="Blog | A1 Furniture Polish"
        description="Read our latest articles on furniture care, polishing tips, and restoration guides to keep your wooden furniture looking its best."
        canonical={getCanonicalURL('/blog')}
      />
      <div className="bg-gradient-to-br from-gray-50 to-white min-h-screen py-8 sm:py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="text-center mb-8 sm:mb-12 lg:mb-16">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900 mb-4">
              Furniture Care <span className="text-amber-600">Blog</span>
            </h1>
            <p className="mt-4 text-base sm:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Expert advice, tips, and guides on furniture care, polishing, and restoration from the A1 Furniture Polish team.
            </p>
          </div>

          {/* Featured Posts */}
          {featuredPosts.length > 0 && (
            <div className="mb-8 sm:mb-12 lg:mb-16">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 sm:mb-8 text-center lg:text-left">
                ⭐ Featured Articles
              </h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
                {featuredPosts.map((post) => (
                  <BlogCard 
                    key={post.slug} 
                    post={post} 
                    variant="featured"
                    showTags={true}
                    showExcerpt={true}
                  />
                ))}
              </div>
            </div>
          )}



          {/* Results Summary */}
          <div className="mb-6 sm:mb-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <p className="text-gray-600 text-sm sm:text-base">
                Showing <span className="font-semibold text-gray-900">{paginatedPosts.length}</span> of <span className="font-semibold text-gray-900">{filteredPosts.length}</span> articles
              </p>
              {totalPages > 1 && (
                <p className="text-gray-500 text-sm">
                  Page {currentPage} of {totalPages}
                </p>
              )}
            </div>
          </div>

          {/* Blog Posts Grid */}
          {paginatedPosts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-12 sm:mb-16">
              {paginatedPosts.map((post) => (
                <BlogCard 
                  key={post.slug} 
                  post={post} 
                  showTags={true}
                  showExcerpt={true}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 sm:py-20">
              <div className="max-w-md mx-auto">
                <div className="text-6xl mb-4">📝</div>
                <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-2">No articles available</h3>
                <p className="text-gray-500">
                  We're working on adding more helpful articles about furniture care and polishing.
                </p>
              </div>
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 sm:p-8">
              <div className="flex flex-col items-center gap-6">
                
                {/* Page Info */}
                <div className="text-center">
                  <p className="text-sm text-gray-600 mb-2">
                    Showing page <span className="font-semibold text-gray-900">{currentPage}</span> of <span className="font-semibold text-gray-900">{totalPages}</span>
                  </p>
                  <div className="w-full bg-gray-200 rounded-full h-2 max-w-xs mx-auto">
                    <div 
                      className="bg-gradient-to-r from-amber-500 to-orange-500 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${(currentPage / totalPages) * 100}%` }}
                    ></div>
                  </div>
                </div>

                {/* Navigation Buttons */}
                <div className="flex flex-wrap justify-center items-center gap-2">
                  
                  {/* Previous Button */}
                  <button
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium transition-all duration-200 ${
                      currentPage === 1
                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:shadow-md active:scale-95'
                    }`}
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                    <span className="hidden sm:inline">Previous</span>
                  </button>

                  {/* Page Numbers */}
                  <div className="flex items-center gap-1 sm:gap-2">
                    {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                      let page;
                      if (totalPages <= 5) {
                        page = i + 1;
                      } else if (currentPage <= 3) {
                        page = i + 1;
                      } else if (currentPage >= totalPages - 2) {
                        page = totalPages - 4 + i;
                      } else {
                        page = currentPage - 2 + i;
                      }
                      
                      return (
                        <button
                          key={page}
                          onClick={() => setCurrentPage(page)}
                          className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl font-semibold transition-all duration-200 ${
                            currentPage === page
                              ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-lg transform scale-110'
                              : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:shadow-md active:scale-95'
                          }`}
                        >
                          {page}
                        </button>
                      );
                    })}
                    
                    {/* Show ellipsis and last page if needed */}
                    {totalPages > 5 && currentPage < totalPages - 2 && (
                      <>
                        <span className="px-2 text-gray-400">...</span>
                        <button
                          onClick={() => setCurrentPage(totalPages)}
                          className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl font-semibold bg-gray-100 text-gray-700 hover:bg-gray-200 hover:shadow-md transition-all duration-200 active:scale-95"
                        >
                          {totalPages}
                        </button>
                      </>
                    )}
                  </div>
                  
                  {/* Next Button */}
                  <button
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium transition-all duration-200 ${
                      currentPage === totalPages
                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:shadow-md active:scale-95'
                    }`}
                  >
                    <span className="hidden sm:inline">Next</span>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>

                {/* Quick Jump (for many pages) */}
                {totalPages > 10 && (
                  <div className="flex items-center gap-3 text-sm">
                    <span className="text-gray-600">Jump to page:</span>
                    <select
                      value={currentPage}
                      onChange={(e) => setCurrentPage(Number(e.target.value))}
                      className="px-3 py-1.5 border border-gray-300 rounded-lg text-gray-700 bg-white focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                    >
                      {Array.from({ length: totalPages }, (_, i) => (
                        <option key={i + 1} value={i + 1}>
                          {i + 1}
                        </option>
                      ))}
                    </select>
                  </div>
                )}
              </div>
            </div>
          )}

        </div>
      </div>
    </>
  );
};

export default BlogListPage;