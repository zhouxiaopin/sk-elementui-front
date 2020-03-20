<template>
    <div class="Add">
        <el-dialog :title="conf.title||'添加'" :visible.sync="rVisible" center width="50%" @open="open" @close="close" :close-on-click-modal = false>
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
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="描述:" prop="descri">
                            <el-input
                                    type="textarea"
                                    :autosize="{ minRows: 4, maxRows: 6}"
                                    placeholder="请输入描述"
                                    maxlength="100"
                                    show-word-limit
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
                            v-model="dataForm.scStatement">
                    </el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click.stop="resetForm('form')">重置</el-button>
                <el-button type="primary" @click.stop="submitForm('form')">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import {SysSqlConf} from '@/config/dictConfig'
    import SkSelect from '@/components/sys/common/form/SkSelect'
    export default {
        name: "Add",
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
                STATEMENT_TYPE:SysSqlConf.STATEMENT_TYPE,
                dataForm: {
                    scId:null,
                    scCode:'',
                    scName:'',
                    scStatement:'',
                    scType:null,
                    descri:'',
                    field1:'',
                    field2:'',
                    field3:'',
                    field4:'',
                    recordStatus:'',
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
                scTypeData: []
            }
        },
        methods: {
            open(){
                // this.requestQueryByDictType(SysSqlConf.STATEMENT_TYPE,data=>{
                //     this.scTypeData = data;
                // });
            },
            close(){
                this.resetForm('form');
                this.$emit('close', false);
            },
            //请求查询字典
            // requestQueryByDictType(dictType,callback) {
            //     this.$api.sysDict.queryByDictType(dictType).then((res) => {
            //         // this.log.debug(res.data)
            //         if (res.code === 0) {
            //             callback(res.data);
            //         }
            //     });
            // },
            //请求添加
            requestAdd() {
                this.$api.sysSqlConf.add(this.dataForm).then((res) => {
                    if (res.code === 0) {
                        this.msg.success(res.msg);
                        this.$emit('close', false);
                        this.refreshData();
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