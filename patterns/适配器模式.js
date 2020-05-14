// 关于适配器模式, 可以这么理解, 我去听潇哥分享, 潇哥突然用日语开讲,我听不懂
// 所以我需要通过适配器模块去帮我转成中文,从而满足我的需求

/** ---------------新的代码------------ */
const xiaoLanguage = function() {
  this.japaneseLanguage = function() {
    console.log('潇哥讲日文');
  };
};

const pdkListenLanguage = function() {
  this.listenLanguage = function() {
    console.log('彭道宽只听得懂中文');
  };
};
const tzListenLanguage = function() {
  this.listenLanguage = function() {
    console.log('唐正只听得懂英文');
  };
};

// 通过适配器进行接口适配,从而满足我的需求
const AdapterLanguage = function(user) {
  this.language = user.listenLanguage;
};

AdapterLanguage.prototype = new xiaoLanguage();
AdapterLanguage.prototype.japaneseLanguage = function(name) {
  console.log(`通过适配器, ${name}也能听日文了`);
};

const tz = new tzListenLanguage();
tz.listenLanguage();
const adapterTZ = new AdapterLanguage(tz);
adapterTZ.japaneseLanguage('唐正');

console.log('#########');

const pdk = new pdkListenLanguage();
pdk.listenLanguage();
const adapterPDK = new AdapterLanguage(pdk);
adapterPDK.japaneseLanguage('彭道宽');
