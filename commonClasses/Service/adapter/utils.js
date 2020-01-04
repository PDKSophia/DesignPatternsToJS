/**
 * Desc: utils function
 * Author: pengdaokuan
 * CreateTime: 2019-09-30
 * LastModify: 2019-09-30
 */
import { codeMessage, backendCodeMessage } from './code'
const baseUrl = 'http://www.pengdaokuan.cn'

/**
 * 判断url是否http/https开头
 * @param {String} url 
 */
function isUrl(url) {
  let patt = '/^(https?|ftp|file):\/\/.+$/'
  return patt.test(url)
}

/**
 * 处理URL的方法
 * url 可能为: '/v1/api/backend/retriveList'
 * url 也可能为: 'https://github.com'
 * @param {String} url
 * @param {String} type api: 前缀为接口;
 */
export function handleUrl(url) {
  if (isUrl(url)) return url
  if (url == undefined) return ''
  switch (type) {
    case 'api':
      return baseUrl + url
    default:
      return url
  }
}

/**
 * 检查http错误
 * 符合条件，返回response.data
 * @param {Object} response
 * @return {Object} response.data
 */
export function handleHttpStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response.data
  }
  const errortext = codeMessage[response.status] || response.statusText
  // 弹窗通知报错
  const error = new Error(errortext)
  error.name = response.status
  error.response = response
  throw error
}

/**
 * 检查与后端定义的返回code
 * 符合条件，返回 data
 * backend response: {
 *   code: 0,
 *   msg: '',
 *   data: {}
 * }
 * @param {Object} result
 */
export function handleResultStatus(result) {
  if (result.code === backendCodeMessage.REQEUEST_SUCCESS) {
    return result.data
  } else {
    const err = new Error(result.msg)
    err.response = result
    err.code = result.code
    throw err
  }
}
