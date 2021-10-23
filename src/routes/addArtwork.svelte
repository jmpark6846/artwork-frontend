<script>
import api from "../utils/api";
import { user } from '../store'
export let navigate;
let artworkInputData = { title: "", tags:[], description: "", file: null}
let imageUploadEl;
let preview;
let currentStep = 1;

$: {
  const stepElements = document.querySelectorAll('div[data-step]');
  for(const el of stepElements){
    console.log(el.dataset.step, el.dataset.step === currentStep);
    if(Number(el.dataset.step) === currentStep){
      el.classList.remove('hidden')
      el.classList.add('block')
    }else{
      el.classList.add('hidden')
      el.classList.remove('block')
    }
  }
}

const onFileSelected =(e)=>{
  let image = e.target.files[0];
  let reader = new FileReader();
  reader.readAsDataURL(image);
  reader.onload = e => {
    preview = e.target.result
    currentStep = 2;
  };
}

async function submitArtwork(){
  const config = {headers: {'Content-Type': 'multipart/form-data'}}

  if(imageUploadEl.files.length !== 0){
    const formData = new FormData();
    formData.append('file', imageUploadEl.files[0]);
    formData.append('user', $user.pk);
    formData.append('title', artworkInputData.title);
    // formData.append('tags', null);
    formData.append('description', artworkInputData.description);
  
    try {
      const res = await api.post('/artworks/', formData, config);
      navigate('/artworks/'+res.data.id+'/presets/')
    } catch (error) {
      console.error(error)
    }
  }
}

</script>
<section class='lg:max-w-5xl mx-auto h-full py-8'>
  <div class=' text-center mb-8'>
    <h1 class='font-semibold text-4xl'>Add new work</h1>
  </div>
  <input class='hidden' type="file" accept="image/*" bind:value={artworkInputData.file} bind:this={imageUploadEl} on:change={(e)=>onFileSelected(e)}>
  <div data-step=1 class=''>
    <div class="flex space-x-6 mb-8">
      <div class='shadow-lg w-1/2 text-center flex flex-col justify-items-center items-center py-20 hover:bg-gray-50 cursor-pointer' on:click={()=>imageUploadEl.click()}>
        <div>
          <svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16 mb-2 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
          </svg>
        </div>
        <div class='font-bold'>
          Upload new work
        </div>
      </div>
      <div class='shadow-lg w-1/2 text-center flex flex-col justify-items-center items-center py-20 hover:bg-gray-50 cursor-pointer'>
        <svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16 mb-2  text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2" />
        </svg>
        <div class='font-bold mb-1'>
          Copy an existing work
        </div>
        <div class='text-sm'>
          Manage Portfolio -> Settings -> Copy
        </div>
      </div>
    </div>
    <div class="flex space-x-6">
      <div class='w-1/2 text-center'>
        <div class='font-bold text-sm mb-4'>
          File requirements
        </div>
        <div class='text-sm'>
          <div>We recommend high-resolution JPEG, PNG or GIF</div>
          <div>files with a <span class='font-bold'>minimum</span> of 1000px resolution. For more</div>
          <div>help, check out our <span class='text-red-500'>design guide</span></div>
        </div>
      </div>
      <div class='w-1/2 text-center'>
        <div class='font-bold text-sm mb-4'>
          What is this?
        </div>
        <div class='text-sm'>
          <div>Copy the same products and design placement from</div>
          <div>another design. This is particularly great for color</div>
          <div>variants</div>
        </div>
      </div>
    </div>
  </div>
  <div data-step=2 class='hidden'>
    <div class="flex space-x-12">
      <div class='w-2/5'>
        {#if preview}
          <img class='object-cover hover:opacity-80 cursor-pointer' on:click={()=>imageUploadEl.click()} src="{preview}" alt="preview" />
        {:else}
          <img class='object-cover hover:opacity-80 cursor-pointer' on:click={()=>imageUploadEl.click()} src="https://cdn4.iconfinder.com/data/icons/small-n-flat/24/user-alt-512.png" alt="" /> 
        {/if}
      </div>
      <div class='w-3/5'>
        <div class="bg-white mb-8">
          <nav class="flex flex-col sm:flex-row">
            <button class="text-gray-600 py-4 px-6 block hover:text-red-500 focus:outline-none text-red-500 border-b-2 font-medium border-red-500">
                English
            </button>
            <button class="text-gray-600 py-4 px-6 block hover:text-red-500 focus:outline-none border-b-2 border-gray-300">
                Deutsch
            </button>
            <button class="text-gray-600 py-4 px-6 block hover:text-red-500 focus:outline-none border-b-2 border-gray-300">
                Francais
            </button>
            <button class="text-gray-600 py-4 px-6 block hover:text-red-500 focus:outline-none border-b-2 border-gray-300">
                Espanol
            </button>
          </nav>
      </div>
      <div>
        <div class='mb-4'>
          <div class='font-semibold mb-2 text-gray-600'>Title (required)</div>
          <input type='text' bind:value={artworkInputData.title} placeholder="Use 4 to 8 words to describe your work" class='border-2 rounded-lg px-3 py-2 border-gray-300 focus-visible:outline-none w-full' />
        </div>  
        <div class='mb-4'>
          <div class='font-semibold mb-2 text-gray-600'>Tags</div>
          <input type='text' bind:value={artworkInputData.tags} placeholder="Seperate tags with commas." class='border-2 rounded-lg px-3 py-2 border-gray-300 focus-visible:outline-none w-full' />
        </div>  
        <div class='mb-4'>
          <div class='font-semibold mb-2 text-gray-600'>Description</div>
          <textarea bind:value={artworkInputData.description} placeholder='Describe your work to get your audience excited' class='border-2 rounded-lg px-3 py-2 border-gray-300 focus-visible:outline-none w-full' />
        </div>
        <div class='flex justify-end'>
          <button class='px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg' on:click={submitArtwork}>Submit</button>
        </div>  
      </div>
      
    </div>
  </div>
</section>
