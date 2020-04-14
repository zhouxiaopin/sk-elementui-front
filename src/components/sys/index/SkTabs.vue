<template>
    <el-main class="SkTabs">

        <el-tabs v-model="tabsValue" type="card" @tab-remove="removeTab" @tab-click="clickTab">
            <el-tab-pane

                    v-for="(item, index) in tabsData"
                    :key="index+item.name"
                    :label="item.title"
                    :name="item.name"
                    :closable="item.close"
            >
                <transition>
                    <keep-alive>
                        <!--<router-view></router-view>-->
                        <router-view :name="item.routeComponent"></router-view>
                    </keep-alive>
                </transition>
<!--                <router-view :name="item.routeComponent"></router-view>-->
<!--                <sk-iframe></sk-iframe>-->
            </el-tab-pane>
        </el-tabs>

    </el-main>
</template>

<script>
    import { mapState } from 'vuex'
    // import SkIframe from './SkIframe'
    export default {
        name: "SkTabs",
        components:{
            // SkIframe
        },
        data(){
            return{

            }
        },

        methods:{
            removeTab(targetName) {
                let tabs = this.tabsData;
                let activeName = this.tabsValue;
                if (activeName === targetName) {
                    tabs.forEach((tab, index) => {
                        if (tab.name === targetName) {
                            let nextTab = tabs[index + 1] || tabs[index - 1];
                            if (nextTab) {
                                activeName = nextTab.name;
                            }
                        }
                    });
                }

                this.$store.commit('setTabsValue',activeName);
                this.$store.commit('removeTab',targetName);
                this.$router.replace(activeName).catch(err => {err});
            },
            clickTab(e) {
                let name = e._props.name;
                // window.console.log(this.tabsValue);
                // window.console.log(name);
                // if (this.tabsValue!= name) {
                //     this.$router.replace(name)
                // }
                this.$store.commit('setCurMenuActiveId',name);

                window.console.log(name);
            }
        },
        computed:{
            tabsValue: {
                get() {
                    return this.$store.state.tabs.tabsValue
                },
                set(v) {
                    let old = this.tabsValue;
                    // 使用vuex中的mutations中定义好的方法来改变
                    this.$store.commit('setTabsValue', v)
                    if (old!= v) {
                        this.$router.replace(v).catch(err => {err});
                    }
                }
            },
            ...mapState({
                // tabsValue: state=>state.tabs.tabsValue,
                tabsData: state=>state.tabs.tabsData,
            })
        }
    }
</script>

<style lang="scss" scoped>
    .SkTabs {
        /*background-color: #F0F2F5;*/
        color: #333;
        /*flex: 1;*/
        height: 500px;
        padding: 0;
        .el-tabs__header{
            margin: 0;
        }
        .el-tab-pane{
            &>.div{
            }
        }
    }
</style>

<!--修改组件默认样式-->
<style lang="scss">
    .SkTabs {
        .el-tabs__header{
            margin: 0;
        }
    }
</style>