import axios from '../axios'
/*
* 系统sql语句配置模块
*/

// 分页查询
export const query = data => {
    return axios({
        url: 'sysSqlConf/query',
        method: 'post',
        data
    })
};
export const queryRealByScCode = scCode => {
    return axios({
        url: 'sysSqlConf/queryRealByScCode',
        method: 'post',
        data:{
            scCode
        }
    })
};
//添加
export const add = data => {
    return axios({
        url: 'sysSqlConf/add',
        method: 'post',
        data
    })
};
//根据id获取记录
export const getEntity = data => {
    return axios({
        url: 'sysSqlConf/getEntity',
        method: 'post',
        data
    })
};
//更新
export const update = data => {
    return axios({
        url: 'sysSqlConf/update',
        method: 'post',
        data
    })
};
//删除
export const del = data => {
    return axios({
        url: 'sysSqlConf/delete',
        method: 'post',
        data
    })
};
//硬删除
export const realDel = data => {
    return axios({
        url: 'sysSqlConf/realDelete',
        method: 'post',
        data
    })
};
//更新记录状态
export const updateRecordStatus = data => {
    return axios({
        url: 'sysSqlConf/updateRecordStatus',
        method: 'post',
        data
    })
};