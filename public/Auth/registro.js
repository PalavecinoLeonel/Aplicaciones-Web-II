document.addEventListener("DOMContentLoaded", () => {
    const registerForm = document.getElementById("registerForm");

    // VALIDACIONES
    registerForm.addEventListener("submit", function (event) {
        event.preventDefault();

        // INPUTS
        const nombre = document.getElementById("nombre").value.trim();
        const apellido = document.getElementById("apellido").value.trim();
        const email = document.getElementById("email").value.trim();

        // MENSAJES
        const errorNombre = document.getElementById("errorNombre");
        const errorApellido = document.getElementById("errorApellido");
        const errorEmail = document.getElementById("errorEmail");

        // SON LOS SIMBOLOS PARA LAS VALIDACIONES
        const regexNombreApellido = /^[a-zA-ZÀ-ÿ\s]+$/;
        const regexEmail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        errorNombre.textContent = "";
        errorApellido.textContent = "";
        errorEmail.textContent = "";

        let isValid = true;

        //VALIDACIONES:
        // NOMBRE
        if (!regexNombreApellido.test(nombre)) {
            errorNombre.textContent = "No se permiten números o símbolos en el Nombre.";
            isValid = false;
        }

        // APELLIDO
        if (!regexNombreApellido.test(apellido)) {
            errorApellido.textContent = "No se permiten números o símbolos en el Apellido.";
            isValid = false;
        }

        // CORREO
        if (!regexEmail.test(email)) {
            errorEmail.textContent = "Por favor, ingrese un correo electrónico válido.";
            isValid = false;
        }

        // SI TODO ESTA BIEN, VA AL LOGIN
        if (isValid) {
            window.location.href = "../index.html";
        } else {
            console.log("Errores en el formulario. No se puede registrar.");
        }
    });

    // BTN VOLVER AL LOGIN
    const backToLoginButton = document.getElementById("backToLoginButton");
    if (backToLoginButton) {
        backToLoginButton.addEventListener("click", () => {
            window.location.href = "../index.html";
        });
    }
});