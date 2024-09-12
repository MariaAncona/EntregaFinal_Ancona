
const seccionTienda = document.getElementById('seccionTienda');
const selectCategoria = document.getElementById('selectCategoria');
let productos = [];


fetch("/productos.json")
    .then(response => response.json())
    .then(data => {
        productos = data;
        mostrarProductos(productos); 
    })
    .catch(console.error);

function mostrarProductos(productosFiltrados) {
    seccionTienda.innerHTML = ''; 

    if (productosFiltrados.length === 0) {
        seccionTienda.innerHTML = '<p>No se encontraron productos</p>';
        return;
    }

    productosFiltrados.forEach(producto => {
        const planta = document.createElement('div');
        planta.innerHTML = `
        <div class="plantas">
            <img class="img-planta" src="${producto.Imagen}" alt="${producto.Nombre}" />
            <div class="txt-planta">
                <h5 class="nombre">${producto.Nombre}</h5>
                <p class="precio">$${producto.Precio}.-</p>
                <button class= "btn-compra"> Agregar </button>
            </div>
        </div>
        `;
        seccionTienda.appendChild(planta);
    });
}


function filtrarPorCategoria() {
    const categoriaSeleccionada = selectCategoria.value.toLowerCase();

   
    if (categoriaSeleccionada === 'non') {
        mostrarProductos(productos);
    } else {
        const productosFiltrados = productos.filter(producto =>
            producto.categoria.nombre.toLowerCase() === categoriaSeleccionada
        );
        mostrarProductos(productosFiltrados); 
    }
}

selectCategoria.addEventListener('change', filtrarPorCategoria);

