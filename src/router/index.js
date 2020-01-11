import Vue from 'vue'
import Router from 'vue-router'
import store from '../store'
import Index from '@/views/Index'
import Login from '@/views/Login'
import SysUser from '@/views/sysManage/SysUser'
import SysRole from '@/views/sysManage/SysRole'
import SysResource from '@/views/sysManage/SysResource'
import SysLog from '@/views/sysManage/SysLog'
import Home from '@/views/Home'

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
            // component:Index,
            component:Index,
            meta:{
                title: 'SK后台管理系统'
            },
            children: [
                {
                    path:'/sysManage/sysUser',
                    name:'SysUser',
                    // component:SysUser,
                    components:{SysUser},
                    meta:{
                        // keepAlive: true // true需要缓存，false不需要缓存
                        // title: 'SK后台管理系统'
                    }
                },
                {
                    path:'/sysManage/sysRole',
                    name:'SysRole',
                    component:SysRole,
                    components:{SysRole},
                    meta:{
                        // keepAlive: true // true需要缓存，false不需要缓存
                        // title: 'SK后台管理系统'
                    }
                },
                {
                    path:'/sysManage/sysResource',
                    name:'SysResource',
                    // component:SysResource,
                    components:{SysResource},
                    meta:{
                        // keepAlive: true // true需要缓存，false不需要缓存
                        // title: 'SK后台管理系统'
                    }
                },
                {
                    path:'/sysManage/SysLog',
                    name:'SysLog',
                    // component:SysResource,
                    components:{SysLog},
                    meta:{
                        // keepAlive: true // true需要缓存，false不需要缓存
                        // title: 'SK后台管理系统'
                    }
                },
                {
                    path:'/',
                    name:'Home',
                    // component:Home,
                    components:{Home},
                    // meta:{
                    //     title: 'SK后台管理系统'
                    // }
                }

            ]
        }
    ]
});


// router.beforeEach((to, from, next) => {
//     // 登录界面登录成功之后，会把用户信息保存在会话
//     // 存在时间为会话生命周期，页面关闭即失效。
//     let userName = sessionStorage.getItem('userName')
//     if (to.path === '/login') {
//         // 如果是访问登录界面，如果用户会话信息存在，代表已登录过，跳转到主页
//         if(userName) {
//             next({ path: '/' })
//         } else {
//             next()
//         }
//     } else {
//         if (!userName) {
//             // 如果访问非登录界面，且户会话信息不存在，代表未登录，则跳转到登录界面
//             next({ path: '/login' })
//         } else {
//             // 加载动态菜单和路由
//             next()
//         }
//     }
// })

router.beforeEach((to, from, next) => {
    /* 路由发生变化修改页面title */
    if (to.meta.title) {
        document.title = to.meta.title
    }
    next()
});
router.beforeEach((to, from, next) => {
    /* 路由发生变化激活的nav菜单和tab */
    if (to.path&&to.path !== '/login'&&to.path !== '/') {
        // let tabsData = store.state.tabs.tabsData;
        let sysMenu = store.state.navMenu.sysMenu;
        if (!sysMenu){
            next({ path: '/',replace:true });
            return;
        }
        // store.commit('setTabsValue',to.path);
        // let hasMenu = tabsData.find( item=> item.name==to.path);
        // if (hasMenu){
        //     store.commit('setTabsValue',hasMenu.name);
        //     if (to.path != hasMenu.name){
        //         next({ path: hasMenu.name })
        //     }
        //     return;
        // }
        // next({ path: to.path })
        // let curMenu = sysMenu.find( item=> item.routePath==to.path);
        // if (curMenu){
        //     // let menuId = curMenu.routePath;
        //     store.commit('addTab',{
        //         title: curMenu.rName,
        //         name: curMenu.routePath,
        //         routeComponent: curMenu.routeComponent,
        //         content: 'New Tab content',
        //         close:curMenu.close?false:true
        //     });
        //     store.commit('setTabsValue',curMenu.routePath);
        // }

    }
    next()
});

export default router