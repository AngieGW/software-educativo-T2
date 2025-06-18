const API_URL = "http://localhost:4000/evaluacion/";

async function getPreguntasProyecto1Contenido1() {
    const res = await fetch(API_URL);
    const data = await res.json();
    if (!Array.isArray(data.data)) return [];
    // Filtra preguntas de proyecto 1 y contenido 1
    return data.data.filter(
        p => p.id_proyecto === 3 && p.id_contenido === 2
    );
}

// Función para mezclar un arreglo (Fisher-Yates)
function mezclarArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function mostrarPregunta(pregunta) {
    document.getElementById('pregunta-texto').textContent = pregunta.pregunta || '';
    document.getElementById('texto-a').textContent = pregunta.opcion_a || '';
    document.getElementById('texto-b').textContent = pregunta.opcion_b || '';
    document.getElementById('texto-c').textContent = pregunta.opcion_c || '';
}

function limpiarPregunta() {
    document.getElementById('pregunta-texto').textContent = '';
    document.getElementById('texto-a').textContent = '';
    document.getElementById('texto-b').textContent = '';
    document.getElementById('texto-c').textContent = '';
    document.getElementById('contenido-titulo').textContent = 'SIN PREGUNTAS';
}

document.addEventListener('DOMContentLoaded', async () => {
    let preguntas = await getPreguntasProyecto1Contenido1();
    if (preguntas.length > 0) {
        preguntas = mezclarArray(preguntas);
        // Muestra la primera pregunta aleatoria
        mostrarPregunta(preguntas[0]);
    } else {
        limpiarPregunta();
    }
});