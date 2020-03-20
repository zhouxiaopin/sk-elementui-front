import axios from '../axios'
/*
* 系统字典模块
*/

export const queryByDictType = dictType => {
    return axios({
        url: 'sysDict/querySelectBoxVoByDictType',
        method: 'post',
        data:{
            dictType
        }
    })
};

// 分页查询
export const query = data => {
    return axios({
        url: 'sysDict/query',
        method: 'post',
        data
    })
};
//添加
export const add = data => {
    return axios({
        url: 'sysDict/add',
        method: 'post',
        data
    })
};
//根据id获取记录
export const getEntity = data => {
    return axios({
        url: 'sysDict/getEntity',
        method: 'post',
        data
    })
};
//更新
export const update = data => {
    return axios({
        url: 'sysDict/update',
        method: 'post',
        data
    })
};
//删除
export const del = data => {
    return axios({
        url: 'sysDict/delete',
        method: 'post',
        data
    })
};
//硬删除
export const realDel = data => {
    return axios({
        url: 'sysDict/realDelete',
        method: 'post',
        data
    })
};
//更新记录状态
export const updateRecordStatus = data => {
    return axios({
        url: 'sysDict/updateRecordStatus',
        method: 'post',
        data
    })
};

