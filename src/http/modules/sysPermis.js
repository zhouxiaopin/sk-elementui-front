import axios from '../axios'
/*
* 系统权限模块
*/

// 获取权限
export const getPermis = data => {
    return axios({
        url: 'sysPermis/getPermis',
        method: 'post',
        data
    })
};
// 查询(非分页)
export const queryAllByCondition = data => {
    return axios({
        url: 'sysPermis/queryAllByCondition',
        method: 'post',
        data
    })
}

// 分页查询
export const query = data => {
    return axios({
        url: 'sysPermis/query',
        method: 'post',
        data
    })
}
//添加
export const add = data => {
    return axios({
        url: 'sysPermis/add',
        method: 'post',
        data
    })
};
//根据id获取记录
export const getEntity = data => {
    return axios({
        url: 'sysPermis/getEntity',
        method: 'post',
        data
    })
};
//更新
export const update = data => {
    return axios({
        url: 'sysPermis/update',
        method: 'post',
        data
    })
};
//删除
export const del = data => {
    return axios({
        url: 'sysPermis/delete',
        method: 'post',
        data
    })
};
//硬删除
export const realDel = data => {
    return axios({
        url: 'sysPermis/realDelete',
        method: 'post',
        data
    })
};
//更新记录状态
export const updateRecordStatus = data => {
    return axios({
        url: 'sysPermis/updateRecordStatus',
        method: 'post',
        data
    })
};
