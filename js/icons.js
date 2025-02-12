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