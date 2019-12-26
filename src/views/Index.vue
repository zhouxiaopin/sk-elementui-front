<template>
    <el-container>
        <!--侧边栏-->
        <nav-menu></nav-menu>
        <!--主要区域-->
        <el-main class="right">
            <!--顶部-->
            <sk-header></sk-header>
            <!--主tabs-->
            <sk-tabs></sk-tabs>
        </el-main>
    </el-container>
</template>

<script>
    // import { mapState } from 'vuex'
    import NavMenu from '@/components/sys/index/NavMenu'
    import SkHeader from '@/components/sys/index/SkHeader'
    import SkTabs from '@/components/sys/index/SkTabs'
    export default {
        components:{
            SkHeader,
            NavMenu,
            SkTabs
        },
        data() {
            return {
                // isCollapse: false,
                editableTabsValue: '1',
                editableTabs: [{
                    title: '首页',
                    name: '1',
                    content: 'Tab 1 content'
                }, {
                    title: '用户管理',
                    name: '2',
                    content: 'Tab 2 content'
                }],
                tabIndex: 2,
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
                        , child: []
                    },{
                        id: '3', menuName: '选项1', url: '', parentId: '2', leftIcon: ''
                        , child: []
                    }],
                curMenuActive:'1',
            }
        },
        // methods: {},
        // computed:{
        //     ...mapState({
        //         appName: state=>state.app.appName,
        //         headerWelcome: state=>state.app.headerWelcome,
        //         themeColor: state=>state.app.themeColor,
        //         isCollapse: state=>state.app.isCollapse
        //     })
        // }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>

    .el-container {
        min-height: 100vh;
    }

    .right {
        display: flex;
        flex-direction: column;
        padding: 0;
        background-color: aliceblue;
    }

    .content {
        background-color: #F0F2F5;
        color: #333;
        flex: 1;
        padding: 0;
    }

    /*折叠后的导航栏宽度*/
    .menu-bar-collapse-width {
        width: 65px !important;
    }


</style>
