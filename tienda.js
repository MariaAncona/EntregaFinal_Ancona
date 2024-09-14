

let carrito = [];
let productos = [];

// Renderizar productos desde JSON producto

document.addEventListener("DOMContentLoaded", () => {
  const seccionTienda = document.getElementById("seccionTienda");
  const selectorCategorias = document.getElementById("selectCategoria");
  const categoriaFiltroIndex = localStorage.getItem("filtroCatHome");

  localStorage.removeItem("filtroCatHome");

  fetch("/productos.json")
    .then((response) => response.json())
    .then((data) => {
      productos = data;

      mostrarProductos(productos);
      if (categoriaFiltroIndex && categoriaFiltroIndex !== "non") {
        const productosFiltrados = productos.filter(
          (producto) =>
            producto.categoria.nombre.toLowerCase() === categoriaFiltroIndex
        );
        mostrarProductos(productosFiltrados);
        selectorCategorias.value = categoriaFiltroIndex;
      }

      selectorCategorias.addEventListener("change", (event) => {
        const categoriaFiltro = event.target.value.toLowerCase();
        if (categoriaFiltro !== "non") {
          const productosFiltrados = productos.filter(
            (producto) =>
              producto.categoria.nombre.toLowerCase() === categoriaFiltro
          );
          mostrarProductos(productosFiltrados);
          localStorage.setItem("filtroCatSelector", categoriaFiltro);
        } else {
          mostrarProductos(productos);
          localStorage.removeItem("filtroCatSelector");
        }
      });
    })
    .catch((error) => console.error("Error al cargar los productos:", error));

  function mostrarProductos(productosFiltrados) {
    seccionTienda.innerHTML = "";

    productosFiltrados.forEach((producto) => {
      const planta = document.createElement("div");
      planta.innerHTML = `
                <div class="plantas">
                    <img class="img-planta" src="${producto.Imagen}" alt="${producto.Nombre}" />
                    <div class="txt-planta">
                        <h5 class="nombre">${producto.Nombre}</h5>
                        <p class="precio">$${producto.Precio}.-</p>
                        <button onclick="addToCart(${producto.Id})" class="btn-compra">Agregar</button>
                    </div>
                </div>
            `;
      seccionTienda.appendChild(planta);
    });
  }
});

// funcion de agregar al carrito
function addToCart(productoID) {
  const planta = productos.find((p) => p.Id === productoID);

  if (planta) {
    const productoEnCarrito = carrito.find((item) => item.id === productoID);

    if (productoEnCarrito) {
      productoEnCarrito.cantidad += 1;
      productoEnCarrito.precioTotal =
        productoEnCarrito.cantidad * productoEnCarrito.precio;
    } else {
      carrito.push({
        id: planta.Id,
        nombre: planta.Nombre,
        precio: planta.Precio,
        imagen: planta.Imagen,
        cantidad: 1,
        precioTotal: planta.Precio,
      });
    }

    localStorage.setItem("Cart", JSON.stringify(carrito));

    Toastify({
      text: `Se agregó ${planta.Nombre} al carrito`,
      duration: 3000,
      style: {
        background: "#78c478",
      },
    }).showToast();
  } else {
    console.error("Producto no encontrado con ID:", productoID);
  }
}



