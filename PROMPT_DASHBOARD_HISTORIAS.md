# PROMPT PARA EL PANEL DE HISTORIAS DE TRANSFORMACIÓN — DASHBOARD ENSIL

## Contexto del proyecto

Tengo un dashboard web para ENSIL (academia de lectura veloz), construido con React + TypeScript + Vite + Tailwind CSS. El dashboard ya tiene vistas para: Citas, Alumnos, Apoderados y Filiales. Todas consumen datos de Supabase (URL: `https://jtrugvxgztnxbhwjtiou.supabase.co`).

Necesito agregar una nueva vista: **"Historias de Transformación"**, que permite gestionar el carrusel de testimonios que se muestra en el landing público.

---

## Base de datos (ya creadas en Supabase)

### Tabla: `historias_transformacion`
| campo | tipo | descripción |
|---|---|---|
| id | SERIAL PK | |
| nombre_alumno | TEXT | Nombre completo del alumno |
| programa | TEXT | 'Profesional', 'Kids' o 'PreKids' |
| narracion | TEXT | Texto del testimonio |
| palabras_por_min | TEXT | e.g. "1,200 ppm" o "Iniciado" |
| foto_path | TEXT | Ruta relativa en el bucket 'experiencias', e.g. "maria.webp" |
| id_color | INTEGER FK → colores_corporativos.id | Color de fondo de la card |
| activo | BOOLEAN | Si aparece en el carrusel |
| orden | INTEGER | Orden visual en el carrusel |
| created_at | TIMESTAMPTZ | |
| updated_at | TIMESTAMPTZ | |

### Tabla: `colores_corporativos`
| campo | tipo | descripción |
|---|---|---|
| id | SERIAL PK | |
| nombre | TEXT | Nombre legible, e.g. "Verde Lima Brillante" |
| clase_css | TEXT | Clase Tailwind, e.g. "bg-[#dcfb41]" |
| hex | TEXT | Código HEX, e.g. "#dcfb41" |
| activo | BOOLEAN | |

### Bucket Storage: `experiencias`
- Las fotos de los alumnos se suben a este bucket.
- El campo `foto_path` en la tabla guarda solo el nombre del archivo (e.g. `"maria_lopez.webp"`).
- La URL pública se construye como: `{SUPABASE_URL}/storage/v1/object/public/experiencias/{foto_path}`

---

## Diseño del panel requerido

Agregar en el menú lateral del dashboard una nueva opción: **"Historias"** con un ícono apropiado (p. ej. `Sparkles` de lucide-react).

### Vista principal: Tabla de historias

- Tabla con columnas: **Previa** (foto thumbnail), **Alumno**, **Programa**, **PPM**, **Color** (pastilla de color), **Orden**, **Activo** (toggle on/off), **Acciones** (editar, eliminar).
- Botón **"+ Nueva Historia"** en el header.
- Filtro de búsqueda por nombre de alumno.
- Botón de refresco de datos.
- Cuando `activo` se cambia con el toggle, actualizar directamente en Supabase sin abrir modal.
- El thumbnail de la foto debe mostrarse si `foto_path` no es null, obteniendo la URL pública del bucket `experiencias`.

### Modal de Creación / Edición

Campos del formulario:
1. **Nombre del alumno** — input text
2. **Programa** — select con opciones: `Profesional`, `Kids`, `PreKids`
3. **Narración / Testimonio** — textarea (max 300 caracteres, mostrar contador)
4. **Palabras por minuto** — input text, placeholder: "e.g. 1,200 ppm"
5. **Orden** — input number (define posición en el carrusel)
6. **Color de fondo** — selector visual: mostrar los colores de la tabla `colores_corporativos` como pastillas circulares clicables con su HEX real, con check cuando está seleccionado
7. **Foto** — input file para subir imagen al bucket `experiencias`. Al seleccionar un archivo:
   - Subir al bucket `experiencias` con el nombre de archivo: `{timestamp}_{nombre_original}` (para evitar colisiones)
   - Guardar solo el nombre del archivo en `foto_path`
   - Mostrar preview de la imagen seleccionada antes de guardar
8. **Activo** — checkbox / toggle

Validaciones:
- `nombre_alumno`, `programa`, `narracion`, `palabras_por_min` son requeridos.
- Si no se sube foto, `foto_path` queda `null` (el carrusel muestra un placeholder).

### Eliminar historia

- Confirmación con el componente `ConfirmAlert` ya existente en el dashboard (estilo iOS).
- Al eliminar: borrar el registro de la tabla. **No borrar la foto del bucket** (puede ser compartida o útil después).

---

## Estilo y consistencia

- Usar el mismo design system del dashboard existente: colores slate, emerald y amber. Componentes reutilizables como `Modal`, `StatCard`, `StatusBadge` y `ConfirmAlert` ya existen.
- Las tarjetas de historial deben tener el mismo aspecto de tabla con bordes redondeados `rounded-3xl` que las demás vistas.
- El toggle de "Activo" debe verse como los de iOS (verde cuando activo).
- El selector de colores debe mostrar cada pastilla con el `hex` real como fondo y un tick blanco cuando está seleccionada.
- La previsualización de la foto en el modal debe ser un recuadro redondeado `rounded-2xl` de altura fija (p. ej. 160px) con `object-cover`.

---

## Credenciales Supabase (ya inicializadas en el archivo)

```ts
const SUPABASE_URL = 'https://jtrugvxgztnxbhwjtiou.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'; // la existente
```

---

## Resumen de lo que debe hacer el agente

1. Agregar `'historias'` al tipo de `activeView` en el estado principal del App.
2. Agregar el ítem "Historias" en el menú lateral de navegación.
3. Crear en el `useEffect` inicial el fetch de `colores_corporativos` para usarlos en el selector del modal.
4. Crear el `renderHistorias()` con la tabla y el botón de nueva historia.
5. Crear el modal de creación/edición con todos los campos descritos, incluyendo la lógica de subida de foto al bucket `experiencias`.
6. Implementar los handlers: `handleAddHistoria`, `handleUpdateHistoria`, `handleDeleteHistoria`, `toggleHistoriaActiva`.
7. Agregar `handleRenderView()` para incluir el nuevo `case 'historias'`.
