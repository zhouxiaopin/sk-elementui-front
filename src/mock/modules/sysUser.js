

// 登录接口
export function login() {
    const loginData = {
        "code": 0,
        "msg": '登录成功',
        "data": {
            "id": null,
            "userId": 1,
            "token": "77ae89be36504adfb5c09ef71409ea0e",
            "expireTime": "2018-09-01T16:24:50.473+0000",
            "createBy": null,
            "createTime": null,
            "lastUpdateBy": null,
            "lastUpdateTime": "2018-09-01T04:24:50.473+0000"
        }
    };
    return {
        url: 'sysUser/login',
        type: 'post',
        data: loginData
    }
}
// 登出接口
export function logout() {
    const logoutData = {
        "code": 0,
        "msg": '退出成功',
    }
    return {
        url: 'sysUser/logout',
        type: 'get',
        data: logoutData
    }
}
