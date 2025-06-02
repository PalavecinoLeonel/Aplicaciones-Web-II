document.addEventListener("DOMContentLoaded", function() {
    const navbarHTML = `
        <nav class="navbar">
            <div class="logo">
                <img src="../../Imagenes/MundoGuitarraIcono.webp" alt="Icono de la tienda" width="50" height="50">
                <span class="nombre-tienda">Mundo guitarra</span>
            </div>
            <ul class="navbar-links">
                <li><a href="guitarras.html">Guitarras</a></li>
                <li><a href="amplificadores.html">Amplificadores</a></li>
                <li><a href="accesorios.html">Accesorios</a></li>
            </ul>
            <ul>
                <li><a href="../../Carrito/carrito.html">Carrito</a></li>
                <li><a href="../../Auth/inicio.html">Home</a></li>
                <li><button id="logoutButton">Logout</button></li>
            </ul>
        </nav>
    `;
    // Este es para poner el navbar dentro del <body>
    document.body.insertAdjacentHTML("afterbegin", navbarHTML);
});