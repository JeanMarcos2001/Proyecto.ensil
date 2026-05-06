-- ============================================================
-- MIGRACIÓN: Agregar columnas de ajuste de imagen a carrusel_02_imagenes
-- Ejecutar en: Supabase → SQL Editor → New query
-- ============================================================

ALTER TABLE public.carrusel_02_imagenes
  ADD COLUMN IF NOT EXISTS foto_position TEXT    NOT NULL DEFAULT '50% 50%',
  ADD COLUMN IF NOT EXISTS foto_scale    NUMERIC NOT NULL DEFAULT 1.0;
