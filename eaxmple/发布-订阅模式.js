const EventEmit = function() {
  this.events = {};
  this.on = function(name, cb) {
    if (this.events[name]) {
      this.events[name].push(cb);
    } else {
      this.events[name] = [cb];
    }
  };
  this.trigger = function(name, ...arg) {
    if (this.events[name]) {
      this.events[name].forEach(eventListener => {
        eventListener(...arg);
      });
    }
  };
};

let event = new EventEmit();

function orderUpdate() {
  event.on('success', () => {
    console.log('更新订单信息');
  });
}
function masterUpdate() {
  event.on('success', () => {
    console.log('通知管理员');
  });
}
function messageUpdate() {
  event.on('success', () => {
    console.log('更新消息中心');
  });
}

console.log('2s 之后, 打印数据');

setTimeout(() => {
  event.trigger('success');
}, 2000);

orderUpdate();
masterUpdate();
messageUpdate();
