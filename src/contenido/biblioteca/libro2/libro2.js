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
            content: "¡Bienvenido, valiente vikingo! En esta aventura te encontrarás en el pueblo de Berk, un lugar donde los dragones son temidos y cazados. Eres un joven vikingo llamado Hiccup, que sueña con cambiar la manera en que los vikingos ven a estas criaturas misteriosas y temibles. Tu viaje está lleno de decisiones, y cada elección que hagas afectará el destino de tu historia. ¡Elige sabiamente!\n\nLa vida en Berk ha sido complicada, especialmente con los dragones atacando las aldeas. Tu padre, el jefe de la tribu, espera que seas como cualquier otro vikingo, fuerte y valiente en la caza de dragones. Sin embargo, tú sientes que hay algo más en estas criaturas. Una noche, tu vida cambiará para siempre.",
            choices: [
                { text: "Comenzar aventura", next: 1 }
            ]
        },
        // Situación Inicial
        {
            title: "Situación Inicial",
            content: "Una noche, después de una feroz batalla con los dragones, decides aventurarte más allá del pueblo para explorar el territorio enemigo. Al caminar por el bosque, te encuentras con un dragón herido atrapado en una trampa.\n\n¿Qué harás?",
            choices: [
                { text: "Ayudar al dragón a escapar", next: 2 },
                { text: "Ignorar al dragón y regresar a casa", next: 8 }
            ]
        },
        // Ayudar al dragón
        {
            title: "Ayudas al dragón",
            content: "Con valentía y compasión, decides ayudar al dragón. Acercándote lentamente, utilizas tus habilidades con herramientas para liberar al dragón sin asustarlo. Cuando lo haces, el dragón te observa con curiosidad. En ese momento, sientes una conexión especial. El dragón, que se presenta como “Desdentado”, no solo sobrevive gracias a ti, sino que también se convierte en tu amigo.",
            choices: [
                { text: "Llevar a Desdentado de regreso a Berk", next: 3 },
                { text: "Entrenar a Desdentado en secreto", next: 5 }
            ]
        },
        // Llevar a Desdentado a Berk
        {
            title: "Desdentado en Berk",
            content: "Cuando regresas a Berk con Desdentado, la reacción no es la que esperabas. La mayoría de los vikingos entran en pánico. Tu padre se enfurece y ordena que el dragón sea capturado. Sin embargo, Desdentado decide demostrarle a todos su bondad volando sobre la aldea y mostrando su belleza.\n\n¿Qué sucede?",
            choices: [
                { text: "Desdentado gana el respeto de los vikingos", next: 4 },
                { text: "Los vikingos atacan a Desdentado", next: 12 }
            ]
        },
        // Final A
        {
            title: "Final A: Protector de Berk",
            content: "Desdentado se convierte en el nuevo protector de Berk, y después de una feroz pelea contra un dragón enemigo, gana el respeto de los vikingos. Tus habilidades y valentía son reconocidas, y cambias la forma en que la aldea ve a los dragones para siempre."
        },
        // Entrenar a Desdentado en secreto
        {
            title: "Entrenas a Desdentado en secreto",
            content: "Durante semanas, entrenas a Desdentado en secreto, aprendiendo todo sobre él. Juntos, descubren que hay grupos de dragones que viven en armonía en las montañas cercanas. Sin embargo, cuando otra invasión de dragones ocurre, tus compañeros vikingos creen que eres un traidor.\n\n¿Qué harás?",
            choices: [
                { text: "Enfrentar a los vikingos y demostrar la verdad", next: 6 },
                { text: "Tus amigos capturan a Desdentado", next: 7 }
            ]
        },
        // Final C
        {
            title: "Final C: Paz en Berk",
            content: "Con la ayuda de Desdentado, decides enfrentar a tus amigos vikingos y demostrarles que los dragones pueden ser aliados. Después de una intensa batalla, logras convencer a la aldea de que la solución no es pelear, sino aprender a convivir. La paz reina en Berk."
        },
        // Final D
        {
            title: "Final D: Rebeldes y libertad",
            content: "Tus amigos se niegan a escuchar y capturan a Desdentado. A pesar de tus esfuerzos, el dragón es llevado a una celda. Sintiéndote impotente, decides unirte a un grupo de vikingos rebeldes que buscan liberar a los dragones y formar un nuevo hogar en la montaña."
        },
        // Ignorar al dragón y regresar a casa
        {
            title: "Ignoras al dragón",
            content: "Al ignorar al dragón herido, regresas a Berk con una sensación de culpa. Pero pronto te das cuenta de que la vida continúa y que debes unirte a la próxima cacería de dragones. Sin embargo, las cosas no son tan simples.\n\n¿Qué harás?",
            choices: [
                { text: "Unirte al grupo de caza de dragones", next: 9 },
                { text: "Quedarte en casa y ayudar a otros vikingos", next: 11 }
            ]
        },
        // Unirte al grupo de caza
        {
            title: "Cacería de dragones",
            content: "En la cacería, te sientes incómodo, cuestionando la forma en que los vikingos tratan a los dragones. Durante la misión, te encuentras con un grupo de feroces dragones y, en medio de la batalla, te topas con otro dragón que parece estar ayudando a los demás.\n\n¿Qué decides?",
            choices: [
                { text: "Liberar a los dragones y cambiar de bando", next: 10 },
                { text: "Enfrentar a tu propio grupo", next: 13 }
            ]
        },
        // Final E
        {
            title: "Final E: Nueva relación con Berk",
            content: "Te das cuenta de que los dragones no son el enemigo, y decides cambiar de bando. Con la ayuda de otros como tú, logras liberar a los dragones capturados, y juntos crean una nueva relación con Berk, transformando la enemistad en amistad."
        },
        // Quedarte en casa
        {
            title: "Ayudas en casa",
            content: "Mientras trabajas en casa, conoces a Astrid, una fuerte guerrera que comparte tus dudas sobre la caza de dragones. Juntos comienzan a investigar las historias sobre dragones y llegan a la conclusión de que no son tan malas como se piensa.\n\n¿Qué harás?",
            choices: [
                { text: "Persuadir a la tribu para la paz", next: 14 },
                { text: "Marcharte de Berk", next: 15 }
            ]
        },
        // Final G
        {
            title: "Final G: Un nuevo capítulo",
            content: "Con la ayuda de Astrid, decides abordar el tema en una reunión de la tribu, donde logran persuadir a algunos vikingos a considerar la paz. Esto da inicio a un nuevo capítulo en Berk, donde vikingos y dragones comienzan a aprender uno del otro."
        },
        // Final H
        {
            title: "Final H: Nuevos horizontes",
            content: "A pesar del coraje de Astrid, la mayoría de los vikingos se muestran reacios a cambiar. Al ver que tus esfuerzos son en vano, te marchas de Berk para buscar nuevas tierras y formas de crear una comunidad pacífica con los dragones."
        },
        // Los vikingos atacan a Desdentado
        {
            title: "Final B: Despedida amarga",
            content: "Los vikingos, llenos de miedo, terminan atacando a Desdentado. Aunque intentas detenerlos, el dragón resulta herido, y te culpabilizas por no entender a tu gente. Desdentado escapa, y te prometes encontrarlo nuevamente."
        },
        // Enfrentar a tu propio grupo
        {
            title: "Final F: Guerra abierta",
            content: "En medio del caos, te ves obligado a enfrentarte a tu propio grupo. Sin embargo, tus amigos no entienden tus motivos y, a pesar de tus intentos de mediar, provocan un conflicto que lleva a una guerra abierta entre vikingos y dragones."
        },
        // Persuadir a la tribu para la paz
        {
            title: "Final G: Un nuevo capítulo",
            content: "Con la ayuda de Astrid, decides abordar el tema en una reunión de la tribu, donde logran persuadir a algunos vikingos a considerar la paz. Esto da inicio a un nuevo capítulo en Berk, donde vikingos y dragones comienzan a aprender uno del otro."
        },
        // Marcharte de Berk
        {
            title: "Final H: Nuevos horizontes",
            content: "A pesar del coraje de Astrid, la mayoría de los vikingos se muestran reacios a cambiar. Al ver que tus esfuerzos son en vano, te marchas de Berk para buscar nuevas tierras y formas de crear una comunidad pacífica con los dragones."
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
            } else if (page.title && page.title.startsWith('Final')) {
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