import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
// import VueCookies from 'vue-cookies'


// import BootstrapVue from 'bootstrap-vue'
import "bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css'
// import 'bootstrap-vue/dist/bootstrap-vue.css'

import vuetify from './plugins/vuetify'
import { loadFonts } from './plugins/webfontloader'

loadFonts()

// createApp(App).use(router).mount('#app')
// [앱 생성 실시]
// const app = createApp(App)
// // [axios / http 통신]
// app.config.globalProperties.$axios = axios
// // app.provide('$axios', axios);   // axios 전역 설정 2번째 방법
// // [라우터 사용 설정]
// app.use(router)
// // [vuetify 사용 설정]
// app.use(vuetify)
// // [main 아이디 : 렌더링 시작점]
// app.mount('#app')

const app = createApp(App);
app.use(router)
app.use(vuetify)
// app.use(BootstrapVue)
// app.use(VueCookies)
// app.use(store);
app.config.globalProperties.axios = axios;
app.mount('#app');