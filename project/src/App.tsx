import { useEffect, useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Products from './components/Products';
import Cart from './components/Cart';
import About from './components/About';
import Vision from './components/Vision';
import WhyChooseUs from './components/WhyChooseUs';
import Lifestyle from './components/Lifestyle';
import Contact from './components/Contact';
import Footer from './components/Footer';
import FloatingCart from './components/FloatingCart';
import SEO from './components/SEO';
import { SchemaOrganization } from './components/Schema';
import { CartProvider } from './context/CartContext';

function AppContent() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-black flex items-center justify-center z-50">
        <div className="text-center animate-fadeIn">
          <div className="mb-8">
            <div className="text-5xl font-bold mb-2">
              <span className="text-white">ÉPICES</span>
              <span className="text-amber-500"> IMPÉRIALE</span>
            </div>
            <div className="text-amber-500/50 text-sm tracking-widest">IMPERIAL GROUP</div>
          </div>
          <div className="flex space-x-2 justify-center">
            <div className="w-3 h-3 bg-amber-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
            <div className="w-3 h-3 bg-amber-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
            <div className="w-3 h-3 bg-amber-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <SEO
        title="Épices Premium Kinshasa | ÉPICES IMPÉRIALE"
        description="Découvrez nos épices 100% naturelles cultivées en RDC. Piment, clou de girofle, curcuma bio... Livraison à Kinshasa. Commande sur WhatsApp."
        keywords="épices Kinshasa, acheter épices RDC, piment en poudre, épices naturelles, épices Afrique"
        canonical="/"
      />
      <SchemaOrganization />
      
      <div className="min-h-screen bg-white">
        <Header />
        <main>
          <Hero />
          <Products />
          <Cart />
          <About />
          <Vision />
          <WhyChooseUs />
          <Lifestyle />
          <Contact />
      </main>
      <Footer />
      </div>
    </>
  );
}

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-black flex items-center justify-center z-50">
        <div className="text-center animate-fadeIn">
          <div className="mb-8">
            <div className="text-5xl font-bold mb-2">
              <span className="text-white">ÉPICES</span>
              <span className="text-amber-500"> IMPÉRIALE</span>
            </div>
            <div className="text-amber-500/50 text-sm tracking-widest">IMPERIAL GROUP</div>
          </div>
          <div className="flex space-x-2 justify-center">
            <div className="w-3 h-3 bg-amber-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
            <div className="w-3 h-3 bg-amber-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
            <div className="w-3 h-3 bg-amber-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <CartProvider>
      <AppContent />
      <FloatingCart />
    </CartProvider>
  );
}

export default App;
