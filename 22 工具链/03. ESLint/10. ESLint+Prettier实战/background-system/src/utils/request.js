import axios from 'axios';
import { MessageBox, Message } from 'element-ui';
import store from '@/store';
import router from '@/router';
import { getToken } from '@/utils/auth';

// create an axios instance
const service = axios.create({
  // baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 5000 // request timeout
})

// request interceptor
service.interceptors.request.use(
  (config) => {
    // do something before request is sent

    const token = localStorage.getItem('adminToken');
    if (token) {
      config.headers['Authorization'] = 'Bearer ' + token
    }
    return config
  },
  (error) => {
    // do something with request error
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
   */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  (response) => {
    if (response.headers.authentication) {
      // 响应头里面如果有这个字段，我们需要将这个字段存储到 localstorage，之后的请求都需要将这个 token 带到服务器
      // 这一步很重要，一定要将 token 存储到本地
      localStorage.adminToken = response.headers.authentication
    }
    const res = response.data
    if (res.code && res.code !== 0 && res.code === 401) {
      // 进入此 if，说明返回的响应 code 不为 0，是有问题的
      // 判断响应码是否为 401，如果是的话说明是 token 有问题（过期或者被篡改了，需要重新登录）
      // 如果是其他的响应码，也直接放行
      Message({
        message: res.msg || 'Error',
        type: 'warning',
        duration: 5 * 1000
      })
      store.dispatch('user/logout').then(() => {
        location.reload()
      });
      return Promise.reject(new Error(res.msg || 'Error'))
    } else {
      return res // 响应放行
    }

    // if the custom code is not 20000, it is judged as an error.
    // if (res.code !== 20000) {
    //   Message({
    //     message: res.message || 'Error',
    //     type: 'error',
    //     duration: 5 * 1000
    //   })

    //   // 50008: Illegal token; 50012: Other clients logged in; 50014: Token expired;
    //   if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
    //     // to re-login
    //     MessageBox.confirm('You have been logged out, you can cancel to stay on this page, or log in again', 'Confirm logout', {
    //       confirmButtonText: 'Re-Login',
    //       cancelButtonText: 'Cancel',
    //       type: 'warning'
    //     }).then(() => {
    //       store.dispatch('user/resetToken').then(() => {
    //         location.reload()
    //       })
    //     })
    //   }
    //   return Promise.reject(new Error(res.message || 'Error'))
    // } else {
    //   return res
    // }
  },
  (error) => {
    // 等待 5 秒后，如果服务器都没有返回数据
    // 那么说明服务器发生错误，给予客户端提示
    Message({
      message: '服务器超时',
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
