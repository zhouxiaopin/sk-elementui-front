<template>
    <div class="SkBtnOptBar">
        <div class="btnArea">
            <!--            <el-button type="primary" icon="el-icon-plus" @click="addHandler" size="small">添加</el-button>-->
            <template v-for="(item,index) in data">
                <slot v-if="item.isSlot&&$slots.default"></slot>
                <sk-btn v-else :type="item.type||'primary'" :icon="item.icon"
                        @click="item.clickHand?item.clickHand():commanHandler(item.handlerName)" :permis="item.permis" :key="index">{{item.lable}}</sk-btn>
            </template>
            <!--            <el-button type="success" icon="el-icon-edit-outline" @click="update" size="small">修改</el-button>-->
        </div>
    </div>
</template>

<script>
    /*eslint-disable*/
    const EVT_NAME_RELOADDATA = "reloadData";
    export default {
        name: "SkBtnOptBar",
        props: {
            data: {
                type: Array,
                required: true
            },
            checkedData: {
                type: Array,
                required: false
            },
            idKey:{
                type:String,
                required: false
            },
            //api的模块名
            apiModelName:String,
        },
        methods: {
            commanHandler(handlerName){
                if ('batchDel' == handlerName){
                    this.batchDelHandler()
                }else if ('batchRealDel' == handlerName){
                    this.batchRealDelHandler()
                }
            },
            //批量删除
            batchDelHandler(){
                if (this.isCheck()){
                    this.$confirm('确定要批量删除?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        let ids = this.checkedData.flatMap(item => item[this.idKey]);
                        this.requestDel(ids);
                    }).catch(() => {
                        this.msg.tip('已取消删除');
                    });
                }
            },
            //批量硬删除
            batchRealDelHandler(){
                if (this.isCheck()){
                    this.$confirm('这个操作很危险，确定要批量硬删除吗?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        // this.requestDel(row);
                        debugger
                        let ids = this.checkedData.flatMap(item => item[this.idKey]);
                        this.requestRealDel(ids);
                    }).catch(() => {
                        this.msg.tip('已取消删除');
                    });
                }


            },
            isCheck(){
                if (!this.checkedData||this.checkedData.length<=0){
                    this.msg.tip('请先选择要操作的记录');
                    return false;
                }
                return true;
            },

            //请求删除
            requestDel(ids) {
                let param = {ids:ids};
                this.$api[this.apiModelName].del(param).then((res) => {
                    if (res.code === 0) {
                        this.msg.success(res.msg);
                        this.$emit(EVT_NAME_RELOADDATA,null);
                        // this.requestQuery();
                    }
                });
            },
            //请求硬删除
            requestRealDel(ids) {
                // debugger
                let param = {ids:ids};
                this.$api[this.apiModelName].realDel(param).then((res) => {
                    if (res.code === 0) {
                        this.msg.success(res.msg);
                        this.$emit(EVT_NAME_RELOADDATA,null);
                        // this.requestQuery();
                    }
                });
            }
        }
    }
</script>

<style lang="scss" scoped>
    .SkBtnOptBar {
        background-color: #F2F6FC;
        border: 1px #E4E7ED solid;
        padding: 5px;
        margin-bottom: 10px;
    }
</style>