<script>
import Footer from "../components/Footer.svelte";

import Header from "../components/Header.svelte";
</script>

<div class='flex flex-col h-full'>
  <Header />
  <main class='flex-auto'>
    <slot />
  </main>
  <!-- <Footer /> -->
</div>