/**
 * @desc 资源下载文件
 * @Support Image/Audio/Video/Word/PDF
 * @param {Object} resource - 资源文件
 * resource: {
 *     link: '', 文件下载地址
 *     reName: '', 用户自定义导出的文件名
 *     fileType: '', 源文件类型，当文件名为空或不携带类型时，此字段必须需要
 *     fileName: '', 源文件名，尽可能带有类型，如 a.jpg、b.mp3
 * }
 */
function fetchBlob(url) {
  return new Promise((resolve, reject) => {
    let xhr = new XMLHttpRequest();
    xhr.open('GET', url);
    xhr.responseType = 'blob';

    xhr.onload = function() {
      if (xhr.status === 200) {
        resolve(xhr.response);
      } else {
        reject(new Error(xhr.statusText || 'Download failed.'));
      }
    };
    xhr.onerror = function() {
      reject(new Error('Download failed.'));
    };
    xhr.send();
  });
}

function downloadURL(url, name = '') {
  const link = document.createElement('a');
  link.download = name;
  link.href = url;
  if ('download' in document.createElement('a')) {
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  } else {
    // 对不支持download进行兼容
    click(link, (link.target = '_blank'));
  }
}

// 参考 FileSaver.js ，链接地址
// https://github.com/eligrey/FileSaver.js/blob/master/src/FileSaver.js
function click(node) {
  try {
    node.dispatchEvent(new MouseEvent('click'));
  } catch (e) {
    let evt = document.createEvent('MouseEvents');
    console.log(evt);
    evt.initMouseEvent(
      'click',
      true,
      true,
      window,
      0,
      0,
      0,
      80,
      20,
      false,
      false,
      false,
      false,
      0,
      null
    );
    node.dispatchEvent(evt);
  }
}

/**
 * @desc 拼接下载链接
 * 添加 attname 属性用于下载资源文件
 */
function retrieveReallyLink(link, name) {
  let originUrl = `${link}?attname=${name}`;
  if (/\?/.test(link)) {
    originUrl = `${link}&attname=${name}`;
  }
  return originUrl;
}
/**
 * @desc 处理文件名
 * 1，用户自定义导出的文件名reName为准，无reName，以fileName为准，无fileName，给定默认文件名
 * 2. type类型以fileName的为主，fileName不存在或不携带类型，则以传入的 fileType 为主
 */
function retrieveReallyName(resource) {
  const { fileName = '', fileType = '', reName = '' } = resource;
  let type = fileType;
  let originName = '';
  if (fileName && fileName.indexOf('.') > -1) {
    type = fileName.substring(fileName.lastIndexOf('.')).toLowerCase();
  }
  if (reName) {
    originName = `${reName}${type}`;
  } else if (fileName) {
    originName =
      fileName.indexOf('.') > -1 ? `${fileName}` : `${fileName}${type}`;
  } else {
    originName = `新建下载文件${type}`;
  }
  return originName;
}

/**
 * @desc 资源下载
 * @param {Object} resource
 */
export function downloadFile(resource) {
  const { link = '' } = resource;
  const originName = retrieveReallyName(resource);
  const originUrl = retrieveReallyLink(link, originName);

  return fetchBlob(originUrl)
    .then(resp => {
      if (resp.blob) {
        return resp.blob();
      } else {
        return new Blob([resp]);
      }
    })
    .then(blob => {
      if ('msSaveOrOpenBlob' in navigator) {
        window.navigator.msSaveOrOpenBlob(blob, originName);
      } else {
        const obj = URL.createObjectURL(blob);
        downloadURL(obj, originName);
        URL.revokeObjectURL(obj);
      }
    })
    .catch(err => {
      throw new Error(err.message);
    });
}

/**
 * @desc 获取文件类型，当后台文件名为空或不携带类型时，需要通过此方法获取文件类型
 * @param {Number} resourceType 资源类型，参考 constant 文件的resoureType
 */
export function retrieveFileType(resourceType) {
  let resultType = '';
  switch (resourceType) {
    case 1:
      resultType = '.mp4';
      break;
    case 2:
      resultType = '.png';
      break;
    case 3:
      resultType = '.doc';
      break;
    case 4:
      resultType = '.ppt';
      break;
    case 5:
      resultType = '.mp3';
      break;
    case 8:
      resultType = '.pdf';
      break;
    default:
      break;
  }
  return resultType;
}
