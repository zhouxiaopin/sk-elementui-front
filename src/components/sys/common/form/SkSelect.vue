<template>
    <div class="SkSelect">
        <el-select v-model="rValue" filterable :placeholder="placeholder||'请选择'"
                   collapse-tags :multiple="multiple||false">
            <el-option
                    v-for="(item,index) in data"
                    :key="index"
                    :label="item[conf&&conf.label]||item.name"
                    :value="item[conf&&conf.value]||item.code">
            </el-option>
        </el-select>
    </div>
</template>

<script>
    /*eslint-disable*/
    export default {
        name: "SkSelect",
        props:{
            conf: {
                type: Object,
                required: false
            },
            placeholder: {
                type: String,
                required: false
            },
            //字典类型
            dictType: {
                type: String,
                required: false
            },
            //sql配置编码
            scCode: {
                type: String,
                required: false
            },
            multiple: {
                type: Boolean,
                required: false
            },
            value: {
                type: String
            }

        },
        // model: {
        //     prop: 'value',
        //     event: 'change'
        // },
        data(){
            return{
                data: [],
            }
        },
        created(){
            // debugger
            if (this.dictType){
                this.requestQueryByDictType(this.dictType,data=>{
                    this.data = data;
                });
            }else if (this.scCode){
                this.requestQueryRealByScCode(this.scCode,data=>{
                    this.data = data;
                });
            }else{
                this.msg.error(`${name}:配置出错`);
            }


        },
        methods: {
            //请求查询字典
            requestQueryByDictType(dictType,callback) {
                this.$api.SysDict.queryByDictType(dictType).then((res) => {
                    if (res.code === 0) {
                        callback(res.data);
                    }
                });
            },
            //请求查询sql配置
            requestQueryRealByScCode(scCode,callback) {
                this.$api.SysSqlConf.queryRealByScCode(scCode).then((res) => {
                    if (res.code === 0) {
                        callback(res.data);
                    }
                });
            },
        },
        computed:{
            rValue:{
                set:function (v){
                    window.console.log(v)
                    if (this.multiple){
                        v = v.join(',');
                    }
                    this.$emit('update:value',v);
                },
                get:function (){
                    let v = this.value;
                    if (this.multiple&&v){
                        // v = v||'';
                        v = v.split(',');
                        v = v.map(item => parseInt(item));
                    }
                    return v
                },
            }

        }
    }
</script>

<style lang="scss" scoped>
    .SkSelect {
        .el-select{
            width: 100%;
        }
    }
</style>