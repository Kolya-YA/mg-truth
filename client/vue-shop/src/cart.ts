import { createApp } from "vue";
// import { createPinia } from 'pinia'
// import CartDrawer from "@/components/CartDrawer.vue";
import CartDrawer from "./components/CartDrawer.vue";

const app = createApp(CartDrawer);
if (import.meta.hot) {
	console.log("HMR active" , import.meta.hot);
	import.meta.hot.accept((mod) => {
		console.log("HMR update", mod);
	});
}
// app.use(createPinia())
app.mount("#cart-drawer");
// app.mount('#app')
