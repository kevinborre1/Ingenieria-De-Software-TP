const btnAbrir = document.getElementById('btnAbrir');
const miOculto = document.getElementById('miOculto');
const btnCerrar = document.querySelector('.cerrar');

const paso1 = document.getElementById('paso-proveedor');
const paso2 = document.getElementById('paso-taller');
const paso3 = document.getElementById('paso-redes');
const btnSiguiente = document.getElementById('btnSiguiente');
const btnSiguiente2 = document.getElementById('btnSiguiente2');
const btnVolver = document.getElementById('btnVolver');
const btnVolver2 = document.getElementById('btnVolver2');
const formulario = document.getElementById('form-registro-completo');

btnAbrir.addEventListener('click', () => {
  miOculto.style.display = 'block';
});

btnCerrar.addEventListener('click', () => {
  miOculto.style.display = 'none';
});

window.addEventListener('click', (event) => {
  if (event.target == miOculto) {
    miOculto.style.display = 'none';
  }
});

btnSiguiente.addEventListener('click', () => {
  const inputsPaso1 = paso1.querySelectorAll("input, select, textarea");
  let esValido = true;

  for (let input of inputsPaso1) {
    if (!input.reportValidity()) {
      esValido = false;
      break; 
    }
  }

  if (esValido) {
    paso1.style.display = 'none';
    paso2.style.display = 'block';
    document.getElementById("img_formulario").src = "dist/images/form2.png";
  }

});

btnSiguiente2.addEventListener('click', () => {
  const inputsPaso2 = paso2.querySelectorAll("input, select, textarea");
  let esValido = true;

  for (let input of inputsPaso2) {
    if (!input.reportValidity()) {
      esValido = false;
      break; 
    }
  }

  if (esValido) {
    paso2.style.display = 'none';
    paso3.style.display = 'block';
    document.getElementById("img_formulario").src = "dist/images/form3.png";
  }
});

btnVolver.addEventListener('click', () => {
  paso2.style.display = 'none';
  paso1.style.display = 'block';
  document.getElementById("img_formulario").src = "dist/images/form1.png";
});

btnVolver2.addEventListener('click', () => {
  paso3.style.display = 'none';
  paso2.style.display = 'block';
  document.getElementById("img_formulario").src = "dist/images/form2.png";
});

const inputLogo = document.getElementById("campo_logo");
inputLogo.addEventListener("change", function () {
  const archivo = this.files[0];
  console.log("Archivo seleccionado:", archivo);
});

formulario.addEventListener('submit', (e) => {
  e.preventDefault();
  console.log("¡Datos enviados!");
  miOculto.style.display = 'none'; 
});

document.getElementById("campo_ubicacion_tipo").addEventListener("change", function () {
  const divOtra = document.getElementById("div_direccion_otra");
  const inputOtra = document.getElementById("campo_direccion_otra");

  if (this.value === "otra") {
    divOtra.style.display = "block";
    inputOtra.setAttribute("required", "true");
  } else {
    divOtra.style.display = "none";
    inputOtra.removeAttribute("required");
  }
});