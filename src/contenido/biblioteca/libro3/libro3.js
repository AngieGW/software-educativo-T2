document.addEventListener('DOMContentLoaded', function() {
    // Toggle menú móvil
    const menuToggle = document.querySelector('.menu-toggle');
    const sideMenu = document.querySelector('.side-menu');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            sideMenu.classList.toggle('active');
        });
    }
    
    // Elementos de la página
    const typingText = document.getElementById('typing-text');
    const pageTitle = document.querySelector('h1');
    const progressFill = document.querySelector('.progress-fill');
    const navigationControls = document.querySelector('.navigation-controls');

    // Historia interactiva: La Princesa Cisne
    let pages = [
        // Introducción
        {
            title: "Introducción",
            content: "Te encuentras en un reino mágico. Este lugar está lleno de castillos imponentes, bosques encantados y secretos antiguos. Eres un joven noble, invitado a la corte real del Reino del Lago por un giro del destino.\n\nEn este reino vive una princesa tan hermosa como la luna y tan libre como un cisne. Su nombre es Odette. Sin embargo, algo oscuro acecha en las sombras. Tu llegada marcará el inicio de eventos que cambiarán el destino del reino... y el tuyo.\n\nLa historia comienza mientras viajas en un carruaje hacia el castillo del rey William. Frente a ti se alzan las torres del castillo reflejadas en las aguas cristalinas del lago. Cuando llegas, sabes que este no será un viaje común y corriente. Es hora de tomar tu primera decisión.",
            choices: [
                { text: "Continuar", next: 1 }
            ]
        },
        // Capítulo 1: La Llegada al Castillo
        {
            title: "Capítulo 1: La Llegada al Castillo",
            content: "El carruaje cruza el puente levadizo. El cochero detiene el vehículo y te ayuda a bajar. Observas dos caminos ante ti. Uno lleva al salón principal. El otro serpentea hacia los jardines reales.\n\n¿Qué harás?",
            choices: [
                { text: "Ir al salón principal y presentarte a la corte", next: 2 },
                { text: "Explorar los jardines antes de entrar", next: 5 }
            ]
        },
        // A. Presentarte en la corte
        {
            title: "La Corte Real",
            content: "Decides entrar directamente al salón principal. El rey William te recibe con una sonrisa cálida. La corte murmura mientras te presentas. La princesa Odette hace su aparición poco después.\n\nSu cabello dorado y ojos brillantes captan tu atención de inmediato. Hay algo magnético en su presencia. Durante la cena, te enteras de que está comprometida con el príncipe Derek. Sin embargo, notas en su mirada que no todo es lo que parece.",
            choices: [
                { text: "Hablar con Odette en privado después de la cena", next: 3 },
                { text: "Quedarte al margen y observar los eventos", next: 4 }
            ]
        },
        // A1. Hablar con Odette en privado
        {
            title: "Encuentro Privado",
            content: "Buscas a Odette después de la cena. En un rincón tranquilo, logras hablar con ella. Odette parece agradecida por tu interés y te confiesa que no es feliz con su compromiso. Sientes que puedes confiar en ella y que ella también confía en ti.",
            choices: [
                { text: "Continuar", next: 8 }
            ]
        },
        // A2. Quedarte al margen
        {
            title: "Observador Silencioso",
            content: "Decides mantenerte al margen y observar. Notas que Odette parece inquieta y evita la mirada del príncipe Derek. Percibes tensión en el ambiente y te preguntas qué secretos esconde la corte.",
            choices: [
                { text: "Continuar", next: 8 }
            ]
        },
        // B. Explorar los jardines
        {
            title: "Jardines y Secretos",
            content: "Te adentras en los jardines, dejando atrás el bullicio del castillo. Las flores emanan un aroma dulce. Caminando, encuentras un lago escondido, rodeado de juncos.\n\nDe repente, un cisne aparece. Sus movimientos son elegantes y gráciles. Pero hay algo extraño en su mirada, algo humano. Antes de acercarte, escuchas pasos detrás de ti. Es Odette. Ella parece nerviosa y te pide que no le cuentes a nadie sobre el cisne.",
            choices: [
                { text: "Prometerle guardar el secreto", next: 6 },
                { text: "Preguntarle por qué está tan preocupada", next: 7 }
            ]
        },
        // B1. Prometer guardar el secreto
        {
            title: "Promesa en el Lago",
            content: "Le prometes a Odette que guardarás el secreto. Ella suspira aliviada y te agradece. Sientes que has ganado su confianza y que hay mucho más por descubrir.",
            choices: [
                { text: "Continuar", next: 8 }
            ]
        },
        // B2. Preguntar por qué está preocupada
        {
            title: "Confesión en el Jardín",
            content: "Le preguntas a Odette por qué está tan preocupada. Ella duda, pero finalmente te confiesa que el cisne es parte de un secreto muy peligroso. Te pide que la ayudes, pero que seas discreto.",
            choices: [
                { text: "Continuar", next: 8 }
            ]
        },
        // Capítulo 2: Misterios del Lago
        {
            title: "Capítulo 2: Misterios del Lago",
            content: "Odette comienza a confiar en ti. Te revela un secreto que te deja atónito. Por las noches, está bajo un hechizo que la transforma en cisne. Este maleficio fue lanzado por Rothbart, un hechicero desterrado que busca controlar el reino.\n\nEl hechizo solo puede romperse con un juramento de amor verdadero. Sin embargo, hay riesgos. Rothbart es poderoso y manipulador. Dependerá de tus acciones decidir cómo enfrentar esta amenaza.",
            choices: [
                { text: "Ayudar a Odette a romper el hechizo", next: 9 },
                { text: "Informar al rey sobre lo que has descubierto", next: 12 }
            ]
        },
        // C. Ayudar a Odette
        {
            title: "Aliados en la Corte",
            content: "Te comprometes a ayudar a Odette. Juntos elaboran un plan. Ella confía en que puedes ser la clave para romper el hechizo.\n\nBuscan aliados en la corte que puedan enfrentarse a Rothbart. Cada conversación y decisión pone a prueba tu ingenio. Los aliados no son fáciles de convencer. Algunos dudan de ti, mientras otros temen el poder del hechicero.",
            choices: [
                { text: "Insistir en buscar aliados en la corte", next: 10 },
                { text: "Enfrentarte a Rothbart solo con Odette", next: 11 }
            ]
        },
        // C1. Insistir en buscar aliados
        {
            title: "El Valor de la Amistad",
            content: "Insistes en buscar aliados. Con esfuerzo, logras convencer a algunos miembros de la corte y al príncipe Derek. Juntos, forman un grupo decidido a enfrentar a Rothbart y salvar a Odette.",
            choices: [
                { text: "Confesar tu amor por Odette antes de la batalla final", next: 16 },
                { text: "Sacrificarte para salvar a Odette", next: 17 }
            ]
        },
        // C2. Enfrentarte solo con Odette
        {
            title: "Duelo en la Oscuridad",
            content: "Decides enfrentarte a Rothbart solo con Odette. La batalla es dura y peligrosa. Sin aliados, el riesgo es mayor y el desenlace incierto.",
            choices: [
                { text: "Confesar tu amor por Odette antes de la batalla final", next: 16 },
                { text: "Sacrificarte para salvar a Odette", next: 17 }
            ]
        },
        // D. Informar al rey
        {
            title: "La Verdad ante el Rey",
            content: "Decides informar al rey William. Le cuentas todo lo que sabes sobre el hechizo y Rothbart. El rey escucha con atención, pero tu decisión tiene consecuencias.\n\nOrdena a sus guardias que capturen al hechicero. Sin embargo, Rothbart se anticipa y utiliza su magia para escapar. Esto desata una batalla en el castillo. Por otro lado, Odette se siente traicionada. Habías prometido guardar su secreto.",
            choices: [
                { text: "Intentar disculparte con Odette y recuperar su confianza", next: 14 },
                { text: "Enfocarte en derrotar a Rothbart, dejando de lado sus sentimientos", next: 15 }
            ]
        },
        // D1. Disculparte con Odette
        {
            title: "Redención Difícil",
            content: "Intentas disculparte con Odette y recuperar su confianza. Aunque ella duda, finalmente acepta tu ayuda para enfrentar a Rothbart junto al príncipe Derek.",
            choices: [
                { text: "Ayudar a Derek a enfrentar a Rothbart", next: 18 }
            ]
        },
        // D2. Enfocarte en derrotar a Rothbart
        {
            title: "Batalla sin Sentimientos",
            content: "Decides enfocarte en derrotar a Rothbart, dejando de lado los sentimientos de Odette. La batalla es intensa, pero la distancia emocional entre tú y Odette es evidente.",
            choices: [
                { text: "Ayudar a Derek a enfrentar a Rothbart", next: 18 }
            ]
        },
        // Capítulo 3: El Confrontamiento Final
        // Final 1: Amor Verdadero
        {
            title: "Final 1: Amor Verdadero",
            content: "Confiesas tu amor por Odette antes de la batalla final. Este acto de amor verdadero rompe el hechizo. Rothbart, debilitado, pierde su poder.\n\nCon la ayuda del príncipe Derek, logras derrotarlo. Odette queda libre. El reino celebra tu valentía y el vínculo que has forjado con la princesa."
        },
        // Final 2: Sacrificio Heroico
        {
            title: "Final 2: Sacrificio Heroico",
            content: "Durante la batalla, comprendes que solo un sacrificio puede salvar a Odette. Te enfrentas a Rothbart, sabiendo que esto podría costarte la vida.\n\nTu valentía inspira a los demás. Aunque pierdes la vida, el hechizo se rompe. Odette llora tu pérdida, pero tu sacrificio será recordado por siempre."
        },
        // D1/D2: Ayudar a Derek a enfrentar a Rothbart (Final 3)
        {
            title: "Final 3: Traición y Redención",
            content: "Si elegiste informar al rey sin el consentimiento de Odette, ella pierde la confianza en ti. Sin embargo, encuentras una forma de redimirte.\n\nAyudas al príncipe Derek a enfrentar a Rothbart. Aunque el hechizo se rompe, tu relación con Odette queda marcada por la desconfianza. El reino está a salvo, pero el amor verdadero no florece."
        },
        // Final 4: Derrota
        {
            title: "Final 4: Derrota",
            content: "Si tomaste decisiones imprudentes o no lograste unir suficientes aliados, Rothbart gana. Odette permanece bajo su hechizo. El reino cae en la oscuridad. Tu historia termina como una advertencia de que cada decisión cuenta."
        }
    ];

    let currentPage = 0;

    // Función para simular efecto de escritura
    function typeWriter(text, i, callback) {
        if (i < text.length) {
            typingText.innerHTML += text.charAt(i);
            const progress = Math.floor((i / text.length) * 100);
            updateProgressBar(progress);
            setTimeout(function() {
                typeWriter(text, i + 1, callback);
            }, 20);
        } else if (callback) {
            updateProgressBar(100);
            setTimeout(callback, 400);
        }
    }

    // Actualizar la barra de progreso
    function updateProgressBar(percent) {
        progressFill.style.width = percent + '%';
    }

    // Crear botones de elección
    function createChoiceButtons(choices) {
        const choiceContainer = document.createElement('div');
        choiceContainer.className = 'choice-container';
        choiceContainer.style.cssText = `
            margin-top: 20px;
            display: flex;
            flex-direction: column;
            gap: 10px;
        `;
        choices.forEach(choice => {
            const button = document.createElement('button');
            button.textContent = choice.text;
            button.className = 'choice-button';
            button.style.cssText = `
                padding: 12px 20px;
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                color: white;
                border: none;
                border-radius: 8px;
                cursor: pointer;
                font-size: 16px;
                transition: all 0.3s ease;
                box-shadow: 0 4px 15px rgba(0,0,0,0.2);
            `;
            button.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-2px)';
                this.style.boxShadow = '0 6px 20px rgba(0,0,0,0.3)';
            });
            button.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0)';
                this.style.boxShadow = '0 4px 15px rgba(0,0,0,0.2)';
            });
            button.addEventListener('click', function() {
                currentPage = choice.next;
                loadPage(currentPage);
            });
            choiceContainer.appendChild(button);
        });
        return choiceContainer;
    }

    // Cargar la página actual
    function loadPage(pageIndex) {
        typingText.innerHTML = '';
        // Eliminar botones de elección anteriores
        const oldChoices = document.querySelector('.choice-container');
        if (oldChoices) oldChoices.remove();

        // Actualizar contenido
        const page = pages[pageIndex];
        pageTitle.textContent = page.title || "Historia Interactiva";

        // Ocultar controles de navegación si hay elecciones
        if (page.choices && page.choices.length > 0) {
            navigationControls.style.display = 'none';
        } else {
            navigationControls.style.display = 'flex';
        }

        // Iniciar animación de texto
        typeWriter(page.content, 0, function() {
            if (page.choices && page.choices.length > 0) {
                const choiceButtons = createChoiceButtons(page.choices);
                typingText.parentNode.appendChild(choiceButtons);
            }
        });
    }

    // Botones de navegación
    const prevButton = document.querySelector('.prev-button');
    const nextButton = document.querySelector('.next-button');

    if (prevButton && nextButton) {
        prevButton.addEventListener('click', function() {
            if (currentPage > 0) {
                currentPage--;
                loadPage(currentPage);
            }
        });
        nextButton.addEventListener('click', function() {
            if (currentPage < pages.length - 1) {
                currentPage++;
                loadPage(currentPage);
            }
        });
    }

    // Cargar la primera página al iniciar
    loadPage(currentPage);
});