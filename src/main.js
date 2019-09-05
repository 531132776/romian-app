// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import axios from 'axios';
import VCharts from 'v-charts';
Vue.use(VCharts);
Vue.prototype.$axios = axios;
import QS from 'qs'
Vue.prototype.qs = QS;
import '@/assets/js/projectRem'
Vue.config.productionTip = false

//判断是ios还是安卓
let u = navigator.userAgent;
// let app = navigator.appVersion;
let isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1; //android终端
let isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端 ;

Vue.prototype.isAndroid = isAndroid;
Vue.prototype.isiOS = isiOS;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  axios,
  components: { App },
  template: '<App/>',
  
})
