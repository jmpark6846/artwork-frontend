<script>
import { onMount } from "svelte";
import api from '../utils/api';
export let navigate;
let artworks = [];

onMount(async()=> {
  try {
    const res = await api.get('artworks/');
    artworks = res.data
  } catch (error) {
    console.error(error);
  }
})

</script>
<section class='lg:max-w-5xl mx-auto h-full py-8'>
  <h1 class='text-3xl font-bold mb-4'>Your Artworks</h1>

  <div class='grid grid-cols-3 gap-8'>
    {#each artworks as artwork (artwork.id)}
      <div class='mb-4 hover:opacity-80 cursor-pointer' on:click="{navigate(`/artworks/${artwork.id}`)}" >
        <img class='object-cover rounded bg-gray-50 border border-gray-100  max-h-60 w-full ' src={artwork.file} alt="artwork" /> 
        <div class='text-2xl text-center my-2'>{artwork.title}</div>
      </div>
    {/each}
      <div class='flex flex-col mb-4' on:click={()=>navigate('/artworks/add', { replace: true})}>
        <div class='bg-gray-50 border rounded border-gray-100 flex-auto hover:bg-gray-100 cursor-pointer text-gray-600 hover:text-gray-700'>
          <div class='text-2xl text-center my-2 flex flex-col py-20 items-center'>
            <div>
              <svg xmlns="http://www.w3.org/2000/svg" class="h-20 w-20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="0.5" d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              Add new work
            </div>
          </div>
        </div>
        <div class='text-2xl text-center my-2'><br/></div>
      </div>
    <div>

    </div>
  </div>
</section>