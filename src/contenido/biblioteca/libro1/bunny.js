// Mascota Virtual - Bunny Potter (Conejo con bufanda y abrigo estilo Harry Potter)
// Requiere bunny-potter.png (la imagen proporcionada) en la carpeta img/

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

        // Imagen del conejo con bufanda y abrigo (debe estar en /img/bunny-potter.png)
        const bunnyImg = document.createElement('img');
        bunnyImg.src = '/src/contenido/biblioteca/libro1/img/bunnypotter.png';
        bunnyImg.alt = 'Bunny Potter';
        bunnyImg.style.cssText = `
            width: 300px;
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
    function showRandomPotterPhrase(speechBubble) {
        const idx = Math.floor(Math.random() * potterPhrases.length);
        showPhrase(speechBubble, potterPhrases[idx]);
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
        let lastWarningTime = 0;
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
                showRandomPotterPhrase(speechBubble);
            }
        });

        // Mostrar frases automáticas cada 30 segundos
        setInterval(() => {
            // No mostrar frases si está la advertencia activa
            if (!warningTimeout) {
                showRandomPotterPhrase(speechBubble);
            }
        }, 30000);
    }

    // Inicializar
    initializeBunnyPotter();
})();