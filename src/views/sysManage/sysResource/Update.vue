<template>
    <div class="Update">
        <el-dialog :title="conf.title||'修改'" :visible.sync="rVisible" center width="50%" @open="open" @close="close" :close-on-click-modal = false>
            <el-form :model="dataForm" ref="form" :rules="dataRules" label-width="auto">
                <el-row :gutter="20">
                    <el-col :span="12">
                        <el-form-item label="资源名:" prop="rName">
                            <el-input v-model="dataForm.resName" auto-complete="off"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="路由路径:" prop="routePath">
                            <el-input v-model="dataForm.routePath" auto-complete="off"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="20">
                    <el-col :span="12">
                        <el-form-item label="路由名:" prop="routeName">
                            <el-input v-model="dataForm.routeName" auto-complete="off"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="组件名:" prop="routeComponent">
                            <el-input v-model="dataForm.routeComponent" auto-complete="off"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="20">
                    <el-col :span="12">
                        <el-form-item label="排序:" prop="rSort">
                            <el-input v-model="dataForm.resSort" auto-complete="off"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="类型:" prop="rType">
                            <sk-select :value.sync="dataForm.resType" :dictType="SysResourceDict.RES_TYPE"
                                       placeholder="请选择类型" />
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="20">
                    <el-col :span="12">
                        <el-form-item label="父级:" prop="parentId">
                            <sk-select-tree v-model="dataForm.parentId" :sc-code="SysResourceDict.SYS_RESOURCE_TREE" :radio=true ></sk-select-tree>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="级别:" prop="pLevel">
                            <sk-select :value.sync="dataForm.resLevel+''" :dictType="SysResourceDict.RES_LEVEL" />
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="20">
                    <el-col :span="12">
                        <el-form-item label="左边图标:" prop="leftIcon">
                            <sk-select :value.sync="dataForm.leftIcon" :dictType="SysResourceDict.LEFT_ICON" />
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="预留字段1:" prop="expand1">
                            <el-input v-model="dataForm.expand1" auto-complete="off"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="20">
                    <el-col :span="12">
                        <el-form-item label="预留字段2:" prop="expand2">
                            <el-input v-model="dataForm.expand2" auto-complete="off"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="预留字段3:" prop="expand3">
                            <el-input v-model="dataForm.expand3" auto-complete="off"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="20">
                    <el-col :span="12">
                        <el-form-item label="描述:" prop="descri">
                            <el-input
                                    type="textarea"
                                    :autosize="{ minRows: 4, maxRows: 6}"
                                    placeholder="请输入描述"
                                    v-model="dataForm.descri">
                            </el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click.stop="resetForm">重置</el-button>
                <el-button type="primary" @click.stop="submitForm('form')">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    /*eslint-disable*/
    import {SysResourceDict} from '@/config/dictConfig'
    import SkSelect from '@/components/sys/common/form/SkSelect'
    import SkSelectTree from '@/components/sys/common/form/SkSelectTree'
    export default {
        name: "Update",
        components:{
            SkSelect,
            SkSelectTree
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
                SysResourceDict:SysResourceDict,
                dataForm: {
                    // resId:null,
                    // resName:null,
                    // routePath:null,
                    // routeName:null,
                    // routeComponent:null,
                    // resUrl:null,
                    // parentId:null,
                    // resType:null,
                    // resLevel:null,
                    // resSort:null,
                    // descri:null,
                    // optId:null,
                    // leftIcon:null,
                    // expand1:null,
                    // expand2:null,
                    // expand3:null,
                    // recordStatus:null,
                    // updateTime:null,
                    // createTime:null
                },
                noSuBFiled: {
                    updateTime:'',
                    createTime:'',
                },
                //添加校验规则
                dataRules: {
                    resName: [
                        { required: true, message: '请输入资源名', trigger: 'blur' }
                    ],
                    routePath: [
                        { required: true, message: '请输入路由路径', trigger: 'blur' }
                    ],
                    routeName: [
                        { required: true, message: '请输入路由名', trigger: 'blur' }
                    ],
                    routeComponent: [
                        { required: true, message: '请输入组件名', trigger: 'blur' }
                    ],

                }
            }
        },
        methods: {
            getInitData(){
                let param = {};
                param[this.conf.idKey] = this.conf.checkedData[this.conf.idKey];
                this.$api.SysResource.getEntity(param).then((res) => {
                    if (res.code === 0) {
                        /*eslint-disable*/
                        // debugger
                        this.dataForm = res.data;
                        this.dataForm.parentId = this.dataForm.parentId+'';
                    }
                });
            },
            open(){
                // this.requestQueryByDictType(SysResource.STATEMENT_TYPE,data=>{
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
                this.$api.SysResource.update(param).then((res) => {
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
            resetForm(){
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

        }
    }
</script>

<style lang="scss" scoped>
    .Update {
    }
</style>