let vehiculosEnCarrito = localStorage.getItem("vehiculos-en-carrito");
vehiculosEnCarrito = JSON.parse(vehiculosEnCarrito);

const contenedorCarritoVacio = document.querySelector("#carrito-vacio");
const contenedorCarritoVehiculos = document.querySelector("#carrito-vehiculos");
const contenedorCarritoAcciones = document.querySelector("#carrito-acciones");
const contenedorCarritoComprado = document.querySelector("#carrito-comprado");
let botonesEliminar = document.querySelectorAll(".carrito-vehiculo-eliminar");
const botonVaciar = document.querySelector("#carrito-acciones-vaciar");
const contenedorTotal = document.querySelector("#total");
const botonComprar = document.querySelector("#carrito-acciones-comprar");


function cargarVehiculosCarrito() {
    if (vehiculosEnCarrito && vehiculosEnCarrito.length > 0) {

        contenedorCarritoVacio.classList.add("disabled");
        contenedorCarritoVehiculos.classList.remove("disabled");
        contenedorCarritoAcciones.classList.remove("disabled");
        contenedorCarritoComprado.classList.add("disabled");

        contenedorCarritoVehiculos.innerHTML = "";

        vehiculosEnCarrito.forEach(vehiculo => {

            const div = document.createElement("div");
            div.classList.add("carrito-vehiculo");
            div.innerHTML = `
                <img class="carrito-vehiculo-imagen" src="${vehiculo.imagen}" alt="${vehiculo.titulo}">
                <div class="carrito-vehiculo-titulo">
                    <small>Título</small>
                    <h3>${vehiculo.titulo}</h3>
                </div>
                <div class="carrito-vehiculo-cantidad">
                    <small>Cantidad</small>
                    <p>${vehiculo.cantidad}</p>
                </div>
                <div class="carrito-vehiculo-precio">
                    <small>Precio</small>
                    <p>$${vehiculo.precio}</p>
                </div>
                <div class="carrito-vehiculo-subtotal">
                    <small>Subtotal</small>
                    <p>$${vehiculo.precio * vehiculo.cantidad}</p>
                </div>
                <button class="carrito-vehiculo-eliminar" id="${vehiculo.id}"><i class="bi bi-trash-fill"></i></button>
            `;

            contenedorCarritoVehiculos.append(div);
        })

    } else {
        contenedorCarritoVacio.classList.remove("disabled");
        contenedorCarritoVehiculos.classList.add("disabled");
        contenedorCarritoAcciones.classList.add("disabled");
        contenedorCarritoComprado.classList.add("disabled");
    }

    actualizarBotonesEliminar();
    actualizarTotal();
}

cargarVehiculosCarrito();

function actualizarBotonesEliminar() {
    botonesEliminar = document.querySelectorAll(".carrito-vehiculo-eliminar");
    
    botonesEliminar.forEach(boton => {
        boton.addEventListener("click", eliminarDelCarrito);
    });   
    
    const toastify = document.querySelector(".carrito-vehiculo-eliminar")

    toastify.addEventListener("click", () => {
        Toastify({
            text: `Eliminado del carrito`,
            duration: 2000,
            close: true,
            gravity: "top",
            position: "right",
            stopOnFocus: true,
            style: {
                background: "linear-gradient(to right, #00b09b, #96c93d)",
            },
            onClick: function () {}
        }).showToast();
    })
}

function eliminarDelCarrito(e) {
    const idBoton = e.currentTarget.id;
    const index = vehiculosEnCarrito.findIndex(vehiculo => vehiculo.id === idBoton);

    vehiculosEnCarrito.splice(index, 1);
    cargarVehiculosCarrito();

    localStorage.setItem("vehiculos-en-carrito", JSON.stringify(vehiculosEnCarrito));

}

botonVaciar.addEventListener('click', vaciarCarrito)

function vaciarCarrito() {
    vehiculosEnCarrito.length = 0;
    localStorage.setItem("vehiculos-en-carrito", JSON.stringify(vehiculosEnCarrito));
    cargarVehiculosCarrito();
}


function actualizarTotal() {
    const totalCalculado = vehiculosEnCarrito.reduce((acc, vehiculo) => acc + (vehiculo.precio * vehiculo.cantidad), 0);
    total.innerText = `$${totalCalculado}`;
}

botonComprar.addEventListener("click", comprarCarrito);

function comprarCarrito() {

    vehiculosEnCarrito.length = 0;
    localStorage.setItem("vehiculos-en-carrito", JSON.stringify(vehiculosEnCarrito));

    contenedorCarritoVacio.classList.add("disabled");
    contenedorCarritoVehiculos.classList.add("disabled");
    contenedorCarritoAcciones.classList.add("disabled");
    contenedorCarritoComprado.classList.remove("disabled");
};