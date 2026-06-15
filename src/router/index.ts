import { createRouter, createWebHistory } from 'vue-router'

import LoginView from '../views/LoginView.vue'
import DashboardView from '../views/DashboardView.vue'
import ProductView from '../views/ProductView.vue'
import UserView from '../views/UserView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),

  routes: [
    {
      path: '/',
      redirect: '/login',
    },

    {
      path: '/login',
      component: LoginView,
    },

    {
      path: '/dashboard',
      component: DashboardView,
      meta: { requiresAuth: true },

      children: [
        {
          path: 'productos',
          component: ProductView,
          meta: {
            requiresAuth: true
          },
        },

        {
          path: 'usuarios',
          component: UserView,
          meta: {
            requiresAuth: true,
            requiresAdmin: true
          },
        }
      ],
    },
  ],
})

router.beforeEach((to, from, next) => {

  const token = localStorage.getItem('token')

  const user = JSON.parse(
    localStorage.getItem('user') || '{}'
  )

  if (
    to.matched.some(
      record => record.meta.requiresAuth
    ) &&
    !token
  ) {
    next('/login')
    return
  }

  if (
    to.matched.some(
      record => record.meta.requiresAdmin
    ) &&
    user.role !== 'admin'
  ) {
    next('/dashboard/productos')
    return
  }

  next()
})

export default router
