import Vue from 'vue'
import VueRouter from 'vue-router'
import MemoView from '../views/MemoView.vue'
import ConceptView from '../views/ConceptView.vue'
import ConceptDetailView from '../views/ConceptDetailView.vue'
import NovelView from '../views/NovelView.vue'
import MyPageView from '../views/MyPageView.vue'
import MemoDetailView from '../views/MemoDetailView.vue'
import LoginView from '../views/LoginView.vue'
import JoinView from '../views/JoinView.vue'
import NovelSeriesView from '../views/NovelSeriesView.vue'
import NovelDetailView from '../views/NovelDetailView.vue'


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'login',
    component: LoginView
  },
  {
    path: '/memo',
    name: 'memo',
    component: MemoView
  },
  {
    path: '/concept',
    name: 'concept',
    component: ConceptView
  },
  {
    path: '/concept_detail',
    name: 'concept detail',
    component: ConceptDetailView
  },
  {
    path: '/novel',
    name: 'novel',
    component: NovelView
  },
  {
    path: '/mypage',
    name: 'mypage',
    component: MyPageView
  },
  {
    path: '/memo_detail',
    name: 'memo detail',
    component: MemoDetailView
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView
  },
  {
    path: '/join',
    name: 'join',
    component: JoinView
  },
  {
    path: '/novel_series',
    name: 'novel series',
    component: NovelSeriesView
  },
  {
    path: '/novel_detail',
    name: 'novel detail',
    component: NovelDetailView
  },

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
