// console.log("hola");

const menu = document.querySelector('.hamburguesa');
const navegacion = document.querySelector('.navegacion');
// seleccionar todas las etiquetas img
const imagenes = document.querySelectorAll('img');

// seleccionamos los botones de los platillos
const btnTodos = document.querySelector('.todos');
const btnEnsaladas = document.querySelector('.ensaladas');
const btnPastas = document.querySelector('.pastas');
const btnPizzas = document.querySelector('.pizzas');
const btnPostres = document.querySelector('.postres');

// Seleccionamos donde se van a mostrar los platillos
const contenedorPlatillos = document.querySelector('.platillos');


//document.addEventListener:
//Este método es muy útil para responder a las interacciones del usuario 
//con la página web, como clics de mouse o pulsaciones de teclas
document.addEventListener('DOMContentLoaded', ()=>{
    eventos();
    platillos();

});


const eventos = () =>{
    menu.addEventListener('click', abrirMenu);
}

//* funcion para abrir menu 
const abrirMenu = () =>{
//  console.log(navegacion);
    navegacion.classList.remove('ocultar');
    botonCerrar();
}

// * Funcion para crear el boton cerrar en el menu hamburguesa
const botonCerrar = () =>{
    // crear elemento 'p' = parrafo con js
    const btnCerrar = document.createElement('p');
    // crear elemento 'div'  con js
    const overlay = document.createElement('div');
    // agregar nombre de clase al elemento overlay
    overlay.classList.add('pantalla-completa');
    // seleccionar el body
    const body = document.querySelector('body');

    // condicion para que se ejecute una sola vez la demas lineas
    if(document.querySelectorAll('.pantalla-completa').length > 0) return;
    
    // agregar el overlay al body para que se muestre en toda la pantalla
    body.appendChild(overlay);
    // Agregarle contenido al elemento creado
    btnCerrar.textContent = 'x';
    // Agregar nombre de clase al elemento
    btnCerrar.classList.add('btn-cerrar');

    // verificar en que posicion esta btn-cerrar en su elemento padre (navegacion)
    //console.log(navegacion.children);


    if(document.querySelectorAll('.btn-cerrar').length > 0) return;
    // agregar el elemento como hijo
    navegacion.appendChild(btnCerrar);
   
    // llamamos funcion para cerrar el menu y overlay al clickear la X
    cerrarMenu(btnCerrar, overlay);
}

//* funcion para mostrar las imagenes a medida que se va siendo scroll
// entries: informacion que se va a mostrar, en este caso las imagenes
// observer: sera el observador que indicara cuando mostrar o no la imagen 
// entry: cada una de la informacion por individual (cada una de las imagenes)
// isIntersecting : para saber si un elemento tiene una interseccion
// target: devuelve el elemento donde ocurrio el evento, en este caso 
// la imagen donde ocurrio la interseccion
// unobserve: deja de observar al elemento, pata que no se vuelva a cargar si el
// usuario vuelve a desplazarse hasta esa imagen.
const observer = new IntersectionObserver((entries, observer)=>{
        entries.forEach(entry=>{
            if(entry.isIntersecting){
                const imagen= entry.target;
                // dataset.src es igual al data-src del Html
                // Cuando se produzca una interseccion, lo que
                // haya en el dataset lo vamos a pasar al source de la imagen (imagen.src)
                // asi se mostraran la imagenes a medida que vayamos haciendo scroll
                imagen.src = imagen.dataset.src;
                observer.unobserve(imagen);
        }
    });

});



// * funcion para cargar las imagenes de manera asincrona, se cargaran cuando
// * se muestren en la pantalla
// console.log(imagenes);
// recorremos el array imagenes, imagen sera el iterador
imagenes.forEach(imagen=>{
    // observar cada imagen y mostrarla cuando sea intersectada
    observer.observe(imagen);
});


//* funcion para cerrar el menu y quitar el overlay
const cerrarMenu = (boton, overlay) =>{
    boton.addEventListener('click', ()=>{
        navegacion.classList.add('ocultar')
        overlay.remove();

        // eliminar el btn-cerrar del codigo
        boton.remove();
    });

    // al hacer click en el overlay, se cierre el overlay y se oculte 
    // la barra de navegacion
    overlay.onclick = function(){
        overlay.remove();
        navegacion.classList.add('ocultar');

        // eliminar el btn-cerrar del codigo
        boton.remove();
    }
}

const platillos = () => {
    let platillosArreglo = [];

    // seleccionamos todos los platillos
    const platillos = document.querySelectorAll('.platillo');
    // console.log(platillos);

    // Para cada elemento, copiamos el array platillosArreglo y agregammos el elemento actual al final
    platillos.forEach(platillo => 
        platillosArreglo = [...platillosArreglo,platillo]);

    // console.log(platillosArreglo);

    // Filter crear un nuevo arreglo con los datos que estamos buscando
    const ensaladas = platillosArreglo.filter(ensalada=> ensalada.getAttribute('data-platillo') === 'ensalada');
    const pastas = platillosArreglo.filter(pasta=> pasta.getAttribute('data-platillo') === 'pasta');
    const pizzas = platillosArreglo.filter(pizza=> pizza.getAttribute('data-platillo') === 'pizza');
    const postres = platillosArreglo.filter(postre=> postre.getAttribute('data-platillo') === 'postre');

    // console.log(postres);

    // llamamos la funcion para mostrar los platillos en el contenedor y le pasamos
    //los parametros

    mostrarPlatillos(ensaladas, pastas, pizzas, postres, platillosArreglo );

}

//* funcion para Mostrar los patillos
//* agregamos y mostramos los platillos como hijos cada vez que itere el foreach
const mostrarPlatillos = (ensaladas, pastas, pizzas, postres, todos) => {
    btnEnsaladas.addEventListener('click', () =>{
        limpiarHtml(contenedorPlatillos);
        ensaladas.forEach(ensalada=> contenedorPlatillos.appendChild(ensalada));
    });

    btnPastas.addEventListener('click', () =>{
        limpiarHtml(contenedorPlatillos);
        pastas.forEach(pasta=> contenedorPlatillos.appendChild(pasta));
    });

    btnPizzas.addEventListener('click', () =>{
        limpiarHtml(contenedorPlatillos);
        pizzas.forEach(pizza=> contenedorPlatillos.appendChild(pizza));
    });

    btnPostres.addEventListener('click', () =>{
        limpiarHtml(contenedorPlatillos);
        postres.forEach(postre=> contenedorPlatillos.appendChild(postre));
    });

    btnTodos.addEventListener('click', () =>{
        limpiarHtml(contenedorPlatillos);
        todos.forEach(todo=> contenedorPlatillos.appendChild(todo));
    });
}

//* funcion para limpiar el HTML, para no nos muestre toda la informacion de los platillos

const limpiarHtml = (contenedor) =>{
    while(contenedor.firstChild){
        contenedor.removeChild(contenedor.firstChild);
    }
}




