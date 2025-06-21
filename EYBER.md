# TODO: Pulir esto para que sirva de indicaciones de como ejecutarlo como developer y agregarlo en el README
## EJECUTA UN SERVIDOR
yo tengo la carpeta backend (donde est la API) y la carpeta Frontend (donde esta esto)
esas carpetas estando dentro de una carpeta que se llama proyecto

yo abro en mi VS code la carpeta proyecto
abro la terminal y coloco:

lsof -i :3000

luego me voy a la carpeta principal, la que dice frontend y le doy click derecho y selecciono "abrir en terminal integrado"

te va abrir la terminal solo de esa parte, alli vas a colococar el comando:

npx http-server -p 3000

Luego te vas a la carpeta backend y haces lo mismo, le das click derecho y seleccionas "abrir terminal integrado" y en la terminal colocas:

yarn dev

con eso ambos servidores estan corriendo

# Como saber si corren

abre dos pestañas en el navegador:

localhost:4000 (en tu caso el 4000 creo que es 3306, eso esta en tu archivo .env del backend)
Alli te debe mostrar un mensaje 

y luego:
localhost:3000
ese es el fronted, busca el archivo index y comienza a visualizar el contenido


# Archivos CONFORT
Estoy intentando ingresar contenidos, aun no funciona

# Archivo login
Ese es el de iniciar sesion pero aun no funciona


# Cambios
cambie el formulario de confirmacion.html
si puedes agregarle de nuevo el ojito te lo agradeceria, yo no pude. Igual ese codigo esta en script_original.js por si acaso

