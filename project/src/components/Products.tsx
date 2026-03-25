import { ShoppingCart } from 'lucide-react';
import images1 from '../images/CAJUN.jpeg';
import images2 from '../images/POIVRE NOIR.jpeg';
import images3 from '../images/POIVRE BLANC.jpeg';
import images4 from '../images/CLOU DE GIROFLE.jpeg';
import images5 from '../images/CANNELLE.jpeg';
import images6 from '../images/CURCUMA.jpeg';
import images7 from '../images/PIMENT EN POUDRE.jpeg';
import images8 from '../images/PIMENT.jpeg';
import images9 from '../images/FEUILLE DE LAURIER.jpeg';
import images10 from '../images/THYM.jpeg';
import images11 from '../images/ROMARIN.jpeg';
import images12 from '../images/PAPRIKA.jpg';
import images13 from '../images/MUSCADE.jpeg';

const products = [
  {
    id: 1,
    name: 'Cajun',
    price: '10000 FC',
    description: 'Mélange d\'épices louisianais aux notes fumées et piquantes, parfait pour sublimer viandes et fruits de mer.',
    image : images1,
  },
  {
    id: 2,
    name: 'Poivre Noir',
    price: '10000 FC',
    description: 'Poivre noir premium aux arômes intenses et authentiques, essentiel dans toute cuisine raffinée.',
    image : images2,
  },
  {
    id: 3,
    name: 'Poivre Blanc',
    price: '10000 FC',
    description: 'Poivre blanc délicat et subtil, idéal pour les sauces blanches et plats élégants.',
    image: images3,
  },
  {
    id: 4,
    name: 'Clou de Girofle',
    price: '10000 FC',
    description: 'Clou de girofle aromatique aux saveurs chaudes et épicées, essentiel pour les marinades et plats cuisinés.',
    image: images4,
  },
  {
    id: 5,
    name: 'Cannelle',
    price: '7000 FC',
    description: 'Cannelle douce et chaleureuse, parfaite pour les desserts et les boissons réconfortantes.',
    image: images5,
  },
  {
    id: 6,
    name: 'Curcuma',
    price: '7000 FC',
    description: 'Curcuma aux propriétés bénéfiques, saveur douce et légèrement amère idéale pour les currys.',
    image: images6,
  },
  {
    id: 7,
    name: 'Piment en Poudre',
    price: '6000 FC',
    description: 'Piment en poudre riche et savoureux, pour ajouter une touche épicée à tous vos plats.',
    image: images7,
  },
  {
    id: 8,
    name: 'Piment Simple',
    price: '5000 FC',
    description: 'Piment simple aux notes authentiques, pour un piquant naturel et savoureux.',
    image: images8,
  },
  {
    id: 9,
    name: 'Feuilles de Laurier',
    price: '5000 FC',
    description: 'Feuilles de laurier aromatiques, indispensables pour les bouillons et les ragoûts.',
    image: images9,
  },
  {
    id: 10,
    name: 'Thym',
    price: '5000 FC',
    description: 'Thym aux arômes délicats et herbacés, parfait pour les viandes grillées et les légumes.',
    image: images10,
  },
  {
    id: 11,
    name: 'Romarin',
    price: '5000 FC',
    description: 'Romarin savoureux et parfumé, idéal pour les marinades et les plats méditerranéens.',
    image: images11,
  },
  {
    id: 12,
    name: 'Muscade',
    price: '10000 FC',
    description: 'Muscade chaleureuse et légèrement sucrée, essentielle pour les sauces et les desserts.',
    image: images13,
  },
  {
    id: 13,
    name: 'Paprika',
    price: '10000 FC',
    description: 'Paprika douce ou piquante, pour donner couleur et saveur à vos cuisines du monde.',
    image: images12,
  },
];

export default function Products() {
  const handleOrder = (productName: string) => {
    const message = `Bonjour EPICES IMPERIALE, je souhaite passer commande du produit suivant: ${productName}`;
    const whatsappUrl = `https://wa.me/243801910623?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <section id="produits" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-black mb-4">
            NOS <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-amber-600">ÉPICES</span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Une sélection d'épices premium pour transformer vos plats en chefs-d'œuvre culinaires
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product) => (
            <div
              key={product.id}
              className="group bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100"
            >
              <div className="relative h-68overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>

              <div className="p-6">
                <h3 className="text-2xl font-bold text-black mb-2">{product.name}</h3>
                <p className="text-gray-600 mb-4 text-sm leading-relaxed">{product.description}</p>

                <div className="flex items-center justify-between">
                  <span className="text-3xl font-bold text-amber-600">{product.price}</span>
                  <button
                    onClick={() => handleOrder(product.name)}
                    className="flex items-center space-x-2 px-4 py-2 bg-black text-white rounded-lg hover:bg-amber-600 transition-colors duration-300 group"
                  >
                    <ShoppingCart size={18} />
                    <span className="text-sm font-semibold">Commander</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
