<script>
import { onMount } from "svelte";
import api from "../utils/api";
export let artwork_id;
export let preset_id;

let products = [];
onMount(async() => {
  try {
    const res = await api.get(`/products/?artwork_id=${artwork_id}&preset_id=${preset_id}`);
    products = res.data
  } catch (error) {
    console.error(error);
  }
})
</script>

<div>
  {#each products as product (product.id)}
    <div class='px-4 py-2 border rounded bg-white hover:bg-gray-100 mb-2'>
      {product.name}
    </div>
  {/each}
  <div class='px-4 py-2 border rounded bg-blue-500 hover:bg-blue-600 mb-2 text-white'>Add Product</div>
</div>