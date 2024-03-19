import { vitePreprocess } from '@sveltejs/vite-plugin-svelte'


export default {
  // Consult https://svelte.dev/docs#compile-time-svelte-preprocess
  // for more information about preprocessors
  kit: {
		adapter: adapter({
			// default options are shown. On some platforms
			// these options are set automatically — see below
			pages: 'build',
			assets: 'build',
			fallback: undefined,
			precompress: false,
			strict: true
		}),
    paths: {
			base: process.argv.includes('dev') ? '' : process.env.BASE_PATH
		}
	},
  preprocess: vitePreprocess(),
}
