/*
 * @Author: zhangLong
 * @Date: 2025-06-14 15:10:03
 * @LastEditors: zhangLong
 * @LastEditTime: 2025-06-14 16:30:54
 * @Description: 请填写简介
 */
import { createRouter, createWebHistory } from 'vue-router'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/login/index.vue')
    },
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/home/index.vue')
    }
  ],
})

export default router
