/**
 * Canonical URL Configuration and Utilities
 * Ensures consistent URL structure across the site for SEO
 */

export interface CanonicalURLConfig {
  baseURL: string;
  preferredProtocol: 'https';
  preferredDomain: string;
  trailingSlash: boolean;
}

// Configuration for canonical URLs
export const canonicalConfig: CanonicalURLConfig = {
  baseURL: 'https://a1furniturepolish.com',
  preferredProtocol: 'https',
  preferredDomain: 'a1furniturepolish.com', // without www
  trailingSlash: false,
};

/**
 * Normalizes a URL path by removing trailing slashes and ensuring proper format
 * @param path - The URL path to normalize
 * @returns Normalized path
 */
export function normalizePath(path: string): string {
  // Remove trailing slash unless it's the root path
  let normalized = path;
  
  if (normalized.length > 1 && normalized.endsWith('/')) {
    normalized = normalized.slice(0, -1);
  }
  
  // Ensure path starts with /
  if (!normalized.startsWith('/')) {
    normalized = '/' + normalized;
  }
  
  return normalized;
}

/**
 * Generates the canonical URL for a given path
 * @param path - The relative path (e.g., '/about', '/services/furniture-polish')
 * @returns Full canonical URL
 */
export function getCanonicalURL(path: string): string {
  const normalizedPath = normalizePath(path);
  const { baseURL } = canonicalConfig;
  
  // Remove any trailing slash from baseURL
  const cleanBaseURL = baseURL.endsWith('/') ? baseURL.slice(0, -1) : baseURL;
  
  return `${cleanBaseURL}${normalizedPath}`;
}

/**
 * Extracts the path from a full URL
 * @param url - Full URL string
 * @returns Path portion of the URL
 */
export function extractPath(url: string): string {
  try {
    const urlObj = new URL(url);
    return urlObj.pathname;
  } catch {
    // If not a valid URL, assume it's already a path
    return url;
  }
}

/**
 * Checks if a URL is canonical (matches our preferred format)
 * @param url - URL to check
 * @returns True if URL is canonical
 */
export function isCanonical(url: string): boolean {
  try {
    const urlObj = new URL(url);
    const { preferredProtocol, preferredDomain, trailingSlash } = canonicalConfig;
    
    // Check protocol
    if (urlObj.protocol !== `${preferredProtocol}:`) {
      return false;
    }
    
    // Check domain (with or without www)
    if (urlObj.hostname !== preferredDomain && urlObj.hostname !== `www.${preferredDomain}`) {
      return false;
    }
    
    // Check trailing slash
    if (!trailingSlash && urlObj.pathname.length > 1 && urlObj.pathname.endsWith('/')) {
      return false;
    }
    
    return true;
  } catch {
    return false;
  }
}

/**
 * Gets the current page's canonical URL based on window.location
 * @returns Canonical URL for current page
 */
export function getCurrentCanonicalURL(): string {
  if (typeof window === 'undefined') {
    return canonicalConfig.baseURL;
  }
  
  return getCanonicalURL(window.location.pathname);
}
