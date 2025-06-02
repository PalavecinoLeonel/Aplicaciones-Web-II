document.addEventListener("DOMContentLoaded", function() {
    //Le quité los links a guitarra y amplis, accesorios, para evitar redundancia para el usuario 
    const navbarHTML = `
        <nav class="navbar">
            <div class="logo">
                <img src="../../Imagenes/MundoGuitarraIcono.webp" alt="Icono de la tienda" width="50" height="50">
                <span class="nombre-tienda">Mundo guitarra</span>
            </div>
            <ul>
                <li><a href="../../Carrito/carrito.html">Carrito</a></li>
                <li><a href="../../Auth/inicio.html">Home</a></li>
                <li><button id="logoutButton">Logout</button></li>
            </ul>
        </nav>
    `;
    document.body.insertAdjacentHTML("afterbegin", navbarHTML);

    const logoutButton = document.getElementById('logoutButton');
    if (logoutButton) {
        logoutButton.addEventListener('click', function() {
            window.location.href = '../index.html';
        });
    }
});