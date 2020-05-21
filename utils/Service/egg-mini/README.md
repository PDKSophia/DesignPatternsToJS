# Egg 层的 Service 简单封装

主要是基于 `beidou` 进行的 Node 层请求转发封装，`beidou` 不会没关系，Egg 不会没关系，看得懂代码就好了，只是一个简单封装，大家可以结合自己的业务逻辑，进行参考

## 方法

- adapter.requestAPI()
  - @param {Object} params - 相关数据

## 使用

```js
// controller/home
module.exports = app => {
  class HomeController extends app.Controller {
    // 获取首页列表
    async retrieveList() {
      const result = await this.ctx.service.adapter.requestAPI({
        url: 'https://github.com/PDKSophia',
        method: 'POST',
        data: data
      });

      const list = result && result.data;
      this.ctx.body = list;
    }
  }

  return HomeController;
};
```
