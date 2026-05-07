-- Crear la tabla de mensajes de WhatsApp
CREATE TABLE IF NOT EXISTS public.mensajes_wsp (
    id SERIAL PRIMARY KEY,
    titulo VARCHAR(255) NOT NULL,
    contenido TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Habilitar RLS (Row Level Security) para mensajes_wsp
ALTER TABLE public.mensajes_wsp ENABLE ROW LEVEL SECURITY;

-- Crear políticas para permitir el acceso total anónimo (como está configurado el resto del dashboard localmente)
DROP POLICY IF EXISTS "Acceso total anon mensajes_wsp" ON public.mensajes_wsp;
CREATE POLICY "Acceso total anon mensajes_wsp"
ON public.mensajes_wsp
FOR ALL
USING (true)
WITH CHECK (true);

-- Añadir la columna de relación a la tabla filiales
ALTER TABLE public.filiales
ADD COLUMN IF NOT EXISTS id_mensaje_wsp INTEGER;

-- Crear la llave foránea
-- Si el mensaje se elimina, el id_mensaje_wsp en la filial se vuelve null
ALTER TABLE public.filiales
DROP CONSTRAINT IF EXISTS filiales_id_mensaje_wsp_fkey;

ALTER TABLE public.filiales
ADD CONSTRAINT filiales_id_mensaje_wsp_fkey
FOREIGN KEY (id_mensaje_wsp)
REFERENCES public.mensajes_wsp(id)
ON DELETE SET NULL;
