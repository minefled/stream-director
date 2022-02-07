import APIClient from './api/APIClient';
import App from './App.svelte';

const api = new APIClient("ws://localhost:40923");

const app = new App({
	target: document.body,
	props: {
		api
	}
});

export default app;