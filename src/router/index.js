import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/views/Index'
import Login from '@/views/Login'
import SysUser from '@/views/sysManage/SysUser'

Vue.use(Router);

const router = new Router({
    routes:[
        {
            path:'/login',
            name:'login',
            component:Login,
            meta:{
                title: '登录'
            }
        },
        {
            path:'/',
            name:'index',
            component:Index,
            meta:{
                title: 'SK后台管理系统'
            },
            children: [
                {
                    path:'/sysManage/sysUser',
                    name:'SysUser',
                    component:SysUser,
                    // meta:{
                    //     title: 'SK后台管理系统'
                    // }
                }

            ]
        }
    ]
});
router.beforeEach((to, from, next) => {
    /* 路由发生变化修改页面title */
    if (to.meta.title) {
        document.title = to.meta.title
    }
    next()
});

export default router