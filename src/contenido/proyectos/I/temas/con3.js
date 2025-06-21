const API_URL = "http://localhost:4000/contenido/";
const token = localStorage.getItem('adminToken');
let contenidoActual = null;
let teoriasKeys = [];
let teoriaIndex = 0;

// Obtiene todos los contenidos del backend
async function getContenidos() {
  const res = await fetch(API_URL);
  const data = await res.json();
  return Array.isArray(data.data) ? data.data : [];
}

// Muestra el contenido 1 del proyecto 1
async function mostrarContenido1Proyecto1() {
  const contenidos = await getContenidos();
  // Busca el contenido con id_proyecto = 1 y orden_contenido = 1
  contenidoActual = contenidos.find(
    c => c.id_proyecto === 1 && c.orden_contenido === 3
  );

  const titulo = document.getElementById('titulo-editable');
  const texto = document.getElementById('texto-editable');

  if (contenidoActual) {
    titulo.textContent = contenidoActual.titulo_contenido || 'Sin título';
    teoriasKeys = [];
    for (let i = 1; i <= 10; i++) {
      const key = i === 1 ? 'teoria' : `teoria${i}`;
      if (contenidoActual[key]) teoriasKeys.push(key);
    }
    if (teoriasKeys.length === 0) teoriasKeys = ['teoria'];
    teoriaIndex = 0;
    mostrarTeoriaActual();
  } else {
    titulo.textContent = "Sin contenido";
    texto.innerHTML = "";
    teoriasKeys = [];
    teoriaIndex = 0;
  }
}

// Muestra solo la teoría seleccionada
function mostrarTeoriaActual() {
  const texto = document.getElementById('texto-editable');
  texto.innerHTML = "";
  if (!contenidoActual || teoriasKeys.length === 0) return;
  const key = teoriasKeys[teoriaIndex];
  // Convertir saltos de línea en <br>
  const contenidoFormateado = (contenidoActual[key] || '').replace(/\n/g, '<br>');
  texto.innerHTML = `
    <p>${contenidoFormateado}</p>
    <div style="margin-top:1rem; text-align:right; color:#2a8d4f;">
      <b>${key.toUpperCase()}</b> (${teoriaIndex + 1} de ${teoriasKeys.length})
    </div>
  `;
}

// Función para ir a la evaluación cuando se termina el contenido
function irAEvaluacionSiFinalizaContenido() {
  // Solo si estamos en la última teoría
  if (teoriaIndex === teoriasKeys.length - 1) {
    setTimeout(() => {
      window.location.href = "/src/contenido/evaluacion/pro1/eva_pro1_con3.html";
    }, 1000);
  }
}

// Navega entre teorías
function cambiarTeoria(direccion) {
  if (!teoriasKeys.length) return;
  teoriaIndex += direccion;
  if (teoriaIndex < 0) teoriaIndex = teoriasKeys.length - 1;
  if (teoriaIndex >= teoriasKeys.length) teoriaIndex = 0;
  mostrarTeoriaActual();
  // Si es la última teoría y el usuario avanza, redirige a la evaluación
  if (teoriaIndex === teoriasKeys.length - 1 && direccion > 0) {
    irAEvaluacionSiFinalizaContenido();
  }
}

// ...después de mostrarBotonEditarSiAdmin()...
function mostrarBotonEditarSiAdmin() {
  if (token) {
    document.getElementById('editar-btn').style.display = "inline-block";
    document.getElementById('btn-gestionar').style.display = "inline-block";
  }
}

document.addEventListener('DOMContentLoaded', async () => {
  await mostrarContenido1Proyecto1();
  mostrarBotonEditarSiAdmin();
  document.querySelector('.prev-button').onclick = () => cambiarTeoria(-1);
  document.querySelector('.next-button').onclick = () => cambiarTeoria(1);
  document.getElementById('editar-btn').onclick = abrirModalEditar;
  document.getElementById('form-editar').onsubmit = guardarCambios;
  window.cerrarModalEditar = cerrarModalEditar;
  // Botón para volver a la gestión de contenidos
  document.getElementById('btn-gestionar').onclick = () => {
    window.location.href = "/src/admin/contenidos.html";
  };
});

// Abre el modal de edición y llena los campos
function abrirModalEditar() {
  if (!contenidoActual) return;
  document.getElementById('modal-editar').style.display = "flex";
  document.getElementById('edit-titulo').value = contenidoActual.titulo_contenido || '';
  // Genera campos para todas las teorías
  let html = "";
  for (let i = 1; i <= 10; i++) {
    const key = i === 1 ? 'teoria' : `teoria${i}`;
    html += `
      <div class="form-group">
        <label for="edit-${key}">Teoría ${i}</label>
        <textarea id="edit-${key}" name="edit-${key}" rows="2">${contenidoActual[key] || ''}</textarea>
      </div>
    `;
  }
  document.getElementById('edit-teorias').innerHTML = html;
}

// Cierra el modal de edición
function cerrarModalEditar() {
  document.getElementById('modal-editar').style.display = "none";
}

// Guardar cambios
async function guardarCambios(e) {
  e.preventDefault();
  if (!contenidoActual) return;
  const nuevoTitulo = document.getElementById('edit-titulo').value;
  let nuevasTeorias = {};
  for (let i = 1; i <= 10; i++) {
    const key = i === 1 ? 'teoria' : `teoria${i}`;
    nuevasTeorias[key] = document.getElementById(`edit-${key}`).value;
  }
  // Prepara el objeto para enviar
  const datos = {
    ...contenidoActual,
    titulo_contenido: nuevoTitulo,
    ...nuevasTeorias
  };
  try {
    const res = await fetch(API_URL + contenidoActual.id, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify(datos)
    });
    if (res.ok) {
      cerrarModalEditar();
      await mostrarContenido1Proyecto1();
      alert("¡Cambios guardados!");
    } else {
      alert("No se pudo guardar.");
    }
  } catch (e) {
    alert("Error de conexión.");
  }
}

window.insertTag = function(tag) {
  // Busca el textarea activo (el último enfocado)
  const active = document.activeElement;
  if (!active || active.tagName !== "TEXTAREA") return;
  const start = active.selectionStart;
  const end = active.selectionEnd;
  const before = active.value.substring(0, start);
  const selected = active.value.substring(start, end);
  const after = active.value.substring(end);
  // Inserta la etiqueta HTML
  active.value = before + `<${tag}>${selected}</${tag}>` + after;
  // Mantén la selección sobre el texto formateado
  active.focus();
  active.selectionStart = start + tag.length + 2;
  active.selectionEnd = end + tag.length + 2;
};

document.addEventListener('DOMContentLoaded', async () => {
  await mostrarContenido1Proyecto1();
  mostrarBotonEditarSiAdmin();
  document.querySelector('.prev-button').onclick = () => cambiarTeoria(-1);
  document.querySelector('.next-button').onclick = () => cambiarTeoria(1);
  document.getElementById('editar-btn').onclick = abrirModalEditar;
  document.getElementById('form-editar').onsubmit = guardarCambios;
  window.cerrarModalEditar = cerrarModalEditar;
});