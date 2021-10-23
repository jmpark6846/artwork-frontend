<script>
import { Router, Route } from 'svelte-navigator'
import PrivateRoute from './components/PrivateRoute/PrivateRoute.svelte'
import Layout from './routes/layout.svelte';
import Index from './routes/index.svelte';
import Login from './routes/login.svelte';
import NotFound404 from './routes/NotFound404.svelte';
import AddArtwork from './routes/addArtwork.svelte';
import ApplyPreset from './routes/ApplyPreset.svelte';
import ProductList from './routes/ProductList.svelte';
import ArtworkList from './routes/ArtworkList.svelte';
import api from './utils/api';
import ArtworkDetail from './routes/ArtworkDetail.svelte';
import Modal from 'svelte-simple-modal';
import { modal } from './store'
import ProductDetail from './routes/ProductDetail.svelte';

api.defaults.baseURL = BASE_URL;
</script>

<Layout>
	<Router>
		<PrivateRoute path="products/:product_id" let:location let:navigate>
			<ProductDetail {navigate}/>
		</PrivateRoute>

		<PrivateRoute path="products/" let:location let:navigate>
			<ProductList {navigate}/>
		</PrivateRoute>
		<PrivateRoute path="artworks/:artwork_id/presets/" let:location let:navigate>
			<Modal show={$modal}>
				<ApplyPreset {navigate}/>
			</Modal>
		</PrivateRoute>
		<PrivateRoute path="artworks/:artwork_id/" let:location let:navigate>
			<ArtworkDetail {navigate}/>
		</PrivateRoute>
	
		<PrivateRoute path="artworks/add/" let:location let:navigate>
			<AddArtwork {navigate} />
		</PrivateRoute>
		<PrivateRoute path="artworks/" let:location let:navigate>
			<ArtworkList {navigate} />
		</PrivateRoute>
		<Route path='/login/' let:location let:navigate>
			<Login {navigate} />
		</Route>
		<Route path='/' component={Index} let:navigate/>
		<Route path='*' component={NotFound404}/>
	</Router>
</Layout>
<style global> 
@import "tailwindcss/base";
@import "tailwindcss/components";
@import "tailwindcss/utilities";
@import "./global.css";
</style>