// Mascota Virtual Motivacional - Bunny el Conejo
// Archivo: bunny-pet.js

(function() {
    // Frases motivacionales para el aprendizaje
    const motivationalPhrases = [
        "¡Cada pequeño paso te acerca a tu meta! 🐰",
        "El conocimiento es el tesoro más valioso que puedes acumular ✨",
        "¡Tú puedes lograrlo! La práctica hace al maestro 💪",
        "Cada error es una oportunidad de aprender algo nuevo 🌟",
        "¡Sigue adelante! El progreso es más importante que la perfección",
        "Tu dedicación de hoy será tu éxito de mañana 🚀",
        "¡Creo en ti! Cada día eres más sabio que ayer",
        "El aprendizaje es un viaje, no un destino. ¡Disfrútalo! 🎯",
        "¡Excelente trabajo! Mantén esa curiosidad encendida 🔥",
        "Los grandes logros comienzan con pequeños esfuerzos diarios",
        "¡Nunca te rindas! Cada experto fue una vez un principiante 🌱",
        "Tu mente es como un músculo, entre más la ejercites, más fuerte será",
        "¡Fantástico! Cada pregunta que haces te hace más inteligente",
        "El fracaso es solo el primer intento de aprender algo nuevo",
        "¡Sigue así! La persistencia es la clave del conocimiento 🗝️",
        "Cada libro que lees, cada lección que aprendes, te transforma",
        "¡Eres increíble! Tu potencial no tiene límites 🌈",
        "La educación es el arma más poderosa para cambiar el mundo",
        "¡Confía en el proceso! El aprendizaje toma tiempo pero vale la pena",
        "Hoy es un gran día para aprender algo nuevo. ¡Vamos por ello! ⭐",
        "¡Recuerda! Cada maestro fue estudiante, cada experto comenzó como novato",
        "Tu curiosidad es tu superpoder. ¡Úsala sabiamente! 🦸‍♀️"
    ];

    // Función para crear el botón de la mascota
    function createBunnyButton() {
        // Crear el contenedor principal
        const bunnyContainer = document.createElement('div');
        bunnyContainer.id = 'bunny-container';
        bunnyContainer.style.cssText = `
            position: fixed;
            bottom: 20px;
            right: 20px;
            z-index: 10000;
            font-family: Arial, sans-serif;
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
            bottom: 90px;
            right: 0;
            display: none;
            animation: fadeIn 0.3s ease-in-out;
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

        // Crear el botón de la mascota
        const bunnyButton = document.createElement('button');
        bunnyButton.id = 'bunny-button';
        bunnyButton.innerHTML = `
            <div style="font-size: 32px;">🐰</div>
            <div style="font-size: 10px; margin-top: 2px; color: #666;">Bunny</div>
        `;
        bunnyButton.style.cssText = `
            background: white;
            border: 3px solid #e0e0e0;
            border-radius: 50%;
            width: 80px;
            height: 80px;
            cursor: pointer;
            box-shadow: 0 4px 12px rgba(0,0,0,0.2);
            transition: all 0.3s ease;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            font-family: Arial, sans-serif;
            position: relative;
        `;

        // Efectos hover para el botón
        bunnyButton.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.1)';
            this.style.boxShadow = '0 6px 20px rgba(0,0,0,0.3)';
        });

        bunnyButton.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
            this.style.boxShadow = '0 4px 12px rgba(0,0,0,0.2)';
        });

        // Añadir estilos CSS para la animación
        const style = document.createElement('style');
        style.textContent = `
            @keyframes fadeIn {
                from { opacity: 0; transform: translateY(10px); }
                to { opacity: 1; transform: translateY(0); }
            }
            @keyframes bounce {
                0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
                40% { transform: translateY(-10px); }
                60% { transform: translateY(-5px); }
            }
        `;
        document.head.appendChild(style);

        // Ensamblar los elementos
        bunnyContainer.appendChild(bunnyButton);
        bunnyContainer.appendChild(speechBubble);
        document.body.appendChild(bunnyContainer);

        return { bunnyButton, speechBubble, bunnyContainer };
    }

    // Función para mostrar una frase aleatoria
    function showRandomPhrase(speechBubble, bunnyButton) {
        const randomIndex = Math.floor(Math.random() * motivationalPhrases.length);
        const phrase = motivationalPhrases[randomIndex];
        
        speechBubble.textContent = phrase;
        speechBubble.style.display = 'block';
        
        // Añadir efecto de rebote al conejo
        bunnyButton.style.animation = 'bounce 0.6s ease-in-out';
        
        // Remover la animación después de que termine
        setTimeout(() => {
            bunnyButton.style.animation = '';
        }, 600);
        
        // Ocultar el globo después de 5 segundos
        setTimeout(() => {
            speechBubble.style.display = 'none';
        }, 8000);
    }

    // Función principal para inicializar la mascota
    function initializeBunny() {
        // Esperar a que el DOM esté listo
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', initializeBunny);
            return;
        }

        // Crear los elementos de la mascota
        const { bunnyButton, speechBubble, bunnyContainer } = createBunnyButton();
        
        // Evento click para mostrar nueva frase
        bunnyButton.addEventListener('click', function() {
            showRandomPhrase(speechBubble, bunnyButton);
        });

        // Mostrar frase inicial después de 2 segundos
        setTimeout(() => {
            showRandomPhrase(speechBubble, bunnyButton);
        }, 5000);

        // Mostrar frases automáticamente cada 60 segundos (1 minuto)
        setInterval(() => {
            showRandomPhrase(speechBubble, bunnyButton);
        }, 30000);

        // Mensaje de bienvenida en consola
        console.log('🐰 ¡Bunny está listo para motivarte en tu aprendizaje!');
    }

    // Inicializar cuando se cargue el script
    initializeBunny();
})();