import { Crown, Leaf, TrendingUp } from 'lucide-react';

export default function About() {
  return (
    <section id="apropos" className="py-24 bg-black text-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="mb-6">
              <Crown className="text-amber-500 mb-4" size={48} />
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              À PROPOS D'<span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-600">ÉPICES IMPÉRIALE</span>
            </h2>
            <p className="text-gray-300 text-lg leading-relaxed mb-6">
             ÉPICES IMPÉRIALE est née d’une vision claire : mettre en lumière les trésors culinaires de la RDC et partager au monde des saveurs authentiques, puissantes et nobles.
            </p>
            <p className="text-gray-300 text-lg leading-relaxed mb-6">
              Nous sommes bien plus qu’une marque d’épices. Nous sommes un mouvement qui célèbre le savoir-faire congolais, transforme les produits locaux en véritables joyaux gastronomiques et fait rayonner la richesse de notre terroir à l’international.
            </p>
            <p className="text-gray-300 text-lg leading-relaxed">
              Chaque produit ÉPICES IMPÉRIALE reflète notre engagement envers la qualité supérieure, l’authenticité et l’excellence congolaise. Nous croyons que les saveurs de la RDC méritent de briller au cœur de la gastronomie mondiale.
            </p>
          </div>

          <div className="space-y-6">
            <div className="bg-gradient-to-br from-amber-500/10 to-amber-600/5 border border-amber-500/20 rounded-xl p-8 hover:border-amber-500/40 transition-all duration-300">
              <Crown className="text-amber-500 mb-4" size={36} />
              <h3 className="text-2xl font-bold mb-3">Qualité Premium</h3>
              <p className="text-gray-400">
                Nos épices sont soigneusement sélectionnées et transformées selon les plus hauts standards de qualité.
              </p>
            </div>

            <div className="bg-gradient-to-br from-amber-500/10 to-amber-600/5 border border-amber-500/20 rounded-xl p-8 hover:border-amber-500/40 transition-all duration-300">
              <Leaf className="text-amber-500 mb-4" size={36} />
              <h3 className="text-2xl font-bold mb-3">Transformation Locale</h3>
              <p className="text-gray-400">
                Fiers de notre origine africaine, nous transformons localement pour créer de la valeur et de l'impact.
              </p>
            </div>

            <div className="bg-gradient-to-br from-amber-500/10 to-amber-600/5 border border-amber-500/20 rounded-xl p-8 hover:border-amber-500/40 transition-all duration-300">
              <TrendingUp className="text-amber-500 mb-4" size={36} />
              <h3 className="text-2xl font-bold mb-3">Vision Ambitieuse</h3>
              <p className="text-gray-400">
                Notre objectif : devenir une référence mondiale et prouver que la RDC peut créer des marques d'excellence internationale.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
