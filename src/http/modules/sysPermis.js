import axios from '../axios'
/*
* 系统权限模块
*/

// 查询系统权限(非分页)
export const queryAllByCondition = data => {
    return axios({
        url: 'sysPermis/queryAllByCondition',
        method: 'post',
        data
    })
}
// 查询系统资源树
export const querySysResourceTree = data => {
    return axios({
        url: 'sysPermis/querySysPermisTree',
        method: 'post',
        data
    })
}
