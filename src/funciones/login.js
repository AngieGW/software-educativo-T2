document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    const cedulaInput = document.getElementById('cedula');
    const credentialInput = document.getElementById('credential');
    const errorMessage = document.getElementById('errorMessage');

    if (loginForm) {
    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();

      // Obtener valores del formulario
    const cedula = cedulaInput.value.trim();
    const credential = credentialInput.value.trim();

      // Validación básica
    if (!cedula || !credential) {
        errorMessage.style.display = "block";
        errorMessage.textContent = "Por favor, complete todos los campos.";
        setTimeout(() => errorMessage.style.display = "none", 4000);
        return;
    }

    try {
        // Enviar datos al backend para validar
        const res = await fetch("http://localhost:4000/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cedula, credential })
        });
        const data = await res.json();

        if (res.ok && data.token) {
          // Guardar sesión si es necesario
        sessionStorage.setItem('adminLoggedIn', 'true');
          // Puedes guardar el token si lo necesitas:
        localStorage.setItem('adminToken', data.token);

        alert("¡Bienvenido docente!");
        window.location.href = "menu.html";
        } else {
        errorMessage.style.display = "block";
        errorMessage.textContent = data.message
            ? data.message.replace(/credencial/gi, "contraseña")
            : "Contraseña incorrecta";
        setTimeout(() => errorMessage.style.display = "none", 4000);
        }
        
    } catch (err) {
        errorMessage.style.display = "block";
        errorMessage.textContent = "Error de conexión con el servidor";
        setTimeout(() => errorMessage.style.display = "none", 4000);
    }
    });
    }
});