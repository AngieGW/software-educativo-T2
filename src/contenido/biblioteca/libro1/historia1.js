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
        // Capítulo 1
        {
            title: "Capítulo 1: El búho mensajero",
            content: "Un búho entra volando por la ventana con una carta en el pico. ¿Qué harás?",
            choices: [
                { text: "A) Tratar de espantarlo", next: 1 },
                { text: "B) Tratar de acercarte", next: 2 }
            ]
        },
        {
            title: "Capítulo 1: El búho reacciona",
            content: "El búho aletea y vuela hacia Iván, soltando la carta y volando en círculos por la habitación.",
            // Continúa la historia...
        },
        {
            title: "Capítulo 1: El acercamiento",
            content: "Te acercas con cuidado, como en la historia original. El búho deja la carta a tus pies.",
            // Continúa la historia...
        },
        // Capítulo 2
        {
            title: "Capítulo 2: El cuarto del primo",
            content: "Ignoras a Dudley y te acercas a la habitación para investigar el ruido.",
            // Continúa la historia...
        },
        // Capítulo 5
        {
            title: "Capítulo 5: La Sra. Weasley",
            content: "La Sra. Weasley te pregunta qué quieres hacer.",
            choices: [
                { text: "A) Preguntar por las varitas mágicas", next: 5 },
                { text: "B) Dejar que la Sra. te guíe por el lugar", next: 6 }
            ]
        },
        {
            title: "Capítulo 5: Varitas mágicas",
            content: "Le preguntas por las varitas mágicas y te muestra algunas curiosidades.",
        },
        {
            title: "Capítulo 5: Recorrido guiado",
            content: "Dejas que la Sra. Weasley te guíe por el lugar y te cuenta historias mágicas.",
        },
        // Capítulo 9
        {
            title: "Capítulo 9: King's Cross",
            content: "Estás en la estación King's Cross con Harry y Ron.",
            choices: [
                { text: "A) Dejar que Harry y Ron se estrellen contra la columna", next: 8 },
                { text: "B) Correr con ellos", next: 9 }
            ]
        },
        {
            title: "Capítulo 9: El choque",
            content: "Harry y Ron se estrellan contra la columna. ¡Qué desastre!",
        },
        {
            title: "Capítulo 9: Corres con ellos",
            content: "Corres junto a ellos y atraviesan la barrera juntos.",
        },
        // Capítulo 10
        {
            title: "Capítulo 10: Apoyo a Harry",
            content: "Respaldas a Harry sobre lo sucedido en King's Cross, pero sin éxito.",
        },
        // Mini decisión: Sombrero seleccionador
        {
            title: "El sombrero seleccionador",
            content: "¿Estás satisfecho con pertenecer a Ravenclaw? El sombrero te interrumpe antes de responder.",
        },
        // Capítulo 14
        {
            title: "Capítulo 14: Colin en el comedor",
            content: "Ves a Colin en el comedor.",
            choices: [
                { text: "A) Preguntarle a Colin si quiere que le presente a Harry Potter", next: 13 }
            ]
        },
        {
            title: "Capítulo 14: Presentación",
            content: "Colin se emociona y acepta conocer a Harry.",
        },
        // Capítulo 20
        {
            title: "Capítulo 20: Sueño de Iván",
            content: "En tu sueño, desenfundas la varita para atacar a Riddle.",
        },
        // Capítulo 22
        {
            title: "Capítulo 22: Pelea en el campo",
            content: "Estás en medio de una pelea.",
            choices: [
                { text: "A) Usar las bombas fétidas (correcta)", next: 16 },
                { text: "B) Escapar", next: 17 }
            ]
        },
        {
            title: "Capítulo 22: Bombas fétidas",
            content: "Usas las bombas fétidas y logras salir de la situación.",
        },
        {
            title: "Capítulo 22: Escapar",
            content: "Intentas escapar, pero la situación se complica.",
        },
        // Pelea con Zabini
        {
            title: "Pelea con Zabini",
            content: "Te enfrentas a Zabini.",
            choices: [
                { text: "A) Golpearlo", next: 19 },
                { text: "B) Usar hechizo", next: 20 }
            ]
        },
        {
            title: "Pelea con Zabini: Golpe",
            content: "Lo golpeas, pero la pelea se intensifica.",
        },
        {
            title: "Pelea con Zabini: Hechizo",
            content: "Intentas usar un hechizo, pero terminan tirando tu varita y peleando a puño.",
        },
        // Capítulo 32: Bludger descontrolada
        {
            title: "Capítulo 32: Bludger descontrolada",
            content: "Dices a los jugadores que te encargarás de la bludger embrujada.",
            choices: [
                { text: "A) Gritar a Dobby que pare", next: 22 },
                { text: "B) Lanzar hechizo estupefacto", next: 23 }
            ]
        },
        {
            title: "Capítulo 32: Gritas a Dobby",
            content: "Le gritas a Dobby, pero no te escucha y decides sacar tu varita.",
        },
        {
            title: "Capítulo 32: Hechizo estupefacto",
            content: "Lanzas el hechizo para distraer al elfo.",
        },
        // Capítulo 33: Lockhart y la enfermería
        {
            title: "Capítulo 33: Lockhart",
            content: "Rápido sacas la varita para proteger a Harry.",
        },
        {
            title: "Capítulo 33: Dobby y explicaciones",
            content: "Comentas sobre haber visto a Dobby. Interrogas al elfo sobre el partido.",
        },
        {
            title: "Capítulo 33: ¡¡PROTEGO!!",
            content: "¡¡PROTEGO!! Gritas alzando la varita. Mientras huyen, preguntas: '¿Fue Malfoy?' El elfo revela que sirve a la familia Malfoy.",
        },
        // Capítulo 52: Basilisco en Hogwarts
        {
            title: "Capítulo 52: Basilisco en Hogwarts",
            content: "Te colocas rápidamente junto a Snape y sacas tu varita.",
            choices: [
                { text: "A) Atacar al cuerpo", next: 28 }
            ]
        },
        {
            title: "Capítulo 52: Ataque al basilisco",
            content: "Atacas al cuerpo y luego usas un hechizo para cegarlo.",
        },
        // Capítulo 53: Basilisco loco
        {
            title: "Capítulo 53: Basilisco loco",
            content: "Te cubres junto a Hermione. Tratas de distraer al basilisco para que no ataque a Ginny, pero fallas y sigues con el lore.",
        },
        {
            title: "Capítulo 53: Caja musical",
            content: "Abres la caja musical y el sonido de un cacareo envuelve la sala, sorprendiendo a Riddle.",
        },
        // Capítulo 54: Persecución
        {
            title: "Capítulo 54: Persecución",
            content: "Ves que Harry va tras Ron.",
            choices: [
                { text: "A) Seguir a Harry", next: 32 },
                { text: "B) Saltar para agarrarte a Ron", next: 33 }
            ]
        },
        {
            title: "Capítulo 54: Sigues a Harry",
            content: "Sigues a Harry y ves que ambos ayudan a Ron.",
        },
        {
            title: "Capítulo 54: Saltas a Ron",
            content: "Saltas para agarrarte a Ron y ves que Harry hizo lo mismo.",
        },
        // Luego del viaje en basilisco
        {
            title: "Después del viaje en basilisco",
            content: "Todo está muy oscuro, así que decides alumbrar con tu varita.",
        },
        // Capítulo 57: ¿Muerte?
        {
            title: "Capítulo 57: ¿Muerte?",
            content: "Te presentas ante el desconocido. Luego de presentarte, eres sincero y cuentas tu historia.",
        },
        // Capítulo 65: Dobby
        {
            title: "Capítulo 65: Dobby",
            content: "Le preguntas a Dobby qué hará ahora y le ofreces trabajar para la magia de Hogwarts.",
        },
        // ALOMANTE JACK LECTURA INTERACTIVA
        {
            title: "Jack - Página 152",
            content: "Jack comienza a redactar la carta de esta semana. (Descripción de los koloss ligeramente cambiada)",
        },
        {
            title: "Jack - Página 153",
            content: "El terrisano se llama Handerym. Los alomantes son conocidos por tener habilidades mágicas luego de ingerir metales. Recuerdas el compartimiento en tus zapatos y decides revisar.",
        },
        {
            title: "Jack - Página 154",
            content: "Revisas la cueva en busca de algo que pueda ayudarte a escapar.",
        },
        {
            title: "Jack - Página 155",
            content: "Le preguntas a Lyndip por qué te capturaron. Ves una naciente y decides saltar.",
        },
        {
            title: "Jack - Página 156",
            content: "Finaliza la primera carta y empieza otra, dando a entender que pasó un tiempo desde que escribiste la primera y saltaste al agua.",
        },
        {
            title: "Jack - Página 157",
            content: "Descripción de los koloss custodios del manantial corregida.",
        },
        {
            title: "Jack - Página 158",
            content: "El mayordomo se llama Handerym. Preguntas por la hija del que te desafió.",
        },
        {
            title: "Jack - Página 159",
            content: "Buscas algo pesado que sirva como ancla. Ya en el fondo, buscas rápidamente en los alrededores del cofre tratando de abrirlo.",
        },
        {
            title: "Jack - Página 163",
            content: "Luego de que Elizandra mencionara la distracción de los koloss, deciden escapar lo más rápido posible del lugar. Le pides el cofre para examinarlo, desencadenando el diálogo original.",
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
