import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LaundryListVue from '@/views/LaundryList.vue'
import UsageHistoryVue from '@/views/UsageHistory.vue'
import MyPageVue from '@/views/MyPage.vue'
import LoginFormVue from '@/views/LoginForm.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/laundarylist',
    name: 'laundary',
    component: LaundryListVue
  },
  {
    path: '/usagehistory',
    name: 'usage',
    component: UsageHistoryVue
  },
  {
    path: '/mypage',
    name: 'mypage',
    component: MyPageVue
  },

  {
    path: '/login',
    name: 'login',
    component: LoginFormVue
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
