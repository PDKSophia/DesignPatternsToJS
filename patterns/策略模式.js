/**
 * 1. 主要运用了 : 策略模式
 * 2. 需求 : 只有当用户满足以下条件，才能进行资产申请
 * 3. 相互独立并且可复用、灵活组合
 */

// 维护权限列表
const jobList = ['前端工程师', '后端工程师', '运维工程师'];
const departList = ['software', 'operation', 'media'];

// 策略
var strategies = {
  checkTime: function(value) {
    if (value >= 1 && value <= 3) {
      return true;
    }
    return false;
  },
  checkCvter: function(value) {
    return value || false;
  },
  checkDepartMent: function(value) {
    if (departList.indexOf(value) > 1) {
      return true;
    }
    return false;
  },
  checkJob: function(value) {
    if (jobList.indexOf(value) > 1) {
      return true;
    }
    return false;
  }
};

// 校验规则
var Validator = function() {
  this.cache = []; // 检查结果
  this.add = function(value, method) {
    this.cache.push(function() {
      return strategies[method](value);
    });
  };

  this.check = function() {
    for (let i = 0; i < this.cache.length; i++) {
      let valiFn = this.cache[i];
      var data = valiFn(); // 开始检查
      if (!data) {
        return false;
      }
    }
    return true;
  };
};

// 用户使用策略模式进行操作
// 组合1 : 检查是否属于CVTEr & 后端工程师
var compose1 = function() {
  var validator = new Validator();
  const data1 = {
    isCvter: true, // 用户是否属于CVTE员工
    job: '后端工程师' // 用户职位
  };
  validator.add(data1.isCvter, 'checkCvter');
  validator.add(data1.job, 'checkJob');
  const result = validator.check();
  return result;
};

// 组合2 : 检查是否属于CVTEr & 运营部 & 入职3年
var compose2 = function() {
  var validator = new Validator();
  const data2 = {
    stayTime: 3, // 用户入职多久(单位/年)
    isCvter: true, // 用户是否属于CVTE员工
    department: 'software' // 软件部
  };
  validator.add(data2.isCvter, 'checkCvter');
  validator.add(data2.stayTime, 'checkTime');
  validator.add(data2.department, 'checkDepartMent');
  const result = validator.check();
  return result;
};

function demo() {
  console.log('------------策略模式-----------');
  var isPass1 = compose1();
  console.log('compose 1 组合权限是否通过 : ', isPass1);
  var isPass2 = compose2();
  console.log('compose 2 组合权限是否通过 : ', isPass2);
}

demo();
