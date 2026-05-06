-- ============================================================
-- TABLA: carrusel_02_imagenes
-- Controla el orden y metadatos de las imágenes del
-- segundo carrusel (Fila 2) de la sección Resultados.
-- Las fotos físicas se almacenan en el bucket "Carrusel 02".
-- ============================================================
-- Ejecutar en: Supabase → SQL Editor → New query
-- Proyecto: Dashboard-EnsilWeb
-- URL: https://jtrugvxgztnxbhwjtiou.supabase.co
-- ============================================================


CREATE TABLE IF NOT EXISTS public.carrusel_02_imagenes (
  id             SERIAL PRIMARY KEY,
  nombre         TEXT NOT NULL DEFAULT '',        -- Etiqueta descriptiva para el panel
  file_path      TEXT NOT NULL,                   -- Nombre del archivo en el bucket "Carrusel 02"
  foto_position  TEXT DEFAULT '50% 50%',          -- Para el ajuste CSS object-position
  foto_scale     NUMERIC DEFAULT 1.0,             -- Zoom de la imagen
  orden          INTEGER NOT NULL DEFAULT 0,      -- Posición en el carrusel
  activo         BOOLEAN NOT NULL DEFAULT TRUE,   -- FALSE = oculta del carrusel público
  created_at     TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at     TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Si la tabla ya existía, añadir las columnas nuevas:
ALTER TABLE public.carrusel_02_imagenes ADD COLUMN IF NOT EXISTS foto_position TEXT DEFAULT '50% 50%';
ALTER TABLE public.carrusel_02_imagenes ADD COLUMN IF NOT EXISTS foto_scale NUMERIC DEFAULT 1.0;

-- Reutilizar la función set_updated_at ya existente en el proyecto
DROP TRIGGER IF EXISTS trg_carrusel02_updated_at ON public.carrusel_02_imagenes;
CREATE TRIGGER trg_carrusel02_updated_at
  BEFORE UPDATE ON public.carrusel_02_imagenes
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();


-- ------------------------------------------------------------
-- RLS: lectura pública, escritura para anon (usado por el dashboard)
-- ------------------------------------------------------------
ALTER TABLE public.carrusel_02_imagenes ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Lectura publica carrusel02" ON public.carrusel_02_imagenes;
DROP POLICY IF EXISTS "Acceso total autenticado carrusel02" ON public.carrusel_02_imagenes;
DROP POLICY IF EXISTS "Acceso total anon carrusel02" ON public.carrusel_02_imagenes;

CREATE POLICY "Lectura publica carrusel02"
  ON public.carrusel_02_imagenes FOR SELECT TO anon
  USING (activo = true);

-- El dashboard usa la clave 'anon', por lo que necesita permisos totales
CREATE POLICY "Acceso total anon carrusel02"
  ON public.carrusel_02_imagenes FOR ALL TO anon
  USING (true) WITH CHECK (true);


-- ------------------------------------------------------------
-- NOTA: Asegurarse de que el bucket "Carrusel 02" exista en
-- Storage con acceso público habilitado.
-- Si aún no existe, crearlo desde:
--   Supabase → Storage → New Bucket → Name: "Carrusel 02" → Public: ON
-- ------------------------------------------------------------
