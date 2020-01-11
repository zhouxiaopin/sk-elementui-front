<template>
    <div class="SysUser view-area">
        <!--搜索区域-->
        <div>
            <el-form ref="searchForm" :model="queryCondition.cdtCustom"  :inline="true" size="small">
<!--            <el-form ref="searchForm" :model="searchFormModel" label-width="auto" :inline="true" size="small">-->
                <el-form-item label="用户名">
                    <el-input v-model="queryCondition.cdtCustom.userName"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" icon="el-icon-search" @click="onSearchSubmit">搜索</el-button>
                    <el-button type="success" icon="el-icon-refresh" @click="onRefresh">刷新</el-button>
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
                    prop="userName"
                    label="用户名">
                <!--<template slot-scope="scope">{{ scope.row.date }}</template>-->
            </el-table-column>
            <el-table-column
                    prop="sex"
                    label="性别">
            </el-table-column>
            <el-table-column
                    prop="mobilePhone"
                    label="手机">
            </el-table-column>
            <el-table-column
                    prop="email"
                    label="邮箱">
            </el-table-column>
            <el-table-column
                    prop="createTime"
                    :formatter="dateFormat"
                    label="创建时间">
            </el-table-column>
            <el-table-column
                    prop="recordStatus"
                    label="状态"
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
                    :current-page="pageInfo.pageNum"
                    :page-sizes="[10,100, 200, 300]"
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
</template>

<script>
    export default {
        name: "SysUser",
        data(){
            return{
                queryCondition:{
                    start:0,//当前第几页
                    length:1,//页面显示数量
                    cdtCustom:{userName:null}
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
                loading:false,

            }
        },
        created:function(){
            this.log.debug('created')
            this.requestQuery();
        },
        methods: {
            onSearchSubmit() {
                        // window.console.log(JSON.stringify(this.searchFormModel));

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
            onRefresh(){
                let queryCondition = this.queryCondition;
                // queryCondition.length = 10;
                queryCondition.start = 0;
                queryCondition.cdtCustom.userName = null;
                this.queryCondition = queryCondition;
              this.requestQuery();
            },
            //请求查询
            requestQuery() {
                this.log.infoJson('请求参数：',this.queryCondition)
                this.$api.sysUser.query(this.queryCondition).then((res) => {
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
                const daterc = row[column.property]
                if(daterc!=null){
                    const dateMat= new Date(daterc);
                    const year = dateMat.getFullYear();
                    const month = dateMat.getMonth() + 1;
                    const day = dateMat.getDate();
                    const hh = dateMat.getHours();
                    const mm = dateMat.getMinutes();
                    const ss = dateMat.getSeconds();
                    const timeFormat= year + "-" + month + "-" + day + " " + hh + ":" + mm + ":" + ss;
                    return timeFormat;
                }

            }
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