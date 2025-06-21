// Mascota Virtual Motivacional - Bunny para Evaluaciones

(function() {
    // Imágenes del bunny
    const bunnyImages = {
        original: '/src/img/bunny-original.png',
        happy: '/src/img/bunny-happy.png',
        sad: '/src/img/bunny-triste.png'
    };

    // Frases motivacionales para exámenes
    const examPhrases = [
        "¡Recuerda leer bien cada pregunta y confiar en ti!",
        "¡Tú puedes! Cada respuesta es una oportunidad para aprender.",
        "Respira profundo, concéntrate y da lo mejor de ti.",
        "¡No te rindas! Cada intento te acerca a tu meta.",
        "La clave es la calma y la confianza. ¡Ánimo!"
    ];

    // Frase de saludo al cargar la página
    const saludo = "Bienvenido al reto de la evaluación";

    // API para registrar resultados
    const API_RESULT = "http://localhost:4000/resultados/create";

    // Variable interna para puntaje
    let bunnyPuntaje = 0;

    // Crea la mascota en pantalla
    function createBunnyPet() {
        // Contenedor principal
        const bunnyContainer = document.createElement('div');
        bunnyContainer.id = 'bunny-eval-container';
        bunnyContainer.style.cssText = `
            position: fixed;
            bottom: 20px;
            right: 20px;
            z-index: 10000;
            font-family: Arial, sans-serif;
            display: flex;
            flex-direction: column;
            align-items: center;
        `;

        // Imagen del bunny
        const bunnyImg = document.createElement('img');
        bunnyImg.id = 'bunny-eval-img';
        bunnyImg.src = bunnyImages.original;
        bunnyImg.alt = "Bunny";
        bunnyImg.style.cssText = `
            width: 120px;
            height: 120px;
            object-fit: contain;
            background: transparent;
            border-radius: 50%;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            transition: box-shadow 0.3s, filter 0.3s;
            display: block;
            user-select: none;
            pointer-events: none;
        `;

        // Globo de diálogo
        const speechBubble = document.createElement('div');
        speechBubble.id = 'bunny-eval-speech';
        speechBubble.style.cssText = `
            background: #fffbe6;
            border: 2px solid #ffe066;
            border-radius: 15px;
            padding: 12px 16px;
            margin-bottom: 10px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.10);
            max-width: 260px;
            font-size: 15px;
            color: #7c6f00;
            display: none;
            position: relative;
            text-align: center;
            font-weight: 600;
            animation: fadeIn 0.3s ease-in-out;
        `;

        // Cola del globo
        const speechTail = document.createElement('div');
        speechTail.style.cssText = `
            position: absolute;
            bottom: -8px;
            left: 50%;
            transform: translateX(-50%);
            width: 0;
            height: 0;
            border-left: 8px solid transparent;
            border-right: 8px solid transparent;
            border-top: 8px solid #fffbe6;
        `;
        speechBubble.appendChild(speechTail);

        // Ensamblar
        bunnyContainer.appendChild(bunnyImg);
        bunnyContainer.appendChild(speechBubble);
        document.body.appendChild(bunnyContainer);

        // Animación CSS
        const style = document.createElement('style');
        style.textContent = `
            @keyframes fadeIn {
                from { opacity: 0; transform: translateY(10px);}
                to { opacity: 1; transform: translateY(0);}
            }
            @keyframes bunnyBounce {
                0%, 20%, 50%, 80%, 100% { transform: translateY(0);}
                40% { transform: translateY(-10px);}
                60% { transform: translateY(-5px);}
            }
            #bunny-eval-img.bounce {
                animation: bunnyBounce 0.6s;
            }
            #bunny-eval-container, #bunny-eval-img {
                all: unset;
            }
            #bunny-eval-container {
                position: fixed !important;
                bottom: 20px !important;
                right: 20px !important;
                z-index: 10000 !important;
                display: flex !important;
                flex-direction: column !important;
                align-items: center !important;
                background: none !important;
                box-shadow: none !important;
                border: none !important;
            }
            #bunny-eval-img {
                width: 120px !important;
                height: 120px !important;
                border-radius: 50% !important;
                background: transparent !important;
                box-shadow: 0 4px 12px rgba(0,0,0,0.15) !important;
                display: block !important;
                user-select: none !important;
                pointer-events: none !important;
                border: none !important;
            }
        `;
        document.head.appendChild(style);

        return { bunnyImg, speechBubble };
    }

    // Mostrar frase en el globo
    function showSpeech(message, duration = 8000) {
        const { speechBubble } = window.bunnyEvalRefs;
        speechBubble.textContent = message;
        speechBubble.style.display = 'block';
        setTimeout(() => {
            speechBubble.style.display = 'none';
        }, duration);
    }

    // Mostrar saludo al cargar
    function showSaludo() {
        showSpeech(saludo, 7000);
    }

    // Mostrar frase motivacional para examen cada 5 minutos
    function startExamPhrases() {
        setInterval(() => {
            const idx = Math.floor(Math.random() * examPhrases.length);
            showSpeech(examPhrases[idx], 8000);
        }, 5 * 60 * 1000); // 5 minutos
    }

    // Cambia a bunny feliz cada 30 minutos y luego vuelve al original
    function startHappyCycle() {
        const { bunnyImg } = window.bunnyEvalRefs;
        setInterval(() => {
            bunnyImg.src = bunnyImages.happy;
            setTimeout(() => {
                bunnyImg.src = bunnyImages.original;
            }, 60 * 1000); // 1 minuto bunny feliz
        }, 30 * 60 * 1000); // cada 30 minutos
    }

    // Función para sumar puntos (llamar esta función cada vez que el usuario acierte una pregunta)
    window.bunnySumarPunto = function(puntos = 1) {
        bunnyPuntaje += puntos;
    };

    // Función para obtener el puntaje actual
    window.bunnyGetPuntaje = function() {
        return bunnyPuntaje;
    };

    // Mostrar bunny feliz o triste según puntaje y registrar resultado en el servidor
    async function mostrarResultadoBunny() {
        const { bunnyImg } = window.bunnyEvalRefs;
        const puntajeFinal = bunnyPuntaje;
        let mensaje = `Tu nota final es: ${puntajeFinal}. `;
        if (puntajeFinal >= 10) {
            bunnyImg.src = bunnyImages.happy;
            mensaje += "¡Excelente! Has demostrado tu conocimiento, ¡felicitaciones por tu gran resultado!";
            showSpeech(mensaje, 15000);
        } else {
            bunnyImg.src = bunnyImages.sad;
            mensaje += "No te desanimes, ¡podrás hacerlo mejor la próxima vez! Sigue practicando y verás grandes resultados.";
            showSpeech(mensaje, 20000);
        }
        setTimeout(() => {
            bunnyImg.src = bunnyImages.original;
        }, 60000);

        // Enviar resultado al servidor
        try {
            await fetch(API_RESULT, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    puntaje: puntajeFinal,
                    fecha: new Date().toISOString()
                })
            });
        } catch (error) {
            console.error("No se pudo registrar el resultado en el servidor:", error);
        }
    }

    // Exponer función global para mostrar resultado al finalizar
    window.mostrarResultadoBunny = mostrarResultadoBunny;

    // Inicialización automática
    function initializeBunnyEval() {
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', initializeBunnyEval);
            return;
        }
        window.bunnyEvalRefs = createBunnyPet();
        showSaludo();
        startExamPhrases();
        startHappyCycle();
    }

    initializeBunnyEval();
})();