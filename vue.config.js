module.exports = {
    //基本路径
    // baseUrl: './',//vue-cli3.3以下版本使用
    publicPath:'./',//vue-cli3.3+新版本使用
    //输出文件目录
    outputDir: 'dist',
    // eslint-loader 是否在保存的时候检查
    lintOnSave: true,
    //放置生成的静态资源 (js、css、img、fonts) 的 (相对于 outputDir 的) 目录。
    assetsDir: 'static',
    // 配置 webpack-dev-server 行为。
    devServer: {
        port: 8081,
    },
}
