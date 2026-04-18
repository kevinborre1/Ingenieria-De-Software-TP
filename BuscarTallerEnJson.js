import { datos } from "./talleres.js";
const buscador = document.getElementById("form_busqueda");
const inputBusqueda = document.getElementById("gsearch");
const lista = document.getElementById("lista-talleres");
console.log("¿La lista existe?:", lista); // Si sale 'null', el problema es el ID o el orden del script

buscador.addEventListener("submit", (e) => {
    e.preventDefault(); // Evita que la página se recargue

    const terminoBusqueda = inputBusqueda.value.toLowerCase();

    try {
        // 4. Filtrar los resultados (Usamos los datos globales que tienen ubicación)
        const resultados = datos.filter(taller =>
            taller.nombre.toLowerCase().includes(terminoBusqueda)
        );

        // 5. Mostrar resultados
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
        // Agregamos la ubicación al texto para que coincida con tu intención original
        //Esto crea un <img> si existe el logo, sino lo omite
        let logoHTML = taller.logo ? `<img src="${taller.logo}" alt="${taller.nombre}">` : '';
        li.innerHTML = `${logoHTML}<strong>${taller.nombre}</strong>`;
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
}


