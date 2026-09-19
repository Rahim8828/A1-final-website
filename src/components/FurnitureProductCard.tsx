import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Star, Clock, ShieldCheck } from 'lucide-react';
import type { FurnitureProduct, ColorVariant } from '../data/furnitureProducts';

interface FurnitureProductCardProps {
  product: FurnitureProduct;
  viewMode: 'grid-2' | 'grid-3';
}

const FurnitureProductCard: React.FC<FurnitureProductCardProps> = ({ product, viewMode }) => {
  const [selectedColor, setSelectedColor] = useState<ColorVariant>('dark-brown');
  const [imgError, setImgError] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleColorSelect = (e: React.MouseEvent, color: ColorVariant) => {
    e.preventDefault();
    e.stopPropagation();
    setSelectedColor(color);
    setImgError(false);
  };

  // Get image for selected color
  const getImageForColor = (): string => {
    // If product has a direct image property (no color variants), use it
    if (product.image) return product.image;
    
    // Otherwise, use color variants
    if (!product.colorVariants || product.colorVariants.length === 0) {
      return '/products/placeholder.webp'; // Fallback
    }
    
    const variant = product.colorVariants.find((v) => v.id === selectedColor);
    if (variant && variant.image) return variant.image;
    // fallback to first variant with image
    const fallback = product.colorVariants.find((v) => v.image);
    return fallback?.image || '/products/placeholder.webp';
  };

  const discountPercent = Math.round(
    ((product.originalPrice - product.price) / product.originalPrice) * 100
  );

  const isCompact = viewMode === 'grid-3';

  return (
    <Link
      to={`/services/${product.id}`}
      className="group block"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="bg-white rounded-xl border border-gray-100 overflow-hidden transition-all duration-300 hover:shadow-xl hover:border-gray-200 hover:-translate-y-1">
        {/* Image Container */}
        <div className="relative bg-gradient-to-b from-gray-50 to-gray-100 aspect-[4/3] overflow-hidden">
          {/* Badge */}
          {product.badge && (
            <div
              className={`absolute top-3 left-3 z-10 px-2.5 py-1 rounded text-[11px] font-bold uppercase tracking-wider shadow-sm ${
                product.badge === 'Best Seller'
                  ? 'bg-amber-600 text-white'
                  : 'bg-emerald-600 text-white'
              }`}
            >
              {product.badge}
            </div>
          )}



          {/* Product Image */}
          <img
            src={getImageForColor()}
            alt={`${product.name} - ${selectedColor} finish`}
            className={`w-full h-full object-cover transition-transform duration-500 ease-out ${
              isHovered ? 'scale-110' : 'scale-100'
            }`}
            loading="lazy"
            onError={() => setImgError(true)}
          />

          {/* Quick info on hover */}
          <div
            className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent p-3 transition-all duration-300 ${
              isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
            }`}
          >
            <div className="flex items-center gap-3 text-white text-xs">
              {product.estimatedTime && (
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {product.estimatedTime}
                </span>
              )}
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-3 h-3" />
                6 Months Warranty
              </span>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className={`p-3 ${isCompact ? 'p-2.5' : 'p-4'} space-y-2`}>
          {/* Color Swatches - Only show if colorVariants exist and more than 1 */}
          {product.colorVariants && product.colorVariants.length > 1 && (
            <div className="flex items-center gap-2">
              {product.colorVariants.map((variant) => (
                <button
                  key={variant.id}
                  onClick={(e) => handleColorSelect(e, variant.id)}
                  className={`w-6 h-6 rounded-full border-2 transition-all duration-200 hover:scale-110 ${
                    selectedColor === variant.id
                      ? 'border-amber-500 ring-2 ring-amber-200 ring-offset-1 scale-110'
                      : 'border-gray-200 hover:border-gray-400'
                  }`}
                  style={{ backgroundColor: variant.hex }}
                  title={variant.label}
                  aria-label={`Select ${variant.label} color`}
                />
              ))}
              <span className="text-[10px] text-gray-400 ml-1">
                {product.colorVariants.find((v) => v.id === selectedColor)?.label}
              </span>
            </div>
          )}

          {/* Name */}
          <h3
            className={`font-semibold text-gray-900 group-hover:text-amber-700 transition-colors line-clamp-1 ${
              isCompact ? 'text-sm' : 'text-base'
            }`}
          >
            {product.name}
          </h3>

          {/* Rating */}
          <div className="flex items-center gap-1.5">
            <div className="flex items-center gap-0.5 bg-green-600 text-white px-1.5 py-0.5 rounded text-xs font-semibold">
              <span>{product.rating}</span>
              <Star className="w-3 h-3 fill-current" />
            </div>
            <span className="text-xs text-gray-500">
              ({product.reviewCount >= 1000
                ? `${(product.reviewCount / 1000).toFixed(1)}K`
                : product.reviewCount})
            </span>
          </div>

          {/* Price */}
          <div className="flex items-baseline gap-2">
            <span className={`font-bold text-gray-900 ${isCompact ? 'text-base' : 'text-lg'}`}>
              ₹{product.price.toLocaleString('en-IN')}
            </span>
            <span className="text-sm text-gray-400 line-through">
              ₹{product.originalPrice.toLocaleString('en-IN')}
            </span>
            {discountPercent > 0 && (
              <span className="text-xs font-semibold text-green-600">{discountPercent}% off</span>
            )}
          </div>

          {/* Features tags */}
          {!isCompact && (
            <div className="flex flex-wrap gap-1.5 pt-1">
              {product.features.slice(0, 2).map((feature, i) => (
                <span
                  key={i}
                  className="text-[10px] bg-amber-50 text-amber-700 px-2 py-0.5 rounded-full font-medium"
                >
                  {feature}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </Link>
  );
};

export default FurnitureProductCard;
