// Importamos las funciones globales
import { emailRegex } from "../js/script.js";

// Declaramos las variables globales que usaremos
const presupuestoContainer = document.querySelector(".presupuesto");
const presupuestoSuccess = document.querySelector(".presupuesto__succes");
const presupuestoForm = document.querySelector(".presupuesto__form");
const presupuestoError = document.querySelectorAll(".presupuesto__form-error");
const inputNombre = document.getElementById("nombre");
const inputApellidos = document.getElementById("apellidos");
const inputTelefono = document.getElementById("telefono");
const inputCorreo = document.getElementById("correo");
const inputProducto = document.getElementById("producto");
const inputEnvio = document.getElementById("envio");
const checkboxPolitica = document.getElementById("politica");
const inputExtras = document.querySelectorAll(".presupuesto__extras");
const inputPresupuesto = document.getElementById("presupuesto");
const formBtn = document.querySelector(".presupuesto__button");
const succesBtn = document.querySelector(".presupuesto__succes-btn");
const allInputs = document.querySelectorAll(".presupuesto__input");

// Event listener para evitar el envio de formulario
presupuestoForm.addEventListener("submit", e => e.preventDefault());

// Declaramos las Expresiones regulares
const nombreApellidosRegex = /^[a-zA-ZÁÉÍÓÚáéíóúñÑ\s]+$/;
const numeroTelRegex = /^[0-9]{9}$/;
const envioRegex = /^[0-9]{1,3}$/;

// Funcion para comprobar el formulario
function validarFormulario() {
    let formValido = true;

    // Comprobamos cada uno de los campos
    const inputs = [inputNombre, inputApellidos, inputTelefono, inputCorreo, inputEnvio];
    const regexes = [nombreApellidosRegex, nombreApellidosRegex, numeroTelRegex, emailRegex, envioRegex];

    inputs.forEach((input, index) => {
        const esValido = regexes[index].test(input.value);
        presupuestoError[index].classList.toggle("active", !esValido);

        if (!esValido) {
            formValido = false;
        } 
    });

    // Comprobamos que haya un producto seleccionado
    if (inputProducto.value === "") {
        presupuestoError[4].classList.add("active");
        formValido = false;
    }

    // Comprobamos el envio
    if (parseInt(inputEnvio.value) < 1 || parseInt(inputEnvio.value) > 180 || inputEnvio.value === "") {
        presupuestoError[5].classList.add("active");
        formValido = false;
    } else {
        presupuestoError[5].classList.remove("active");
    }

    // Comprobamos que la politica este marcada
    if (checkboxPolitica.checked === false) {
        formValido = false;
    }

    // Si el formulario es valido lo enviamos y enseñamos la tarjeta de éxito
    if (formValido) {
        presupuestoSuccess.classList.add("active");
        presupuestoError.forEach(error => error.classList.remove("active"));
        presupuestoContainer.classList.remove("active");
    }
}

// Funcion que calcula el total del pedido
function calcularTotal() {
    let total = 0;
    
    // Sumo el precio del producto
    total += Number(inputProducto.value);

    // Sumo el precio del envio si es menor de 20
    if (inputEnvio.value < 20) {
        total += 10;
    }

    document.querySelectorAll('input.presupuesto__extras[type="checkbox"]:checked').forEach(checkbox => {
        total += Number(checkbox.value);
    });

    // Actualizo el total
    inputPresupuesto.value = `${total}€`;
}

// Añado los Event Listeners para los botones 
formBtn.addEventListener("click", () => {
    validarFormulario();
});

succesBtn.addEventListener("click", () => {
    presupuestoSuccess.classList.remove("active");
    presupuestoContainer.classList.add("active");
    allInputs.forEach(input => input.value = "");
});

inputEnvio.addEventListener("blur", () => {
    calcularTotal();
});

inputProducto.addEventListener("change", () => {
    calcularTotal();
});

inputExtras.forEach(extra => {
    extra.addEventListener("change", () => {
        calcularTotal();
    });
});