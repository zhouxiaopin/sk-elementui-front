<template>
  <div id="app">
<!--    <img alt="Vue logo" src="./assets/logo.png">-->
    <router-view/>
  </div>
</template>

<script>

export default {
  name: 'app',
}
</script>

<style lang="scss">
/*<style lang="less">*/
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
            /*  修改el-menu的默认样式*/
            /deep/ .el-menu--collapse{
                >span{
                    >.el-menu-item,>.el-submenu{
                        span{visibility: hidden;}
                        >.el-submenu__title{span{visibility: hidden; }}
                    }
                }
            }
            /deep/ .el-menu-item, .el-submenu__title{height: 40px;line-height:40px; }
            /*  修改tab的默认样式*/
            /deep/ .el-tabs{height: 100%;display: flex; flex-direction: column;}
            /deep/ .el-tabs__header {background-color: #FFFFFF;
                .el-tabs__nav {border: none;}
            }

            /deep/ .el-tabs__item{color: rgba(0,0,0,.65);margin: 0 10px; border-left: none;
                &.is-active{color: #1890FF;border-bottom-color: #1890FF;}
            }
            /deep/ .el-tabs__content{ background-color: #FFFFFF; flex:1; margin: 0 15px;border-radius: 5px;
            }

            /deep/ .loginForm .el-form-item__content{
                margin-left: 0 !important;
            }
        }
        .font-white{color: #ffffff;}
        .mgl-10{margin-left: 10px;}
        .wp-100{width: 100%}
        .hp-100{height: 100%}
        .whp-100{width: 100%;height: 100%}
        .fr{float: right}

        .font-10{
            font-size: 10px;
        }
        .font-18{
            font-size: 18px;
        }
    }

</style>
