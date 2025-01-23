import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueDevTools from "vite-plugin-vue-devtools";
import type { PreRenderedAsset } from "rollup";

// https://vite.dev/config/
export default defineConfig({
	plugins: [vue(), vueDevTools()],
	// root: "./src",
	server: {
		hmr: true,
		watch: {
			usePolling: true,
			interval: 100,
		},
	},
	resolve: {
		alias: {
			"@": fileURLToPath(new URL("./src", import.meta.url)),
		},
	},
	build: {
		outDir: "../hugo/static",
		emptyOutDir: false,
		rollupOptions: {
			input: {
				cart: "src/cart.ts",
				"mini-shop": "./src/mini-shop.ts",
				"full-shop": "./src/full-shop.ts",
			},
			output: {
				entryFileNames: "js/[name].js",
				chunkFileNames: "js/chunks/[name]-[hash].js",
				assetFileNames: (assetInfo: PreRenderedAsset): string => {
					// Ensure asset info is valid
					if (!assetInfo?.source || !assetInfo?.names?.length) {
						console.warn("Invalid asset info received");
						return "assets/unknown-[hash][extname]";
					}

					const fileName = assetInfo.names[0];

					// More specific regex patterns
					if (/\.css$/i.test(fileName)) {
						return "css/[name]-[hash][extname]";
					}

					if (/\.(png|jpe?g|svg|gif|tiff|bmp|ico|webp)$/i.test(fileName)) {
						return "images/[name]-[hash][extname]";
					}

					return "assets/[name]-[hash][extname]";
				},
			},
		},
	},
});
