<template>
    <div class="SysLog view-area">
        <!--搜索区域-->
        <sk-search-bar :queryCondition="queryCondition" :data="searchBarData" @refreshData="refreshData"></sk-search-bar>
        <!--按钮区域-->
        <sk-btn-opt-bar :idKey="idKey" :data="btnOptBarData" :checkedData="checkedData"
                        :apiModelName="apiModelName" @reloadData="requestQuery">
        </sk-btn-opt-bar>
        <!--表格-->
        <sk-table :idKey="idKey" :columns="columns" :data="tableData" :loading="loading"
                  :queryCondition="queryCondition" :pageInfo="pageInfo" :apiModelName="apiModelName"
                  @checkChange="checkChange" @reloadData="requestQuery" >
        </sk-table>
    </div>
</template>

<script>
    import {PermisConf} from '@/config/permisCofig'
    //主键名
    const idKey = 'id';
    //权限前缀
    const PERM_PREFIX = 'sysLog:';
    //api模块名
    const API_MODEL_NAME = 'SysLog';
    export default {
        name: "SysLog",
        data(){
            return{
                idKey:idKey,
                queryCondition:{
                    start:0,//当前第几页
                    length:10,//页面显示数量
                    cdtCustom:{operation:null,userName:null}
                },
                tableData:[],
                pageInfo:{},
                loading:false,
                checkedData:[],
                //搜索栏数据
                searchBarData:[
                    {name:'operation',label:'操作'},
                    {name:'userName',label:'操作者'},
                ],
                //按钮操作栏数据
                btnOptBarData:[
                    {lable:'批量删除',icon:'delete',permis:PermisConf.BATCH_DEL,handlerName:'batchDel',type:'warning'},
                    {lable:'批量硬删除',icon:'delete',permis:PermisConf.BATCH_REAL_DEL,handlerName:'batchRealDel',type:'danger'},
                ],
                //表格列数据
                columns: [
                    {prop:"requestUrl", label:"请求地址"},
                    {prop:"requestType", label:"请求方式"},
                    {prop:"ip", label:"ip"},
                    {prop:"methodName", label:"方法名"},
                    {prop:"params", label:"参数",showOt:true},
                    {prop:"operation", label:"操作"},
                    {prop:"userName", label:"操作者"},
                    {prop:"createTime", label:"操作时间", colType:'time'},
                    // {label:"操作", colType:'opt',fixed:'right',type:'expand',
                    {label:"操作", colType:'opt',fixed:'right',
                        btns:[
                            {title:'删除',handlerName:'del',type:'warning',icon:'delete',permis:PermisConf.DEL},
                        ]
                    },
                ],
            }
        },
        created:function(){
            this.requestQuery();
            //添加权限前缀
            this.btnOptBarData.forEach(item=>item.permis?item.permis = PERM_PREFIX+item.permis:item);
            this.columns[this.columns.length-1].btns.forEach(item=>item.permis?item.permis = PERM_PREFIX+item.permis:item);
        },
        computed:{
            apiModelName:()=>API_MODEL_NAME,
        },
        methods: {
            checkChange(val){
                this.checkedData = val;
                this.log.debugJson('checkedData:',val);
            },
            isCheckOne(){
                if (!this.checkedData||this.checkedData.length<=0){
                    this.msg.tip('请先选择要操作的记录');
                    return false;
                } else if (this.checkedData.length>=2){
                    this.msg.tip('只能选择一条记录');
                    return false;
                }
                return true;
            },
            refreshData(queryCondition){
                this.queryCondition = queryCondition;
                this.requestQuery();
            },
            //请求查询
            requestQuery() {
                this.loading = true;
                this.$api.SysLog.query(this.queryCondition).then((res) => {
                    // this.log.debug(res.data)
                    if (res.code === 0) {
                        this.pageInfo = res.data;
                        this.tableData = res.data.list;
                    }
                }).finally(()=>{this.loading = false});
            },
        }

    }
</script>

<style lang="scss" scoped>
    .SysLog {
        .btnArea{
            background-color: #F2F6FC;
            border: 1px #E4E7ED solid;
            padding: 5px;
            margin-bottom: 10px;
        }
        .page{
            margin-top: 20px;
            .el-pagination{
                display: flex;
                justify-content: flex-end;
            }
        }
    }
</style>