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
};
