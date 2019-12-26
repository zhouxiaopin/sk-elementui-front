<template>
    <el-main class="SkTabs">

        <el-tabs v-model="tabsValue" type="card" @tab-remove="removeTab" @tab-click="clickTab">
            <el-tab-pane
                    v-for="(item, index) in tabsData"
                    :key="index"
                    :label="item.title"
                    :name="item.name"
                    :closable="item.close"
                    class="whp-100"
            >
                <iframe src="https://element.eleme.cn/2.0/#/zh-CN/component/tabs" scrolling="auto" frameborder="0" class="frame">
                </iframe>
            </el-tab-pane>
        </el-tabs>
    </el-main>
</template>

<script>
    import { mapState } from 'vuex'
    export default {
        name: "SkTabs",
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
            },
            clickTab(e) {
                let name = e._props.name;
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
                    // 使用vuex中的mutations中定义好的方法来改变
                    this.$store.commit('setTabsValue', v)
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
        background-color: #F0F2F5;
        color: #333;
        flex: 1;
        padding: 0;
    }
    .frame {
        width: 100%;
        height: 100%;
    }
</style>