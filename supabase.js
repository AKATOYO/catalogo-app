// supabase.js
import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';

const supabaseUrl = 'https://tusupabaseurl.supabase.co';
const supabaseKey = 'tu_clave_publica';
export const supabase = createClient(supabaseUrl, supabaseKey);

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
