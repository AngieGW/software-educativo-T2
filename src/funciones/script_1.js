// === SISTEMA DE AUTENTICACIÓN PARA ADMINISTRADOR Y ESTUDIANTE ===

// Configuración de contraseñas de administrador
const ADMIN_PASSWORDS = ['1234', '4321', '5678'];

// Elementos del DOM
const buttonLogin = document.getElementById("loginButton");
let passwordField = document.getElementById("password");
let errorMessage = document.getElementById("errorMessage");

/* Apartado Iconos Botón */
let mostrarIconos = document.getElementById("mostrar-iconos");
let eyeOpen = document.querySelector(".icono-eye-open");
let eyeClosed = document.querySelector(".icono-eye-closed");

// === FUNCIONALIDADES DE LOGIN ADMINISTRADOR ===

if (buttonLogin) {
    buttonLogin.addEventListener("click", (e) => {
        e.preventDefault();
        console.log('Intento de login administrador:', e);
        
        const enteredPassword = passwordField.value.trim();
        
        // Verificar si la contraseña coincide con alguna de las contraseñas de admin
        if (ADMIN_PASSWORDS.includes(enteredPassword)) {
            // Login exitoso como administrador
            console.log('Login exitoso como administrador');
            
            // Guardar estado de sesión
            sessionStorage.setItem('userRole', 'admin');
            sessionStorage.setItem('adminLoggedIn', 'true');
            sessionStorage.setItem('loginTime', Date.now().toString());
            
            // Ocultar mensaje de error si estaba visible
            if (errorMessage) {
                errorMessage.style.display = "none";
            }
            
            // Redireccionar al panel de administrador
            window.location.href = "menu.html?admin=true";
            
        } else {
            // Login fallido
            console.log('Contraseña incorrecta');
            
            if (errorMessage) {
                errorMessage.style.display = "block";
                errorMessage.textContent = "Contraseña incorrecta";
                
                // Ocultar el mensaje después de 4 segundos
                setTimeout(() => {
                    errorMessage.style.display = "none";
                }, 4000);
            }
            
            // Limpiar campo de contraseña
            passwordField.value = '';
            passwordField.focus();
        }
    });
}

// === FUNCIONALIDADES DE LOGIN ESTUDIANTE ===

// Función para login de estudiante (automático al hacer clic)
function loginStudent() {
    console.log('Iniciando sesión como estudiante');
    
    // Guardar estado de sesión de estudiante
    sessionStorage.setItem('userRole', 'student');
    sessionStorage.setItem('studentLoggedIn', 'true');
    sessionStorage.setItem('loginTime', Date.now().toString());
    
    // Redireccionar al menú principal
    window.location.href = "menu.html";
}

// Agregar event listener al botón de estudiante si existe
document.addEventListener('DOMContentLoaded', function() {
    const studentButton = document.querySelector('.estudiante-boton[onclick*="menu.html"]');
    if (studentButton) {
        // Remover el onclick original y agregar nuestro event listener
        studentButton.removeAttribute('onclick');
        studentButton.addEventListener('click', function(e) {
            e.preventDefault();
            loginStudent();
        });
    }
});

// Funcionalidad para mostrar/ocultar contraseña
if (mostrarIconos && eyeOpen && eyeClosed) {
    mostrarIconos.addEventListener("click", () => {
        const isPassword = passwordField.type === "password";
        passwordField.type = isPassword ? "text" : "password";

        eyeOpen.style.display = isPassword ? "inherit" : "none"; 
        eyeClosed.style.display = isPassword ? "none" : "inherit";
    });
}

// Permitir login con tecla Enter
if (passwordField) {
    passwordField.addEventListener("keypress", (e) => {
        if (e.key === "Enter") {
            buttonLogin.click();
        }
    });
}

// === FUNCIONALIDADES PARA LA PÁGINA MENU.HTML ===

