<template>
<!--    <el-aside class="NavMenu">-->
    <el-aside class="NavMenu" :class="isCollapse?'menu-bar-collapse-width':'menu-bar-width'">
        <!-- logo -->
        <div class="logo font-white" :style="{'background-color':themeColor}">
            <img src="@/assets/logo.png"/> <span class="mgl-10">{{isCollapse?'':appName}}</span>
        </div>
        <!-- 导航菜单 -->
        <transition name='fade'>
            <el-menu :default-active="curMenuActive" class="el-menu-vertical" @open="handleOpen" @close="handleClose"
                     @select="selectMenu" :collapse="isCollapse" :collapse-transition="false">
                <!--            <el-menu default-active="1-4-1" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" :collapse="isCollapse">-->
                <span v-for="(item,index) in menuData" :key="index">
                        <el-menu-item v-if="!item.child||item.child.length<1" :index="item.id">
                            <i v-if="item.leftIcon" :class="item.leftIcon"></i>
                            <span slot="title">{{item.menuName}}</span>
                        </el-menu-item>
                        <el-submenu v-else :index="item.id">
                            <template slot="title">
                                <i v-if="item.leftIcon" :class="item.leftIcon"></i>
                                <span slot="title">{{item.menuName}}</span>
                            </template>
                            <span v-for="(item2,index2) in item.child" :key="index2">
                                <el-menu-item v-if="!item2.child||item2.child.length<1" :index="item2.id">
                                    <i v-if="item2.leftIcon" :class="item2.leftIcon"></i>
                                    <span slot="title">{{item2.menuName}}</span>
                                </el-menu-item>
                                <el-submenu v-else :index="item2.id">
                                    <template slot="title">
                                        <i v-if="item2.leftIcon"  :class="item2.leftIcon"></i>
                                        <span slot="title">{{item2.menuName}}</span>
                                    </template>
                                    <span v-for="(item3,index3) in item2.child" :key="index3">
                                        <el-menu-item v-if="!item3.child||item3.child.length<1" :index="item3.id">
                                            <i v-if="item3.leftIcon"  :class="item3.leftIcon"></i>
                                            <span slot="title">{{item3.menuName}}</span>
                                        </el-menu-item>
                                        <el-submenu v-else :index="item3.id">
                                            <template slot="title">
                                                <i v-if="item3.leftIcon" :class="item3.leftIcon"></i>
                                                <span slot="title">{{item3.menuName}}</span>
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
                menuData: [{id: '1', menuName: '首页', url: '', parentId: null, leftIcon: 'el-icon-location', child: []},
                    {
                        id: '2', menuName: '用户管理', url: '', parentId: null, leftIcon: 'el-icon-setting'
                        , child: [{
                            id: '3', menuName: '选项1', url: '', parentId: '2', leftIcon: ''
                            , child: []
                        }]
                    }],
                menuData2: [{id: '1', menuName: '首页', url: '', parentId: null, leftIcon: 'el-icon-location', child: []},
                    {
                        id: '2', menuName: '用户管理', url: '', parentId: null, leftIcon: 'el-icon-setting'
                        , child: [],close:'closable'
                    },{
                        id: '3', menuName: '选项1', url: '', parentId: '2', leftIcon: ''
                        , child: [],close:'closable'
                    }],
            }
        },
        methods: {
            handleOpen(key, keyPath) {
                window.console.log(key, keyPath);
            },
            handleClose(key, keyPath) {
                window.console.log(key, keyPath);
            },
            // 折叠导航栏
            onCollapse() {
                // this.isCollapse = !this.isCollapse;
                this.$store.commit('switchCollapse');
            },
            // index: 选中菜单项的 index, indexPath: 选中菜单项的 index path
            selectMenu(index, indexPath) {
                window.console.log(index, indexPath);
                let hasMenu = this.tabsData.find( item=> item.name==index);
                if (hasMenu){
                    this.$store.commit('setTabsValue',hasMenu.name);
                    window.console.log(this.tabsData);
                    return;
                }
                let curMenu = this.menuData2.find( item=> item.id==index);
                let menuId = curMenu.id;
                let newTabName = menuId + '';
                this.$store.commit('addTab',{
                    title: curMenu.menuName,
                    name: newTabName,
                    content: 'New Tab content',
                    close:curMenu.close
                });
                this.$store.commit('setTabsValue',newTabName);
            },
        },
        computed:{
            ...mapState({
                appName: state=>state.app.appName,
                themeColor: state=>state.app.themeColor,
                isCollapse: state=>state.app.isCollapse,
                curMenuActive: state=>state.navMenu.curMenuActive,
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
            /*background-color: #1890FF;*/
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