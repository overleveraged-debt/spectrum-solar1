import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title: string;
  description: string;
  type?: 'website' | 'article' | 'product';
  url?: string;
  image?: string;
  schema?: Record<string, any>;
}

const SEO: React.FC<SEOProps> = ({ 
  title, 
  description, 
  type = 'website', 
  url = 'https://spectrum-solar1.vercel.app', 
  image = 'https://spectrum-solar1.vercel.app/images/demo-green-energy-logo-white.png', 
  schema 
}) => {
  const finalImage = image.startsWith('http') ? image : `https://spectrum-solar1.vercel.app${image}`;
  const finalUrl = url.startsWith('http') ? url : `https://spectrum-solar1.vercel.app${url}`;

  return (
    <Helmet>
      {/* Standard Metadata */}
      <title>{title}</title>
      <meta name="description" content={description} />
      
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
      <link rel="sitemap" type="application/xml" href="https://spectrum-solar1.vercel.app/sitemap.xml" />

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
