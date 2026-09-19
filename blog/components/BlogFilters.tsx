import React, { useState } from 'react';
import { Filter, X } from 'lucide-react';
import { BlogCategory, BlogTag } from '../types';

interface BlogFiltersProps {
  categories: BlogCategory[];
  tags: BlogTag[];
  selectedCategory?: string;
  selectedTags: string[];
  onCategoryChange: (category: string | undefined) => void;
  onTagToggle: (tag: string) => void;
  onClearFilters: () => void;
}

const BlogFilters: React.FC<BlogFiltersProps> = ({
  categories,
  tags,
  selectedCategory,
  selectedTags,
  onCategoryChange,
  onTagToggle,
  onClearFilters
}) => {
  const [showFilters, setShowFilters] = useState(false);

  const hasActiveFilters = selectedCategory || selectedTags.length > 0;

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6 mb-8">


      {/* Filter Toggle */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center gap-2 text-gray-700 hover:text-amber-600 transition-colors font-medium"
        >
          <Filter size={18} />
          <span>Advanced Filters</span>
          {hasActiveFilters && (
            <span className="bg-amber-100 text-amber-700 px-2 py-1 rounded-full text-xs font-semibold">
              {(selectedCategory ? 1 : 0) + selectedTags.length} Active
            </span>
          )}
        </button>

        {hasActiveFilters && (
          <button
            onClick={onClearFilters}
            className="flex items-center gap-1 text-gray-500 hover:text-red-500 transition-colors text-sm font-medium"
          >
            <X size={16} />
            <span>Clear All Filters</span>
          </button>
        )}
      </div>

      {/* Filters Panel */}
      {showFilters && (
        <div className="space-y-6 pt-6 border-t border-gray-200 animate-in slide-in-from-top-2 duration-200">
          {/* Categories */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4 text-lg">Categories</h3>
            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => onCategoryChange(undefined)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  !selectedCategory
                    ? 'bg-amber-500 text-white shadow-md transform scale-105'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:shadow-sm'
                }`}
              >
                All Categories
              </button>
              {categories.map((category) => (
                <button
                  key={category.slug}
                  onClick={() => onCategoryChange(category.slug)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                    selectedCategory === category.slug
                      ? 'bg-amber-500 text-white shadow-md transform scale-105'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:shadow-sm'
                  }`}
                >
                  {category.name}
                  {category.postCount && (
                    <span className="ml-2 text-xs bg-white bg-opacity-20 px-2 py-0.5 rounded-full">
                      {category.postCount}
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Tags */}
          {tags.length > 0 && (
            <div>
              <h3 className="font-semibold text-gray-900 mb-4 text-lg">Popular Tags</h3>
              <div className="flex flex-wrap gap-2">
                {tags.slice(0, 12).map((tag) => (
                  <button
                    key={tag.slug}
                    onClick={() => onTagToggle(tag.slug)}
                    className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                      selectedTags.includes(tag.slug)
                        ? 'bg-blue-500 text-white shadow-md transform scale-105'
                        : 'bg-blue-50 text-blue-700 hover:bg-blue-100 hover:shadow-sm border border-blue-200'
                    }`}
                  >
                    #{tag.name}
                    {tag.postCount && (
                      <span className="ml-1 text-xs opacity-75">({tag.postCount})</span>
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default BlogFilters;