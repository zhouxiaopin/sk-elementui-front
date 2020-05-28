/*eslint-disable*/
import Vue from 'vue'
import Router from 'vue-router'
import store from '../store'
import Cookies from "js-cookie";
import Index from '@/views/Index'
import Login from '@/views/Login'
import {KeyName} from '@/config/config'
// import SysUser from '@/views/sysManage/sysUser/SysUser'
// import SysRole from '@/views/sysManage/sysRole/SysRole'
// import SysPermis from '@/views/sysManage/sysPermis/SysPermis'
// import SysResource from '@/views/sysManage/sysResource/SysResource'
// import SysLog from '@/views/sysManage/sysLog/SysLog'
// import SysSqlConf from '@/views/sysConf/sysSqlConf/SysSqlConf'
// import SysDict from '@/views/sysConf/sysDict/SysDict'
import Home from '@/views/Home'

import api from '@/http/api'

Vue.use(Router);

const router = new Router({
    mode: 'history', // 去掉url中的#
    routes:[
        {
            path:'/',
            // name:'index',
            // component:Index,
            component:Index,
            meta:{
                title: 'SK后台管理系统'
            },
            children:[
                    {
                        path:'/',
                        // name:'Home',
                        // component:Home,
                        components:{Home},
                        meta:{
                            title: 'SK后台管理系统'
                        }
                    }
            ]
            // children: [
            //     {
            //         path:'/sysManage/sysUser',
            //         name:'SysUser',
            //         // component:SysUser,
            //         components:{SysUser},
            //         meta:{
            //             // keepAlive: true // true需要缓存，false不需要缓存
            //             // title: 'SK后台管理系统'
            //         }
            //     },
            //     {
            //         path:'/sysManage/sysRole',
            //         name:'SysRole',
            //         component:SysRole,
            //         components:{SysRole},
            //         meta:{
            //             // keepAlive: true // true需要缓存，false不需要缓存
            //             // title: 'SK后台管理系统'
            //         }
            //     },
            //     {
            //         path:'/sysManage/SysPermis',
            //         name:'SysPermis',
            //         // component:SysPermis,
            //         components:{SysPermis},
            //         meta:{
            //             // keepAlive: true // true需要缓存，false不需要缓存
            //             // title: 'SK后台管理系统'
            //         }
            //     },
            //     {
            //         path:'/sysManage/sysResource',
            //         name:'SysResource',
            //         // component:SysResource,
            //         components:{SysResource},
            //         meta:{
            //             // keepAlive: true // true需要缓存，false不需要缓存
            //             // title: 'SK后台管理系统'
            //         }
            //     },
            //     {
            //         path:'/sysManage/SysLog',
            //         name:'SysLog',
            //         // component:SysResource,
            //         components:{SysLog},
            //         meta:{
            //             // keepAlive: true // true需要缓存，false不需要缓存
            //             // title: 'SK后台管理系统'
            //         }
            //     },
            //     {
            //         path:'/sysConf/sysSqlConf',
            //         name:'SysSqlConf',
            //         // component:SysResource,
            //         components:{SysSqlConf},
            //         meta:{
            //             // keepAlive: true // true需要缓存，false不需要缓存
            //             // title: 'SK后台管理系统'
            //         }
            //     },
            //     {
            //         path:'/sysConf/sysDict',
            //         name:'SysDict',
            //         // component:SysResource,
            //         components:{SysDict},
            //         meta:{
            //             // keepAlive: true // true需要缓存，false不需要缓存
            //             // title: 'SK后台管理系统'
            //         }
            //     },
            //     {
            //         path:'/',
            //         name:'Home',
            //         // component:Home,
            //         components:{Home},
            //         // meta:{
            //         //     title: 'SK后台管理系统'
            //         // }
            //     }
            //
            // ]
        },
        {
            path:'/login',
            // name:'login',
            component:Login,
            meta:{
                title: '登录'
            }
        },

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


router.beforeEach((to, from, next) => {
    // 登录界面登录成功之后，会把用户信息保存在会话
    // 存在时间为会话生命周期，页面关闭即失效。
    // let user = sessionStorage.getItem('user')
    let user = Cookies.get(KeyName.TOKEN);
    if (to.path === '/login') {
        // 如果是访问登录界面，如果用户会话信息存在，代表已登录过，跳转到主页
        if(user) {
            next({ path: '/' })
        } else {
            next()
        }
    } else {
        if (!user) {
            // 如果访问非登录界面，且户会话信息不存在，代表未登录，则跳转到登录界面
            next({ path: '/login' })
        } else {
            // 加载动态菜单和路由
            addDynamicMenuAndRoutes(user, to, from);
            next()
        }
    }
});



/**
 * 加载动态菜单和路由
 */
function addDynamicMenuAndRoutes(userName, to, from) {
    if(store.state.app.menuRouteLoaded) {
        window.console.log('动态菜单和路由已经存在.');
        return
    }
    //请求系统目录
    api.SysResource.querySysMenu().then((res) => {
        if(res.code === 0) {
            if (!res.data){
                return;
            }
            let sysMenu = res.data.sysMenu;
            let treeSysMenu = res.data.treeSysMenu[0].children;
            let homeItem = {"routePath":"/","routeComponent":'Home',"routeName":'Home',
                "resType":"01","resLevel":2,"resName":"首页","leftIcon":"fa fa-address-book","rId":-1,"resSort":null,"parentId":null,"close":true};
            let treeHomeItem =  {"id":"-1","name":"首页","parentId":null,"order":null,
                "level":0,"attrs":{"routePath":'/',"routeComponent":'Home',"leftIcon":'fa fa-home fa-lg',"close":true,
                    "routeName":'Home'},"children":null};
            sysMenu.unshift(homeItem);
            treeSysMenu.unshift(treeHomeItem);
            store.commit('setSysMenu',sysMenu);
            // 保存菜单树
            store.commit('setTreeSysMenu',treeSysMenu);


            // 添加动态路由
            let dynamicRoutes = addDynamicRoutes(sysMenu);
            // 处理静态组件绑定路由
            handleStaticComponent(router, dynamicRoutes);
            router.addRoutes(router.options.routes)
            // 保存加载状态
            store.commit('menuRouteLoaded', true)

        }
    }).then(res => {
        api.SysPermis.getPermis().then(res => {
            if(res.code === 0) {
                // 保存用户权限标识集合
                store.commit('setPerms', res.data);
            }
        });

    });
}





/**
 * 处理路由到本地直接指定页面组件的情况
 * 比如'代码生成'是要求直接绑定到'Generator'页面组件
 */
function handleStaticComponent(router, dynamicRoutes) {
    for(let j=0;j<dynamicRoutes.length; j++) {
        // if(dynamicRoutes[j].name == '代码生成') {
        //     dynamicRoutes[j].component = Generator
        //     break
        // }
    }
    router.options.routes[0].children = router.options.routes[0].children.concat(dynamicRoutes)
}

/**
 * 添加动态(菜单)路由
 * @param {*} menuList 菜单列表
 * @param {*} routes 递归创建的动态(菜单)路由
 */
function addDynamicRoutes (menuList = [], routes = []) {
    // let homeItem = {"routePath":"/","routeComponent":'Home',"routeName":'Home',
    // "resType":"01","resLevel":2,"resName":"首页","leftIcon":"fa fa-address-book","rId":-1,
    //     "resSort":null,"parentId":null,"close":true};

    menuList.forEach(function(item,index){
        if (!item.routePath){
            return false;
        }
        // 创建路由配置
        let route = {
            path: item.routePath,
            components: {},
            // component: null,
            name: item.routeName,
            // meta: {
            //     icon: menuList[i].icon,
            //     index: menuList[i].id
            // }
        };
        // const component = () => import(/* webpackChunkName: "group-foo" */`@/views/${item.routePath}`);
        // const a='HelloWorld';
        // const HelloWorld = ()=> import(/* webpackChunkName: "group-foo" */ `@/components/${a}`);
        // const HelloWorld = resolve => require([@/${path}.vue], resolve);
        // route['component'] = component;
        //路由懒加载写法---AMD
        route.components[item.routeName] = resolve => require([`@/views${item.routePath}`], resolve);
        routes.push(route);

    });

    window.console.log('动态路由加载...');
    window.console.log(routes);
    window.console.log('动态路由加载完成.');
    return routes;

}



export default router