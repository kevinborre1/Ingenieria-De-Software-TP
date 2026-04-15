const oculto = document.getElementById("miOculto");
const btn = document.getElementById("btnAbrir");
const btnSiguiente = document.getElementById("btnSiguiente");
const ocultoTaller = document.getElementById("form-talleres");
const seccionRegistro = document.getElementById("seccion-registro"); // Asegúrate de tener este ID en tu HTML
const btnEnviar = document.getElementById("btnEnviar");
const span = document.getElementsByClassName("cerrar")[0];

// 1. Abrir el modal
btn.onclick = function () {
  oculto.style.display = "block";
  // Resetear la vista por si acaso
  if(seccionRegistro) seccionRegistro.style.display = "block";
  ocultoTaller.style.display = "none";
}

// 2. IR AL FORMULARIO DE TALLERES (La clave está en el 'event')
btnSiguiente.onclick = function (event) {
  event.preventDefault(); // <--- ESTO EVITA QUE LA PÁGINA SE RECARGUE
  
  if(seccionRegistro) seccionRegistro.style.display = "none"; 
  ocultoTaller.style.display = "block";   
}

// 3. Finalizar y cerrar
btnEnviar.onclick = function (event) {
  event.preventDefault(); // También aquí para que el alert no se cierre solo
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