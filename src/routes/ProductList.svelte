<script>
import { onMount } from "svelte";
import api from "../utils/api";
export let navigate;
let products = [];

onMount(async ()=> {
  try {
    const res = await api.get('/products/');
    products = res.data
  } catch (error) {
    console.error(error)    
  }
})

</script>
<section class='lg:max-w-5xl mx-auto h-full py-8'>
  <h1 class='text-3xl font-bold mb-4'>Your  Products</h1>

  <div class='grid grid-cols-3 gap-8'>
    {#each products as product (product.id)}
      <div class='mb-4'>
        <img class='object-cover rounded bg-gray-50 border border-gray-100' src={product.image} alt="{product.name}" /> 
        <div class='text-2xl text-center my-2'>{product.name}</div>
        <div class='text-center'><span  class={`rounded text-xs px-3 py-1 ${product.is_active ? "bg-green-400 text-white " : "text-gray-600 bg-gray-100"}`}>{product.is_active ? "ENABLED":"DISABLED"}</span></div>
      </div>
    {/each}
    <div>

    </div>
  </div>
</section>