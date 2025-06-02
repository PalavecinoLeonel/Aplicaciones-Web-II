const loginForm = document.getElementById('loginForm');
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

//REDIRIGE DEL LOGIN A LA PAG REGISTRO
document.addEventListener("DOMContentLoaded", () => {
    const registerButton = document.getElementById("registerButton");

    if (registerButton) {
        registerButton.addEventListener("click", () => {
            window.location.href = "../Auth/registro.html";
        });
    }
});