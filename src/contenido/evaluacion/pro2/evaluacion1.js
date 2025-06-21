const API_URL = "http://localhost:4000/evaluacion/";
const API_RESULT = "http://localhost:4000/resultados/create";
const API_STUDENT = "http://localhost:4000/estudiantes/create";

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

// Cambiado para proyecto 1, contenido 2 y orden aleatorio
async function getPreguntasProyecto1Contenido2() {
    const res = await fetch(API_URL);
    const data = await res.json();
    if (!Array.isArray(data.data)) return [];
    // Filtra y mezcla aleatoriamente
    return mezclarArray(
        data.data.filter(p => p.id_proyecto === 3 && p.id_contenido === 1)
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
    const btn = document.getElementById('btn-enviar-evaluacion');
    btn.style.display = "block";
    btn.onclick = function() {
        alert("Tu nota final es: " + puntaje);
        enviarResultadoEstudiante();
    };
}

function ocultarBotonEnviar() {
    document.getElementById('btn-enviar-evaluacion').style.display = "none";
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
    // Acepta string, número o undefined
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

// function mostrarFormularioEstudiante() {
//     // Muestra el formulario modal para registrar estudiante y nota
//     const modal = document.getElementById('modal-estudiante');
//     modal.style.display = "flex";
//     document.getElementById('nota-final').textContent = puntaje;
// }

// function cerrarFormularioEstudiante() {
//     document.getElementById('modal-estudiante').style.display = "none";
// }

// async function enviarResultadoEstudiante(e) {
//     e && e.preventDefault();
//     if (!estudianteRegistrado || !estudianteRegistrado.id) {
//         alert("Debes registrar tus datos primero.");
//         return;
//     }
//     const token= localStorage.getItem('adminToken');
//     let exitos = 0;
//     for (let i = 0; i < respuestas.length; i++) {
//         const resp = respuestas[i];
//         const pregunta = preguntas.find(p => p.id === resp.id);
//         if (!pregunta) continue;
//         const body = {
//             id_estudiante: estudianteRegistrado.id,                // ID del estudiante registrado
//             id_evaluacion: pregunta.id,                            // ID de la pregunta/evaluación
//             respuesta_seleccionada: String(resp.respuesta),        // Respuesta seleccionada (como string)
//             es_correcta: pregunta.respuesta_correcta == resp.respuesta // Booleano: si es correcta
//         };

//         console.log("Enviando resultado:", body);
//         const res = await fetch(API_RESULT, {
//             method: "POST",
//             headers: { "Content-Type": "application/json","Authorization": `Bearer ${token}` },
//             body: JSON.stringify(body)

//         });

//         console.log("Respuesta del servidor:", res);
//         // Verifica si la respuesta fue exitosa 
//         if (res.status==200 || res.ok) {
//             exitos++;
//             alert(`Respuesta guardada correctamente`);
//         } else {
//             const errorText = await res.text();
//             console.error("Error al guardar respuesta:", errorText, body);
//         }
//     }
//     if (exitos === respuestas.length) {
//         document.getElementById('resultado-puntaje').textContent = puntaje;
//         document.getElementById('modal-resultado').style.display = "flex";
//     } else {
//         alert("Ocurrió un error al guardar alguna respuesta. Revisa la consola para más detalles.");
//     }
// }

function cerrarModalResultado() {
    document.getElementById('modal-resultado').style.display = "none";
    window.location.reload();
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
// document.addEventListener('DOMContentLoaded', async () => {
//     // Mostrar formulario estudiante al entrar
//     document.getElementById('modal-estudiante').style.display = "flex";
//     document.getElementById('form-estudiante').onsubmit = registrarEstudiante;

//     // Deshabilita preguntas hasta registrar estudiante
//     document.querySelectorAll('.opcion-btn').forEach(btn => btn.disabled = true);

//     preguntas = await getPreguntasProyecto1Contenido2();
//     if (preguntas.length > 0) {
//         indice = 0;
//         puntaje = 0;
//         respuestas = [];
//         actualizarPregunta();
//     } else {
//         limpiarPregunta();
//     }


    document.getElementById('opcion-a').onclick = () => responder("1");
    document.getElementById('opcion-b').onclick = () => responder("2");
    document.getElementById('opcion-c').onclick = () => responder("3");
    ocultarBotonEnviar();
    if (esAdmin()) mostrarBotonEditar(); else ocultarBotonEditar();
    document.getElementById('btn-editar-evaluacion').onclick = abrirEditorPreguntas;
    document.getElementById('cerrar-editor').onclick = cerrarEditorPreguntas;
    document.getElementById('editor-anterior').onclick = editorAnterior;
    document.getElementById('editor-siguiente').onclick = editorSiguiente;
    document.getElementById('form-editar').onsubmit = guardarPreguntaEditada;

    document.getElementById('est-numero-lista').addEventListener('input', function() {
        if (this.value.length > 2) this.value = this.value.slice(0,2);
    });


// async function registrarEstudiante(e) {
//     e.preventDefault();
//     const token = localStorage.getItem('adminToken'); // Asegúrate de usar 'adminToken'
//     const nombre = document.getElementById('est-nombre').value;
//     const apellido = document.getElementById('est-apellido').value;
//     const grado = document.getElementById('est-grado').value;
//     const seccion = document.getElementById('est-seccion').value;
//     const numero_de_lista = document.getElementById('est-numero-lista').value;
//     try {
//         const resEst = await fetch(API_STUDENT, {
//             method: "POST",
//             headers: { 
//                 "Content-Type": "application/json", 
//                 "Authorization": `Bearer ${token}` // Aquí va el token correctamente
//             },
//             body: JSON.stringify({
//                 nombre_completo: `${nombre} ${apellido}`,
//                 grado,
//                 seccion,
//                 numero_de_lista
//             })
//         });
//         const estudianteResp = await resEst.json();
//         console.log("Respuesta registro estudiante:", estudianteResp);

//         estudianteRegistrado = estudianteResp.data || estudianteResp;
//         if (estudianteRegistrado && estudianteRegistrado.id) {
//             document.getElementById('modal-estudiante').style.display = "none";
//             document.querySelectorAll('.opcion-btn').forEach(btn => btn.disabled = false);
//         } else {
//             alert("No se pudo registrar el estudiante.");
//         }
//     } catch (error) {
//         alert("Error de conexión al registrar estudiante.");
//     }
// }// --------- INICIALIZACIÓN ---------
document.addEventListener('DOMContentLoaded', async () => {
    preguntas = await getPreguntasProyecto1Contenido2();
    if (preguntas.length > 0) {
        indice = 0;
        puntaje = 0;
        respuestas = [];
        actualizarPregunta();
    } else {
        limpiarPregunta();
    }
    document.getElementById('opcion-a').onclick = () => responder("1");
    document.getElementById('opcion-b').onclick = () => responder("2");
    document.getElementById('opcion-c').onclick = () => responder("3");
    ocultarBotonEnviar();

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
        btnVolver.style.background = '#f4a261'; // Naranja suave
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