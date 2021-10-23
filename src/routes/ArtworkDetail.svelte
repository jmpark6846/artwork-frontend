<script>
  import { onMount } from "svelte";
  import { useParams } from "svelte-navigator";
  import api from "../utils/api";
  export let navigate;
  const params = useParams();
  let loading = true;
  let artwork = {};
  let products = [];
  
  onMount(async ()=> {
    try {
      const res = await api.get('/artworks/'+$params.artwork_id);
      artwork = res.data;
      loading = false;
    } catch (error) {
      console.error(error)    
    }
  })
  
  </script>
  {#if loading }
    <div>loading...</div>
  {:else}
  <section class='lg:max-w-5xl mx-auto h-full py-8'>
    <div class='mb-12'>
      <span class='mb-4 text-sm text-gray-600'>Artwork Detail</span>
      <h1 class='text-3xl font-bold mb-4'>{artwork.title}</h1>
      <img class='object-cover max-w-lg max-h-72 rounded bg-gray-50 border border-gray-100' src={artwork.file} alt="artwork" /> 
    </div>
    <div class='flex justify-between items-center mb-2'>
      <h3 class='text-xl font-semibold'>Products for this artwork</h3>
      <button class='px-4 py-2 rounded bg-red-500 text-white hover:bg-red-600' on:click="{navigate(`/artworks/${$params.artwork_id}/presets/`)}">Change</button>
    </div>
    
    <div class='grid grid-cols-3 gap-8'>
      {#each artwork.products as product (product.id)}
        <div class='mb-4 hover:opacity-80 cursor-pointer' on:click="{navigate(`/products/${product.id}/`)}" >
          <img class='object-cover rounded bg-gray-50 border border-gray-100' src={product.image} alt="{product.name}" /> 
          <div class='text-2xl text-center my-2'>{product.name}</div>
          <div class='text-center'><span  class={`rounded text-xs px-3 py-1 ${product.is_active ? "bg-green-400 text-white " : "text-gray-600 bg-gray-100"}`}>{product.is_active ? "ENABLED":"DISABLED"}</span></div>
        </div>
      {:else}
        <div>Nothing yet :)</div>
      {/each}
      <div>
  
      </div>
    </div>
  </section>
  {/if}
  