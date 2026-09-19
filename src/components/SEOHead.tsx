import React from 'react';
import { getCurrentCanonicalURL } from '../utils/canonicalURL';

interface SEOHeadProps {
  title: string;
  description: string;
  keywords?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  ogUrl?: string;
  ogType?: string;
  canonical?: string;
  noindex?: boolean;
  structuredData?: object | object[];
  // Enhanced SEO props from SEO system
  openGraphTags?: Record<string, string>;
  twitterCardTags?: Record<string, string>;
  cacheHeaders?: Record<string, string>;
}

const SEOHead: React.FC<SEOHeadProps> = ({
  title,
  description,
  keywords,
  ogTitle,
  ogDescription,
  ogImage,
  ogUrl,
  ogType,
  canonical,
  noindex = false,
  structuredData,
  openGraphTags,
  twitterCardTags,
  cacheHeaders,
}) => {
  // Generate canonical URL if not provided
  const canonicalUrl = canonical || getCurrentCanonicalURL();
  
  // Use canonical URL for OG URL if not provided
  const openGraphUrl = ogUrl || canonicalUrl;
  
  // Default OG image fallback — always absolute URL
  const defaultOgImage = 'https://a1furniturepolish.com/android-chrome-512x512.png';
  const resolvedOgImage = ogImage
    ? ogImage.startsWith('http')
      ? ogImage
      : `https://a1furniturepolish.com${ogImage}`
    : defaultOgImage;
  
  return (
    <>
      <title>{title}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      <meta name="robots" content={noindex ? 'noindex, nofollow' : 'index, follow'} />
      <meta name="author" content="A1 Furniture Polish" />
      <meta name="language" content="English" />
      
      {/* Canonical URL - Always included */}
      <link rel="canonical" href={canonicalUrl} />
      
      {/* Geo Local SEO Meta Tags — Mumbai Targeting */}
      <meta name="geo.region" content="IN-MH" />
      <meta name="geo.placename" content="Mumbai" />
      <meta name="geo.position" content="19.1358;72.8347" />
      <meta name="ICBM" content="19.1358, 72.8347" />
      
      {/* Open Graph / Facebook */}
      {openGraphTags ? (
        // Use enhanced Open Graph tags from SEO system
        Object.entries(openGraphTags).map(([property, content]) => (
          <meta key={property} property={property} content={content} />
        ))
      ) : (
        // Fallback to basic Open Graph tags
        <>
          <meta property="og:title" content={ogTitle || title} />
          <meta property="og:description" content={ogDescription || description} />
          <meta property="og:type" content={ogType || 'website'} />
          <meta property="og:image" content={resolvedOgImage} />
          <meta property="og:url" content={openGraphUrl} />
          <meta property="og:site_name" content="A1 Furniture Polish" />
          <meta property="og:locale" content="en_IN" />
        </>
      )}
      
      {/* Twitter */}
      {twitterCardTags ? (
        // Use enhanced Twitter Card tags from SEO system
        Object.entries(twitterCardTags).map(([name, content]) => (
          <meta key={name} name={name} content={content} />
        ))
      ) : (
        // Fallback to basic Twitter Card tags
        <>
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content={ogTitle || title} />
          <meta name="twitter:description" content={ogDescription || description} />
          <meta name="twitter:image" content={resolvedOgImage} />
          <meta name="twitter:site" content="@a1furniturepolish" />
        </>
      )}
      
      {/* Cache Headers (for performance optimization) */}
      {cacheHeaders && Object.entries(cacheHeaders).map(([name, value]) => (
        <meta key={name} httpEquiv={name} content={value} />
      ))}
      
      {/* Structured Data (JSON-LD) */}
      {structuredData && (
        Array.isArray(structuredData) ? (
          structuredData.map((data, index) => (
            <script key={index} type="application/ld+json">
              {JSON.stringify(data)}
            </script>
          ))
        ) : (
          <script type="application/ld+json">
            {JSON.stringify(structuredData)}
          </script>
        )
      )}
    </>
  );
};

export default SEOHead;
