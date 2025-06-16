const API_URL = "http://localhost:4000/contenido/create";

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('contenidoForm');
    const formMsg = document.getElementById('form-msg');

    form.addEventListener('submit', async function(e) {
        e.preventDefault();

        // Obtener proyecto y contenido seleccionados
        const id_proyecto = Number(form.elements['proyecto'].value);
        const orden_contenido = Number(form.elements['contenido'].value);
        const titulo_contenido = document.getElementById('titulo-tema').value.trim();

        // Obtener los cuadros de contenido (teoria, teoria2, ..., teoria10)
        const cuadros = [];
        for (let i = 0; i < 10; i++) {
            // Si tienes varios editores, usa: document.getElementById('editor' + i)
            // Pero en tu código solo tienes uno, así que usamos la variable global 'cuadros'
            if (window.cuadros && window.cuadros[i]) {
                cuadros.push(window.cuadros[i]);
            } else {
                cuadros.push('');
            }
        }

        // Construir el objeto para enviar
        const data = {
            titulo_contenido,
            id_proyecto,
            orden_contenido,
            teoria: cuadros[0] || '',
            teoria2: cuadros[1] || '',
            teoria3: cuadros[2] || '',
            teoria4: cuadros[3] || '',
            teoria5: cuadros[4] || '',
            teoria6: cuadros[5] || '',
            teoria7: cuadros[6] || '',
            teoria8: cuadros[7] || '',
            teoria9: cuadros[8] || '',
            teoria10: cuadros[9] || ''
        };

        try {
            const res = await fetch(API_URL, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data)
            });
            const result = await res.json();

            if (res.ok && result.status) {
                formMsg.innerHTML = '<div class="success-msg">¡Contenido guardado correctamente!</div>';
                setTimeout(() => {
                    window.location.href = "/src/contenido/proyectos/confor.html";
                }, 1200);
            } else {
                formMsg.innerHTML = '<div class="error-msg">Error al guardar: ' + (result.message || 'Intenta de nuevo') + '</div>';
            }
        } catch (err) {
            formMsg.innerHTML = '<div class="error-msg">Error de conexión con el servidor</div>';
        }
    });
});