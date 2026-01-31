/**
 * Asset path helpers for handling images in development and production
 */

/**
 * Get the correct asset path for images
 * Handles both development and production builds
 */
export function getAssetPath(path: string): string {
  // Remove leading slash if present
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  
  // In production, Vite processes assets and may change paths
  // For now, return the original path as Vite handles asset resolution
  return `/${cleanPath}`;
}

/**
 * Check if an image exists (for fallback handling)
 */
export function checkImageExists(src: string): Promise<boolean> {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => resolve(true);
    img.onerror = () => resolve(false);
    img.src = src;
  });
}

/**
 * Get fallback image path
 */
export function getFallbackImage(): string {
  return '/assets/wooden furniture .webp'; // A reliable fallback image
}

/**
 * Preload critical images
 */
export function preloadImage(src: string): void {
  const link = document.createElement('link');
  link.rel = 'preload';
  link.as = 'image';
  link.href = src;
  document.head.appendChild(link);
}