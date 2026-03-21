import { Target, Eye, Heart, Zap } from 'lucide-react';

export default function Vision() {
  return (
    <section id="vision" className="py-24 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-black mb-4">
            NOTRE <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-amber-600">VISION</span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Construire l'avenir de la gastronomie africaine
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 mb-16">
          <div className="bg-white rounded-2xl p-8 shadow-xl border-t-4 border-amber-500 hover:shadow-2xl transition-shadow duration-300">
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0">
                <div className="w-16 h-16 bg-amber-500/10 rounded-full flex items-center justify-center">
                  <Target className="text-amber-600" size={32} />
                </div>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-black mb-4">Mission</h3>
                <p className="text-gray-700 leading-relaxed">
                  Offrir des épices de qualité supérieure qui transforment chaque plat en une expérience gastronomique mémorable, tout en valorisant les richesses naturelles africaines et en créant un impact économique positif sur le continent.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-xl border-t-4 border-amber-500 hover:shadow-2xl transition-shadow duration-300">
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0">
                <div className="w-16 h-16 bg-amber-500/10 rounded-full flex items-center justify-center">
                  <Eye className="text-amber-600" size={32} />
                </div>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-black mb-4">Vision</h3>
                <p className="text-gray-700 leading-relaxed">
                  Devenir la référence congolaise et internationale en matière d'épices premium, en prouvant que l'Afrique peut créer des marques mondiales d'excellence qui rivalisent avec les plus grands noms de l'industrie.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-black rounded-2xl p-12 text-white">
          <h3 className="text-3xl font-bold text-center mb-12">
            NOS <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-600">VALEURS</span>
          </h3>

          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center group">
              <div className="w-20 h-20 bg-amber-500/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-amber-500/20 transition-colors duration-300">
                <Crown className="text-amber-500" size={36} />
              </div>
              <h4 className="text-xl font-bold mb-2">Excellence</h4>
              <p className="text-gray-400 text-sm">
                Nous ne faisons aucun compromis sur la qualité de nos produits
              </p>
            </div>

            <div className="text-center group">
              <div className="w-20 h-20 bg-amber-500/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-amber-500/20 transition-colors duration-300">
                <Heart className="text-amber-500" size={36} />
              </div>
              <h4 className="text-xl font-bold mb-2">Authenticité</h4>
              <p className="text-gray-400 text-sm">
                Fidèles à nos racines africaines et à nos traditions
              </p>
            </div>

            <div className="text-center group">
              <div className="w-20 h-20 bg-amber-500/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-amber-500/20 transition-colors duration-300">
                <TrendingUp className="text-amber-500" size={36} />
              </div>
              <h4 className="text-xl font-bold mb-2">Impact</h4>
              <p className="text-gray-400 text-sm">
                Créer de la valeur pour nos communautés et le continent
              </p>
            </div>

            <div className="text-center group">
              <div className="w-20 h-20 bg-amber-500/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-amber-500/20 transition-colors duration-300">
                <Zap className="text-amber-500" size={36} />
              </div>
              <h4 className="text-xl font-bold mb-2">Innovation</h4>
              <p className="text-gray-400 text-sm">
                Réinventer constamment pour rester à la pointe
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Crown({ className, size }: { className?: string; size?: number }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M2 12h20" />
      <path d="m2 12 3-6 4 6 4-6 4 6 4-6 3 6" />
      <path d="M2 12v5a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-5" />
    </svg>
  );
}

function TrendingUp({ className, size }: { className?: string; size?: number }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
      <polyline points="16 7 22 7 22 13" />
    </svg>
  );
}
