document.addEventListener('DOMContentLoaded', () => {
  const loginForm = document.getElementById('loginForm');
  const cedulaInput = document.getElementById('cedula');
  const credentialInput = document.getElementById('credential');
  const errorMessage = document.getElementById('errorMessage');
  const mostrarIconos = document.getElementById("mostrar-iconos");
  const eyeOpen = document.querySelector(".icono-eye-open");
  const eyeClosed = document.querySelector(".icono-eye-closed");

  // Mostrar/Ocultar contraseña
  if (mostrarIconos && credentialInput && eyeOpen && eyeClosed) {
    mostrarIconos.addEventListener("click", () => {
      const isPassword = credentialInput.type === "password";
      credentialInput.type = isPassword ? "text" : "password";
      eyeOpen.style.display = isPassword ? "inherit" : "none";
      eyeClosed.style.display = isPassword ? "none" : "inherit";
    });
  }

  // Login real con backend
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
          // Guardar sesión y token
          sessionStorage.setItem('adminLoggedIn', 'true');
          localStorage.setItem('adminToken', data.token); // Guarda el token en localStorage
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