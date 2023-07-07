import Vue from 'vue'
import App from './App.vue'
import router from '@/router'
import TypeNav from "@/components/TypeNav";
import store from '@/store'
import '@/mock/mockServer'
import "swiper/css/swiper.css";
import Banner from '@/components/Banner'

Vue.config.productionTip = false
Vue.component('TypeNav', TypeNav);
Vue.component('GlobalBanner', Banner)
new Vue({
  render: h => h(App),
  beforeCreate() {
    Vue.prototype.$bus = this
  },
  router,
  store
}).$mount('#app')
