

document.addEventListener('DOMContentLoaded', () => {
    const seccionTienda = document.getElementById('seccionTienda');
    const selectorCategorias = document.getElementById('selectCategoria');
    const categoriaFiltroIndex = localStorage.getItem('filtroCatHome');
    
    localStorage.removeItem('filtroCatHome');

    fetch("/productos.json")
        .then(response => response.json())
        .then(productos => {

            mostrarProductos(productos);
            if (categoriaFiltroIndex && categoriaFiltroIndex !== 'non') {
                const productosFiltrados = productos.filter(producto =>
                    producto.categoria.nombre.toLowerCase() === categoriaFiltroIndex
                );
                mostrarProductos(productosFiltrados);
                selectorCategorias.value = categoriaFiltroIndex; 
            }

            selectorCategorias.addEventListener('change', (event) => {
                const categoriaFiltro = event.target.value.toLowerCase();
                if (categoriaFiltro !== 'non') {
                    const productosFiltrados = productos.filter(producto =>
                        producto.categoria.nombre.toLowerCase() === categoriaFiltro
                    );
                    mostrarProductos(productosFiltrados);
                    localStorage.setItem('filtroCatSelector', categoriaFiltro);
                } else {
                    mostrarProductos(productos);
                    localStorage.removeItem('filtroCatSelector'); 
                }
            });
        })
        .catch(error => console.error("Error al cargar los productos:", error));

    function mostrarProductos(productosFiltrados) {
        seccionTienda.innerHTML = '';  

        productosFiltrados.forEach(producto => {
            const planta = document.createElement('div');
            planta.innerHTML = `
                <div class="plantas">
                    <img class="img-planta" src="${producto.Imagen}" alt="${producto.Nombre}" />
                    <div class="txt-planta">
                        <h5 class="nombre">${producto.Nombre}</h5>
                        <p class="precio">$${producto.Precio}.-</p>
                        <button class="btn-compra">Agregar</button>
                    </div>
                </div>
            `;
            seccionTienda.appendChild(planta); 
        });
    }
});