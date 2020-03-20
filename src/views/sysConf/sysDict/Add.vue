<template>
    <div class="Add">
        <el-dialog :title="conf.title||'添加'" :visible.sync="rVisible" center width="50%" @open="open" @close="close" :close-on-click-modal = false>
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
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click.stop="resetForm('form')">重置</el-button>
                <el-button type="primary" @click.stop="submitForm('form')">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        name: "Add",
        components:{
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
                    // dictId:null,
                    dictType:null,
                    dictCode:null,
                    codeName:null,
                    description:null,
                    sort:null,
                    remark:null,
                    field1:null,
                    field2:null,
                    field3:null,
                    field4:null,
                    field5:null,
                    field6:null,
                    // recordStatus:null,
                    // updateTime:null,
                    // createTime:null,
                },
                //添加校验规则
                dataRules: {
                    dictType: [
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
            open(){
            },
            close(){
                this.resetForm('form');
                this.$emit('close', false);
            },
            //请求查询字典
            requestQueryByDictType(dictType,callback) {
                this.$api.SysDict.queryByDictType(dictType).then((res) => {
                    // this.log.debug(res.data)
                    if (res.code === 0) {
                        callback(res.data);
                    }
                });
            },
            //请求添加
            requestAdd() {
                this.$api.SysDict.add(this.dataForm).then((res) => {
                    if (res.code === 0) {
                        this.msg.success(res.msg);
                        // this.$emit('close', false);
                        this.refreshData();
                        this.dataForm.sort = (parseInt(this.dataForm.sort)+1)+'';
                    }
                });
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