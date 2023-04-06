import { createRouter, createWebHistory } from 'vue-router'

import HomeView from '../views/HomeView.vue'
import AroundLaundryVue from '@/views/AroundLaundry.vue'
import UsageHistoryVue from '@/views/UsageHistory.vue'
import MyPageVue from '@/views/MyPage.vue'

import LoginFormVue from '@/views/LoginForm.vue'
import SignUpFormVue from '@/views/SignUpForm.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/aroundlaundary',
    name: 'aroundlaundary',
    component: AroundLaundryVue
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
  {
    path: '/signup',
    name: 'signup',
    component: SignUpFormVue
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
