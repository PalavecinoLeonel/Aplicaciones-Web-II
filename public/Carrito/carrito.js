//MOSTRAR PRODUCTO
function mostrarCarrito() {
    const carritoContainer = document.getElementById("carritoContainer");
    const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    carritoContainer.innerHTML = ""; // LIMPIA TODO ANTES

    const totalContainer = document.getElementById("total");
    let total = 0;

    //SE FIJA SI EL CARRITO ESTA VACIO
    if (carrito.length === 0) {
        carritoContainer.innerHTML = "<p>El carrito está vacío.</p>";
        totalContainer.textContent = "0.00";
        return;
    }
    //AGREGA Y CALCULA EL TOTAL
    carrito.forEach((producto, index) => {
        const productoElemento = document.createElement("div");
        productoElemento.classList.add("producto-carrito");

        productoElemento.innerHTML = `
            <h3>${producto.nombre}</h3>
            <p>Precio: $${producto.precio.toFixed(2)}</p>
            <p>Cantidad: ${producto.cantidad}</p>           
            <button class="eliminar-producto" data-index="${index}">Eliminar</button>
        `;
        carritoContainer.appendChild(productoElemento);
        total += producto.precio * producto.cantidad;
    });
    totalContainer.textContent = total.toFixed(2);

    //ELIMINA DEL CARRITO 
    const botonesEliminar = document.querySelectorAll(".eliminar-producto");
    botonesEliminar.forEach(boton => {
        boton.addEventListener("click", eliminarProductoDelCarrito);
    });
}


//ELIMINAR PRODUCTO
function eliminarProductoDelCarrito(event) {
    const index = event.target.getAttribute("data-index");
    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    
    // ELIMINA
    carrito.splice(index, 1);
    // GUARDAR EN LOCALSTORAGE
    localStorage.setItem("carrito", JSON.stringify(carrito));
    mostrarCarrito();
}


//VACIAR CARRITO
function vaciarCarrito() {
    localStorage.removeItem("carrito");
    mostrarCarrito();
}


//"COMPRAR"
function comprar() {
    const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    if (carrito.length === 0) {
        alert("El carrito está vacío. Agrega productos antes de comprar.");
        return;
    }
    alert("¡Gracias por tu compra!");
    vaciarCarrito();
}
document.addEventListener("DOMContentLoaded", mostrarCarrito);