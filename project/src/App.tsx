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
import { CartProvider } from './context/CartContext';

function AppContent() {
  return (
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
  );
}

function App() {
  return (
    <CartProvider>
      <AppContent />
      <FloatingCart />
    </CartProvider>
  );
}

export default App;
