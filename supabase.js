// supabase.js
import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';

const supabaseUrl = 'https://tusupabaseurl.supabase.co';
const supabaseKey = 'tu_clave_publica';
export const supabase = createClient(supabaseUrl, supabaseKey);

// Obtener productos filtrando por nombre o descripcion
export async function obtenerProductos(filtro = '') {
  let query = supabase.from('productos').select('*');

  if (filtro) {
    // Filtra por nombre o descripción usando ilike
    query = query.or('nombre','ilike'`%${filtro}%`,'descripcion.ilike',`%${filtro}%`);
  }

  const { data, error } = await query;

  if (error) {
    console.error('Error al obtener productos:', error);
    return [];
  }

  return data;
}
