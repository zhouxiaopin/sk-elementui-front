import Mock from 'mockjs'
import { baseUrl } from '@/config/config'
import * as login from './modules/login'
import * as sysUser from './modules/sysUser'

// 1. 开启/关闭[所有模块]拦截, 通过调[openMock参数]设置.
// 2. 开启/关闭[业务模块]拦截, 通过调用fnCreate方法[isOpen参数]设置.
// 3. 开启/关闭[业务模块中某个请求]拦截, 通过函数返回对象中的[isOpen属性]设置.
// let openMock = true
let openMock = false
fnCreate(login, openMock)
fnCreate(sysUser, openMock)


/**
 * 创建mock模拟数据
 * @param {*} mod 模块
 * @param {*} isOpen 是否开启?
 */
function fnCreate (mod, isOpen = true) {
  
  if (isOpen) {
    for (var key in mod) {
      ((res) => {
        if (res.isOpen !== false) {
          let url = baseUrl
          if(!url.endsWith("/")) {
            url = url + "/"
          }
          url = url + res.url

          Mock.mock(new RegExp(url), res.type, (opts) => {
            opts['data'] = opts.body ? JSON.parse(opts.body) : null
            delete opts.body
            window.console.log('\n')
            window.console.log('%cmock拦截, 请求: ', 'color:blue', opts)
            window.console.log('%cmock拦截, 响应: ', 'color:blue', res.data)
            return res.data
          })
        }
      })(mod[key]() || {})
    }
  }
}
