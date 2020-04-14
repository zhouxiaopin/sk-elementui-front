<template>
  <div id="app">
<!--    <img alt="Vue logo" src="./assets/logo.png">-->
    <router-view/>
  </div>
</template>

<script>

export default {
  name: 'app',
    created () {
        // if (sessionStorage.getItem("store") ) {   //页面加载前读取sessionStorage里的状态信息
        //     this.$store.replaceState(Object.assign({}, this.$store.state,JSON.parse(sessionStorage.getItem("store"))))
        // }
        //
        // window.addEventListener("beforeunload",()=>{   //在页面刷新前将vuex里的信息保存到sessionStorage里
        //     sessionStorage.setItem("store",JSON.stringify(this.$store.state))
        // })
    }
}
</script>

<style lang="scss">
    /*<style lang="less">*/
    .minScrollbar::-webkit-scrollbar{
        width: 2px;
        height: 2px;
        /*background: rgba(00,00,00,0.8);*/
    }
    body::-webkit-scrollbar,.scrollbar::-webkit-scrollbar{
        width: 6px;
        height: 6px;
        /*background: rgba(00,00,00,0.8);*/
    }
    body::-webkit-scrollbar-track,.scrollbar::-webkit-scrollbar-track,.minScrollbar::-webkit-scrollbar-track{
        -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
        border-radius: 8px;
        /*background: rgba(00,00,00,0.8);*/
        background: rgba(255,255,255,0.9);
    }
    body::-webkit-scrollbar-thumb,.scrollbar::-webkit-scrollbar-thumb,.minScrollbar::-webkit-scrollbar-thumb{
        -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
        border-radius: 8px;
        background: #CDCDCD;
    } /* 滑块颜色 */

    /*颜色相关*/
    $themeColor: #19A97B;
    $SuccessColor: #67C23A;
    $WarningColor: #E6A23C;
    $DangerColor: #F56C6C;
    $InfoColor: #909399;



    body{
        margin: 0;
        padding: 0;
        color: rgba(0,0,0,.65);
        font-size: 14px;
        font-family: -apple-system,BlinkMacSystemFont,Segoe UI,PingFang SC,Hiragino Sans GB,Microsoft YaHei,Helvetica Neue,Helvetica,Arial,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol;
        font-variant: tabular-nums;
        line-height: 1.5;
        background-color: #fff;
        font-feature-settings: "tnum";

        #app {
            height: 100vh;
            overflow-y: hidden;
            /*  修改el-menu的默认样式*/
             .el-menu--collapse{
                >span{
                    >.el-menu-item,>.el-submenu{
                        span{visibility: hidden;}
                        >.el-submenu__title{span{visibility: hidden; }}
                    }
                }
            }
             .el-menu-item, .el-submenu__title{height: 40px;line-height:40px; }
            /*  修改tab的默认样式*/
             .el-tabs{height: 100%;display: flex; flex-direction: column;}
             .el-tabs__header {background-color: #FFFFFF;
                .el-tabs__nav {border: none;}
            }

             .el-tabs__item{color: rgba(0,0,0,.65);margin: 0 10px; border-left: none;
                &.is-active{color: $themeColor;border-bottom-color: $themeColor}
            }


             .loginForm .el-form-item__content{
                margin-left: 0 !important;
            }

             .el-tree-node.is-current>.el-tree-node__content {
                color: $themeColor;
            }
        }



        .blc{
            border-left: $themeColor solid 1px;
        }
        .font-white{color: #ffffff;}
        .mgl-10{margin-left: 10px;}
        .wp-100{width: 100%}
        .hp-100{height: 100%}
        .whp-100{width: 100%;height: 100%}
        .fr{float: right}


        /*字体大小*/
        .font-10{
            font-size: 10px;
        }
        .font-18{
            font-size: 18px;
        }
        .font-20{
            font-size: 20px;
        }
        /*字体颜色*/
        .sucColor{
            color: $SuccessColor;
        }
        .warColor{
            color: $WarningColor;
        }
        .danColor{
            color: $DangerColor;
        }
        .infColor{
            color: $InfoColor;
        }

        .tableHeader{
            color: #000000;
            /*background-color: $$SuccessColor !important;*/
            th{
                /*background-color: #AEDD81 !important;*/
                /*background-color: #84AF9B !important;*/
                background-color: #D0D0D0 !important;
                /*background-color: #C6E2FF !important;*/
            }
        }



        /*背景色*/
        .bgc-f0f2f5{
            background-color: #F0F2F5;
        }
        .bgc-ccc{
            background-color: #CCCCCC;
        }
        .bgc-fff{
            background-color: #ffffff;
        }
        /*.flex-1{*/
        /*    flex: 1;*/
        /*}*/
        .view-area{
            @extend .bgc-fff;
            border-radius: 5px;
            padding: 10px;
            margin: 15px 15px 0 15px;
            min-height: 600px;
        }

         .el-tabs__content{ @extend .bgc-f0f2f5;flex: 1;@extend .scrollbar;overflow-y: scroll;
            .el-tab-pane{
                @extend .bgc-f0f2f5;
            }
        }
        /*表格表头和内容文字居中*/
        /*.el-table td, .el-table th {*/
        /*    text-align: center;*/
        /*}*/
    }

</style>
