import { useState, useEffect } from 'react';
import { ShoppingCart } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { supabase } from '../supabaseClient';
import OrderModal from './OrderModal';
import { saveOrderToSupabase, type AddressData } from '../utils/orderService';

interface Product {
  id: number;
  nom: string;
  prix: number;
  description: string;
  image_url: string;
  is_available: boolean;
}

export default function Products() {
  const { addToCart } = useCart();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedProductForOrder, setSelectedProductForOrder] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isOrderLoading, setIsOrderLoading] = useState(false);
  const [orderError, setOrderError] = useState<string | null>(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError(null);

      const { data, error: supabaseError } = await supabase
        .from('Table de produits')
        .select('*');

      if (supabaseError) {
        throw supabaseError;
      }

      // Si pas de données, utiliser les données de secours
      if (!data || data.length === 0) {
        setProducts(getFallbackProducts());
      } else {
        setProducts(data);
      }
    } catch (err) {
      console.error('Erreur lors du chargement des produits:', err);
      // Utiliser les données de secours en cas d'erreur
      setProducts(getFallbackProducts());
      setError(null); // Ne pas afficher d'erreur, utiliser les données de secours
    } finally {
      setLoading(false);
    }
  };

  // Données de secours si Supabase ne fonctionne pas
  const getFallbackProducts = (): Product[] => [
    {
      id: 1,
      nom: 'Piment en Poudre',
      prix: 5000,
      description: 'Piment rouge 100% naturel, cultivé en RDC',
      image_url: '/images/piment.jpg',
      is_available: true,
    },
    {
      id: 2,
      nom: 'Clou de Girofle',
      prix: 8000,
      description: 'Clou de girofle premium d\'origine africaine',
      image_url: '/images/clou-girofle.jpg',
      is_available: true,
    },
    {
      id: 3,
      nom: 'Curcuma Bio',
      prix: 6000,
      description: 'Curcuma biologique riche en curcumine',
      image_url: '/images/curcuma.jpg',
      is_available: true,
    },
  ];

  const formatPrice = (price: number): string => {
    return new Intl.NumberFormat('fr-FR', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price) + ' CDF';
  };

  const handleAddToCart = (product: Product) => {
    addToCart({
      id: product.id,
      name: product.nom,
      price: product.prix,
      image: product.image_url || '/images/default-spice.jpg',
    });
  };

  const handleOrderNow = (product: Product) => {
    setSelectedProductForOrder(product);
    setIsModalOpen(true);
    setOrderError(null);
  };

  const generateWhatsAppMessage = (product: Product, addressData: AddressData): string => {
    const formattedPrice = formatPrice(product.prix);
    const fullAddress = `${addressData.avenue}, ${addressData.quartier}, ${addressData.commune}`;

    const message = `Bonjour Épices Impériale, je suis ${addressData.nom}. Je souhaite commander :\n${product.nom} - ${formattedPrice}\n\nLivraison à : ${fullAddress}${
      addressData.point_reference ? `\nRéf : ${addressData.point_reference}` : ''
    }.`;

    return message;
  };

  const handleOrderConfirm = async (addressData: AddressData) => {
    if (!selectedProductForOrder) return;

    setIsOrderLoading(true);
    setOrderError(null);

    try {
      // Enregistrer dans Supabase
      const result = await saveOrderToSupabase({
        addressData,
        cartItems: [
          {
            id: selectedProductForOrder.id,
            name: selectedProductForOrder.nom,
            price: selectedProductForOrder.prix,
            quantity: 1,
          },
        ],
      });

      if (!result.success) {
        throw new Error(result.error || 'Erreur lors de l\'enregistrement');
      }

      // Si succès, ouvrir WhatsApp avec le message formaté
      const message = generateWhatsAppMessage(selectedProductForOrder, addressData);
      const whatsappUrl = `https://wa.me/243801910623?text=${encodeURIComponent(message)}`;

      // Attendre un peu avant d'ouvrir WhatsApp pour que l'utilisateur voit le message de succès
      setTimeout(() => {
        window.open(whatsappUrl, '_blank');
        setIsModalOpen(false);
        setSelectedProductForOrder(null);
      }, 1500);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Une erreur s\'est produite';
      setOrderError(errorMessage);
      console.error('Erreur:', err);
    } finally {
      setIsOrderLoading(false);
    }
  };

  return (
    <section id="produits" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-black mb-4">
            NOS <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-amber-600">ÉPICES</span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Une sélection d'épices premium pour transformer vos plats en chefs-d'œuvre culinaires
          </p>
        </div>

        <OrderModal
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setSelectedProductForOrder(null);
            setOrderError(null);
          }}
          onConfirm={handleOrderConfirm}
          isLoading={isOrderLoading}
          error={orderError}
        />

        {error && (
          <div className="mb-8 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
            {error}
          </div>
        )}

        {loading ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-500"></div>
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            Aucun produit disponible pour le moment.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {products.map((product) => (
              <div
                key={product.id}
                className={`group bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 ${
                  !product.is_available ? 'opacity-60' : ''
                }`}
              >
                <div className="relative h-68 overflow-hidden">
                  {product.image_url ? (
                    <img
                      src={product.image_url}
                      alt={product.nom}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.style.display = 'none';
                        target.nextElementSibling?.classList.remove('hidden');
                      }}
                    />
                  ) : null}
                  <div className={`w-full h-full bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center p-4 ${
                    product.image_url ? 'hidden' : ''
                  }`}>
                    <p className="text-white text-center font-bold text-lg">{product.nom}</p>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>

                <div className="p-6">
                  <h3 className="text-2xl font-bold text-black mb-2">{product.nom}</h3>
                  <p className="text-gray-600 mb-4 text-sm leading-relaxed">{product.description}</p>

                  <div className="mb-4 flex items-center justify-between">
                    <span className="text-3xl font-bold text-amber-600">{formatPrice(product.prix)}</span>
                    {!product.is_available && (
                      <span className="text-xs font-semibold text-red-600 bg-red-50 px-2 py-1 rounded">
                        Indisponible
                      </span>
                    )}
                  </div>

                  <div className="space-y-2">
                    <button
                      onClick={() => handleAddToCart(product)}
                      disabled={!product.is_available}
                      className={`w-full flex items-center justify-center space-x-2 px-4 py-2 rounded-lg transition-colors duration-300 font-semibold ${
                        product.is_available
                          ? 'bg-amber-500 text-white hover:bg-amber-600'
                          : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      }`}
                    >
                      <ShoppingCart size={18} />
                      <span>Ajouter au panier</span>
                    </button>
                    <button
                      onClick={() => handleOrderNow(product)}
                      disabled={!product.is_available}
                      className={`w-full px-4 py-2 rounded-lg transition-colors duration-300 font-semibold text-sm ${
                        product.is_available
                          ? 'bg-black text-white hover:bg-gray-800'
                          : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      }`}
                    >
                      Commander maintenant
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
