// supabase.js
import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';

const supabaseUrl = 'https://yliohprzqxzpyyrpvlvh.supabase.co';
const supabaseKey = 'sb_publishable_jWnZtBxthINwZnn2NDS6wg_wour17Cc';
const supabase = createClient(supabaseUrl, supabaseKey);

// Función para obtener todos los productos
export async function obtenerProductos() {
  const { data, error } = await supabase
    .from('productos') // nombre de tu tabla
    .select('*');

  if (error) {
    console.error('Error al obtener productos:', error);
    return [];
  }
  return data;
}
