import Vue from 'vue'
import App from './App.vue'
import './plugins/element.js'
import router from './router'
import store from './store'
import axios from 'axios'
import "./assets/css/reset.css"

Vue.config.productionTip = false
Vue.prototype.$http = axios.create({
  baseURL: "http://localhost:3000"
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
