import axios from '../axios'
/*
* 系统用户模块
*/

// 分页查询
export const query = data => {
    return axios({
        url: 'sysUser/query',
        method: 'post',
        data
    })
}

// 登出
export const logout = () => {
    return axios({
        url: 'sysUser/logout',
        method: 'get'
    })
}