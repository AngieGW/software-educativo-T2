BEGIN TRANSACTION;
CREATE TABLE IF NOT EXISTS "roles" (
	"id_rol"	INTEGER,
	"nombre_rol"	VARCHAR(50) NOT NULL UNIQUE,
	"descripcion"	VARCHAR(255),
	PRIMARY KEY("id_rol" AUTOINCREMENT)
);
CREATE TABLE IF NOT EXISTS "proyectos" (
	"id_proyecto"	INTEGER,
	"nombre_proyecto"	VARCHAR(100) NOT NULL,
	"descripcion"	TEXT,
	"orden_proyecto"	INT NOT NULL,
	"activo"	TINYINT(1) DEFAULT 1,
	PRIMARY KEY("id_proyecto" AUTOINCREMENT)
);
CREATE TABLE IF NOT EXISTS "contenidos" (
	"id_contenido"	INTEGER,
	"titulo_contenido"	VARCHAR(200) NOT NULL,
	"teoria"	TEXT NOT NULL,
	"id_proyecto"	INT NOT NULL,
	"orden_contenido"	INT DEFAULT 1,
	"activo"	TINYINT(1) DEFAULT 1,
	"teoria2"	TEXT,
	"teoria3"	TEXT,
	"teoria4"	TEXT,
	"teoria5"	TEXT,
	"teoria6"	TEXT,
	"teoria7"	TEXT,
	"teoria8"	TEXT,
	"teoria9"	TEXT,
	"teoria10"	TEXT,
	PRIMARY KEY("id_contenido" AUTOINCREMENT),
	FOREIGN KEY("id_proyecto") REFERENCES "proyectos"("id_proyecto")
);
CREATE TABLE IF NOT EXISTS "evaluaciones" (
	"id_evaluacion"	INTEGER,
	"pregunta"	TEXT NOT NULL,
	"opcion_a"	VARCHAR(255) NOT NULL,
	"opcion_b"	VARCHAR(255) NOT NULL,
	"opcion_c"	VARCHAR(255) NOT NULL,
	"respuesta_correcta"	CHAR(1) NOT NULL CHECK("respuesta_correcta" IN ('A', 'B', 'C')),
	"id_proyecto"	INT NOT NULL,
	"id_contenido"	INT,
	"puntos"	INT DEFAULT 1,
	"activo"	TINYINT(1) DEFAULT 1,
	FOREIGN KEY("id_contenido") REFERENCES "contenidos"("id_contenido"),
	FOREIGN KEY("id_proyecto") REFERENCES "proyectos"("id_proyecto"),
	PRIMARY KEY("id_evaluacion" AUTOINCREMENT)
);
CREATE TABLE IF NOT EXISTS "resultados_evaluaciones" (
	"id_resultado"	INTEGER,
	"id_usuario"	INT NOT NULL,
	"id_evaluacion"	INT NOT NULL,
	"respuesta_seleccionada"	CHAR(1) NOT NULL CHECK("respuesta_seleccionada" IN ('A', 'B', 'C')),
	"es_correcta"	TINYINT(1) NOT NULL,
	"nombre_estudiante"	VARCHAR(100) NOT NULL,
	"seccion_estudiante"	VARCHAR(20) NOT NULL,
	"numero_lista"	INT NOT NULL,
	"fecha_respuesta"	TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	PRIMARY KEY("id_resultado" AUTOINCREMENT),
	FOREIGN KEY("id_usuario") REFERENCES "usuarios"("id_usuario"),
	FOREIGN KEY("id_evaluacion") REFERENCES "evaluaciones"("id_evaluacion")
);
CREATE TABLE IF NOT EXISTS "usuarios" (
	"id_usuario"	INTEGER,
	"nombre"	VARCHAR(100) NOT NULL,
	"cedula"	VARCHAR(255) NOT NULL,
	"id_rol"	INT NOT NULL,
	"activo"	TINYINT(1) DEFAULT 1,
	PRIMARY KEY("id_usuario" AUTOINCREMENT),
	FOREIGN KEY("id_rol") REFERENCES "roles"("id_rol")
);
INSERT INTO "roles" VALUES (1,'Administrador','Acceso completo al sistema');
INSERT INTO "roles" VALUES (2,'Estudiante','Acceso a contenidos y evaluaciones');
INSERT INTO "roles" VALUES (3,'Instructor','Puede crear contenidos y ver resultados');
INSERT INTO "proyectos" VALUES (1,'Proyecto I','Fundamentos básicos del curso',1,1);
INSERT INTO "proyectos" VALUES (2,'Proyecto II','Conceptos intermedios y aplicaciones',2,1);
INSERT INTO "proyectos" VALUES (3,'Proyecto III','Temas avanzados y proyecto final',3,1);
INSERT INTO "contenidos" VALUES (1,'Introducción al Sistema','En este módulo aprenderemos los conceptos básicos del sistema educativo. Es fundamental comprender la estructura y organización del contenido para un aprendizaje efectivo.',1,1,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL);
INSERT INTO "contenidos" VALUES (2,'Fundamentos Teóricos','Los fundamentos teóricos constituyen la base de todo conocimiento. En esta sección exploraremos los principios fundamentales que sustentan la disciplina.',1,2,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL);
INSERT INTO "contenidos" VALUES (3,'Metodología de Estudio','Una metodología de estudio adecuada es clave para el éxito académico. Aquí presentamos técnicas y estrategias que facilitarán el proceso de aprendizaje.',1,3,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL);
INSERT INTO "contenidos" VALUES (4,'Aplicaciones Prácticas','En este módulo nos enfocamos en la aplicación práctica de los conocimientos adquiridos. La teoría cobra sentido cuando se aplica a situaciones reales.',2,1,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL);
INSERT INTO "contenidos" VALUES (5,'Análisis de Casos','El análisis de casos es una herramienta pedagógica poderosa que permite conectar la teoría con la práctica a través de ejemplos reales.',2,2,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL);
INSERT INTO "contenidos" VALUES (6,'Herramientas Digitales','Las herramientas digitales han revolucionado el proceso educativo. Exploraremos diferentes plataformas y recursos tecnológicos.',2,3,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL);
INSERT INTO "contenidos" VALUES (7,'Investigación Avanzada','La investigación avanzada requiere de metodologías rigurosas y pensamiento crítico para generar conocimiento original y válido.',3,1,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL);
INSERT INTO "contenidos" VALUES (8,'Proyecto Final','El proyecto final integra todo el conocimiento adquirido durante el curso. Es una oportunidad para demostrar competencias desarrolladas.',3,2,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL);
INSERT INTO "contenidos" VALUES (9,'Evaluación y Reflexión','La evaluación y reflexión son procesos continuos en el aprendizaje que contribuyen al crecimiento personal y profesional.',3,3,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL);
INSERT INTO "contenidos" VALUES (10,'Introducción al Sistema','En este módulo aprenderemos los conceptos básicos del sistema educativo. Es fundamental comprender la estructura y organización del contenido para un aprendizaje efectivo.',1,1,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL);
INSERT INTO "contenidos" VALUES (11,'Fundamentos Teóricos','Los fundamentos teóricos constituyen la base de todo conocimiento. En esta sección exploraremos los principios fundamentales que sustentan la disciplina.',1,2,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL);
INSERT INTO "contenidos" VALUES (12,'Metodología de Estudio','Una metodología de estudio adecuada es clave para el éxito académico. Aquí presentamos técnicas y estrategias que facilitarán el proceso de aprendizaje.',1,3,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL);
INSERT INTO "contenidos" VALUES (13,'Aplicaciones Prácticas','En este módulo nos enfocamos en la aplicación práctica de los conocimientos adquiridos. La teoría cobra sentido cuando se aplica a situaciones reales.',2,1,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL);
INSERT INTO "contenidos" VALUES (14,'Análisis de Casos','El análisis de casos es una herramienta pedagógica poderosa que permite conectar la teoría con la práctica a través de ejemplos reales.',2,2,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL);
INSERT INTO "contenidos" VALUES (15,'Herramientas Digitales','Las herramientas digitales han revolucionado el proceso educativo. Exploraremos diferentes plataformas y recursos tecnológicos.',2,3,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL);
INSERT INTO "contenidos" VALUES (16,'Investigación Avanzada','La investigación avanzada requiere de metodologías rigurosas y pensamiento crítico para generar conocimiento original y válido.',3,1,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL);
INSERT INTO "contenidos" VALUES (17,'Proyecto Final','El proyecto final integra todo el conocimiento adquirido durante el curso. Es una oportunidad para demostrar competencias desarrolladas.',3,2,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL);
INSERT INTO "contenidos" VALUES (18,'Evaluación y Reflexión','La evaluación y reflexión son procesos continuos en el aprendizaje que contribuyen al crecimiento personal y profesional.',3,3,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL);
INSERT INTO "usuarios" VALUES (1,'Admin Principal','1234',1,1);
INSERT INTO "usuarios" VALUES (2,'Admin Secundario','4321',1,1);
INSERT INTO "usuarios" VALUES (3,'Admin Supervisor','5678',1,1);
INSERT INTO "usuarios" VALUES (4,'Estudiante Universal','',2,1);
COMMIT;
