<script>
import { Router, Route } from 'svelte-navigator'
import PrivateRoute from './components/PrivateRoute/PrivateRoute.svelte'
import Login from './routes/login.svelte';
import Index from './routes/index.svelte';
import NotFound404 from './routes/NotFound404.svelte';
import Layout from './routes/layout.svelte';
</script>

<Router>
	<Layout>
		<Route path='/login' components={Login} />
		<Route path='/' component={Index}/>
	</Layout>
</Router>
<style global> 
@import "tailwindcss/base";
@import "tailwindcss/components";
@import "tailwindcss/utilities";
@import "./global.css";
</style>