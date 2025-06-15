// Mascota Virtual - Bunny Vikingo (Conejo con bufanda y abrigo estilo vikingo/entrenador de dragones)
// Requiere bunnyvi.png y bunnyvi-error.png en la carpeta img/

(function() {
    // Frases motivacionales de vikingos y entrenar dragones
    const vikingPhrases = [
        "¡Un verdadero vikingo escucha a su corazón y respeta a los dragones! 🐉",
        "La amistad con un dragón puede cambiar el destino de un pueblo.",
        "No todos los héroes empuñan hachas, algunos extienden la mano a un dragón.",
        "La valentía no es luchar, es atreverse a comprender lo desconocido.",
        "¡Hoy es un gran día para aprender a volar más alto!",
        "Un vikingo sabio sabe que la fuerza y la compasión pueden ir de la mano.",
        "Entrenar a un dragón requiere paciencia, respeto y mucho pescado.",
        "¡No temas lo diferente, puede ser tu mayor aliado!",
        "La verdadera fuerza de Berk está en la unión entre vikingos y dragones.",
        "¡Recuerda! Un dragón amigo es mejor que mil enemigos.",
        "El coraje es escuchar a tu dragón interior.",
        "¡Juntos, vikingos y dragones, somos imparables!",
        "La aventura comienza cuando decides confiar.",
        "Un líder no manda, inspira a otros a volar con él.",
        "¡Hoy puedes descubrir un nuevo amigo con alas!",
        "La historia de Berk la escriben quienes se atreven a cambiar.",
        "No hay viento en contra para quien sabe volar con su dragón.",
        "¡La curiosidad es el primer paso para entrenar a tu dragón!",
        "Un dragón fiel vale más que un ejército de guerreros.",
        "¡Nunca subestimes el poder de una amistad inesperada!"
    ];

    // Mensaje de saludo inicial
    const greeting = "¡Hola, joven vikingo! ¿Listo para una aventura con dragones hoy?";

    // Imágenes de Bunny Vikingo
    const bunnyImages = [
        '/src/contenido/biblioteca/libro2/bunnyvi.png'
    ];
    const bunnyErrorImg = '/src/contenido/biblioteca/libro2/bunnyvi-error.png';

    // Función para crear la mascota visual
    function createBunnyVikingo() {
        // Contenedor principal
        const bunnyContainer = document.createElement('div');
        bunnyContainer.id = 'bunny-vikingo-container';
        bunnyContainer.style.cssText = `
            position: fixed;
            bottom: 18px;
            right: 18px;
            z-index: 10000;
            pointer-events: none;
            user-select: none;
        `;

        // Imagen del conejo vikingo
        const bunnyImg = document.createElement('img');
        bunnyImg.src = bunnyImages[0];
        bunnyImg.alt = 'Bunny Vikingo';
        bunnyImg.style.cssText = `
            width: 200px;
            height: auto;
            display: block;
            filter: drop-shadow(0 4px 12px rgba(0,0,0,0.18));
            animation: bunnyMove 2.5s infinite alternate;
            pointer-events: auto;
            cursor: pointer;
        `;

        // Globo de diálogo
        const speechBubble = document.createElement('div');
        speechBubble.id = 'bunny-vikingo-speech';
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
            bottom: 240px;
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
            #bunny-vikingo-container img:active {
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
    function showRandomVikingPhrase(speechBubble) {
        const idx = Math.floor(Math.random() * vikingPhrases.length);
        showPhrase(speechBubble, vikingPhrases[idx]);
    }

    // --- Control de clicks rápidos y bloqueo ---
    function initializeBunnyVikingo() {
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', initializeBunnyVikingo);
            return;
        }

        const { bunnyImg, speechBubble } = createBunnyVikingo();

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
                showRandomVikingPhrase(speechBubble);
            }, 60000);

            // Mostrar frases automáticamente cada 30 segundos
            phraseInterval = setInterval(() => {
                showRandomVikingPhrase(speechBubble);
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
                showPhrase(speechBubble, "Me estás lastimando, ten cuidado", 10000);
                clickTimes = [];

                // Volver a la imagen anterior después de 10 segundos
                setTimeout(() => {
                    bunnyImg.src = previousSrc;
                }, 10000);

                // Desbloquear clicks y reanudar rotación después de 30 segundos
                setTimeout(() => {
                    clickBlocked = false;
                    startRotation();
                }, 30000);
            } else {
                showRandomVikingPhrase(speechBubble);
            }
        });

        // Iniciar frases automáticas y rotación
        startRotation();
    }

    // Inicializar
    initializeBunnyVikingo();
})();