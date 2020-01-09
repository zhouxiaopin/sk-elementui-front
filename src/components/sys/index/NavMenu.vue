<template>
    <!--    <el-aside class="NavMenu">-->
    <el-aside class="NavMenu" :class="isCollapse?'menu-bar-collapse-width':'menu-bar-width'">
        <!-- logo -->
        <div class="logo font-white" :style="{'background-color':themeColor}">
            <img src="@/assets/logo.png"/> <span class="mgl-10">{{isCollapse?'':appName}}</span>
        </div>
        <!-- 导航菜单 -->
        <transition name='fade'>
            <!--            <el-menu :default-active="curMenuActive" class="el-menu-vertical" @open="handleOpen" @close="handleClose"-->
            <el-menu :default-active="this.$route.path" class="el-menu-vertical sysMenu scrollbar"
                     :active-text-color="themeColor"
                     @select="selectMenu" :collapse="isCollapse" :collapse-transition="false">
                <!--            <el-menu default-active="1-4-1" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" :collapse="isCollapse">-->
                <span v-for="(item,index) in treeSysMenu" :key="index">
<!--                        <el-menu-item v-if="!item.child||item.child.length<1" :index="item.id" route="{name:'home'}">-->
                        <el-menu-item v-if="!item.children||item.children.length<1" :index="item.attrs.routePath">
                            <i v-if="item.leftIcon" :class="item.leftIcon"></i>
                            <span slot="title">{{item.name}}</span>
                        </el-menu-item>
                        <el-submenu v-else :index="item.attrs.routePath">
                            <template slot="title">
                                <i v-if="item.leftIcon" :class="item.leftIcon"></i>
                                <span slot="title">{{item.name}}</span>
                            </template>
                            <span v-for="(item2,index2) in item.children" :key="index2">
                                <el-menu-item v-if="!item2.children||item2.children.length<1" :index="item2.attrs.routePath">
                                    <i v-if="item2.attrs.leftIcon" :class="item2.attrs.leftIcon"></i>
                                    <span slot="title">{{item2.name}}</span>
                                </el-menu-item>
                                <el-submenu v-else :index="item2.attrs.routePath">
                                    <template slot="title">
                                        <i v-if="item2.attrs.leftIcon"  :class="item2.attrs.leftIcon"></i>
                                        <span slot="title">{{item2.name}}</span>
                                    </template>
                                    <span v-for="(item3,index3) in item2.children" :key="index3">
                                        <el-menu-item v-if="!item3.children||item3.children.length<1" :index="item3.attrs.routePath">
                                            <i v-if="item3.attrs.leftIcon"  :class="item3.attrs.leftIcon"></i>
                                            <span slot="title">{{item3.name}}</span>
                                        </el-menu-item>
                                        <el-submenu v-else :index="item3.attrs.routePath">
                                            <template slot="title">
                                                <i v-if="item3.attrs.leftIcon" :class="item3.leftIcon"></i>
                                                <span slot="title">{{item3.name}}</span>
                                            </template>

                                        </el-submenu>
                                    </span>
                                </el-submenu>
                            </span>
                        </el-submenu>
                    </span>
            </el-menu>
        </transition>
    </el-aside>
</template>

