import { Facebook, Instagram, Linkedin, Mail } from 'lucide-react';
import logo from '../images/logo.png.jpeg';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-b from-gray-900 to-black text-white py-12 border-t border-amber-500/20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div className="md:col-span-2">
           <div className="flex items-center gap-3 mb-4">
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
            <p className="text-gray-400 mb-4 leading-relaxed">
              Une marque premium d'IMPERIAL GROUP. Valorisant les richesses congolaise à travers des épices d'exception.
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="w-10 h-10 bg-amber-500/10 rounded-full flex items-center justify-center hover:bg-amber-500/20 transition-colors duration-300"
              >
                <Facebook size={20} className="text-amber-500" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-amber-500/10 rounded-full flex items-center justify-center hover:bg-amber-500/20 transition-colors duration-300"
              >
                <Instagram size={20} className="text-amber-500" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-amber-500/10 rounded-full flex items-center justify-center hover:bg-amber-500/20 transition-colors duration-300"
              >
                <Linkedin size={20} className="text-amber-500" />
              </a>
              <a
                href="mailto:contact@epicesimperiale.com"
                className="w-10 h-10 bg-amber-500/10 rounded-full flex items-center justify-center hover:bg-amber-500/20 transition-colors duration-300"
              >
                <Mail size={20} className="text-amber-500" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4 text-amber-500">Navigation</h3>
            <ul className="space-y-2">
              <li>
                <a href="#accueil" className="text-gray-400 hover:text-white transition-colors duration-300">
                  Accueil
                </a>
              </li>
              <li>
                <a href="#produits" className="text-gray-400 hover:text-white transition-colors duration-300">
                  Produits
                </a>
              </li>
              <li>
                <a href="#apropos" className="text-gray-400 hover:text-white transition-colors duration-300">
                  À Propos
                </a>
              </li>
              <li>
                <a href="#contact" className="text-gray-400 hover:text-white transition-colors duration-300">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4 text-amber-500">Contact</h3>
            <ul className="space-y-2 text-gray-400">
              <li>Kinshasa, RDC</li>
              <li>+243 80 191 06 23</li>
              <li>empire1309@gmail.com</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-400 text-sm">
              {currentYear} ÉPICES IMPÉRIALE - IMPERIAL GROUP. Tous droits réservés.
            </p>
            <p className="text-gray-400 text-sm">
              Conçu avec passion pour l'excellence africaine
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
