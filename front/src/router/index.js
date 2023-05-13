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


const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/managemylaundry',
    name: 'managemylaundry',
    component: ManageMylaundry
  },
  {
    path: '/managelaundry',
    name: 'managelaundry',
    component: ManageLaundry
  },
  {
    path: '/manageproduct',
    name: 'manageproduct',
    component: ManageProduct
  },
  {
    path: '/managereview',
    name: 'managereview',
    component: ManageReview
  },
  {
    path: '/managermypage',
    name: 'managermypage',
    component: ManagerMypage
  },
  {
    path: '/editmanagerprofile',
    name: 'editmanagerprofile',
    component: EditManagerProfile
  },
  {
    path: '/managerhistory',
    name: 'managerhistory',
    component: ManagerHistory
  },
  {
    path: '/checkreviewlist',
    name: 'checkreviewlist',
    component: CheckReviewList
  },
  {
    path: '/qna',
    name: 'qna',
    component: QnA
  },
  {
    path: '/mylaundry',
    name: 'mylaundry',
    component: MyLaundry
  },
  {
    path: '/wwnotice',
    name: 'wwnotice',
    component: WWNotice
  },
  {
    path: '/noticedetail1',
    name: 'noticedetail1',
    component: NoticeDetail1
  },
  {
    path: '/noticedetail2',
    name: 'noticedetail2',
    component: NoticeDetail2
  },
  {
    path: '/manageorder',
    name: 'manageorder',
    component: ManageOrder
  },
  {
    path: '/orderdetails',
    name: 'orderdetails',
    component: OrderDetails
  },
  {
    path: '/historydetails',
    name: 'historydetails',
    component: HistoryDetails
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
