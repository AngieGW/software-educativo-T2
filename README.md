# para iniciar el servidor:

coloca en la terminal: npx http-server -p 3030


# software-educativo-T2 Description del proyecto
Esto es todo lo que tenemos hasta ahora, practicamente lo que te mostre en el video. De la parte del backend no tiene NADAAA porque no consigo como hacer que la base de datos conecte de ninguna manera.

La base de datos son los archivos base.sql (la exporte) y base.db (que es el archivo que uso). Las bases de datos las manejo con DB Browser for SQLite. EL primer paso creo que seria el conectar la base de datos para poder iniciar sesión.

# lenguajes de programacion usados hasta ahora:
HTML
CSS
JS
SQLite
podemos usar cualquiera que veamos util para algun fin

# El inicio de sesion: se puede hacer tipo ciclo de vida o fases del proyecto, separar por fases en caso tal 
Esta el estudiante que, al darle click deberia entrar de inmediato al programa. Luego esta el apartado del maestro, este lleva al archivo confirmacion.html donde me pide solamente la contraseña para entrar

hay dos archivos de java para eso:
script_original: fue el primero que se hizo, solo muestra la contraseña y te deja entrar con "1234"

script_1: Fue la manera que habia colocado para iniciar sesion. Pero sin nada de base de datos, meti las contraseñas en un array :3


# FUNCIONES QUE DEBERIA TENER EL SOFTWARE

    # inicio de sesion:
    Hay dos usuarios, el usuario universal, que seria el estudiante, el cual no requiere contraseña y el administrador que seria el profesor

    # Menu:
    Aqui se pueden ver los modulos principales. Es la manera rapida de acceder a cada lado

            #Proyectos: (los proyectos son como primer, segundo y tercer lapso)Dentro de cada uno de ellos hay 6 contenidos, al entrar a cada contenido (aun hay que crear paginas para los contenidos restantes) te debe mostrar la barra lateral, y el contenido: titulo y descripcion. Tambien hay dos flechas, las cuales se usarian para cambiar de contenido.
            Al finalizar cada contenido. Debe llevarte al apartado de evaluacion de ese contenido.

            #Evaluacion: Al entrar, vas a encontrar tres botones, cada uno hace una referencia a un proyecto. Dentro de cada uno de ellos encontraras 6 botones, en referencia a los temas de cada lapso. Al entrar te llevara al formato de evaluacion de ese tema.
            Al final debe mostrar la nota y enviarla al apartado de administrador (para hacer el reporte)

        Estos apartados estaran sin contenido, porque esos los ingresara el profesor. Hay que crear dos formularios, uno para el contenido y otro para las preguntas

            #Biblioteca: Dentro de ella encontraras 6 libros, cada uno debe mostrar una imagen y el texto de la historia. Al avanzar, las flechas desapareceran y en su lugar estarn las deciciones a elegir del usuario. Al finalizar la lectura habra una seria de preguntas con respecto al la historia. en el mismo formato de preguntas mixtas que tiene el apartado de evaluacion de contenidos.
    
    #Barra lateral: Cuando estas en proyecto I, no debe mostrar ni proyecto II, ni III. Es decir, no debe adelantarse a mostrar cosas mas adelantadas (pero eso lo acomodamos nosotros)

    #FUNCIONES DEL ADMINISTRADOR:
    Debe poder agregar temas, editar los temas, leer temas y eliminar temas. Lo mismo con las preguntas del apartado de evaluacion
    Deberia poder sacar un reporte
    Reiniciarse al apagarse la computadora

    #FUNCIONES DE ESTUDIANTE:
    Se reinicia luego de cerrar sesion, pero deberia mandar datos al apartado de administrador

# La base de datos: Puedes hacer tipo lista de cuales son y el rol que tiene cada una
Creo que las tablas se entienden solas. La de contenido tiene varias columnas de Teoria. QUe siento que seria equivalente a cada nuevo parrafo de texto que se tendria que pasar cuando das click a la flechita.

en la tabla de usuarios. En vez de clave, dice cedula, porque pensaba que las contraseñas fueran la cedula

# Funciones extra:
El software debe ser offline
Debe guardar datos solo de manera temporal
Debe funcionar con solo abrir el programa

# Mi pensamiento:
QUe no puedo avanzar si no puedo conectar la base de datos, pero no encuentro manera de como conectarla. Por eso, lo que tenia, lo borre porque de nada me servia si no estaba vinculado con la base de datos

# dudas:
No se si agregar alguna nueva pagina en el apartado de administrador. POrque igualmente ambos inicial sesion en la misma pagina menu.html

# extra:
loa archivos CSS son diferentes porque se fueron haciendo segun haciamos paginas, no se porque, no pensamos en que fuese uno solo para todo

las contraseñas para iniciar sesion en el admin, son:
1234
4321
5678

no se busca manejar con una base de datos de todos los estudiantes debido a los escasos recursos de las computadoras de la institucion