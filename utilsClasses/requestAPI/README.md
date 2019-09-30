# Adapter Request Classes

## 主要功能

- 通过 `axios` 进行封装的统一请求文件
- 对`url`进行判断处理，
- 进行了 `http code` 的状态处理
- 进行了后端返回的`数据状态码`处理

## 注意

⚠ 代码不一定能直接使用，目的不是让你直接搬过来用的，而是让你看懂我的思路，然后自己写一个~虽然可能我写的都不比你的好 ~

## 方法

- requestCallAPI()
  - @param {String} actionName 请求的名称
  - @param {Object} options
  - @param {Boolean} needAuthorToken 是否需要 token，默认不需要
  - @param {Boolean} needCsrfToken 是否需要 csrfToken，默认不需要

## 使用

更多 Axios Options 请移至 👉 [Axios 文档](https://www.kancloud.cn/yunye/axios/234845)

```javascript
import React from 'react'
import adapter from './adapter'

export class requestComponent extends React.PureComponent {
  componentWillMount() {
    // 发送请求
    adapter
      .requestCallAPI({
        url: '/erek-vue-manage/user/retriveList',
        headers: { 'X-Requested-With': 'XMLHttpRequest' }
      })
      .then(res => {
        console.log(res)
      })
      .catch(err => {
        console.log(err)
      })
  }
}
```
