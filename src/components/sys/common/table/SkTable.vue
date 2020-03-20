<template>
    <div class="SkTable">
        <!--表格-->
        <el-table
                ref="multipleTable"
                v-loading="loading"
                highlight-current-row
                element-loading-text="拼命加载中"
                element-loading-spinner="el-icon-loading"
                element-loading-background="rgba(0, 0, 0, 0.6)"
                :data="data"
                tooltip-effect="dark"
                :border=true
                :stripe=true
                @selection-change="checkChange"
                class="wp-100">
            <el-table-column
                    type="selection" header-align="center" align="center"
                    :prop="idKey" min-width="55" >
            </el-table-column>
            <template v-for="(col,rowIndex) in columns">
                <el-table-column v-if="col.colType =='time'" :prop="col.prop" :label="col.label"
                                 :width="col.width" :min-width="col.minWidth" :fixed="col.fixed"
                                 :header-align="col.headerAg||'center'" :align="col.align||'center'"
                                 :key="col.prop" :type="col.type" :formatter="col.formatter||dateFormat"
                                 :show-overflow-tooltip="col.showOt">
                </el-table-column>
                <!--标签列-->
                <el-table-column v-else-if="col.colType =='label'" :prop="col.prop" :label="col.label"
                                 :width="col.width" :min-width="col.minWidth" :fixed="col.fixed"
                                 :header-align="col.headerAg||'center'" :align="col.align||'center'"
                                 :key="col.prop" :type="col.type" :formatter="col.formatter||dateFormat"
                                 :show-overflow-tooltip="col.showOt">
                    <template slot-scope="scope">
                        <el-tag v-if="scope.row[col.prop+'Str']"
                                :type="scope.row[col.prop+'Str'].split(DEFAULT_SPLIT_SYMBOL)[1]"
                                disable-transitions>{{scope.row[col.prop+'Str'].split(DEFAULT_SPLIT_SYMBOL)[0]}}</el-tag>
                    </template>
                </el-table-column>
                <!--操作列-->
                <el-table-column v-else-if="col.colType =='opt'" :prop="col.prop" :label="col.label"
                                 :width="col.width" :min-width="col.minWidth" :fixed="col.fixed"
                                 :header-align="col.headerAg||'center'" :align="col.align||'center'"
                                 :key="col.prop" :type="col.type" :formatter="col.formatter"
                                 :show-overflow-tooltip="col.showOt">
                    <template slot-scope="scope">
                        <!--                    <el-button size="mini" :type="scope.row.recordStatus=='01'?'info':'primary'" :icon="scope.row.recordStatus=='01'?'el-icon-close':'el-icon-check'"-->
                        <!--                               :title="scope.row.recordStatus=='01'?'禁用':'启用'" circle-->
                        <!--                               @click="updateRecordStatus(scope.row)"></el-button>-->
                        <!--                    <el-button size="mini" type="success" icon="el-icon-edit-outline" title="修改" circle-->
                        <!--                               @click="updateHandler(scope.row)"></el-button>-->
                        <!--                    <el-button size="mini" type="warning" icon="el-icon-delete" title="删除" circle-->
                        <!--                               @click="delHandler(scope.row)"></el-button>-->
                        <!--                    <el-button size="mini" type="danger" icon="el-icon-delete" title="硬删除" circle-->
                        <!--                               @click="realDelHandler(scope.row)"></el-button>-->
                        <template v-for="(btn,colIndex) in col.btns">
                            <sk-link v-if="btn.optType == 'rs'" :class="linkClass?linkClass:'font-20'" :type="scope.row.recordStatus=='01'?'info':'primary'"
                                     :icon="scope.row.recordStatus=='01'?'close':'check'"
                                     :title="scope.row.recordStatus=='01'?'禁用':'启用'" :permis="btn.permis"
                                     @click="commanHandler(btn.handlerName,scope.row)" :key="rowIndex+'-'+colIndex">
                                {{btn.text}}
                            </sk-link>
                            <sk-link v-else class="linkClass?linkClass:'font-20'" :type="btn.type" :icon="btn.icon" :title="btn.title" :permis="btn.permis"
                                     @click="btn.clickHand?btn.clickHand(scope.row):commanHandler(btn.handlerName,scope.row)" :key="rowIndex+'-'+colIndex">
                                {{btn.text}}
                            </sk-link>
                        </template>
