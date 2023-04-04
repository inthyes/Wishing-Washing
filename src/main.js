import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'

import "bootstrap"; 
import "bootstrap/dist/css/bootstrap.min.css";

// import vuetify from './plugins/vuetify'
// import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'


const vuetify = createVuetify({
    components,
    directives,
})

// createApp(App).use(router).mount('#app')
const app = createApp(App).use(router);
app.config.globalProperties.axios = axios;
app.use(vuetify)        // vuetify 가져오기
app.mount('#app');