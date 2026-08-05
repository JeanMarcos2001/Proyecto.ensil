-- ============================================================
-- AGREGAR CAMPO EMAIL A TABLAS ALUMNOS / APODERADOS Y ACTUALIZAR RPC
-- Proyecto: Dashboard-EnsilWeb
-- ============================================================

-- 1. Asegurar que no quede email en citas (por si se ejecutó una versión anterior)
ALTER TABLE public.citas DROP COLUMN IF EXISTS email;

-- 2. Agregar columnas email a las tablas alumnos y apoderados si no existen
ALTER TABLE public.alumnos ADD COLUMN IF NOT EXISTS email TEXT;
ALTER TABLE public.apoderados ADD COLUMN IF NOT EXISTS email TEXT;

-- 3. Actualizar función registrar_reserva para soportar el parámetro p_email
CREATE OR REPLACE FUNCTION public.registrar_reserva(
  p_nombre_alumno      TEXT,
  p_edad_alumno        INTEGER,
  p_telefono_alumno    TEXT,
  p_nombre_apoderado   TEXT,      
  p_telefono_apoderado TEXT,      
  p_id_filial          INTEGER,
  p_fecha              DATE,
  p_hora               TIME,
  p_es_dependiente     BOOLEAN,
  p_email              TEXT DEFAULT NULL
)
RETURNS VOID
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  v_id_alumno    INTEGER;
  v_id_apoderado INTEGER := NULL;
BEGIN

  -- Si tiene apoderado (p_es_dependiente = TRUE), insertar apoderado primero con su email
  IF p_es_dependiente = TRUE AND p_nombre_apoderado IS NOT NULL THEN
    INSERT INTO public.apoderados (nombre_completo, telefono, email)
    VALUES (p_nombre_apoderado, p_telefono_apoderado, p_email)
    RETURNING id INTO v_id_apoderado;
  END IF;

  -- Insertar el alumno. Si es independiente, guardar el email en alumnos.
  INSERT INTO public.alumnos (nombre_completo, edad, telefono, id_apoderado, email)
  VALUES (
    p_nombre_alumno, 
    p_edad_alumno, 
    p_telefono_alumno, 
    v_id_apoderado, 
    CASE WHEN p_es_dependiente = FALSE THEN p_email ELSE NULL END
  )
  RETURNING id INTO v_id_alumno;

  -- Insertar la cita registrando tipo_cita, creado_en (sin el campo email)
  INSERT INTO public.citas (id_alumno, id_filial, fecha_cita, hora_cita, estado, creado_en, tipo_cita)
  VALUES (
    v_id_alumno, 
    p_id_filial, 
    p_fecha, 
    p_hora, 
    'PENDIENTE', 
    NOW(), 
    CASE WHEN p_es_dependiente = TRUE THEN 'matricula_dependiente' ELSE 'matricula_independiente' END
  );

END;
$$;

-- 4. Actualizar función registrar_familia para soportar el parámetro p_email
CREATE OR REPLACE FUNCTION public.registrar_familia(
  p_nombre_apoderado   TEXT,
  p_telefono_apoderado TEXT,
  p_nombres_alumnos    TEXT[],
  p_edades_alumnos     INTEGER[],
  p_id_filial          INTEGER,
  p_fecha              DATE,
  p_hora               TIME,
  p_email              TEXT DEFAULT NULL
)
RETURNS VOID
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  v_id_apoderado INTEGER;
  v_id_alumno    INTEGER;
  i              INTEGER;
BEGIN

  -- Insertar el apoderado con su email
  INSERT INTO public.apoderados (nombre_completo, telefono, email)
  VALUES (p_nombre_apoderado, p_telefono_apoderado, p_email)
  RETURNING id INTO v_id_apoderado;

  -- Iterar sobre cada alumno del arreglo
  FOR i IN 1 .. array_length(p_nombres_alumnos, 1)
  LOOP
    -- Insertar alumno vinculado al apoderado (sin email para alumnos dependientes)
    INSERT INTO public.alumnos (nombre_completo, edad, id_apoderado, email)
    VALUES (p_nombres_alumnos[i], p_edades_alumnos[i], v_id_apoderado, NULL)
    RETURNING id INTO v_id_alumno;

    -- Insertar cita para ese alumno registrando tipo_cita, creado_en (sin el campo email)
    INSERT INTO public.citas (id_alumno, id_filial, fecha_cita, hora_cita, estado, creado_en, tipo_cita)
    VALUES (v_id_alumno, p_id_filial, p_fecha, p_hora, 'PENDIENTE', NOW(), 'matricula_dependiente');
  END LOOP;

END;
$$;

-- 5. Reasignar Permisos (anon)
GRANT EXECUTE ON FUNCTION public.registrar_reserva(TEXT, INTEGER, TEXT, TEXT, TEXT, INTEGER, DATE, TIME, BOOLEAN, TEXT) TO anon;
GRANT EXECUTE ON FUNCTION public.registrar_familia(TEXT, TEXT, TEXT[], INTEGER[], INTEGER, DATE, TIME, TEXT) TO anon;
