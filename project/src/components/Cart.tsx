import { Trash2, ShoppingCart } from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function Cart() {
  const { cartItems, removeFromCart, updateQuantity, getTotal, clearCart } = useCart();

  if (cartItems.length === 0) {
    return (
      <section id="cart" className="py-24 bg-black text-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center">
            <ShoppingCart size={48} className="mx-auto mb-4 text-amber-500" />
            <h2 className="text-4xl font-bold mb-4">Votre Panier</h2>
            <p className="text-gray-400 text-lg">Votre panier est vide</p>
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
  const getBaseUrl = (): string => {
    if (typeof window !== 'undefined' && window.location.hostname === 'localhost') {
      return 'http://localhost:5173'; // Vite default port
    }
    // Pour la production (Vercel)
    return window.location.origin;
  };

  const total = getTotal();
  const baseUrl = getBaseUrl();

  const generateWhatsAppMessage = (): string => {
    let message = 'Bonjour Épices Impériale, je souhaite passer commande :\n\n';
    
    cartItems.forEach((item) => {
      const itemTotal = item.price * item.quantity;
      const imageUrl = `${baseUrl}${item.image}`;
      message += `- ${item.name} (x${item.quantity}) : ${formatPrice(itemTotal)}\n`;
      message += `${imageUrl}\n\n`;
    });
    
    message += `Total : ${formatPrice(total)}`;
    
    return message;
  };

  const handleWhatsAppClick = () => {
    const message = generateWhatsAppMessage();
    const whatsappUrl = `https://wa.me/243801910623?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <section id="cart" className="py-24 bg-black text-white">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-4xl md:text-5xl font-bold mb-16 text-center">
          Votre <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-600">Panier</span>
        </h2>

        <div className="grid lg:grid-cols-3 gap-12">
          {/* Liste des produits */}
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="bg-gray-900 rounded-lg p-6 flex gap-4 items-start border border-gray-800 hover:border-amber-500 transition"
              >
                {/* Image */}
                <div className="w-24 h-24 flex-shrink-0">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover rounded-lg"
                  />
                </div>

                {/* Détails du produit */}
                <div className="flex-1">
                  <h3 className="text-xl font-bold mb-2">{item.name}</h3>
                  <p className="text-amber-500 font-semibold mb-4">
                    {formatPrice(item.price)} par unité
                  </p>

                  {/* Contrôles de quantité */}
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="px-3 py-1 bg-gray-800 hover:bg-gray-700 rounded text-sm font-semibold transition"
                    >
                      −
                    </button>
                    <span className="w-8 text-center font-semibold">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="px-3 py-1 bg-gray-800 hover:bg-gray-700 rounded text-sm font-semibold transition"
                    >
                      +
                    </button>
                    <span className="ml-auto text-gray-400">
                      Total : {formatPrice(item.price * item.quantity)}
                    </span>
                  </div>
                </div>

                {/* Bouton supprimer */}
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="text-red-500 hover:text-red-400 transition p-2"
                  aria-label="Supprimer du panier"
                >
                  <Trash2 size={20} />
                </button>
              </div>
            ))}
          </div>

          {/* Résumé et commande */}
          <div className="lg:col-span-1">
            <div className="bg-gray-900 rounded-lg p-8 border border-amber-500 sticky top-20">
              <h3 className="text-2xl font-bold mb-6">Résumé</h3>

              <div className="space-y-4 mb-8 pb-8 border-b border-gray-800">
                <div className="flex justify-between text-gray-400">
                  <span>Nombre d'articles :</span>
                  <span className="font-semibold">
                    {cartItems.reduce((sum, item) => sum + item.quantity, 0)}
                  </span>
                </div>
                <div className="flex justify-between text-gray-400">
                  <span>Nombre de produits :</span>
                  <span className="font-semibold">{cartItems.length}</span>
                </div>
              </div>

              {/* Total */}
              <div className="mb-6 pb-6 border-b border-gray-800">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-bold">Total :</span>
                  <span className="text-3xl font-bold text-amber-500">
                    {formatPrice(total)}
                  </span>
                </div>
              </div>

              {/* Boutons */}
              <div className="space-y-4">
                <button
                  onClick={handleWhatsAppClick}
                  className="w-full bg-gradient-to-r from-amber-500 to-amber-600 text-black font-bold py-3 rounded-lg hover:from-amber-400 hover:to-amber-500 transition transform hover:scale-105"
                >
                  Commander sur WhatsApp
                </button>
                <button
                  onClick={clearCart}
                  className="w-full bg-gray-800 hover:bg-gray-700 text-white font-bold py-3 rounded-lg transition"
                >
                  Vider le panier
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
