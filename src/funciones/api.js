// api.js
const API_URL = "http://localhost:4000";

// Ruta principal
export const getStatus = async () => {
  const res = await fetch(`${API_URL}/`);
  return res.text();
};

// Administradores
export const getAdmins = async () => {
  const res = await fetch(`${API_URL}/admin`);
  return res.json();
};

// Contenido
export const getContenido = async () => {
  const res = await fetch(`${API_URL}/contenido`);
  return res.json();
};

// Evaluaciones
export const getEvaluaciones = async () => {
  const res = await fetch(`${API_URL}/evaluacion`);
  return res.json();
};

// Resultados de evaluación
export const getResultados = async () => {
  const res = await fetch(`${API_URL}/resultados`);
  return res.json();
};

// Proyectos
export const getProyectos = async () => {
  const res = await fetch(`${API_URL}/proyectos`);
  return res.json();
};

// Estudiantes
export const getEstudiantes = async () => {
  const res = await fetch(`${API_URL}/estudiantes`);
  return res.json();
};

// Login de administrador
export const loginAdmin = async (password) => {
  const res = await fetch(`${API_URL}/admin/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ password })
  });
  return res.json();
}