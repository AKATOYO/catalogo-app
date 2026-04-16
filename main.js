  <script type="module">
    import { obtenerProductos } from './supabase.js';

    let carrito = [];

    async function mostrarProductos(filtro = '') {
      const productos = await obtenerProductos(filtro);
      const contenedor = document.getElementById('productos');
      contenedor.innerHTML = '';

      if (productos.length === 0) {
        contenedor.innerHTML = '<p>No se encontraron productos.</p>';
        return;
      }

      productos.forEach(producto => {
        const div = document.createElement('div');
        div.className = 'producto';
        div.innerHTML = `
          <h3>${producto.nombre}</h3>
          <img src="${producto.imagen_url}" alt="${producto.nombre}">
          <p>${producto.descripcion}</p>
          <p>Precio: $${producto.precio}</p>
          <button>Agregar al carrito</button>
        `;
        div.querySelector('button').addEventListener('click', () => agregarAlCarrito(producto));
        contenedor.appendChild(div);
      });
    }

    function agregarAlCarrito(producto) {
      carrito.push(producto);
      actualizarCarrito();
    }

    function eliminarDelCarrito(index) {
      carrito.splice(index, 1);
      actualizarCarrito();
    }

    function actualizarCarrito() {
      const contenedor = document.getElementById('carrito');
      contenedor.innerHTML = '';

      carrito.forEach((producto, index) => {
        const div = document.createElement('div');
        div.className = 'carrito-item';
        div.innerHTML = `
          <h4>${producto.nombre}</h4>
          <p>Precio: $${producto.precio}</p>
          <button>Eliminar</button>
        `;
        div.querySelector('button').addEventListener('click', () => eliminarDelCarrito(index));
        contenedor.appendChild(div);
      });

      const total = carrito.reduce((sum, p) => sum + parseFloat(p.precio), 0);
      document.getElementById('total').textContent = `Total: $${total.toFixed(2)}`;
    }

    document.getElementById('btnBuscar').addEventListener('click', () => {
      const filtro = document.getElementById('busqueda').value;
      mostrarProductos(filtro);
    });

    document.getElementById('btnPagar').addEventListener('click', () => {
      if (carrito.length === 0) {
        alert('No has agregado productos al carrito.');
      } else {
        const total = carrito.reduce((sum, p) => sum + parseFloat(p.precio), 0);
        alert(`Preparado para pagar: $${total.toFixed(2)}`);
        // Aquí integrarías Stripe, PayPal, etc.
      }
    });

    // Inicialmente no muestra nada hasta que el usuario busque
  </script>
