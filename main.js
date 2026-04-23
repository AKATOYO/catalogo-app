 const supabaseUrl = 'https://yliohprzqxzpyyrpvlvh.supabase.co';
const supabaseAnonKey = 'sb_publishable_jWnZtBxthINwZnn2NDS6wg_wour17Cc'; // Reemplaza con tu clave anon si es diferente

const supabase = supabase.createClient(supabaseUrl, supabaseAnonKey);

    let productosOriginales = [];
    let carrito = [];

    async function cargarProductos() {
      const { data, error } = await client.from("productos").select("*");
      if (error) return console.error("Error al cargar productos:", error);
      productosOriginales = data;
      mostrarProductos(data);
    }

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

    function filtrarProductos() {
      const texto = document.getElementById("busqueda").value.toLowerCase();
      const filtrados = productosOriginales.filter(p =>
        p.nombre.toLowerCase().includes(texto) ||
        (p.descripcion || "").toLowerCase().includes(texto)
      );
      mostrarProductos(filtrados);
    }

    function agregarAlCarrito(producto) {
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

    function quitarDelCarrito(indice) {
      carrito.splice(indice, 1);
      actualizarCarrito();
      guardarCarrito();
    }

    function cambiarCantidad(index, cambio) {
      carrito[index].cantidad += cambio;
      if (carrito[index].cantidad <= 0) {
        carrito.splice(index, 1);
      }
      actualizarCarrito();
      guardarCarrito();
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

    function guardarCarrito() {
      localStorage.setItem("carrito", JSON.stringify(carrito));
    }

    function cargarCarritoDesdeStorage() {
      const guardado = localStorage.getItem("carrito");
      if (guardado) {
        carrito = JSON.parse(guardado).map(item => ({
          ...item,
          cantidad: item.cantidad || 1
        }));
        actualizarCarrito();
      }
    }

    function vaciarCarrito() {
      carrito = [];
      actualizarCarrito();
      guardarCarrito();
    }

    cargarCarritoDesdeStorage();
    cargarProductos();

const carrito = document.getElementById('carrito');

function carritoculto() {
    const carrito = document.getElementById('carrito');
    carrito.classList.toggle('carritoculto');

    // Verificamos el estado actual del carrito
    if (carrito.classList.contains('carrito-oculto')) {
        // Si está oculto, lo mostramos
        carrito.classList.remove('carrito-oculto');
        carrito.classList.add('carrito'); // Añadimos la clase para mostrarlo con estilo
        // Para la animación, esperamos un instante para que se aplique la clase 'carrito'
        // y luego modificamos la opacidad y transformación.
        setTimeout(() => {
            carrito.style.opacity = '1';
            carrito.style.transform = 'translateY(0)';
        }, 10); // Un pequeño retardo es suficiente
    } else {
        // Si está visible, lo ocultamos
        // Primero aplicamos estilos para la animación de ocultar
        carrito.style.opacity = '0';
        carrito.style.transform = 'translateY(-20px)';
        // Después de la transición, añadimos la clase 'carrito-oculto'
        setTimeout(() => {
            carrito.classList.remove('carrito');
            carrito.classList.add('carrito-oculto');
        }, 300); // Debe coincidir con la duración de la transición CSS (0.3s)
    }
}








