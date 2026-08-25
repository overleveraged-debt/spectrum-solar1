import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title: string;
  description: string;
  keywords?: string;
  type?: 'website' | 'article' | 'product';
  url?: string;
  image?: string;
  schema?: Record<string, any>;
  noindex?: boolean;
}

const SEO: React.FC<SEOProps> = ({ 
  title, 
  description, 
  keywords,
  type = 'website', 
  url = 'https://www.spectrumpowers.com', 
  image = 'https://www.spectrumpowers.com/logo.png', 
  schema,
  noindex = false
}) => {
  const finalImage = image.startsWith('http') ? image : `https://www.spectrumpowers.com${image}`;
  const finalUrl = url.startsWith('http') ? url : `https://www.spectrumpowers.com${url}`;

  return (
    <Helmet>
      {/* Standard Metadata */}
      <title>{title}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      {noindex && <meta name="robots" content="noindex, nofollow" />}
      
      {/* Canonical URL */}
      <link rel="canonical" href={finalUrl} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={finalUrl} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={finalImage} />

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={finalUrl} />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={finalImage} />

      {/* Discoverable Sitemap */}
      <link rel="sitemap" type="application/xml" href="https://www.spectrumpowers.com/sitemap.xml" />

      {/* Structured Data (Schema.org) */}
      {schema && (
        <script type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      )}
    </Helmet>
  );
};

export default SEO;
