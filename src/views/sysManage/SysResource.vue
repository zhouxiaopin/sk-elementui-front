<template>
    <div class="SysResource view-area">
        <el-row :gutter="10">
            <el-col :span="4">
                <el-tree
                        ref="tree"
                        :data="leftTreeData"
                        :expand-on-click-node="false"
                        @node-click="treeNodeClick"
                        default-expand-all
                        node-key="rId"
                        style="overflow-y: scroll;height: 81vh"
                        :props="defaultProps">
                </el-tree>
            </el-col>
            <el-col :span="20">
                <div class="content">
                    <!--搜索区域-->
                    <div>
                        <el-form ref="searchForm" :model="queryCondition.cdtCustom"  :inline="true" size="small">
                            <!--            <el-form ref="searchForm" :model="searchFormModel" label-width="auto" :inline="true" size="small">-->
                            <el-form-item label="父节点查询:">
                                <el-radio-group v-model="queryCondition.isParentQuery" @change="isParentQueryChange">
                                    <el-radio label="1">是</el-radio>
                                    <el-radio label="0">否</el-radio>
                                </el-radio-group>
                            </el-form-item>
                            <el-form-item label="资源名">
                                <el-input v-model="queryCondition.cdtCustom.userName"></el-input>
                            </el-form-item>
                            <el-form-item>
                                <el-button type="primary" icon="el-icon-search" @click="onSearchSubmit">搜索</el-button>
                                <el-button type="success" icon="el-icon-refresh" @click="onSearchSubmit">刷新</el-button>
                            </el-form-item>
                        </el-form>
                    </div>
                    <!--按钮区域-->
                    <div class="btnArea">
                        <el-button type="primary" icon="el-icon-search" @click="add" size="small">添加</el-button>
                        <el-button type="success" icon="el-icon-refresh" @click="onSearchSubmit" size="small">修改</el-button>
                    </div>

                    <!--表格-->
                    <el-table
                            ref="multipleTable"
                            v-loading="loading"
                            element-loading-text="拼命加载中"
                            element-loading-spinner="el-icon-loading"
                            element-loading-background="rgba(0, 0, 0, 0.6)"
                            :data="tableData"
                            tooltip-effect="dark"
                            :border="true"
                            class="wp-100">
                        <el-table-column
                                type="selection"
                                width="55">
                        </el-table-column>
                        <el-table-column
                                prop="rName"
                                label="资源名">
                        </el-table-column>
                        <el-table-column
                                prop="routePath"
                                label="路由路径">
                        </el-table-column>
                        <el-table-column
                                prop="routeName"
                                label="路由名">
                        </el-table-column>
                        <el-table-column
                                prop="routeComponent"
                                label="路由组件">
                        </el-table-column>
                        <el-table-column
                                prop="parentName"
                                label="父级">
                        </el-table-column>
                        <el-table-column
                                prop="rType"
                                label="类型">
                        </el-table-column>
                        <el-table-column
                                prop="rLevelStr"
                                label="级别">
                        </el-table-column>
                        <el-table-column
                                prop="rSort"
                                label="排序">
                        </el-table-column>
                        <el-table-column
                                prop="descri"
                                label="描述" show-overflow-tooltip>
                        </el-table-column>
                        <el-table-column
                                prop="userName"
                                label="创建人">
                        </el-table-column>
                        <el-table-column
                                prop="createTime"
                                :formatter="dateFormat"
                                label="创建时间">
                        </el-table-column>
                        <el-table-column
                                prop="recordStatus"
                                label="状态" >
                        </el-table-column>
                        <el-table-column
                                fixed="right"
                                label="操作"
                                width="100">
                            <template slot-scope="scope">
                                <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
                                <el-button type="text" size="small">编辑</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                    <!--分页-->
                    <div class="page">
                        <el-pagination
                                @size-change="handleSizeChange"
                                @current-change="handleCurrentChange"
                                :current-page="pageInfo.pageNum"
                                :page-sizes="[5,10,100, 200, 300]"
                                :page-size="pageInfo.pageSize"
                                layout="total, prev, pager, next, jumper, sizes"
                                :total="pageInfo.total">
                        </el-pagination>
                    </div>
                    <!--添加框-->
                    <el-dialog title="收货地址" :visible.sync="dialogFormVisible">
                        <el-form :model="form">
                            <el-form-item label="活动名称" :label-width="formLabelWidth">
                                <el-input v-model="form.name" auto-complete="off"></el-input>
                            </el-form-item>
                            <el-form-item label="活动区域" :label-width="formLabelWidth">
                                <el-select v-model="form.region" placeholder="请选择活动区域">
                                    <el-option label="区域一" value="shanghai"></el-option>
                                    <el-option label="区域二" value="beijing"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-form>
                        <div slot="footer" class="dialog-footer">
                            <el-button @click="dialogFormVisible = false">取 消</el-button>
                            <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
                        </div>
                    </el-dialog>
                </div>
            </el-col>

        </el-row>



    </div>
