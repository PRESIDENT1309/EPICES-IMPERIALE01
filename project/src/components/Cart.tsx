import { useState } from 'react';
import { Trash2, ShoppingCart } from 'lucide-react';
import { useCart } from '../context/CartContext';
import OrderModal from './OrderModal';
import { saveOrderToSupabase, type AddressData } from '../utils/orderService';

export default function Cart() {
  const { cartItems, removeFromCart, updateQuantity, getTotal, clearCart } = useCart();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (cartItems.length === 0) {
    return (
      <section id="cart" className="py-16 sm:py-24 bg-black text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center">
            <ShoppingCart size={40} className="mx-auto mb-4 text-amber-500" />
            <h2 className="text-2xl sm:text-4xl font-bold mb-2 sm:mb-4">Votre Panier</h2>
            <p className="text-gray-400 text-base sm:text-lg">Votre panier est vide</p>
          </div>
        </div>
      </section>
    );
  }

  const formatPrice = (price: number): string => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'CDF',
      minimumFractionDigits: 0,
    }).format(price);
  };

  // Déterminer l'URL de base pour les images
  const total = getTotal();

  const generateWhatsAppMessage = (addressData: AddressData): string => {
    // Liste des produits avec prix
    const productsList = cartItems
      .map((item) => {
        const itemTotal = item.price * item.quantity;
        return `${item.name} (x${item.quantity}) - ${formatPrice(itemTotal)}`;
      })
      .join('\n');

    // Adresse complète
    const fullAddress = `${addressData.avenue}, ${addressData.quartier}, ${addressData.commune}`;

    // Message formaté selon le spécifié
    const message = `Bonjour Épices Impériale, je suis ${addressData.nom}. Je souhaite commander :\n${productsList}\n\nLivraison à : ${fullAddress}\nRéf : ${addressData.point_reference || 'N/A'}.`;

    return message;
  };

  const handleOrderConfirm = async (addressData: AddressData) => {
    setIsLoading(true);
    setError(null);

    try {
      // Enregistrer dans Supabase
      const result = await saveOrderToSupabase({
        addressData,
        cartItems: cartItems.map((item) => ({
          id: item.id,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
        })),
      });

      if (!result.success) {
        throw new Error(result.error || 'Erreur lors de l\'enregistrement');
      }

      // Si succès, ouvrir WhatsApp avec le message formaté
      const message = generateWhatsAppMessage(addressData);
      const whatsappUrl = `https://wa.me/243801910623?text=${encodeURIComponent(message)}`;

      // Attendre un peu avant d'ouvrir WhatsApp pour que l'utilisateur voit le message de succès
      setTimeout(() => {
        window.open(whatsappUrl, '_blank');
        // Vider le panier après la commande
        clearCart();
      }, 2000);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Une erreur s\'est produite';
      setError(errorMessage);
      console.error('Erreur:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleWhatsAppClick = () => {
    // Ouvrir la modal au lieu d'ouvrir WhatsApp directement
    setIsModalOpen(true);
  };

  return (
    <>
      <section id="cart" className="py-16 sm:py-24 bg-black text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-8 sm:mb-16 text-center">
            Votre <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-600">Panier</span>
          </h2>

          <div className="grid lg:grid-cols-3 gap-6 sm:gap-12">
            {/* Liste des produits */}
            <div className="lg:col-span-2 space-y-3 sm:space-y-4">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="bg-gray-900 rounded-lg p-3 sm:p-4 flex gap-3 sm:gap-4 items-start border border-gray-800 hover:border-amber-500 transition"
              >
                {/* Image */}
                <div className="w-16 h-16 sm:w-20 sm:h-20 flex-shrink-0">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover rounded-lg"
                  />
                </div>

                {/* Détails du produit */}
                <div className="flex-1 min-w-0">
                  <h3 className="text-base sm:text-lg font-bold mb-1 truncate">{item.name}</h3>
                  <p className="text-xs sm:text-sm text-amber-500 font-semibold mb-2 line-clamp-1">
                    {formatPrice(item.price)}/u
                  </p>

                  {/* Contrôles de quantité */}
                  <div className="flex items-center gap-2 flex-wrap">
                    <div className="flex items-center gap-2 bg-gray-800 rounded-lg p-1">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="w-6 h-6 sm:w-7 sm:h-7 flex items-center justify-center hover:bg-gray-700 rounded text-xs sm:text-sm font-semibold transition"
                      >
                        −
                      </button>
                      <span className="w-5 text-center font-semibold text-xs sm:text-sm">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="w-6 h-6 sm:w-7 sm:h-7 flex items-center justify-center hover:bg-gray-700 rounded text-xs sm:text-sm font-semibold transition"
                      >
                        +
                      </button>
                    </div>
                    <span className="text-xs sm:text-sm text-gray-400">
                      {formatPrice(item.price * item.quantity)}
                    </span>
                  </div>
                </div>

                {/* Bouton supprimer */}
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="text-red-500 hover:text-red-400 transition p-1 sm:p-2 flex-shrink-0"
                  aria-label="Supprimer du panier"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            ))}
          </div>

          {/* Résumé et commande */}
          <div className="lg:col-span-1">
            <div className="bg-gray-900 rounded-lg p-4 sm:p-6 border border-amber-500 sticky top-20">
              <h3 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">Résumé</h3>

              <div className="space-y-2 sm:space-y-3 mb-4 sm:mb-6 pb-4 sm:pb-6 border-b border-gray-800">
                <div className="flex justify-between text-xs sm:text-sm text-gray-400">
                  <span>Articles :</span>
                  <span className="font-semibold">
                    {cartItems.reduce((sum, item) => sum + item.quantity, 0)}
                  </span>
                </div>
                <div className="flex justify-between text-xs sm:text-sm text-gray-400">
                  <span>Produits :</span>
                  <span className="font-semibold">{cartItems.length}</span>
                </div>
              </div>

              {/* Total */}
              <div className="mb-4 sm:mb-6 pb-4 sm:pb-6 border-b border-gray-800">
                <div className="flex justify-between items-center">
                  <span className="text-base sm:text-lg font-bold">Total :</span>
                  <span className="text-2xl sm:text-3xl font-bold text-amber-500">
                    {formatPrice(total)}
                  </span>
                </div>
              </div>

              {/* Boutons */}
              <div className="space-y-3">
                <button
                  onClick={handleWhatsAppClick}
                  disabled={isLoading}
                  className="w-full bg-gradient-to-r from-amber-500 to-amber-600 text-black font-bold py-2 sm:py-3 rounded-lg hover:from-amber-400 hover:to-amber-500 transition transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base"
                >
                  {isLoading ? 'Traitement...' : 'Commander'}
                </button>
                <button
                  onClick={clearCart}
                  disabled={isLoading}
                  className="w-full bg-gray-800 hover:bg-gray-700 text-white font-bold py-2 sm:py-3 rounded-lg transition disabled:opacity-50 text-sm sm:text-base"
                >
                  Vider
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    {/* Modal de confirmation de commande */}
    <OrderModal
      isOpen={isModalOpen}
      onClose={() => {
        setIsModalOpen(false);
        setError(null);
      }}
      onConfirm={handleOrderConfirm}
      isLoading={isLoading}
      error={error}
    />
    </>
  );
}
