# DesignPatternsToJS

![](https://img.shields.io/badge/JavaScript-blue.svg)
![](https://img.shields.io/badge/Design_patterns-orange.svg)
![](https://img.shields.io/badge/axios-0.19.0-red.svg)

## 介绍

> JavaScript 设计模式的学习，会跟着《JavaScript 设计模式》这本书进行一些 demo 的记录，同时会自己写一些在工作或学习中的公共函数类，如 `adapter request classes` 、`time classes`等

## 客官，点个赞?

如果觉得对您有帮助的话，点个 ⭐star 再走？

## 博文

- [创建型-构造器模式](./创建型-构造器模式.md)

- [创建型-工厂模式](./创建型-创建型-工厂模式.md)

## 封装的一些小玩意

### Download classes

#### 主要功能

- 下载资源文件 ✅
- 支持图片/音频/视频/PDF/DOC 等类型 ✅
- 兼容 IE、Edge、Chrome、FireFox、360 浏览器 ✅

#### 使用

```js
import { retrieveFileType, downloadFile } from 'commonClasses/Download';

// 下载资源
downloadClick = () => {
  for (let i = 0; i <= resourceList.length - 1; i++) {
    downloadFile({
      ...resourceList[i],
      // 如果本身无fileType，需要加入自定义默认的类型
      fileType: retrieveFileType(resourceList[i].resourceType)
    });
  }
};
```

---

### Adapter Request Classes

#### 主要功能

- 通过 `axios` 进行封装的统一请求文件 ✅
- 对`url`进行判断处理，✅
- 进行了 `http code` 的状态处理 ✅
- 进行了后端返回的`数据状态码`处理 ✅

#### 使用

👉 了解更多，请点击这里 [Adapter Request Classses](./commonClasses/adapterAPI/README.md)

```javascript
import React from 'react';
import adapter from './adapter';

export class requestComponent extends React.PureComponent {
  componentWillMount() {
    // 发送请求
    adapter
      .requestCallAPI({
        url: '/erek-vue-manage/user/retriveList',
        headers: { 'X-Requested-With': 'XMLHttpRequest' }
      })
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      });
  }
}
```

### 设计模式的学习 Demo

敬请等待 ⌛️ ...

---

## Others

Copyright © 2019 by PDK

If you have any questions, please contact me 1063137960@qq.com
