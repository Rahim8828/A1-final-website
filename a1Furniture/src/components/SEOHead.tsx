import { getCanonicalURL, getCurrentCanonicalURL } from '../utils/canonicalURL';

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
          {ogImage && <meta property="og:image" content={ogImage} />}
          <meta property="og:url" content={openGraphUrl} />
          <meta property="og:site_name" content="A1 Furniture Polish" />
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
          {ogImage && <meta name="twitter:image" content={ogImage} />}
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
