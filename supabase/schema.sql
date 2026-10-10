-- 1. Ve al Dashboard de tu proyecto en Supabase (supabase.com)
-- 2. Entra a la sección "SQL Editor" en el menú izquierdo
-- 3. Pega este código completo y haz clic en "Run"

-- Crea la tabla para almacenar los registros de la landing page
CREATE TABLE IF NOT EXISTS public.leads (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
  name text NOT NULL,
  phone_code text NOT NULL,
  phone text NOT NULL,
  email text NOT NULL,
  country text NOT NULL,
  source text NOT NULL,
  profile text NOT NULL
);

-- Activa la Seguridad a Nivel de Fila (RLS) por buenas prácticas
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;

-- Permite que cualquiera (usuarios no autenticados desde la web) pueda insertar datos
CREATE POLICY "Allow public insert" ON public.leads
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- (Opcional) Permite leer los datos solo a roles autenticados (tu backend/dashboards)
CREATE POLICY "Allow authenticated read" ON public.leads
  FOR SELECT
  TO authenticated
  USING (true);
