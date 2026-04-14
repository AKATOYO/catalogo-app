// carrito.js
let carrito = [];

export function agregarAlCarrito(producto) {
  const existente = carrito.find(p => p.id === producto.id);
  if (existente) {
    existente.cantidad += 1;
  } else {
    producto.cantidad = 1;
    carrito.push(producto);
  }
  actualizarCarrito();
  guardarCarrito();
}

export function cambiarCantidad(index, cambio) {
  carrito[index].cantidad += cambio;
  if (carrito[index].cantidad <= 0) {
    carrito.splice(index, 1);
  }
  actualizarCarrito();
  guardarCarrito();
}

export function quitarDelCarrito(index) {
  carrito.splice(index, 1);
  actualizarCarrito();
  guardarCarrito();
}

export function vaciarCarrito() {
  carrito = [];
  actualizarCarrito();
  guardarCarrito();
}

export function cargarCarritoDesdeStorage() {
  const guardado = localStorage.getItem("carrito");
  if (guardado) {
    carrito = JSON.parse(guardado).map(item => ({
      ...item,
      cantidad: item.cantidad || 1
    }));
    actualizarCarrito();
  }
}

function guardarCarrito() {
  localStorage.setItem("carrito", JSON.stringify(carrito));
}

function actualizarCarrito() {
  const lista = document.getElementById("carrito");
  const total = document.getElementById("total");
  lista.innerHTML = "";
  let suma = 0;

  carrito.forEach((item, index) => {
    const precio = parseFloat(item.precio) || 0;
    const subtotal = precio * item.cantidad;
    suma += subtotal;

    lista.innerHTML += `
      <li>
        <strong>${item.nombre}</strong><br>
        <small>${item.descripcion || ""}</small><br>
        $${item.precio} x ${item.cantidad} = $${subtotal.toFixed(2)}<br>
        <button onclick="cambiarCantidad(${index}, -1)">➖</button>
        <button onclick="cambiarCantidad(${index}, 1)">➕</button>
        <button onclick="quitarDelCarrito(${index})">❌</button>
      </li>
    `;
  });

  total.textContent = suma.toFixed(2);
}
async function cargarProductos() {
  const loader = document.getElementById("loader");

  const { data, error } = await client.from("productos").select("*");

  loader.style.display = "none";

  if (error) {
    alert("Error cargando productos");
    return;
  }
  productos = data;
  renderProductos(data);
}
function mostrarToast(mensaje) {
  const toast = document.getElementById("toast");
  toast.textContent = mensaje;
  toast.style.display = "block";

  setTimeout(() => {
    toast.style.display = "none";
  }, 2000);
}
