<template>
    <div class="SysResource view-area">
        <el-row :gutter="10">
            <el-col :span="4">
                <sk-nav-tree
                        ref="navTree"
                        expandAll
                        scCode="sys_resource_tree"
                        @requestQuery="requestQuery"
                        height="81vh">
                </sk-nav-tree>
            </el-col>
            <el-col :span="20">
                <div class="content">
                    <!--搜索区域-->
                    <sk-search-bar :queryCondition="queryCondition" :data="searchBarData" @refreshData="refreshData">
                        <el-form-item label="父节点查询">
                            <sk-radio v-model="queryCondition.isParentQuery"
                                      dictType="is_not" @change="isParentQueryChange">
                            </sk-radio>
                        </el-form-item>
                    </sk-search-bar>
                    <!--按钮区域-->
                    <sk-btn-opt-bar :idKey="idKey" :data="btnOptBarData" :checkedData="checkedData"
                                    :apiModelName="apiModelName" @reloadData="requestQuery">
                    </sk-btn-opt-bar>

                    <!--表格-->
                    <sk-table :idKey="idKey" :columns="columns" :data="tableData" :loading="loading"
                              :queryCondition="queryCondition" :pageInfo="pageInfo" :apiModelName="apiModelName"
                              @checkChange="checkChange" @reloadData="requestQuery" >
                    </sk-table>

                    <!--新增-->
                    <add :conf="addConf" :refreshData="requestQuery" @close="visible => this.addConf.visible = visible"/>
                    <!--修改-->
                    <update :conf="uptConf" :refreshData="requestQuery" @close="visible => this.uptConf.visible = visible"/>
                </div>
            </el-col>
        </el-row>



    </div>
</template>

<script>
    /*eslint-disable*/
    import SkNavTree from '@/components/sys/common/SkNavTree'
    import {PermisConf} from '@/config/permisCofig'
    import Add from './Add'
    import Update from './Update'
    //主键名
    const idKey = 'resId';
    //权限前缀
    const PERM_PREFIX = 'sysResource:';
    //api模块名
    const API_MODEL_NAME = 'SysResource';
    export default {
        name: "SysResource",
        components:{
            SkNavTree,
            Add,
            Update
        },
        data() {
            return {
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
                queryCondition:{
                    start:0,//当前第几页
                    length:10,//页面显示数量
                    isParentQuery: '1',
                    orderBy: 'res_sort asc',
                    cdtCustom:{resName:null,routeComponent:null,parentId:null}
                },
                tableData:[],
                pageInfo:{},
                // loading:true
                loading:false,
                checkedData:[],
                //搜索栏数据
                searchBarData:[
                    {isSlot:true},
                    {name:'resName',label:'资源名'},
                    {name:'routeComponent',label:'路由组件'},
                ],
                //按钮操作栏数据
                btnOptBarData:[
                    {lable:'添加',icon:'plus',permis:PermisConf.ADD,clickHand:this.addHandler},
                    {lable:'批量删除',icon:'delete',permis:PermisConf.BATCH_DEL,handlerName:'batchDel',type:'warning'},
                    {lable:'批量硬删除',icon:'delete',permis:PermisConf.BATCH_REAL_DEL,handlerName:'batchRealDel',type:'danger'},
                ],
                //表格列数据
                columns: [
                    {prop:"resName", label:"资源名"},
                    {prop:"routePath", label:"路由路径"},
                    {prop:"routeName", label:"路由名"},
                    {prop:"routeComponent", label:"组件名"},
                    {prop:"parentName", label:"父级"},
                    {prop:"resType", label:"类型"},
                    {prop:"resLevelStr", label:"级别"},
                    {prop:"resSort", label:"排序"},
                    {prop:"descri", label:"描述"},
                    {prop:"userName", label:"创建人"},
                    {prop:"createTime", label:"创建时间", colType:'time'},
                    {prop:"recordStatus", label:"状态", colType:'label'},
                    {label:"操作", colType:'opt',fixed:'right',type:'expand',
                        // {label:"操作", colType:'opt',fixed:'right',
                        btns:[
                            {optName:'rs',optType:'rs',handlerName:'uptRs',permis:PermisConf.UPDATE_RECORDSTATUS},
                            {title:'修改',type:'success',icon:'edit-outline',clickHand:this.updateHandler,permis:PermisConf.UPDATE},
                            {title:'删除',handlerName:'del',type:'warning',icon:'delete',permis:PermisConf.DEL},
                            {title:'硬删除',handlerName:'realDel',type:'danger',icon:'delete',permis:PermisConf.REAL_DEL},
                        ]
                    },
                ],
            };
        },
        created(){
            //添加权限前缀
            this.btnOptBarData.forEach(item=>item.permis?item.permis = PERM_PREFIX+item.permis:item);
            this.columns[this.columns.length-1].btns.forEach(item=>item.permis?item.permis = PERM_PREFIX+item.permis:item);
        },
        computed:{
            apiModelName:()=>API_MODEL_NAME,
        },
        methods: {
            isParentQueryChange(lable){
                window.console.log('是否选中父查询：'+lable);

                this.requestQuery();
            },
            //添加
            addHandler(){
                this.addConf.visible = true;
            },
            //修改
            updateHandler(row){
                this.uptConf.visible = true;
                this.uptConf.checkedData = row;
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
            requestQuery(key) {
                this.loading = true;
                let queryCondition = this.queryCondition;
                let cdtCustom = queryCondition.cdtCustom;
                if (queryCondition.isParentQuery=='1') {
                    cdtCustom.parentId = key?key:this.$refs.navTree.getCurrentKey();
                }else{
                    cdtCustom.parentId = null;
                }
                queryCondition.cdtCustom = cdtCustom;
                this.queryCondition = queryCondition;
                this.$api.SysResource.query(this.queryCondition).then((res) => {
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
    .SysResource {
        /*display: flex;*/
        /*padding: 10px;*/
        /*margin: 15px 15px 0 15px;*/
        /*padding: 0px;*/
        .el-tree{
            height: 100%;
            /*width: 120px;*/
        }
        .content{
            /*flex: 1;*/
        }
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