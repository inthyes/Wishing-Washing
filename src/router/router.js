import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../Home.vue'; // Home.vue 파일을 import

Vue.use(VueRouter);

const routes = [
  {
    path: '/home',
    name: 'Home',
    component: Home
  },
  {
    path: '/mypage',
    name: 'Mypage',
    component: () => import('../Mypage.vue') // Mypage.vue 파일을 import
  }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

export default router;