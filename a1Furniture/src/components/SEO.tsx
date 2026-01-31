import { Helmet } from 'react-helmet-async';
import { getCurrentCanonicalURL } from '../utils/canonicalURL';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  canonical?: string;
}

const SEO: React.FC<SEOProps> = ({
  title = 'Furniture Polish Services - A1 Polish',
  description = 'Professional furniture polishing services in Mumbai. 15+ services including sofa, bed, door, table, wardrobe polish with 1-year warranty. Book now!',
  keywords = 'furniture polish, wood polish, sofa polish, bed polish, door polish, Mumbai furniture services, A1 polish',
  image = '/assets/og-image.jpg',
  url,
  canonical,
}) => {
  // Generate canonical URL if not provided
  const canonicalUrl = canonical || url || getCurrentCanonicalURL();
  const ogUrl = url || canonicalUrl;
  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{title}</title>
      <meta name="title" content={title} />
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={ogUrl} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={ogUrl} />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={image} />

      {/* Additional Meta Tags */}
      <meta name="robots" content="index, follow" />
      <meta name="language" content="English" />
      <meta name="author" content="A1 Polish" />
      
      {/* Canonical URL - Always included */}
      <link rel="canonical" href={canonicalUrl} />
    </Helmet>
  );
};

export default SEO;
