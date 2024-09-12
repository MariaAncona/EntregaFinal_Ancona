const seccionTienda = document.getElementById ('seccionTienda');

fetch("/productos.json")
    .then((response) => response.json())
    .then((data) => {

        for (const producto of data){
            const planta = document.createElement('div');
            planta.innerHTML = `
            <div class = "plantas">
                <img class = "img-planta" src= ${producto.Imagen} alt=${producto.Nombre}/>
                <div class ="txt-planta">
                    <h5 class = "nombre">${producto.Nombre} </h5>
                    <p class = "precio"> $${producto.Precio}.- </p>
                    <button class= "btn-compra"> Agregar </button>
                </div>
            </div>
                `

                seccionTienda.appendChild(planta);

        };
    })
    .catch(console.error());

