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

    // Historia interactiva: El Caballero de la Armadura Oxidada
    let pages = [
        // Introducción
        {
            title: "Introducción",
            content: "Imagina por un momento que te encuentras frente a un caballero en armadura, pero no es cualquier caballero; es aquel que ha vivido atrapado en su propia coraza, el famoso Caballero de la Armadura Oxidada. Te observa con ojos llenos de anhelo y desesperación. Hoy tendrás la oportunidad de acompañarlo en su viaje de autodescubrimiento, aprender junto a él y tomar decisiones que definirán el rumbo de su historia. Al final, descubrirás una lección importante, dependiendo de las elecciones que hagas. Prepárate para adentrarte en una aventura donde cada acción cuenta.",
            choices: [
                { text: "Comenzar la aventura", next: 1 }
            ]
        },
        // Capítulo 1: El Encuentro
        {
            title: "Capítulo 1: El Encuentro",
            content: "Te encuentras en un bosque frondoso, el sol brilla tímidamente entre las ramas de los árboles. A lo lejos, puedes escuchar el sonido de alguien acudiendo en tu dirección. Es el Caballero de la Armadura Oxidada, golpeando su armadura con cada paso. Cuando llega a ti, se presenta:\n\n\"Soy el Caballero de la Armadura Oxidada. He pasado mi vida luchando y defendiendo mis ideales, pero he olvidado lo que es realmente importante: quién soy en verdad. ¿Quieres ayudarme en mi búsqueda?\"",
            choices: [
                { text: "Acompañar al Caballero", next: 2 },
                { text: "Despedirte y seguir tu camino", next: 10 }
            ]
        },
        // Opción A: Acompañar al Caballero
        {
            title: "Comienza la Travesía",
            content: "El Caballero sonríe agradecido y juntos comienzan su travesía. A medida que caminan, él comparte historias sobre su vida. Habla de batallas ganadas y enemigos derrotados, pero también de la soledad que siente detrás de su armadura.\n\nPronto surge una nueva decisión: ¿Quieres ayudar al Caballero a quitarse la armadura o prefieres dejarlo continuar con ella?",
            choices: [
                { text: "Ayudarlo a quitarse la armadura", next: 3 },
                { text: "Dejarlo continuar con su armadura", next: 6 }
            ]
        },
        // Opción A1: Ayudar a Quitarse la Armadura
        {
            title: "Quitando la Armadura",
            content: "Con esfuerzo y paciencia, comienzas a desabrochar las piezas de la armadura. Se siente ligero a medida que cada sección cae al suelo, pero a la vez vulnerable. \"¿Quién soy sin mi armadura?\", pregunta. En este momento, él comienza a comprender que su identidad no está definida por su apariencia o sus logros.\n\nMientras continúa su viaje, se encuentra con un lago cristalino. La imagen del Caballero reflejada en el agua es casi irreconocible. Se da cuenta de que su esencia verdadera está oculta bajo su capa de hierro.",
            choices: [
                { text: "Saltar al agua para purificarse", next: 4 },
                { text: "Ignorar la invitación del lago", next: 5 }
            ]
        },
        // Opción A1a: Saltar al Agua
        {
            title: "Renovación en el Lago",
            content: "El agua es fría, revitalizante. Sumergido, sientes como si las penas y pesares de años se estuvieran lavando. Al salir, el Caballero sonríe, sintiéndose renovado. “He dejado parte de mi carga atrás.”",
            isFinal: true
        },
        // Opción A1b: Ignorar la Invitación del Lago
        {
            title: "El Peso de la Duda",
            content: "El Caballero decide no acercarse al agua. A pesar de estar más ligero, sigue sintiendo el peso de su armadura emocional. “Quizás, algún día”, dice con tristeza.",
            isFinal: true
        },
        // Opción B: Dejarlo Continuar con su Armadura
        {
            title: "El Encuentro con el Sabio",
            content: "El Caballero, decidido a seguir con su pesada armadura, se muestra reacio a cambiar. Sin embargo, mientras avanzan, se encuentran con un anciano sabio que les ofrece consejo.\n\n“Un caballero puede luchar sin armadura, pero no puede hacerlo sin corazón”, dice el anciano.",
            choices: [
                { text: "Escuchar al anciano", next: 7 },
                { text: "Ignorar al anciano y seguir su camino", next: 8 }
            ]
        },
        // Opción B1: Escuchar al Anciano
        {
            title: "Reflexión y Cambio",
            content: "El caballero presta atención y reflexiona sobre sus palabras. Así, empieza a entender que su valor no proviene de la armadura, sino de sus acciones y de cómo trata a los demás. Decide que es hora de abrirse emocionalmente a los demás, retirando poco a poco la armadura del alma.",
            isFinal: true
        },
        // Opción B2: Ignorar al Anciano
        {
            title: "Soledad en el Camino",
            content: "El Caballero, confiado en su propia sabiduría, ignora el consejo del anciano. Continúa su camino, convencido de que su armadura lo protegerá siempre, pero en su corazón, algo le falta.",
            isFinal: true
        },
        // Opción B: Despedirte y seguir tu camino (final alternativo)
        {
            title: "Decisión de no participar",
            content: "No quisiste participar en esta aventura. Recuerda que ayudar a otros es importante y que cada oportunidad de acompañar a alguien en su viaje puede enseñarnos mucho sobre nosotros mismos. Aprendamos a no dejar pasar la oportunidad de apoyar y crecer junto a los demás.",
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