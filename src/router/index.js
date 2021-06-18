import { createRouter, createWebHashHistory } from 'vue-router';
import Index from '../views/frontend/Index.vue';

const routes = [
  {
    path: '/',
    name: 'Index',
    component: Index,
  },
  {
    path: '/products',
    name: 'Products',
    component: () => import('../views/frontend/Products.vue'),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
