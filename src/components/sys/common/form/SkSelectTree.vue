<!-- 树状选择器 -->
<template>
    <el-popover
            ref="popover"
            placement="bottom-start"
            trigger="click"
            :style="`min-width: ${treeWidth}`"
            @show="onShowPopover"
            @hide="onHidePopover">
        <el-tree
                ref="tree"
                class="select-tree"
                highlight-current
                :style="`min-width: ${treeWidth}`"
                :data="treeData"
                :props="props"
                :expand-on-click-node="false"
                default-expand-all
                show-checkbox
                :check-strictly="strictly"
                :node-key="props.value"
                :check-on-click-node=true
                @check-change="onCheckChange">
        </el-tree>
        <el-input
                slot="reference"
                ref="input"
                v-model="labelModel"
                :style="`width: ${width}px`"
                :class="{ 'rotate': showStatus }"
                suffix-icon="el-icon-arrow-down"
                :placeholder="placeholder">
        </el-input>
    </el-popover>
</template>

<script>
    /*eslint-disable*/
    import {listToTree} from '@/utils/tree'
    export default {
        name: 'SkSelectTree',
        props: {
            // 接收绑定参数
            value: String,
            // 输入框宽度
            width: String,
            // 输入框占位符
            placeholder: {
                type: String,
                required: false,
                default: '请选择',
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
                // 树状菜单显示状态
                showStatus: false,
                // 菜单宽度
                treeWidth: 'auto',
                // 实际请求传值
                valueModel: null,
                data:[],
                //树形结构
                treeData:[]
            };
        },
        created() {
            window.console.log("SkSelectTree created")
            if (this.scCode){
                this.requestQueryRealByScCode(this.scCode,data=>{
                    this.data = data;
                    let treeData = listToTree(this.props.value,this.props.parent,data);
                    this.treeData = treeData;
                });
            }else{
                this.msg.error(`${name}:配置出错`);
            }
            // 类型beforeMount 获取输入框宽度同步至树状菜单宽度
            this.$nextTick(() => {
                this.treeWidth = `${(this.width || this.$refs.input.$refs.input.clientWidth) - 24}px`;
            });
        },
        computed:{
            // checkedKeys:{
            //     get:function(){
            //         let ck = [];
            //         if (this.value){
            //             ck = this.value.split(',')
            //         }
            //         window.console.log(JSON.stringify(ck))
            //         return ck;
            //     },
            //     set:function(v){
            //     }
            // },
            labelModel:{
                get:function () {
                    return this.getLabelModel();
                },
                set:function(v){
                }
            }
        },
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
                    // this.$refs.tree.setCheckedKeys(ck);
                    // this.labelModel = this.getLabelModel();
                }
                this.$refs.tree.setCheckedKeys(ck);
                // window.console.log('newVal:%s,oldVal:%s',newVal,oldVal)
            }
        },
        methods: {
            //请求查询sql配置
            requestQueryRealByScCode(scCode,callback) {
                this.$api.SysSqlConf.queryRealByScCode(scCode).then((res) => {
                    if (res.code === 0) {
                        callback(res.data);
                    }
                });
            },
            // 树形check改变
            onCheckChange(data,check) {
                // debugger
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

                this.valueModel = valueModel;
                this.$emit('selected', this.valueModel);
            },
            // 显示时触发
            onShowPopover() {
                this.showStatus = true;
            },
            // 隐藏时触发
            onHidePopover() {
                this.showStatus = false;
            },
            //获取lable值
            getLabelModel(){
                try {
                    let ck = [];
                    let value = this.value;
                    if (value){
                        if (value.indexOf(',') != -1) {
                            ck = value.split(',')
                        }else{
                            ck.push(this.value);
                        }
                        let data = this.data;
                        let labelModel = '';
                        data.map(item => {
                            if (!labelModel&&ck.includes(item[this.props.value]+'')){
                                labelModel += item[this.props.label] ;
                            } else if (ck.includes(item[this.props.value]+'')) {
                                labelModel += ','+item[this.props.label] ;
                            }
                        });
                        return labelModel;
                    }
                   
                }catch (e) {
                    window.console.error(e)
                    return null;
                }
            },
        },
    };
</script>

<style>
    .el-input.el-input--suffix {
        cursor: pointer;
        overflow: hidden;
    }
    .el-input.el-input--suffix.rotate .el-input__suffix {
        transform: rotate(180deg);
    }
    .select-tree {
        max-height: 200px;
        overflow-y: scroll;
    }
    /* 菜单滚动条 */
    .select-tree::-webkit-scrollbar {
        z-index: 11;
        width: 6px;
    }
    .select-tree::-webkit-scrollbar-track,
    .select-tree::-webkit-scrollbar-corner {
        background: #fff;
    }
    .select-tree::-webkit-scrollbar-thumb {
        border-radius: 5px;
        width: 6px;
        background: #b4bccc;
    }
    .select-tree::-webkit-scrollbar-track-piece {
        background: #fff;
        width: 6px;
    }
</style>