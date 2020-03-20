<template>
    <div class="SkMenuTree">
        <el-row v-if="lable"><span v-if="required" class="red">* </span><span v-text="lable"></span></el-row>
        <el-row>
            <el-tree
                    ref="tree"
                    highlight-current
                    :data="treeData"
                    :props="props"
                    :expand-on-click-node="false"
                    default-expand-all
                    show-checkbox
                    :check-strictly="strictly"
                    :node-key="props.value"
                    :style="`overflow-y: scroll;max-height: ${height}`"
                    :check-on-click-node=true
                    @check-change="onCheckChange">
            </el-tree>
        </el-row>
    </div>
</template>

<script>
    /*eslint-disable*/
    import {listToTree} from '@/utils/tree'
    export default {
        name: "SkMenuTree",
        props: {
            // 接收绑定参数
            value: String,
            // 输入框宽度
            height: {
                type: String,
                required: false,
                default: 'auto',
            },
            lable: {
                type: String,
                required: false
            },
            // 是否单选
            radio: {
                type: Boolean,
                required: false,
                default: false,
            },
            //父子是否关联
            strictly: {
                type: Boolean,
                required: false,
                default: true,
            },
            required: {
                type: Boolean,
                required: false,
                default:false
            },
            // 树节点配置选项
            props: {
                type: Object,
                required: false,
                default: () => ({
                    parent: 'pId',
                    value: 'id',
                    label: 'name',
                    children: 'children',
                }),
            },
            //sql配置编码
            scCode: {
                type: String,
                required: false
            },
        },
        // 设置绑定参数
        model: {
            prop: 'value',
            event: 'selected',
        },
        data() {
            return {
                // 实际请求传值
                valueModel: null,
                data:[],
                //树形结构
                treeData:[]
            };
        },
        created() {
            // debugger
            if (this.scCode){
                this.requestQueryRealByScCode(this.scCode,data=>{
                    this.data = data;
                    let treeData = listToTree(this.props.value,this.props.parent,data);
                    this.treeData = treeData;
                });
            }else{
                this.msg.error(`${name}:配置出错`);
            }
        },
        // computed:{
        //     checkedKeys:{
        //         get:function(){
        //             // debugger
        //             let ck = [];
        //             if (this.value){
        //                 ck = this.value.split(',')
        //             }
        //             return ck;
        //         },
        //         set:function(v){
        //         }
        //     }
        // },
        watch:{
           value(newVal,oldVal){
               //解决重置不了的问题
               let ck = [];
               if (newVal){
                   if (newVal.indexOf(',') != -1) {
                       ck = newVal.split(',')
                   }else{
                       ck.push(this.value);
                   }
               }
               this.$refs.tree.setCheckedKeys(ck);
               // window.console.log('ck:%s',ck)
               // window.console.log('newVal:%s,oldVal:%s',newVal,oldVal)
           }
        },
        methods: {
            //请求查询sql配置
            requestQueryRealByScCode(scCode, callback) {
                this.$api.SysSqlConf.queryRealByScCode(scCode).then((res) => {
                    if (res.code === 0) {
                        callback(res.data);
                    }
                });
            },
            // check改变
            onCheckChange(data,check) {
                // if (!check){
                //     return;
                // }
            // onCheckChange() {
                let valueModel = '';
                if (this.radio){//单选
                    if (!check){
                        return;
                    }
                    this.$refs.tree.setCheckedKeys([data[this.props.value]]);
                    valueModel += data[this.props.value];
                } else {//多选
                    let nodes = this.$refs.tree.getCheckedNodes();
                    // let labelModel = '';
                    // let valueModel = '';

                    nodes.map((item,index) => {
                        if (index === 0){
                            valueModel += item[this.props.value] ;
                        } else{
                            valueModel += ','+item[this.props.value] ;
                        }
                    });
                }

                // let nodes = this.$refs.tree.getCheckedNodes();
                // let valueModel = '';

                // nodes.map((item, index) => {
                //     if (index === 0) {
                //         valueModel += item[this.props.value];
                //     } else {
                //         valueModel += ',' + item[this.props.value];
                //     }
                // });
                this.valueModel = valueModel;
                // window.console.log('valueModel:%s',valueModel)
                this.$emit('selected', valueModel);
            }
        }
    }
</script>

<style lang="scss" scoped>
    .SkMenuTree {
        .red{
            color: #ff0000;
        }
    }
</style>