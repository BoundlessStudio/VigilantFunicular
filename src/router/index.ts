import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LevelsView from '../views/LevelsView.vue'
import OverView from '../views/OverView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/lvl/:id',
      name: 'level',
      component: LevelsView,
    },
    {
      path: '/over',
      name: 'over',
      component: OverView,
    },
  ],
})

export default router
