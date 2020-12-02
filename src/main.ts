import Vue from 'vue';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import store from './store';
import 'lib-flexible/flexible';
import {Button} from 'vant';


Vue.use(Button);
Vue.config.productionTip = false;
(window as any).vRouter = router;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
