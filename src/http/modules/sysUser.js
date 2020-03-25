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


//添加
export const add = data => {
    return axios({
        url: 'sysUser/add',
        method: 'post',
        data
    })
};
//根据id获取记录
export const getEntity = data => {
    return axios({
        url: 'sysUser/getEntity',
        method: 'post',
        data
    })
};
//更新
export const update = data => {
    return axios({
        url: 'sysUser/update',
        method: 'post',
        data
    })
};
//修改密码
export const updatePassword = data => {
    return axios({
        url: 'sysUser/updatePassword',
        method: 'post',
        data
    })
};
//删除
export const del = data => {
    return axios({
        url: 'sysUser/delete',
        method: 'post',
        data
    })
};
//硬删除
export const realDel = data => {
    return axios({
        url: 'sysUser/realDelete',
        method: 'post',
        data
    })
};
//更新记录状态
export const updateRecordStatus = data => {
    return axios({
        url: 'sysUser/updateRecordStatus',
        method: 'post',
        data
    })
};
//下载导入模板
export const downImportTemp = () => {
    return axios({
        url: 'sysUser/downImportTemp',
        method: 'get',
        responseType:'blob'      //告诉服务器我们需要的响应格式
    })

};