<script lang="ts">
	import { onMount } from "svelte";

	import type APIClient from "./api/APIClient";

	import Header from "./components/general/header/Header.svelte";
	import Scenes from "./components/general/scenes/Scenes.svelte";
	import CategoryList from "./components/general/streamelements/CategoryList.svelte";

	export let api:APIClient;

	onMount(() => {
		console.log(api);
	});
</script>

<div class="app">
	<Header />

	<div class="content">
		<Scenes api={api} />
		<CategoryList />
	</div>
</div>

<style>
	.app {
		width: 100%;
		height: 100vh;

		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.content {
		width: 100%;
		height: calc(100% - 50px);

		display: flex;
		flex-direction: row;
	}
</style>