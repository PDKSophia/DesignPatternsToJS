// 发邮件，不是qq邮箱的拦截
const emailList = ['qq.com', '163.com', 'gmail.com'];

// 代理
const ProxyEmail = function(email) {
  if (emailList.includes(email)) {
    // 屏蔽处理
  } else {
    // 转发，进行发邮件
    SendEmail.call(this, email);
  }
};

const SendEmail = function(email) {
  // 发送邮件
};

// 外部调用代理
ProxyEmail('cvte.com');
ProxyEmail('ojbk.com');



/** ---------虚拟代理-------- */
// 本体
var domImage = (function() {
  var imgEle = document.createElement('img');
  document.body.appendChild(imgEle);
  return {
    setSrc: function(src) {
    imgEle.src = src;
  }
  };
})();
  
// 代理
var proxyImage = (function() {
  var img = new Image();
  img.onload = function() {
    domImage.setSrc(this.src); // 图片加载完设置真实图片src
  };
  return {
    setSrc: function(src) {
      domImage.setSrc('./loading.gif'); // 预先设置图片src为loading图
      img.src = src;
    }
  };
})();
  
// 外部调用
proxyImage.setSrc('./product.png');