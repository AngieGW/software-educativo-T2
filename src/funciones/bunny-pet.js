// Mascota Virtual Motivacional - Bunny el Conejo
// Archivo: bunny-pet.js

(function() {
    // Frases motivacionales sobre seguir leyendo el tema (más frases)
    const readingPhrases = [
        "¡Sigue leyendo! Cada párrafo te acerca a dominar el tema 📚",
        "La constancia en la lectura es la clave para comprender mejor. ¡No te detengas! 🐰",
        "¡Excelente! Leer un poco más hoy hará una gran diferencia mañana 🌟",
        "¡No pares ahora! Cada línea suma a tu aprendizaje.",
        "¡Vas muy bien! Un poco más y dominarás el tema.",
        "Recuerda: el conocimiento es poder, sigue leyendo.",
        "¡Tu esfuerzo leyendo será recompensado muy pronto!",
        "¡Ánimo! Cada palabra cuenta en tu camino al éxito.",
        "¡Sigue así! La perseverancia te hará experto.",
        "¡Estás a punto de lograrlo! No te detengas ahora."
    ];

    // Frases motivacionales generales (más frases)
    const motivationalPhrases = [
        "¡Leer es el primer paso para aprender algo nuevo!",
        "Cada página leída es un logro más en tu camino.",
        "¡No te rindas! El conocimiento está a solo unas líneas de distancia.",
        "Sigue adelante, cada palabra cuenta.",
        "¡Tu esfuerzo leyendo será recompensado!",
        "¡La curiosidad es tu mejor herramienta, sigue explorando!",
        "¡Aprender es crecer, y tú lo estás logrando!",
        "¡Un poco más de lectura y verás grandes resultados!",
        "¡No subestimes el poder de la constancia!",
        "¡Hoy es un gran día para aprender algo nuevo!"
    ];

    // Imágenes del conejo
    const bunnyImages = [
        '/src/img/bunny1.png',
        '/src/img/bunny2.png',
        '/src/img/bunny3.png'
    ];

    // Función para crear el botón de la mascota (solo imagen PNG sin fondo)
    function createBunnyButton() {
        // Crear el contenedor principal
        const bunnyContainer = document.createElement('div');
        bunnyContainer.id = 'bunny-container';
        bunnyContainer.style.cssText = `
            position: fixed;
            bottom: 20px;
            right: 20px;
            z-index: 10000;
            pointer-events: none;
        `;

        // Crear el globo de diálogo
        const speechBubble = document.createElement('div');
        speechBubble.id = 'bunny-speech';
        speechBubble.style.cssText = `
            background: white;
            border: 2px solid #ddd;
            border-radius: 15px;
            padding: 12px 16px;
            margin-bottom: 10px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            max-width: 250px;
            font-size: 14px;
            line-height: 1.4;
            color: #333;
            position: absolute;
            bottom: 210px;
            right: 0;
            display: none;
            animation: fadeIn 0.3s ease-in-out;
            pointer-events: auto;
        `;

        // Crear la cola del globo de diálogo
        const speechTail = document.createElement('div');
        speechTail.style.cssText = `
            position: absolute;
            bottom: -8px;
            right: 30px;
            width: 0;
            height: 0;
            border-left: 8px solid transparent;
            border-right: 8px solid transparent;
            border-top: 8px solid white;
        `;
        speechBubble.appendChild(speechTail);

        // Crear la imagen del conejo (sin botón, solo imagen)
        const bunnyImg = document.createElement('img');
        bunnyImg.src = bunnyImages[0];
        bunnyImg.alt = "Bunny";
        bunnyImg.style.cssText = `
            width: 200px;
            height: 200px;
            object-fit: contain;
            pointer-events: auto;
            user-select: none;
            background: transparent;
            animation: bunnyMove 2s infinite alternate;
            transition: box-shadow 0.3s;
            display: block;
        `;

        // Animación de movimiento
        const style = document.createElement('style');
        style.textContent = `
            @keyframes fadeIn {
                from { opacity: 0; transform: translateY(10px); }
                to { opacity: 1; transform: translateY(0); }
            }
            @keyframes bunnyMove {
                0% { transform: translateY(0px) scale(1); }
                50% { transform: translateY(-10px) scale(1.03); }
                100% { transform: translateY(0px) scale(1); }
            }
            @keyframes bounce {
                0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
                40% { transform: translateY(-20px); }
                60% { transform: translateY(-10px); }
            }
            #bunny-img.bounce {
                animation: bounce 0.6s;
            }
        `;
        document.head.appendChild(style);

        // Ensamblar los elementos
        bunnyContainer.appendChild(bunnyImg);
        bunnyContainer.appendChild(speechBubble);
        document.body.appendChild(bunnyContainer);

        // Retornar referencias
        return { bunnyImg, speechBubble, bunnyContainer };
    }

    // Función para mostrar una frase aleatoria
    function showRandomPhrase(speechBubble, bunnyImg) {
        const randomIndex = Math.floor(Math.random() * motivationalPhrases.length);
        const phrase = motivationalPhrases[randomIndex];
        speechBubble.textContent = phrase;
        speechBubble.style.display = 'block';

        // Efecto rebote
        bunnyImg.classList.add('bounce');
        setTimeout(() => {
            bunnyImg.classList.remove('bounce');
        }, 600);

        setTimeout(() => {
            speechBubble.style.display = 'none';
        }, 8000);
    }

    // Función para mostrar un mensaje personalizado
    function showCustomMessage(speechBubble, bunnyImg, message, duration = 10000) {
        speechBubble.textContent = message;
        speechBubble.style.display = 'block';
        bunnyImg.classList.add('bounce');
        setTimeout(() => {
            bunnyImg.classList.remove('bounce');
        }, 600);
        setTimeout(() => {
            speechBubble.style.display = 'none';
        }, duration);
    }

    // Función para mostrar frase de lectura al cambiar imagen
    function showReadingPhrase(speechBubble, bunnyImg, idx) {
        speechBubble.textContent = readingPhrases[idx % readingPhrases.length];
        speechBubble.style.display = 'block';
        bunnyImg.classList.add('bounce');
        setTimeout(() => {
            bunnyImg.classList.remove('bounce');
        }, 600);
        setTimeout(() => {
            speechBubble.style.display = 'none';
        }, 10000);
    }

    // Función principal para inicializar la mascota
    function initializeBunny() {
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', initializeBunny);
            return;
        }

        const { bunnyImg, speechBubble } = createBunnyButton();

        // --- Control de clicks rápidos ---
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
                showRandomPhrase(speechBubble, bunnyImg);
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

                // Cambiar la imagen a bunny-error.png
                const previousSrc = bunnyImg.src;
                bunnyImg.src = '/src/img/bunny-error.png';
                showCustomMessage(speechBubble, bunnyImg, "Me estás lastimando, ten cuidado", 10000);
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
                showRandomPhrase(speechBubble, bunnyImg);
            }
        });

        // Mensaje de presentación al recargar la página
        setTimeout(() => {
            showCustomMessage(
                speechBubble,
                bunnyImg,
                "¡Un gusto! Soy Bunny 🐰 y te acompañaré en todo tu aprendizaje.",
                8000
            );
        }, 1000);

        // Iniciar rotación y frases automáticas
        startRotation();

        // Mensaje de bienvenida en consola
        console.log('🐰 ¡Bunny está listo para motivarte en tu aprendizaje!');
    }

    initializeBunny();
})();