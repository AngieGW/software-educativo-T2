// Función para cerrar sesión de administrador
function cerrarSesionAdmin() {
    // Elimina el token y cualquier otro dato de sesión relevante
    localStorage.removeItem('adminToken');
    sessionStorage.removeItem('adminLoggedIn');
    // Redirige al login o página principal
    window.location.href = "/src/Index.html";
}

// --- FUNCIÓN EXTRA: OCULTAR MASCOTA BUNNY PARA ADMINISTRADORES ---
(function ocultarBunnyParaAdmin() {
    const adminId = localStorage.getItem('adminId');
    // Si el usuario es admin y NO es el admin 9, oculta el conejo
    if (localStorage.getItem('adminToken') && adminId !== "9") {
        // Lista de IDs y contenedores de bunny en las páginas
        const bunnyIds = [
            'bunny-container',
            'bunny-potter-container',
            'bunny-vikingo-container',
            'bunny-cisne-container',
            'bunny-principito-container',
            'bunny-caballero-container'
        ];

        // Elimina los contenedores si existen
        bunnyIds.forEach(id => {
            const el = document.getElementById(id);
            if (el) el.remove();
        });

        // Además, elimina los scripts de bunny si están en el DOM
        const bunnyScripts = [
            'bunny-pet.js',
            'bunny-button.js',
            'bunnyvi.js',
            'bunnycis.js',
            'bunnypri.js',
            'bunnycab.js',
            'bunny.js'
        ];
        // Busca y elimina los <script> que cargan bunny
        document.querySelectorAll('script').forEach(script => {
            if (script.src) {
                for (const name of bunnyScripts) {
                    if (script.src.includes(name)) {
                        script.remove();
                    }
                }
            }
        });
    }
})();


