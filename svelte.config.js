import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: vitePreprocess(),
	kit: {
		adapter: adapter({
			// SPA fallback für client-seitiges Routing
			fallback: '200.html'
		}),
		// Pfad für GitHub Pages
		paths: {
			base: '/F1c'
		}
	}
};

export default config;
