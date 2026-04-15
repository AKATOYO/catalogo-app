// supabase.js
export const SUPABASE_URL = "https://hwtkhblqcmptbkebiijx.supabase.co";
export const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlsaW9ocHJ6cXh6cHl5cnB2bHZoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzYxOTIyNTcsImV4cCI6MjA5MTc2ODI1N30.vvWoWAnHbfmZMEDWTKV8aGs6OsTKjpMam1h2OXVCjQI";

export const client = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

export async function obtenerProductos() {
  const { data, error } = await client.from("productos").select("*");
  if (error) {
    console.error("Error al cargar productos:", error);
    return [];
  }
  return data;
}
// main.js
import { client, obtenerProductos } from './supabase.js';
import {
  agregarAlCarrito,
  cambiarCantidad,
  quitarDelCarrito,
  vaciarCarrito,
  cargarCarritoDesdeStorage
} from './carrito.js';

let productosOriginales = [];

document.addEventListener('DOMContentLoaded', async () => {
  cargarCarritoDesdeStorage();
  productosOriginales = await obtenerProductos();
  mostrarProductos(productosOriginales);
});

window.filtrarProductos = () => {
  const texto = document.getElementById("busqueda").value.toLowerCase();
  const filtrados = productosOriginales.filter(p =>
    p.nombre.toLowerCase().includes(texto) ||
    (p.descripcion || "").toLowerCase().includes(texto)
  );
  mostrarProductos(filtrados);
};

function mostrarProductos(productos) {
  const contenedor = document.getElementById("productos");
  contenedor.innerHTML = "";

  productos.forEach(prod => {
    let urlImagen = prod.imagen_url || "https://i.ibb.co/jZ88dWLB/PIE-747-FILETEADORA-CON-RODILLOS-747-700-JD.png";

    const div = document.createElement("div");
    div.className = "producto";
    div.innerHTML = `
      <img src="${urlImagen}" alt="${prod.nombre}">
      <h3>${prod.nombre}</h3>
      <p>${prod.descripcion || ""}</p>
      <p><strong>$${parseFloat(prod.precio || 0).toFixed(2)}</strong></p>
      <button onclick='agregarAlCarrito(${JSON.stringify(prod)})'>Agregar 🛒</button>
    `;
    contenedor.appendChild(div);
  });
}
