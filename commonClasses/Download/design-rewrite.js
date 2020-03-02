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

class DownFile {
  constructor(resource) {
    this.resource = { ...resource };
    this.originLink = ''; // 下载地址
    this.originName = ''; // 下载文件名
  }

  retrieveReallyLink() {
    this.originLink = `${this.resource.link}?attname=${this.originName}`;
    if (/\?/.test(this.resource.link)) {
      this.originLink = `${this.resource.link}&attname=${this.originName}`;
    }
    console.log(this.originLink);
  }

  retrieveReallyName() {
    const { fileName = '', fileType = '', reName = '' } = this.resource;
    let type = fileType;
    if (fileName && fileName.indexOf('.') > -1) {
      type = fileName.substring(fileName.lastIndexOf('.')).toLowerCase();
    }
    if (reName) {
      this.originName = `${reName}${type}`;
    } else if (fileName) {
      this.originName =
        fileName.indexOf('.') > -1 ? `${fileName}` : `${fileName}${type}`;
    } else {
      this.originName = `新建下载文件${type}`;
    }
    console.log(this.originName);
  }
}

DownFile.prototype.fetchBlob = function(url) {
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
};

DownFile.prototype.downloadURL = function(url, name = '') {
  const link = document.createElement('a');
  link.download = name;
  link.href = url;
  if ('download' in document.createElement('a')) {
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  } else {
    // 对不支持download进行兼容
    this.targetClick(link, (link.target = '_blank'));
  }
};

DownFile.prototype.targetClick = function(node) {
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
};

DownFile.prototype.download = function() {
  this.retrieveReallyName();
  this.retrieveReallyLink();
  return this.fetchBlob(this.originLink)
    .then(resp => {
      if (resp.blob) {
        return resp.blob();
      } else {
        return new Blob([resp]);
      }
    })
    .then(blob => {
      if ('msSaveOrOpenBlob' in navigator) {
        window.navigator.msSaveOrOpenBlob(blob, this.originName);
      } else {
        const obj = URL.createObjectURL(blob);
        this.downloadURL(obj, this.originName);
        URL.revokeObjectURL(obj);
      }
    })
    .catch(err => {
      throw new Error(err.message);
    });
};

export default DownFile;
