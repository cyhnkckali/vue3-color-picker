// vite.config.js
import vue from '@vitejs/plugin-vue'
import {resolve} from 'path'
import {defineConfig} from 'vite'

export default defineConfig({
	plugins: [vue()],
	build: {
		lib: {
			// Could also be a dictionary or array of multiple entry points
			entry: resolve(__dirname, 'src/index.js'),
			name: 'Vue3ColorPicker',
			// the proper extensions will be added
			fileName: 'vue3-color-picker',
		},
		rollupOptions: {
			// make sure to externalize deps that shouldn't be bundled
			// into your library
			external: ['vue'],
			output: {
				// Provide global variables to use in the UMD build
				// for externalized deps
				globals: {
					vue: 'Vue',
				},
			},
		},
		resolve: {
			alias: {
				'@': resolve(__dirname, 'src'),
			},
		},
	},
})
