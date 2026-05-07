-- Crear el bucket 'Filiales' asegurando que sea público
INSERT INTO storage.buckets (id, name, public)
VALUES ('Filiales', 'Filiales', true)
ON CONFLICT (id) DO UPDATE SET public = true;

-- Borrar políticas previas por si acaso para evitar errores de "policy already exists" al volver a ejecutar
DROP POLICY IF EXISTS "Public access Filiales" ON storage.objects;
DROP POLICY IF EXISTS "Anon insert Filiales" ON storage.objects;
DROP POLICY IF EXISTS "Anon update Filiales" ON storage.objects;
DROP POLICY IF EXISTS "Anon delete Filiales" ON storage.objects;

-- Permitir el acceso público de lectura (para que las imágenes se vean en la web)
CREATE POLICY "Public access Filiales" 
ON storage.objects FOR SELECT 
USING (bucket_id = 'Filiales');

-- Permitir a los usuarios (incluso anónimos, según tu configuración actual) subir archivos
CREATE POLICY "Anon insert Filiales" 
ON storage.objects FOR INSERT 
WITH CHECK (bucket_id = 'Filiales');

-- Permitir a los usuarios actualizar archivos (útil si se reemplaza una imagen)
CREATE POLICY "Anon update Filiales" 
ON storage.objects FOR UPDATE 
USING (bucket_id = 'Filiales');

-- Permitir a los usuarios borrar archivos
CREATE POLICY "Anon delete Filiales" 
ON storage.objects FOR DELETE 
USING (bucket_id = 'Filiales');

-- Añadir las columnas necesarias a la tabla filiales
ALTER TABLE public.filiales
ADD COLUMN IF NOT EXISTS file_path TEXT,
ADD COLUMN IF NOT EXISTS foto_position TEXT DEFAULT '50% 50%',
ADD COLUMN IF NOT EXISTS foto_scale NUMERIC DEFAULT 1.0;
