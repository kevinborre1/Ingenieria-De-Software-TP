export let mapa;
export let marcadores = new Map();
import { talleresAceptados } from "./Talleres.js";

document.addEventListener("DOMContentLoaded", function () {
    mapa = L.map('mapa').setView([-34.536687, -58.712918], 15);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(mapa);
    agregarMarcas(talleresAceptados);

    window.addEventListener('resize', function() {
    if (mapa) {
        mapa.invalidateSize(); 
    }
});
     function agregarMarcas(datos){
    datos.forEach(taller => {
        const lat = parseFloat(taller.ubicacion[0]);
        const lng = parseFloat(taller.ubicacion[1]);
        const marcador = L.marker([lat, lng]).addTo(mapa);
        marcador.bindPopup("<b>" + taller.nombre + "</b>");
        marcadores.set(taller.nombre, marcador);
    });
}

});