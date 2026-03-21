import { ChevronDown } from 'lucide-react';

export default function Hero() {
  const scrollToProducts = () => {
    const element = document.getElementById('produits');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="accueil"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{
        backgroundImage: 'url(https://images.pexels.com/photos/4198933/pexels-photo-4198933.jpeg?auto=compress&cs=tinysrgb&w=1920)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/70 to-black/90"></div>

      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center animate-fadeIn">
        <div className="mb-6 inline-block">
          <div className="px-4 py-2 border border-amber-500/50 rounded-full backdrop-blur-sm">
            <span className="text-amber-500 text-sm tracking-widest font-light">IMPERIAL GROUP</span>
          </div>
        </div>

        <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
          <span className="text-white">ÉPICES</span>{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-600">
            IMPÉRIALE
          </span>
        </h1>

        <p className="text-2xl md:text-3xl text-amber-500 mb-4 font-light italic">
          L'arôme du changement
        </p>

        <p className="text-lg md:text-xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed font-light">
          Des saveurs authentiques, puissantes et raffinées, pour transformer chaque plat en expérience exceptionnelle.
        </p>

        <button
          onClick={scrollToProducts}
          className="group px-8 py-4 bg-gradient-to-r from-amber-500 to-amber-600 text-black font-semibold rounded-lg hover:from-amber-600 hover:to-amber-700 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-amber-500/50"
        >
          DÉCOUVRIR NOS PRODUITS
        </button>

        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ChevronDown className="text-amber-500" size={32} />
        </div>
      </div>
    </section>
  );
}
