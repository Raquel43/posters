import { PosterAPI, posterCarrito } from "./PosterAPI.js";
let Carritos=[];


const todoBody = document.querySelector('body');
const btnVaciarCarrito = document.querySelector('#vaciar-carrito');
const carro = document.querySelector('#carrito');
const btnBuscador = document.querySelector("#submit-buscador");
const btnPulsarIntro = document.querySelector("#buscador");
const mostrarPeliculas = document.querySelector('#peliculas');
const mostrarSeries = document.querySelector('#series');


function init(){
    //Carga inicial de datos
    PosterAPI.getJSONPoster();
    cargarCarrito();
    cargarEventListeners();
  
    


}

init();
//Al pasar la variable al modulo, se vuelve constante, para modificarlo lo debo introducir en otra variable.
function cargarCarrito(){
Carritos.push(posterCarrito);
}


function cargarEventListeners() {
    todoBody.addEventListener("click", PosterAPI.eventsBody);
    todoBody.addEventListener("click", PosterAPI.eventsModal);
    carro.addEventListener("click", PosterAPI.eliminarCurso);
    mostrarPeliculas.addEventListener("click",PosterAPI.clickPeliculas);
    mostrarSeries.addEventListener("click", PosterAPI.clickSeries);

    // Muestra los cursos de Local Storage cuando se carga la página en el navegador
  document.addEventListener("DOMContentLoaded", () => {
    // Si la primera condición falla, inicializa la variable a []
    Carritos = JSON.parse(localStorage.getItem("carrito")) || [];
    console.log(Carritos);
    PosterAPI.generarCarritoHTML();
  });
  
     // Vaciar el carrito cuando se pulsa en el boton de vaciar carrito
  btnVaciarCarrito.addEventListener("click", () => {
    Carritos = []; // reseteamos el arreglo
    PosterAPI.limpiarHTML(); // Eliminamos todo el HTML
    localStorage.removeItem("carrito");
    document.querySelector("#num-cursos").innerHTML = "0"; // Inicializar cantidad cursos
  });

  btnBuscador.addEventListener("click",function(){
   PosterAPI.buscar();
  });
  let clicked = false;
 btnPulsarIntro.addEventListener('click', function(){
    clicked = true;
    console.log("You clicked the button. `clicked` is now `true`");
  });
  btnPulsarIntro.addEventListener('keypress', function(e) {
    if(clicked) {
     let keynum = e.keyCode || e.which;
      if(keynum == 13) {
              clicked=true;
        PosterAPI.buscar();
      }
    }
  });

 
 
}
