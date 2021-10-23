<script>
import mergeImages from 'merge-images';
import { onMount } from "svelte";
import { useParams } from "svelte-navigator";
import { user } from "../store";
import api from "../utils/api";
import {Image} from 'image-js'

export let navigate;
const params = useParams();
let loading = true;
let presets = [];
let presets_changed = {};
let products = [];
let artwork = {};


onMount(async ()=> {
  try {
    const res = await Promise.all([
      api.get('/presets/?artwork_id='+$params.artwork_id),
      api.get('/artworks/'+$params.artwork_id),
    ]);
    
    presets = res[0].data;
    artwork = res[1].data;
    
    let promises = []
    for(let i=0; i<presets.length; i++){
      let presetImage = await Image.load(presets[i].image)
      let artworkImage = await Image.load(artwork.file)
      presetImage = presetImage.resize({ width: 500 })
      artworkImage = artworkImage.resize({ width: 100 })
      
      
      let starting = { x:0, y:0 }
      
      starting.x = (presetImage.width / 2) - (artworkImage.width / 2)
      starting.y = (presetImage.height / 2) - (artworkImage.height / 2)
      
      promises.push(
        mergeImages([
          { src: presetImage.toDataURL(), x:0, y:0 }, 
          { src: artworkImage.toDataURL(), x:starting.x, y:starting.y }
        ],{
          crossOrigin: 'Anonymous'
        })
        .then(b64=>presets[i].mergedImage = b64))
    }
    await Promise.all(promises)
    loading = false;  
  } catch (error) {
    console.error(error)    
  }
})

function handlePresetEnabled(preset_id){
  presets.forEach((preset, index)=> {
    if(preset.id === preset_id){
      presets[index].enabled = !presets[index].enabled
      presets_changed[preset_id] = presets[index]
    }
  });
}

async function submitPresets(){
  let data = [];

  for(const preset of Object.values(presets_changed)){
    data = [ ...data, { name: preset.name, image:preset.mergedImage, preset: preset.id, user: $user.pk, artwork: $params.artwork_id, is_active:preset.enabled }]
  }

  try {
    await api.post('/products/toggle/', data);
    navigate('/artworks/'+$params.artwork_id, { replace: true });
  } catch (error) {
    console.error(error);
  }
}



</script>
{#if loading}
<div>loading...</div>
{:else}
<section class='lg:max-w-5xl mx-auto h-full py-8'>
  <h1 class='text-3xl font-bold mb-4'>Add Products</h1>
  <div class='grid grid-cols-3 gap-8 mb-8'>
    {#each presets as preset (preset.id)}
      <div class='mb-4'>
        <img class='object-cover rounded bg-gray-50 border border-gray-100' class:opacity-70={!preset.enabled} src={preset.mergedImage} alt="preset" /> 
        <div class='text-2xl text-center my-2'>{preset.name}</div>
        <div class='flex space-x-2'>
          <button class='rounded-sm w-1/2 text-sm text-gray-600 hover:text-gray-700 bg-gray-100 hover:bg-gray-200 focus:bg-gray-300 font-medium  px-3 py-1'>Edit</button>
          <button class={`rounded-sm w-1/2 text-sm text-gray-600 hover:text-gray-700 bg-gray-100 hover:bg-gray-200 font-medium  px-3 py-1 ${preset.enabled ? "bg-green-400 hover:bg-green-500 text-white hover:text-white" : ""}`} on:click={()=>handlePresetEnabled(preset.id)}>{preset.enabled? "Enabled" : "Disabled"}</button>
        </div>
      </div>
    {/each} 
  </div>
  <div class='flex justify-end'>
    <button class='px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg' on:click={submitPresets}>Submit</button>
  </div>  
</section>
{/if}