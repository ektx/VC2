import { createRouter, createWebHistory } from 'vue-router'
import routes from '@vipress-router'

console.log('routes', routes)

const scrollBehavior = function (to, from, savedPosition) {
  if (to.hash) {
    return {
      el: `#${to.hash.slice(1)}`,
      top: 100
    }
  }
  if (savedPosition) {
    return savedPosition
  } else {
    return { top: 0 }
  }
}

console.log('routes', routes, import.meta.env)

export default createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  scrollBehavior,
  routes
})
