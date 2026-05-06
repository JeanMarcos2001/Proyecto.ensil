-- ============================================================
-- FIX: Permitir escritura anon en carrusel_02_imagenes
-- El dashboard usa la anon key sin autenticación (igual que
-- historias_transformacion que sí funciona).
-- ============================================================
-- Ejecutar en: Supabase → SQL Editor → New query
-- ============================================================

CREATE POLICY "Acceso total anon carrusel02"
  ON public.carrusel_02_imagenes
  FOR ALL
  TO anon
  USING (true)
  WITH CHECK (true);
