/**
 * Desc: http code / backend data code
 * Author: pengdaokuan
 * CreateTime: 2019-09-30
 * LastModify: 2019-09-30
 */
// http请求状态码code
export const codeMessage = {
  400: '请求错误',
  401: '用户没有权限(令牌、用户名、密码错误)',
  403: '禁止访问',
  404: 'Not Found',
  406: '请求格式错误',
  410: '资源已被永久删除',
  500: '服务器异常',
  502: '网关异常',
  503: '服务不可用',
  504: '网关超时'
}

// 接口请求后端返回的code
export const backendCodeMessage = {
  REQEUEST_SUCCESS: 0,
  REQEUEST_ERROE: -1
}
