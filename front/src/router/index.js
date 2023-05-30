import { createRouter, createWebHistory } from 'vue-router'

import HomeView from '../views/HomeView.vue'
import AroundLaundryVue from '@/views/AroundLaundry.vue'
import UsageHistoryVue from '@/views/UsageHistory.vue'
import MyPageVue from '@/views/MyPage.vue'

import LaundryDetailVue from '@/views/LaundryDetail.vue'
import SubmitLaundry from '@/views/SubmitLaundry.vue'

import LoginFormVue from '@/views/LoginForm.vue'
import SignUpFormVue from '@/views/SignUpForm.vue'
import SignUpForm2Vue from '@/views/SignUpForm2.vue'

import AddReviewVue from '@/views/AddReview.vue'
import ReviewListVue from '@/views/ReviewList.vue'
import EditProfileVue from '@/views/EditProfile.vue'
import FavoriteLaundryVue from '@/views/FavoriteLaundry.vue'
import QnAVue from '@/views/QnA.vue'
import WWNoticeVue from '@/views/WWNotice.vue'
import NoticeDetail1Vue from '@/views/NoticeDetail1.vue'
import NoticeDetail2Vue from '@/views/NoticeDetail2.vue'
import EditPassword from '@/views/EditPassword.vue'

import MyPage2 from '@/views/MyPage2.vue'

//test
import UploadFormVue from '@/views/UploadForm.vue'

const routes = [
  {
    path: '/',
    name: 'WishingWashing',
    component: HomeView
  },
  {
    path: '/aroundlaundry',
    name: '주변세탁소',
    component: AroundLaundryVue
  },
  {
    path: '/usagehistory',
    name: '이용내역',
    component: UsageHistoryVue
  },
  {
    path: '/mypage',
    name: 'Mypage',
    component: MyPageVue
  },
  {
    path: '/mypage2',
    name: '마이페이지',
    component: MyPage2
  },
  {
    path: '/laundrydetail/:id',
    name: '상세정보',
    component: LaundryDetailVue,
    // props: true
  },
  {
    path: '/submitlaundry/:id',
    name: '세탁신청',
    component: SubmitLaundry,
  },

  {
    path: '/login',
    name: '로그인',
    component: LoginFormVue
  },

  
  {
    path: '/signup',
    name: '회원가입',
    component: SignUpFormVue
  },
  {
    path: '/signup2',
    name: '회원가입2',
    component: SignUpForm2Vue
  },
  {
    path: '/EditPassword',
    name: '비밀번호수정',
    component: EditPassword,
  },
  {
    path: '/addreview/:storeId/:orderNum',
    name: '리뷰작성',
    component: AddReviewVue
  },
  {
    path: '/reviewlist',
    name: '내 작성리뷰',
    component: ReviewListVue
  },
  {
    path: '/editprofile',
    name: '프로필 편집',
    component: EditProfileVue
  },
  {
    path: '/favoritelaundry',
    name: '관심 세탁소',
    component: FavoriteLaundryVue
  },
  {
    path: '/qna',
    name: 'Q&A',
    component: QnAVue
  },
  {
    path: '/wwnotice',
    name: '공지사항',
    component: WWNoticeVue
  },
  {
    path: '/noticedetail1',
    name: 'noticedetail1',
    component: NoticeDetail1Vue
  },
  {
    path: '/noticedetail2',
    name: 'noticedetail2',
    component: NoticeDetail2Vue
  },

  {
    path: '/UploadForm',
    name: '업로드',
    component: UploadFormVue
  },


]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router