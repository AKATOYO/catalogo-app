<script>
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  'https://TU-PROYECTO.supabase.co',
  'sb_publishable_jWnZtBxthINwZnn2NDS6wg_wour17Cc'
)

// Ejemplo: leer datos
const { data, error } = await supabase
  .from('usuarios')
  .select('*')

console.log(data)
</script>
