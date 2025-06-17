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

    // Estructura de la historia con decisiones
    let pages = [
        // Introducción
        {
            title: "Introducción",
            content: "¡Bienvenido al mundo mágico de Barbie y el Cascanueces! En esta historia, tú serás el héroe que tomará decisiones cruciales. Tus elecciones afectarán el desenlace de la aventura, así que elige sabiamente. ¡Comencemos!\n\nEs la víspera de Navidad, y Barbie está a punto de vivir una aventura mágica. En su casa, mientras disfruta de la decoración navideña, un misterioso cascanueces le llama la atención. Cuando lo toca, de repente, se transporta a un mundo encantado lleno de dulces, hadas y un reino en peligro.",
            choices: [
                { text: "Comenzar aventura", next: 1 }
            ]
        },
        // Capítulo 1: El Encuentro Mágico
        {
            title: "Capítulo 1: El Encuentro Mágico",
            content: "Barbie se encuentra en un bosque brillante donde los árboles son de caramelo y el aire huele a canela. Frente a ella, ve dos caminos:\n\n1. El camino de la Dulce Senda: Llena de coloridos dulces y música alegre.\n2. El camino del Bosque Oscuro: Un lugar sombrío y silencioso, donde se siente una extraña energía.\n\n¿Qué camino eliges?",
            choices: [
                { text: "Tomar el camino de la Dulce Senda", next: 2 },
                { text: "Tomar el camino del Bosque Oscuro", next: 5 }
            ]
        },
        // Opción A: Dulce Senda
        {
            title: "Dulce Senda",
            content: "Barbie avanza por la dulce senda, disfrutando de la música y los colores vibrantes. De repente, se encuentra con un grupo de hadas que están preparándose para una gran celebración. Las hadas están preocupadas porque el Rey de los Caramelos ha desaparecido.\n\n¿Qué decides?",
            choices: [
                { text: "Ayudar a las hadas a encontrar al Rey de los Caramelos", next: 3 },
                { text: "Unirte a la celebración sin preocuparte por el rey", next: 4 }
            ]
        },
        // Capítulo 2A: La Búsqueda del Rey
        {
            title: "Capítulo 2A: La Búsqueda del Rey",
            content: "Barbie, junto a las hadas, comienza la búsqueda del Rey de los Caramelos. Siguen una pista de caramelos en forma de huellas. Después de un rato, se encuentran con una puerta mágica custodiada por un guardián.\n\n¿Qué harás?",
            choices: [
                { text: "Utilizar una fórmula mágica que le enseñó una de las hadas", next: 8 },
                { text: "Tratar de persuadir al guardián con dulces", next: 9 }
            ]
        },
        // Capítulo 3A: Fiesta Sin Preocupaciones
        {
            title: "Capítulo 3A: Fiesta Sin Preocupaciones",
            content: "Barbie disfruta de la fiesta, pero un extraño sentimiento de culpa la invade. Al final de la celebración, se da cuenta de que el reino sigue en peligro.\n\n¿Qué decides?",
            choices: [
                { text: "Decidir salir y buscar al Rey de los Caramelos", next: 12 },
                { text: "Permanecer en la fiesta y dejar que otros se encarguen del problema", next: 13 }
            ]
        },
        // Opción B: Bosque Oscuro
        {
            title: "Bosque Oscuro",
            content: "Al entrar en el bosque oscuro, Barbie siente un escalofrío recorrer su espalda. Al avanzar, se encuentra con un misterioso duende que le dice que el reino está bajo el hechizo de una malvada bruja.\n\n¿Qué decides?",
            choices: [
                { text: "Preguntar al duende cómo puedes romper el hechizo", next: 6 },
                { text: "Ignorar al duende y seguir explorando el bosque", next: 7 }
            ]
        },
        // Capítulo 2B: El Hechizo del Duende
        {
            title: "Capítulo 2B: El Hechizo del Duende",
            content: "El duende te explica que el único modo de romper el hechizo es encontrar la Esencia de la Alegría, escondida en el corazón del bosque. Barbie comienza a buscarla con la ayuda del duende.\n\n¿Qué harás?",
            choices: [
                { text: "Seguir las indicaciones del duende a través de un viejo mapa", next: 10 },
                { text: "Explorar el bosque a tu manera", next: 11 }
            ]
        },
        // Capítulo 3B: Ignorando la Advertencia
        {
            title: "Capítulo 3B: Ignorando la Advertencia",
            content: "Barbie sigue caminando y se encuentra con criaturas del bosque que han sido afectadas por la maldición. Se dan cuenta de que necesita hacer algo antes de que sea demasiado tarde.\n\n¿Qué decides?",
            choices: [
                { text: "Unirte a las criaturas para formar un equipo y luchar contra la bruja", next: 14 },
                { text: "Intentar encontrar una salida del bosque sin involucrarte más", next: 15 }
            ]
        },
        // Finales
        {
            title: "Final A: El Reino Salvado",
            content: "Barbie usa la fórmula mágica en la puerta y logra abrirla, encontrando al Rey de los Caramelos. Juntos, logran salvar el reino, y la alegría regresa a todos.",
            isFinal: true
        },
        {
            title: "Final B: Tristeza en el Reino",
            content: "La persuasión con dulces convence al guardián, permitiéndoles entrar. Sin embargo, al no tener la fórmula mágica, no pueden salvar al rey, y el reino queda sumido en la tristeza.",
            isFinal: true
        },
        {
            title: "Final C: El Hechizo Roto",
            content: "Siguiendo el mapa, Barbie encuentra la Esencia de la Alegría y regresa al duende. Ellos juntos rompen el hechizo, trayendo felicidad al reino.",
            isFinal: true
        },
        {
            title: "Final D: Perdida en el Bosque",
            content: "Al explorar a su manera, Barbie se pierde y nunca encuentra la esencia, dejando al reino atrapado en la tristeza eterna.",
            isFinal: true
        },
        {
            title: "Final E: Valentía Inspiradora",
            content: "Al buscar al rey con determinación, Barbie descubre que su valentía inspira a otros, y juntos logran rescatar al Rey de los Caramelos, salvando el reino.",
            isFinal: true
        },
        {
            title: "Final F: Diversión y Derrota",
            content: "Permaneciendo en la fiesta, Barbie se pierde en la diversión y no ayuda al reino, que acaba siendo cautivado por la bruja, perdiendo toda su alegría.",
            isFinal: true
        },
        {
            title: "Final G: Victoria sobre la Bruja",
            content: "Al unirse a las criaturas, Barbie lidera una revuelta contra la bruja, logrando romper el hechizo con valor y amistad.",
            isFinal: true
        },
        {
            title: "Final H: Parte del Bosque Oscuro",
            content: "Al intentar salir del bosque sin involucrarse, Barbie acaba atrapada en la maldición, convirtiéndose en parte del bosque oscuro para siempre.",
            isFinal: true
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

        // Ocultar controles de navegación siempre (no mostrar flechas)
        navigationControls.style.display = 'none';

        // Iniciar animación de texto
        typeWriter(page.content, 0, function() {
            if (page.choices && page.choices.length > 0) {
                const choiceButtons = createChoiceButtons(page.choices);
                typingText.parentNode.appendChild(choiceButtons);
            } else if (page.isFinal) {
                // Mostrar solo el final correspondiente y el botón de finalizar
                const finishBtn = document.createElement('button');
                finishBtn.textContent = 'Finalizar';
                finishBtn.className = 'choice-button';
                finishBtn.style.cssText = `
                    margin-top: 24px;
                    padding: 12px 20px;
                    background: linear-gradient(135deg, #ff6a00 0%, #ee0979 100%);
                    color: white;
                    border: none;
                    border-radius: 8px;
                    cursor: pointer;
                    font-size: 16px;
                    transition: all 0.3s ease;
                    box-shadow: 0 4px 15px rgba(0,0,0,0.2);
                `;
                finishBtn.onclick = function() {
                    window.location.href = '../../biblioteca.html';
                };
                typingText.parentNode.appendChild(finishBtn);
            }
        });
    }

    // Cargar la primera página al iniciar
    loadPage(currentPage);
});