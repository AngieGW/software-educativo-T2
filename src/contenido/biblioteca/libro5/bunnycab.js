// Mascota Virtual - Bunny Caballero (Conejo con armadura estilo "El caballero de la armadura oxidada")
// Requiere bunnyvi.png y bunnyvi-error.png en la carpeta img/

(function() {
    // Frases motivacionales inspiradas en "El caballero de la armadura oxidada" para niños
    const knightPhrases = [
        "A veces, quitarse la armadura es el primer paso para ser feliz.",
        "No temas mostrar tus sentimientos, eso te hace más fuerte.",
        "La verdadera valentía es mirar dentro de tu corazón.",
        "Cada lágrima limpia un poco de tu armadura.",
        "Ser tú mismo es el mayor acto de valentía.",
        "No necesitas una armadura para ser un héroe.",
        "Escucha a tu corazón, él sabe el camino.",
        "La amistad y el amor son la mejor protección.",
        "Pedir ayuda es de valientes, no de débiles.",
        "El miedo se vence con pequeños pasos de valor.",
        "La risa y la alegría hacen brillar hasta la armadura más oxidada.",
        "No estás solo, siempre hay alguien dispuesto a ayudarte.",
        "El camino más difícil es el que lleva a conocerse a uno mismo.",
        "Cada día puedes aprender algo nuevo sobre ti.",
        "La bondad es la mejor espada de un caballero.",
        "No importa cuán pesada sea tu armadura, siempre puedes quitártela.",
        "El perdón es la llave para liberar tu corazón.",
        "Ser amable contigo mismo es tan importante como serlo con los demás.",
        "La magia está en creer en ti mismo.",
        "Hoy es un buen día para empezar a brillar desde adentro."
    ];

    // Mensaje de saludo inicial
    const greeting = "¡Hola, noble caballero! ¿Listo para descubrir la magia que hay en tu corazón?";

    // Imágenes de Bunny Caballero
    const bunnyImages = [
        '/src/contenido/biblioteca/libro5/bunnycab.png'
    ];
    const bunnyErrorImg = '/src/img/bunny-error.png';

    // Función para crear la mascota visual
    function createBunnyCaballero() {
        // Contenedor principal
        const bunnyContainer = document.createElement('div');
        bunnyContainer.id = 'bunny-caballero-container';
        bunnyContainer.style.cssText = `
            position: fixed;
            bottom: 18px;
            right: 18px;
            z-index: 10000;
            pointer-events: none;
            user-select: none;
        `;

        // Imagen del conejo caballero
        const bunnyImg = document.createElement('img');
        bunnyImg.src = bunnyImages[0];
        bunnyImg.alt = 'Bunny Caballero';
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
        speechBubble.id = 'bunny-caballero-speech';
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
            #bunny-caballero-container img:active {
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
    function showRandomKnightPhrase(speechBubble) {
        const idx = Math.floor(Math.random() * knightPhrases.length);
        showPhrase(speechBubble, knightPhrases[idx]);
    }

    // Mostrar frase de lectura (puedes personalizar si tienes frases especiales para la rotación)
    function showReadingPhrase(speechBubble, bunnyImg, idx) {
        showRandomKnightPhrase(speechBubble);
    }

    // --- Control de clicks rápidos y bloqueo ---
    function initializeBunnyCaballero() {
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', initializeBunnyCaballero);
            return;
        }

        const { bunnyImg, speechBubble } = createBunnyCaballero();

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
            // Rotar imagen y frase motivacional de lectura cada 1 minuto
            rotationInterval = setInterval(() => {
                bunnyIdx = (bunnyIdx + 1) % bunnyImages.length;
                bunnyImg.src = bunnyImages[bunnyIdx];
                showReadingPhrase(speechBubble, bunnyImg, bunnyIdx);
            }, 60000);

            // Mostrar frases automáticamente cada 30 segundos
            phraseInterval = setInterval(() => {
                showRandomKnightPhrase(speechBubble);
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

                // Cambiar la imagen a bunnyvi-error.png
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
                showRandomKnightPhrase(speechBubble);
            }
        });

        // Iniciar frases automáticas y rotación
        startRotation();
    }

    // Inicializar
    initializeBunnyCaballero();
})();