<template>
    <div class="Update">
<!--        <el-dialog :title="conf.title||'修改'" :visible.sync="rVisible" center width="50%" @open="open" @close="close" :destroy-on-close="true" :close-on-click-modal = false>-->
        <el-dialog :title="conf.title||'修改'" :visible.sync="rVisible" center width="50%" @open="open"
                   @close="close" :destroy-on-close="false" :close-on-click-modal = false>
            <el-form :model="dataForm" ref="form" :rules="dataRules" label-width="auto">
                <el-row :gutter="20">
                    <!--左边-->
                    <el-col :span="8">
<!--                        <sk-menu-tree lable="权限:" v-model="dataForm.permisIds" :sc-code="SYS_PERMIS_TREE" height="50vh" />-->
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
        name: "Update",
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
                initData: {
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
                noSuBFiled: {
                    updateTime:'',
                    createTime:'',
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
                scTypeData: []
            }
        },
        created(){
            // debugger;
            // this.getInitData();
        },
        methods: {
            getInitData(){
                // debugger;
                let param = {};
                param[this.conf.idKey] = this.conf.checkedData[this.conf.idKey];
                this.$api.SysRole.getEntity(param).then((res) => {
                    if (res.code === 0) {
                        /*eslint-disable*/
                        // debugger
                        this.initData = res.data;
                        // this.initData['oldPermisIds'] = this.initData.permisIds
                        // this.initData['oldPermisIds'] = this.initData.permisIds
                    }
                });
            },
            open(){
                // this.requestQueryByDictType(SysRole.STATEMENT_TYPE,data=>{
                //     this.scTypeData = data;
                // });
                this.getInitData();
            },
            close(){
                this.resetForm('form');
                this.$emit('close', false);
            },
            //请求修改
            requestUpdate() {
                let noSuBFiled = this.noSuBFiled;
                let param = this.dataForm;
                for (let key in noSuBFiled) {
                    delete param[key];
                }
                this.$api.SysRole.update(param).then((res) => {
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
                        this.requestUpdate();
                    }
                });

            },
            resetForm(formName){
                this.getInitData();
                // this.$refs[formName].resetFields();
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
            dataForm: {
                get: function () {
                    return this.initData
                },
                set: function () {
                    // this.$emit('setAddVisible',v);
                }
            },
        }
    }
</script>

<style lang="scss" scoped>
    .Update {
    }
</style>