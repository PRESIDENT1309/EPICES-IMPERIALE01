import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import logo from '../images/logo.png.jpeg';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-md border-b border-amber-500/20">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <img 
    src={logo}
    alt="Logo Epices Imperiale" 
    className="w-12 h-12 rounded-full shadow-lg border border-amber-500"
  />
  <span className="text-2xl font-bold">
    <span className="text-white">ÉPICES</span>
    <span className="text-amber-500"> IMPÉRIALE</span>
  </span>
</div>

          <nav className="hidden md:flex items-center space-x-8">
            <button onClick={() => scrollToSection('accueil')} className="text-white hover:text-amber-500 transition-colors duration-300 text-sm tracking-wider">
              ACCUEIL
            </button>
            <button onClick={() => scrollToSection('produits')} className="text-white hover:text-amber-500 transition-colors duration-300 text-sm tracking-wider">
              PRODUITS
            </button>
            <button onClick={() => scrollToSection('apropos')} className="text-white hover:text-amber-500 transition-colors duration-300 text-sm tracking-wider">
              À PROPOS
            </button>
            <button onClick={() => scrollToSection('vision')} className="text-white hover:text-amber-500 transition-colors duration-300 text-sm tracking-wider">
              VISION
            </button>
            <button onClick={() => scrollToSection('contact')} className="text-white hover:text-amber-500 transition-colors duration-300 text-sm tracking-wider">
              CONTACT
            </button>
            <button
              onClick={() => scrollToSection('contact')}
              className="px-6 py-2 bg-gradient-to-r from-amber-500 to-amber-600 text-black font-semibold rounded hover:from-amber-600 hover:to-amber-700 transition-all duration-300 transform hover:scale-105"
            >
              COMMANDER
            </button>
          </nav>

          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-white"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {isMenuOpen && (
          <nav className="md:hidden mt-4 pb-4 flex flex-col space-y-4 animate-fadeIn">
            <button onClick={() => scrollToSection('accueil')} className="text-white hover:text-amber-500 transition-colors duration-300 text-left">
              ACCUEIL
            </button>
            <button onClick={() => scrollToSection('produits')} className="text-white hover:text-amber-500 transition-colors duration-300 text-left">
              PRODUITS
            </button>
            <button onClick={() => scrollToSection('apropos')} className="text-white hover:text-amber-500 transition-colors duration-300 text-left">
              À PROPOS
            </button>
            <button onClick={() => scrollToSection('vision')} className="text-white hover:text-amber-500 transition-colors duration-300 text-left">
              VISION
            </button>
            <button onClick={() => scrollToSection('contact')} className="text-white hover:text-amber-500 transition-colors duration-300 text-left">
              CONTACT
            </button>
            <button
              onClick={() => scrollToSection('contact')}
              className="px-6 py-2 bg-gradient-to-r from-amber-500 to-amber-600 text-black font-semibold rounded hover:from-amber-600 hover:to-amber-700 transition-all duration-300 text-center"
            >
              COMMANDER
            </button>
          </nav>
        )}
      </div>
    </header>
  );
}
