// Categorias de index
const categoriasCont = document.getElementById('categorias-contenedor');

// Sweet alert para suscribirse al newsletter
document.addEventListener('DOMContentLoaded', () => {

    Swal.fire({
        title: 'Promoción Exclusiva',
        text: `20% de descuento en tu primera compra`,
        confirmButtonText: 'Comprar',
        background: '#f9f9f9db',
        confirmButtonColor: '#78c478',
    });
});



const categorias =[
    {
    id: 1,
    nombre: "Bromelias",
    imagen: "img/bormelia.jpg"
    },

    {
    id: 2,
    nombre: "Bonsai",
    imagen: "img/bonsai.jpg"
    },

    {
    id: 3,
    nombre: "Suculentas",
    imagen: "img/suculenta.jpg"
    },

    {
    id: 4,
    nombre: "Carnivoras",
    imagen: "img/carnivora.jpg"
    },

    {
    id: 5,
    nombre: "Orquídeas",
    imagen: "img/orquidea.jpg"
    },


    {
    id: 6,
    nombre: "Hojas",
    imagen: "img/hoja.jpg"
    },


    {
    id: 7,
    nombre: "Huerta",
    imagen: "img/huerto.jpg"
    },


    {
    id: 8,
    nombre: "Flores",
    imagen: "img/flores.jpg"
    },

    {
    id: 9,
    nombre: "Enredadera",
    imagen: "img/enredadera.jpg"
    },

    {
    id: 10,
    nombre: "Buena Suerte",
    imagen: "img/buenasuerte.jpg"
    }
];

categorias.forEach (categoria => {
    const divCat = document.createElement ('div');
    divCat.classList.add('categoria');

    const destino = document.createElement ('a');
    destino.href = "tienda.html"

    destino.addEventListener('click', function(){
        localStorage.setItem('filtroCatHome', categoria.nombre.toLowerCase());
    });

    const img = document.createElement('img');
    img.classList.add('imgCategoria');
    img.src = categoria.imagen;

    const nombre = document.createElement ('h3');
    nombre.textContent = categoria.nombre;

    divCat.appendChild(destino);
    destino.appendChild(img);
    destino.appendChild(nombre);

    categoriasCont.appendChild (divCat);
});

// efecto de las imgs de index

const imagenes = document.querySelectorAll('.imgCategoria');

imagenes.forEach (img => {
    
    img.addEventListener ('mouseover', () => {
        img.style.filter = "grayscale(0%)";
    });

    img.addEventListener ('mouseout', () => {
        img.style.filter = "grayscale(100%)";
    });

});





