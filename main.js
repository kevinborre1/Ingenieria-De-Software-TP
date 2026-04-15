const oculto = document.getElementById("miOculto");
const btn = document.getElementById("btnAbrir");
const btnSiguiente = document.getElementById("btnSiguiente");
const ocultoTaller = document.getElementById("form-talleres");
const seccionRegistro = document.getElementById("seccion-registro"); 
const btnEnviar = document.getElementById("btnEnviar");
const span = document.getElementsByClassName("cerrar")[0];

// 1. Abrir el modal
btn.onclick = function () {
  oculto.style.display = "block";
  // Resetear la vista por si acaso
  if(seccionRegistro) seccionRegistro.style.display = "block";
  ocultoTaller.style.display = "none";
}

btnSiguiente.onclick = function (event) {
  event.preventDefault(); // 
  
  if(seccionRegistro) seccionRegistro.style.display = "none"; 
  ocultoTaller.style.display = "block";   
}

// 3. Finalizar y cerrar
btnEnviar.onclick = function (event) {
  event.preventDefault(); 
  alert("Taller registrado con éxito");
  oculto.style.display = "none";
}

// Cerrar con la (X)
span.onclick = function () {
  oculto.style.display = "none";
}

// Cerrar al tocar fuera
window.onclick = function (event) {
  if (event.target == oculto) {
    oculto.style.display = "none";
  }
}