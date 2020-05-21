// 全屏
export const fullScreen = ele => {
  if (!ele) {
    ele = document.documentElement;
  }
  if (ele.requestFullscreen) {
    ele.requestFullscreen();
  }
  //FireFox
  else if (ele.mozRequestFullScreen) {
    ele.mozRequestFullScreen();
  }
  //Chrome, safari
  else if (ele.webkitRequestFullScreen) {
    ele.webkitRequestFullScreen();
  }
  //IE11
  else if (ele.msRequestFullscreen) {
    ele.msRequestFullscreen();
  }
};
// 取消全屏
export const cancelFullScreen = () => {
  if (document.exitFullscreen) {
    document.exitFullscreen();
  }
  //FireFox
  else if (document.mozCancelFullScreen) {
    document.mozCancelFullScreen();
  }
  //Chrome, safari
  else if (document.webkitCancelFullScreen) {
    document.webkitCancelFullScreen();
  }
  //IE11
  else if (document.msExitFullscreen) {
    document.msExitFullscreen();
  }
};
// 全屏/取消全屏的回调函数
export const fullScreenChange = cb => {
  document.onmozfullscreenchange = cb;
  document.onmsfullscreenchange = cb;
  document.onfullscreenchange = cb;
  document.onwebkitfullscreenchange = cb;
};
// 判断是否全屏状态下
export const isFullScreen = () =>
  !!(
    document.fullscreen ||
    document.mozFullScreen ||
    document.webkitIsFullScreen ||
    document.msFullscreenElement
  );

export const addFullScreenChangeEvent = cb => {
  document.addEventListener('mozfullscreenchange', cb);
  document.addEventListener('msfullscreenchange', cb);
  document.addEventListener('fullscreenchange', cb);
  document.addEventListener('webkitfullscreenchange', cb);
};

export const removeFullScreenChangeEvent = cb => {
  document.removeEventListener('mozfullscreenchange', cb);
  document.removeEventListener('msfullscreenchange', cb);
  document.removeEventListener('fullscreenchange', cb);
  document.removeEventListener('webkitfullscreenchange', cb);
};
