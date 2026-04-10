import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  canonical?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  ogUrl?: string;
  twitterCard?: string;
  twitterTitle?: string;
  twitterDescription?: string;
  twitterImage?: string;
  locale?: string;
  robots?: string;
}

export default function SEO({
  title = 'ÉPICES IMPÉRIALE - Épices Premium Kinshasa',
  description = 'Découvrez nos épices naturelles premium importées à Kinshasa. Poivre, piment, clou de girofle et bien plus. Livraison rapide à domicile.',
  keywords = 'épices Kinshasa, acheter épices RDC, piment en poudre Kinshasa, épices naturelles Afrique',
  canonical = 'https://epicesimperiale.cd',
  ogTitle = 'ÉPICES IMPÉRIALE | Épices Premium',
  ogDescription = 'Épices naturelles de qualité supérieure livrées à domicile à Kinshasa',
  ogImage = 'https://epicesimperiale.cd/og-image.jpg',
  ogUrl = 'https://epicesimperiale.cd',
  twitterCard = 'summary_large_image',
  twitterTitle = 'ÉPICES IMPÉRIALE',
  twitterDescription = 'Épices Premium à Kinshasa',
  twitterImage = 'https://epicesimperiale.cd/twitter-image.jpg',
  locale = 'fr_CD',
  robots = 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1',
}: SEOProps) {
  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="robots" content={robots} />
      <meta name="language" content="French" />
      <meta name="revisit-after" content="7 days" />

      {/* Canonical URL */}
      <link rel="canonical" href={canonical} />

      {/* OpenGraph Tags */}
      <meta property="og:title" content={ogTitle} />
      <meta property="og:description" content={ogDescription} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:url" content={ogUrl} />
      <meta property="og:type" content="website" />
      <meta property="og:locale" content={locale} />
      <meta property="og:site_name" content="ÉPICES IMPÉRIALE" />

      {/* Twitter Card Tags */}
      <meta name="twitter:card" content={twitterCard} />
      <meta name="twitter:title" content={twitterTitle} />
      <meta name="twitter:description" content={twitterDescription} />
      <meta name="twitter:image" content={twitterImage} />

      {/* Geo-targeting Tags */}
      <meta name="geo.position" content="-4.3276;15.3136" />
      <meta name="geo.region" content="CD-KN" />
      <meta name="geo.placename" content="Kinshasa" />
      <meta name="location" content="Kinshasa, Democratic Republic of the Congo" />

      {/* Additional Meta Tags */}
      <meta name="author" content="ÉPICES IMPÉRIALE" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="theme-color" content="#b45309" />

      {/* Preconnect for Performance */}
      <link rel="preconnect" href="https://supabase.com" crossOrigin="anonymous" />
    </Helmet>
  );
}
