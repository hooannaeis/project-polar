import firebase from 'firebase';
import Vue from 'vue';
import store from '../store'
import VueRouter from 'vue-router';

import Home from '../views/Home.vue';
import { install } from 'vuex';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/sign-up',
    name: 'Sign Up',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/signUp.vue')
  },
  {
    path: '/log-in',
    name: 'Log In',
    component: () => import(/* webpackChunkName: "about" */ '../views/logIn.vue')
  },
  {
    path: '/workbench',
    name: 'Workbench',
    component: () => import(/* webpackChunkName: "about" */ '../views/workbench.vue'),
    meta: {
      requiresAuth: true
    }
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) => {
  const isLoggedIn = Boolean(store.getters.user);
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  
  console.log(isLoggedIn, requiresAuth)

  if (requiresAuth && !isLoggedIn) next('/log-in');
  else next();
});

export default router;
