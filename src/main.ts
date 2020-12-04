import Vue from 'vue';
import md5 from 'js-md5';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import {store} from './store';
import 'lib-flexible/flexible';
import {prefix} from '@/assets/ts/utils';
import {Button, Form, Field, Toast, Swipe, SwipeItem, SwipeCell,
  Tabs, Tab, List, PullRefresh, GoodsAction,GoodsActionIcon,GoodsActionButton} from 'vant';


Vue.use(Button).use(Field)
  .use(Toast).use(Button).use(Form)
  .use(Swipe).use(SwipeItem).use(SwipeCell)
  .use(Tabs).use(Tab).use(List).use(PullRefresh)
  .use(GoodsAction).use(GoodsActionButton).use(GoodsActionIcon);


Vue.config.productionTip = false;
Vue.prototype.prefix = prefix;
(window as any).vRouter = router;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');

Vue.prototype.$md5 = md5;