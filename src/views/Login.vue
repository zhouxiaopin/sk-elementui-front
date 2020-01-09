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
    import Cookies from "js-cookie";
    export default {
        name: "Login",
        data() {
            let validateUserName = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入用户名'));
                } else {
                    callback();
                }
            };
            let validatePsw = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入密码'));
                } else {
                    callback();
                }
            };
            let validateVerify = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入验证码'));
                } else {
                    callback();
                }
            };
            return {
                //当前验证码
                curVerifCode:'',
                //登录表单
                loginForm: {
                    userName: '',
                    password: '',
                    verifCode: '',
                },
                //登录校验规则
                loginRules: {
                    userName: [
                        { validator: validateUserName, trigger: 'blur' }
                    ],
                    password: [
                        { validator: validatePsw, trigger: 'blur' }
                    ],
                    verifCode: [
                        { validator: validateVerify, trigger: 'blur' }
                    ]

                }
            };
        },
        mounted: function () {
            //画验证码
            this.changeVerifCode();
        },
        methods: {
            //点击改变验证码
            changeVerifCode() {
                //画验证码
                this.curVerifCode = drawPic(this.$refs['verifCodeCanvas']);
            },
            //参数校验
            validateParam() {
                if (this.loginForm.verifCode !== this.curVerifCode) {
                    this.$message.error('验证码错误');
                    this.changeVerifCode();
                    return false;
                }
                return true;
            },
            //表单提交
            submitForm(formName) {
                this.$refs[formName].validate(valid => {
                    if (valid) {
                        if (this.validateParam()) {
                            this.requestLogin();
                        }
                    } else {
                        this.log.info('表单提交失败');
                        return false;
                    }
                });
            },
            //重置表单
            resetForm(formName) {
                this.$refs[formName].resetFields();
            },
            //请求登录
            requestLogin() {
                const loading = this.$loading({
                    lock: true,
                    text: 'Loading',
                    spinner: 'el-icon-loading',
                    background: 'rgba(0, 0, 0, 0.7)'
                });
                this.$api.login.login(this.loginForm).then((res) => {
                    this.log.debug(res.data)
                    if (res.code !== 0) {
                        this.$message({
                            message: res.msg,
                            type: 'error'
                        })
                    } else {
                        Cookies.set('X-Access-Token', res.data);// 放置token到Cookie
                        sessionStorage.setItem('userName', this.loginForm.userName);// 保存用户到本地会话
                        // this.$store.commit('menuRouteLoaded', false) // 要求重新加载导航菜单
                        this.$router.replace('/').catch(err => {err})  // 登录成功，跳转到主页
                    }
                    // this.loading = false
                }).catch((res) => {
                    this.$message({
                        message: res.message,
                        type: 'error'
                    })
                });
                // this.changeVerifCode();
                loading.close();
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