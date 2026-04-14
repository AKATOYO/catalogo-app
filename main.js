const SUPABASE_URL = "yliohprzqxzpyyrpvlvh";
const SUPABASE_KEY = "sb_publishable_jWnZtBxthINwZnn2NDS6wg_wour17Cc";

const client = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

let productos = [];
let carrito = [];

async function cargarProductos() {
  const { data, error } = await client.from("productos").select("*");
  if (error) return console.error(error);

  productos = data;
  renderProductos(data);
}

function renderProductos(lista) {
  const contenedor = document.getElementById("productos");
  contenedor.innerHTML = "";

  lista.forEach(p => {
    const div = document.createElement("div");
    div.className = "producto";

    const img = document.createElement("img");
    img.src = p.imagen_url || "https://via.placeholder.com/200";

    const nombre = document.createElement("h3");
    nombre.textContent = p.nombre;

    const precio = document.createElement("p");
    precio.textContent = "$" + p.precio;

    const btn = document.createElement("button");
    btn.textContent = "Agregar";
    btn.onclick = () => agregarCarrito(p);

    div.append(img, nombre, precio, btn);
    contenedor.appendChild(div);
  });
}

function agregarCarrito(prod) {
  const existe = carrito.find(p => p.id === prod.id);
  if (existe) {
    existe.cantidad++;
  } else {
    carrito.push({...prod, cantidad:1});
  }
  actualizarCarrito();
}

function actualizarCarrito() {
  const lista = document.getElementById("listaCarrito");
  const total = document.getElementById("total");
  const contador = document.getElementById("contador");

  lista.innerHTML = "";
  let suma = 0;

  carrito.forEach((p, i) => {
    suma += p.precio * p.cantidad;

    const li = document.createElement("li");
    li.textContent = `${p.nombre} x${p.cantidad}`;

    lista.appendChild(li);
  });

  total.textContent = suma;
  contador.textContent = carrito.length;
}

function vaciarCarrito() {
  carrito = [];
  actualizarCarrito();
}

function toggleCarrito() {
  document.getElementById("carritoPanel").classList.toggle("hidden");
}

document.getElementById("busqueda").addEventListener("input", e => {
  const texto = e.target.value.toLowerCase();
  const filtrados = productos.filter(p =>
    p.nombre.toLowerCase().includes(texto)
  );
  renderProductos(filtrados);
});

cargarProductos();
