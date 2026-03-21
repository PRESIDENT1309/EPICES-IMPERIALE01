export default function Lifestyle() {
  const images = [
    {
      url: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=800',
      title: 'Cuisine Raffinée',
    },
    {
      url: 'https://images.pexels.com/photos/1640772/pexels-photo-1640772.jpeg?auto=compress&cs=tinysrgb&w=800',
      title: 'Saveurs Authentiques',
    },
    {
      url: 'https://images.pexels.com/photos/2673353/pexels-photo-2673353.jpeg?auto=compress&cs=tinysrgb&w=800',
      title: 'Gastronomie Premium',
    },
    {
      url: 'https://images.pexels.com/photos/1633578/pexels-photo-1633578.jpeg?auto=compress&cs=tinysrgb&w=800',
      title: 'Excellence Culinaire',
    },
  ];

  return (
    <section className="py-24 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-black mb-4">
            L'ART DE LA <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-amber-600">GASTRONOMIE</span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Transformez chaque plat en chef-d'œuvre culinaire avec nos épices premium
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {images.map((image, index) => (
            <div
              key={index}
              className="group relative h-80 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300"
            >
              <img
                src={image.url}
                alt={image.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300"></div>
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h3 className="text-white text-2xl font-bold">{image.title}</h3>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <p className="text-gray-700 text-xl max-w-3xl mx-auto leading-relaxed">
            Nos épices subliment vos créations culinaires et transforment chaque repas en une expérience sensorielle exceptionnelle.
          </p>
        </div>
      </div>
    </section>
  );
}
