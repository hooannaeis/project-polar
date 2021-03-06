import Vue from 'vue';
import store from '../store';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Hello',
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
    path: '/imprint',
    name: 'Imprint',
    component: () => import(/* webpackChunkName: "about" */ '../views/imprint.vue')
  },
  {
    path: '/privacy-policy',
    name: 'Privacy Policy',
    component: () => import(/* webpackChunkName: "about" */ '../views/privacyPolicy.vue')
  },
  {
    path: '/my',
    redirect: '/my/workbench',
    component: () => import('../views/my.vue'),
    meta: {
      redirect: true,
      requiresAuth: true
    },
    children: [
      {
        path: 'workbench',
        name: 'My Workbench',
        component: () => import(/* webpackChunkName: "about" */ '../views/workbench.vue'),
        meta: {
          requiresAuth: true
        }
      },
      {
        path: 'account',
        name: 'My Account',
        component: () => import(/* webpackChunkName: "about" */ '../views/myAccount.vue'),
        meta: {
          requiresAuth: true
        }
      }
    ]
  },
  {
    path: '*',
    name: '404',
    component: () => import(/* webpackChunkName: "about" */ '../views/error.vue')
  }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

router.beforeEach(async (to, from, next) => {
  const isLoggedIn = store.state.isLoggedIn;
  console.info('currentUser', isLoggedIn);
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);

  document.title = to.name;
  if (to.name === 'Log In' && isLoggedIn) {
    next('/my/workbench');
  }
  if (requiresAuth && !isLoggedIn) {
    console.log('not logged in, redirecting...');
    next('/log-in');
  } else next();
});

export default router;
