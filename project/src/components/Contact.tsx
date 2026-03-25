import { MapPin, Phone, Mail, MessageCircle } from 'lucide-react';

export default function Contact() {
  const handleWhatsAppClick = () => {
    const message = "Bonjour EPICES IMPERIALE, je souhaite passer commande du produit suivant:";
    const whatsappUrl = `https://wa.me/243801910623?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <section id="contact" className="py-24 bg-black text-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            CONTACTEZ-<span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-600">NOUS</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            Passez votre commande ou devenez partenaire
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0">
                <div className="w-14 h-14 bg-amber-500/10 rounded-full flex items-center justify-center">
                  <MapPin className="text-amber-500" size={24} />
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Localisation</h3>
                <p className="text-gray-400">Kinshasa, République Démocratique du Congo</p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0">
                <div className="w-14 h-14 bg-amber-500/10 rounded-full flex items-center justify-center">
                  <Phone className="text-amber-500" size={24} />
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Téléphone</h3>
                <p className="text-gray-400">+243 80 191 06 23</p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0">
                <div className="w-14 h-14 bg-amber-500/10 rounded-full flex items-center justify-center">
                  <Mail className="text-amber-500" size={24} />
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Email</h3>
                <p className="text-gray-400">empire1309@gmail.com</p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0">
                <div className="w-14 h-14 bg-amber-500/10 rounded-full flex items-center justify-center">
                  <MessageCircle className="text-amber-500" size={24} />
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">WhatsApp</h3>
                <p className="text-gray-400 mb-3">Commande rapide via WhatsApp</p>
                <button
                  onClick={handleWhatsAppClick}
                  className="flex items-center space-x-2 px-6 py-3 bg-green-600 hover:bg-green-700 rounded-lg transition-colors duration-300"
                >
                  <MessageCircle size={20} />
                  <span className="font-semibold">Commander sur WhatsApp</span>
                </button>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-amber-500/10 to-amber-600/5 border border-amber-500/20 rounded-2xl p-10">
            <h3 className="text-2xl font-bold mb-6 text-center">
              Prêt à commander ?
            </h3>
            <p className="text-gray-300 text-center mb-8 leading-relaxed">
              Contactez-nous dès maintenant pour passer votre commande ou pour toute demande d'information. Notre équipe est à votre disposition.
            </p>

            <div className="space-y-4">
              <button
                onClick={handleWhatsAppClick}
                className="w-full px-8 py-4 bg-gradient-to-r from-amber-500 to-amber-600 text-black font-semibold rounded-lg hover:from-amber-600 hover:to-amber-700 transition-all duration-300 transform hover:scale-105"
              >
                COMMANDER MAINTENANT
              </button>

              <button
                onClick={() => {
                  const message = "Bonjour, j'aimerais obtenir plus d'informations sur vos épices";
                  const whatsappUrl = `https://wa.me/243801910623?text=${encodeURIComponent(message)}`;
                  window.open(whatsappUrl, '_blank');
                }}
                className="w-full px-8 py-4 bg-white/10 text-white font-semibold rounded-lg hover:bg-white/20 transition-all duration-300 border border-white/20"
              >
                DEMANDER PLUS D'INFOS
              </button>
            </div>

            <p className="text-center text-gray-400 text-sm mt-8">
              Livraison disponible à Kinshasa 
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
