// Importamos las funciones globales
import { getJSON } from "../js/script.js";
import { borrarAnimaciones } from "../js/script.js";
import { emailRegex } from "../js/script.js";

// Declaramos las variables globales que usaremos
const btnLeft = document.querySelector(".noticias__buttons-left");
const btnRight = document.querySelector(".noticias__buttons-right");
const noticiasCards = document.querySelector(".noticias__card");
const noticiasTitle = document.querySelector(".noticias__title");
const noticiasParagraph = document.querySelector(".noticias__paragraph");
const noticiasImage = document.querySelector(".noticias__image");

const regaloContainer = document.querySelector(".regalo__container");
const regaloSuccess = document.querySelector(".regalo__succes");
const regaloError = document.querySelector(".regalo__errormsg");
const regaloInput = document.querySelector(".regalo__input");
const regaloBtn = document.querySelector(".regalo__button");
const regaloSuccesBtn = document.querySelector(".regalo__succes-button");
const regaloForm = document.querySelector(".regalo__actions");

let noticiaActual = 0;

// Añado event listeners para quitar animaciones
noticiasCards.addEventListener("animationend", borrarAnimaciones);

// Funcion para cambiar de noticia
async function cambiarNoticia(direccion) {
    // Probamos de cargar el JSON
    try {
        const data = await getJSON();

        // Si el JSON se cargó correctamente actualizamos la noticia, añadiendo la animación
        if (direccion === "left") {
            noticiasCards.classList.add("slide-left");
        } else {
            noticiasCards.classList.add("slide-right");
        }

        // Espero a que se termine la animación
        setTimeout(() => {
            noticiaActual = direccion === "left"
            ? (noticiaActual - 1 + data.noticias.length) % data.noticias.length
            : (noticiaActual + 1) % data.noticias.length;
            
            const proximaNoticia = data.noticias[noticiaActual];

            // Actualizamos la noticia
            noticiasTitle.innerHTML = proximaNoticia.titulo;
            noticiasParagraph.innerHTML = proximaNoticia.texto;
            noticiasImage.src = proximaNoticia.imagen;

            // Añadimos la animación de entrada
            if (direccion === "left") {
                noticiasCards.classList.add("fade-in-right");
            } else {
                noticiasCards.classList.add("fade-in-left");
            }
        }, 450);
    } catch (error) {
        console.error(error);
    }
}

// Añado los Event Listeners para los botones de cambio de noticia
btnLeft.addEventListener("click", () => cambiarNoticia("left"));
btnRight.addEventListener("click", () => cambiarNoticia("right"));

// Event listener para evitar el envio de formulario
regaloForm.addEventListener("submit", e => e.preventDefault());

// Funcion para comprobar si el correo es válido y cambiar la tarjeta o añadir el error
regaloBtn.addEventListener("click", () => {
    if (regaloInput.value.match(emailRegex)) {
        regaloSuccess.classList.add("active");
        regaloError.classList.remove("active");
        regaloContainer.classList.remove("active");
    } else {
        regaloError.classList.add("active");
    }
});

// Funcion para volver al estado inicial de la tarjeta
regaloSuccesBtn.addEventListener("click", () => {
    regaloSuccess.classList.remove("active");
    regaloError.classList.remove("active");
    regaloContainer.classList.add("active");
    regaloInput.value = "";
});

