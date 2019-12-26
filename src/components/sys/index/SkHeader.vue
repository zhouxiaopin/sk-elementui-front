<template>
    <el-header class="SkHeader" :style="{'background-color':themeColor}">
        <section>
            <i @click="onCollapse" :class="isCollapse?'iconyouqiehuan':'iconzuoqiehuan'" class="iconfont"></i>
            <!--        <i @click="onCollapse" :class="isCollapse?'fa-indent':'fa-outdent'" class="fa"></i>-->
            <span class="font-white">{{headerWelcome}}</span>
        </section>

        <section>
            <el-dropdown @command="handleCommand">
                <span class="el-dropdown-link">
                    <i class="el-icon-edit"></i>
                    欢迎你，admin<i class="el-icon-arrow-down el-icon--right"></i>
                </span>

                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item command="1"><i class="el-icon-edit"></i>&nbsp;&nbsp;个人信息&nbsp;&nbsp;
                    </el-dropdown-item>
                    <el-dropdown-item command="2"><i class="el-icon-edit"></i>&nbsp;&nbsp;修改密码&nbsp;&nbsp;
                    </el-dropdown-item>
                    <el-dropdown-item command="3"><i class="el-icon-edit"></i>&nbsp;&nbsp;退出系统&nbsp;&nbsp;
                    </el-dropdown-item>
                </el-dropdown-menu>

            </el-dropdown>

        </section>
    </el-header>
</template>

<script>
    import {mapState} from 'vuex'

    export default {
        name: "SkHeader",
        methods: {
            // 折叠导航栏
            onCollapse() {
                this.$store.commit('switchCollapse');
            },
            handleCommand(command) {
                this.$message('click on item ' + command);
            }

        },
        computed: {
            ...mapState({
                isCollapse: state => state.app.isCollapse,
                headerWelcome: state => state.app.headerWelcome,
                themeColor: state => state.app.themeColor,
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
            width: 168px;

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