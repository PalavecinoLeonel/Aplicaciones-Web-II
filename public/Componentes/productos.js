// MOSTRAR PRODUCTO Y CONTROL DE ERRORES
document.addEventListener("DOMContentLoaded", function() {
    const galeriaProductos = document.querySelector(".galeria-productos");

    if (!galeriaProductos) {
        return;
    }
    
    const categoria = document.body.getAttribute("data-categoria");

    if (!categoria) {
        console.error("No se encontró la categoría en el atributo data-categoria del body.");
        return;
    }
    fetch("/api/productos")
        .then(response => {
            if (!response.ok) {
                throw new Error("No se pudo cargar el archivo JSON");
            }
            return response.json();
        })
        .then(data => {
            
            const productos = data.categorias[categoria];
            //const productos = data.filter(p => p.categoria === categoria);
            const galeriaProductos = document.querySelector(".galeria-productos");

            if (!galeriaProductos) {
                console.error("No se encontró el contenedor .galeria-productos en el HTML.");
                return;
            }

            if (!productos) {
                console.error(`No se encontraron productos para la categoría: ${categoria}`);
                return;
            }
            galeriaProductos.innerHTML = ""; //LIMPIAMOS
            //LLAMAMOS UN PRODUCTO
            productos.forEach(producto => {
                const productoHTML = `
                    <div class="producto" data-id="${producto.id}" data-precio="${producto.precio}">
                        <img src="${producto.imagen}" alt="${producto.nombre}">
                        <div class="info-producto">
                            <h3 class="titulo-producto">${producto.nombre}</h3>
                            <p class="descripcion-producto">${producto.descripcion}</p>
                            <button class="ver-detalle">Ver Detalles</button>
                            <p class="precio-producto">$${producto.precio.toLocaleString()}</p>
                            <div class="cant">
                                <button class="decrease">-</button>
                                <span class="quantity">1</span>
                                <button class="increase">+</button>
                            </div>
                            <button class="add-to-cart">Agregar al carrito</button> 
                        </div>
                    </div>
                `;
                galeriaProductos.insertAdjacentHTML("beforeend", productoHTML);
            });
            agregarFuncionalidadBotones();
        })
        .catch(error => console.error("Error al cargar los productos:", error));
});


// FUNCIONALIDAD BOTONES
function agregarFuncionalidadBotones() {
    const productos = document.querySelectorAll('.producto');

    productos.forEach(producto => {
        const decreaseButton = producto.querySelector('.decrease');
        const increaseButton = producto.querySelector('.increase');
        const quantityDisplay = producto.querySelector('.quantity');
        const addToCartButton = producto.querySelector('.add-to-cart');
        const productos = document.querySelectorAll('.producto');
        
        let quantity = parseInt(quantityDisplay.textContent);

        // DISMINUIR CANTIDAD
        decreaseButton.addEventListener('click', () => {
            if (quantity > 1) {
                quantity--;
                quantityDisplay.textContent = quantity;
            }
        });

        // AUMENTAR CANTIDAD
        increaseButton.addEventListener('click', () => {
            quantity++;
            quantityDisplay.textContent = quantity;
        });

        // AGREGAR AL CARRITO
        addToCartButton.addEventListener('click', () => {
            const productName = producto.querySelector('.titulo-producto').textContent;
            //const price = parseFloat(producto.querySelector('.precio-producto').textContent.replace('$', ''));
            const price = parseFloat(producto.getAttribute('data-precio')); 

            //EL LOCALSTORAGE
            const productoCarrito = {
                nombre: productName,
                precio: price,
                cantidad: quantity
            };
            agregarProductoAlCarrito(productoCarrito);

            alert(`${quantity} x ${productName} agregado(s) al carrito. Precio total: $${(price * quantity).toLocaleString()}`);
            //alert(`${quantity} x ${productName} agregado(s) al carrito. Precio total: $${(price * quantity).toFixed(2)}`);
        });

        // 
        productos.forEach(producto => {
            const detalleButton = producto.querySelector('.ver-detalle');
    
            detalleButton.addEventListener('click', () => {
                const productId = producto.getAttribute('data-id'); // AGARRA EL ID
                localStorage.setItem('productoSeleccionado', productId); // GUARDA EL ID
                window.location.href = "../Detalles/detalle.html"; // PAGINA DETALLES
            });
        });
    });
}

// FUNCION PARA GUARDAR EL PRODUCTO EN EL LOCALSTORAGE
function agregarProductoAlCarrito(producto) {
    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    carrito.push(producto);
    localStorage.setItem("carrito", JSON.stringify(carrito));
}
