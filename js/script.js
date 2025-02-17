// Script del menu estilo burger de los telefonos
const body = document.querySelector("body");
const header = document.querySelector("header");
const hamburgerBtn = document.querySelector(".header__hamburguer");
const closeBtn = document.querySelector(".header__close");

hamburgerBtn.addEventListener("click", () => {
    header.classList.add("active");
    body.classList.add("noScroll");
});

closeBtn.addEventListener("click", () => {
    body.classList.remove("noScroll");
    header.classList.remove("active");
});

// Script para los iconos de las páginas
const icons = document.querySelectorAll("i");

function actualizarClases() {
    const pantalla = window.innerWidth;
    
    icons.forEach(icono => {
        icono.classList.remove("fa-xl", "fa-lg");

        if (pantalla < 1024) {
            icono.classList.add("fa-lg");
        } else {
            icono.classList.add("fa-xl");
        }
    });
}

// Ejecutar al cargar la página
actualizarClases();

// Detectar cambios de tamaño en tiempo real
window.addEventListener("resize", actualizarClases);

// Funcion global para borrar las animaciones
export function borrarAnimaciones(event) {
    event.target.classList.remove("slide-left", "slide-right", "fade-in-left", "fade-in-right");
}

// Expresion regular global para comprobar el correo
export const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;