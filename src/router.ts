import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

import Dashboard from './views/Dashboard.vue'
import NotFound from './views/NotFound.vue'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Dashboard',
    component: Dashboard,    
  },   
  { 
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: NotFound,
    meta: { layout: 'empty' },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes: routes,
});

export default router;
