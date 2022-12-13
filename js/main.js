// VEHÍCULOS
const vehiculos = [
    // Autos
    {
        id: "auto-01",
        titulo: "Ford Fiesta",
        imagen: "./img/ford_fiesta.png",
        categoria: {
            nombre: "Autos",
            id: "autos"
        },
        precio: 5100000
    },
    {
        id: "auto-02",
        titulo: "Chevrolet Cruze",
        imagen: "./img/chevrolet_cruze.png",
        categoria: {
            nombre: "Autos",
            id: "autos"
        },
        precio: 5300000
    },
    {
        id: "auto-03",
        titulo: "Fiat Cronos",
        imagen: "./img/fiat_cronos.jpg",
        categoria: {
            nombre: "Autos",
            id: "autos"
        },
        precio: 4800000
    },
    {
        id: "auto-04",
        titulo: "Volkswagen Golf",
        imagen: "./img/volkswagen_golf.png",
        categoria: {
            nombre: "Autos",
            id: "autos"
        },
        precio: 6400000
    },

    // Camionetas y Vans
    {
        id: "camioneta-01",
        titulo: "Ford Ranger",
        imagen: "./img/ford_ranger.png",
        categoria: {
            nombre: "Camionetas y Vans",
            id: "camionetas_vans"
        },
        precio: 8600000
    },
    {
        id: "camioneta-02",
        titulo: "Toyota Hilux",
        imagen: "./img/toyota_hilux.png",
        categoria: {
            nombre: "Camionetas y Vans",
            id: "camionetas_vans"
        },
        precio: 8200000
    },
    {
        id: "camioneta-03",
        titulo: "Chevrolet S10",
        imagen: "./img/chevrolet_s10.png",
        categoria: {
            nombre: "Camionetas y Vans",
            id: "camionetas_vans"
        },
        precio: 8400000
    },
    {
        id: "vans-01",
        titulo: "Ford Transit",
        imagen: "./img/ford_transit.png",
        categoria: {
            nombre: "Camionetas y Vans",
            id: "camionetas_vans"
        },
        precio: 11300000
    },

    // Suvs
    {
        id: "suvs-01",
        titulo: "Jeep Grand Wagoneer",
        imagen: "./img/jeep_wagoneer.png",
        categoria: {
            nombre: "Suvs",
            id: "suvs"
        },
        precio: 9800000
    },
    {
        id: "suvs-02",
        titulo: "Volkswagen T-Cross",
        imagen: "./img/volkswagen_tcross.png",
        categoria: {
            nombre: "Suvs",
            id: "suvs"
        },
        precio: 7400000
    },
];

const contenedorVehiculos = document.querySelector("#contenedor-vehiculos");
const botonesCategorias = document.querySelectorAll(".boton-categoria");
const tituloPrincipal = document.querySelector("#titulo-principal");
let botonesAgregar = document.querySelectorAll(".vehiculo-agregar");
const numerito = document.querySelector("#numerito");


function cargarVehiculos(vehiculosElegidos) {

    contenedorVehiculos.innerHTML = "";

    vehiculosElegidos.forEach(vehiculo => {

        const div = document.createElement("div");
        div.classList.add("vehiculo");
        div.innerHTML = `
            <img class="vehiculo-imagen" src="${vehiculo.imagen}" alt="${vehiculo.titulo}">
            <div class="vehiculo-detalles">
                <h3 class="vehiculo-titulo">${vehiculo.titulo}</h3>
                <p class="vehiculo-precio">$${vehiculo.precio}</p>
                <button class="vehiculo-agregar" id="${vehiculo.id}">Agregar</button>
            </div>
        `;

        contenedorVehiculos.append(div);
    })

    actualizarBotonesAgregar();
}

cargarVehiculos(vehiculos);

botonesCategorias.forEach(boton => {
    boton.addEventListener("click", (e) => {

        botonesCategorias.forEach(boton => boton.classList.remove("active"));
        e.currentTarget.classList.add("active");

        if (e.currentTarget.id != "todos") {
            const vehiculoCategoria = vehiculos.find(vehiculo => vehiculo.categoria.id === e.currentTarget.id);
            tituloPrincipal.innerText = vehiculoCategoria.categoria.nombre;
            const vehiculosBoton = vehiculos.filter(vehiculo => vehiculo.categoria.id === e.currentTarget.id);
            cargarVehiculos(vehiculosBoton);
        } else {
            tituloPrincipal.innerText = "Todos los vehículos";
            cargarVehiculos(vehiculos);
        }

    })
});

function actualizarBotonesAgregar() {
    botonesAgregar = document.querySelectorAll(".vehiculo-agregar");
    botonesAgregar.forEach(boton => {
        boton.addEventListener("click", agregarAlCarrito);
    });

    const toastify = document.querySelector(".vehiculo-agregar")

    toastify.addEventListener("click", () => {
        Toastify({
            text: `Agregado al carrito`,
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

let vehiculosEnCarrito;

let vehiculosEnCarritoLS = localStorage.getItem("vehiculos-en-carrito");

if (vehiculosEnCarritoLS) {
    vehiculosEnCarrito = JSON.parse(vehiculosEnCarritoLS);
    actualizarNumerito();
} else {
    vehiculosEnCarrito = [];
}

function agregarAlCarrito(e) {
    const idBoton = e.currentTarget.id;
    const vehiculoAgregado = vehiculos.find(vehiculo => vehiculo.id === idBoton);

    if (vehiculosEnCarrito.some(vehiculo => vehiculo.id === idBoton)) {
        const index = vehiculosEnCarrito.findIndex(vehiculo => vehiculo.id === idBoton);
        vehiculosEnCarrito[index].cantidad++;
    } else {
        vehiculoAgregado.cantidad = 1;
        vehiculosEnCarrito.push(vehiculoAgregado);
    }

    actualizarNumerito();

    localStorage.setItem("vehiculos-en-carrito", JSON.stringify(vehiculosEnCarrito));
}

function actualizarNumerito() {
    let nuevoNumerito = vehiculosEnCarrito.reduce((acc, vehiculo) => acc + vehiculo.cantidad, 0);
    numerito.innerText = nuevoNumerito;
};