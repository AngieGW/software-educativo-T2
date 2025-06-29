const API_URL = "http://localhost:4000/evaluacion/";
const API_RESULT = "http://localhost:4000/resultados/create";
const API_STUDENT = "http://localhost:4000/estudiantes/create";
const API_CONTENIDO = "http://localhost:4000/contenido/";

let preguntas = [];
let indice = 0;
let puntaje = 0;
let respuestas = [];
let estudianteRegistrado = null; // Guardará el estudiante registrado

// Función para mezclar un array (Fisher-Yates)
function mezclarArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// Busca el id_contenido de proyecto 2 (id_proyecto: 3) y orden_contenido: 1
async function getIdContenidoProyecto2Orden1() {
    const res = await fetch(API_CONTENIDO);
    const data = await res.json();
    const lista = Array.isArray(data.data) ? data.data : (data.data?.data || []);
    const contenido = lista.find(
        c => c.id_proyecto === 1 && c.orden_contenido === 1
    );
    return contenido ? contenido.id : null;
}

// Obtiene las preguntas del proyecto 2, contenido orden 1
async function getPreguntasProyecto2ContenidoOrden1() {
    const idContenido = await getIdContenidoProyecto2Orden1();
    if (!idContenido) return [];
    const res = await fetch(API_URL);
    const data = await res.json();
    if (!Array.isArray(data.data)) return [];
    // Filtra por id_proyecto 3 y el id_contenido encontrado
    return mezclarArray(
        data.data.filter(p => p.id_proyecto === 1 && p.id_contenido === idContenido)
    );
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

function mostrarBotonEnviar() {
    // Muestra el botón debajo de las opciones
    const wrapper = document.getElementById('enviar-evaluacion-wrapper');
    if (wrapper) wrapper.style.display = "block";
    const btn = document.getElementById('btn-enviar-evaluacion');
    if (btn) {
        btn.style.display = "inline-block";
        btn.onclick = function() {
            alert("Tu nota final es: " + puntaje);
            // Aquí puedes agregar lógica adicional si lo necesitas
        };
    }
    // Oculta el botón de la barra superior si existe
    const btnTop = document.querySelector('header #btn-enviar-evaluacion');
    if (btnTop) btnTop.style.display = "none";
}

function ocultarBotonEnviar() {
    const wrapper = document.getElementById('enviar-evaluacion-wrapper');
    if (wrapper) wrapper.style.display = "none";
    const btn = document.getElementById('btn-enviar-evaluacion');
    if (btn) btn.style.display = "none";
    // Oculta el botón de la barra superior si existe
    const btnTop = document.querySelector('header #btn-enviar-evaluacion');
    if (btnTop) btnTop.style.display = "none";
}

function actualizarPregunta() {
    if (indice < preguntas.length) {
        mostrarPregunta(preguntas[indice]);
        ocultarBotonEnviar();
    } else {
        limpiarPregunta();
        mostrarBotonEnviar();
    }
}

function responder(opcion) {
    if (indice >= preguntas.length) return;
    const pregunta = preguntas[indice];
    respuestas.push({ id: pregunta.id, respuesta: opcion });

    // Suma los puntos reales de la pregunta si es correcta
    let puntosPregunta = 1;
    if (pregunta.puntos !== undefined && pregunta.puntos !== null && pregunta.puntos !== "") {
        puntosPregunta = Number(pregunta.puntos);
        if (isNaN(puntosPregunta) || puntosPregunta <= 0) puntosPregunta = 1;
    }
    if (pregunta.respuesta_correcta == opcion) {
        puntaje += puntosPregunta;
    }
    indice++;
    actualizarPregunta();
}

// --------- ADMIN: Edición de preguntas ---------
function esAdmin() {
    return !!localStorage.getItem('adminToken');
}

function mostrarBotonEditar() {
    if (esAdmin()) {
        document.getElementById('btn-editar-evaluacion').style.display = "inline-block";
    }
}

function ocultarBotonEditar() {
    document.getElementById('btn-editar-evaluacion').style.display = "none";
}

function abrirEditorPreguntas() {
    if (!esAdmin()) return;
    const modal = document.getElementById('modal-editar');
    modal.style.display = "flex";
    cargarPreguntaEditor(0);
}

function cerrarEditorPreguntas() {
    document.getElementById('modal-editar').style.display = "none";
}

let indiceEditor = 0;
function cargarPreguntaEditor(i) {
    indiceEditor = i;
    const p = preguntas[i];
    document.getElementById('edit-pregunta').value = p.pregunta;
    document.getElementById('edit-op1').value = p.opcion_a;
    document.getElementById('edit-op2').value = p.opcion_b;
    document.getElementById('edit-op3').value = p.opcion_c;
    document.getElementById('edit-correcta').value = p.respuesta_correcta;
    document.getElementById('editor-indicador').textContent = `Pregunta ${i+1} de ${preguntas.length}`;
}

async function guardarPreguntaEditada(e) {
    e.preventDefault();
    const p = preguntas[indiceEditor];
    const data = {
        pregunta: document.getElementById('edit-pregunta').value,
        opcion_a: document.getElementById('edit-op1').value,
        opcion_b: document.getElementById('edit-op2').value,
        opcion_c: document.getElementById('edit-op3').value,
        respuesta_correcta: document.getElementById('edit-correcta').value
    };
    await fetch(API_URL + p.id, {
        method: "PUT",
        headers: { "Content-Type": "application/json", Authorization: localStorage.getItem('adminToken') ? "Bearer " + localStorage.getItem('adminToken') : undefined },
        body: JSON.stringify(data)
    });
    // Actualiza local
    Object.assign(p, data);
    cargarPreguntaEditor(indiceEditor);
    alert("Pregunta actualizada");
}

function editorAnterior() {
    if (indiceEditor > 0) cargarPreguntaEditor(indiceEditor - 1);
}
function editorSiguiente() {
    if (indiceEditor < preguntas.length - 1) cargarPreguntaEditor(indiceEditor + 1);
}

// --------- INICIALIZACIÓN ---------
document.addEventListener('DOMContentLoaded', async () => {
    preguntas = await getPreguntasProyecto2ContenidoOrden1();
    const evalContainer = document.querySelector('.evaluacion-container');
    const wrapper = document.getElementById('enviar-evaluacion-wrapper');
    if (preguntas.length > 0) {
        indice = 0;
        puntaje = 0;
        respuestas = [];
        if (evalContainer) evalContainer.style.display = 'block';
        if (wrapper) wrapper.style.display = 'none';
        actualizarPregunta();
    } else {
        // Si no hay preguntas, oculta todo
        if (evalContainer) evalContainer.style.display = 'none';
        if (wrapper) wrapper.style.display = 'none';
        // Opcional: también puedes limpiar el título
        // document.getElementById('contenido-titulo').textContent = '';
    }
    document.getElementById('opcion-a').onclick = () => responder("1");
    document.getElementById('opcion-b').onclick = () => responder("2");
    document.getElementById('opcion-c').onclick = () => responder("3");

    // Mostrar/ocultar edición solo para admin
    if (esAdmin()) {
        mostrarBotonEditar();
        document.getElementById('btn-editar-evaluacion').onclick = abrirEditorPreguntas;
        document.getElementById('cerrar-editor').onclick = cerrarEditorPreguntas;
        document.getElementById('editor-anterior').onclick = editorAnterior;
        document.getElementById('editor-siguiente').onclick = editorSiguiente;
        document.getElementById('form-editar').onsubmit = guardarPreguntaEditada;
    } else {
        ocultarBotonEditar();
        document.getElementById('btn-editar-evaluacion').onclick = null;
        document.getElementById('cerrar-editor').onclick = null;
        document.getElementById('editor-anterior').onclick = null;
        document.getElementById('editor-siguiente').onclick = null;
        document.getElementById('form-editar').onsubmit = (e) => { e.preventDefault(); };
    }

    // --- Botón para volver a Gestión de Evaluaciones SOLO para admin ---
    if (esAdmin() && !document.getElementById('btn-volver-gestion-eva')) {
        const btnVolver = document.createElement('button');
        btnVolver.id = 'btn-volver-gestion-eva';
        btnVolver.textContent = '← Gestión de Evaluaciones';
        btnVolver.className = 'logout-btn';
        btnVolver.style.margin = '0.5rem 0 0 0';
        btnVolver.style.fontSize = '0.93rem';
        btnVolver.style.padding = '0.22rem 0.9rem';
        btnVolver.style.borderRadius = '20px';
        btnVolver.style.background = '#f4a261';
        btnVolver.style.border = 'none';
        btnVolver.style.color = '#1a5a32';
        btnVolver.style.fontWeight = '600';
        btnVolver.style.cursor = 'pointer';
        btnVolver.style.boxShadow = '0 1px 4px #f4a26155';
        btnVolver.style.transition = 'background 0.2s, color 0.2s';
        btnVolver.onmouseover = () => {
            btnVolver.style.background = '#fff';
            btnVolver.style.color = '#f4a261';
        };
        btnVolver.onmouseout = () => {
            btnVolver.style.background = '#f4a261';
            btnVolver.style.color = '#1a5a32';
        };
        btnVolver.onclick = () => window.location.href = '/src/admin/evaluaciones.html';

        // Insertar el botón en el header, antes del título si existe
        const header = document.querySelector('.header');
        if (header) {
            header.insertBefore(btnVolver, header.firstChild);
        } else {
            document.body.insertBefore(btnVolver, document.body.firstChild);
        }
    }
});