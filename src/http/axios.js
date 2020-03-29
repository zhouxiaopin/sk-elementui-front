/*eslint-disable*/
import axios from 'axios';
import config from './config';
import Cookies from "js-cookie";
import router from '@/router'
import log from '@/utils/log'
import * as Msg from '@/utils/msg'

// 使用vuex做全局loading时使用
// import store from '@/store'

export default function $axios(options) {
  return new Promise((resolve, reject) => {
    const instance = axios.create({
      baseURL: config.baseUrl,
      headers: config.headers,
      timeout: config.timeout,
      withCredentials: config.withCredentials
    })

    // request 拦截器
    instance.interceptors.request.use(
      config => {
        let token = Cookies.get('X-Access-Token')
        // 1. 请求开始的时候可以结合 vuex 开启全屏 loading 动画
        // console.log(store.state.loading)
        // console.log('准备发送请求...')
        // 2. 带上token
        if (token) {
          config.headers['X-Access-Token'] = token
        } else {
          // 重定向到登录页面
          router.push('/login').catch(err => {err})
        }
        // 3. 根据请求方法，序列化传来的参数，根据后端需求是否序列化
        if (config.method === 'post') {
          // if (config.data.__proto__ === FormData.prototype
          //   || config.url.endsWith('path')
          //   || config.url.endsWith('mark')
          //   || config.url.endsWith('patchs')
          // ) {

          // } else {
          // config.data = qs.stringify(config.data)
          // }
        }
        log.infoJson('请求参数：',config.data);
        return config
      },

      error => {
        // 请求错误时
        window.console.log('request:', error)
        // 1. 判断请求超时
        if (error.code === 'ECONNABORTED' && error.message.indexOf('timeout') !== -1) {
          window.console.log('timeout请求超时')
          // return service.request(originalRequest);// 再重复请求一次
        }
        // 2. 需要重定向到错误页面
        const errorInfo = error.response
        window.console.log(errorInfo)
        if (errorInfo) {
          error = errorInfo.data  // 页面那边catch的时候就能拿到详细的错误信息,看最下边的Promise.reject
          const errorStatus = errorInfo.status; // 404 403 500 ...
          router.push({
            path: `/error/${errorStatus}`
          })
        }
        return Promise.reject(error) // 在调用的那边可以拿到(catch)你想返回的错误信息
      }
    )

    // response 拦截器
    instance.interceptors.response.use(
      response => {
        // debugger
        let data;
        // IE9时response.data是undefined，因此需要使用response.request.responseText(Stringify后的字符串)
        if (response.data == undefined) {
          data = JSON.parse(response.request.responseText)
        } else {
          data = response.data
        }
        if (response.data&&data.code == undefined){
          // debugger
          data = {};
          data['code'] = 0;
          let subData = {};
          subData['blob'] = response.data;
          let fileName = decodeURIComponent(response.headers['filename']);
          // let fileName = contentDisposition.substring(contentDisposition.indexOf('=')+1);
          subData['fileName'] = fileName;

          data['data'] = subData;
        }

        // 根据返回的code值来做不同的处理
        let minute = 60*30;
        switch (data.code) {
          // case 1:
          //   window.console.log(data.msg)
          //   break;
          case 0:
            //更新token过期时间
            // let seconds = 10;
            Cookies.set('X-Access-Token', Cookies.get('X-Access-Token'), { expires: new Date(new Date() * 1 + minute * 1000) });// 放置token到Cookie
            // this.$store.commit('changeState')
            break;
          case -14://token失效
            Cookies.remove('X-Access-Token');//从Cookie移除token
            // sessionStorage.removeItem('user')//从本地会话移除用户
            // 重定向到登录页面
            router.push('/login').catch(err => {err})
            break;
          // console.log('登录成功')
        }
        if (data.code !== 0) {
          window.console.log(data.msg);
          Msg.error(data.msg);
        }
        // 若不是正确的返回code，且已经登录，就抛出错误
        // const err = new Error(data.desc)
        // err.data = data
        // err.response = response
        // throw err
        // log.infoJson(`${response.config.url}请求返回数据：`,data);
        return data
      },
      err => {
        if (err && err.response) {
          switch (err.response.status) {
            case 400:
              err.message = '请求错误'
              break
            case 401:
              err.message = '未授权，请登录'
              break
            case 403:
              err.message = '拒绝访问'
              break
            case 404:
              err.message = `请求地址出错: ${err.response.config.url}`
              break
            case 408:
              err.message = '请求超时'
              break
            case 500:
              err.message = '服务器内部错误'
              break
            case 501:
              err.message = '服务未实现'
              break
            case 502:
              err.message = '网关错误'
              break
            case 503:
              err.message = '服务不可用'
              break
            case 504:
              err.message = '网关超时'
              break
            case 505:
              err.message = 'HTTP版本不受支持'
              break
            default:
          }
        }
        window.console.error(err)
        return Promise.reject(err) // 返回接口返回的错误信息
      }
    )

    if(options.headers){
      instance.headers = options.headers;
    }

    // 请求处理
    instance(options).then(res => {
      resolve(res)
      return false
    }).catch(error => {
      Msg.error(error);
      reject(error)
    })

  })
}
