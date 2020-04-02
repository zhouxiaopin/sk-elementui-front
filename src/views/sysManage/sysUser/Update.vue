<template>
    <div class="Update">
        <el-dialog :title="conf.title||'修改'" :visible.sync="rVisible" center width="50%" @open="open" @close="close" :close-on-click-modal = false>
            <el-form :model="dataForm" ref="form" :rules="dataRules" label-width="auto">
                <el-row>
                <el-col :span="12">
                    <el-form-item label="用户名:" prop="userName">
                        <el-input v-model="dataForm.userName" auto-complete="off"></el-input>
                    </el-form-item>
                </el-col>

                <el-col :span="12">
                    <el-form-item label="姓名:" prop="realName">
                        <el-input v-model="dataForm.realName" auto-complete="off"></el-input>
                    </el-form-item>
                </el-col>
                </el-row>
                <el-row :gutter="20">
                    <el-col :span="12">
                        <el-form-item label="性别:" prop="sex">
                            <el-radio-group v-model="dataForm.sex">
                                <el-radio label="1">男</el-radio>
                                <el-radio label="2">女</el-radio>
                            </el-radio-group>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="手机号码:" prop="mobilePhone">
                            <el-input v-model="dataForm.mobilePhone" auto-complete="off"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="20">
                    <el-col :span="12">
                        <el-form-item label="邮箱:" prop="email">
                            <el-input v-model="dataForm.email" auto-complete="off"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="角色:" prop="roleIds">
                            <sk-select :value.sync="dataForm.roleIds" :scCode="SYS_ROLE_SELECT"
                                       placeholder="请选择语句类型" :multiple=true />
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
                <el-row :gutter="20">
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
    import {SysRole} from '@/config/dictConfig'
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
            let validatePassword2 = (rule, value, callback) => {
                if (!value) {
                    callback(new Error('请输入确认密码'));
                } else if (value !== this.dataForm.password) {
                    callback(new Error('两次输入密码不一致!'));
                } else {
                    callback();
                }
            };
            return{
                SYS_ROLE_SELECT:SysRole.SYS_ROLE_SELECT,
                dataForm: {
                    // userId:null,
                    userName:null,
                    password:null,
                    password2:null,
                    realName:null,
                    sex:'1',
                    email:null,
                    mobilePhone:null,
                    // salt:null,
                    roleIds:null,
                    descri:null,
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
                    userName: [
                        { required: true, message: '请输入用户名', trigger: 'blur' }
                    ],
                    password: [
                        { required: true, message: '请输入密码', trigger: 'blur' }
                    ],
                    password2: [
                        // { required: true, message: '请输入确认密码', trigger: 'blur' },
                        { validator: validatePassword2, trigger: 'blur' }
                    ]

                },
                // scTypeData: []
            }
        },
        methods: {
            getInitData(){
                let param = {};
                param[this.conf.idKey] = this.conf.checkedData[this.conf.idKey];
                this.$api.SysUser.getEntity(param).then((res) => {
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
            //请求修改
            requestUpdate() {
                let noSuBFiled = this.noSuBFiled;
                let param = this.dataForm;
                for (let key in noSuBFiled) {
                    delete param[key];
                }
                this.$api.SysUser.update(param).then((res) => {
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