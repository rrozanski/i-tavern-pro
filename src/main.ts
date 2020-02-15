import { focusDirective } from '@/directives';
import { noValueFilter } from '@/filters';
import BModal from 'bootstrap-vue';
import BProgress from 'bootstrap-vue';
import Vue from 'vue';
import Vuelidate from 'vuelidate';
import App from './App.vue';
import VueI18n from './i18n';
import router from './router';
import store from './store/root.store';

Vue.config.productionTip = false;

Vue.use(BModal);
Vue.use(BProgress);
Vue.use(Vuelidate);

Vue.directive('focus', focusDirective);

Vue.filter('noValue', noValueFilter);

new Vue({
  router,
  store,
  i18n: VueI18n,
  render: (h) => h(App),
}).$mount('#app');
