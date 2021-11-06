import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import { sveltePreprocessSvg } from '@svitejs/svelte-preprocess-svg';

const svg = !!process.env.USE_SVG;

export default defineConfig({
	plugins: [
		svelte({
			preprocess: svg ? [sveltePreprocessSvg({ svgo: true, useSimpleStringParser: true })] : [],
			experimental: {
				prebundleSvelteLibraries: true
			}
		})
	],
	build: {
		outDir: svg ? 'dist/svg' : 'dist/regular'
	}
});
