/**
 * EXEMPLE: Comment utiliser SEO et Schema pour une page produit
 * Copie-colle ce modèle pour tes pages produits
 */

import SEO from '../components/SEO';
import { SchemaProduct, SchemaBreadcrumb } from '../components/Schema';
import { PRODUCT_DESCRIPTIONS } from '../data/seo-content';

interface ProductDetailProps {
  productId: string;
}

export default function ProductDetail({ productId }: ProductDetailProps) {
  // Récupérer les données produit (exemple: piment)
  const product = PRODUCT_DESCRIPTIONS.piment_poudre;
  
  const productUrl = `/produit/${productId}`;

  return (
    <>
      {/* SEO TAGS */}
      <SEO
        title={product.title}
        description={product.description_short}
        keywords={product.keywords.join(', ')}
        canonical={productUrl}
        ogTitle={product.title}
        ogDescription={product.description_short}
        ogImage="https://epices-imperiale-01.vercel.app/images/piment.jpg"
        type="product"
      />

      {/* SCHEMA - BREADCRUMB */}
      {SchemaBreadcrumb([
        { name: 'Accueil', url: 'https://epicesimperiale.cd' },
        { name: 'Produits', url: 'https://epicesimperiale.cd/#produits' },
        { name: product.title, url: `https://epicesimperiale.cd${productUrl}` }
      ])}

      {/* SCHEMA - PRODUIT */}
      <SchemaProduct
        name={product.title}
        description={product.description_long}
        price={5000}
        currency="CDF"
        image="https://epices-imperiale-01.vercel.app/images/piment.jpg"
        availability="InStock"
      />

      {/* PAGE CONTENT */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* H1 - Très important pour SEO */}
        <h1 className="text-4xl font-bold mb-4 text-black">
          {product.h1}
        </h1>

        {/* H2 - Structure du contenu */}
        <h2 className="text-2xl font-semibold mb-8 text-gray-700">
          100% Naturel, Cultivé en RDC, Transformé à Kinshasa
        </h2>

        {/* Image optimisée */}
        <img
          src="https://epices-imperiale-01.vercel.app/images/piment.jpg"
          alt={product.title}
          className="w-full max-w-2xl mb-8 rounded-lg shadow-lg"
          loading="lazy" // Important pour performance!
        />

        {/* Description textuelle */}
        <div className="prose prose-lg mb-8">
          <p>{product.description_long}</p>
        </div>

        {/* Caractéristiques - améliore SEO */}
        <section className="mb-12">
          <h3 className="text-xl font-bold mb-4">Caractéristiques Principales</h3>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            <li>Cultivé en RDC, transformé localement à Kinshasa</li>
            <li>100% naturel, sans conservateurs artificiels</li>
            <li>Saveur piquante intense</li>
            <li>Certifié premium pour qualité</li>
            <li>Livraison rapide à Kinshasa</li>
          </ul>
        </section>

        {/* FAQ - Excellent pour SEO! */}
        <section className="mb-12">
          <h3 className="text-xl font-bold mb-4">Questions Fréquentes</h3>
          
          <details className="mb-4 p-4 border rounded">
            <summary className="font-semibold">D'où provient ce piment?</summary>
            <p>Notre piment est cultivé en RDC selon nos standards premium. Transformé localement à Kinshasa.</p>
          </details>

          <details className="mb-4 p-4 border rounded">
            <summary className="font-semibold">Peut-on le commander à Kinshasa?</summary>
            <p>Oui! Livraison rapide à Kinshasa. Commandez via WhatsApp: +243 80 191 06 23</p>
          </details>

          <details className="mb-4 p-4 border rounded">
            <summary className="font-semibold">Est-ce vraiment 100% naturel?</summary>
            <p>Absolument. Toutes nos épices ÉPICES IMPÉRIALE sont 100% naturelles, sans aucun additif.</p>
          </details>
        </section>

        {/* Related Products - Améliore UX et SEO */}
        <section>
          <h3 className="text-xl font-bold mb-4">Autres Épices Premium</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <a href="/produit/clou-de-girofle" className="p-4 border rounded hover:shadow-lg">
              <h4 className="font-bold">Clou de Girofle</h4>
              <p className="text-sm text-gray-600">Saveur chaude et légèrement sucrée</p>
            </a>
            <a href="/produit/curcuma-bio" className="p-4 border rounded hover:shadow-lg">
              <h4 className="font-bold">Curcuma Bio</h4>
              <p className="text-sm text-gray-600">Riche en curcumine biologique</p>
            </a>
          </div>
        </section>
      </div>
    </>
  );
}

/**
 * BONNES PRATIQUES SEO APPLIQUÉES:
 * 
 * ✅ Title optimisé (productName + Brand + Location)
 * ✅ Meta description avec keywords locaux
 * ✅ H1 unique et contenant mots-clés
 * ✅ H2/H3 pour structure logique
 * ✅ Schema.org Product pour rich snippets
 * ✅ Breadcrumb schema pour navigation
 * ✅ Images avec alt text et lazy loading
 * ✅ Contenu riche avec FAQ
 * ✅ Mots-clés naturels dans le texte
 * ✅ Liens internes vers autres produits
 * ✅ Mots-clés locaux (Kinshasa, RDC)
 * ✅ Contenu structuré H1→H2→H3
 */
