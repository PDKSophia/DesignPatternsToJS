/**
 * Desc: requestAPI classes
 * Author: pengdaokuan
 * CreateTime: 2019-09-30
 * LastModify: 2019-09-30
 */
/**
 * 普通方法调用
 *  adapter.requestCallAPI(
 *     options: {
 *       url: 'https://www.pengdaokuan.cn',
 *       method: 'POST',
 *       data: data,
 *       header: {}
 *     },
 *     authorToken: true,
 *     csrfToken: true
 *  ).then(res => {
 *     console.log(data)
 * })
 */
/**
 * 通过redux / vuex dispatch发送调用方法
 * adapter.dispatchCallAPI({
 *     actionName: 'Example'
 *     params: {
 *         data: data
 *         // 类似这种要在url传值的/teaching/v1/textbooks/{uid}，在router里传参
 *         router: {
 *              uid: this.delId
 *          }
 *     },
 *     needAuthorToken: true,
 *     needCsrfToken: true
 * }).then(res => {
 *     console.log(data)
 * })
 */
/**
 * @param {String} actionName 请求的名称
 * @param {Object} options
 * @param {Boolean} needAuthorToken 是否需要token，默认不需要
 * @param {Boolean} needCsrfToken 是否需要csrfToken，默认不需要
 */
import axios from 'axios'
import Cookies from 'js-cookie'
import { handleUrl, handleHttpStatus, handleResultStatus } from './utils'
class Adapter {
  // 获取options
  getOptions = ({ options, needAuthorToken, needCsrfToken }) => {
    let { url, headers } = options
    url = handleUrl(url)
    if (needAuthorToken) {
      const authorToken = Cookies.get('x-auth-token') // 这个由你们定义
      headers['xauthtoken'] = authorToken
    }
    if (needCsrfToken) {
      const csrfToken = Cookies.get('csrfToken') // 这个由你们定义
      headers['x-csrf-token'] = csrfToken
    }
    return Object.assign(options, {
      url: url,
      method: options.method || 'GET',
      headers: headers
    })
  }
  // 普通请求方法
  dispatchCallAPI = ({ options, authorToken = false, csrfToken = false }) => {
    const options = this.getOptions({ options, authorToken, csrfToken })

    return axios(options)
      .then(handleHttpStatus)
      .then(handleResultStatus)
      .then(res => {
        /**
         * 如果返回的不是一个JSON对象，而是一个字符串，因此需要对这个字符串进行处理
         * 如果直接返回的是一个JSON对象，这个时候，JSON.parse会抛出异常，如果出现异常
         * 我们直接返回这个对象本身的值即可
         */
        try {
          return JSON.parse(res.data)
        } catch (err) {
          return res.data
        }
      })
      .catch(error => {
        console.log(error)
      })
  }
}

export default new Adapter()
