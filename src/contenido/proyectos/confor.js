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

// Cambiar de cuadro (de uno en uno, nunca salta ni repite)
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

// Tooltip para botones
function mostrarTooltip(btn, texto) {
    const tooltip = document.getElementById('tooltip-editor');
    tooltip.textContent = texto;
    tooltip.style.display = 'inline-block';
}
function ocultarTooltip() {
    const tooltip = document.getElementById('tooltip-editor');
    tooltip.style.display = 'none';
}

// Formato negrita
function aplicarNegrita() {
    document.execCommand('bold', false, null);
    editorArea.focus();
}
// Formato cursiva
function aplicarCursiva() {
    document.execCommand('italic', false, null);
    editorArea.focus();
}
// Resaltado celeste
function aplicarResaltadoCeleste() {
    document.execCommand('hiliteColor', false, '#87cefa');
    editorArea.focus();
}
// Emoji
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

// Exponer funciones para los botones del toolbar
window.aplicarNegrita = aplicarNegrita;
window.aplicarCursiva = aplicarCursiva;
window.aplicarResaltadoCeleste = aplicarResaltadoCeleste;
window.agregarEmoji = agregarEmoji;
window.mostrarTooltip = mostrarTooltip;
window.ocultarTooltip = ocultarTooltip;
window.cambiarCuadro = cambiarCuadro;