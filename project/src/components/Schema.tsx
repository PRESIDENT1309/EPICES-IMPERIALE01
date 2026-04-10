import { Helmet } from 'react-helmet';

/**
 * SCHEMA ORG POUR E-COMMERCE
 * Aide Google à comprendre ta structure
 */

interface SchemaProduct {
  name: string;
  description: string;
  price: number;
  currency?: string;
  image?: string;
  availability?: 'InStock' | 'OutOfStock';
  rating?: number;
  reviewCount?: number;
}

interface SchemaOrganization {
  name?: string;
  description?: string;
  logo?: string;
  sameAs?: string[];
  address?: {
    streetAddress?: string;
    addressLocality?: string;
    addressRegion?: string;
    postalCode?: string;
    addressCountry?: string;
  };
  contactPoint?: {
    telephone?: string;
    contactType?: string;
  };
}

/**
 * SCHEMA ORGANISATION
 * À UTILISER UNE SEULE FOIS sur la homepage
 */
export function SchemaOrganization({
  name = 'ÉPICES IMPÉRIALE',
  description = 'Épices premium cultivées en RDC. Livraison à Kinshasa.',
  logo = 'https://epices-imperiale-01.vercel.app/assets/logo.png',
  sameAs = [
    'https://www.facebook.com/epicesimperiale',
    'https://www.instagram.com/epicesimperiale',
    'https://wa.me/243801910623'
  ],
}: SchemaOrganization) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name,
    description,
    image: logo,
    url: 'https://epices-imperiale-01.vercel.app',
    logo: {
      '@type': 'ImageObject',
      url: logo,
      width: 250,
      height: 60
    },
    sameAs,
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Kinshasa',
      addressLocality: 'Kinshasa',
      addressRegion: 'Kinshasa',
      addressCountry: 'CD'
    },
    telephone: '+243801910623',
    email: 'empire1309@gmail.com',
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'Customer Service',
      telephone: '+243801910623',
      email: 'empire1309@gmail.com',
      contactOption: 'TollFree'
    },
    areaServed: {
      '@type': 'City',
      name: 'Kinshasa',
      addressCountry: 'CD'
    },
    priceRange: '$$'
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(schema)}
      </script>
    </Helmet>
  );
}

/**
 * SCHEMA PRODUIT
 * À UTILISER pour chaque produit
 */
export function SchemaProduct({
  name,
  description,
  price,
  currency = 'CDF',
  image = 'https://epices-imperiale-01.vercel.app/assets/logo.png',
  availability = 'InStock',
  rating = 4.8,
  reviewCount = 125,
}: SchemaProduct) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name,
    description,
    image,
    brand: {
      '@type': 'Brand',
      name: 'ÉPICES IMPÉRIALE'
    },
    manufacturer: {
      '@type': 'Organization',
      name: 'IMPERIAL GROUP',
      url: 'https://epices-imperiale-01.vercel.app'
    },
    offers: {
      '@type': 'Offer',
      url: 'https://epices-imperiale-01.vercel.app',
      priceCurrency: currency,
      price: price.toString(),
      availability: `https://schema.org/${availability}`,
      seller: {
        '@type': 'Organization',
        name: 'ÉPICES IMPÉRIALE'
      }
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: rating.toString(),
      ratingCount: reviewCount.toString()
    },
    areaServed: {
      '@type': 'City',
      name: 'Kinshasa'
    }
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(schema)}
      </script>
    </Helmet>
  );
}

/**
 * BREADCRUMB SCHEMA
 * À UTILISER pour améliorer la navigation
 */
export function SchemaBreadcrumb(items: Array<{ name: string; url: string }>) {
  const breadcrumbs = items.map((item, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: item.name,
    item: item.url
  }));

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbs
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(schema)}
      </script>
    </Helmet>
  );
}

/**
 * SCHEMA FAQ
 * À UTILISER sur la page FAQ
 */
export function SchemaFAQ(faqs: Array<{ question: string; answer: string }>) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer
      }
    }))
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(schema)}
      </script>
    </Helmet>
  );
}
