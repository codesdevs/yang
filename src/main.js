// import { createApp } from 'vue'
// import App from './App.vue'
// import router from './router'
// import { vant } from './config/vant.config.js'
// import 'vant/lib/index.css'; 
// createApp(App).use(router,vant).mount('#app')


import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { vant } from './config/vant.config.js'
import 'vant/lib/index.css'; 
import './style/index.css'
import "amfe-flexible"
const app = createApp(App);
app.use(router)
app.use(vant)
app.mount('#app')

