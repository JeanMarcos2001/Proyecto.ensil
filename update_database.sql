-- ============================================================
-- ACTUALIZACIÓN DE TABLA CITAS Y FUNCIONES RPC
-- Proyecto: Dashboard-EnsilWeb
-- ============================================================

-- 1. Agregar columnas a la tabla citas si no existen
ALTER TABLE public.citas ADD COLUMN IF NOT EXISTS creado_en TIMESTAMP WITH TIME ZONE DEFAULT NOW();
ALTER TABLE public.citas ADD COLUMN IF NOT EXISTS tipo_cita TEXT;

-- 2. Actualizar función registrar_reserva (Caso Independiente o General con switch)
CREATE OR REPLACE FUNCTION public.registrar_reserva(
  p_nombre_alumno      TEXT,
  p_edad_alumno        INTEGER,
  p_telefono_alumno    TEXT,
  p_nombre_apoderado   TEXT,      -- NULL para independientes
  p_telefono_apoderado TEXT,      -- NULL para independientes
  p_id_filial          INTEGER,
  p_fecha              DATE,
  p_hora               TIME,
  p_es_dependiente     BOOLEAN
)
RETURNS VOID
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  v_id_alumno    INTEGER;
  v_id_apoderado INTEGER := NULL;
BEGIN

  -- Si tiene apoderado (p_es_dependiente = TRUE), insertar apoderado primero
  IF p_es_dependiente = TRUE AND p_nombre_apoderado IS NOT NULL THEN
    INSERT INTO public.apoderados (nombre_completo, telefono)
    VALUES (p_nombre_apoderado, p_telefono_apoderado)
    RETURNING id INTO v_id_apoderado;
  END IF;

  -- Insertar el alumno
  INSERT INTO public.alumnos (nombre_completo, edad, telefono, id_apoderado)
  VALUES (p_nombre_alumno, p_edad_alumno, p_telefono_alumno, v_id_apoderado)
  RETURNING id INTO v_id_alumno;

  -- Insertar la cita registrando tipo_cita y creado_en
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

-- 3. Actualizar función registrar_familia (Caso Dependiente / Apoderado + N Alumnos)
CREATE OR REPLACE FUNCTION public.registrar_familia(
  p_nombre_apoderado   TEXT,
  p_telefono_apoderado TEXT,
  p_nombres_alumnos    TEXT[],
  p_edades_alumnos     INTEGER[],
  p_id_filial          INTEGER,
  p_fecha              DATE,
  p_hora               TIME
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

  -- Insertar el apoderado
  INSERT INTO public.apoderados (nombre_completo, telefono)
  VALUES (p_nombre_apoderado, p_telefono_apoderado)
  RETURNING id INTO v_id_apoderado;

  -- Iterar sobre cada alumno del arreglo
  FOR i IN 1 .. array_length(p_nombres_alumnos, 1)
  LOOP
    -- Insertar alumno vinculado al apoderado
    INSERT INTO public.alumnos (nombre_completo, edad, id_apoderado)
    VALUES (p_nombres_alumnos[i], p_edades_alumnos[i], v_id_apoderado)
    RETURNING id INTO v_id_alumno;

    -- Insertar cita para ese alumno registrando tipo_cita y creado_en
    INSERT INTO public.citas (id_alumno, id_filial, fecha_cita, hora_cita, estado, creado_en, tipo_cita)
    VALUES (v_id_alumno, p_id_filial, p_fecha, p_hora, 'PENDIENTE', NOW(), 'matricula_dependiente');
  END LOOP;

END;
$$;

-- 4. Reasignar Permisos
GRANT EXECUTE ON FUNCTION public.registrar_reserva(TEXT, INTEGER, TEXT, TEXT, TEXT, INTEGER, DATE, TIME, BOOLEAN) TO anon;
GRANT EXECUTE ON FUNCTION public.registrar_familia(TEXT, TEXT, TEXT[], INTEGER[], INTEGER, DATE, TIME) TO anon;
