// Mascota Virtual - Bunny Cisne (Conejo con bufanda y abrigo estilo cuento de la princesa cisne)
// Requiere bunnycis.png y bunnycis-error.png en la carpeta img/

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

    // Imágenes de Bunny Cisne
    const bunnyImages = [
        '/src/contenido/biblioteca/libro3/bunnycis.png'
    ];
    const bunnyErrorImg = '/src/img/bunny-error.png';

    // Función para crear la mascota visual
    function createBunnyCisne() {
        // Contenedor principal
        const bunnyContainer = document.createElement('div');
        bunnyContainer.id = 'bunny-cisne-container';
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
        bunnyImg.src = bunnyImages[0];
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
        speechBubble.id = 'bunny-cisne-speech';
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
            bottom: 300px;
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
            #bunny-cisne-container img:active {
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
    function showPhrase(speechBubble, phrase, duration = 6000) {
        speechBubble.textContent = phrase;
        speechBubble.style.display = 'block';
        setTimeout(() => {
            speechBubble.style.display = 'none';
        }, duration);
    }

    // Mostrar frase aleatoria
    function showRandomSwanPhrase(speechBubble) {
        const idx = Math.floor(Math.random() * swanPhrases.length);
        showPhrase(speechBubble, swanPhrases[idx]);
    }

    // --- Control de clicks rápidos y bloqueo ---
    function initializeBunnyCisne() {
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', initializeBunnyCisne);
            return;
        }

        const { bunnyImg, speechBubble } = createBunnyCisne();

        // Mostrar saludo al cargar la página
        setTimeout(() => {
            showPhrase(speechBubble, greeting, 6000);
        }, 800);

        // --- Control de clicks rápidos y bloqueo ---
        let clickTimes = [];
        let clickBlocked = false;
        let rotationInterval = null;
        let phraseInterval = null;
        let bunnyIdx = 0;

        function startRotation() {
            // Rotar imagen y frase motivacional cada 1 minuto (si hay más imágenes)
            rotationInterval = setInterval(() => {
                bunnyIdx = (bunnyIdx + 1) % bunnyImages.length;
                bunnyImg.src = bunnyImages[bunnyIdx];
                showRandomSwanPhrase(speechBubble);
            }, 60000);

            // Mostrar frases automáticamente cada 30 segundos
            phraseInterval = setInterval(() => {
                showRandomSwanPhrase(speechBubble);
            }, 30000);
        }

        function stopRotation() {
            clearInterval(rotationInterval);
            clearInterval(phraseInterval);
        }

        bunnyImg.addEventListener('click', function() {
            if (clickBlocked) return;

            const now = Date.now();
            clickTimes = clickTimes.filter(ts => now - ts < 10000);
            clickTimes.push(now);

            if (clickTimes.length >= 5) {
                clickBlocked = true;
                stopRotation();

                // Cambiar la imagen a bunnycis-error.png
                const previousSrc = bunnyImg.src;
                bunnyImg.src = bunnyErrorImg;
                showPhrase(speechBubble, "Me estás lastimando, ten cuidado", 15000);
                clickTimes = [];

                // Volver a la imagen anterior después de 60 segundos
                setTimeout(() => {
                    bunnyImg.src = previousSrc;
                }, 60000);

                // Desbloquear clicks y reanudar rotación después de 30 segundos
                setTimeout(() => {
                    clickBlocked = false;
                    startRotation();
                }, 30000);
            } else {
                showRandomSwanPhrase(speechBubble);
            }
        });

        // Iniciar frases automáticas y rotación
        startRotation();
    }

    // Inicializar
    initializeBunnyCisne();
})();