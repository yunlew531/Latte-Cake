import { createRouter, createWebHashHistory } from 'vue-router';
import Index from '../views/frontend/Index.vue';

const routes = [
  {
    path: '/',
    name: 'Index',
    component: Index
  },
  {
    path: '/products',
    name: 'Products',
    component: () => import('../views/frontend/Products.vue')
  },
  {
    path: '/product/:id',
    name: 'Product',
    component: () => import('../views/frontend/Product.vue')
  }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes
});

router.beforeEach((to, from, next) => {
  window.scrollTo(0, 0);
  next();
});

export default router;
