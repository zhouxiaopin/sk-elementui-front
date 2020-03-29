<template>
    <div class="BatchImport">
        <el-dialog :title="conf.title||'批量导入'" :visible.sync="rVisible" center width="50%" @open="open" @close="close" :close-on-click-modal = false>
            <el-row>
                <el-col v-if="progressPercent" :span="4">
                    <el-progress :stroke-width="5" :percentage="progressPercent" type="circle" :width="80" :status="progressStatus"></el-progress>
                </el-col>
                <el-col :span="20">
                    <el-upload
                            class="upload-demo"
                            ref="upload"
                            action=""
                            :on-preview="handlePreview"
                            :on-remove="handleRemove"
                            :file-list="fileList"
                            :http-request="onUploadHttpRequest"
                            multiple
                            name="file"
                            :limit="2"
                            :auto-upload="true">
                        <el-button slot="trigger" size="small" type="primary" icon="el-icon-folder-opened">选取文件</el-button>
                        <el-button style="margin-left: 10px;" size="small" type="success" @click.native="omSubmitUpload">上传到服务器</el-button>
                        <div slot="tip" class="el-upload__tip">只能上传xls/xlsx文件</div>
                    </el-upload>
                </el-col>

            </el-row>
            <el-row v-if="showTipRow">
                <p class="font-20">
                    总共有<b class="infColor"> {{totalNum}} </b>条，导入成功
                    <b class="sucColor"> {{sucNum}} </b>条，失败<b class="danColor"> {{failNum}} </b>条记录如下：
                </p>

                <el-table
                        v-if="this.failList"
                        :data="failList"
                        tooltip-effect="dark"
                        :border=true
                        header-row-class-name="tableHeader"
                        height="250"
                        class="wp-100">
                    <el-table-column
                            type="index"
                            label="编号"
                            header-align="center" align="center"
                            width="50">
                    </el-table-column>
                    <el-table-column
                            property="userName"
                            label="用户名"
                            header-align="center" align="center">
                    </el-table-column>
                    <el-table-column
                            property="failMsg"
                            header-align="center" align="center"
                            show-overflow-tooltip
                            class-name="danColor"
                            label="失败原因">
                    </el-table-column>
                </el-table>
            </el-row>
        </el-dialog>

    </div>
</template>

<script>
    /*eslint-disable*/
    import {SysPermisDict} from '@/config/dictConfig'
    export default {
        name: "BatchImport",
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
        data() {
            return {
                fileList: [],
                uploadList: [],
                failList:null,
                totalNum:0,
                sucNum:0,
                failNum:0,
                progressPercent:0,
                progressStatus:'success',
                showTipRow:false
            };
        },
        methods: {
            open(){
            },
            close(){
                // this.resetForm('form');
                this.fileList = [];
                this.uploadList = [];
                this.failList = null;

                this.totalNum = 0;
                this.sucNum = 0;
                this.failNum = 0;
                this.showTipRow = false;

                this.progressPercent = 0;

                this.refreshData();
                this.$emit('close', false);
            },
            onUploadHttpRequest(param){
                this.log.debug(param);
                this.uploadList.push(param.file);
            },
            omSubmitUpload() {
                this.requestBatchImport();
            },
            handleRemove(file, fileList) {
                console.log(file, fileList);
            },
            handlePreview(file) {
                console.log(file);
            },
            //上传进度条
            onUpldProg(progressEvent){
                // progressEvent.loaded:已上传文件大小
                // progressEvent.total:被上传文件的总大小
                this.progressPercent = Number((progressEvent.loaded / progressEvent.total * 100).toFixed(2))
            },
            //请求批量导入
            requestBatchImport() {
                if (this.uploadList&&this.uploadList.length<=0){
                    this.msg.tip('请先选择要上传的文件');
                    return
                }
                let data = new FormData();
                this.uploadList.forEach(item=>{
                    data.append('file',item);
                });
                this.$api.SysUser.batchImport(data,this.onUpldProg).then((res) => {
                    this.showTipRow = true;

                    this.log.debug(res.data);
                    if (res.code === 0) {
                        this.totalNum = res.data.totalNum;
                        this.sucNum = res.data.sucNum;
                        this.failNum = res.data.failNum;
                        this.failList = res.data.failList;
                        this.progressStatus = 'success';
                    }else{
                        this.progressStatus = 'warning';
                    }
                }).catch(()=>this.progressStatus = 'exception');
            },
        },
        computed:{
            rVisible: {
                get: function () {
                    return this.conf.visible
                },
                set: function () {
                    // this.$emit('setBatchImportVisible',v);
                }
            },

        }
    }
</script>

<style lang="scss" scoped>
    .BatchImport {

    }
</style>