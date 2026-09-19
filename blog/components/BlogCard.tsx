import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Clock, User, Tag } from 'lucide-react';
import { BlogPostData } from '../types';
import OptimizedImage from '../../src/components/OptimizedImage';
import { COMMON_SIZES } from '../../src/utils/imageHelpers';

interface BlogCardProps {
  post: BlogPostData;
  variant?: 'default' | 'featured' | 'compact';
  showExcerpt?: boolean;
  showTags?: boolean;
}

const BlogCard: React.FC<BlogCardProps> = ({ 
  post, 
  variant = 'default',
  showExcerpt = true,
  showTags = false 
}) => {
  const cardClasses = {
    default: 'bg-white rounded-xl shadow-md overflow-hidden group transform hover:-translate-y-2 hover:shadow-xl transition-all duration-300 border border-gray-100',
    featured: 'bg-white rounded-2xl shadow-xl overflow-hidden group transform hover:-translate-y-3 hover:shadow-2xl transition-all duration-300 border-2 border-amber-200 relative',
    compact: 'bg-white rounded-lg shadow-sm overflow-hidden group hover:shadow-lg hover:-translate-y-1 transition-all duration-300 border border-gray-100'
  };

  const imageClasses = {
    default: 'w-full h-48 sm:h-52',
    featured: 'w-full h-56 sm:h-64 lg:h-72',
    compact: 'w-full h-32 sm:h-36'
  };

  return (
    <article className={cardClasses[variant]}>
      <Link to={`/blog/${post.slug}`} className="block h-full">
        {post.featured && variant === 'featured' && (
          <div className="absolute top-0 left-0 right-0 bg-gradient-to-r from-amber-500 to-orange-500 text-white px-4 py-2 text-sm font-semibold z-10">
            ⭐ Featured Post
          </div>
        )}
        
        <div className="relative overflow-hidden">
          <OptimizedImage 
            src={post.image} 
            alt={post.title} 
            width={640} 
            height={variant === 'featured' ? 512 : variant === 'compact' ? 256 : 384} 
            className={`${imageClasses[variant]} group-hover:scale-105 transition-transform duration-500`} 
            sizes={COMMON_SIZES.grid}
            objectFit="cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </div>
        
        <div className={`${variant === 'compact' ? 'p-4' : 'p-5 sm:p-6'} flex flex-col h-full`}>
          <div className="flex items-center justify-between mb-3">
            <span className="inline-block bg-amber-100 text-amber-700 px-3 py-1.5 rounded-full text-xs sm:text-sm font-semibold">
              {post.category}
            </span>
            {post.featured && variant !== 'featured' && (
              <span className="text-amber-500 text-lg">⭐</span>
            )}
          </div>
          
          <h2 className={`font-bold text-gray-900 mb-3 leading-tight group-hover:text-amber-600 transition-colors duration-200 line-clamp-2 ${
            variant === 'featured' ? 'text-xl sm:text-2xl lg:text-3xl' : variant === 'compact' ? 'text-base sm:text-lg' : 'text-lg sm:text-xl'
          }`}>
            {post.title}
          </h2>
          
          {showExcerpt && (
            <p className={`text-gray-600 mb-4 line-clamp-3 flex-grow ${
              variant === 'compact' ? 'text-sm' : 'text-sm sm:text-base'
            }`}>
              {post.excerpt || post.description}
            </p>
          )}
          
          {showTags && post.tags && post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {post.tags.slice(0, variant === 'featured' ? 4 : 3).map((tag, index) => (
                <span 
                  key={index}
                  className="inline-flex items-center gap-1 bg-blue-50 text-blue-700 px-2 py-1 rounded-md text-xs font-medium border border-blue-200"
                >
                  <Tag size={10} />
                  {tag}
                </span>
              ))}
              {post.tags.length > (variant === 'featured' ? 4 : 3) && (
                <span className="text-gray-500 text-xs font-medium">+{post.tags.length - (variant === 'featured' ? 4 : 3)} more</span>
              )}
            </div>
          )}
          
          <div className={`flex flex-wrap items-center gap-2 text-gray-500 mt-auto ${
            variant === 'compact' ? 'text-xs' : 'text-xs sm:text-sm'
          }`}>
            <div className="flex items-center gap-1">
              <Calendar size={12} />
              <span>{post.date}</span>
            </div>
            <span className="text-gray-300">•</span>
            <div className="flex items-center gap-1">
              <Clock size={12} />
              <span>{post.readTime}</span>
            </div>
            {variant !== 'compact' && (
              <>
                <span className="text-gray-300 hidden sm:inline">•</span>
                <div className="flex items-center gap-1 hidden sm:flex">
                  <User size={12} />
                  <span className="truncate max-w-24">{post.author}</span>
                </div>
              </>
            )}
          </div>
        </div>
      </Link>
    </article>
  );
};

export default BlogCard;