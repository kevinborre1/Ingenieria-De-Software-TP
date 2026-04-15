const oculto = document.getElementById("miOculto");
const btn = document.getElementById("btnAbrir");
const span = document.getElementsByClassName("cerrar")[0];

// Abrir el modal
btn.onclick = function () {
  oculto.style.display = "block";
}

// Cerrar el modal al tocar la (X)
span.onclick = function () {
  oculto.style.display = "none";
}

// Cerrar el modal si el usuario toca fuera de la cajita blanca
window.onclick = function (event) {
  if (event.target == oculto) {
    oculto.style.display = "none";
  }
}