-- ============================================================
-- TABLAS: HISTORIAS DE TRANSFORMACIÓN + COLORES CORPORATIVOS
-- Proyecto: Dashboard-EnsilWeb
-- URL: https://jtrugvxgztnxbhwjtiou.supabase.co
-- ============================================================
-- Ejecutar en: Supabase → SQL Editor → New query
-- ============================================================


-- ------------------------------------------------------------
-- TABLA 1: colores_corporativos
-- Paleta de fondos disponibles para las cards del carrusel.
-- El color se guarda como clase Tailwind CSS (string literal)
-- para que el frontend pueda aplicarlo directamente.
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.colores_corporativos (
  id          SERIAL PRIMARY KEY,
  nombre      TEXT NOT NULL,              -- Nombre legible, e.g. "Lima Verde"
  clase_css   TEXT NOT NULL UNIQUE,       -- Clase Tailwind o hex: "bg-[#dcfb41]"
  hex         TEXT NOT NULL,              -- Código HEX para previsualización en el panel
  activo      BOOLEAN NOT NULL DEFAULT TRUE
);

-- Insertar paleta predefinida de verdes institucionales ENSIL
INSERT INTO public.colores_corporativos (nombre, clase_css, hex) VALUES
  ('Verde Lima Brillante',    'bg-[#dcfb41]', '#dcfb41'),
  ('Verde Menta Suave',       'bg-[#d4f5e2]', '#d4f5e2'),
  ('Verde Bosque',            'bg-[#2d6a4f]', '#2d6a4f'),
  ('Verde Esmeralda Claro',   'bg-[#a8e6cf]', '#a8e6cf'),
  ('Verde Oliva',             'bg-[#b5cc6a]', '#b5cc6a'),
  ('Verde Agua Institucional','bg-[#e8f5e9]', '#e8f5e9'),
  ('Verde Jade',              'bg-[#4caf78]', '#4caf78'),
  ('Verde ENSIL Oscuro',      'bg-[#1b4332]', '#1b4332'),
  ('Verde Primavera',         'bg-[#c8f7c5]', '#c8f7c5'),
  ('Crema Neutro',            'bg-[#f5f2eb]', '#f5f2eb');


-- ------------------------------------------------------------
-- TABLA 2: historias_transformacion
-- Cada fila = una card del carrusel de "Historias de transformación".
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.historias_transformacion (
  id                SERIAL PRIMARY KEY,
  nombre_alumno     TEXT NOT NULL,                        -- Nombre completo del alumno
  programa          TEXT NOT NULL,                        -- 'Profesional' | 'Kids' | 'PreKids'
  narracion         TEXT NOT NULL,                        -- Texto/testimonio de la card
  palabras_por_min  TEXT NOT NULL,                        -- e.g. "1,200 ppm" o "Iniciado"
  foto_path         TEXT,                                 -- Ruta en el bucket 'experiencias', e.g. "maria_lopez.webp"
  id_color          INTEGER REFERENCES public.colores_corporativos(id) ON DELETE SET NULL,
  activo            BOOLEAN NOT NULL DEFAULT TRUE,
  orden             INTEGER NOT NULL DEFAULT 0,           -- Para controlar el orden visual
  created_at        TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at        TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Trigger para actualizar updated_at automáticamente
CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_historias_updated_at ON public.historias_transformacion;
CREATE TRIGGER trg_historias_updated_at
  BEFORE UPDATE ON public.historias_transformacion
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();


-- ------------------------------------------------------------
-- DATOS SEMILLA: Migrar los 6 testimonios actuales del landing
-- (foto_path queda NULL hasta que suban las fotos al bucket 'experiencias')
-- ------------------------------------------------------------
INSERT INTO public.historias_transformacion
  (nombre_alumno, programa, narracion, palabras_por_min, id_color, orden)
VALUES
  (
    'María Lopez',
    'Profesional',
    'Pensé que leer rápido significaba perder comprensión, pero ENSIL me demostró lo contrario. Ahora leo un libro por semana manteniendo el 100% de retención en mis proyectos.',
    '1,200 ppm',
    (SELECT id FROM public.colores_corporativos WHERE clase_css = 'bg-[#dcfb41]'),
    1
  ),
  (
    'Carlos Ruiz',
    'Profesional',
    'La carga de lectura en mi carrera era abrumadora. ENSIL no solo me ahorró tiempo, sino que me dio la confianza para destacar en mis exámenes y prepararme mejor.',
    '2,400 ppm',
    (SELECT id FROM public.colores_corporativos WHERE clase_css = 'bg-[#f5f2eb]'),
    2
  ),
  (
    'Lucía Vargas',
    'Kids',
    'Antes me aburría mucho leer cuentos largos. Ahora leo más rápido que mis compañeros y entiendo todo lo que leo. ¡Me encantan los libros de aventuras!',
    '650 ppm',
    (SELECT id FROM public.colores_corporativos WHERE clase_css = 'bg-[#a8e6cf]'),
    3
  ),
  (
    'Mateo Silva',
    'PreKids',
    'Mi hijo Mateo tenía problemas de concentración. Desde que empezó en PreKids, su agilidad mental ha mejorado muchísimo. Está feliz y motivado.',
    'Iniciado',
    (SELECT id FROM public.colores_corporativos WHERE clase_css = 'bg-[#b5cc6a]'),
    4
  ),
  (
    'Ana Torres',
    'Profesional',
    'Actualizarme con artículos médicos me tomaba madrugadas enteras. Con ENSIL, mi velocidad de procesamiento de textos técnicos es otro nivel. Un antes y un después.',
    '1,850 ppm',
    (SELECT id FROM public.colores_corporativos WHERE clase_css = 'bg-[#c8f7c5]'),
    5
  ),
  (
    'Sofía Medina',
    'Kids',
    'Las tareas del colegio se me acumulaban muy rápido. Ahora termino de leer los textos de historia y literatura en minutos. He subido mis notas increíblemente.',
    '900 ppm',
    (SELECT id FROM public.colores_corporativos WHERE clase_css = 'bg-[#f5f2eb]'),
    6
  );


-- ------------------------------------------------------------
-- RLS (Row Level Security): Lectura pública, escritura solo autenticados
-- ------------------------------------------------------------
ALTER TABLE public.colores_corporativos ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.historias_transformacion ENABLE ROW LEVEL SECURITY;

-- Permitir SELECT a anon (el landing lo necesita)
CREATE POLICY "Lectura publica colores"
  ON public.colores_corporativos FOR SELECT TO anon USING (true);

CREATE POLICY "Lectura publica historias"
  ON public.historias_transformacion FOR SELECT TO anon USING (activo = true);

-- Permitir todo a authenticated (el dashboard lo necesita)
CREATE POLICY "Acceso total autenticado colores"
  ON public.colores_corporativos FOR ALL TO authenticated USING (true) WITH CHECK (true);

CREATE POLICY "Acceso total autenticado historias"
  ON public.historias_transformacion FOR ALL TO authenticated USING (true) WITH CHECK (true);
