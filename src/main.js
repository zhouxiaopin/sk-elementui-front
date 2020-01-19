import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import api from './http'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import 'normalize.css' //统一浏览器的初始样式
import 'font-awesome/css/font-awesome.min.css'
import '@/assets/iconfont/iconfont.css'
//模拟数据
import './mock'
import log from './utils/log'


Vue.use(ElementUI)
Vue.use(api)

Vue.config.productionTip = false
//开发
Vue.config.devtools = true
//生产
// Vue.config.devtools = false

Vue.prototype.log = log


new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
});
