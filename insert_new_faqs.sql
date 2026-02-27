-- Paso 1: Crear tabla de categorías
CREATE TABLE categoriaFAQ (
  "idCategoria" SERIAL PRIMARY KEY,
  "nombreCategoria" TEXT NOT NULL UNIQUE
);

-- Paso 2: Crear (o recrear) la tabla faq con relación
CREATE TABLE faq (
  "idFAQ" SERIAL PRIMARY KEY,
  "PREGUNTA" TEXT NOT NULL,
  "RESPUESTA" TEXT NOT NULL,
  "idCategoria" INTEGER REFERENCES categoriaFAQ("idCategoria"),
  "ORDEN" INTEGER NOT NULL DEFAULT 0
);

-- Opcional: Para limpiar datos anteriores si estás recreando todo
-- DROP TABLE IF EXISTS faq;
-- DROP TABLE IF EXISTS categoriaFAQ;
-- (Luego ejecutar CREATE TABLE de arriba)

-- Paso 3: Insertar las categorías
INSERT INTO categoriaFAQ ("nombreCategoria") VALUES
('Sobre el programa y resultados'),
('Para quién es el programa'),
('Información, evaluación y proceso de inscripción'),
('Horarios y compatibilidad con la rutina'),
('Materiales incluidos'),
('Modalidad y sedes'),
('Contacto y atención');

-- Paso 4: Insertar FAQs asociando los IDs de categorías
INSERT INTO faq ("PREGUNTA", "RESPUESTA", "idCategoria", "ORDEN") VALUES

-- Sobre el programa y resultados (id: 1)
('¿En cuánto tiempo se ven resultados?', 'Depende del punto de partida y de la constancia. Muchas personas notan cambios desde las primeras semanas; con el entrenamiento, el progreso se vuelve acumulativo.', 1, 1),
('¿Sirve si mi hijo "lee" pero no entiende?', 'Sí. Es una de las razones más comunes para empezar: transformar la lectura en comprensión real.', 1, 2),
('¿Funciona si mi hijo se distrae con facilidad o se aburre leyendo?', 'Sí. Incluimos ejercicios para fortalecer la atención y el hábito lector sin saturar al alumno: pausas activas, actividades motivadoras y dinámicas especialmente pensadas para etapas iniciales (Kids y Pre Kids).', 1, 3),

-- Para quién es el programa (id: 2)
('¿Desde qué edad se puede iniciar?', 'Desde los 5 años. Contamos con el programa Pre Kids, diseñado para niños desde esa edad.', 2, 4),
('¿El programa sirve para adultos profesionales?', 'Sí. También está diseñado para adultos que buscan ser más productivos y eficientes en sus actividades laborales y académicas.', 2, 5),

-- Información, evaluación y proceso de inscripción (id: 3)
('¿Por qué ENSIL no brinda información completa por mensajes o llamadas?', 'Porque cada persona necesita un enfoque distinto. En la cita realizamos una orientación y explicamos el programa según edad, nivel y objetivo.', 3, 6),
('¿Puedo ir a informarme sin compromiso?', 'Por supuesto. La cita está pensada para que conozcas el programa y decidas con tranquilidad, sin obligación de inscribirte en el momento.', 3, 7),

-- Horarios y compatibilidad con la rutina (id: 4)
('¿Funciona si tengo poco tiempo por trabajo o prácticas?', 'Sí. En la cita te explicamos los horarios y el compromiso mínimo recomendado para mantener el progreso, y buscamos una adaptación realista a tu rutina.', 4, 8),

-- Materiales incluidos (id: 5)
('¿Debo comprar libros o materiales extra?', 'El programa incluye los materiales de entrenamiento. Además, durante el proceso se recomienda contar con libros (por ejemplo, de tu biblioteca o de préstamo); en el recorrido se lee un mínimo aproximado de 250 libros.', 5, 9),

-- Modalidad y sedes (id: 6)
('¿El programa es presencial en todas las sedes?', 'Sí. El enfoque principal es presencial para asegurar acompañamiento, seguimiento y resultados en cada nivel de Lectura Integral.', 6, 10),

-- Contacto y atención (id: 7)
('¿Puedo recibir información por WhatsApp?', 'Sí. Escríbenos al 960 508 686 y un asesor te brindará información personalizada según tu caso.', 7, 11);
