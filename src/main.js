import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'

import "bootstrap"; 
import "bootstrap/dist/css/bootstrap.min.css";
import vuetify from './plugins/vuetify'

// createApp(App).use(router).mount('#app')
const app = createApp(App).use(router);
app.config.globalProperties.axios = axios;
app.use(vuetify)        // vuetify 가져오기
app.mount('#app');