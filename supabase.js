// supabase.js
import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';

const supabaseUrl = 'https://yliohprzqxzpyyrpvlvh.supabase.co';
const supabaseKey = 'sb_publishable_jWnZtBxthINwZnn2NDS6wg_wour17Cc';
const supabase = createClient(supabaseUrl, supabaseKey);


// Función para obtener productos filtrando por nombre o descripción
export async function obtenerProductos(filtro = '') {
  let query = supabase.from('productos').select('*');

  if (filtro && filtro.trim() !== '') {
    // Filtra por nombre o descripción usando ilike (case-insensitive)
    // Se usa .or() para combinar las dos condiciones con un OR lógico
    query = query.or(`nombre.ilike.%${filtro}%`,`descripcion.ilike.%${filtro}%`);
    }

  const { data, error } = await query;

  if (error) {
    console.error('Error al obtener productos:', error);
    // Devuelve un array vacío en caso de error para mantener la consistencia
    return [];
  }

  return data;
}
