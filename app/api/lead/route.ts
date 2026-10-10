import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// Inicializamos el cliente de Supabase
// (Necesitarás tener estas variables en tu archivo .env.local)
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || '';

// Creamos el cliente solo si tenemos las credenciales para evitar errores en compilación
const supabase = (supabaseUrl && supabaseKey) 
  ? createClient(supabaseUrl, supabaseKey) 
  : null;

export async function POST(req: Request) {
  try {
    const data = await req.json();
    
    // Verificamos que tengamos la conexión a Supabase
    if (!supabase) {
      console.error("Faltan las credenciales de Supabase en las variables de entorno.");
      // MOCK FALLBACK: si aún no pones el .env, simulamos que guardó para no romper la UI
      await new Promise((resolve) => setTimeout(resolve, 1500));
      return NextResponse.json(
        { success: true, message: 'Mock (Faltan credenciales Supabase)' },
        { status: 200 }
      );
    }

    // Insertamos los datos reales en la tabla 'leads' de Supabase
    // NOTA: Asegúrate de que la tabla en Supabase se llame 'leads' y tenga estas columnas
    const { data: insertedData, error } = await supabase
      .from('leads')
      .insert([
        {
          name: data.name,
          phone_code: data.phoneCode,
          phone: data.phone,
          email: data.email,
          country: data.country,
          source: data.source,
          profile: data.profile,
          // La columna 'created_at' debería estar configurada para llenarse automáticamente en tu base de datos
        }
      ]); // Quitamos el .select() para evitar el error de lectura RLS

    if (error) {
      console.error("Error de Supabase al insertar:", error);
      throw error;
    }

    console.log("LEAD GUARDADO EN SUPABASE EXITOSAMENTE");

    // DISPARADOR A N8N (Automatización)
    const n8nWebhookUrl = process.env.N8N_WEBHOOK_URL;
    if (n8nWebhookUrl) {
      try {
        await fetch(n8nWebhookUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: data.name,
            phone: `${data.phoneCode} ${data.phone}`,
            email: data.email,
            country: data.country,
            profile: data.profile,
            timestamp: new Date().toISOString()
          })
        });
        console.log("LEAD ENVIADO A N8N EXITOSAMENTE");
      } catch (n8nError) {
        console.error("Error al notificar a n8n:", n8nError);
        // Si n8n falla, no detenemos el proceso (el usuario ya se guardó en Supabase)
      }
    }

    return NextResponse.json(
      { success: true, message: 'Lead guardado en Supabase exitosamente.' },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Error procesando lead:", error);
    return NextResponse.json(
      { success: false, message: 'Error procesando el lead', error: error?.message || error },
      { status: 500 }
    );
  }
}
