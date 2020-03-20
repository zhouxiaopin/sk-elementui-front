<template>
    <div class="Update">
        <el-dialog :title="conf.title||'修改'" :visible.sync="rVisible" center width="50%" @open="open" @close="close" :close-on-click-modal = false>
            <el-form :model="dataForm" ref="form" :rules="dataRules" label-width="auto">
                <el-row :gutter="20">
                    <el-col :span="12">
                        <el-form-item label="语句编码:" prop="scCode">
                            <el-input v-model="dataForm.scCode" auto-complete="off"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="语句名:" prop="scName">
                            <el-input v-model="dataForm.scName" auto-complete="off"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="20">
                    <el-col :span="12">
                        <el-form-item label="语句类型:" prop="scType">
                            <sk-select :value.sync="dataForm.scType" :dictType="STATEMENT_TYPE"
                                       placeholder="请选择语句类型" />
<!--                            <el-select v-model="dataForm.scType"-->
<!--                                       filterable placeholder="请选择语句类型"-->
<!--                                       collapse-tags>-->
<!--                                <el-option-->
<!--                                        v-for="(item,index) in scTypeData"-->
<!--                                        :key="index"-->
<!--                                        :label="item.name"-->
<!--                                        :value="item.code">-->
<!--                                </el-option>-->
<!--                            </el-select>-->
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
                <el-row :gutter="20">
                    <el-col :span="12">
                        <!--                        <el-form-item label="用户名:" :label-width="formLabelWidth" >-->
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
                <el-form-item label="语句:" prop="scStatement">
                    <el-input
                            type="textarea"
                            :autosize="{ minRows: 4, maxRows: 6}"
                            placeholder="请输入语句"
                            maxlength="100"
                            show-word-limit
                            v-model="dataForm.scStatement">
                    </el-input>
                </el-form-item>
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
    import {SysSqlConf} from '@/config/dictConfig'
    import SkSelect from '@/components/sys/common/form/SkSelect'
    export default {
        name: "Update",
        components:{
            SkSelect
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
                dataForm: {
                    // scId:null,
                    // scCode:'',
                    // scName:'',
                    // scStatement:'',
                    // scType:'',
                    // descri:'',
                    // field1:'',
                    // field2:'',
                    // field3:'',
                    // field4:'',
                    // recordStatus:'',
                    // updateTime:'',
                    // createTime:'',
                },
                STATEMENT_TYPE:SysSqlConf.STATEMENT_TYPE,
                noSuBFiled: {
                    updateTime:'',
                    createTime:'',
                },
                //添加校验规则
                dataRules: {
                    scCode: [
                        { required: true, message: '请输入语句编码', trigger: 'blur' }
                    ],
                    scType: [
                        { required: true, message: '请输入语句类型', trigger: 'blur' }
                    ],
                    scStatement: [
                        { required: true, message: '请输入语句', trigger: 'blur' }
                    ]

                },
            }
        },
        methods: {
            getInitData(){
                let param = {};
                param[this.conf.idKey] = this.conf.checkedData[this.conf.idKey];
                this.$api.SysSqlConf.getEntity(param).then((res) => {
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
                this.$api.SysSqlConf.update(param).then((res) => {
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