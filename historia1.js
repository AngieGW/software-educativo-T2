document.addEventListener('DOMContentLoaded', function() {
    // Toggle menú móvil
    const menuToggle = document.querySelector('.menu-toggle');
    const sideMenu = document.querySelector('.side-menu');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            sideMenu.classList.toggle('active');
        });
    }
    
    // Configuración de páginas
    let currentPage = 0;
    const pages = [
        {
            // Esto de titulo es lo que se mostrara en la barra verde. Seria titulo del libro
            title: "TEMA - Página 1",
            content: "Contenido de la historia, que se va contando poco a poco. Esta es una narrativa que aparecerá con efecto de escritura, como si alguien estuviera tecleando en tiempo real. La imagen de arriba representa visualmente el tema central de esta historia.",
            //Aqui va la imagen que no se colocar
            image: ""
        },
        {
            content: "Segunda parte de nuestra historia. Aquí continuamos el relato donde lo dejamos en la página anterior. Los personajes comienzan a desarrollarse y la trama se hace más interesante con cada palabra que aparece.",
            //Aqui va la imagen que no se colocar
            image: ""
        },
        {
            content: "Tercera parte de la historia. El desenlace se aproxima mientras los eventos se intensifican. Esta página presenta los momentos culminantes de nuestro relato, preparando al lector para la conclusión.",
            //Aqui va la imagen que no se colocar
            image: ""
        }
    ];
    
    // Elementos de la página
    const typingText = document.getElementById('typing-text');
    const pageTitle = document.querySelector('h1');
    const imageElement = document.getElementById('selected-image');
    const progressFill = document.querySelector('.progress-fill');
    
    // Función para simular efecto de escritura
    function typeWriter(text, i, callback) {
        if (i < text.length) {
            typingText.innerHTML += text.charAt(i);
            
            // Calcular el progreso basado en cuántos caracteres se han escrito
            const progress = Math.floor((i / text.length) * 100);
            updateProgressBar(progress);
            
            setTimeout(function() {
                typeWriter(text, i + 1, callback);
            }, 25); // Velocidad de la animación (milisegundos)
        } else if (callback) {
            updateProgressBar(100); // Asegurar que la barra esté completa al finalizar
            setTimeout(callback, 700);
        }
    }
    
    // Actualizar la barra de progreso
    function updateProgressBar(percent) {
        progressFill.style.width = percent + '%';
    }
    
    // Cargar la página actual
    function loadPage(pageIndex) {
        // Reiniciar elementos
        typingText.innerHTML = '';
        updateProgressBar(0); // Comenzar con barra vacía
        
        // Actualizar contenido
        const page = pages[pageIndex];
        pageTitle.textContent = page.title;
        
        // Actualizar imagen (en una implementación real, esto cambiaría la imagen)
        if (imageElement) {
            imageElement.src = page.image;
        }
        
        // Iniciar animación de texto
        typeWriter(page.content, 0);
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
