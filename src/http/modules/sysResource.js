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
// 查询系统资源树
export const querySysResourceTree = data => {
    return axios({
        url: 'sysResource/querySysResourceTree',
        method: 'post',
        data
    })
}
