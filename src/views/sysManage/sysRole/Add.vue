<template>
    <div class="Add">
        <el-dialog :title="conf.title||'添加'" :visible.sync="rVisible" center width="50%" @open="open" @close="close"  :close-on-click-modal = false>
            <el-form :model="dataForm" ref="form" :rules="dataRules" label-width="auto">
                <el-row :gutter="20">
                    <!--左边-->
                    <el-col :span="8">
                        <sk-menu-tree lable="权限:" v-model="dataForm.permisIds" :sc-code="SysPermisDict.SYS_PERMIS_TREE" height="50vh" />
                    </el-col>
                    <!--右边开始-->
                    <el-col :span="16">
                        <el-row :gutter="20">
                            <el-form-item label="角色标识:" prop="roleFlag">
                                <el-input v-model="dataForm.roleFlag" auto-complete="off"></el-input>
                            </el-form-item>
                        </el-row>
                        <el-row :gutter="20">
                            <el-form-item label="角色名:" prop="roleName">
                                <el-input v-model="dataForm.roleName" auto-complete="off"></el-input>
                            </el-form-item>
                        </el-row>
                        <el-row :gutter="20">
                            <el-form-item label="拥有资源:" prop="resIds">
                                <sk-select-tree v-model="dataForm.resIds" :sc-code="SYS_RESOURCE_TREE"
                                                placeholder="请选择拥有资源" />
                                <!--                                    <sk-select-tree :value.sync="dataForm.resIds" :dictType="STATEMENT_TYPE"-->
                                <!--                                               placeholder="请选择拥有资源" />-->
                            </el-form-item>
                        </el-row>
                        <el-row :gutter="20">
                            <el-form-item label="描述:" prop="descri">
                                <el-input
                                        type="textarea"
                                        :autosize="{ minRows: 4, maxRows: 6}"
                                        maxlength="100"
                                        show-word-limit
                                        placeholder="请输入描述"
                                        v-model="dataForm.descri">
                                </el-input>
                            </el-form-item>
                        </el-row>

                    </el-col>
                    <!--右边结束-->
                </el-row>

            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click.stop="resetForm('form')">重置</el-button>
                <el-button type="primary" @click.stop="submitForm('form')">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    /*eslint-disable*/
    import {SysResourceDict,SysPermisDict} from '@/config/dictConfig'
    import SkSelectTree from '@/components/sys/common/form/SkSelectTree'
    import SkMenuTree from '@/components/sys/common/SkMenuTree'
    export default {
        name: "Add",
        components:{
            SkSelectTree,
            SkMenuTree
        },
        props:{
            conf: {
                type: Object,
                required: true
            },
            refreshData: {
                type: Function,
                required: true
            },
        },
        data(){
            return{
                SYS_RESOURCE_TREE:SysResourceDict.SYS_RESOURCE_TREE,
                SysPermisDict:SysPermisDict,
                dataForm: {
                    // roleId:null,
                    roleFlag:null,
                    roleName:null,
                    descri:null,
                    permisIds:null,
                    resIds:null
                    // optId:null,
                    // recordStatus:null,
                    // updateTime:null,
                    // createTime:null,
                },
                permisTreeProps: {
                    children: 'children',
                    label: 'pName',
                    value: 'pId',
                },
                //添加校验规则
                dataRules: {
                    roleFlag: [
                        { required: true, message: '请输入角色标识', trigger: 'blur' }
                    ],
                    roleName: [
                        { required: true, message: '请输入角色名', trigger: 'blur' }
                    ]

                },
                resTreeData:[],
                permisTreeData:[]
            }
        },
        methods: {
            open(){
                // this.requestSysPermisTree();
            },
            close(){
                this.resetForm('form');
                this.$emit('close', false);
            },
            //请求添加
            requestAdd() {
                this.$api.SysRole.add(this.dataForm).then((res) => {
                    if (res.code === 0) {
                        this.msg.success(res.msg);
                        this.$emit('close', false);
                        this.refreshData();
                    }
                });
            },
            submitForm(formName){
                this.log.debugJson('表单数据',this.form);
                this.$refs[formName].validate(valid => {
                    if (valid) {
                        this.requestAdd();
                    }
                });

            },
            resetForm(formName){
                this.$refs[formName].resetFields();
                this.dataForm.permisIds = null;
                this.dataForm.roleIds = null;
            }
        },
        computed:{
            rVisible: {
                get: function () {
                    return this.conf.visible
                },
                set: function () {
                    // this.$emit('setAddVisible',v);
                }
            },

        }
    }
</script>

<style lang="scss" scoped>
    .Add {
    }
</style>