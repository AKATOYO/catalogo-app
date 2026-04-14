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