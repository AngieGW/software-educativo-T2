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

    // Historia interactiva: El Viaje del Principito y su Amigo Invisible
    let pages = [
        // Introducción
        {
            title: "Introducción",
            content: "En el vasto universo de las estrellas, un pequeño príncipe viaja con su corazón lleno de sueños. Hoy, tú, querido amigo invisible, eres su compañero en esta travesía. Con cada decisión que tomes, su destino se moldeará. Recuerda siempre: 'Lo esencial es invisible a los ojos'.",
            choices: [
                { text: "Comenzar el viaje", next: 1 }
            ]
        },
        // Capítulo 1: El Encuentro
        {
            title: "Capítulo 1: El Encuentro",
            content: "El Principito había abandonado su asteroide, donde cuidaba amorosamente de una rosa preciosa, y había llegado a un pequeño planeta donde reinaba un rey solitario.\n\n\"¿Debería quedarme aquí, amigo invisible?\", pregunta el Principito. \"Este rey parece tan solo, pero también muy orgulloso.\"",
            choices: [
                { text: "Quédate, tal vez puedas aprender algo del rey.", next: 2 },
                { text: "No te conviertas en súbdito, sigue tu viaje.", next: 3 }
            ]
        },
        // Opción A: Quedarse con el rey
        {
            title: "Lección del Rey",
            content: "El Principito se queda. Aprende que el poder sin amor es vacío. Reflexiona: \"Los adultos olvidan la esencia de las cosas.\"",
            choices: [
                { text: "Continuar el viaje", next: 4 }
            ]
        },
        // Opción B: Seguir el viaje
        {
            title: "Partida del Rey",
            content: "El Principito cuestiona la autoridad y parte hacia nuevas aventuras. Todavía siente una ligera tristeza por el rey.",
            choices: [
                { text: "Continuar el viaje", next: 4 }
            ]
        },
        // Capítulo 2: El Vanidoso
        {
            title: "Capítulo 2: El Vanidoso",
            content: "En su camino, llegó al planeta del Vanidoso, cuya única preocupación eran las alabanzas.\n\n\"¿Qué piensas, amigo? ¿Debería intentar agradarle?\"",
            choices: [
                { text: "Alábale, es lo que desea.", next: 5 },
                { text: "Dile la verdad, quizás eso le ayude a ver más allá de su vanidad.", next: 6 }
            ]
        },
        // Opción A: Alabar al Vanidoso
        {
            title: "Satisfacción Vacía",
            content: "El Vanidoso se siente satisfecho, pero el Principito aprende que algunas personas solo desean admiración, sin importar la autenticidad.",
            choices: [
                { text: "Seguir viajando", next: 7 }
            ]
        },
        // Opción B: Decir la verdad al Vanidoso
        {
            title: "Verdad Difícil",
            content: "El Vanidoso se enfurece, y el Principito comprende que algunas verdades son difíciles de aceptar.",
            choices: [
                { text: "Seguir viajando", next: 7 }
            ]
        },
        // Capítulo 3: El Farolero
        {
            title: "Capítulo 3: El Farolero",
            content: "El siguiente destino es el planeta del Farolero, quien pasa su tiempo encendiendo y apagando su farol, sin descanso.\n\n\"Él parece trabajar muy duro\", dice el Principito. \"Pero, ¿para qué sirve su esfuerzo?\"",
            choices: [
                { text: "Ayúdalo a descansar; todos necesitamos un respiro.", next: 8 },
                { text: "Pregúntale sobre su trabajo, tal vez haya un sentido en ello.", next: 9 }
            ]
        },
        // Opción A: Ayudar al Farolero
        {
            title: "El Valor del Descanso",
            content: "El Farolero agradece la ayuda y el Principito aprende la importancia del descanso y la dedicación simple.",
            choices: [
                { text: "Continuar el viaje", next: 10 }
            ]
        },
        // Opción B: Preguntar sobre su trabajo
        {
            title: "Rutina y Propósito",
            content: "El Farolero explica su rutina, y el Principito reflexiona sobre el propósito frente a la repetición sin sentido.",
            choices: [
                { text: "Continuar el viaje", next: 10 }
            ]
        },
        // Capítulo 4: El Zorro
        {
            title: "Capítulo 4: El Zorro",
            content: "Finalmente, llegan al mundo del Zorro, quien espera pacientemente.\n\n\"Amigo, este Zorro dice que debo domesticarlo. ¿Qué significa eso?\"",
            choices: [
                { text: "Dile que no tienes tiempo para domesticarlo.", next: 11 },
                { text: "Escucha al Zorro, la amistad es valiosa.", next: 12 }
            ]
        },
        // Opción A: No domesticar al Zorro
        {
            title: "Soledad del Zorro",
            content: "El Zorro se aleja triste, y el Principito se siente perdido en su búsqueda de conexiones sinceras.",
            choices: [
                { text: "Reflexionar sobre la rosa", next: 13 }
            ]
        },
        // Opción B: Escuchar al Zorro
        {
            title: "La Amistad Florece",
            content: "Al escuchar al Zorro, el Principito comprende que “uno se vuelve responsable para siempre de lo que ha domesticado”. La amistad florece entre ellos.",
            choices: [
                { text: "Reflexionar sobre la rosa", next: 13 }
            ]
        },
        // Capítulo 5: Reflexiones sobre la Rosa
        {
            title: "Capítulo 5: Reflexiones sobre la Rosa",
            content: "Regresando a su asteroide, el Principito recuerda a su rosa. En su corazón, siente una mezcla de amor y orgullo.\n\n“Amigo, he aprendido tanto. Pero mi rosa también tiene su orgullo. ¿Debería tratar de reconciliarme con ella?”",
            choices: [
                { text: "Ignora su orgullo, vuelve a ella tal como eres.", next: 14 },
                { text: "Habla con ella, cuéntale sobre tus aventuras.", next: 15 }
            ]
        },
        // Opción A: Ignorar el orgullo de la rosa
        {
            title: "Silencio y Pérdida",
            content: "La rosa se siente herida por su silencio y el Principito lucha con un profundo sentimiento de pérdida.",
            choices: [
                { text: "El regreso", next: 16 }
            ]
        },
        // Opción B: Hablar con la rosa
        {
            title: "Crecimiento y Honestidad",
            content: "La rosa escucha atentamente y comprenden que ambos han crecido. Su amor se fortalece a través de la honestidad.",
            choices: [
                { text: "El regreso", next: 16 }
            ]
        },
        // Capítulo 6: El Regreso
        {
            title: "Capítulo 6: El Regreso",
            content: "El momento ha llegado. La serpiente aparece en su camino.\n\n\"¿Volverás a tu asteroide?\" pregunta.",
            choices: [
                { text: "Sí, mi rosa me espera.", next: 17 },
                { text: "No, quiero quedarme en la Tierra con mis amigos.", next: 18 }
            ]
        },
        // Final A: Regreso al asteroide
        {
            title: "Final: El Regreso",
            content: "La serpiente le ayuda a regresar. El Principito se entiende a sí mismo y a su misión: cuidar y amar profundamente.",
            isFinal: true
        },
        // Final B: Quedarse en la Tierra
        {
            title: "Final: Nuevas Amistades",
            content: "El Principito elige vivir en la Tierra, aprendiendo de las amistades que ha forjado. Su perspectiva cambia y se siente más en casa entre los humanos.",
            isFinal: true
        },
        // Epílogo
        {
            title: "Epílogo: El Legado del Principito",
            content: "Y así, querido amigo invisible, el Principito ha recorrido un camino lleno de lecciones, experiencias y emoción. Recuerda que, al final, la verdadera riqueza reside en las conexiones que forjamos en nuestro viaje. Cada elección que hiciste reflejó tu propia esencia y te llevó a un final único. Como dijo el Principito, 'Lo esencial es invisible a los ojos', y cada uno ve diferente según la luz que lleve en su corazón.\n\nEl viaje del Principito continúa, y en tus decisiones reside el poder de cambiar su destino.",
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