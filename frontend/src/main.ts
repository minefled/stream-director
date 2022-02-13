import APIClient from './api/APIClient';
import App from './App.svelte';

const api = new APIClient("ws://localhost:8090/api/gateway");

const app = new App({
	target: document.body,
	props: {
		api
	}
});

export default app;