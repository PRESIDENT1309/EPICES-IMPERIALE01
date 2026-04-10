import { Helmet } from 'react-helmet';

interface SEOProps {
  title: string;
  description: string;
  canonical?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  keywords?: string;
  author?: string;
  type?: 'website' | 'product' | 'article';
  image?: string;
}

export default function SEO({
  title,
  description,
  canonical,
  ogTitle,
  ogDescription,
  ogImage,
  keywords = 'épices Kinshasa, épices RDC, épices naturelles Afrique, acheter épices en ligne',
  author = 'ÉPICES IMPÉRIALE',
  type = 'website',
  image = 'https://epices-imperiale-01.vercel.app/assets/logo.png',
}: SEOProps) {
  const fullTitle = title.includes('ÉPICES IMPÉRIALE') ? title : `${title} | ÉPICES IMPÉRIALE`;
  const siteUrl = 'https://epices-imperiale-01.vercel.app';
  const canonicalUrl = canonical ? `${siteUrl}${canonical}` : siteUrl;

  return (
    <Helmet>
      {/* Standard Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content={author} />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta charSet="utf-8" />
      
      {/* Canonical */}
      <link rel="canonical" href={canonicalUrl} />
      
      {/* Robots */}
      <meta name="robots" content="index, follow" />
      <meta name="googlebot" content="index, follow" />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:title" content={ogTitle || fullTitle} />
      <meta property="og:description" content={ogDescription || description} />
      <meta property="og:image" content={ogImage || image} />
      <meta property="og:site_name" content="ÉPICES IMPÉRIALE" />
      <meta property="og:locale" content="fr_CD" />
      
      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={canonicalUrl} />
      <meta property="twitter:title" content={ogTitle || fullTitle} />
      <meta property="twitter:description" content={ogDescription || description} />
      <meta property="twitter:image" content={ogImage || image} />
      
      {/* Geo Tags - TRÈS IMPORTANT pour Kinshasa */}
      <meta name="geo.placename" content="Kinshasa, République Démocratique du Congo" />
      <meta name="geo.region" content="CD-KN" />
      <meta name="geo.position" content="-4.2629;15.2429" />
      <meta name="ICBM" content="-4.2629, 15.2429" />
      
      {/* Additional SEO */}
      <meta name="language" content="French" />
      <meta name="revisit-after" content="7 days" />
      <meta name="theme-color" content="#f59e0b" />
    </Helmet>
  );
}

/**
 * UTILISATION:
 * 
 * import SEO from '../components/SEO';
 * 
 * <SEO
 *   title="Nos Épices Premium"
 *   description="Découvrez nos épices naturelles cultivées en RDC. Livraison à Kinshasa."
 *   keywords="épices Kinshasa, épices RDC, acheter épices"
 *   canonical="/produits"
 * />
 */