</template>

<script>
    import {listToTree} from '@/utils/tree'
    import {dateFormat} from '@/utils/date'
    export default {
        name: "SysResource",
        data() {
            return {
                leftTreeData:[],
                defaultProps: {
                    children: 'children',
                    label: 'rName'
                },
                queryCondition:{
                    start:0,//当前第几页
                    length:5,//页面显示数量
                    isParentQuery: '1',
                    // orderBy: 'r_sort asc',
                    cdtCustom:{
                        parentId:null,
                        userName:null
                    }
                },
                tableData:[],
                pageInfo:{},
                dialogFormVisible: false,
                formLabelWidth: '120px',
                form: {
                    name: '',
                    region: '',
                },
                // loading:true
                loading:false
            };
        },
        // created(){
        // },
        mounted: function () {
            this.requestSysResTree();
        },
        methods: {
            onSearchSubmit() {
                window.console.log(JSON.stringify(this.queryCondition));
                window.console.log(this.$refs.tree.getCurrentKey());
                this.requestQuery();
            },
            add(){
                this.dialogFormVisible = true
            },
            isParentQueryChange(lable){
                window.console.log('是否选中父查询：'+lable);
                this.requestQuery();
            },
            handleSizeChange(val) {
                this.log.debug(`每页 ${val} 条`);
                let queryCondition = this.queryCondition;
                queryCondition.length = val;
                this.queryCondition = queryCondition;
                this.requestQuery();
            },
            handleCurrentChange(val) {
                this.log.debug(`当前页: ${val}`);
                let queryCondition = this.queryCondition;
                queryCondition.start = val-1;
                this.queryCondition = queryCondition;
                this.requestQuery();
            },
            treeNodeClick(data){
                if (data.children){
                    this.requestQuery();
                }
                this.log.debugJson('',data);
                // this.log.debugJson('', Node);
            },
            //请求查询系统资源树
            requestSysResTree(){
                this.$api.sysResource.queryAllByCondition({orderBy: 'r_sort asc'}).then((res) => {
                    // this.log.debug(JSON.stringify(listToTree("rId","parentId",res.data)));
                    if(res.code === 0) {
                        // this.$set(this.leftTreeData, 'b', 'obj.b')
                        let leftTreeData = listToTree("rId","parentId",res.data);
                        this.leftTreeData = leftTreeData;

                        // this.requestQuery();
                    } else {
                        this.$message({
                            message: res.msg,
                            type: 'info'
                        })
                    }
                    // this.loading = false
                }).catch((res) => {
                    this.$message({
                        message: res.message,
                        type: 'error'
                    })
                });
            },
            //请求查询
            requestQuery() {
                let queryCondition = this.queryCondition;
                let cdtCustom = queryCondition.cdtCustom;
                // this.log.infoJson('请求参数：',queryCondition);
                if (queryCondition.isParentQuery=='1') {
                    this.log.debugJson('',this.leftTreeData[0].rName);
                    cdtCustom.parentId = this.$refs.tree.getCurrentKey()||this.leftTreeData[0].rId;
                }else{
                    cdtCustom.parentId = null;
                }
                queryCondition.cdtCustom = cdtCustom;
                this.queryCondition = queryCondition;
                this.$api.sysResource.query(queryCondition).then((res) => {
                    // this.log.debug(res.data)
                    if (res.code !== 0) {
                        this.$message({
                            message: res.msg,
                            type: 'error'
                        })
                    } else {
                        this.pageInfo = res.data;
                        this.tableData = res.data.list;
                        // this.log.infoJson('系统用户数据：',this.tableData)
                        // this.requ = res.data.list;

                    }
                    // this.loading = false
                }).catch((res) => {
                    this.$message({
                        message: res.message,
                        type: 'error'
                    })
                });
                // this.changeVerifCode();
                // loading.close();
            },
            //时间格式化
            // dateFormat(row, column, cellValue, index){
            dateFormat(row, column){
                // this.log.debug(`cellValue: ${cellValue},index: ${index}`);
                let date = row[column.property];
                return dateFormat(date);

            }
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