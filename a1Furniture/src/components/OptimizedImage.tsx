import React, { useState } from 'react';

interface OptimizedImageProps {
  src: string;
  alt: string;
  width: number; // Required to prevent CLS
  height: number; // Required to prevent CLS
  className?: string;
  loading?: 'lazy' | 'eager';
  priority?: boolean;
  sizes?: string; // Responsive sizes attribute
  objectFit?: 'cover' | 'contain' | 'fill' | 'none' | 'scale-down';
}

const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  width,
  height,
  className = '',
  loading = 'lazy',
  priority = false,
  objectFit = 'cover',
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  const handleLoad = () => {
    setIsLoaded(true);
  };

  const handleError = () => {
    setHasError(true);
  };

  // Calculate aspect ratio for maintaining proportions
  const aspectRatio = (height / width) * 100;

  // Determine loading strategy
  const loadingStrategy = priority ? 'eager' : loading;
  const fetchPriority = priority ? 'high' : 'auto';

  // Object fit classes
  const objectFitClass = {
    cover: 'object-cover',
    contain: 'object-contain',
    fill: 'object-fill',
    none: 'object-none',
    'scale-down': 'object-scale-down',
  }[objectFit];

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {/* Aspect ratio container to prevent CLS */}
      <div style={{ paddingBottom: `${aspectRatio}%` }} className="relative">
        {/* Loading placeholder */}
        {!isLoaded && !hasError && (
          <div className="absolute inset-0 bg-gray-200 animate-pulse"></div>
        )}

        {/* Simple image element for build compatibility */}
        <img
          src={src}
          alt={alt}
          width={width}
          height={height}
          loading={loadingStrategy}
          decoding="async"
          fetchPriority={fetchPriority as 'high' | 'low' | 'auto'}
          onLoad={handleLoad}
          onError={handleError}
          className={`absolute inset-0 w-full h-full ${objectFitClass} transition-opacity duration-300 ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          }`}
        />

        {/* Error state with fallback */}
        {hasError && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
            <img
              src="/assets/wooden furniture .webp"
              alt={alt}
              className="w-full h-full object-cover opacity-50"
              onError={(e) => {
                // If even fallback fails, show text
                const target = e.target as HTMLImageElement;
                target.style.display = 'none';
                const parent = target.parentElement;
                if (parent) {
                  parent.innerHTML = '<span class="text-gray-400 text-sm">Image not available</span>';
                }
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default OptimizedImage;