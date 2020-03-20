<template>
    <div class="SkPage">
        <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="pageInfo.curPage"
                :page-sizes="[5,10,50,100, 200, 300]"
                :page-size="pageInfo.pageSize"
                layout="total, prev, pager, next, jumper, sizes"
                :total="pageInfo.total">
        </el-pagination>
    </div>
</template>

<script>
    export default {
        name: "Sk-Page",
        props: {
            pageInfo: {
                type: Object,
                required: true
            },
            queryCondition: {
                type: Object,
                required: true
            },
            refreshData: {
                type: Function,
                required: true
            },
        },
        methods:{
            handleSizeChange(val) {
                this.log.debug(`每页 ${val} 条`);
                let queryCondition = this.queryCondition;
                queryCondition.length = val;
                this.queryCondition = queryCondition;
                this.refreshData(queryCondition);
            },
            handleCurrentChange(val) {
                this.log.debug(`当前页: ${val}`);
                let queryCondition = this.queryCondition;
                queryCondition.start = (val-1)*queryCondition.length;
                this.queryCondition = queryCondition;
                this.refreshData(queryCondition);
            },
        }
    }
</script>

<style lang="scss" scoped>
    .SkPage {
        margin-top: 20px;
        .el-pagination{
            display: flex;
            justify-content: flex-end;
        }
    }
</style>