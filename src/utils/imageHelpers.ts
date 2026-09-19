/**
 * Simple image utilities for handling image paths
 */

// Available image widths for future optimization
export const IMAGE_SIZES = [320, 640, 768, 1024, 1280, 1920] as const;

export type ImageFormat = 'avif' | 'webp' | 'jpg';

/**
 * Get the image path - simplified for build compatibility
 * @param src - Original image path (e.g., '/assets/hero.jpg')
 * @param width - Desired width (optional, not used currently)
 * @param format - Image format (not used currently)
 * @returns Original image path
 */
export function getOptimizedImagePath(
  src: string,
  width?: number,
  format: ImageFormat = 'jpg'
): string {
  // Return original path for build compatibility
  return src;
}

/**
 * Generate srcset string - simplified for build compatibility
 * @param src - Original image path
 * @param format - Image format (not used currently)
 * @param maxWidth - Maximum width (not used currently)
 * @returns Simple srcset string
 */
export function generateSrcSet(
  src: string,
  format: ImageFormat = 'jpg',
  maxWidth?: number
): string {
  // Return original image path for build compatibility
  return `${src} 1920w`;
}

/**
 * Calculate the sizes attribute for responsive images
 */
export function calculateSizes(breakpoints: {
  mobile?: string;
  tablet?: string;
  desktop?: string;
}): string {
  const { mobile = '100vw', tablet, desktop } = breakpoints;
  
  const sizesArray: string[] = [];
  
  if (tablet) {
    sizesArray.push(`(max-width: 768px) ${mobile}`);
    if (desktop) {
      sizesArray.push(`(max-width: 1024px) ${tablet}`);
      sizesArray.push(desktop);
    } else {
      sizesArray.push(tablet);
    }
  } else if (desktop) {
    sizesArray.push(`(max-width: 1024px) ${mobile}`);
    sizesArray.push(desktop);
  } else {
    return mobile;
  }
  
  return sizesArray.join(', ');
}

/**
 * Get common sizes attribute for typical use cases
 */
export const COMMON_SIZES = {
  // Full width on all devices
  fullWidth: '100vw',
  
  // Hero images - full width on mobile, 80% on desktop
  hero: '(max-width: 768px) 100vw, 80vw',
  
  // Content images - full width on mobile, half on tablet, third on desktop
  content: '(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw',
  
  // Grid images - half width on mobile, third on tablet, quarter on desktop
  grid: '(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw',
  
  // Thumbnail images - fixed small size
  thumbnail: '(max-width: 768px) 150px, 200px',
  
  // Service cards - full on mobile, half on tablet, third on desktop
  serviceCard: '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw',
};

/**
 * Extract dimensions from image filename if present
 */
export function extractDimensionsFromFilename(filename: string): {
  width?: number;
  height?: number;
} {
  const match = filename.match(/(\d+)x(\d+)/);
  if (match) {
    return {
      width: parseInt(match[1], 10),
      height: parseInt(match[2], 10),
    };
  }
  return {};
}

/**
 * Calculate aspect ratio from width and height
 */
export function calculateAspectRatio(width: number, height: number): number {
  return width / height;
}

/**
 * Get responsive height based on aspect ratio
 */
export function getResponsiveHeight(
  width: number,
  aspectRatio: number
): number {
  return Math.round(width / aspectRatio);
}