<template>
    <div class="SkNavTree">
        <el-tree
                ref="tree"
                :data="treeData"
                :expand-on-click-node="false"
                @node-click="onNodeClick"
                :default-expand-all="expandAll"
                :node-key="props.value"
                :style="`overflow-y: scroll;height: ${height}`"
                :props="props">
        </el-tree>
    </div>
</template>

<script>
    /*eslint-disable*/
    import {listToTree} from '@/utils/tree'
    export default {
        name: "SkNavTree",
        props: {
            // 输入框高度
            height: {
                type: String,
                required: false,
                default: 'auto',
            },
            //是否全部展开
            expandAll: {
                type: Boolean,
                required: false,
                default:false
            },
            //叶子节点是否可以点击
            childIsClick: {
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
        data() {
            return {
                data:[],
                //树形结构
                treeData:[]
            };
        },
        created() {
            // debugger
            this.refresh();
            // if (this.scCode){
            //     this.requestQueryRealByScCode(this.scCode,data=>{
            //         this.data = data;
            //         let treeData = listToTree(this.props.value,this.props.parent,data);
            //         this.treeData = treeData;
            //         if (this.treeData&&this.treeData[0]){
            //             this.$emit('requestQuery',this.treeData[0][this.props.value]);
            //         }
            //     });
            // }else{
            //     this.msg.error(`${name}:配置出错`);
            // }
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
            //获取当前选中的key
            getCurrentKey() {
                let ck = this.$refs.tree.getCurrentKey();
                return ck?ck:this.treeData[0][this.props.value];
            },
            onNodeClick(data){
                // this.log.debugJson('',data[this.props.value]);
                if (this.childIsClick) {
                    // this.requestQuery();
                    this.$emit('requestQuery',data[this.props.value])
                }else if (data.children){
                    this.$emit('requestQuery',data[this.props.value])
                    // this.requestQuery();
                }else{
                    this.msg.tip('父级才能点击');
                }
                // this.log.debugJson('',data);
                // this.log.debugJson('', Node);
            },
            //刷新数据
            refresh(){
                // debugger
                if (this.scCode){
                    this.requestQueryRealByScCode(this.scCode,data=>{
                        this.data = data;
                        let treeData = listToTree(this.props.value,this.props.parent,data);
                        this.treeData = treeData;
                        if (this.treeData&&this.treeData[0]){
                            this.$emit('requestQuery',this.treeData[0][this.props.value]);
                        }
                    });
                }else{
                    this.msg.error(`${name}:配置出错`);
                }
            },
        }
    }
</script>

<style lang="scss" scoped>
    .SkNavTree {
    }
</style>