<script>
    import { mapState } from 'vuex'
    export default {
        name: "NavMenu",
        data() {
            return {
            }
        },
        mounted: function () {
            this.requestMenu();
            // this.selectMenu(this.menuData2.find( item=> item.menuName=='首页').routePath);
        },
        methods: {
            // 折叠导航栏
            onCollapse() {
                // this.isCollapse = !this.isCollapse;
                this.$store.commit('switchCollapse');
            },
            // index: 选中菜单项的 index, indexPath: 选中菜单项的 index path
            selectMenu(index, indexPath) {
                this.log.debug('index:'+index+',indexPath:'+indexPath);
                let hasMenu = this.tabsData.find( item=> item.name==index);
                if (hasMenu){
                    this.$store.commit('setTabsValue',hasMenu.name);
                    if (this.$route.path != hasMenu.name){
                        this.$router.replace(hasMenu.name).catch(err => {err});
                    }
                    return;
                }
                this.$router.replace(index).catch(err => {err});
                let curMenu = this.sysMenu.find( item=> item.routePath==index);
                // let menuId = curMenu.routePath;
                this.$store.commit('addTab',{
                    title: curMenu.rName,
                    name: curMenu.routePath,
                    routeComponent: curMenu.routeComponent,
                    content: 'New Tab content',
                    close:curMenu.close?false:true
                });
                this.$store.commit('setTabsValue',curMenu.routePath);
            },
            requestMenu(){
                this.$api.sysResource.querySysMenu().then((res) => {
                    // this.log.debug(JSON.stringify(res.data.sysMenu));
                    if(res.code === 0) {
                        let sysMenu = res.data.sysMenu;
                        let treeSysMenu = res.data.treeSysMenu[0].children;
                        // let treeSysMenu = res.data.treeSysMenu[0].children;
                        let homeItem = {"routePath":"/","routeComponent":'Home',"routeName":'Home',
                            "rType":"01","rLevel":2,"rName":"首页","leftIcon":"","rId":-1,"rSort":null,"parentId":null,"close":true};
                        let treeHomeItem =  {"id":"-1","name":"首页","parentId":null,"order":null,
                            "level":0,"attrs":{"routePath":'/',"routeComponent":'Home',"leftIcon":null,"close":true,
                                "routeName":'Home'},"children":null};
                        sysMenu.unshift(homeItem);
                        treeSysMenu.unshift(treeHomeItem);
                        // this.log.debug(JSON.stringify(treeSysMenu));
                        this.$store.commit('setSysMenu',sysMenu);
                        this.$store.commit('setTreeSysMenu',treeSysMenu);

                    } else {
                        this.$message({
                            message: res.msg,
                            type: 'info'
                        })
                    }
                    // this.loading = false
                }).catch((res) => {
                    this.$message({
                        message: res.message,
                        type: 'error'
                    })
                });
            }
        },
        computed:{
            ...mapState({
                appName: state=>state.app.appName,
                themeColor: state=>state.app.themeColor,
                isCollapse: state=>state.app.isCollapse,
                curMenuActive: state=>state.navMenu.curMenuActive,
                treeSysMenu: state=>state.navMenu.treeSysMenu,
                sysMenu: state=>state.navMenu.sysMenu,
                // tabIndex: state=>state.tabs.tabIndex,
                // tabsValue: state=>state.tabs.tabsValue,
                tabsData: state=>state.tabs.tabsData,

            })
        }
    }
</script>

<style lang="scss" scoped>
    .NavMenu{
        overflow: hidden;
        color: #333;
        width: 200px !important;
        /*logo区域开始*/
        .logo {
            height: 60px;
            width: 100%;
            display: flex;
            align-items: center;
            padding-left: 18px;

            img {
                width: 32px;
                height: 32px;
            }

            div {
                font-size: 25px;
                color: white;
                text-align: left;
                padding-left: 20px;
            }
        }
        /*logo区域结束*/


        .fade-enter-active, .fade-leave-active {
            transition: opacity .5s
        }

        .fade-enter, .fade-leave-to {
            opacity: 0;
        }

        .el-menu--collapse {
            .el-tooltip {
                display: flex !important;
                justify-content: center !important;
                /*padding-left: 30px !important;*/
            }
        }

        .el-menu {
            padding-top: 5px;
            height: 90%;
            &.sysMenu{
                overflow-y: scroll;
            }
            .el-menu-item {
                &.is-active {
                    border-right: 3px solid;
                }
            }
        }

        .menu-bar-collapse-width {
            width: 65px !important;
        }


    }
</style>