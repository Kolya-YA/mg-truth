// import './assets/main.css'

import { createApp } from "vue";
// import { createPinia } from 'pinia'
import FullShop from "@/components/FullShop.vue";

const app = createApp(FullShop);

// app.use(createPinia())
app.mount("#full-shop");
