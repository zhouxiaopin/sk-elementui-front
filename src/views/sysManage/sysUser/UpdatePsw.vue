<template>
    <div class="Update">
        <el-dialog :title="conf.title||'修改密码'" :visible.sync="rVisible" center width="35%" @open="open" @close="close" :close-on-click-modal = false>
            <el-form :model="dataForm" ref="form" :rules="dataRules" label-width="auto">
                <el-form-item label="用户名:" prop="userName">
                    <el-input v-model="dataForm.userName" auto-complete="off" readonly></el-input>
                </el-form-item>
                <el-form-item label="新密码:" prop="password">
                    <el-input type="password" v-model="dataForm.password" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="确认新密码:" prop="password2">
                    <el-input type="password" v-model="dataForm.password2" auto-complete="off"></el-input>
                </el-form-item>
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
        name: "UpdatePsw",
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
                    userId:null,
                    userName:null,
                    password:null,
                    password2:null,
                    // realName:null,
                    // sex:'1',
                    // email:null,
                    // mobilePhone:null,
                    // salt:null,
                    // roleIds:null,
                    // descri:null,
                    // recordStatus:null,
                    // updateTime:null,
                    // createTime:null,
                },
                suBFiled: {
                    userId:null,
                    password:null,
                    password2:null,
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
                        this.dataForm.password = null;
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
            //请求修改密码
            requestUpdatePsw() {
                let suBFiled = this.suBFiled;
                let param = {};
                for (let key in suBFiled) {
                    param[key] = this.dataForm[key];
                }
                debugger
                this.$api.SysUser.updatePassword(param).then((res) => {
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
                        this.requestUpdatePsw();
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