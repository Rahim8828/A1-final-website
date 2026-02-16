import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';
import type { Product } from '../data/productCatalog';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [imgError, setImgError] = useState(false);
  const [hoverImgError, setHoverImgError] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  const handleLike = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsLiked((prev) => !prev);
  };

  return (
    <Link
      to={product.serviceLink}
      className="group block"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative bg-gray-50 rounded-2xl overflow-hidden aspect-[4/3] mb-3 border border-gray-100 transition-shadow duration-300 group-hover:shadow-lg">
        {/* Primary image */}
        <img
          src={imgError ? '/assets/placeholder.webp' : product.image}
          alt={product.name}
          className={`absolute inset-0 w-full h-full object-cover transition-all duration-500 ease-in-out ${
            isHovered && !hoverImgError ? 'opacity-0 scale-110' : 'opacity-100 scale-100'
          }`}
          loading="lazy"
          onError={() => setImgError(true)}
        />
        {/* Hover image */}
        <img
          src={hoverImgError ? product.image : product.hoverImage}
          alt={`${product.name} - alternate view`}
          className={`absolute inset-0 w-full h-full object-cover transition-all duration-500 ease-in-out ${
            isHovered && !hoverImgError ? 'opacity-100 scale-110' : 'opacity-0 scale-100'
          }`}
          loading="lazy"
          onError={() => setHoverImgError(true)}
        />

        {/* Heart / Wishlist Icon */}
        <button
          onClick={handleLike}
          className="absolute top-3 right-3 z-10 w-9 h-9 flex items-center justify-center rounded-full bg-white shadow-md hover:shadow-lg transition-all duration-200 group/heart"
          aria-label={isLiked ? 'Remove from wishlist' : 'Add to wishlist'}
        >
          <Heart
            className={`w-[18px] h-[18px] transition-all duration-200 ${
              isLiked
                ? 'text-red-500 fill-red-500 scale-110'
                : 'text-gray-400 group-hover/heart:text-red-400'
            }`}
          />
        </button>
      </div>
      <p className="text-sm font-medium text-gray-800 text-center tracking-wide uppercase group-hover:text-amber-700 transition-colors duration-200">
        {product.name}{!product.name.toLowerCase().includes('polish') && !product.name.toLowerCase().includes('paint') ? ' Polish' : ''}
      </p>
    </Link>
  );
};

export default ProductCard;
