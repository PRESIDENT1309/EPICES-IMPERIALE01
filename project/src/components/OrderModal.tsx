import React, { useState } from 'react';
import { X, AlertCircle, CheckCircle, MapPin } from 'lucide-react';

interface AddressData {
  nom: string;
  telephone: string;
  avenue: string;
  quartier: string;
  commune: string;
  point_reference: string;
}

interface OrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (addressData: AddressData) => Promise<void>;
  isLoading?: boolean;
  error?: string | null;
}

const COMMUNES = [
  'Gombe',
  'Ngaliema',
  'Limete',
  'Bandalungwa',
  'Kintambo',
  'Lingwala',
  'Kinshasa',
  'Barumbu',
  'Kasa-Vubu',
  'Kalamu',
  'Ngiri-Ngiri',
  'Mont-Ngafula',
  'Lemba',
  'Matete',
  'N\'djili',
  'Masina',
  'Kimbanseke',
  'N\'sele',
  'Maluku',
  'Makala',
  'Bumbu',
  'Selembao',
  'Kisenso',
  'Ngaba',
];

export default function OrderModal({
  isOpen,
  onClose,
  onConfirm,
  isLoading = false,
  error = null,
}: OrderModalProps) {
  const [formData, setFormData] = useState<AddressData>({
    nom: '',
    telephone: '',
    avenue: '',
    quartier: '',
    commune: '',
    point_reference: '',
  });
  const [success, setSuccess] = useState(false);

  if (!isOpen) return null;

  const isFormValid = () => {
    return (
      formData.nom.trim() !== '' &&
      formData.telephone.trim() !== '' &&
      formData.avenue.trim() !== '' &&
      formData.quartier.trim() !== '' &&
      formData.commune !== ''
    );
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Vérification des champs obligatoires
    if (!formData.nom.trim()) {
      alert('Veuillez entrer votre nom complet');
      return;
    }
    if (!formData.telephone.trim()) {
      alert('Veuillez entrer votre numéro de téléphone');
      return;
    }
    if (!formData.avenue.trim()) {
      alert('Veuillez entrer le nom de l\'avenue');
      return;
    }
    if (!formData.quartier.trim()) {
      alert('Veuillez entrer votre quartier');
      return;
    }
    if (!formData.commune || formData.commune === '') {
      alert('Veuillez sélectionner une commune');
      return;
    }
    
    try {
      await onConfirm(formData);
      setSuccess(true);
      setTimeout(() => {
        setFormData({
          nom: '',
          telephone: '',
          avenue: '',
          quartier: '',
          commune: '',
          point_reference: '',
        });
        setSuccess(false);
        onClose();
      }, 1500);
    } catch (err) {
      console.error('Erreur lors de la confirmation:', err);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-2 sm:p-4 overflow-y-auto">
      <div className="bg-white rounded-lg shadow-2xl max-w-2xl w-full p-4 sm:p-6 my-4 sm:my-8">
        {/* En-tête */}
        <div className="flex items-center justify-between mb-4 sm:mb-6">
          <div className="flex items-center gap-2 sm:gap-3">
            <MapPin className="text-amber-600 flex-shrink-0" size={24} />
            <h3 className="text-lg sm:text-2xl font-bold text-black">Livraison</h3>
          </div>
          <button
            onClick={onClose}
            disabled={isLoading}
            className="text-gray-400 hover:text-gray-600 transition disabled:opacity-50"
          >
            <X size={20} />
          </button>
        </div>

        {success && (
          <div className="mb-4 sm:mb-6 p-3 bg-green-50 border border-green-200 rounded-lg flex items-start gap-2">
            <CheckCircle size={18} className="text-green-600 flex-shrink-0 mt-0.5" />
            <p className="text-green-700 font-medium text-sm">Adresse enregistrée !</p>
          </div>
        )}

        {error && (
          <div className="mb-4 sm:mb-6 p-3 bg-red-50 border border-red-200 rounded-lg flex items-start gap-2">
            <AlertCircle size={18} className="text-red-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-red-700 font-medium text-sm">Erreur</p>
              <p className="text-red-600 text-xs">{error}</p>
            </div>
          </div>
        )}

        {!success && (
          <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
            {/* Section Informations Personnelles */}
            <div className="bg-amber-50 p-3 sm:p-4 rounded-lg border border-amber-200">
              <h4 className="font-semibold text-black mb-3 text-sm">Infos Personnelles</h4>
              
              <div className="grid sm:grid-cols-2 gap-3">
                {/* Nom Complet */}
                <div>
                  <label htmlFor="nom" className="block text-xs font-semibold text-gray-700 mb-1">
                    Nom *
                  </label>
                  <input
                    id="nom"
                    type="text"
                    name="nom"
                    value={formData.nom}
                    onChange={handleInputChange}
                    placeholder="Endic SALUMU"
                    disabled={isLoading}
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent disabled:bg-gray-100 disabled:opacity-60"
                  />
                </div>

                {/* Téléphone */}
                <div>
                  <label htmlFor="telephone" className="block text-xs font-semibold text-gray-700 mb-1">
                    Téléphone *
                  </label>
                  <input
                    id="telephone"
                    type="tel"
                    name="telephone"
                    value={formData.telephone}
                    onChange={handleInputChange}
                    placeholder="+243 8XX XXX XXX"
                    disabled={isLoading}
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent disabled:bg-gray-100 disabled:opacity-60"
                  />
                </div>
              </div>
            </div>

            {/* Section Adresse */}
            <div className="bg-blue-50 p-3 sm:p-4 rounded-lg border border-blue-200">
              <h4 className="font-semibold text-black mb-3 text-sm">Adresse</h4>

              {/* Avenue */}
              <div className="mb-3">
                <label htmlFor="avenue" className="block text-xs font-semibold text-gray-700 mb-1">
                  Avenue *
                </label>
                <input
                  id="avenue"
                  type="text"
                  name="avenue"
                  value={formData.avenue}
                  onChange={handleInputChange}
                  placeholder="Avenue de la Paix"
                  disabled={isLoading}
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 disabled:opacity-60"
                />
              </div>

              <div className="grid sm:grid-cols-2 gap-3 mb-3">
                {/* Quartier */}
                <div>
                  <label htmlFor="quartier" className="block text-xs font-semibold text-gray-700 mb-1">
                    Quartier *
                  </label>
                  <input
                    id="quartier"
                    type="text"
                    name="quartier"
                    value={formData.quartier}
                    onChange={handleInputChange}
                    placeholder="bogano"
                    disabled={isLoading}
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 disabled:opacity-60"
                  />
                </div>

                {/* Commune */}
                <div>
                  <label htmlFor="commune" className="block text-xs font-semibold text-gray-700 mb-1">
                    Commune *
                  </label>
                  <select
                    id="commune"
                    name="commune"
                    value={formData.commune}
                    onChange={handleInputChange}
                    disabled={isLoading}
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 disabled:opacity-60 appearance-none cursor-pointer"
                  >
                    <option value="">-- Sélectionner --</option>
                    {COMMUNES.map((commune) => (
                      <option key={commune} value={commune}>
                        {commune}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Point de Référence */}
              <div>
                <label htmlFor="point_reference" className="block text-xs font-semibold text-gray-700 mb-1">
                  Référence *
                </label>
                <textarea
                  id="point_reference"
                  name="point_reference"
                  value={formData.point_reference}
                  onChange={(e) => setFormData((prev) => ({ ...prev, point_reference: e.target.value }))}
                  placeholder="À côté de la pharmacie"
                  disabled={isLoading}
                  rows={2}
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 disabled:opacity-60 resize-none"
                />
              </div>
            </div>

            {/* Boutons */}
            <div className="flex gap-2 sm:gap-3 pt-4 sm:pt-6 border-t border-gray-200">
              <button
                type="button"
                onClick={onClose}
                disabled={isLoading}
                className="flex-1 px-3 py-2 text-sm sm:text-base bg-gray-200 text-gray-800 font-semibold rounded-lg hover:bg-gray-300 transition disabled:opacity-50"
              >
                Annuler
              </button>
              <button
                type="submit"
                disabled={isLoading || !isFormValid()}
                className="flex-1 px-3 py-2 text-sm sm:text-base sm:py-3 bg-gradient-to-r from-amber-500 to-amber-600 text-black font-semibold rounded-lg hover:from-amber-400 hover:to-amber-500 transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? 'Traitement...' : 'Confirmer & Envoyer'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
