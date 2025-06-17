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
            content: "Has sido aceptado en la Escuela de Magia y Hechicería Hogwarts. Como nuevo estudiante, sientes una mezcla de emoción y nerviosismo. Mientras te preparas para dejar atrás el mundo muggle, un antiguo secreto sobre tu propia identidad comienza a emerger. Lo que no sabes es que esta aventura será mucho más que simplemente aprender magia; será un viaje para descubrir quién eres realmente.",
            choices: [
                { text: "Comenzar aventura", next: 1 }
            ]
        },
        // Capítulo 1: El Sombrero Seleccionador
        {
            title: "Capítulo 1: El Sombrero Seleccionador",
            content: "La primera noche en Hogwarts, después de una cena mágica con tus compañeros de clase, llega el momento crucial: el Sombrero Seleccionador. Sentado en el taburete, el sombrero te susurra al oído. ¿Qué deseas hacer?",
            choices: [
                { text: "Responderle al sombrero sobre tus aspiraciones", next: 2 },
                { text: "Pedirle al sombrero que te ayude a encontrar tu lugar", next: 3 }
            ]
        },
        // Opción 1: Gryffindor
        {
            title: "Gryffindor: El valor ante todo",
            content: "El sombrero escucha tus palabras con atención. Te clasifica en Gryffindor, donde los valientes se hacen leyenda. Sin embargo, sientes que la presión de ser un héroe puede ser abrumadora.",
            choices: [
                { text: "Continuar", next: 4 }
            ]
        },
        // Opción 2: Hufflepuff
        {
            title: "Hufflepuff: La amistad primero",
            content: "El sombrero lo piensa con cuidado y, al final, decides ser parte de Hufflepuff, donde la lealtad y la amistad son valoradas por encima de todo. Sientes un alivio inmediato al saber que no tienes que luchar solo.",
            choices: [
                { text: "Continuar", next: 4 }
            ]
        },
        // Capítulo 2: La primera misión
        {
            title: "Capítulo 2: La primera misión",
            content: "Tras la selección, recibes un mensaje misterioso que te invita a una reunión secreta en el bosque prohibido. Sabes que esto podría ser peligroso, pero también puede ser tu oportunidad para hacer amigos y descubrir secretos. ¿Qué harás?",
            choices: [
                { text: "Ir al encuentro en el bosque", next: 5 },
                { text: "Ignorar el mensaje y quedarte en el castillo", next: 8 }
            ]
        },
        // Opción 1: Ir al bosque
        {
            title: "Bosque Prohibido: El reto mágico",
            content: "Te adentras en el bosque y, al llegar, descubres a un grupo de estudiantes de diferentes casas planeando una aventura que pondrá a prueba su magia. Pero, de repente, una criatura mágica aparece y comienza a atacar. ¿Qué harás?",
            choices: [
                { text: "Usar un hechizo de protección", next: 6 },
                { text: "Enfrentar valientemente a la criatura", next: 7 }
            ]
        },
        // Opción 1a: Hechizo de protección
        {
            title: "Hechizo de protección",
            content: "Logras conjurar un hechizo que desvía la atención de la criatura, permitiendo que todos escapen, pero te das cuenta de que tus habilidades aún deben mejorar.",
            choices: [
                { text: "Continuar", next: 10 }
            ]
        },
        // Opción 1b: Enfrentar a la criatura
        {
            title: "Valentía frente al peligro",
            content: "Decides enfrentarte a ella. Con un movimiento audaz y un rápido hechizo, logras asustarla y salvar a tus amigos. Tu valentía es reconocida, pero el riesgo fue alto.",
            choices: [
                { text: "Continuar", next: 10 }
            ]
        },
        // Opción 2: Ignorar el mensaje
        {
            title: "Una noche tranquila",
            content: "Decides quedarte y disfrutar de una noche tranquila con tus compañeros. Durante la cena, escuchas rumores sobre la criatura que atacó a un grupo de estudiantes y te das cuenta de que has evitado un peligro, pero te sientes un poco fuera del círculo.",
            choices: [
                { text: "Continuar", next: 10 }
            ]
        },
        // Capítulo 3: El Misterio del Pasillo Prohibido
        {
            title: "Capítulo 3: El Misterio del Pasillo Prohibido",
            content: "Después de tu primera experiencia en el bosque, las charlas sobre lugares misteriosos de Hogwarts comienzan a circular. Se dice que hay un pasillo prohibido que guarda un secreto ancestral. ¿Qué harás con esta información?",
            choices: [
                { text: "Investigar el pasillo prohibido", next: 11 },
                { text: "Advertir a tus compañeros sobre el pasillo", next: 14 }
            ]
        },
        // Opción 1: Investigar el pasillo
        {
            title: "El pasillo prohibido",
            content: "Con valentía, decides explorar el pasillo. Al entrar, descubres una habitación llena de objetos mágicos antiguos, pero también un hechizo protector que activas accidentalmente. Un holograma te habla y revela más sobre tu historia familiar. ¿Qué harás?",
            choices: [
                { text: "Escuchar lo que el holograma tiene que decir", next: 12 },
                { text: "Intentar desactivar el hechizo", next: 13 }
            ]
        },
        // Opción 1a: Escuchar al holograma
        {
            title: "El linaje mágico",
            content: "El holograma revela que tienes un linaje mágico muy poderoso, lo cual añade peso a tu viaje en Hogwarts. Esto cambia totalmente tu percepción de ti mismo/a.",
            choices: [
                { text: "Final", next: 17 }
            ]
        },
        // Opción 1b: Desactivar el hechizo
        {
            title: "Oportunidad perdida",
            content: "Desactivas el hechizo, pero eso causa que el holograma se disipe. Te sientes decepcionado/a por no haber descubierto más, aunque todavía sientes que has aprendido algo valioso.",
            choices: [
                { text: "Final", next: 17 }
            ]
        },
        // Opción 2: Advertir a los compañeros
        {
            title: "La fuerza de la amistad",
            content: "Compartes la nueva información con tus amigos, y juntos deciden que investigar el pasillo como grupo puede ser más seguro. Esta decisión fortalece vuestra amistad y crea un lazo más fuerte entre ustedes, mientras descubren que el pasillo tiene historias que deben ser contadas.",
            choices: [
                { text: "Final", next: 18 }
            ]
        },
        // Finales
        {
            title: "Final: El Buscador de Verdad",
            content: "Si decidiste investigar en solitario, pero aprendiste sobre tu historia, te encuentras en un camino de autodescubrimiento. Comprendes que la verdadera magia viene del conocimiento y la autoconfianza. Tu viaje en Hogwarts no solo ha sido una búsqueda de poder y conocimiento, sino también un camino para descubrir quién eres. La magia de la decisión está en tus manos.",
            isFinal: true
        },
        {
            title: "Final: El Protector Leal",
            content: "Si elegiste proteger a tus amigos y fomentar la camaradería, te conviertes en un miembro querido de tu casa, siempre dispuesto/a a ayudar y enseñar a otros. Tu legado es la amistad y la lealtad. La magia de la decisión está en tus manos.",
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