import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '@/views/Layout'
import Home from '@/views/Home'
import My from '@/views/My'
import Question from '@/views/Question'
import Video from '@/views/Video'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: Layout,
    redirect: '/home',
    children: [
      { path: 'home', component: Home },
      { path: 'video', component: Video },
      { path: 'question', component: Question },
      { path: 'my', component: My }
    ]
  }

]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
