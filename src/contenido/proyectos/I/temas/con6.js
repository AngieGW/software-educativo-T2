const API_URL = "http://localhost:4000/contenido/";

// Obtiene todos los contenidos del backend
async function getContenidos() {
  const res = await fetch(API_URL);
  const data = await res.json();
  return Array.isArray(data.data) ? data.data : [];
}

// Busca el contenido 1 del proyecto 1
async function mostrarContenido1Proyecto1() {
  const contenidos = await getContenidos();
  // Busca el contenido con id_proyecto = 1 y orden_contenido = 1
  const contenido = contenidos.find(
    c => c.id_proyecto === 1 && c.orden_contenido === 6
  );

  const titulo = document.getElementById('titulo-editable');
  const texto = document.getElementById('texto-editable');

  if (contenido) {
    titulo.textContent = contenido.titulo_contenido || 'Sin título';
    texto.innerHTML = ""; // Limpia el contenido anterior

    // Muestra todas las columnas de teoría que existan
    for (let i = 1; i <= 10; i++) {
      const key = i === 1 ? 'teoria' : `teoria${i}`;
      if (contenido[key]) {
        const p = document.createElement('p');
        p.textContent = contenido[key];
        texto.appendChild(p);
      }
    }
  } else {
    titulo.textContent = "Sin contenido";
    texto.innerHTML = "";
  }
}

document.addEventListener('DOMContentLoaded', mostrarContenido1Proyecto1);