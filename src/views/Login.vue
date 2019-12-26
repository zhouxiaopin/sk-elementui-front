<template>
    <div class="Login">
        <div class="left-content"></div>
        <div class="right-content">
            <div class="login-box">
                <div class="logo"><img src="@/assets/img/login_logo.png" alt=""></div>
                <p class="font-18">SK后台管理系统</p>
                <el-form :model="loginForm" status-icon :rules="loginRules" ref="loginForm" label-width="auto">
                    <el-form-item label="用户名" prop="userName">
                        <el-input type="text" v-model="loginForm.userName" auto-complete="off" placeholder="请输入用户名"></el-input>
                    </el-form-item>
                    <el-form-item label="密码" prop="password">
                        <el-input type="password" v-model="loginForm.password" auto-complete="off" placeholder="请输入密码"></el-input>
                    </el-form-item>
                    <el-form-item label="验证码" prop="verifCode">
                        <el-input type="text" v-model="loginForm.verifCode" auto-complete="off" placeholder="请输入验证码" style="width: 65%;margin-right: 10px"></el-input>
                        <canvas ref="verifCodeCanvas" @click="changeVerifCode()" width="90px" height="40px" style="vertical-align:middle">浏览器不支持</canvas>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="submitForm('loginForm')">提交</el-button>
                        <el-button @click="resetForm('loginForm')">重置</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </div>
    </div>
</template>

<script>
    import {drawPic} from '@/utils/verifCode'
    export default {
        name: "Login",
        data() {
            let checkUserName = (rule, value, callback) => {
                if (!value) {
                    return callback(new Error('请输入用户名'));
                }
                callback();
            };
            let validatePassword= (rule, value, callback) => {
                if (value === '') {
                    return callback(new Error('请输入密码'));
                }
                callback();
            };
            let validateverifCode= (rule, value, callback) => {
                if (value === '') {
                    return callback(new Error('请输入验证码'));
                }
                callback();
            };
            return {
                curVerifCode:'',
                loginForm: {
                    userName: '',
                    password: '',
                    verifCode: '',
                },
                loginRules: {
                    userName: [
                        { validator: checkUserName, trigger: 'blur' }
                    ],
                    password: [
                        { validator: validatePassword, trigger: 'blur' }
                    ],
                    verifCode: [
                        { validator: validateverifCode, trigger: 'blur' }
                    ],
                }
            };
        },
        mounted: function () {
            //画验证码
            this.curVerifCode = drawPic(this.$refs['verifCodeCanvas']);
        },
        methods: {
            changeVerifCode(){
                //画验证码
                this.curVerifCode = drawPic(this.$refs['verifCodeCanvas']);
            },
            submitForm(formName) {
                this.$refs[formName].validate(valid => {
                    if (valid) {
                    if (this.loginForm.verifCode !== this.curVerifCode) {
                            this.$message.error('验证码错误');
                            return;
                        }
                        window.console.log(JSON.stringify(this.loginForm));
                    } else {
                        window.console.log('error submit!!');
                        return false;
                    }
                });
            },
            //重置表单
            resetForm(formName) {
                this.$refs[formName].resetFields();
            }
        }
    }
</script>

<style lang="scss" scoped>
    .Login {
        display: flex;
        height: 100%;
        justify-content: space-around;
        align-items: center;
        background: #93defe;
        .left-content{
            background: url(~@/assets/img/login-img.png) no-repeat;
            width: 500px;
            height: 440px;
        }
        .login-box{
            width: 460px;
            height: 400px;
            background: white;
            border-radius: 5px;
            text-align: center;
            position: relative;
            padding-top: 50px;
            /*padding: 50px 50px 5px 5px;*/
            box-sizing: border-box;
            color: #888;

        }
        .el-form{
            /*padding-right: 50px;*/
            padding: 0 50px;

        }
        .logo{
            width: 120px;
            height: 120px;
            background: rgb(255,255,255);
            border: 5px solid  #93defe;
            border-radius:50%;
            box-sizing: border-box;
            position: absolute;
            left: 50%;
            margin-left: -60px;
            top: -60px;
            display: flex;
            align-items: center;
            justify-content: center;
        }
    }
</style>