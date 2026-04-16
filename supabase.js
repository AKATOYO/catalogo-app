// supabase.js
import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';

const supabaseUrl = 'https://yliohprzqxzpyyrpvlvh.supabase.co';
const supabaseKey = 'sb_publishable_jWnZtBxthINwZnn2NDS6wg_wour17Cc';
const supabase = createClient(supabaseUrl, supabaseKey);

// Obtener productos filtrando por nombre o descripcion
// Ejemplo de uso:
async function mostrarProductos() {
  const productosFiltrados = await obtenerProductos('ejemplo'); // Busca "ejemplo" en nombre o descripción
  console.log(productosFiltrados);

  const todosLosProductos = await obtenerProductos(''); // No aplica filtro
  console.log(todosLosProductos);

  const productosConEspacios = await obtenerProductos('   '); // Tampoco aplica filtro
  console.log(productosConEspacios);
}

mostrarProductos();
