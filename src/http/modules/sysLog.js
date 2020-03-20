import axios from '../axios'
/*
* 系统日志模块
*/

// 分页查询
export const query = data => {
    return axios({
        url: 'sysLog/query',
        method: 'post',
        data
    })
};
//删除
export const del = data => {
    return axios({
        url: 'sysLog/delete',
        method: 'post',
        data
    })
};
//硬删除
export const realDel = data => {
    return axios({
        url: 'sysLog/realDelete',
        method: 'post',
        data
    })
};

