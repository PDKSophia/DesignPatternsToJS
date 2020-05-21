# Download Classes

## 主要功能

- 下载资源文件 ✅
- 支持图片/音频/视频/PDF/DOC 等类型 ✅
- 兼容 IE、Edge、Chrome、FireFox、360 浏览器 ✅

## 注意

> 直接使用 index 文件即可，design-rewrite 文件是尝试使用类的思路去写

> 🔶 虽然可能我写的都不比你的好 ~ 但是希望可以给你一些参考~

## 方法

```
/**
 * @desc 资源下载文件 downloadFile
 * @Support Image/Audio/Video/Word/PDF
 * @param {Object} resource - 资源文件
 * resource: {
 *     link: '', 文件下载地址
 *     reName: '', 用户自定义导出的文件名
 *     fileType: '', 源文件类型，当文件名为空或不携带类型时，此字段必须需要
 *     fileName: '', 源文件名，尽可能带有类型，如 a.jpg、b.mp3
 * }
 */
```

## 使用

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
