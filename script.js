const buttonLogin = document.getElementById("loginButton");
let passwordField = document.getElementById("password");
let errorMessage = document.getElementById("errorMessage");
let contraseñaCorrecta = "1234"; // Aquí puedes poner la contraseña real
/* Apartado Iconos Boton */
let mostrarIconos = document.getElementById("mostrar-iconos");
let eyeOpen = document.querySelector(".icono-eye-open");
let eyeClosed = document.querySelector(".icono-eye-closed");

buttonLogin.addEventListener("click", (e) => {
    e.preventDefault()
    console.log(e)
    

    if (passwordField.value === contraseñaCorrecta) {
        errorMessage.style.display = "none"; // Oculta el mensaje si es correcta
    } else {
        errorMessage.style.display = "block"; // Muestra el mensaje si es incorrecta
    }
});

mostrarIconos.addEventListener("click", () =>{
    const contraseña = passwordField.type === "password";
    passwordField.type = contraseña ? "text" : "password";

    eyeOpen.style.display = contraseña ? "inherit" : "none"; 
    eyeClosed.style.display = contraseña ? "none" : "inherit";
} ) 


