// Mascota Virtual - Bunny Principito (Conejo con bufanda y abrigo estilo Principito)
// Requiere bunnypri.png (la imagen proporcionada) en la carpeta img/

(function() {
    // Frases inspiradas en El Principito
    const principitoPhrases = [
        "Lo esencial es invisible a los ojos.",
        "Solo con el corazón se puede ver bien.",
        "Las estrellas son bellas porque encierran una flor que no se ve.",
        "Eres responsable para siempre de lo que has domesticado.",
        "Fue el tiempo que pasaste con tu rosa lo que la hizo tan importante.",
        "Los adultos nunca comprenden nada por sí solos.",
        "Todas las personas mayores fueron al principio niños, aunque pocas lo recuerdan.",
        "Si vienes, por ejemplo, a las cuatro de la tarde, comenzaré a ser feliz desde las tres.",
        "Es mucho más difícil juzgarse a sí mismo que juzgar a los demás.",
        "Caminando en línea recta no puede uno llegar muy lejos.",
        "Las palabras son fuente de malentendidos.",
        "El verdadero amor nunca se olvida.",
        "Los ojos están ciegos. Hay que buscar con el corazón.",
        "Lo que embellece al desierto es que en alguna parte esconde un pozo.",
        "Los ritos son necesarios.",
        "Si quieres un amigo, comienza por dedicarme tiempo.",
        "El tiempo calma todo, incluso el dolor más profundo.",
        "A veces, la tristeza ayuda a comprender la alegría.",
        "La amistad es un puente entre dos corazones.",
        "Nunca dejes de hacer preguntas como un niño."
    ];

    // Mensaje de saludo inicial
    const greeting = "¡Hola, pequeño explorador! ¿Listo para descubrir lo invisible junto al Principito?";

    // Función para crear la mascota visual
    function createBunnyPotter() {
        // Contenedor principal
        const bunnyContainer = document.createElement('div');
        bunnyContainer.id = 'bunny-potter-container';
        bunnyContainer.style.cssText = `
            position: fixed;
            bottom: 18px;
            right: 18px;
            z-index: 10000;
            pointer-events: none;
            user-select: none;
        `;

        // Imagen del conejo principito
        const bunnyImg = document.createElement('img');
        bunnyImg.src = '/src/contenido/biblioteca/libro4/bunnyprin.png';
        bunnyImg.alt = 'Bunny Principito';
        bunnyImg.style.cssText = `
            width: 260px;
            height: auto;
            display: block;
            filter: drop-shadow(0 4px 12px rgba(0,0,0,0.18));
            animation: bunnyMove 2.5s infinite alternate;
            pointer-events: auto;
            cursor: pointer;
        `;

        // Globo de diálogo
        const speechBubble = document.createElement('div');
        speechBubble.id = 'bunny-potter-speech';
        speechBubble.style.cssText = `
            background: #fffbe7;
            border: 2px solid #bfae7c;
            border-radius: 15px;
            padding: 18px 28px;
            margin-bottom: 10px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.13);
            max-width: 260px;
            font-size: 15px;
            line-height: 1.5;
            color: #3a2d13;
            position: absolute;
            bottom: 340px;
            right: 0;
            display: none;
            animation: fadeIn 0.3s ease-in-out;
            font-family: 'Segoe UI', Arial, sans-serif;
        `;

        // Cola del globo
        const speechTail = document.createElement('div');
        speechTail.style.cssText = `
            position: absolute;
            bottom: -12px;
            right: 60px;
            width: 0;
            height: 0;
            border-left: 14px solid transparent;
            border-right: 14px solid transparent;
            border-top: 14px solid #fffbe7;
        `;
        speechBubble.appendChild(speechTail);

        // Animaciones CSS
        const style = document.createElement('style');
        style.textContent = `
            @keyframes fadeIn {
                from { opacity: 0; transform: translateY(10px);}
                to { opacity: 1; transform: translateY(0);}
            }
            @keyframes bunnyMove {
                0% { transform: translateY(0) scale(1) rotate(-2deg);}
                50% { transform: translateY(-30px) scale(1.04) rotate(2deg);}
                100% { transform: translateY(0) scale(1) rotate(-2deg);}
            }
            #bunny-potter-container img:active {
                filter: brightness(1.1) drop-shadow(0 0 8px #ffd700);
            }
        `;
        document.head.appendChild(style);

        // Ensamblar elementos
        bunnyContainer.appendChild(speechBubble);
        bunnyContainer.appendChild(bunnyImg);
        document.body.appendChild(bunnyContainer);

        return { bunnyImg, speechBubble, bunnyContainer };
    }

    // Mostrar frase en el globo
    function showPhrase(speechBubble, phrase) {
        speechBubble.textContent = phrase;
        speechBubble.style.display = 'block';
        setTimeout(() => {
            speechBubble.style.display = 'none';
        }, 6000);
    }

    // Mostrar frase aleatoria
    function showRandomPrincipitoPhrase(speechBubble) {
        const idx = Math.floor(Math.random() * principitoPhrases.length);
        showPhrase(speechBubble, principitoPhrases[idx]);
    }

    // Inicializar la mascota
    function initializeBunnyPotter() {
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', initializeBunnyPotter);
            return;
        }

        const { bunnyImg, speechBubble } = createBunnyPotter();

        // Mostrar saludo al cargar la página
        setTimeout(() => {
            showPhrase(speechBubble, greeting);
        }, 800);

        // --- Control de clicks para advertencia ---
        let clickTimestamps = [];
        let warningTimeout = null;

        bunnyImg.addEventListener('click', function() {
            const now = Date.now();
            // Eliminar clicks fuera de la ventana de 10 segundos
            clickTimestamps = clickTimestamps.filter(ts => now - ts < 10000);
            clickTimestamps.push(now);

            // Si ya está mostrando advertencia, ignorar clicks
            if (warningTimeout) return;

            if (clickTimestamps.length >= 5) {
                showPhrase(speechBubble, "me estas lastimando");
                warningTimeout = setTimeout(() => {
                    speechBubble.style.display = 'none';
                    warningTimeout = null;
                }, 10000); // Mostrar advertencia por 10 segundos
                clickTimestamps = [];
            } else {
                showRandomPrincipitoPhrase(speechBubble);
            }
        });

        // Mostrar frases automáticas cada 30 segundos
        setInterval(() => {
            if (!warningTimeout) {
                showRandomPrincipitoPhrase(speechBubble);
            }
        }, 30000);
    }

    // Inicializar
    initializeBunnyPotter();
})();