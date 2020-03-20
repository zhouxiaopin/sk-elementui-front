import axios from '../axios'
/*
* 系统角色模块
*/


// 分页查询
export const query = data => {
    return axios({
        url: 'sysRole/query',
        method: 'post',
        data
    })
}
//添加
export const add = data => {
    return axios({
        url: 'sysRole/add',
        method: 'post',
        data
    })
};
//根据id获取记录
export const getEntity = data => {
    return axios({
        url: 'sysRole/getEntity',
        method: 'post',
        data
    })
};
//更新
export const update = data => {
    return axios({
        url: 'sysRole/update',
        method: 'post',
        data
    })
};
//删除
export const del = data => {
    return axios({
        url: 'sysRole/delete',
        method: 'post',
        data
    })
};
//硬删除
export const realDel = data => {
    return axios({
        url: 'sysRole/realDelete',
        method: 'post',
        data
    })
};
//更新记录状态
export const updateRecordStatus = data => {
    return axios({
        url: 'sysRole/updateRecordStatus',
        method: 'post',
        data
    })
};

