<template>
    <el-radio-group class="SkRadio" v-model="rValue" @change="onChange">
        <el-radio v-for="(item,index) in data"
                  :key="index"
                  :label="item[conf&&conf.value]||item.code">
            {{item[conf&&conf.label]||item.name}}
        </el-radio>
    </el-radio-group>
</template>

<script>
    /*eslint-disable*/
    export default {
        name: "SkRadio",
        model: {
            prop: 'radioVal',
            event: 'changeVal'
        },
        props:{
            conf: {
                type: Object,
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
            //选中的值
            radioVal: String,
        },
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
            onChange(evt) {
                this.$emit('change',evt);
            },
        },
        computed:{
            rValue:{
                set:function (v){
                    this.$emit('changeVal',v);
                    window.console.log(v)
                },
                get:function (){
                    let v = this.radioVal;
                    if (!v&&this.data&&this.data[0]) {
                        v = this.data[0].code;
                    }
                    return v
                },
            }

        }
    }
</script>

<style lang="scss" scoped>
    .SkRadio {
    }
</style>