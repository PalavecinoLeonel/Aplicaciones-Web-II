const loginForm = document.getElementById('loginForm');
if (loginForm) {
    loginForm.addEventListener('submit', async function(event) {
        event.preventDefault();

        const email = document.getElementById('email').value.trim();
        const password = document.getElementById('password').value.trim();

        try {
            // Hacemos la petición al backend para obtener todos los usuarios
            const response = await fetch('/api/usuarios');
            const usuarios = await response.json();

            // Buscamos al usuario por email
            const usuario = usuarios.find(u => u.email === email);

            if (!usuario) {
                alert('Usuario no encontrado.');
                return;
            }

            if (!usuario.activo) {
                alert('El usuario está inactivo.');
                return;
            }

            // Enviamos email y password al backend para que compare (con bcrypt)
            const validar = await fetch('/api/usuarios/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });

            if (!validar.ok) {
                const error = await validar.json();
                alert(error.error || 'Credenciales incorrectas');
                return;
            }

            const usuarioAutenticado = await validar.json();

            // Guardamos los datos
            sessionStorage.setItem('usuarioLogueado', JSON.stringify(usuarioAutenticado));
            window.location.href = 'Auth/inicio.html';

        } catch (error) {
            console.error('Error en el login:', error);
            alert('Ocurrió un error. Intenta de nuevo.');
        }
    });
}
/*
if (loginForm) {
    loginForm.addEventListener('submit', function(event) {
        event.preventDefault();

        // GUARDO LA INFO DEL USUARIO LOGUEADO (el sessionStorage) 
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        
        const user = {
            email: email,
            password: password
        };
        sessionStorage.setItem("usuarioLogueado", JSON.stringify(user));
        window.location.href = 'Auth/inicio.html';
    });
}
*/
//REDIRIGE DEL LOGIN A LA PAG REGISTRO
document.addEventListener("DOMContentLoaded", () => {
    const registerButton = document.getElementById("registerButton");

    if (registerButton) {
        registerButton.addEventListener("click", () => {
            window.location.href = "../Auth/registro.html";
        });
    }
});