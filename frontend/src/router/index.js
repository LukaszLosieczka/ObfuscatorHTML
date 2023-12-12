import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ObfuscatorComponent from '../components/ObfuscatorComponent.vue'
import ObfuscationDetectionComponent from '../components/ObfuscationDetectionComponent.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      children: [
        {
          path: '',
          redirect: 'obfuscation'
        },
        {
          path: 'obfuscation',
          component: ObfuscatorComponent
        },
        {
          path: 'obfuscation-detection',
          component: ObfuscationDetectionComponent
        }
      ]
    }
  ]
})

export default router
