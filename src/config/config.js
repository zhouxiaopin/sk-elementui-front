export const config = {
    // logLevel:-1,//生产环境
    logLevel:5,//开发环境


};
export const KeyName = {
    //用户信息
    USER:'sysUser',
    TOKEN:'X-Access-Token',

};
// 后台管理系统服务器地址
export const baseUrl = 'http://localhost:8083/sk/'
export const logLevelObj={
    debug: 1,
    info: 2,
    warn: 3,
    error: 4
};
export const dateObj={
    defaulDateFormat: 'YYYY-MM-DD HH:mm:ss',
};
export const DEFAULT_SPLIT_SYMBOL=';';

export const RecordStatus={
    DELETE : "00",//记录删除
    ABLE : "01",//记录可用
    DISABLE : "02",//记录禁用
}



// export default {
//     config,
//     baseUrl,
//     logLevelObj,
//     dateObj
// };