// Función para verificar si el usuario es administrador
function isAdmin() {
    const userRole = sessionStorage.getItem('userRole');
    const adminLoggedIn = sessionStorage.getItem('adminLoggedIn');
    const loginTime = parseInt(sessionStorage.getItem('loginTime') || '0');
    const currentTime = Date.now();
    const sessionDuration = 2 * 60 * 60 * 1000; // 2 horas

    return userRole === 'admin' && 
           adminLoggedIn === 'true' && 
           (currentTime - loginTime) < sessionDuration;
}

// Función para verificar si el usuario es estudiante
function isStudent() {
    const userRole = sessionStorage.getItem('userRole');
    const studentLoggedIn = sessionStorage.getItem('studentLoggedIn');
    const loginTime = parseInt(sessionStorage.getItem('loginTime') || '0');
    const currentTime = Date.now();
    const sessionDuration = 2 * 60 * 60 * 1000; // 2 horas

    return userRole === 'student' && 
           studentLoggedIn === 'true' && 
           (currentTime - loginTime) < sessionDuration;
}

// Función para verificar si hay alguna sesión activa
function hasActiveSession() {
    return isAdmin() || isStudent();
}

// Función para cerrar sesión
function logout() {
    console.log('Cerrando sesión');
    
    // Limpiar todos los datos de sesión
    sessionStorage.removeItem('userRole');
    sessionStorage.removeItem('adminLoggedIn');
    sessionStorage.removeItem('studentLoggedIn');
    sessionStorage.removeItem('loginTime');
    
    // Redireccionar al índice
    window.location.href = 'Index.html';
}

// Función para cerrar sesión de administrador
function logoutAdmin() {
    console.log('Cerrando sesión de administrador');
    logout();
}

// Función para habilitar modo administrador en menu.html
function enableAdminMode() {
    if (!isAdmin()) {
        // Si no es admin, redireccionar al login
        alert('Acceso denegado. Debe iniciar sesión como administrador.');
        window.location.href = 'Index.html';
        return;
    }

    console.log('Modo administrador habilitado');
    alert('Bienvenido al modo administrador');

    // Cambiar el texto del botón de cerrar sesión
    const logoutButton = document.querySelector('.boton-sesion');
    if (logoutButton) {
        logoutButton.innerHTML = '🔐 Cerrar Sesión (Admin)';
        logoutButton.style.backgroundColor = '#dc3545';
        logoutButton.style.color = 'white';
        
        // Cambiar funcionalidad del botón
        logoutButton.onclick = function() {
            logoutAdmin();
        };
    }
}

// === INICIALIZACIÓN Y VERIFICACIÓN DE SESIÓN ===

// Función que se ejecuta cuando se carga menu.html
document.addEventListener('DOMContentLoaded', function() {
    // Solo ejecutar en menu.html
    if (window.location.pathname.includes('menu.html')) {
        
        // Verificar si hay parámetros de admin en la URL
        const urlParams = new URLSearchParams(window.location.search);
        const isAdminMode = urlParams.get('admin') === 'true';
        
        if (isAdminMode) {
            // Modo administrador
            enableAdminMode();
        } else if (isStudent()) {
            // Modo estudiante
            console.log('Sesión de estudiante activa');
            
            const logoutButton = document.querySelector('.boton-sesion');
            if (logoutButton) {
                // Cambiar el texto del botón para estudiante
                logoutButton.innerHTML = '👨‍🎓 Cerrar Sesión';
                logoutButton.style.backgroundColor = '#2a8d4f';
                logoutButton.style.color = 'white';
                
                // Cambiar funcionalidad del botón
                logoutButton.onclick = function() {
                    logout();
                };
            }
        } else if (!hasActiveSession()) {
            // No hay sesión activa, redireccionar al índice
            alert('Debe iniciar sesión para acceder al menú.');
            window.location.href = 'Index.html';
        }
    }
    
    // Solo ejecutar en Index.html
    if (window.location.pathname.includes('Index.html') || window.location.pathname === '/') {
        
        // Si ya hay una sesión activa, redireccionar al menú
        if (hasActiveSession()) {
            if (isAdmin()) {
                window.location.href = 'menu.html?admin=true';
            } else if (isStudent()) {
                window.location.href = 'menu.html';
            }
        }
    }
});