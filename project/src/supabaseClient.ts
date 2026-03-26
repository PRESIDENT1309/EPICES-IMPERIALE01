import { createClient } from '@supabase/supabase-js';

// Vous devez remplacer les valeurs suivantes par vos propres identifiants Supabase
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || '';
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
  console.warn(
    'Les variables d\'environnement Supabase ne sont pas configurées. ' +
    'Veuillez créer un fichier .env.local avec VITE_SUPABASE_URL et VITE_SUPABASE_ANON_KEY'
  );
}

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
