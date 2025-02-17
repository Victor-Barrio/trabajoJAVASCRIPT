// Importamos las funciones globales
import { borrarAnimaciones } from "../js/script.js";

// Declaramos las variables globales que usaremos
const galeriaCards = document.querySelector(".galeria__card");
const galeriaDots = document.querySelectorAll(".galeria__slider-dot");
const galeriaTitle = document.querySelector(".galeria__text-title");
const galeriaTiempo = document.getElementById("tiempo");
const galeriaDificultad = document.getElementById("dificultad");
const galeriaSabor = document.getElementById("sabor");
const galeriaExplicacion = document.querySelector(".galeria__explicacion");
const galeriaImage = document.querySelector(".galeria__image");

let galeriaActual = 0;
let autoPlay;

// Funcion global para obtener el JSON
async function getJSON() {
    const response = await fetch("../json/info.json");
    if (!response.ok) {
        throw new Error("Error al cargar el archivo JSON");
    }
    return response.json();
}

// Añado event listeners para quitar animaciones
galeriaCards.addEventListener("animationend", borrarAnimaciones);

// Funcion para cambiar el producto
async function cambiarGaleria(numero) {
    // Probamos de cargar el JSON
    try {
        const data = await getJSON();

        // Si el JSON se cargó correctamente actualizamos la pagina de galeria
        galeriaDots.forEach((dot, index) => {
            dot.classList.remove("active"); // Quitamos "active" de todos
            if (index === numero) {
                dot.classList.add("active"); // Añadimos "active" solo al seleccionado
            }
        });

        let direccion = "none";
        if (numero < galeriaActual) {
            direccion = "left";
        } else if (numero > galeriaActual) {
            direccion = "right";
        }

        if (direccion === "left") {
            galeriaCards.classList.add("slide-left");
        } else if (direccion === "right") {
            galeriaCards.classList.add("slide-right");
        } 

        // Espero a que termine la animación
        setTimeout(() => {
            galeriaActual = numero;
            
            const proximaGaleria = data.galeria[galeriaActual];

            // Actualizamos la galeria
            galeriaTitle.innerHTML = proximaGaleria.titulo;
            galeriaTiempo.innerHTML = proximaGaleria.tiempo;
            galeriaDificultad.innerHTML = proximaGaleria.dificultad;
            galeriaSabor.innerHTML = proximaGaleria.sabor;
            galeriaExplicacion.innerHTML = proximaGaleria.informacion;
            galeriaImage.src = proximaGaleria.imagen;

            // Añadimos la animación de entrada
            if (direccion === "left") {
                galeriaCards.classList.add("fade-in-right");
            } else if (direccion === "right") {
                galeriaCards.classList.add("fade-in-left");
            }
        }, 450);
    } catch (error) {
        console.error(error);
    }
}

// Funcion para iniciar el autoPlay
function iniciarAutoPlay() {
    clearInterval(autoPlay);
    autoPlay = setInterval(() => {
        let siguiente = (galeriaActual + 1) % galeriaDots.length;
        cambiarGaleria(siguiente);
    }, 10000);
}

// Añado los Event Listeners para los botones
galeriaDots.forEach((dot, index) => {
    dot.id = index; 
    dot.addEventListener("click", (event) => {
        cambiarGaleria(Number(event.target.id));
        iniciarAutoPlay();
    });
});

// Añado el AutoPlay al cargar la página
iniciarAutoPlay();