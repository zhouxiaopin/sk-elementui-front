<template>
    <div class="SysResource view-area">
        <el-row :gutter="10">
            <el-col :span="4">
                <el-tree
                        :data="leftTreeData"
                        :expand-on-click-node="false"
                        default-expand-all
                        node-key="rId"
                        style="overflow-y: scroll;height: 81vh"
                        ref="tree"
                        :props="defaultProps">
                </el-tree>
            </el-col>
            <el-col :span="20">
                <div class="content">
                    <!--搜索区域-->
                    <div>
                        <el-form ref="searchForm" :model="searchFormModel"  :inline="true" size="small">
                            <!--            <el-form ref="searchForm" :model="searchFormModel" label-width="auto" :inline="true" size="small">-->
                            <el-form-item label="用户名">
                                <el-input v-model="searchFormModel.userName"></el-input>
                            </el-form-item>
                            <el-form-item label="用户名">
                                <el-input v-model="searchFormModel.userName"></el-input>
                            </el-form-item>
                            <el-form-item label="用户名">
                                <el-input v-model="searchFormModel.userName"></el-input>
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
                            :data="tableData3"
                            tooltip-effect="dark"
                            :border="true"
                            class="wp-100">
                        <el-table-column
                                type="selection"
                                width="55">
                        </el-table-column>
                        <el-table-column
                                label="日期">
                            <template slot-scope="scope">{{ scope.row.date }}</template>
                        </el-table-column>
                        <el-table-column
                                prop="name"
                                label="姓名">
                        </el-table-column>
                        <el-table-column
                                prop="name"
                                label="姓名">
                        </el-table-column>
                        <el-table-column
                                prop="name"
                                label="姓名">
                        </el-table-column>
                        <el-table-column
                                prop="name"
                                label="姓名">
                        </el-table-column>
                        <el-table-column
                                prop="address"
                                label="地址"
                                show-overflow-tooltip>
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
                                :current-page="currentPage4"
                                :page-sizes="[100, 200, 300, 400]"
                                :page-size="100"
                                layout="total, prev, pager, next, jumper, sizes"
                                :total="800">
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
    export default {
        name: "SysResource",
        data() {
            return {
                leftTreeData:[],
                data: [{
                    id: 1,
                    label: '一级 1',
                    children: [{
                        id: 4,
                        label: '二级 1-1',
                        children: [{
                            id: 9,
                            label: '三级 1-1-1'
                        }, {
                            id: 10,
                            label: '三级 1-1-2'
                        }]
                    }]
                }, {
                    id: 2,
                    label: '一级 2',
                    children: [{
                        id: 5,
                        label: '二级 2-1'
                    }, {
                        id: 6,
                        label: '二级 2-2'
                    }]
                }, {
                    id: 3,
                    label: '一级 3',
                    children: [{
                        id: 7,
                        label: '二级 3-1'
                    }, {
                        id: 8,
                        label: '二级 3-2'
                    }]
                }],
                defaultProps: {
                    children: 'children',
                    label: 'rName'
                },
                searchFormModel:{
                    userName:''
                },
                tableData3: [{
                    date: '2016-05-03',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1518 弄'
                }, {
                    date: '2016-05-02',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1518 弄'
                }, {
                    date: '2016-05-04',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1518 弄'
                }, {
                    date: '2016-05-01',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1518 弄'
                }, {
                    date: '2016-05-08',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1518 弄'
                },
                    {
                        date: '2016-05-06',
                        name: '王小虎',
                        address: '上海市普陀区金沙江路 1518 弄'
                    },
                    {
                        date: '2016-05-06',
                        name: '王小虎',
                        address: '上海市普陀区金沙江路 1518 弄'
                    },

                    {
                        date: '2016-05-07',
                        name: '王小虎',
                        address: '上海市普陀区金沙江路 1518 弄'
                    }],
                currentPage4: 4,
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
        created(){
            this.requestSysResTree();
        },
        methods: {
            onSearchSubmit() {
                window.console.log(JSON.stringify(this.searchFormModel));

                // this.$refs['searchForm'].validate(valid => {
                //     if (valid) {
                //         if (this.loginForm.verifCode !== this.curVerifCode) {
                //             this.$message.error('验证码错误');
                //             return;
                //         }
                //         window.console.log(JSON.stringify(this.loginForm));
                //     } else {
                //         window.console.log('error submit!!');
                //         return false;
                //     }
                // });
            },
            add(){
                this.dialogFormVisible = true
            },
            handleSizeChange(val) {
                window.console.log(`每页 ${val} 条`);
            },
            handleCurrentChange(val) {
                window.console.log(`当前页: ${val}`);
            },
            requestSysResTree(){
                this.$api.sysResource.queryAllByCondition({}).then((res) => {
                    // this.log.debug(JSON.stringify(listToTree("rId","parentId",res.data)));
                    this.log.debug(JSON.stringify(listToTree("rId","parentId",res.data)));
                    if(res.code === 0) {
                        this.leftTreeData = listToTree("rId","parentId",res.data);
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