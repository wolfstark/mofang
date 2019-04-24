import Vue from 'vue';
import Router from 'vue-router';
// import Home from '../views/Home/index.vue';
import MobilePreview from '../views/MobilePreview/index.vue';
// import Admin from '../views/Admin/index.vue';

const Home = () => import('../views/Home/index.vue');
// const MobilePreview = () => import('../views/MobilePreview/index.vue');
const Admin = () => import('../views/Admin/index.vue');

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Admin',
      component: Admin,
    },
    {
      path: '/home',
      name: 'Home',
      component: Home,
    },
    {
      path: '/mobile-preview',
      name: 'MobilePreview',
      component: MobilePreview,
    },
    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (about.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import(/* webpackChunkName: "about" */ './views/About.vue'),
    // },
  ],
});
