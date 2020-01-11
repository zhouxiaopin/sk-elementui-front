export const config = {
    // logLevel:-1,//生产环境
    logLevel:5,//开发环境


};
// 后台管理系统服务器地址
export const baseUrl = 'http://localhost:8081/sk/'
export const logLevelObj={
    debug: 1,
    info: 2,
    warn: 3,
    error: 4
};
export default {
    config,
    baseUrl,
    logLevelObj
};
