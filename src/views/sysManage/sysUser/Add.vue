<template>
    <div class="Add">
        <el-dialog :title="conf.title||'添加'" :visible.sync="rVisible" center width="50%" @open="open" @close="close" :close-on-click-modal = false>
            <el-form :model="dataForm" ref="form" :rules="dataRules" label-width="auto">
                <el-row :gutter="20">
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
                        <el-form-item label="初始密码:" prop="password">
                            <el-input type="password" v-model="dataForm.password" auto-complete="off"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="确认密码:" prop="password2">
                            <el-input type="password" v-model="dataForm.password2" auto-complete="off"></el-input>
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
                <el-button @click.stop="resetForm('form')">重置</el-button>
                <el-button type="primary" @click.stop="submitForm('form')">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import {SysRole} from '@/config/dictConfig'
    import SkSelect from '@/components/sys/common/form/SkSelect'
    export default {
        name: "Add",
        components:{
            SkSelect
        },
        props:{
            conf: {
                type: Object,
                required: true,
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
            open(){
            },
            close(){
                this.resetForm('form');
                this.$emit('close', false);
            },
            //请求添加
            requestAdd() {
                this.$api.SysUser.add(this.dataForm).then((res) => {
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