import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Home from '../views/Home.vue'
import Category from '../views/Category.vue'
import Cart from '@/views/Cart.vue';
import User from '@/views/User.vue';
import Login from '@/views/Login.vue';

Vue.use(VueRouter)


const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/home',
    name: 'Home',
    component: Home,
    meta: {
      index: 1
    }
  },
  {
    path: '/category',
    name: 'category',
    component: Category,
    meta: {
      index: 1
    }
  },
  {
    path: '/cart',
    name: 'cart',
    component: Cart,
    meta: {
      index: 1
    }
  },
  {
    path: '/user',
    name: 'user',
    component: User,
    meta: {
      index: 1
    }
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
    meta: {
      index: 1
    }
  },
]

const router = new VueRouter({
  routes
})

export default router
