<!-- Tu script JavaScript actual permanece sin cambios, ya que está bien estructurado -->
  <script>
    // Tu script JS sigue aquí sin cambios
    // Si lo deseas, puedo también optimizarlo o dividirlo en módulos

    const SUPABASE_URL = "https://hwtkhblqcmptbkebiijx.supabase.co";
    const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ...";
    const client = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

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
  </script>
