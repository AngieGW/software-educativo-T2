// Manejo de 10 cuadros de texto y formato negrita
const totalCuadros = 10;
let cuadros = [];
let actual = 0;

// Inicializar cuadros
for (let i = 0; i < totalCuadros; i++) {
    cuadros.push('');
}

const editorArea = document.getElementById('editor0');
const contador = document.getElementById('contador-cuadro');
const formMsg = document.getElementById('form-msg');

// Guardar contenido al cambiar de cuadro
function guardarActual() {
    cuadros[actual] = editorArea.innerHTML;
}

// Cambiar de cuadro
function cambiarCuadro(dir) {
    guardarActual();
    actual += dir;
    if (actual < 0) actual = 0;
    if (actual >= totalCuadros) actual = totalCuadros - 1;
    mostrarCuadro();
}

// Mostrar cuadro actual
function mostrarCuadro() {
    editorArea.innerHTML = cuadros[actual] || '';
    contador.textContent = (actual + 1) + ' / ' + totalCuadros;
}

function mostrarTooltip(btn, texto) {
    const tooltip = document.getElementById('tooltip-editor');
    tooltip.textContent = texto;
    tooltip.style.display = 'inline-block';
}
function ocultarTooltip() {
    const tooltip = document.getElementById('tooltip-editor');
    tooltip.style.display = 'none';
}

function aplicarNegrita() {
    document.execCommand('bold', false, null);
    editorArea.focus();
}
function aplicarCursiva() {
    document.execCommand('italic', false, null);
    editorArea.focus();
}

// Mostrar selector de color para resaltado
function mostrarColorResaltado() {
    document.getElementById('colorResaltado').style.display = 'inline-block';
    document.getElementById('colorResaltado').focus();
}
function aplicarResaltadoColor(color) {
    document.execCommand('hiliteColor', false, color);
    document.getElementById('colorResaltado').style.display = 'none';
    editorArea.focus();
}

// Mostrar selector de color para texto
function mostrarColorTexto() {
    document.getElementById('colorTexto').style.display = 'inline-block';
    document.getElementById('colorTexto').focus();
}
function aplicarColorTexto(color) {
    document.execCommand('foreColor', false, color);
    document.getElementById('colorTexto').style.display = 'none';
    editorArea.focus();
}

function agregarEmoji() {
    const emoji = prompt('Escribe o pega el emoji que deseas agregar:', '😊');
    if (emoji) {
        document.execCommand('insertText', false, emoji);
        editorArea.focus();
    }
}

// Guardar contenido al escribir
editorArea.addEventListener('input', () => {
    cuadros[actual] = editorArea.innerHTML;
});

// Navegación con flechas
document.getElementById('prev-cuadro').addEventListener('click', () => cambiarCuadro(-1));
document.getElementById('next-cuadro').addEventListener('click', () => cambiarCuadro(1));

// Inicializar
mostrarCuadro();

// Envío del formulario
document.getElementById('contenidoForm').addEventListener('submit', function(e) {
    e.preventDefault();
    guardarActual();
    // Al menos un cuadro debe estar lleno
    const algunoLleno = cuadros.some(c => c.replace(/<[^>]*>/g, '').trim() !== '');
    if (!algunoLleno) {
        formMsg.innerHTML = '<div class="error-msg">Debe llenar al menos un cuadro de contenido.</div>';
        return;
    }
    // Aquí puedes enviar los datos (titulo y cuadros) al backend o procesar como necesites
    formMsg.innerHTML = '<div class="success-msg">¡Contenido enviado correctamente!</div>';
});