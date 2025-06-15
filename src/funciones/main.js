// main.js
import { getContenido, getProyectos } from './api.js';

getContenido().then(data => {
  console.log('Contenido:', data);
});

getProyectos().then(data => {
  console.log('Proyectos:', data);
});