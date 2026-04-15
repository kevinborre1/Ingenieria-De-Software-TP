// 1. Referencias a los elementos del DOM
const formulario = document.querySelector("form");
const inputBusqueda = document.getElementById("gsearch");
const lista = document.getElementById("lista-talleres");

const datos = [
    { "nombre": "Taller de Carpintería", "id": 1, "ubicacion": ["-34.514972", "-58.709139"] },
    { "nombre": "Taller de Programación", "id": 2, "ubicacion": ["-34.534114", "-58.701454"] }
];

formulario.addEventListener("submit", (e) => {
    e.preventDefault(); // Evita que la página se recargue

    const terminoBusqueda = inputBusqueda.value.toLowerCase();

    try {

        const datos = [
            { "nombre": "Taller de Carpintería", "id": 1 },
            { "nombre": "Taller de Programación", "id": 2 }
        ];;

        // 4. Filtrar los resultados
        const resultados = datos.filter(taller =>
            taller.nombre.toLowerCase().includes(terminoBusqueda)
        );
        // 5. Mostrar resultados (puedes verlos en la consola por ahora)
       mostrarTalleres(resultados);
        const resultados = datos.filter(taller =>
            taller.nombre.toLowerCase().includes(terminoBusqueda)
        );

        mostrarTalleres(resultados);
        agregarEventosTalleres();

        console.log("Talleres encontrados:", resultados);
        if (resultados.length === 0) {
            alert("No se encontraron talleres con ese nombre.");
        }

    } catch (error) {
        console.error("Error cargando los datos:", error);
    }
});

// Función para renderizar la lista
function mostrarTalleres(datos) {
    lista.innerHTML = "";

    datos.forEach(taller => {
        const li = document.createElement("li");
        li.className = "taller-item";
        li.dataset.id = taller.id;
        li.innerHTML = "<strong>" + taller.nombre + "</strong>";
        lista.appendChild(li);
    });
}

// Función para agregar eventos de clic a los talleres
function agregarEventosTalleres() {
    const talleresItems = document.querySelectorAll(".taller-item");


    talleresItems.forEach(item => {
        item.addEventListener("click", () => {
            const tallerId = parseInt(item.dataset.id, 10);
            const taller = datos.find(t => t.id === tallerId);

            if (taller) {
                seleccionarTaller(taller, item);
            }
        });
    });
}

function seleccionarTaller(taller, elemento) {
    document.querySelectorAll(".taller-item").forEach(item => {
        item.classList.remove("seleccionado");
    });
    
    elemento.classList.add("seleccionado");
    
    if (typeof mapa !== "undefined" && mapa && taller.ubicacion) {
        const lat = parseFloat(taller.ubicacion[0]);
        const lng = parseFloat(taller.ubicacion[1]);

        mapa.setView([lat, lng], 17);

        L.marker([lat, lng]).addTo(mapa)
            .bindPopup("<b>" + taller.nombre + "</b><br>")
            .openPopup();
            
        console.log("Taller seleccionado: " + taller.nombre + " en coordenadas [" + lat + ", " + lng + "]");
    } else {
        console.error("Mapa no disponible o taller sin coordenadas");
    }
});

        // Función para renderizar la lista
        function mostrarTalleres(datos) {
            // Limpiamos la lista por si tenía contenido previo
            lista.innerHTML = "";

            datos.forEach(taller => {
                // 1. Crear el elemento de lista (li)
                const li = document.createElement('li');

                // 2. Asignar el contenido (puedes usar HTML dentro)
                li.innerHTML = `<strong>${taller.nombre}</strong> - ${taller.ubicacion}`;

                // 3. Agregar el li a la lista ol
                lista.appendChild(li);
            });
        }

    }
    

