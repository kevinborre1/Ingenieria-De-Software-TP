import { datos } from "./talleres.js";
import { mapa } from "./mapa.js";
import { marcadores } from './mapa.js';

const buscador = document.getElementById("form_busqueda");
const inputBusqueda = document.getElementById("gsearch");
const lista = document.getElementById("lista-talleres");

document.addEventListener("DOMContentLoaded", () => {
  function mostrarTodosLosTalleres() {       
        const todos = datos;
        mostrarTalleres(todos);
  }
  mostrarTodosLosTalleres();
  agregarEventosTalleres();
});

buscador.addEventListener("submit", (e) => {
    e.preventDefault();

    const terminoBusqueda = inputBusqueda.value.toLowerCase();

    try {
        const resultados = datos.filter(taller =>
            taller.nombre.toLowerCase().includes(terminoBusqueda)
        );

        mostrarTalleres(resultados);
    
        if (resultados.length === 0) {
            alert("No se encontraron talleres con ese nombre.");
        }

    } catch (error) {
        console.error("Error cargando los datos:", error);
    }
});

function mostrarTalleres(datos) {
    lista.innerHTML = "";

    datos.forEach(taller => {
        const li = document.createElement("li");
        li.className = "taller-item";
        li.dataset.id = taller.id;
        li.dataset.descripcion = taller.descripcion; // Agregamos la descripción como un atributo de datos

        let logoHTML = taller.logo ? `<img src="${taller.logo}" alt="" style="width:30px; margin-right:10px;">` : '';
        li.innerHTML = `${logoHTML}<strong>${taller.nombre}</strong>`;
        mostrarDescripcion(taller, li);
        lista.appendChild(li);
    });
}

function agregarEventosTalleres() {
    const talleresItems = document.querySelectorAll(".taller-item");

    talleresItems.forEach(item => {
        item.addEventListener("click", () => {
            const tallerId = parseInt(item.dataset.id, 10);
            const taller = datos.find(t => t.id === tallerId);
            item.classList.remove("taller-seleccionado");
            if (taller) {
                seleccionarTaller(taller, item);
            }
        });
    });
}

function seleccionarTaller(taller, elemento) {

    if (typeof mapa !== "undefined" && mapa && taller.ubicacion) {
        const marcador = marcadores.get(taller.nombre);
        const lat = parseFloat(taller.ubicacion[0]);
        const lng = parseFloat(taller.ubicacion[1]);
        mapa.setView([lat, lng], 17);
        marcador.openPopup();
        marcador.on('click', function (e) {

        const seleccionado = document.querySelector('.taller-seleccionado');
        if (seleccionado) {
            seleccionado.classList.remove('taller-seleccionado');
        }
        elemento.classList.add('taller-seleccionado');
        });
    }
}

function mostrarDescripcion(taller, itemDeLista) {
    itemDeLista.addEventListener("mouseenter", () => {
        // 1. Creamos el contenedor principal
        const divInfo = document.createElement("div");
        divInfo.classList.add("informacion-temporal");

        // 2. Construimos el contenido con HTML para que sea legible
        divInfo.innerHTML = `
    <br>
    <p class="info-desc"><strong>Descripción:</strong> ${taller.descripcion || "Sin descripción."}</p>
        <div class="info-grid">
            <span><strong>📍 Ubicación:</strong> ${taller.ubicacion_nombre || "Sin ubicación detallada."}</span>
            <span><strong>⏰ Horarios:</strong> ${taller.horarios}</span>
            <span><strong>🏷️ Rubro:</strong> ${taller.rubro}</span>
            <span><strong>📧 Contacto:</strong> ${taller.contacto.email}</span>
        </div>
        <div class="info-redes">
            <strong>📱 Redes:</strong> 
            ${Object.entries(taller.contacto.redes).map(([red, handle]) => `<span>${red}: ${handle}</span>`).join(" | ")}
        </div>
    `;

        // 3. Lo agregamos
        itemDeLista.append(divInfo);
    });

    itemDeLista.addEventListener("mouseleave", () => {
        // 3. Ahora sí podemos encontrarlo por su clase para borrarlo
        const descripcion = itemDeLista.querySelector(".informacion-temporal");
        if (descripcion) {
            descripcion.remove(); // Más directo que removeChild
        }
    });
}
