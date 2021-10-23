<script>
import { user } from "../store";
import api from "../utils/api";
export let navigate;

const demousers = [
  { email: 'demouser@mysite.com', password: 'demouser' },
]

async function login_demo(demouser_index=0){
  const res = await api.post('accounts/login/', demousers[0]);
  if(res.status === 200){
    user.set(res.data.user);
    navigate("/artworks/", { replace: true });
  }else{
    console.error(error);
  }
}


</script>

<section class='w-full h-full'>
  <div class='px-8 py-8 rounded-lg shadow mt-16 bg-white w-80 text-center mx-auto'>
    <h1 class='text-2xl font-semibold mb-4'>Sign In</h1>
    <button class='px-4 py-2 rounded-lg bg-red-500 hover:bg-red-600 text-white' on:click={login_demo}>Sign In As a demo user</button>
  </div>  
</section>

