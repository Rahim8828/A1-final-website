import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';
import type { Product } from '../data/productCatalog';

interface ProductCardProps {
  product: Product;
}

type ColorVariant = 'dark' | 'light' | 'white';

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [selectedColor, setSelectedColor] = useState<ColorVariant>('dark');
  const [imgError, setImgError] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  const handleLike = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsLiked((prev) => !prev);
  };

  const handleColorChange = (e: React.MouseEvent, color: ColorVariant) => {
    e.preventDefault();
    e.stopPropagation();
    setSelectedColor(color);
  };

  // Generate image path based on selected color
  const getImageForColor = (color: ColorVariant): string => {
    const basePath = product.image;
    
    // Extract directory and filename
    const lastSlash = basePath.lastIndexOf('/');
    const directory = basePath.substring(0, lastSlash + 1);
    const filename = basePath.substring(lastSlash + 1);
    
    // Map color variants to actual file patterns
    let newFilename = filename;
    
    if (color === 'dark') {
      // Keep original dark image or find dark variant
      if (filename.toLowerCase().includes('light') || filename.toLowerCase().includes('white')) {
        newFilename = filename
          .replace(/light[Bb]rown[s]?/gi, 'darkWooden')
          .replace(/light[Bb]rown/gi, 'darkBrown')
          .replace(/white/gi, 'darkWooden');
      }
    } else if (color === 'light') {
      // Find light variant
      newFilename = filename
        .replace(/dark[Ww]ooden/gi, 'lightBrown')
        .replace(/dark[Bb]rown/gi, 'lightBrown')
        .replace(/white/gi, 'lightBrown');
    } else if (color === 'white') {
      // Find white variant
      newFilename = filename
        .replace(/dark[Ww]ooden/gi, 'white')
        .replace(/dark[Bb]rown/gi, 'white')
        .replace(/light[Bb]rown[s]?/gi, 'white');
    }
    
    return directory + newFilename;
  };

  const currentImage = getImageForColor(selectedColor);

  return (
    <Link
      to={product.serviceLink}
      className="group block"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative bg-gray-50 rounded-2xl overflow-hidden aspect-[4/3] mb-3 border border-gray-100 transition-all duration-300 group-hover:shadow-xl">
        {/* Product image with zoom effect */}
        <div className="absolute inset-0 overflow-hidden">
          <img
            src={ currentImage}
            alt={product.name}
            className={`w-full h-full object-cover transition-transform duration-700 ease-out ${
              isHovered ? 'scale-125' : 'scale-100'
            }`}
            loading="lazy"
            onError={() => setImgError(true)}
          />
        </div>

        {/* Overlay gradient on hover */}
        <div className={`absolute inset-0 bg-gradient-to-t from-black/20 to-transparent transition-opacity duration-300 ${
          isHovered ? 'opacity-100' : 'opacity-0'
        }`} />

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

        {/* Color Selector */}
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-10 flex items-center gap-2 bg-white/95 backdrop-blur-sm px-3 py-2 rounded-full shadow-lg">
          <button
            onClick={(e) => handleColorChange(e, 'dark')}
            className={`w-7 h-7 rounded-full border-2 transition-all duration-200 ${
              selectedColor === 'dark'
                ? 'border-amber-500 ring-2 ring-amber-200 scale-110'
                : 'border-gray-300 hover:border-gray-400'
            }`}
            style={{ backgroundColor: '#3E2723' }}
            aria-label="Dark Brown"
            title="Dark Brown"
          />
          <button
            onClick={(e) => handleColorChange(e, 'light')}
            className={`w-7 h-7 rounded-full border-2 transition-all duration-200 ${
              selectedColor === 'light'
                ? 'border-amber-500 ring-2 ring-amber-200 scale-110'
                : 'border-gray-300 hover:border-gray-400'
            }`}
            style={{ backgroundColor: '#8D6E63' }}
            aria-label="Light Brown"
            title="Light Brown"
          />
          <button
            onClick={(e) => handleColorChange(e, 'white')}
            className={`w-7 h-7 rounded-full border-2 transition-all duration-200 ${
              selectedColor === 'white'
                ? 'border-amber-500 ring-2 ring-amber-200 scale-110'
                : 'border-gray-300 hover:border-gray-400'
            }`}
            style={{ backgroundColor: '#F5F5F5' }}
            aria-label="White"
            title="White"
          />
        </div>
      </div>
      <p className="text-sm font-medium text-gray-800 text-center tracking-wide uppercase group-hover:text-amber-700 transition-colors duration-200">
        {product.name}{!product.name.toLowerCase().includes('polish') && !product.name.toLowerCase().includes('paint') ? ' Polish' : ''}
      </p>
    </Link>
  );
};

export default ProductCard;
