<template>
    <div class="SysUser view-area">
        <!--搜索区域-->
        <sk-search-bar :queryCondition="queryCondition" :data="searchBarData" @refreshData="refreshData"></sk-search-bar>
        <!--按钮区域-->
        <sk-btn-opt-bar :idKey="idKey" :data="btnOptBarData" :checkedData="checkedData"
                        :apiModelName="apiModelName" @reloadData="requestQuery">
        </sk-btn-opt-bar>
        <!--表格-->
        <sk-table :idKey="idKey" :columns="columns" :data="tableData" :loading="loading"
                  :queryCondition="queryCondition" :pageInfo="pageInfo" :apiModelName="apiModelName"
                  @checkChange="checkChange" @reloadData="requestQuery" link-class="font-18">
        </sk-table>
        <!--新增-->
        <add :conf="addConf" :refreshData="requestQuery" @close="visible => this.addConf.visible = visible"/>
        <!--修改-->
        <update :conf="uptConf" :refreshData="requestQuery" @close="visible => this.uptConf.visible = visible"/>
        <!--修改密码-->
        <UpdatePsw :conf="uptPswConf" :refreshData="requestQuery" @close="visible => this.uptPswConf.visible = visible"/>
    </div>
</template>

<script>
    import {PermisConf} from '@/config/permisCofig'

    import Add from './Add'
    import Update from './Update'
    import UpdatePsw from './UpdatePsw'
    //主键名
    const idKey = 'userId';
    //权限前缀
    const PERM_PREFIX = 'sysUser:';
    //api模块名
    const API_MODEL_NAME = 'SysUser';
    export default {
        name: "SysUser",
        components:{
            Add,
            Update,
            UpdatePsw
        },
        data(){
            return{
                idKey:idKey,
                addConf:{
                    // title:'添加',
                    visible:false,
                },
                uptConf:{
                    // title:'修改',
                    visible:false,
                    idKey:idKey,
                    checkedData:null
                },
                uptPswConf:{
                    visible:false,
                    idKey:idKey,
                    checkedData:null
                },
                queryCondition:{
                    start:0,//当前第几页
                    length:5,//页面显示数量
                    cdtCustom:{scCode:null,scName:null}
                },
                tableData:[],
                pageInfo:{},
                // loading:true
                loading:false,
                checkedData:[],
                //搜索栏数据
                searchBarData:[
                    {name:'userName',label:'用户名'},
                ],
                //按钮操作栏数据
                btnOptBarData:[
                    {lable:'添加',icon:'plus',permis:PermisConf.ADD,clickHand:this.addHandler},
                    {lable:'批量删除',icon:'delete',permis:PermisConf.BATCH_DEL,handlerName:'batchDel',type:'warning'},
                    {lable:'批量硬删除',icon:'delete',permis:PermisConf.BATCH_REAL_DEL,handlerName:'batchRealDel',type:'danger'},
                ],
                //表格列数据
                columns: [
                    {prop:"userName", label:"用户名"},
                    {prop:"sex", label:"性别"},
                    {prop:"mobilePhone", label:"手机"},
                    {prop:"email", label:"邮箱"},
                    {prop:"createTime", label:"创建时间", colType:'time'},
                    {prop:"recordStatus", label:"状态", colType:'label'},
                    // {label:"操作", colType:'opt',fixed:'right',type:'expand',
                    {label:"操作", colType:'opt',fixed:'right',
                        btns:[
                            {optName:'rs',optType:'rs',handlerName:'uptRs',permis:PermisConf.UPDATE_RECORDSTATUS},
                            {title:'修改密码',icon:'key',clickHand:this.updatePswHandler,permis:PermisConf.UPDATE_PSD},
                            {title:'修改',type:'success',icon:'edit-outline',clickHand:this.updateHandler,permis:PermisConf.UPDATE},
                            {title:'删除',handlerName:'del',type:'warning',icon:'delete',permis:PermisConf.DEL},
                            {title:'硬删除',handlerName:'realDel',type:'danger',icon:'delete',permis:PermisConf.REAL_DEL},
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
            //添加
            addHandler(){
                this.addConf.visible = true;
            },
            //修改
            updateHandler(row){
                this.uptConf.visible = true;
                this.uptConf.checkedData = row;
            },
            //修改密码
            updatePswHandler(row){
                this.uptPswConf.visible = true;
                this.uptPswConf.checkedData = row;
            },
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
                this.$api.SysUser.query(this.queryCondition).then((res) => {
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
    .SysUser {
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