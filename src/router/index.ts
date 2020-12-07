import Vue from 'vue';
import VueRouter, {RouteConfig} from 'vue-router';
import Home from '../views/Home.vue';
import Category from '../views/Category.vue';
import Cart from '@/views/Cart.vue';
import User from '@/views/User.vue';
import Login from '@/views/login/Login.vue';
import SearchPage from '@/views/search/SearchPage.vue';
import GoodsDetail from '@/views/detil/GoodsDetail.vue';
import SubmitPage from '@/views/submit/SubmitPage.vue';
import AddressManage from '@/views/address/AddressManage.vue';
import AddAddress from '@/views/address/AddAddress.vue';
import MyPay from '@/views/myPay/MyPay.vue';
import PayDetail from '@/views/myPay/PayDetail.vue';
import Setting from '@/views/me/Setting.vue';

Vue.use(VueRouter);

//push
const VueRouterPush: any = VueRouter.prototype.push;
VueRouter.prototype.push = function push(to: any) {
  return VueRouterPush.call(this, to).catch((err: any) => err);
};

//replace
const VueRouterReplace: any = VueRouter.prototype.replace;
VueRouter.prototype.replace = function replace(to: any) {
  return VueRouterReplace.call(this, to).catch((err: any) => err);
};

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
    path: '/goodsdetail/:id',
    name: 'goodsdetail',
    component: GoodsDetail,
    meta: {
      index: 3
    }
  },
  {
    path: '/category',
    name: 'category',
    component: Category,
    meta: {
      index: 2
    }
  },
  {
    path: '/searchpage',
    name: 'searchpage',
    component: SearchPage,
    meta: {
      index: 2
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
    path: '/submitpage',
    name: 'submitpage',
    component: SubmitPage,
    meta: {
      index: 2
    }
  },
  {
    path: '/addressmanage',
    name: 'addressmanage',
    component: AddressManage,
    meta: {
      index: 3
    }
  },
  {
    path: '/addaddress',
    name: 'addaddress',
    component: AddAddress,
    meta: {
      index: 3
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
    path: '/setting',
    name: 'setting',
    component: Setting,
    meta: {
      index: 1
    }
  },
  {
    path: '/mypay',
    name: 'mypay',
    component: MyPay,
    meta: {
      index: 2
    }
  },
  {
    path: '/paydetail',
    name: 'paydetail',
    component: PayDetail,
    meta: {
      index: 3
    }
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
    meta: {
      index: 2
    }
  },
];

const router = new VueRouter({
  routes
});

export default router;
