// REDIRIGE AL INICIO SOLO SI EL BTN "VOLVER AL INICIO" EXISTE EN LA PAG REGISTRO
const backToLoginButton = document.getElementById('backToLoginButton');
if (backToLoginButton) {
    backToLoginButton.addEventListener('click', function() {
        window.location.href = '../index.html';  // REDIRIGE A LA PAG LOGIN
    });
}

document.addEventListener("DOMContentLoaded", function() {
    // "LOGOUT" DEL NAVBAR
    const logoutButton = document.getElementById('logoutButton');
    if (logoutButton) {
        logoutButton.addEventListener('click', function() {
            window.location.href = '../index.html';
        });
    }
});