<template>
    <div class="PersonInfo">
        <el-dialog :title="conf.title||'个人信息'" :visible.sync="rVisible" center width="35%" @open="open" @close="close" :close-on-click-modal = false>
            <el-form :model="dataForm" label-width="auto">
                <el-form-item label="用户名:" prop="userName">
                    <el-input v-model="dataForm.userName" auto-complete="off" readonly></el-input>
                </el-form-item>
                <el-form-item label="姓名:" prop="realName">
                    <el-input v-model="dataForm.realName" auto-complete="off" readonly></el-input>
                </el-form-item>
                <el-form-item label="手机号码:" prop="mobilePhone">
                    <el-input v-model="dataForm.mobilePhone" auto-complete="off" readonly></el-input>
                </el-form-item>
                <el-form-item label="邮箱:" prop="email">
                    <el-input v-model="dataForm.email" auto-complete="off" readonly></el-input>
                </el-form-item>
            </el-form>
        </el-dialog>
    </div>
</template>

<script>
    /*eslint-disable*/
    import {SysRole} from '@/config/dictConfig'
    import SkSelect from '@/components/sys/common/form/SkSelect'
    import {KeyName} from '@/config/config'
    export default {
        name: "PersonInfoPsw",
        components:{
            SkSelect
        },
        props:{
            conf: {
                type: Object,
                required: true
            }
        },
        data(){
            return{
                dataForm: JSON.parse(localStorage.getItem(KeyName.USER))
            }
        },
        methods: {
            open(){
            },
            close(){
                this.$emit('close', false);
            },
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
    .PersonInfo {
    }
</style>