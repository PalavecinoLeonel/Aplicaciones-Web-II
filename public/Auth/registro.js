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

        // SI TODO ESTA BIEN, REGISTRA EL USUARIO Y VA AL LOGIN
        if (isValid) {
            const password = document.getElementById("password").value.trim();
            const fechaNacimiento = document.getElementById("dob").value;

            const nuevoUsuario = {
                nombre,
                apellido,
                email,
                password,
                fechaNacimiento
            };
            
            fetch("/api/usuarios", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(nuevoUsuario)
            })
            .then(res => {
                if (!res.ok) {
                    throw new Error("Error en el registro");
                }
                return res.json();
            })
            
            .then(data => {
                console.log("Usuario registrado:", data);
                window.location.href = "../index.html";
            })
            .catch(error => {
                console.error("Hubo un problema con el registro:", error);
                alert("Error al registrar el usuario.");
            });
            //window.location.href = "../index.html";
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