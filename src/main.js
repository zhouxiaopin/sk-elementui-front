import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// import 'font-awesome/css/font-awesome.min.css'
import '@/assets/iconfont/iconfont.css'

Vue.use(ElementUI)

Vue.config.productionTip = false
//开发
Vue.config.devtools = true
//生产
// Vue.config.devtools = false


new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
});
