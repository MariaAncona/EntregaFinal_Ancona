const cuerpo = document.body;
const header = document.querySelector('#header');
const navegacion = document.createElement('div');
const nav = document.createElement('nav');
const ul = document.createElement('ul');


// Barra de navegación
const enlaces = [
    
    {
        link: "tienda",
        nombre: "Tienda"
    },
    {
        link: "contacto",
        nombre: "Contacto"
    },
    {
        link: "aboutus",
        nombre: "Conócenos"
    },


]

header.appendChild(navegacion);
navegacion.appendChild(nav);
nav.appendChild(ul);
navegacion.className = "navbar";

for (const link of enlaces) {
    const li = document.createElement('li');
    const a = document.createElement('a');
    a.href = `${link.link}.html`;
    a.className = "linknav";
    a.textContent = link.nombre;

    // borrar local storage saliendo de la tienda
    a.addEventListener('click', () => { 
        localStorage.removeItem('filtroCatSelector'); 
    });

    li.appendChild(a);
    ul.appendChild(li);
};

// movimiento de promociones

const promociones = document.querySelector('#contentedor-promociones');
let texto = "Envíos sin costo arriba de $987";

function efectoPromocion (elemento, texto, i=0){
    elemento.textContent += texto[i];

    if (i < texto.length -1) {
    setTimeout(() => efectoPromocion(promociones, texto, i+1), 70);
    } else {
        setTimeout(() => {
            elemento.textContent = '';
        efectoPromocion(elemento,texto);
        }, 2500);
    }
};


efectoPromocion (promociones, texto);

// Borrar localStorage con botton home
const home = document.getElementById('home');

home.addEventListener('click', () => {
    localStorage.removeItem('filtroCatSelector');
});

// Abrir y cerrar carrito de compra

const carritoBtn = document.querySelector('#carrito');
const sidebar = document.getElementById('sidebarCarrito');
const cerrarCarritoBtn = document.querySelector('#cerrarCarrito');



carritoBtn.addEventListener('click', function(e) {
    e.preventDefault(); 
    sidebar.classList.toggle('open');

});

cerrarCarritoBtn.addEventListener('click', function(e) {
    sidebar.classList.remove('open'); 
});

// Renderizar el carrito

function renderizarCarrito (){

    const carritoRenderizado = document.getElementById('agregadosCarrito');
    let cart = JSON.parse(localStorage.getItem ('Cart'));
    console.log (cart);

    carritoRenderizado.innerHTML = '';
    
    if(cart.length> 0) {
        cart.forEach(producto => { 
            const productosDiv = document.createElement('div');
            const productoDiv =document.createElement('div');
            productosDiv.classList.add('productos-agregados');
            productoDiv.classList.add('producto-agregado');
            productoDiv.innerHTML = `
               <img class="img-planta-carrito" src=${producto.imagen} alt="${producto.nombre}"/>
               <h3>Planta: ${producto.nombre}</h3>
               <p>Cantidad: ${producto.cantidad}</p>
               <p>Precio: $${producto.precioTotal}</p>
               <button id="borrarProducto" class="btn-carrito" onclick="borrarProducto(${producto.id})"> Eliminar </button>
               `;
               productosDiv.appendChild(productoDiv);
               carritoRenderizado.appendChild(productosDiv);
               
            
        });
    } else {
        carritoRenderizado.innerHTML= 
        `<p>Agrega tus plantas</p>`;
    }
}

//boton para eliminar artículo de carrito

function borrarProducto(productoID) {
    let carrito = JSON.parse(localStorage.getItem("Cart")) || [];
  
    carrito = carrito.filter((producto) => producto.id !== productoID);
    localStorage.setItem("Cart", JSON.stringify(carrito));

    renderizarCarrito();
    actualizarTotalCarrito();
}  


document.addEventListener('DOMContentLoaded', () => {
    renderizarCarrito();
    actualizarTotalCarrito();
    
});

//funcion para actualilzar el total del carrito

function actualizarTotalCarrito(){
    const carritoStorage = JSON.parse(localStorage.getItem("Cart")) || [];
    const total = carritoStorage.reduce((sum, item) => sum + item.precioTotal, 0);
    const totalDiv = document.getElementById('total');
    totalDiv.textContent = `Total: $${total}`;
}

document.addEventListener('DOMContentLoaded', ()=> {
    actualizarTotalCarrito();
});


//funcion para eliminar artícullos del carrito de compra. 

function finalizarCompra () {

        localStorage.removeItem('Cart');
        actualizarTotalCarrito();
        renderizarCarrito ();

        Toastify({
            text: "¡Gracias por tu compra! Vuelve pronto",
            duration: 3000,
            style: {
              background: "#4caf50"
            }
          }).showToast();

}

document.getElementById('finalizarCompra').addEventListener ('click', finalizarCompra);














