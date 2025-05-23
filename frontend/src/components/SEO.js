import React from 'react';
import { Helmet } from 'react-helmet-async';

function SEO({ title, description, keywords, schemaType = 'WebPage', children }) {
  // Default values
  const defaultTitle = 'All in One Tools - Free Online Utilities';
  const defaultDescription = 'All in One Tools - Free online utilities including ID Generator and Character Counter';
  const defaultKeywords = 'online tools, id generator, character counter, text analysis, uuid generator';
  
  // Use provided values or defaults
  const seoTitle = title ? `${title} | All in One Tools` : defaultTitle;
  const seoDescription = description || defaultDescription;
  const seoKeywords = keywords || defaultKeywords;
  
  return (
    <Helmet>
      {/* Basic meta tags */}
      <title>{seoTitle}</title>
      <meta name="description" content={seoDescription} />
      <meta name="keywords" content={seoKeywords} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:title" content={seoTitle} />
      <meta property="og:description" content={seoDescription} />
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={seoTitle} />
      <meta name="twitter:description" content={seoDescription} />
      
      {/* Schema.org structured data */}
      <script type="application/ld+json">
        {JSON.stringify({
          '@context': 'https://schema.org',
          '@type': schemaType,
          name: seoTitle,
          description: seoDescription,
          url: window.location.href,
        })}
      </script>
      
      {children}
    </Helmet>
  );
}

export default SEO;