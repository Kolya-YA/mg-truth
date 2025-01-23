// import './assets/main.css'

import { createApp } from "vue";
// import { createPinia } from 'pinia'
import HomePageApp from "@/components/MiniShop.vue";
console.log("first");
const app = createApp(HomePageApp);
// app.use(createPinia())
app.mount("#shop-home");