<!--                        <el-link class="font-20" :type="scope.row.recordStatus=='01'?'info':'primary'" :icon="scope.row.recordStatus=='01'?'el-icon-close':'el-icon-check'"-->
<!--                                 :title="scope.row.recordStatus=='01'?'禁用':'启用'"-->
<!--                                 @click="updateRecordStatus(scope.row)"></el-link>-->
<!--                        <el-link class="font-20" type="success" icon="el-icon-edit-outline" title="修改"-->
<!--                                 @click="updateHandler(scope.row)"></el-link>-->
<!--                        <el-link class="font-20" type="warning" icon="el-icon-delete" title="删除"-->
<!--                                 @click="delHandler(scope.row)"></el-link>-->
<!--                        <el-link class="font-20" type="danger" icon="el-icon-delete" title="硬删除"-->
<!--                                 @click="realDelHandler(scope.row)"></el-link>-->
                    </template>
                </el-table-column>
<!--                <sk-time-column prop="createTime"-->
<!--                                label="创建时间">-->
<!--                </sk-time-column>-->
                <!--普通列-->
                <el-table-column v-else :prop="col.prop" :label="col.label"
                                 :width="col.width" :min-width="col.minWidth" :fixed="col.fixed"
                                 :header-align="col.headerAg||'center'" :align="col.align||'center'"
                                 :key="col.prop" :type="col.type" :formatter="col.formatter"
                                 :show-overflow-tooltip="col.showOt">
                </el-table-column>
            </template>
          <!--  <el-table-column
                    fixed="right"
                    label="操作"
                    width="120">
                <template slot-scope="scope">
                    &lt;!&ndash;                    <el-button size="mini" :type="scope.row.recordStatus=='01'?'info':'primary'" :icon="scope.row.recordStatus=='01'?'el-icon-close':'el-icon-check'"&ndash;&gt;
                    &lt;!&ndash;                               :title="scope.row.recordStatus=='01'?'禁用':'启用'" circle&ndash;&gt;
                    &lt;!&ndash;                               @click="updateRecordStatus(scope.row)"></el-button>&ndash;&gt;
                    &lt;!&ndash;                    <el-button size="mini" type="success" icon="el-icon-edit-outline" title="修改" circle&ndash;&gt;
                    &lt;!&ndash;                               @click="updateHandler(scope.row)"></el-button>&ndash;&gt;
                    &lt;!&ndash;                    <el-button size="mini" type="warning" icon="el-icon-delete" title="删除" circle&ndash;&gt;
                    &lt;!&ndash;                               @click="delHandler(scope.row)"></el-button>&ndash;&gt;
                    &lt;!&ndash;                    <el-button size="mini" type="danger" icon="el-icon-delete" title="硬删除" circle&ndash;&gt;
                    &lt;!&ndash;                               @click="realDelHandler(scope.row)"></el-button>&ndash;&gt;
                    <el-link class="font-20" :type="scope.row.recordStatus=='01'?'info':'primary'" :icon="scope.row.recordStatus=='01'?'el-icon-close':'el-icon-check'"
                             :title="scope.row.recordStatus=='01'?'禁用':'启用'"
                             @click="updateRecordStatus(scope.row)"></el-link>
                    <el-link class="font-20" type="success" icon="el-icon-edit-outline" title="修改"
                             @click="updateHandler(scope.row)"></el-link>
                    <el-link class="font-20" type="warning" icon="el-icon-delete" title="删除"
                             @click="delHandler(scope.row)"></el-link>
                    <el-link class="font-20" type="danger" icon="el-icon-delete" title="硬删除"
                             @click="realDelHandler(scope.row)"></el-link>
                </template>
            </el-table-column>-->
        </el-table>
        <!--分页-->
        <sk-page :queryCondition="queryCondition" :pageInfo="pageInfo" :refreshData="refreshData"/>
    </div>
</template>

