// 1. Referencias a los elementos del DOM
const formulario = document.querySelector('form');
const inputBusqueda = document.getElementById('gsearch');
const lista = document.getElementById('lista-talleres');


// 2. Función para buscar
formulario.addEventListener('submit', async (e) => {
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

        if (resultados.length === 0) {
            alert("No se encontraron talleres con ese nombre.");
        }

    } catch (error) {
        console.error("Error cargando el JSON:", error);
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