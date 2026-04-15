// supabase.js
export const SUPABASE_URL = "https://hwtkhblqcmptbkebiijx.supabase.co";
export const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlsaW9ocHJ6cXh6cHl5cnB2bHZoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzYxOTIyNTcsImV4cCI6MjA5MTc2ODI1N30.vvWoWAnHbfmZMEDWTKV8aGs6OsTKjpMam1h2OXVCjQI";

export const client = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

export async function obtenerProductos() {
  const { data, error } = await client.from("productos").select("*");
  if (error) {
    console.error("Error al cargar productos:", error);
    return [];
  }
  return data;
}
