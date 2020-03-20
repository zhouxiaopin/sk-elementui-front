<template>
    <el-header class="SkHeader" :style="{'background-color':themeColor}">
        <section>
            <i @click="onCollapse" :class="isCollapse?'iconyouqiehuan':'iconzuoqiehuan'" class="iconfont"></i>
<!--            <i @click="onCollapse" :class="isCollapse?'el-icon-s-unfold':'el-icon-s-fold'" class="font-20"></i>-->
            <!--        <i @click="onCollapse" :class="isCollapse?'fa-indent':'fa-outdent'" class="fa"></i>-->
            <span class="font-white">{{headerWelcome}}</span>
        </section>

        <section>
            <el-tooltip class="item" effect="dark" content="全屏" placement="bottom">
                <i @click="fullCcreen" class="el-icon-full-screen font-18"></i>
<!--                <i @click="fullCcreen" class="fa fa-arrows-alt font-18" aria-hidden="true"></i>-->
            </el-tooltip>
            <el-dropdown @command="handleCommand">
                <span class="el-dropdown-link">
<!--                    <i class="el-icon-user-solid"></i>-->
                    <img class="headImg" src="@/assets/img/default-head.jpg"/>
                    欢迎你，{{user?user.userName:''}}<i class="el-icon-arrow-down el-icon--right"></i>
                </span>

                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item command="personInfo"><i class="el-icon-user"></i>&nbsp;&nbsp;个人信息&nbsp;&nbsp;
                    </el-dropdown-item>
                    <el-dropdown-item command="updPsw"><i class="el-icon-edit"></i>&nbsp;&nbsp;修改密码&nbsp;&nbsp;
                    </el-dropdown-item>
                    <el-dropdown-item command="logout"><i class="el-icon-circle-close"></i>&nbsp;&nbsp;退出系统&nbsp;&nbsp;
                    </el-dropdown-item>
                </el-dropdown-menu>

            </el-dropdown>

        </section>
    </el-header>
</template>

<script>
    import {mapState} from 'vuex'
    import Cookies from "js-cookie";
    import Screenfull from 'screenfull'
    export default {
        name: "SkHeader",
        data() {
            return {
                user:JSON.parse(sessionStorage.getItem('user')),
            }
        },
        create: function () {
           // window.console.log('user:',sessionStorage.getItem('user'))
        },
        methods: {
            // 折叠导航栏
            onCollapse() {
                this.$store.commit('switchCollapse');
            },
            handleCommand(command) {
                switch (command) {
                    case 'personInfo':
                        break;
                    case 'updPsw':
                        this.$api.sysUser.query({sysUserCustom:{'userName':'zhoucp'},
                            'draw':'1'}).then((res) => {
                            this.log.debug(res);
                            if(res.code !== 0) {
                                this.$message({
                                    message: res.msg,
                                    type: 'error'
                                })
                            } else {
                                // Cookies.remove('token');//从Cookie移除token
                                // sessionStorage.removeItem('userName')//从本地会话移除用户
                                // // this.$store.commit('menuRouteLoaded', false) // 要求重新加载导航菜单
                                // this.$router.replace('/login').catch(err => {err})  // 登录成功，跳转到主页
                            }
                            // this.loading = false
                        }).catch((res) => {
                            this.$message({
                                message: res.message,
                                type: 'error'
                            })
                        });
                        break;
                    case 'logout':
                        this.$api.Login.logout().then((res) => {
                            this.log.debug(JSON.stringify(res))
                            if(res.code === 0) {
                                Cookies.remove('X-Access-Token');//从Cookie移除token
                                // sessionStorage.removeItem('user')//从本地会话移除用户
                                sessionStorage.clear();
                                // this.$store.commit('menuRouteLoaded', false) // 要求重新加载导航菜单
                                this.$router.replace('/login').catch(err => {err})  // 登录成功，跳转到主页
                            }
                        });
                        break;
                }
                // this.$message('click on item ' + command);
            },
            fullCcreen(){
                try {
                    Screenfull.toggle();
                }catch (e) {
                    // if (!Screenfull.enabled) {
                    this.$message({
                        message: '你的浏览器不支持',
                        type: 'warning'
                    });
                    //     return false
                    // }
                }
            },
        },
        computed:{
            ...mapState({
                appName: state=>state.app.appName,
                headerWelcome: state=>state.app.headerWelcome,
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
    /*$themeColor:#1890FF;*/
    .SkHeader {
        height: 60px;
        /*background-color: $themeColor;*/
        color: #333;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding-right: 0;

        & > section {
            & > i {
                color: #fff;
                margin-right: 10px;
                padding: 10px
            }
        }

        & > section:nth-child(2) {
            height: 100%;
            display: flex;
            align-items: center;
            /*width: 168px;*/
            /*width: 200px;*/
            .headImg{
                width: 40px;
                height: 40px;
                border-radius: 20px;
                margin-right: 5px;
            }
            .el-dropdown {
                height: 100%;

                .el-dropdown-link {
                    display: inline-flex;
                    height: 100%;
                    align-items: center;
                    padding: 0 20px;
                    color: #ffffff;
                    /*background-color: transparent;*/
                    /*border: transparent;*/
                }

                .el-dropdown-link:hover {
                    background-color: rgba(255, 255, 255, .2);
                }
            }
        }

    }
</style>