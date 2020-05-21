/**
 * Desc: Adapter requestAPI
 * Author: pengdaokuan
 * CreateTime: 2020-01-04
 * LastModify: 2020-01-04
 */
/**
 * 普通方法调用
 *  this.ctx.service.adapter.requestAPI(
 *     {
 *       url: 'https://github.com/PDKSophia',
 *       method: 'POST',
 *       data: data,
 *       header: {}
 *     }
 *  ).then(res => {
 *     console.log(data)
 * })
 */
const Service = require('beidou-core').Service;

module.exports = app => {
  class AdapterService extends Service {
    async requestAPI(params = {}) {
      try {
        // 注入token
        const xToken = this.ctx.cookies.get('x-token', {
          signed: false
        });
        if (xToken) {
          params.xAuthToken = xToken;
        }
        const result = await this.ctx.service.http.request(params);
        return result;
      } catch (err) {
        return { code: 500, msg: err.toString() };
      }
    }
  }

  return AdapterService;
};
