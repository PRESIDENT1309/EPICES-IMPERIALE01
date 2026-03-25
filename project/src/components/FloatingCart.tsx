import { ShoppingCart } from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function FloatingCart() {
  const { cartItems } = useCart();

  const handleScrollToCart = () => {
    const cartSection = document.getElementById('cart');
    if (cartSection) {
      cartSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const hasItems = totalItems > 0;

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Icône flottante */}
      <button
        onClick={handleScrollToCart}
        className={`relative flex items-center justify-center w-16 h-16 rounded-full shadow-2xl transition-all duration-300 transform hover:scale-110 ${
          hasItems
            ? 'bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500'
            : 'bg-gray-800 hover:bg-gray-700 border-2 border-amber-500'
        }`}
        aria-label="Ouvrir le panier"
        title="Aller au panier"
      >
        <ShoppingCart
          size={28}
          className={hasItems ? 'text-black' : 'text-amber-500'}
        />

        {/* Badge de notification */}
        {hasItems && (
          <div className="absolute -top-2 -right-2 flex items-center justify-center w-7 h-7 bg-red-500 text-white text-xs font-bold rounded-full shadow-lg border-2 border-white">
            {totalItems > 99 ? '99+' : totalItems}
          </div>
        )}
      </button>

      {/* Info bulle au survol */}
      <div className="absolute bottom-20 right-0 mb-2 px-3 py-2 bg-gray-900 text-white text-sm rounded-lg shadow-lg opacity-0 hover:opacity-100 transition-opacity duration-200 whitespace-nowrap border border-amber-500">
        {hasItems ? `${totalItems} article${totalItems > 1 ? 's' : ''} dans le panier` : 'Panier vide'}
      </div>
    </div>
  );
}
