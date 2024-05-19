import { createRouter, createWebHistory, createWebHashHistory } from 'vue-router'
import HomeView from '../views/home/Home.vue'

const router = createRouter({
  // history: createWebHistory(import.meta.env.BASE_URL),
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/home',
      redirect: '/'
    },
    {
      path: '/music',
      name: 'music',
      component: () => import('../views/music/index.vue')
    },
    /*{
      path: '/three',
      name: 'three',
      // route level code-splitting
      // this generates a separate chunk (three.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/threeJs/threeView.vue')
    },*/
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/login/login.vue')
    },
    {
      path: '/registration',
      name: 'registration',
      component: () => import('../views/registration/registration.vue')
    }
  ]
})

export default router
