// Mascota Virtual - Bunny Cisne (Conejo con bufanda y abrigo estilo cuento de la princesa cisne)
// Requiere bunnycis.png (la imagen proporcionada) en la carpeta img/

(function() {
    // Frases motivacionales y mágicas inspiradas en el cuento de la princesa cisne
    const swanPhrases = [
        "La magia del lago siempre protege a los corazones valientes.",
        "A veces, un secreto puede ser la llave para romper cualquier hechizo.",
        "La confianza es tan frágil como las alas de un cisne, cuídala.",
        "El amor verdadero puede romper hasta el hechizo más oscuro.",
        "No temas a la oscuridad, pues la luz del lago siempre regresa.",
        "Un amigo leal es el mayor tesoro en un reino encantado.",
        "Cada decisión puede cambiar el destino del reino.",
        "La princesa Odette confía en quienes demuestran valor y bondad.",
        "El lago esconde misterios, pero también esperanza.",
        "Recuerda: incluso bajo un hechizo, el corazón sigue siendo libre.",
        "La belleza de un cisne está en su libertad.",
        "Un juramento sincero puede salvar más que una espada.",
        "El coraje no siempre ruge, a veces susurra: 'inténtalo de nuevo'.",
        "El verdadero poder está en la compasión y la honestidad.",
        "No hay noche tan larga que no termine con el canto de un cisne.",
        "El destino del reino depende de tus elecciones.",
        "La princesa Cisne cree en los milagros... ¿y tú?",
        "A veces, el mayor acto de amor es el sacrificio.",
        "La magia más fuerte es la que nace del corazón.",
        "Hoy es un buen día para confiar en la magia y en ti."
    ];

    // Mensaje de saludo inicial
    const greeting = "¡Hola! ¿Listo para descubrir los secretos del lago y ayudar a la princesa Odette?";

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

        // Imagen del conejo cisne
        const bunnyImg = document.createElement('img');
        bunnyImg.src = '/src/contenido/biblioteca/libro3/bunnycis.png';
        bunnyImg.alt = 'Bunny Cisne';
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
    function showRandomSwanPhrase(speechBubble) {
        const idx = Math.floor(Math.random() * swanPhrases.length);
        showPhrase(speechBubble, swanPhrases[idx]);
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
                showRandomSwanPhrase(speechBubble);
            }
        });

        // Mostrar frases automáticas cada 30 segundos
        setInterval(() => {
            if (!warningTimeout) {
                showRandomSwanPhrase(speechBubble);
            }
        }, 30000);
    }

    // Inicializar
    initializeBunnyPotter();
})();