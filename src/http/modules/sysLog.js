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