<script>
    /*eslint-disable*/
    import {dateFormat} from '@/utils/date'
    import SkPage from '../SkPage'
    import {DEFAULT_SPLIT_SYMBOL,RecordStatus} from '@/config/config'
    const EVT_NAME_RELOADDATA = "reloadData";
    export default {
        name: "SkTable",
        components:{
            SkPage,
        },
        props:{
            loading:{
                type:Boolean,
                required:false,
                default:false
            },
            data:{
                type:Array,
                required:false,
                default:()=>[]
            },
            columns:{
                type:Array,
                required:false,
                default:()=>[]
            },
            idKey:{
                type:String,
            },
            linkClass:String,
            //api的模块名
            apiModelName:String,
            // //列类型
            // colType:{
            //     type:String,
            //     required:true,
            // },

            /*分页相关*/
            pageInfo: {
                type: Object,
                required: true
            },
            queryCondition: {
                type: Object,
                required: true
            },
        },
        data(){
            return{
                DEFAULT_SPLIT_SYMBOL:DEFAULT_SPLIT_SYMBOL,
            }
        },
        methods: {
            checkChange(data){
                // debugger
                this.$emit('checkChange',data);
            },
            //
            commanHandler(handlerName,row){
                // debugger
               // if ('upt' == handlerName){
                   // this.updateHandler(row)
               // }else
                if ('del' == handlerName){
                   this.delHandler(row)
               }else if ('realDel' == handlerName){
                   this.realDelHandler(row)
               }else if ('uptRs' == handlerName){
                   this.updateRecordStatus(row)
               }
            },
            //刷新数据
            refreshData(queryCondition){
                this.queryCondition = queryCondition;
                this.$emit(EVT_NAME_RELOADDATA,null);
            },
            // //修改
            // updateHandler(row){
            //     this.uptConf.visible = true;
            //     this.uptConf.checkedData = row;
            // },
            //删除
            delHandler(row){
                this.$confirm('确定删除?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {

                    this.requestDel([row[this.idKey]]);
                }).catch(() => {
                    this.msg.tip('已取消删除');
                });
            },
            //硬删除
            realDelHandler(row){
                this.$confirm('这个操作很危险，确定要硬删除吗?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    // this.requestDel(row);
                    this.requestRealDel([row[this.idKey]]);
                }).catch(() => {
                    this.msg.tip('已取消硬删除');
                });
            },
            //修改记录状态
            updateRecordStatus(row){
                let tip;
                let param = {};
                param[this.idKey] = row[this.idKey];
                param['dictType'] = row['dictType'];
                if (row.recordStatus === RecordStatus.ABLE) {
                    tip = '确定要禁用吗？';
                    param.recordStatus = RecordStatus.DISABLE;
                }else if (row.recordStatus === RecordStatus.DISABLE) {
                    tip = '确定要启用吗？';
                    param.recordStatus = RecordStatus.ABLE;
                }
                this.$confirm(tip, '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'info'
                }).then(() => {
                    this.requestUpdateRecordStatus(param);
                }).catch(() => {
                    this.msg.tip('已取消操作');
                });
            },
            //时间格式化
            dateFormat(row, column) {
                let date = row[column.property];
                return dateFormat(date, this.format);

            },

            //请求删除
            requestDel(ids) {
                let param = {ids:ids};
                this.$api[this.apiModelName].del(param).then((res) => {
                    if (res.code === 0) {
                        this.msg.success(res.msg);
                        this.$emit(EVT_NAME_RELOADDATA,null);
                        // this.requestQuery();
                    }
                });
            },
            //请求硬删除
            requestRealDel(ids) {
                let param = {ids:ids};
                this.$api[this.apiModelName].realDel(param).then((res) => {
                    if (res.code === 0) {
                        this.msg.success(res.msg);
                        this.$emit(EVT_NAME_RELOADDATA,null);
                        // this.requestQuery();
                    }
                });
            },
            //请求更新记录状态
            requestUpdateRecordStatus(param) {
                this.$api[this.apiModelName].updateRecordStatus(param).then((res) => {
                    if (res.code === 0) {
                        this.msg.success(res.msg);
                        this.$emit(EVT_NAME_RELOADDATA,null);
                        // this.requestQuery();
                    }
                });
            }
        }
    }
</script>

<style lang="scss" scoped>
    .SkTable {
    }
</style>