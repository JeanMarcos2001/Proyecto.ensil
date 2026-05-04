# PROMPT: Corrección de Visualización de Imágenes — Carrusel de Historias ENSIL

## Contexto del sistema

Tengo una aplicación dividida en dos proyectos:

1. **Dashboard** (`/Dashboard/index.tsx`) — panel de administración en React + Vite
2. **Landing Web** (`/Web_Ensil/Proyecto.ensil/components/resultados/ResultsContent.tsx`) — página pública

Ambos comparten el mismo proyecto Supabase:
- **URL:** `https://jtrugvxgztnxbhwjtiou.supabase.co`

---

## Cómo se almacena la imagen (Dashboard)

Cuando se crea o edita una historia desde el dashboard:

1. El archivo se convierte a **WebP** (calidad 0.85, máx. 800px ancho) usando Canvas API
2. Se sube al bucket de Supabase Storage llamado **`Testimonios`** (público)
3. El nombre del archivo generado es: `{timestamp}_{nombre_original}.webp`
   - Ejemplo: `1746392841234_maria_lopez.webp`
4. En la tabla `historias_transformacion`, el campo **`foto_path`** guarda **solo el nombre del archivo** (sin URL completa, sin slash inicial)
   - Ejemplo: `"1746392841234_maria_lopez.webp"`

---

## Cómo se construye la URL pública

La URL pública completa de la imagen se construye así:

```
{SUPABASE_URL}/storage/v1/object/public/Testimonios/{foto_path}
```

Ejemplo completo:

```
https://jtrugvxgztnxbhwjtiou.supabase.co/storage/v1/object/public/Testimonios/1746392841234_maria_lopez.webp
```

---

## Estructura de la tabla `historias_transformacion`

```sql
id               SERIAL PK
nombre_alumno    TEXT
programa         TEXT        -- 'Profesional', 'Kids', 'PreKids'
narracion        TEXT
palabras_por_min TEXT        -- e.g. "1,200 ppm"
foto_path        TEXT        -- solo el nombre del archivo en bucket Testimonios
id_color         INTEGER FK → colores_corporativos.id
activo           BOOLEAN
orden            INTEGER
created_at       TIMESTAMPTZ
updated_at       TIMESTAMPTZ
```

La tabla `colores_corporativos` tiene:

```sql
id        SERIAL PK
nombre    TEXT    -- "Verde Lima Brillante"
clase_css TEXT    -- "bg-[#dcfb41]"
hex       TEXT    -- "#dcfb41"
activo    BOOLEAN
```

---

## Query de fetch en la landing page

```typescript
const { data } = await supabase
  .from('historias_transformacion')
  .select(`
    id, nombre_alumno, programa, narracion,
    palabras_por_min, foto_path, orden,
    colores_corporativos ( clase_css )
  `)
  .eq('activo', true)
  .order('orden', { ascending: true });
```

---

## Función correcta para construir la URL de la foto

```typescript
const SUPABASE_URL = 'https://jtrugvxgztnxbhwjtiou.supabase.co';

function getFotoUrl(foto_path: string | null): string | null {
  if (!foto_path) return null;
  // Caso A: ya es una URL completa, usarla directamente
  if (foto_path.startsWith('http')) return foto_path;
  // Casos B/C: construir URL del bucket Testimonios
  const cleanPath = foto_path.startsWith('/') ? foto_path.slice(1) : foto_path;
  return `${SUPABASE_URL}/storage/v1/object/public/Testimonios/${cleanPath}`;
}
```

---

## Tarea a resolver

En el archivo `ResultsContent.tsx`, dentro de `fetchHistorias`, corrige la construcción
de la URL de la foto para que use el bucket **`Testimonios`** (T mayúscula) y no `experiencias`.

Asegúrate de que:
- El `<img>` en el carrusel use `getFotoUrl(h.foto_path)` como `src`
- Tenga un `onError` que oculte la imagen rota y muestre un placeholder (ícono de persona)
- El bucket es **público**, no se necesita autenticación para leer las imágenes

---

## Diagnóstico rápido (consola del navegador)

Abre `F12 → Console` y busca los logs:

```
[ENSIL Historias] id=1 | foto_path="1746392841234_maria.webp" | foto_url="..."
```

Si `foto_url` apunta a `/experiencias/` en lugar de `/Testimonios/`, ese es el error.
La corrección está en la línea donde se construye la URL dentro del `.map()` de `fetchHistorias`.
