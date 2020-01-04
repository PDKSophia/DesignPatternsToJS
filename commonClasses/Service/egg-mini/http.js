/**
 * @Desc 请求文件
 * @Author pengdaokuan
 * @CreateTime 2020-01-04
 * @LastModify 2020-01-04
 */
const Service = require('beidou-core').Service;
const _ = require('lodash');
const deepExtend = require('deep-extend');
const Constants = require('./constants');

module.exports = app => {
  class HttpService extends Service {
    constructor(ctx) {
      super(ctx);
      this.baseUrl = Constants.BASE_URL_V2;
      this.defaultOptions = { ...Constants.DEFAULT_OPTIONS };
      this.errorHandler = this.errorHandler.bind(this);
    }

    // 错误处理
    errorHandler(status) {
      const err = { code: status, msg: Constants.HTTP_CODE_MESSAGE[status] };
      return err;
    }

    async request(params) {
      const serverUrl = Constants.SERVER_URL;
      let requestConfig = {};
      // 组合请求的API地址
      requestConfig.url = `${serverUrl}/${this.baseUrl}` + params.url;

      // 合并请求方式
      requestConfig.method = params.method || 'GET';

      // 设置 jsonBody
      if (_.isNull(params.jsonBody) || _.isUndefined(params.jsonBody)) {
        requestConfig.jsonBody = true;
      }

      // 设置options
      requestConfig.options = deepExtend(
        _.cloneDeep(this.defaultOptions),
        params.options
      );

      // 设置 x-auth-token
      if (params.xAuthToken) {
        requestConfig.options.headers['x-auth-token'] = params.xAuthToken;
      }

      // API错误处理
      let errorHandler = this.errorHandler;
      if (_.isFunction(requestConfig.errorHandler)) {
        errorHandler = requestConfig.errorHandler;
      }

      // API数据返回处理
      let responseHandler = message => message;
      if (_.isFunction(requestConfig.responseHandler)) {
        responseHandler = requestConfig.responseHandler;
      }

      try {
        const response = await this.app.curl(
          requestConfig.url,
          requestConfig.options
        );
        // 检查状态码
        if (response.status !== 200) {
          return errorHandler.call(this, response.status);
        }

        // 返回数据
        return responseHandler.call(this, response.data);
      } catch (err) {
        return errorHandler.call(this, 500);
      }
    }
  }
  return HttpService;
};
