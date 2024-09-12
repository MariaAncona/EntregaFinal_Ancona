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

const home = document.getElementById('home');

home.addEventListener('click', () => {
    localStorage.removeItem('filtroCatSelector');
});



