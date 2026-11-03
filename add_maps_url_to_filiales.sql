-- ============================================================
-- AGREGAR CAMPO maps_url A LA TABLA FILIALES
-- Proyecto: ENSIL Perú - Dashboard-EnsilWeb
-- ============================================================
-- Ejecuta este script en el SQL Editor de tu proyecto en Supabase:
-- https://jtrugvxgztnxbhwjtiou.supabase.co
-- ============================================================

-- 1. Agregar la columna maps_url para almacenar el enlace de Google Maps
ALTER TABLE public.filiales
ADD COLUMN IF NOT EXISTS maps_url TEXT;

-- 2. Documentar la columna
COMMENT ON COLUMN public.filiales.maps_url IS 'Enlace de ubicación de Google Maps para la filial';

-- ============================================================
-- EJEMPLOS DE USO:
-- Puedes actualizar el enlace de maps desde el Table Editor de Supabase
-- o ejecutando consultas como esta:
--
-- UPDATE public.filiales 
-- SET maps_url = 'https://maps.app.goo.gl/ejemploChiclayo' 
-- WHERE nombre ILIKE '%Chiclayo%';
-- ============================================================

