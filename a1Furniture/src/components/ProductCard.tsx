import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';
import type { Product } from '../data/productCatalog';
import { furnitureProducts } from '../data/furnitureProducts';
import type { ColorVariant as FurnitureColorVariant } from '../data/furnitureProducts';

interface ProductCardProps {
  product: Product;
}

type ColorVariant = 'dark' | 'light' | 'white';

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [selectedColor, setSelectedColor] = useState<ColorVariant>('dark');
  const [imgError, setImgError] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  // Find matching product in furnitureProducts for actual color variant data
  const furnitureProduct = furnitureProducts.find(fp => fp.id === product.id);
  
  // Check if this is a deco-paint product (should hide color selector)
  const isDecoPaint = product.category === 'deco-paint';

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

  // Map local color variant to furniture product color variant
  const mapColorVariant = (color: ColorVariant): FurnitureColorVariant => {
    if (color === 'dark') return 'dark-brown';
    if (color === 'light') return 'light-brown';
    return 'white';
  };

  // Get image from furnitureProducts data if available, otherwise fallback to old logic
  const getImageForColor = (color: ColorVariant): string => {
    if (furnitureProduct && furnitureProduct.colorVariants) {
      const variantId = mapColorVariant(color);
      const variant = furnitureProduct.colorVariants.find(v => v.id === variantId);
      if (variant && variant.image) {
        return variant.image;
      }
    }
    
    // Fallback to product.image if no furniture product data found
    return product.image;
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

        {/* Color Selector - Hidden for deco-paint products */}
        {!isDecoPaint && furnitureProduct && furnitureProduct.colorVariants && (
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-10 flex items-center gap-2 bg-white/95 backdrop-blur-sm px-3 py-2 rounded-full shadow-lg">
            {furnitureProduct.colorVariants.map((variant) => {
              const localColor: ColorVariant = 
                variant.id === 'dark-brown' ? 'dark' : 
                variant.id === 'light-brown' ? 'light' : 'white';
              
              return (
                <button
                  key={variant.id}
                  onClick={(e) => handleColorChange(e, localColor)}
                  className={`w-7 h-7 rounded-full border-2 transition-all duration-200 ${
                    selectedColor === localColor
                      ? 'border-amber-500 ring-2 ring-amber-200 scale-110'
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                  style={{ backgroundColor: variant.hex }}
                  aria-label={variant.label}
                  title={variant.label}
                />
              );
            })}
          </div>
        )}
      </div>
      <p className="text-sm font-medium text-gray-800 text-center tracking-wide uppercase group-hover:text-amber-700 transition-colors duration-200">
        {product.name}{!product.name.toLowerCase().includes('polish') && !product.name.toLowerCase().includes('paint') ? ' Polish' : ''}
      </p>
    </Link>
  );
};

export default ProductCard;
