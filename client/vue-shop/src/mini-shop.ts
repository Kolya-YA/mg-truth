// import './assets/main.css'

import { createApp } from "vue";
// import { createPinia } from 'pinia'
import MiniShop from "@/components/MiniShop.vue";

const app = createApp(MiniShop);

// app.use(createPinia())
app.mount("#mini-shop");
