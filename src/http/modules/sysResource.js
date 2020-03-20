import axios from '../axios'
/*
* 系统资源模块
*/

// 查询系统目录
export const querySysMenu = data => {
    return axios({
        url: 'sysResource/querySysMenu',
        method: 'post',
        data
    })
}
// 查询系统资源(非分页)
export const queryAllByCondition = data => {
    return axios({
        url: 'sysResource/queryAllByCondition',
        method: 'post',
        data
    })
}

// 分页查询
export const query = data => {
    return axios({
        url: 'sysResource/query',
        method: 'post',
        data
    })
}
//添加
export const add = data => {
    return axios({
        url: 'sysResource/add',
        method: 'post',
        data
    })
};
//根据id获取记录
export const getEntity = data => {
    return axios({
        url: 'sysResource/getEntity',
        method: 'post',
        data
    })
};
//更新
export const update = data => {
    return axios({
        url: 'sysResource/update',
        method: 'post',
        data
    })
};
//删除
export const del = data => {
    return axios({
        url: 'sysResource/delete',
        method: 'post',
        data
    })
};
//硬删除
export const realDel = data => {
    return axios({
        url: 'sysResource/realDelete',
        method: 'post',
        data
    })
};
//更新记录状态
export const updateRecordStatus = data => {
    return axios({
        url: 'sysResource/updateRecordStatus',
        method: 'post',
        data
    })
};