// 基于昨天讨论的装饰器模式, 是为了给某个对象赋予它所不具备的功能

/**
 * 1. 以昨天潇哥分享为例 : 潇哥分享PPT,但是他只会讲中文,但是听众中有日本学生
 * 2. 所以他需要通过装饰器来给他赋予讲日语的能力
 */

const xiaoShare = function() {
  this.speakChinese = function() {
    console.log('我只会说中文');
  };
};

// 通过装饰器给潇哥加上说英文的能力
const Decorator = function(old) {
  this.oldSpeak = old.speakChinese;
  this.speakJapanese = function() {
    console.log('给潇哥赋予讲日文能力');
  };
  this.newSpeak = function() {
    this.oldSpeak();
    this.speakJapanese();
  };
};

const oldXiaoShare = new xiaoShare();
const decorator = new Decorator(oldXiaoShare);
decorator.newSpeak();
