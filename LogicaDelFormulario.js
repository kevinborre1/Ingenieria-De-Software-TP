
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

// Abrir el formulario al tocar "Registrarse"
btnAbrir.addEventListener('click', () => {
  miOculto.style.display = 'block';
});

// Cerrar el formulario al tocar la "X"
btnCerrar.addEventListener('click', () => {
  miOculto.style.display = 'none';
});

// Cerrar si hacen clic fuera del cuadro blanco
window.addEventListener('click', (event) => {
  if (event.target == miOculto) {
    miOculto.style.display = 'none';
  }
});


btnSiguiente.addEventListener('click', () => {
  // Seleccionamos todos los inputs, selects o textareas del primer bloque
  const inputsPaso1 = paso1.querySelectorAll("input, select, textarea");

  let esValido = true;

  for (let input of inputsPaso1) {
    // reportValidity() devuelve false si el campo no cumple (ej: está vacío y es required)
    // Además, dispara el "globito" de error automáticamente.
    if (!input.reportValidity()) {
      esValido = false;
      break; // Salimos del bucle al encontrar el primer error
    }
  }

  // Si después de revisar todos (o frenar en el primero) sigue siendo true:
  if (esValido) {
    paso1.style.display = 'none';
    paso2.style.display = 'block';
  }
});

btnSiguiente2.addEventListener('click', () => {
  // Seleccionamos todos los inputs, selects o textareas del primer bloque
  const inputsPaso2 = paso2.querySelectorAll("input, select, textarea");

  let esValido = true;

  for (let input of inputsPaso2) {
    // reportValidity() devuelve false si el campo no cumple (ej: está vacío y es required)
    // Además, dispara el "globito" de error automáticamente.
    if (!input.reportValidity()) {
      esValido = false;
      break; // Salimos del bucle al encontrar el primer error
    }
  }

  // Si después de revisar todos (o frenar en el primero) sigue siendo true:
  if (esValido) {
    paso2.style.display = 'none';
    paso3.style.display = 'block';
  }
});

btnVolver.addEventListener('click', () => {
  paso2.style.display = 'none';
  paso1.style.display = 'block';
});

btnVolver2.addEventListener('click', () => {
  paso3.style.display = 'none';
  paso2.style.display = 'block';
});

const inputLogo = document.getElementById("campo_logo");
inputLogo.addEventListener("change", function () {
    const archivo = this.files[0];
    console.log("Archivo seleccionado:", archivo);
});

formulario.addEventListener('submit', (e) => {
  e.preventDefault();
  console.log("¡Datos enviados!");
  miOculto.style.display = 'none'; // Opcional: cierra al terminar
});