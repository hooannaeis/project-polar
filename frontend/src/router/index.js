import Vue from 'vue';
import store from '../store'
import VueRouter from 'vue-router';


Vue.use(VueRouter);

const routes = [
  {
    path: '/hello',
    name: 'Welcome',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/hello.vue')
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
  {
    path: '*',
    name: '404',
    component: () => import(/* webpackChunkName: "about" */ '../views/error.vue')
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) => {
  const isLoggedIn = Boolean(store.getters.user.isLoggedIn);
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  console.log(isLoggedIn, requiresAuth);
  
  if (requiresAuth && !isLoggedIn) {
    console.log('not logged in, redirecting...')
    next('/log-in')
  }
  else next();
});

export default router;
