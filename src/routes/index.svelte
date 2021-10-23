<script>
import { onMount } from "svelte";
import { user } from '../store'
export let navigate;

if ($user) {
  navigate('/artworks/', { replace: true })
}else{
  navigate('/login/', { replace: true })
}
</script>