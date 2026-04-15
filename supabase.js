<script type="module">
import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm'

const supabase = createClient(
  'https://yliohprzqxzpyyrpvlvh.supabase.co',
  'sb_publishable_jWnZtBxthINwZnn2NDS6wg_wour17Cc'
)

async function cargarUsuarios() {
  const { data, error } = await supabase
    .from('usuarios')
    .select('*')

  if (error) {
    console.error('Error al leer usuarios:', error)
  } else {
    console.log('Usuarios:', data)
  }
}

cargarUsuarios()
</script>
