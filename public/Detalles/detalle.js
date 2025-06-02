document.addEventListener('DOMContentLoaded', () => {
    const productoId = localStorage.getItem('productoSeleccionado');

    if (!productoId) {
        alert("No se seleccionó ningún producto.");
        return;
    }

    fetch('../productos.json')
        .then(response => response.json())
        .then(productosData => {
            let productoSeleccionado = null;

            for (const categoria in productosData.categorias) {
                productoSeleccionado = productosData.categorias[categoria].find(p => p.id == productoId);
                if (productoSeleccionado) break;
            }

            if (!productoSeleccionado) {
                alert("Producto no encontrado.");
                return;
            }

            //MOSTRAMOS LOS DETALLES
            document.getElementById("nombreProducto").textContent = productoSeleccionado.nombre;
            document.getElementById("descripcionProducto").textContent = productoSeleccionado.descripcionDetalles;
            document.getElementById("precioProducto").textContent = productoSeleccionado.precio.toLocaleString();
            document.getElementById("imagenProducto").src = productoSeleccionado.imagen;
            
            const videoElement = document.getElementById("videoProducto");
            const sourceElement = videoElement.querySelector("source");
            sourceElement.src = productoSeleccionado.video;
            videoElement.load();

            // PRODUCTOS RELACIONAD
            const relacionadosContainer = document.getElementById("productosRelacionados");
            productoSeleccionado.relatedProducts.forEach(id => {
                let relacionado = null;
                for (const categoria in productosData.categorias) {
                    relacionado = productosData.categorias[categoria].find(p => p.id === id);
                    if (relacionado) break;
                }
                if (relacionado) {
                    const relacionadoHTML = `
                        <div class="producto-relacionado">
                            <img src="${relacionado.imagen}" alt="${relacionado.nombre}">
                            <h4>${relacionado.nombre}</h4>
                            <p>$${relacionado.precio.toLocaleString()}</p>
                            <button class="detalle-producto-relacionado" onclick="verDetalle(${relacionado.id})">Ver Detalles</button>
                        </div>
                    `;
                    relacionadosContainer.insertAdjacentHTML("beforeend", relacionadoHTML);
                }
            });
        })
        .catch(error => {
            console.error("Error al cargar el JSON:", error);
        });
});

function verDetalle(id) {
    localStorage.setItem('productoSeleccionado', id);
    window.location.href = 'detalle.html';
}