import Vue from 'vue';
import md5 from 'js-md5';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import store from './store';
import 'lib-flexible/flexible';
import {Button, Form, Field, Toast} from 'vant';


Vue.use(Button).use(Field).use(Toast).use(Button).use(Form);
Vue.config.productionTip = false;
(window as any).vRouter = router;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');

Vue.prototype.$md5 = md5;