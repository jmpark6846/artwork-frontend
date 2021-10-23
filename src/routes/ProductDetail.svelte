<script>
  import { onMount } from "svelte";
  import { useParams } from "svelte-navigator";
  import api from "../utils/api";
  export let navigate;
  const params = useParams();
  let loading = true;
  let product = {};
  
  onMount(async ()=> {
    try {
      const res = await api.get('/products/'+$params.product_id);
      product = res.data;
      loading = false;
    } catch (error) {
      console.error(error)    
    }
  })
  
  </script>
  <svelte:head>
    Product Detail{loading && " - "+product.name}
  </svelte:head>
  {#if loading }
    <div>loading...</div>
  {:else}
  <section class='lg:max-w-5xl mx-auto h-full py-8'>
    <div class='mb-2 text-sm text-gray-600'>Product Detail</div>
    <div class='mb-4 flex items-center space-x-4'>
      <h1 class='text-3xl font-bold'>{product.name}</h1><span  class={`rounded text-xs px-3 py-1 ${product.is_active ? "bg-green-400 text-white " : "text-gray-600 bg-gray-100"}`}>{product.is_active ? "ENABLED":"DISABLED"}</span>
    </div>
    <img class='object-cover mb-12 max-w-lg max-h-72 rounded bg-gray-50 border border-gray-100' src={product.image} alt="artwork" /> 
    <div class='mb-2'>
      <h3 class='text-xl font-semibold'>Artwork</h3>
    </div>
    <div class='mb-4 hover:opacity-80 cursor-pointer ' on:click="{navigate(`/products/${product.id}/`)}" >
      <img class='object-cover rounded bg-gray-50 w-1/3 border border-gray-100' on:click="{navigate(`/artworks/${product.artwork.id}/`)}" src={product.artwork.file} alt="{product.artwork.title}" /> 
    </div>
  </section>
  {/if}
  