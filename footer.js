const anio = document.querySelector("#anioActual");
const parrafoFooter = document.createElement("p");
const anioActual = new Date().getFullYear();

parrafoFooter.innerHTML = "María Ancona " + anioActual;
anio.appendChild(parrafoFooter);