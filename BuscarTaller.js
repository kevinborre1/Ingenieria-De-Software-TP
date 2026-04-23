import { talleresAceptados } from "./Talleres.js";
import { mapa } from "./Mapa.js";
import { marcadores } from "./Mapa.js";

const buscador = document.getElementById("form_busqueda");
const inputBusqueda = document.getElementById("gsearch");
const lista = document.getElementById("lista-talleres");

document.addEventListener("DOMContentLoaded", () => {
  crearTarjetaDeTaller(talleresAceptados);
  agregarEventosTalleres();
});

buscador.addEventListener("submit", (e) => {
  e.preventDefault();

  const terminoBusqueda = inputBusqueda.value.toLowerCase();

  try {
    const resultados = datos.filter((taller) =>
      taller.nombre.toLowerCase().includes(terminoBusqueda),
    );

    crearTarjetaDeTaller(resultados);
    agregarEventosTalleres();
    if (resultados.length === 0) {
      alert("No se encontraron talleres con ese nombre.");
    }
  } catch (error) {
    console.error("Error cargando los datos:", error);
  }
});

function crearTarjetaDeTaller(datos) {
  lista.innerHTML = "";

  datos.forEach((taller) => {
    const li = document.createElement("li");
    li.className = "taller-item";
    li.dataset.id = taller.id;
    li.dataset.nombre = taller.nombre;
    li.dataset.lat = parseFloat(taller.ubicacion[0]);
    li.dataset.lng = parseFloat(taller.ubicacion[1]);
    
    let logoHTML = taller.logo
      ? `<img src="${taller.logo}" alt="" style="width:30px; margin-right:10px;">`
      : "";
    li.innerHTML = `${logoHTML}<strong>${taller.nombre}</strong>${"⏰ Horarios: " + taller.horarios} <br> ${"📍 Ubicación:" + taller.ubicacion_nombre}`;
    mostrarDescripcion(taller, li);
    lista.appendChild(li);
  });
}

function agregarEventosTalleres() {
  const talleresItems = document.querySelectorAll(".taller-item");

  talleresItems.forEach((tarjetaDeTaller) => {
    
    tarjetaDeTaller.addEventListener("click", () => {
      desmarcarTallerSeleccionadoEnMapa();
      marcarUbicacionEnMapa(tarjetaDeTaller);
    });
     enlazarTallerConMarcador(tarjetaDeTaller);  
  });
  
}


function marcarUbicacionEnMapa(elemento) {
  if (typeof mapa !== "undefined" && mapa ) {
    const marcador = marcadores.get(elemento.dataset.nombre);
    const lat = elemento.dataset.lat;
    const lng = elemento.dataset.lng;
    mapa.setView([lat, lng], 17);
    marcador.openPopup();
  }
}

function enlazarTallerConMarcador(tarjetaDeTaller) {
  const marcador = marcadores.get(tarjetaDeTaller.dataset.nombre); 
  if (!marcador) return;
  marcador.on("click", function () {
    desmarcarTallerSeleccionadoEnMapa();
    tarjetaDeTaller.classList.add("taller-seleccionado");
  });
}

function desmarcarTallerSeleccionadoEnMapa() {
  const seleccionado = document.querySelector(".taller-seleccionado");
  if (seleccionado) {
    seleccionado.classList.remove("taller-seleccionado");
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
            <span><strong>🏷️ Rubro:</strong> ${taller.rubro}</span>
            <br>
            <span><strong>📧 Contacto:</strong> ${taller.contacto.email}</span>
        </div>
        <div class="info-redes">
            <strong>📱 Redes:</strong> 
            ${Object.entries(taller.contacto.redes)
              .map(([red, handle]) => `<span>${red}: ${handle}</span>`)
              .join(" | ")}
        </div>
    `;

    // 3. Lo agregamos
    itemDeLista.append(divInfo);
  });

  itemDeLista.addEventListener("mouseleave", () => {
    // 3. Ahora sí podemos encontrarlo por su clase para borrarlo
    const descripcion = itemDeLista.querySelector(".informacion-temporal");
    if (descripcion) {
      descripcion.remove(); 
    }
  });
}
