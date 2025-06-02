document.addEventListener("DOMContentLoaded", () => {
    const main = document.querySelector("main");

    if (!main) {
        console.error("No se encontró el contenedor principal <main> en el HTML.");
        return;
    }
    const logoHTML = `
        <div class="logo-principal">
            <img src="../Imagenes/MundoGuitarraIcono.webp" alt="Logo Principal de la Tienda" width="150" height="150">
            <h1>Mundo guitarra</h1>
        </div>
    `;
    main.insertAdjacentHTML("afterbegin", logoHTML);
});