// Mascota Virtual - Bunny Potter (Conejo con bufanda y abrigo estilo Harry Potter)
// Requiere bunny-potter.png y bunny-potter-error.png en la carpeta img/

(function() {
    // Frases de Harry Potter
    const potterPhrases = [
        "¡La felicidad se puede hallar hasta en los más oscuros momentos, si somos capaces de usar bien la luz! ✨",
        "No son nuestras habilidades las que muestran lo que somos, sino nuestras elecciones. ⚡",
        "La curiosidad no es un pecado, pero hay que tener cuidado con ella. 🧐",
        "La mente no es un libro que se pueda abrir y examinar a voluntad. 📖",
        "¡No dejes que los muggles te depriman! 🧙‍♂️",
        "La magia está en ti, nunca lo olvides. 🪄",
        "La ayuda siempre se le dará a quienes la pidan en Hogwarts.",
        "La diferencia entre lo que es correcto y lo que es fácil, ¡elige lo correcto!",
        "¡Expelliarmus! (Desarma tus dudas y sigue aprendiendo)",
        "La amistad y el coraje son la mejor magia.",
        "¡Trabaja duro y nunca dejes de soñar, joven mago!",
        "La educación es la magia más poderosa que existe.",
        "¡No necesitas varita para hacer magia en tu aprendizaje!",
        "¡Recuerda: la cámara de los secretos se abre solo para los valientes!",
        "¡Eres más valiente de lo que crees, más fuerte de lo que pareces y más inteligente de lo que piensas!",
        "¡No hay lugar como Hogwarts para aprender cosas nuevas!",
        "¡La magia comienza con una buena pregunta!",
        "¡No temas a los desafíos, enfréntalos como un verdadero Gryffindor!",
        "¡La curiosidad es la chispa de la magia!",
        "¡Hoy es un buen día para aprender un nuevo hechizo!"
    ];

    // Mensaje de saludo inicial
    const greeting = "¡Hola, joven mago! 🧙‍♂️ ¿Listo para aprender algo mágico hoy?";

    // Imágenes de Bunny Potter
    const bunnyImages = [
        '/src/contenido/biblioteca/libro1/img/bunnypotter.png'
    ];
    const bunnyErrorImg = '/src/contenido/biblioteca/libro1/img/bunnypotter-error.png';

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

        // Imagen del conejo con bufanda y abrigo
        const bunnyImg = document.createElement('img');
        bunnyImg.src = bunnyImages[0];
        bunnyImg.alt = 'Bunny Potter';
        bunnyImg.style.cssText = `
            width: 220px;
            height: 220px;
            display: block;
            filter: drop-shadow(0 4px 12px rgba(0,0,0,0.18));
            animation: bunnyMove 3s infinite alternate;
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
            top: 1.5rem;
            left: -210px;
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
    function showPhrase(speechBubble, phrase, duration = 6000) {
        speechBubble.textContent = phrase;
        speechBubble.style.display = 'block';
        setTimeout(() => {
            speechBubble.style.display = 'none';
        }, duration);
    }

    // Mostrar frase aleatoria
    function showRandomPotterPhrase(speechBubble) {
        const idx = Math.floor(Math.random() * potterPhrases.length);
        showPhrase(speechBubble, potterPhrases[idx]);
    }

    // --- NUEVO: Control de clicks rápidos y bloqueo ---
    function initializeBunnyPotter() {
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', initializeBunnyPotter);
            return;
        }

        const { bunnyImg, speechBubble } = createBunnyPotter();

        // Mostrar saludo al cargar la página
        setTimeout(() => {
            showPhrase(speechBubble, greeting, 6000);
        }, 800);

        // --- Control de clicks rápidos y bloqueo ---
        let clickTimes = [];
        let clickBlocked = false;
        let phraseInterval = null;
        let rotationInterval = null;
        let bunnyIdx = 0;

        function startRotation() {
            // Rotar imagen (si tuvieras varias, aquí puedes agregarlas)
            rotationInterval = setInterval(() => {
                bunnyIdx = (bunnyIdx + 1) % bunnyImages.length;
                bunnyImg.src = bunnyImages[bunnyIdx];
                showRandomPotterPhrase(speechBubble);
            }, 60000);

            // Mostrar frases automáticamente cada 30 segundos
            phraseInterval = setInterval(() => {
                showRandomPotterPhrase(speechBubble);
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

                // Cambiar la imagen a bunny-potter-error.png
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
                showRandomPotterPhrase(speechBubble);
            }
        });

        // Iniciar frases automáticas y rotación
        startRotation();
    }

    // Inicializar
    initializeBunnyPotter();
})();