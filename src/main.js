import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'

import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

import vuetify from './plugins/vuetify'
import { loadFonts } from './plugins/webfontloader'
import store from './store'

loadFonts()

// createApp(App)
//   .use(router)
//   .use(vuetify)
//   .mount('#app')
const app = createApp(App).use(store)
app.use(router)
app.use(vuetify)
app.config.globalProperties.axios = axios;

app.mount('#app');