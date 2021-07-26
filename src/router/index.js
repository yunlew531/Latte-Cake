import { createRouter, createWebHashHistory } from 'vue-router';
import Index from '../views/frontend/Index.vue';

const routes = [
  {
    path: '/',
    name: 'Index',
    redirect: '/home',
    component: Index,
    children: [
      {
        path: 'home',
        name: 'Home',
        component: () => import('../views/frontend/Home.vue'),
        props: (route) => ({
          ...route.params,
        }),
      },
      {
        path: 'products',
        name: 'Products',
        component: () => import('../views/frontend/Products.vue'),
        props: (route) => ({
          ...route.query,
          ...route.params,
        }),
      },
      {
        path: 'product/:id',
        name: 'Product',
        component: () => import('../views/frontend/Product.vue'),
      },
      {
        path: 'cart',
        name: 'Cart',
        component: () => import('../views/frontend/Cart.vue'),
      },
      {
        path: 'aboutUs',
        name: 'AboutUs',
        component: () => import('../views/frontend/AboutUs.vue'),
        props: (route) => ({
          ...route.query,
        }),
      },
      {
        path: 'checkout',
        name: 'Checkout',
        component: () => import('../views/frontend/Checkout.vue'),
      },
    ],
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/backend/Login.vue'),
  },
  {
    path: '/admin',
    name: 'Backstage',
    redirect: '/admin/Products',
    component: () => import('../views/backend/Backstage.vue'),
    children: [
      {
        path: 'addProduct',
        name: 'AddProduct',
        component: () => import('../views/backend/AddProduct.vue'),
      },
      {
        path: 'products',
        name: 'BackendProducts',
        component: () => import('../views/backend/Products.vue'),
      },
      {
        path: 'coupon',
        name: 'Coupon',
        component: () => import('../views/backend/Coupon.vue'),
      },
      {
        path: 'orders',
        name: 'Orders',
        component: () => import('../views/backend/Orders.vue'),
      },
      {
        path: 'order/:id',
        name: 'Order',
        component: () => import('../views/backend/Order.vue'),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  window.scrollTo(0, 0);
  next();
});

export default router;
