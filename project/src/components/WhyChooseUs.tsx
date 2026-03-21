import { Award, Leaf, MapPin, Sparkles } from 'lucide-react';

export default function WhyChooseUs() {
  const reasons = [
    {
      icon: Award,
      title: 'Qualité Premium',
      description: 'Nos épices sont rigoureusement sélectionnées et contrôlées pour garantir une qualité exceptionnelle à chaque utilisation.',
    },
    {
      icon: Leaf,
      title: 'Produits Naturels',
      description: '100% naturels, sans additifs artificiels ni conservateurs. Pureté et authenticité garanties.',
    },
    {
      icon: MapPin,
      title: 'Transformation Locale',
      description: 'Fièrement transformés en Afrique, contribuant au développement économique local et à la création de valeur sur le continent.',
    },
    {
      icon: Sparkles,
      title: 'Innovation & Ambition',
      description: 'Une marque ambitieuse qui repousse les limites et prouve que l\'Afrique peut créer des produits d\'excellence mondiale.',
    },
  ];

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-black mb-4">
            POURQUOI <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-amber-600">NOUS CHOISIR</span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Ce qui fait d'ÉPICES IMPÉRIALE votre choix d'excellence
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {reasons.map((reason, index) => (
            <div
              key={index}
              className="group relative bg-gradient-to-b from-gray-50 to-white rounded-xl p-8 hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-amber-500/50"
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-amber-500 to-amber-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 rounded-t-xl"></div>

              <div className="w-16 h-16 bg-amber-500/10 rounded-full flex items-center justify-center mb-6 group-hover:bg-amber-500/20 transition-colors duration-300">
                <reason.icon className="text-amber-600" size={32} />
              </div>

              <h3 className="text-xl font-bold text-black mb-3">{reason.title}</h3>
              <p className="text-gray-600 leading-relaxed">{reason.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 bg-gradient-to-r from-black to-gray-900 rounded-2xl p-12 text-center text-white">
          <h3 className="text-3xl font-bold mb-4">
            Rejoignez le mouvement <span className="text-amber-500">IMPÉRIAL</span>
          </h3>
          <p className="text-gray-300 max-w-3xl mx-auto mb-8 text-lg">
            Devenez distributeur et participez à la révolution des épices africaines premium. Une opportunité unique de croissance et d'impact.
          </p>
          <button
            onClick={() => {
              const message = "Bonjour, je suis intéressé(e) pour devenir distributeur ÉPICES IMPÉRIALE";
              const whatsappUrl = `https://wa.me/243971347427?text=${encodeURIComponent(message)}`;
              window.open(whatsappUrl, '_blank');
            }}
            className="px-8 py-4 bg-gradient-to-r from-amber-500 to-amber-600 text-black font-semibold rounded-lg hover:from-amber-600 hover:to-amber-700 transition-all duration-300 transform hover:scale-105"
          >
            DEVENIR DISTRIBUTEUR
          </button>
        </div>
      </div>
    </section>
  );
}
