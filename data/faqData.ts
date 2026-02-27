export interface FaqItem {
    idFAQ: number;
    PREGUNTA: string;
    RESPUESTA: string;
    ORDEN: number;
    categoriaFAQ: {
        nombreCategoria: string;
    };
}

export const localFaqs: FaqItem[] = [
    {
        idFAQ: 1,
        PREGUNTA: '¿En cuánto tiempo se ven resultados?',
        RESPUESTA: 'Depende del punto de partida y de la constancia. Muchas personas notan cambios desde las primeras semanas; con el entrenamiento, el progreso se vuelve acumulativo.',
        ORDEN: 1,
        categoriaFAQ: { nombreCategoria: 'Sobre el programa y resultados' }
    },
    {
        idFAQ: 2,
        PREGUNTA: '¿Sirve si mi hijo "lee" pero no entiende?',
        RESPUESTA: 'Sí. Es una de las razones más comunes para empezar: transformar la lectura en comprensión real.',
        ORDEN: 2,
        categoriaFAQ: { nombreCategoria: 'Sobre el programa y resultados' }
    },
    {
        idFAQ: 3,
        PREGUNTA: '¿Funciona si mi hijo se distrae con facilidad o se aburre leyendo?',
        RESPUESTA: 'Sí. Incluimos ejercicios para fortalecer la atención y el hábito lector sin saturar al alumno: pausas activas, actividades motivadoras y dinámicas especialmente pensadas para etapas iniciales (Kids y Pre Kids).',
        ORDEN: 3,
        categoriaFAQ: { nombreCategoria: 'Sobre el programa y resultados' }
    },
    {
        idFAQ: 4,
        PREGUNTA: '¿Desde qué edad se puede iniciar?',
        RESPUESTA: 'Desde los 5 años. Contamos con el programa Pre Kids, diseñado para niños desde esa edad.',
        ORDEN: 4,
        categoriaFAQ: { nombreCategoria: 'Para quién es el programa' }
    },
    {
        idFAQ: 5,
        PREGUNTA: '¿El programa sirve para adultos profesionales?',
        RESPUESTA: 'Sí. También está diseñado para adultos que buscan ser más productivos y eficientes en sus actividades laborales y académicas.',
        ORDEN: 5,
        categoriaFAQ: { nombreCategoria: 'Para quién es el programa' }
    },
    {
        idFAQ: 6,
        PREGUNTA: '¿Por qué ENSIL no brinda información completa por mensajes o llamadas?',
        RESPUESTA: 'Porque cada persona necesita un enfoque distinto. En la cita realizamos una orientación y explicamos el programa según edad, nivel y objetivo.',
        ORDEN: 6,
        categoriaFAQ: { nombreCategoria: 'Información, evaluación y proceso de inscripción' }
    },
    {
        idFAQ: 7,
        PREGUNTA: '¿Puedo ir a informarme sin compromiso?',
        RESPUESTA: 'Por supuesto. La cita está pensada para que conozcas el programa y decidas con tranquilidad, sin obligación de inscribirte en el momento.',
        ORDEN: 7,
        categoriaFAQ: { nombreCategoria: 'Información, evaluación y proceso de inscripción' }
    },
    {
        idFAQ: 8,
        PREGUNTA: '¿Funciona si tengo poco tiempo por trabajo o prácticas?',
        RESPUESTA: 'Sí. En la cita te explicamos los horarios y el compromiso mínimo recomendado para mantener el progreso, y buscamos una adaptación realista a tu rutina.',
        ORDEN: 8,
        categoriaFAQ: { nombreCategoria: 'Horarios y compatibilidad con la rutina' }
    },
    {
        idFAQ: 9,
        PREGUNTA: '¿Debo comprar libros o materiales extra?',
        RESPUESTA: 'El programa incluye los materiales de entrenamiento. Además, durante el proceso se recomienda contar con libros (por ejemplo, de tu biblioteca o de préstamo); en el recorrido se lee un mínimo aproximado de 250 libros.',
        ORDEN: 9,
        categoriaFAQ: { nombreCategoria: 'Materiales incluidos' }
    },
    {
        idFAQ: 10,
        PREGUNTA: '¿El programa es presencial en todas las sedes?',
        RESPUESTA: 'Sí. El enfoque principal es presencial para asegurar acompañamiento, seguimiento y resultados en cada nivel de Lectura Integral.',
        ORDEN: 10,
        categoriaFAQ: { nombreCategoria: 'Modalidad y sedes' }
    },
    {
        idFAQ: 11,
        PREGUNTA: '¿Puedo recibir información por WhatsApp?',
        RESPUESTA: 'Sí. Escríbenos al 960 508 686 y un asesor te brindará información personalizada según tu caso.',
        ORDEN: 11,
        categoriaFAQ: { nombreCategoria: 'Contacto y atención' }
    }
];
