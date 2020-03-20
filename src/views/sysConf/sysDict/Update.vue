<template>
    <div class="Update">
        <el-dialog :title="conf.title||'修改'" :visible.sync="rVisible" center width="50%" @open="open" @close="close" :close-on-click-modal = false>
            <el-form :model="dataForm" ref="form" :rules="dataRules" label-width="auto">
                <el-row :gutter="20">
                    <el-col :span="12">
                        <el-form-item label="字典类型:" prop="dictType">
                            <el-input v-model="dataForm.dictType" auto-complete="off"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="字典编码:" prop="dictCode">
                            <el-input v-model="dataForm.dictCode" auto-complete="off"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="20">
                    <el-col :span="12">
                        <el-form-item label="编码名称:" prop="codeName">
                            <el-input v-model="dataForm.codeName" auto-complete="off"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="类型描述:" prop="description">
                            <el-input v-model="dataForm.description" auto-complete="off"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="20">
                    <el-col :span="12">
                        <el-form-item label="排序:" prop="sort">
                            <el-input v-model="dataForm.sort" auto-complete="off"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="备注:" prop="remark">
                            <el-input
                                    type="textarea"
                                    :autosize="{ minRows: 4, maxRows: 6}"
                                    placeholder="请输入备注"
                                    maxlength="100"
                                    show-word-limit
                                    v-model="dataForm.remark">
                            </el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="20">
                    <el-col :span="12">
                        <el-form-item label="预留字段1:" prop="field1">
                            <el-input v-model="dataForm.field1" auto-complete="off"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="预留字段2:" prop="field2">
                            <el-input v-model="dataForm.field2" auto-complete="off"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="20">
                    <el-col :span="12">
                        <!--                        <el-form-item label="用户名:" :label-width="formLabelWidth" >-->
                        <el-form-item label="预留字段3:" prop="field3">
                            <el-input v-model="dataForm.field3" auto-complete="off"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="预留字段4:" prop="field4">
                            <el-input v-model="dataForm.field4" auto-complete="off"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="20">
                    <el-col :span="12">
                        <!--                        <el-form-item label="用户名:" :label-width="formLabelWidth" >-->
                        <el-form-item label="预留字段5:" prop="field5">
                            <el-input v-model="dataForm.field5" auto-complete="off"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="预留字段6:" prop="field6">
                            <el-input v-model="dataForm.field6" auto-complete="off"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="20">
                    <el-col :span="12">
                        <el-form-item label="修改时间:" prop="updateTime">
                            <el-date-picker
                                    readonly
                                    v-model="dataForm.updateTime"
                                    class="wp-100"
                                    type="datetime"
                                    placeholder="选择日期时间">
                            </el-date-picker>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="创建时间:" prop="createTime">
                            <el-date-picker
                                    readonly
                                    v-model="dataForm.createTime"
                                    class="wp-100"
                                    type="datetime"
                                    placeholder="选择日期时间">
                            </el-date-picker>
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
    export default {
        name: "Update",
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
                dataForm: {
                    // dictId:null,
                    // dictType:null,
                    // dictCode:null,
                    // codeName:null,
                    // description:null,
                    // sort:null,
                    // remark:null,
                    // field1:null,
                    // field2:null,
                    // field3:null,
                    // field4:null,
                    // field5:null,
                    // field6:null,
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
                    ictType: [
                        { required: true, message: '请输入字典类型', trigger: 'blur' }
                    ],
                    dictCode: [
                        { required: true, message: '请输入字典编码', trigger: 'blur' }
                    ],
                    codeName: [
                        { required: true, message: '请输入编码名称', trigger: 'blur' }
                    ],
                    sort: [
                        { required: true, message: '请输入排序', trigger: 'blur' }
                    ]

                },
            }
        },
        methods: {
            getInitData(){
                let param = {};
                param[this.conf.idKey] = this.conf.checkedData[this.conf.idKey];
                this.$api.SysDict.getEntity(param).then((res) => {
                    if (res.code === 0) {
                        /*eslint-disable*/
                        // debugger
                        this.dataForm = res.data;
                    }
                });
            },
            open(){
                this.getInitData();
            },
            close(){
                this.resetForm('form');
                this.$emit('close', false);
            },
            //请求查询字典
            requestQueryByDictType(dictType,callback) {
                this.$api.SysDict.queryByDictType(dictType).then((res) => {
                    if (res.code === 0) {
                        callback(res.data);
                    }
                });
            },
            //请求修改
            requestUpdate() {
                let noSuBFiled = this.noSuBFiled;
                let param = this.dataForm;
                for (let key in noSuBFiled) {
                    delete param[key];
                }
                this.$api.SysDict.update(param).then((res) => {
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