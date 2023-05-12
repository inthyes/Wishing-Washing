import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'

import vuetify from './plugins/vuetify'
import { loadFonts } from './plugins/webfontloader'

loadFonts()

// createApp(App).use(router).mount('#app')
// [앱 생성 실시]
const app = createApp(App)
// [axios / http 통신]
app.config.globalProperties.$axios = axios
// app.provide('$axios', axios);   // axios 전역 설정 2번째 방법
// [라우터 사용 설정]
app.use(router)
// [vuetify 사용 설정]
app.use(vuetify)
// [main 아이디 : 렌더링 시작점]
app.mount('#app')
