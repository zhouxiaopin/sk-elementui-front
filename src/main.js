import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import api from './http'
import ElementUI from 'element-ui'
//SkUI
import '@/components/sys'
import 'element-ui/lib/theme-chalk/index.css'
import 'normalize.css' //统一浏览器的初始样式
import 'font-awesome/css/font-awesome.min.css'
import '@/assets/iconfont/iconfont.css'

//模拟数据
import './mock'
import * as msg from './utils/msg'


Vue.use(ElementUI);
Vue.use(api);


// Vue.component(SkBtn);


Vue.config.productionTip = false
//开发
Vue.config.devtools = true
//生产
// Vue.config.devtools = false

Vue.prototype.msg = msg


new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
});
