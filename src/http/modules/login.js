import axios from '../axios'
import { baseUrl } from '@/config/config'
/*
* 系统登录模块
*/

// 获取验证码
export const getVerifyCodeUrl = baseUrl+'sysUser/getVerifyCode';

// 登录
export const login = data => {
    return axios({
        url: 'sysUser/login',
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