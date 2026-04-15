<script>
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  'https://TU-PROYECTO.supabase.co',
  'TU-ANON-KEY'
)

// Ejemplo: leer datos
const { data, error } = await supabase
  .from('usuarios')
  .select('*')

console.log(data)
</script>
