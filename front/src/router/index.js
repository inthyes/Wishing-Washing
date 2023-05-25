import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

import ManageMylaundry from '../views/ManageMylaundry.vue'
import ManageLaundry from '../views/ManageLaundry.vue'
import ManageProduct from '../views/ManageProduct.vue'
import ManageReview from '../views/ManageReview.vue'

import ManagerMypage from '../views/ManagerMypage.vue'
import EditManagerProfile from '../views/EditManagerProfile.vue'
import ManagerHistory from '../views/ManagerHistory.vue'
import CheckReviewList from '../views/CheckReviewList.vue'
import QnA from '../views/QnA.vue'
import MyLaundry from '../views/MyLaundry.vue'
import WWNotice from '../views/WWNotice.vue'
import NoticeDetail1 from '../views/NoticeDetail1.vue'
import NoticeDetail2 from '../views/NoticeDetail2.vue'

import ManageOrder from '../views/ManageOrder.vue'
import OrderDetails from '../views/OrderDetails.vue'
import HistoryDetails from '../views/HistoryDetails.vue'

import LoginFormVue from '@/views/LoginForm.vue'
import SignUpFormVue from '@/views/SignUpForm.vue'

import MyPage from '@/views/MyPage.vue'

const routes = [
  {
    path: '/',
    name: 'WsWs 사장님',
    component: HomeView
  },
  {
    path: '/manage',
    name: '내 세탁소 관리',
    component: ManageMylaundry
  },
  {
    path: '/manage/laundry',
    name: '세탁소관리',
    component: ManageLaundry
  },
  {
    path: '/manage/product',
    name: '상품관리',
    component: ManageProduct
  },
  {
    path: '/manage/review',
    name: '리뷰관리',
    component: ManageReview
  },
  {
    path: '/managermypage',
    name: 'managermypage',
    component: ManagerMypage
  },
  {
    path: '/mypage/editprofile',
    name: '프로필편집',
    component: EditManagerProfile
  },
  {
    path: '/ordercompleted',
    name: '완료된 주문',
    component: ManagerHistory
  },
  {
    path: '/ordercompleted/details',
    name: '완료주문 상세',
    component: HistoryDetails
  },
  {
    path: '/checkreviewlist',
    name: '리뷰확인',
    component: CheckReviewList
  },
  {
    path: '/qna',
    name: 'Q&A',
    component: QnA
  },
  {
    path: '/mylaundry',
    name: '내세탁소',
    component: MyLaundry
  },
  {
    path: '/wwnotice',
    name: '공지사항',
    component: WWNotice
  },
  {
    path: '/noticedetail1',
    name: '공지사항1',
    component: NoticeDetail1
  },
  {
    path: '/noticedetail2',
    name: '공지사항2',
    component: NoticeDetail2
  },
  {
    path: '/orderlist',
    name: '주문관리',
    component: ManageOrder
  },
  {
    path: '/orderdetails',
    name: '주문 상세',
    component: OrderDetails
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
    path: '/mypage',
    name: '마이페이지',
    component: MyPage
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router