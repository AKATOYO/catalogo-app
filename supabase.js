const supabaseUrl = 'https://yliohprzqxzpyyrpvlvh.supabase.co';
const supabaseAnonKey = 'sb_publishable_jWnZtBxthINwZnn2NDS6wg_wour17Cc'; // Reemplaza con tu clave anon si es diferente

const supabase = supabase.createClient(supabaseUrl, supabaseAnonKey);

 let productos = [];

async function fetchProductos() {
    const { data, error } = await supabase
        .from('productos') // Asegúrate de que 'productos' sea el nombre correcto de tu tabla
        .select('*'); // Selecciona todas las columnas

    if (error) {
        console.error('Error fetching data:', error);
        return;
    }

    const tableBody = document.getElementById('productos-table').getElementsByTagName('tbody')[0];
    tableBody.innerHTML = ''; // Limpiar contenido anterior

    data.forEach(producto => {
        const row = tableBody.insertRow();

        const cellId = row.insertCell();
        cellId.textContent = producto.id;

        const cellNombre = row.insertCell();
        cellNombre.textContent = producto.nombre;

        const cellDescripcion = row.insertCell();
        cellDescripcion.textContent = producto.descripcion;

        const cellPrecio = row.insertCell();
        cellPrecio.textContent = producto.precio;

        const cellImagen = row.insertCell();
        const img = document.createElement('img');
        img.src = producto.imagen_url;
        img.alt = producto.nombre;
        img.style.width = '100px'; // Ajusta el tamaño según necesites
        cellImagen.appendChild(img);
    });
}

fetchProductos();
