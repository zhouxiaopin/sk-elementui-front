<template>
    <div class="SkSearchBar">
        <el-form ref="searchForm" :model="queryCondition.cdtCustom"  :inline="true" size="small">
            <!--            <el-form ref="searchForm" :model="searchFormModel" label-width="auto" :inline="true" size="small">-->

            <template v-for="(item,index) in data">
                <slot v-if="item.isSlot&&$slots.default"></slot>
                <el-form-item v-else :label="item.label" :key="index">
                    <sk-radio v-if="item.cpType === 'radio'" v-model="queryCondition.cdtCustom[item.name]"
                              :conf="item.conf" :dictType="item.dictType" :scCode="item.scCode"
                              @change="item.onChange">
                    </sk-radio>
                    <el-input v-else v-model="queryCondition.cdtCustom[item.name]" :placeholder="'输入'+item.label"></el-input>
                </el-form-item>

            </template>



            <el-form-item>
                <el-button type="primary" icon="el-icon-search" @click="onSearch">搜索</el-button>
                <el-button type="success" icon="el-icon-refresh" @click="onRefresh">刷新</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    const EVT_NAME_REFRESH = "refreshData";
    export default {
        name: "SkSearchBar",
        props: {
            queryCondition: {
                type: Object,
                required: true
            },
            data: {
                type: Array,
                required: true
            },
        },
        methods:{
            //查询
            onSearch(){
                let queryCondition = this.queryCondition;
                queryCondition.start = 0;
                this.$emit(EVT_NAME_REFRESH,queryCondition);
                // this.refreshData(queryCondition);
            },
            //刷新
            onRefresh(){
                let queryCondition = this.queryCondition;
                // queryCondition.length = 10;
                queryCondition.start = 0;
                this.data.forEach(function (item) {
                    queryCondition.cdtCustom[item.name] = null;
                });
                this.$emit(EVT_NAME_REFRESH,queryCondition);
                // this.refreshData(queryCondition);
            },
        }
    }
</script>

<style lang="scss" scoped>
    .SkSearchBar {
    }
</style>