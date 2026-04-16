// supabase.js
import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';

const supabaseUrl = 'https://yliohprzqxzpyyrpvlvh.supabase.co';
const supabaseKey = 'sb_publishable_jWnZtBxthINwZnn2NDS6wg_wour17Cc';
const supabase = createClient(supabaseUrl, supabaseKey);


// Función para obtener productos filtrando por nombre
export async function obtenerProductos(filtro = '') {
  let query = supabase.from('productos').select('*');
  if (filtro) {
    query = query.ilike('nombre','descripcion', `%${filtro}%`);
  }
  const { data, error } = await query;
  if (error) {
    console.error('Error al obtener productos:', error);
    return [];
  }
  return data;
}
