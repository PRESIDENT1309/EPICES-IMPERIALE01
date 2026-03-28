import { supabase } from '../supabaseClient';

export interface AddressData {
  nom: string;
  telephone: string;
  avenue: string;
  quartier: string;
  commune: string;
  point_reference: string;
  frais_livraison?: number;
}

export interface OrderData {
  addressData: AddressData;
  cartItems: Array<{
    id: number;
    name: string;
    price: number;
    quantity: number;
  }>;
}

/**
 * Enregistre une commande complète dans Supabase
 * 1. Crée/récupère le client dans "carnet_adresses" (avec adresse complète)
 * 2. Crée une commande dans "commandes"
 * 3. Enregistre chaque article dans "contenu_du_panier"
 */
export const saveOrderToSupabase = async (
  orderData: OrderData
): Promise<{ success: boolean; error?: string; orderId?: number; fullAddress?: string }> => {
  try {
    // Étape 1 : Insérer le client avec adresse dans "carnet_adresses"
    const { data: clientData, error: clientError } = await supabase
      .from('carnet_adresses')
      .insert([
        {
          nom: orderData.addressData.nom,
          telephone: orderData.addressData.telephone,
          avenue: orderData.addressData.avenue,
          quartier: orderData.addressData.quartier,
          commune: orderData.addressData.commune,
          point_reference: orderData.addressData.point_reference,
          // plus de frais_livraison ici
        },
      ])
      .select('id')
      .single();

    if (clientError) {
      throw new Error(`Erreur lors de l'ajout du client: ${clientError.message}`);
    }

    const clientId = clientData?.id;
    if (!clientId) {
      throw new Error('ID client non retourné');
    }

    console.log(`✓ Client créé avec ID: ${clientId}`);

    // Construire l'adresse complète pour le message WhatsApp
    const fullAddress = `${orderData.addressData.avenue}, ${orderData.addressData.quartier}, ${orderData.addressData.commune}${
      orderData.addressData.point_reference ? ` (Réf: ${orderData.addressData.point_reference})` : ''
    }`;

    // Étape 2 : Créer la commande dans "commandes"
    const { data: orderData2, error: orderError } = await supabase
      .from('commandes')
      .insert([
        {
          client_id: clientId,
          date: new Date().toISOString(),
          statut: 'en_attente',
          frais_livraison: orderData.addressData.frais_livraison || 0,
        },
      ])
      .select('id')
      .single();

    if (orderError) {
      throw new Error(`Erreur lors de la création de la commande: ${orderError.message}`);
    }

    const orderId = orderData2?.id;
    if (!orderId) {
      throw new Error('ID commande non retourné');
    }

    console.log(`✓ Commande créée avec ID: ${orderId}`);

    // Étape 3 : Insérer les articles dans "contenu_du_panier"
    const cartItems = orderData.cartItems.map((item) => ({
      id_commande: orderId,
      id_produit: item.id,
      nom_produit: item.name,
      quantite: item.quantity,
      prix_unitaire: item.price,
    }));

    const { error: cartItemsError } = await supabase
      .from('contenu_du_panier')
      .insert(cartItems);

    if (cartItemsError) {
      throw new Error(`Erreur lors de l'ajout des articles: ${cartItemsError.message}`);
    }

    console.log(`✓ ${cartItems.length} articles enregistrés`);

    return {
      success: true,
      orderId,
      fullAddress,
    };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Erreur inconnue';
    console.error('Erreur lors de l\'enregistrement de la commande:', errorMessage);
    return {
      success: false,
      error: errorMessage,
    };
  }
};
