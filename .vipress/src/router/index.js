import { createRouter, createWebHistory } from "vue-router"
import { routes } from "vipress-virtual-router"

const scrollBehavior = function (to, from, savedPosition) {
  if (to.hash) {
    return { 
      el: `#${to.hash.slice(1)}`,
      top: 100
    }
  }
  if (savedPosition) {
    return savedPosition;
  } else {
    return { top: 0 }
  }
}

export default createRouter({
  history: createWebHistory(),
  scrollBehavior,
  routes
})