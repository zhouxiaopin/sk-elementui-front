<template>
    <div class="Add">
        <el-dialog :title="conf.title||'添加'" :visible.sync="rVisible" center width="50%" @open="open" @close="close" :close-on-click-modal = false>
            <el-form :model="dataForm" ref="form" :rules="dataRules" label-width="auto">
                <el-row :gutter="20">
                    <el-col :span="12">
                        <el-form-item label="权限标识:" prop="perFlag">
                            <el-input v-model="dataForm.perFlag" auto-complete="off"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="权限名:" prop="perName">
                            <el-input v-model="dataForm.perName" auto-complete="off"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="20">
                    <el-col :span="12">
                        <el-form-item label="排序:" prop="perSort">
                            <el-input v-model="dataForm.perSort" auto-complete="off"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="类型:" prop="perType">
                            <sk-select :value.sync="dataForm.perType" :dictType="SysPermisDict.MENU_TYPE"
                                       placeholder="请选择类型" />
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="20">
                    <el-col :span="12">
                        <el-form-item label="父权限:" prop="parentId">
                            <sk-select-tree v-model="dataForm.parentId" :sc-code="SysPermisDict.SYS_PERMIS_TREE"
                                            placeholder="请选择父权限" :radio=true ></sk-select-tree>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="级别:" prop="perLevel">
                            <sk-select :value.sync="dataForm.perLevel" :dictType="SysPermisDict.MENU_LEVEL"
                                       placeholder="请选择级别" />
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="20">
                    <el-col :span="12">
                        <el-form-item label="预留字段1:" prop="expand1">
                            <el-input v-model="dataForm.expand1" auto-complete="off"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="预留字段2:" prop="expand2">
                            <el-input v-model="dataForm.expand2" auto-complete="off"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="20">
                    <el-col :span="12">
                        <el-form-item label="预留字段3:" prop="expand3">
                            <el-input v-model="dataForm.expand3" auto-complete="off"></el-input>
                        </el-form-item>
                    </el-col>
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
                <el-button @click.stop="resetForm('form')">重置</el-button>
                <el-button type="primary" @click.stop="submitForm('form')">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    /*eslint-disable*/
    import {SysPermisDict} from '@/config/dictConfig'
    import SkSelect from '@/components/sys/common/form/SkSelect'
    import SkSelectTree from '@/components/sys/common/form/SkSelectTree'
    export default {
        name: "Add",
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
                SysPermisDict:SysPermisDict,
                dataForm: {
                    perId:null,
                    perFlag:null,
                    perName:null,
                    perUrl:null,
                    parentId:null,
                    perType:null,
                    perLevel:null,
                    perSort:null,
                    descri:null,
                    optId:null,
                    leftIcon:null,
                    expand1:null,
                    expand2:null,
                    expand3:null,
                    // recordStatus:null,
                    // updateTime:null,
                    // createTime:null
                },
                //添加校验规则
                dataRules: {
                    perFlag: [
                        { required: true, message: '请输入权限标识', trigger: 'blur' }
                    ],
                    perName: [
                        { required: true, message: '请输入权限名', trigger: 'blur' }
                    ],

                }
            }
        },
        methods: {
            open(){
            },
            close(){
                this.resetForm('form');
                this.$emit('close', false);
            },
            //请求添加
            requestAdd() {
                this.$api.SysPermis.add(this.dataForm).then((res) => {
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