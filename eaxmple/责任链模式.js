// 未使用责任链之前

function applyDevice(data) {
    // 处理巴拉巴拉...
    let devices = {};
    let nextData = Object.assign({}, data, devices);
    // 执行选择收货地址
    selectAddress(nextData);
}
  
function selectAddress(data) {
    // 处理巴拉巴拉...
    let address = {};
    let nextData = Object.assign({}, data, address);
    // 执行选择责任人
    selectChecker(nextData);
}
  
function selectChecker(data) {
    // 处理巴拉巴拉...
    let checker = {};
    let nextData = Object.assign({}, data, checker);
    // 还有更多
}


// 使用责任链之后

const Chain = function(fn) {
    this.fn = fn;
    
    this.setNext = function() {}
  
    this.run = function() {}
}
  
const applyDevice = function() {}
const chainApplyDevice = new Chain(applyDevice);
  
const selectAddress = function() {}
const chainSelectAddress = new Chain(selectAddress);
  
const selectChecker = function() {}
const chainSelectChecker = new Chain(selectChecker);
  
// 运用责任链模式实现上边功能
chainApplyDevice.setNext(chainSelectAddress).setNext(chainSelectChecker);
chainApplyDevice.run();