import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Home from '../views/home/Home.vue'
import Category from '../views/Category.vue'
import Cart from '@/views/Cart.vue';
import User from '@/views/User.vue';
import Login from '@/views/Login.vue';
import SearchPage from '@/views/searchpage/SearchPage.vue';

Vue.use(VueRouter)

//push
const VueRouterPush: any = VueRouter.prototype.push
VueRouter.prototype.push = function push (to: any) {
  return VueRouterPush.call(this, to).catch((err: any) => err)
}

//replace
const VueRouterReplace: any  = VueRouter.prototype.replace
VueRouter.prototype.replace = function replace (to: any) {
  return VueRouterReplace.call(this, to).catch((err: any) => err)
}

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
    path: '/searchpage',
    name: 'searchpage',
    component: SearchPage,
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
