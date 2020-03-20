import Vue from 'vue'
import Vuex from 'vuex'
import 'es6-promise/auto'

////使用vuex---状态管理
Vue.use(Vuex);

//导入模块
import app from './modules/app'
import navMenu from './modules/navMenu'
import tabs from './modules/tabs'
import user from './modules/user'

const store = new Vuex.Store({
    modules:{
        app,
        navMenu,
        tabs,
        user,
    },
});

export default store