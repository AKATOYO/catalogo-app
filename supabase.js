// supabase.js
export const SUPABASE_URL = "https://hwtkhblqcmptbkebiijx.supabase.co";
export const SUPABASE_KEY = "sb_publishable_jWnZtBxthINwZnn2NDS6wg_wour17Cc";

export const client = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

export async function obtenerProductos() {
  const { data, error } = await client.from("productos").select("*");
  if (error) {
    console.error("Error al cargar productos:", error);
    return [];
  }
  return data;
}
