<template>
    <el-table-column
            :prop="prop"
            :formatter="dateFormat"
            :label="label">
    </el-table-column>
</template>

<script>
    import {dateFormat} from '@/utils/date'
    export default {
        name: "SkTimeColumn",
        props: {
            prop: {
                type: String
            },
            format: {
                type: String,
                required: false
            },
            label: {
                type: String,
                required: false
            },
        },
        methods: {
            //时间格式化
            dateFormat(row, column) {
                let date = row[column.property];
                return dateFormat(date, this.format);

            }
        }
    }
</script>

<style lang="scss" scoped>
    /*.SkTimeColumn {*/
    /*}*/
</style>