# DesignPatternsToJS

![](https://img.shields.io/badge/JavaScript-blue.svg)
![](https://img.shields.io/badge/Design_patterns-orange.svg)
![](https://img.shields.io/badge/axios-0.19.0-red.svg)

## 介绍

> JavaScript 设计模式的学习，会跟着《JavaScript 设计模式》这本书进行一些 demo 的记录，当然除了设计模式，还会记录自己封装的一些小玩意。

## 客官，点个赞?

如果觉得对您有帮助的话，点个 ⭐star 再走？

## 🥇 博文

- [构造器模式](./构造器模式.md)

- [工厂模式](./工厂模式.md)

- [前端设计模式](./前端设计模式.md)

---

## 🏓 组件设计

### Button Component

#### 主要功能

- 借鉴 Ant Design，低成本了解一个公共组件的设计 ✅
- 支持普通按钮、文本按钮、图标按钮、组合按钮、反白按钮 ✅

#### 文档

- [Button 使用文档](./component/button/index.md)
- [Button 设计文档](./component/button/Design.md)

---

## 🎯 请求封装

### Adapter Request

#### 主要功能

- 通过 `axios` 进行封装的统一请求文件 ✅
- 对`url`进行判断处理，✅
- 进行了 `http code` 的状态处理 ✅
- 进行了后端返回的`数据状态码`处理 ✅

#### 使用

👉 了解更多，请点击这里 [Adapter Request Classses](./utils/adapterAPI/README.md)

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

---

## 🏏 工具封装

### Download

#### 主要功能

- 下载资源文件 ✅
- 支持图片/音频/视频/PDF/DOC 等类型 ✅
- 兼容 IE、Edge、Chrome、FireFox、360 浏览器 ✅

#### 使用

```js
import { retrieveFileType, downloadFile } from 'utils/Download';

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

### Browser

#### 主要功能

- 获取主流浏览器名称
- 包含主流浏览器
  - Chrome 浏览器 ✅
  - FireFox 浏览器 ✅
  - Safari 浏览器 ✅
  - Edge 浏览器 ✅
  - IE 浏览器（5~11）✅
  - QQ 浏览器 ✅
  - UC 浏览器 ✅
  - Opera 浏览器 ✅
  - Sougou 浏览器 ✅
  - Baidu 浏览器 ✅
  - 遨游浏览器 ✅
  - 猎豹浏览器 ✅
  - 夸克浏览器 ✅
  - 世界之窗浏览器 ✅
  - 360 浏览器 ✅

#### 使用

```js
import { getBrowserVersionName } from 'utils/Browser';

const browser_name = getBrowserVersionName();
```

### FullScreen 全屏


#### 使用

```js
import { fullScreen, cancelFullScreen, isFullScreen } from '@common/fullscreen';

function TuPu() {
  const domRef = useRef(null);
  function openFullScreen() {
    fullScreen(domRef.current); // 浏览器进入全屏
  }

  function closeFullScreen() {
    cancelFullScreen(); // 退出浏览器全屏
  }

  // 这才是重点 ❗❗❗
  // fullscreenchange 一定会被触发，监听这个，盘它!
  useEffect(() => {
    function exitHandler() {
      if (!isFullScreen()) {
        // 当前处于全屏下
        cancelFullScreen();
      }
    }
    document.addEventListener('webkitfullscreenchange', exitHandler, false);
    document.addEventListener('mozfullscreenchange', exitHandler, false);
    document.addEventListener('fullscreenchange', exitHandler, false);
    document.addEventListener('MSFullscreenChange', exitHandler, false);
    return () => {
      document.removeEventListener('webkitfullscreenchange', exitHandler, false);
      document.removeEventListener('mozfullscreenchange', exitHandler, false);
      document.removeEventListener('fullscreenchange', exitHandler, false);
      document.removeEventListener('MSFullscreenChange', exitHandler, false);
    };
  });

  return (
    <div ref={domRef}>
      <EchartsCanvas />
    </div>
  );
}
```

---

## 💈 设计模式 Demo

- [策略模式](./patterns/策略模式.js)
- [代理模式](./patterns/代理模式.js)
- [发布-订阅模式](./patterns/发布-订阅模式.js)
- [工厂模式](./patterns/工厂模式.js)
- [构造器模式](./patterns/构造器模式.js)
- [适配器模式](./patterns/适配器模式.js)
- [责任链模式](./patterns/责任链模式.js)
- [装饰器模式](./patterns/装饰器模式.js)

---

## Others

Copyright © 2019 - 2020 by PDK

If you have any questions, please contact me 1063137960@qq.com
